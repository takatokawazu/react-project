import { BrowserRouter } from 'react-router-dom';
import Navi from './components/Navi';
import AuthNavigator from './AuthNavigator';

const App = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <BrowserRouter>
        <Navi />
        <div className="container">
          <AuthNavigator />
        </div>
      </BrowserRouter>
      <footer className="blockquote-footer bg-dark py-3 mt-auto">
        &copy; Yelp 2023
      </footer>
    </div>
  );
};
export default App;
