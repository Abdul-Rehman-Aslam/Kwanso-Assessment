import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UsersList from './pages/UsersList';
import UserProfile from './pages/UserProfile';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/:uuid" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
