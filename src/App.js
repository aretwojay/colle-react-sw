import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home/Index";
import Character from "./components/Character";
import Starship from "./components/Starship";

function App() {
  return (
    <div className="App">

      <Router>
        <div className="Container bg-secondary">
          <a className="text-light" href="/">Home</a>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character" element={<Character />} />
            <Route path="/starship" element={<Starship />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
