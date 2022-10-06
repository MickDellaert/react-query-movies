import { useEffect, useState } from "react";

// import { useLocation } from "react-router-dom";

import { Search } from "./Search";
import { SearchResults } from "./SearchResults";

export const SearchContainer = () => {
  const [movieQuery, setMovieQuery] = useState(localStorage.getItem("query"));

  // const searched = useLocation()

  // console.log(searched)

  const getInput = (e) => {
    setMovieQuery(e.target.value);
  };

useEffect(()=>{
  localStorage.setItem("query", movieQuery)
}, [movieQuery])

  return (
    <>
      <div>SearchContainer</div>
      <Search getInput={getInput} movieQuery={movieQuery} />
      <SearchResults movieQuery={movieQuery} />
    </>
  );
};
