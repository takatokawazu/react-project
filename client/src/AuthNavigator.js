import { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Campgrounds from './pages/Campgrounds';
import Camp from './pages/Camp';
import NewCamp from './pages/NewCamp';
import Edit from './pages/Edit';
import Page404 from './pages/Page404';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContext } from './state/AuthContext';

const AuthNavigator = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/campgrounds`} element={<Campgrounds />} />
      <Route
        path={`/campgrounds/new`}
        element={
          user ? (
            <NewCamp />
          ) : (
            <Navigate to={'/login'} state={pathname} replace />
          )
        }
      />
      <Route path={`/campgrounds/error`} element={<Page404 />} />
      <Route
        path={`/campgrounds/:id/edit`}
        element={
          user ? <Edit /> : <Navigate to={'/login'} state={pathname} replace />
        }
      />
      <Route path={`/campgrounds/:id`} element={<Camp />} />
      <Route path={`/register`} element={<Register />} />
      {!user && (
        <>
          <Route path={`/login`} element={<Login />} />
        </>
      )}
      <Route path={'*'} element={<Page404 />} />
    </Routes>
  );
};

export default AuthNavigator;
