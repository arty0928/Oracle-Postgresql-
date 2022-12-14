import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Precautions from "./Pages/Precautions";
import Functions from "./Pages/Functions";

function App() {
  return (
    <Router>

      {/* <nav>
            <Link to = "/"> Home </Link>
            <Link to = "/Precautions"> Precautions </Link>
        </nav> */}

      <Routes>
        <Route path="/Oracle-Postgresql-" element={<Home />} />
        <Route path="/Precautions" element={<Precautions />} />
        <Route path="/Functions" element={<Functions />} />
      </Routes>

    </Router>
  );
}

export default App;