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
  isLoading: boolean;
  toggleLoading: (value: boolean) => void;
}

interface CardsState {
  data: CardsResponse | null;
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
    this.apiService.abort();
    this.cleanLoadingStatuses();
  }

  public fetchData = () => {
    this.setState({ isLongLoading: false, error: null });
    this.props.toggleLoading(true);

    this.apiService
      .fetchCards(this.props.query)
      .then((data) => {
        this.setState({ data, isLongLoading: false });
        this.cleanLoadingStatuses();
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== 'AbortError') {
          this.setState({
            error: error instanceof Error ? error.message : 'Unknown error',
            isLongLoading: false,
          });
          this.cleanLoadingStatuses();
        }
      });
  };

  private startLoading = () => {
    this.longLoadingTimer = window.setTimeout(() => {
      if (this.props.isLoading) {
        this.setState({ isLongLoading: true });
      }
    }, SPINNER_DELAY);
    this.fetchData();
  };

  private cleanLoadingStatuses = () => {
    this.props.toggleLoading(false);

    if (this.longLoadingTimer) {
      window.clearTimeout(this.longLoadingTimer);
      this.longLoadingTimer = null;
    }
  };

  render() {
    const { isLoading } = this.props;
    const { data, isLongLoading, error } = this.state;

    if (isLongLoading) {
      return (
        <main className="flex flex-1 flex-col items-center justify-center">
          <Loader />
          <p className="mt-10 max-w-3xl px-4 text-center text-2xl text-red-500">
            Please be patient. Since we use free hosting, it takes about 3
            minutes to load the server.
          </p>
        </main>
      );
    }

    if (isLoading) {
      return (
        <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: SKELETON_ELEMENTS_COUNT }).map((_, index) => (
            <SceletonCard key={index} />
          ))}
        </main>
      );
    }

    if (error) {
      return (
        <main className="flex flex-1 flex-col items-center justify-center">
          <p className="mt-10 max-w-3xl px-4 text-center text-2xl text-red-500">
            {error}
          </p>
          <MyButton className="mt-4" callback={this.startLoading}>
            Reload
          </MyButton>
        </main>
      );
    }

    if (!data?.cards) {
      return (
        <main className="flex flex-1 flex-col items-center justify-center">
          <p className="text-gray-500">No cards found</p>
        </main>
      );
    }

    return (
      <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.cards.map((cardData) => (
          <Card key={cardData.id} data={cardData} />
        ))}
      </main>
    );
  }
}

export default Cards;
