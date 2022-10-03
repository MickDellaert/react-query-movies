import "./App.css";

import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Movies } from "./components/Movies";
import { MovieDetails } from "./components/MovieDetails";
import { TvDetails } from "./components/TvDetails";

function App() {
  const [type, setType] = useState(window.localStorage.getItem("typestorage"));

  // useEffect(() => {
  //   const stored = window.localStorage.getItem("typestorage");
  //   // setType(stored);
  //   console.log(stored);
  // }, []);

  // useEffect(() => {
  //   // setUserId(sessionStorage.getItem("id"))
  //   window.localStorage.setItem("typestorage", type);
  //   // setType(type);
  //   console.log(type);
  // });


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Movies type={type} setType={setType} />} />
          <Route
            path=":type/:id"
            element={<MovieDetails type={type} setType={setType} />}
          />
          {/* <Route path="tv/:id" element={<TvDetails type={type} setType={setType}/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
