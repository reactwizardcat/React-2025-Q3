import React from 'react';
import Card from './Card';
import { API_URL } from '../constants';
import type { CardsRespobse } from '../models/cards.model';

interface CardsProps {
  query: string;
}

interface CardsState {
  data: CardsRespobse | null;
  loading: boolean;
  error: string | null;
  hasError: boolean;
}

class Cards extends React.Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null,
      hasError: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: CardsProps) {
    if (prevProps.query !== this.props.query) {
      this.fetchData();
    }
  }

  showError = () => {
    this.setState({ hasError: true });
  };

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const url = `${API_URL}/cards${this.props.query == '' ? '' : `?search=${this.props.query}`}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
      });
    }
  };

  render() {
    const { data } = this.state;
    if (this.state.hasError) {
      throw new Error("💥 I'm error");
    }
    return (
      <>
        <main className="flex flex-row gap-3 flex-wrap">
          {data?.cards.map((cardData) => (
            <Card key={cardData.id} data={cardData} />
          ))}
        </main>
        <button
          className="fixed bottom-3 right-3 md:bottom-10 md:right-16 px-1.5 py-2.5 hover:scale-110 duration-300 rounded-xl bg-red-400 text-white"
          onClick={this.showError}
        >
          Error Boundary
        </button>
      </>
    );
  }
}

export default Cards;
