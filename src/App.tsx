import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobsPage from './pages/JobsPage';
import AlertsPage from './pages/AlertsPage';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

const router = createBrowserRouter(
  [
    { path: '/', element: <Layout><JobsPage /></Layout> },
    { path: '/alerts', element: <Layout><AlertsPage /></Layout> },
  ],
  { basename: '/atc-radar' }
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
