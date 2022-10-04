import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Movies } from "./components/Movies";
import { MovieDetails } from "./components/MovieDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path=":type/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
