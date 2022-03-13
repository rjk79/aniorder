import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Board from './Board.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
