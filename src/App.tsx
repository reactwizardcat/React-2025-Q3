import React from 'react';
import Cards from './components/Cards';
import Search from './components/Search';
import ErrorBoundary from './components/ErrorBoundary';

type AppProps = object;

interface AppState {
  query: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      query: '',
    };
  }

  changeQuery = (str: string) => {
    this.setState({ query: str });
  };

  render() {
    return (
      <>
        <Search changeQuery={this.changeQuery} />
        <ErrorBoundary>
          <Cards query={this.state.query} />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
