// src/App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Listing from "./components/Listing/Listing";
import UserProfile from "./components/UserProfile";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Listing />} />
      <Route path="/user/:uuid" element={<UserProfile />} />
    </Routes>
  );
};

export default App;
