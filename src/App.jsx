// App.js
import NavBar from './Components/NavBar';
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import EditMovie from "./Components/EditMovie";
import MovieDetails from "./Components/MovieDetails";

import { Suspense } from 'react';

const App = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit-movie" element={<EditMovie />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

        </Routes>
      </Suspense>
    </>
  );
};

export default App;
