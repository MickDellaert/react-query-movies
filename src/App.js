import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Movies } from "./components/Movies";
import { MovieDetails } from "./components/MovieDetails";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":type/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
