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
}

class Cards extends React.Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(`${API_URL}/cards`);
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
    return (
      <main>
        {data?.cards.map((cardData) => (
          <Card key={cardData.id} data={cardData} />
        ))}
      </main>
    );
  }
}

export default Cards;
