import { useState } from "react";

import { Search } from "./Search";
import { SearchResults } from "./SearchResults";

export const SearchContainer = ({type, setType}) => {
  const [movieQuery, setMovieQuery] = useState("");

  const getInput = (e) => {
    setMovieQuery(e.target.value);
  };

  return (
    <>
      <div>SearchContainer</div>
      <Search getInput={getInput} movieQuery={movieQuery} />
      <SearchResults movieQuery={movieQuery} type={type} setType={setType}/>
    </>
  );
};
