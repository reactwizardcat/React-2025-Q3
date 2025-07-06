import React from 'react';

interface SearchProps {
  changeQuery: (str: string) => void;
}

interface SearchState {
  query: string;
}

class Search extends React.PureComponent<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.changeQuery(this.state.query);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value,
    });
  };

  render() {
    return (
      <header className="bg-white mt-3 px-2 py-4 rounded-t-4xl mx-4 shadow-md">
        <form
          className="flex flex-row justify-center items-center"
          onSubmit={this.handleSubmit}
        >
          <label className="font-lobster text-2xl" htmlFor="search-input">
            Search Input:
          </label>
          <input
            className="min-w-28 border border-gray-300 mx-8 py-2 pl-3 rounded outline-none focus:ring-indigo-600"
            id="search-input"
            type="search"
            placeholder="Enter search query..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-red-400 disabled:bg-gray-200 disabled:text-black text-white md:hover:enabled:bg-red-300 md:duration-300 md:active:enabled:translate-y-0.5 shadow-lg md:enabled:shadow-red-300/50 md:active:enabled:shadow-none"
            disabled={!this.state.query}
          >
            Search
          </button>
        </form>
      </header>
    );
  }
}

export default Search;
