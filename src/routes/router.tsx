import { Home } from '@/pages/home';
import { SignIn } from '@/pages/sign-in';
import { SignUp } from '@/pages/sing-up';
import { createBrowserRouter } from 'react-router-dom';

const Router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },
]);

export { Router };
