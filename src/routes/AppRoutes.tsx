import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SearchResults from '../pages/SearchResults';
import BecomeChef from '../pages/BecomeChef';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ChefProfile from '../pages/ChefProfile';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/become-chef" element={
        <ProtectedRoute>
          <BecomeChef />
        </ProtectedRoute>
      } />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/chef/:id" element={<ChefProfile />} />
    </Routes>
  );
};

export default AppRoutes;