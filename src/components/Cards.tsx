import React from 'react';
import Card from './Card';
import { API_URL, SKELETON_ELEMENTS_COUNT, SPINNER_DELAY } from '../constants';
import type { CardsResponse } from '../models/cards.model';
import Loader from './Loader';
import SceletonCard from './SceletonCard';

interface CardsProps {
  query: string;
}

interface CardsState {
  data: CardsResponse | null;
  isLoading: boolean;
  isLongLoading: boolean;
  error: string | null;
  hasError: boolean;
}

class Cards extends React.Component<CardsProps, CardsState> {
  private longLoadingTimer: number | null = null;
  private abortController: AbortController | null = null;

  constructor(props: CardsProps) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      isLongLoading: false,
      error: null,
      hasError: false,
    };
  }

  componentDidMount() {
    this.startLoading();
  }

  componentDidUpdate(prevProps: CardsProps) {
    if (prevProps.query !== this.props.query) {
      this.startLoading();
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  private startLongLoadingTimer = () => {
    this.longLoadingTimer = window.setTimeout(() => {
      if (this.state.isLoading) {
        this.setState({ isLongLoading: true });
      }
    }, SPINNER_DELAY);
  };

  private startLoading = () => {
    this.cleanup();
    this.startLongLoadingTimer();
    this.fetchData();
  };

  showError = () => {
    this.setState({ hasError: true });
  };

  private cleanup = () => {
    if (this.longLoadingTimer) {
      window.clearTimeout(this.longLoadingTimer);
      this.longLoadingTimer = null;
    }
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  };

  fetchData = () => {
    this.setState({ isLoading: true, isLongLoading: false, error: null });
    this.abortController = new AbortController();

    const url = new URL(`${API_URL}/cards`);
    if (this.props.query !== '') {
      url.searchParams.set('search', this.props.query);
    }

    fetch(url, {
      signal: this.abortController.signal,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        this.setState({ data, isLoading: false, isLongLoading: false });
        this.cleanup();
      })
      .catch((error) => {
        if (error instanceof Error && error.name == 'AbortError') return;
        this.setState({
          error: error instanceof Error ? error.message : 'Unknown error',
          isLoading: false,
          isLongLoading: false,
        });
        this.cleanup();
      });
  };

  render() {
    const { data } = this.state;
    const { hasError, isLoading, isLongLoading } = this.state;
    if (hasError) {
      throw new Error("💥 I'm error");
    }
    if (isLongLoading) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center">
          <Loader />
          <p className="text-2xl max-w-3xl px-4 text-center mt-10 text-red-500">
            Please be patient. Since we use free hosting, it takes about 3
            minutes to load the server.
          </p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {Array.from({ length: SKELETON_ELEMENTS_COUNT }).map((_, index) => (
            <SceletonCard key={index} />
          ))}
        </div>
      );
    }

    if (!data?.cards?.length) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="text-gray-500">No cards found</p>
        </div>
      );
    }

    return (
      <>
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {data?.cards.map((cardData) => (
            <Card key={cardData.id} data={cardData} />
          ))}
        </main>
        <button
          className="fixed bottom-3 right-3 rounded-xl bg-red-400 text-white md:bottom-10 md:right-16 px-1.5 py-2.5 md:hover:bg-red-300 md:hover:-translate-y-2 duration-300 md:hover:shadow-md md:shadow-red-300/50 md:active:shadow-none md:active:-translate-y-1"
          onClick={this.showError}
        >
          Error Boundary
        </button>
      </>
    );
  }
}

export default Cards;
