import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import ProtectedRoute from './ProtectedRoute';
import ErrorBoundary from './ErrorBoundary';
import NotFoundPage from './NotFoundPage';

// 🚀 Eager-loaded components (Critical Paths)
import Landing from './landingNew/main';
import ProModeChatUI from './components/ProMode/chat';
import ExpertMode from './components/ExpertMode/ExpertMode';
import Questions from './components/LightningMode/Questions';

// 🔄 Lazy-loaded components (Non-critical Paths)
const Login = React.lazy(() => import('./components/Login'));
const Catalogue = React.lazy(() => import('./components/BrowseCatalogue/Catalogue'));
const Orders = React.lazy(() => import('./components/BrowseCatalogue/Orders'));
const JewelryForm = React.lazy(() => import('./components/Basic/BasicForm'));
const Option = React.lazy(() => import('./components/Basic/Option'));
const Modes = React.lazy(() => import('./components/Basic/Modes'));
const TeamComponent = React.lazy(() => import('./landingNew/KinMitraTeam'));
const AdminLayout = React.lazy(() => import('./components/Dashboards/Admin/AdminLayout'));
const ImageGrid = React.lazy(() => import('./components/ImageManager/ImageGrid'));
const FilteredImageGrid = React.lazy(() => import('./components/ImageManager/FilteredImageGrid'));
const EditImageData = React.lazy(() => import('./components/BrowseCatalogue/EditImageData'));
const LikedImages = React.lazy(() => import('./components/BrowseCatalogue/LikedImages'));
const DashboardPage = React.lazy(() => import('./components/Dashboards/Admin/DashboardPage'));
const OrderPage = React.lazy(() => import('./components/Dashboards/Admin/OrderPage'));
const OrderDetailsPage = React.lazy(() => import('./components/Dashboards/Admin/OrderDetailsPage'));
const CADPage = React.lazy(() => import('./components/Dashboards/Admin/CADPage'));
const CADDetailsPage = React.lazy(() => import('./components/Dashboards/Admin/CADDetailsPage'));
const MetadataEditor = React.lazy(() => import('./components/BrowseCatalogue/MetadataEditor'));
const UserProfile = React.lazy(() => import('./components/UserProfile/UserProfile'));

const router = createBrowserRouter([
  // 🚀 Eager-loaded routes
  { path: '/', element: <Landing /> },
  {
    path: '/promode',
    element: (
      <ProtectedRoute>
        <ProModeChatUI />
      </ProtectedRoute>
    ),
  },
  {
    path: '/expert-mode',
    element: (
      <ProtectedRoute>
        <ExpertMode />
      </ProtectedRoute>
    ),
  },
  {
    path: '/lightningMode',
    element: (
      <ProtectedRoute>
        <Questions />
      </ProtectedRoute>
    ),
  },

  // 🔄 Lazy-loaded routes with Suspense fallback
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading Login...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/catalog',
    element: (
      <Suspense fallback={<div>Loading Catalogue...</div>}>
        <Catalogue />
      </Suspense>
    ),
  },
  {
    path: '/orders',
    element: (
      <Suspense fallback={<div>Loading Orders...</div>}>
        <Orders />
      </Suspense>
    ),
  },
  {
    path: '/form',
    element: (
      <Suspense fallback={<div>Loading Jewelry Form...</div>}>
        <ProtectedRoute>
          <JewelryForm />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/option',
    element: (
      <Suspense fallback={<div>Loading Options...</div>}>
        <ProtectedRoute>
          <Option />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/modes',
    element: (
      <Suspense fallback={<div>Loading Modes...</div>}>
        <ProtectedRoute>
          <Modes />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/kinmitra_team',
    element: (
      <Suspense fallback={<div>Loading Team...</div>}>
        <TeamComponent />
      </Suspense>
    ),
  },
  {
    path: '/admin/*',
    element: (
      <Suspense fallback={<div>Loading Admin Dashboard...</div>}>
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'orders', element: <OrderPage /> },
      { path: 'cad', element: <CADPage /> },
    ],
  },
  {
    path: '/order/:orderID',
    element: (
      <Suspense fallback={<div>Loading Order Details...</div>}>
        <ProtectedRoute>
          <OrderDetailsPage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/cad/:cadId',
    element: (
      <Suspense fallback={<div>Loading CAD Details...</div>}>
        <ProtectedRoute>
          <CADDetailsPage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/imageManager',
    element: (
      <Suspense fallback={<div>Loading Image Manager...</div>}>
        <ProtectedRoute>
          <ImageGrid />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/filteredImages',
    element: (
      <Suspense fallback={<div>Loading Filtered Images...</div>}>
        <ProtectedRoute>
          <FilteredImageGrid />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/metadata-editor',
    element: (
      <Suspense fallback={<div>Loading Metadata Editor...</div>}>
        <ProtectedRoute>
          <MetadataEditor />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/profile-page',
    element: (
      <Suspense fallback={<div>Loading Profile...</div>}>
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />,
  },
]);

const App: React.FC = () => {
  return (
    <Authenticator.Provider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Authenticator.Provider>
  );
};

export default App;
