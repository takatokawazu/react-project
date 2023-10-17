import { BrowserRouter } from 'react-router-dom';
import Navi from './components/Navi';
import AuthNavigator from './AuthNavigator';

const App = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <BrowserRouter>
        <Navi />
        <AuthNavigator />
      </BrowserRouter>
      <footer className="blockquote-footer mb-0 bg-dark py-3 mt-auto">
        &copy; CampApp 2023
      </footer>
    </div>
  );
};
export default App;
