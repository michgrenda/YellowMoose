import React from "react";
import Navbar from "./components/layouts/Navbar";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

export default App;
