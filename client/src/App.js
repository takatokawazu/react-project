import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Campgrounds from './pages/Campgrounds';
import Camp from './pages/Camp';
import NewCamp from './pages/NewCamp';
import Edit from './pages/Edit';
import Navi from './components/Navi';
import Page404 from './pages/Page404';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContext } from './state/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="d-flex flex-column vh-100">
      <Navi />
      <BrowserRouter>
        <div className="container">
          <Routes>
            {!user && (
              <>
                <Route path={`/register`} element={<Register />} />
                <Route path={`/login`} element={<Login />} />
              </>
            )}
            <Route
              path={`/`}
              element={user ? <Home /> : <Navigate to="/register" replace />}
            />
            <Route
              path={`/campgrounds`}
              element={
                user ? <Campgrounds /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path={`/campgrounds/new`}
              element={user ? <NewCamp /> : <Navigate to="/login" replace />}
            />
            <Route path={`/campgrounds/error`} element={<Page404 />} />
            <Route
              path={`/campgrounds/:id/edit`}
              element={user ? <Edit /> : <Navigate to="/login" replace />}
            />
            <Route
              path={`/campgrounds/:id`}
              element={user ? <Camp /> : <Navigate to="/login" replace />}
            />
            {/* <Route path={'*'} element={<Page404 />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
      <footer className="blockquote-footer bg-dark py-3 mt-auto">
        &copy; Yelp 2023
      </footer>
    </div>
  );
};
export default App;
