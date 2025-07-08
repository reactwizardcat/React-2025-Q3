import React from 'react';
import MyButton from './UI/MyButton';

interface SearchProps {
  changeQuery: (str: string) => void;
  queryString: string;
  isLoading: boolean;
}

interface SearchState {
  query: string;
}

class Search extends React.PureComponent<SearchProps, SearchState> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = String(formData.get('search'));

    this.props.changeQuery(value.trim());
  };

  render() {
    const { isLoading, queryString } = this.props;
    return (
      <header className="bg-white mt-3 px-2 py-4 rounded-t-4xl mx-4 shadow-md bg-[url('/fon2.png')] bg-cover bg-no-repeat bg-center">
        <form onSubmit={this.handleSubmit}>
          <label
            className="mx-3.5 lg:mx-auto relative bg-white max-w-5xl flex flex-col sm:flex-row items-center justify-center border border-gray-200 py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-500"
            htmlFor="search-input"
          >
            <input
              className="peer px-6 py-2 w-full rounded-md flex-1 outline-none bg-white disabled:bg-gray-200"
              id="search-input"
              type="search"
              placeholder=" "
              defaultValue={queryString}
              disabled={isLoading}
              name="search"
            />
            <span className="absolute left-6 top-4 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-7.5 peer-not-placeholder-shown:scale-80 peer-not-placeholder-shown:text-blue-500 peer-not-placeholder-shown:bg-white/70 peer-not-placeholder-shown:rounded-full peer-not-placeholder-shown:px-1 peer-focus:-translate-y-7.5 peer-focus:scale-75 peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1">
              Enter search query...
            </span>
            <MyButton
              className="font-lobster w-full sm:w-auto"
              type="submit"
              disabled={isLoading}
            >
              Search
            </MyButton>
          </label>
        </form>
      </header>
    );
  }
}

export default Search;
