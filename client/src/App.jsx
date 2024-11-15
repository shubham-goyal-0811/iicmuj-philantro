import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Frontpage from './components/frontpage/Frontpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/" element={<>
            <Header />
            <Frontpage />
          </>} />
      </Routes>
    </Router>
  );
}

export default App;
