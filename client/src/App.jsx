import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";

const NoMatch = () => (
  <div className="flex justify-center items-center h-screen">
    <h1 className="text-center font-bold text-6xl">Page Not Found.</h1>
  </div>
);

function App() {
  useEffect(() => {
    document.title = "Tanawut Wongboot's React App";
  }, []);

  return (
    <div className="App">
      {/* Start coding here */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
