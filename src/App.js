import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ActivityFeed from "./pages/ActivityFeed";
import ActivityDetail from "./pages/ActivityDetail";
import { Provider as ContactContextProvider } from "./context/FeedContext";
import "./App.css";

function App() {
  return (
    <ContactContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ActivityFeed />} />
          <Route path="/feed/:id" element={<ActivityDetail />} />
        </Routes>
      </BrowserRouter>
    </ContactContextProvider>
  );
}

export default App;
