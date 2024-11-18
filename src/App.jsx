import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './pages/Login'; 
import RegisterForm from './pages/Register';

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
    path: '/dashboard',
    element: <div>Dashboard</div>,
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
