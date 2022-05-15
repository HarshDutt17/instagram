import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import './styles/app.css';

const Login = lazy( () => import ('./pages/login'));
// lazy helps in slicing bundle

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={ <Login />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App;
