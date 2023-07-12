import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { pages } from "./pages";
import React from 'react'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element = {<pages.Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
