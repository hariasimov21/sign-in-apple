import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login3 from './Components/Logintres/Login3.jsx';
import { LoginExitoso } from './Components/LoginExitoso/LoginExitoso.jsx';
import { LoginFallido } from './Components/LoginFallido/LoginFallido.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login3 />} />
          <Route path="/success" element={<LoginExitoso/>} />
          <Route path="/error" element={<LoginFallido/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;