import React from 'react';
import Cards from './components/Cards';
import Search from './components/Search';
import StorageService from './service/localStorageService';

type AppProps = object;

interface AppState {
  query: string;
  hasError: boolean;
}

class App extends React.Component<AppProps, AppState> {
  private storageService: StorageService = StorageService.getInstance();

  constructor(props: object) {
    super(props);
    this.state = {
      query: this.storageService.getQuery() || '',
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

  render() {
    if (this.state.hasError) {
      throw new Error("💥 I'm error");
    }
    return (
      <>
        <Search changeQuery={this.changeQuery} queryString={this.state.query} />
        <Cards query={this.state.query} />
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

export default App;
