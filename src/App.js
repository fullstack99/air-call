import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FeedList from "./pages/FeedList";
import FeedDetails from "./pages/FeedDetails";
import { Provider as ContactContextProvider } from "./context/FeedContext";
import "./App.css";

function App() {
  return (
    <ContactContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<FeedList />} />
          <Route path="/feed/:id" element={<FeedDetails />} />
        </Routes>
      </BrowserRouter>
    </ContactContextProvider>
  );
}

export default App;
