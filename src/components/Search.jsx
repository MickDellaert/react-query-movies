export const Search = ({ getInput, movieQuery }) => {
  return (
    <>
      <div>Search</div>
      <div className="input-group input">
        <input
          className="form-control border-end-0 border"
          type="search"
          placeholder="search"
          id="example-search-input"
          onChange={getInput}
          value={movieQuery}
        />
        {/* <span className="input-group-append">
          <button
            className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
            type="button"
          >
            <i className="fa fa-search"></i>
          </button>
        </span> */}
      </div>
    </>
  );
};

// const Input = ({ getInput, value, className }) => {
//   return (
//     <input
//       className={className}
//       type="text"
//       onChange={getInput}
//       value={value}
//     />
//   );
// };

// export default Input;
