import { createBrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import UploadPage from '@/pages/UploadPage.tsx';

const gRoutes: { ROOT: string; UPLOAD: string } = {
  ROOT: '/',
  UPLOAD: '/upload'
};

const router = createBrowserRouter([
  { path: gRoutes.ROOT, element: <App /> },
  { path: gRoutes.UPLOAD, element: <UploadPage /> },
]);

export {
  gRoutes,
  router
}