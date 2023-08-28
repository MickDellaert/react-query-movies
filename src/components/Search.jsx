export const Search = ({ getInput, movieQuery }) => {
  return (
    <>
      <div className="input-group input">
        <input
          className="form-control border-end-0 border"
          type="search"
          placeholder="search"
          id="example-search-input"
          onChange={getInput}
          value={movieQuery}
        />
      </div>
    </>
  );
};
