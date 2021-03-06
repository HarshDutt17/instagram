import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import './styles/app.css';
import 'react-loading-skeleton/dist/skeleton.css'


const Login = lazy(() => import('./pages/login'));
const Profile = lazy(() => import('./pages/profile'));
const SignUp = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));
// lazy helps in slicing bundle

function App() {

  const user = useAuthListener();

  return (
    <UserContext.Provider value={user}  >
      <Router>
        <Suspense fallback={
          <div className='flex flex-col justify-center items-center h-screen'>
            <img
              src='/images/loading.jpg'
              alt='Loading..'
              width={320}
            />
            <p className='text-2xl'>Loading</p>
          </div>
        }>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
