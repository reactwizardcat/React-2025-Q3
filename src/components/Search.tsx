import React from 'react';

interface SearchProps {
  changeQuery: (str: string) => void;
}

class Search extends React.PureComponent<SearchProps> {
  private inputRef = React.createRef<HTMLInputElement>();

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (this.inputRef.current) {
      this.props.changeQuery(this.inputRef.current.value);
    }
  };
  render() {
    return (
      <header className="bg-white mt-3 px-2 py-4 rounded-t-4xl mx-4 shadow-md">
        <form
          className="flex flex-row justify-center items-center"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="search-input">Search:</label>
          <input
            className="min-w-28 border border-gray-300 mx-8 py-2 pl-3 rounded outline-none focus:ring-indigo-600"
            id="search-input"
            type="text"
            ref={this.inputRef}
            placeholder="Enter search query..."
          />
          <button type="submit" className="rounded-lg px-2 py-1 bg-gray-300">
            Search
          </button>
        </form>
      </header>
    );
  }
}

export default Search;
