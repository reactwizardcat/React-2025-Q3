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
      <header>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search-input">Search:</label>
          <input
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
