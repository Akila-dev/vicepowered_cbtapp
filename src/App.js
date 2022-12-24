import React from "react";
import { Routes, Route } from "react-router-dom";
import { Test } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Test />} />
    </Routes>
  );
};

export default App;
