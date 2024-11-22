import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './pages/Login'; 
import RegisterForm from './pages/Register';
import Home from './pages/Home';
import Feeds from './components/Feeds';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />
  },
  {
    path: '/register',
    element: <RegisterForm/>,
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/Feeds',
    element: <Feeds />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
