import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import StartUp from "./Components/StartUp";
import "bootstrap/dist/css/bootstrap.min.css";
import PageContextProvider from "./Store/appContext";
import Game from "./Components/Game";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <div className="app">
      <PageContextProvider>
              <Router>
                <Routes>
                  <Route path="/TaTeTi//" element={<StartUp />} />
                  <Route path="/TaTeTi/juego" element={<Game />} />
                </Routes>
              </Router>
      </PageContextProvider>
    </div>
  );
}

export default App;
