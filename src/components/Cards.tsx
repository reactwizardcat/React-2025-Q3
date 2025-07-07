import React from 'react';
import Card from './Card';
import { SKELETON_ELEMENTS_COUNT, SPINNER_DELAY } from '../constants';
import type { CardsResponse } from '../models/cards.model';
import Loader from './Loader';
import SceletonCard from './SceletonCard';
import ApiService from '../service/apiService';
import MyButton from './UI/MyButton';

interface CardsProps {
  query: string;
}

interface CardsState {
  data: CardsResponse | null;
  isLoading: boolean;
  isLongLoading: boolean;
  error: string | null;
}

class Cards extends React.Component<CardsProps, CardsState> {
  private longLoadingTimer: number | null = null;
  private apiService: ApiService = ApiService.getInstance();

  constructor(props: CardsProps) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      isLongLoading: false,
      error: null,
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

  private cleanup = () => {
    this.apiService.abort();
    if (this.longLoadingTimer) {
      window.clearTimeout(this.longLoadingTimer);
      this.longLoadingTimer = null;
    }
  };

  fetchData = () => {
    this.setState({ isLoading: true, isLongLoading: false, error: null });

    this.apiService
      .fetchCards(this.props.query)
      .then((data) => {
        this.setState({ data, isLoading: false, isLongLoading: false });
        this.cleanup();
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request was aborted');
          return;
        }
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
    const { isLoading, isLongLoading, error } = this.state;

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

    if (error) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="text-2xl max-w-3xl px-4 text-center mt-10 text-red-500">
            {error}
          </p>
          <MyButton className="mt-4" callback={this.startLoading}>
            Reload
          </MyButton>
        </div>
      );
    }

    if (!data?.cards) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="text-gray-500">No cards found</p>
        </div>
      );
    }

    return (
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data?.cards.map((cardData) => (
          <Card key={cardData.id} data={cardData} />
        ))}
      </main>
    );
  }
}

export default Cards;
