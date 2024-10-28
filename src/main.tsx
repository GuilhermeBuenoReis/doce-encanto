import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Router } from './routes/router.tsx';
import './App.css';
import { Toaster } from 'sonner';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Router} />
    <Toaster richColors />
  </StrictMode>
);
