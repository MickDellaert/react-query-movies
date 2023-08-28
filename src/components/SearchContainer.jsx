import { useEffect, useState } from "react";

import { Search } from "./Search";
import { SearchResults } from "./SearchResults";

export const SearchContainer = () => {
  const [movieQuery, setMovieQuery] = useState(localStorage.getItem("query"));

  const getInput = (e) => {
    setMovieQuery(e.target.value);
  };

useEffect(()=>{
  localStorage.setItem("query", movieQuery)
}, [movieQuery])

  return (
    <>
      <Search getInput={getInput} movieQuery={movieQuery} />
      <SearchResults movieQuery={movieQuery} />
    </>
  );
};
