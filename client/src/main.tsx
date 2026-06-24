import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";
import './index.css'
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from 'sonner';
import { QueryProvider } from './providers/query-provider.tsx';
import { router } from './routes/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SkeletonTheme baseColor="#E0E0E0" highlightColor="#F0F0F0">
      <HelmetProvider>
        <QueryProvider>
          <RouterProvider router={router} />
          <Toaster
            richColors
            position="top-center"
            expand={false}
          />
        </QueryProvider>
      </HelmetProvider>
    </SkeletonTheme>
  </StrictMode>,
)
