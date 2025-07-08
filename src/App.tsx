import React from 'react';
import Cards from './components/Cards';
import Search from './components/Search';
import StorageService from './service/storageService';

type AppProps = object;

interface AppState {
  query: string;
  hasError: boolean;
  isLoading: boolean;
}

class App extends React.Component<AppProps, AppState> {
  private storageService: StorageService = StorageService.getInstance();

  constructor(props: object) {
    super(props);
    this.state = {
      query: this.storageService.getQuery() || '',
      isLoading: false,
      hasError: false,
    };
  }

  changeQuery = (str: string) => {
    this.setState({ query: str });
    this.storageService.setQuery(str);
  };

  showError = () => {
    this.setState({ hasError: true });
  };

  toggleLoading = (value: boolean) => {
    this.setState({ isLoading: value });
  };

  render() {
    if (this.state.hasError) {
      throw new Error("💥 I'm error");
    }
    return (
      <>
        <Search
          changeQuery={this.changeQuery}
          queryString={this.state.query}
          isLoading={this.state.isLoading}
        />
        <Cards
          query={this.state.query}
          isLoading={this.state.isLoading}
          toggleLoading={this.toggleLoading}
        />
        <button
          className="fixed bottom-3 right-3 rounded-xl bg-red-600 text-white md:bottom-10 md:right-16 px-3.5 py-2.5 md:hover:bg-red-500 md:hover:-translate-y-2 duration-300 md:hover:shadow-md md:shadow-red-300/50 md:active:shadow-none md:active:-translate-y-1"
          onClick={this.showError}
        >
          Error Boundary
        </button>
      </>
    );
  }
}

export default App;
