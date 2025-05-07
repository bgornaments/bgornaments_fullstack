import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import ProtectedRoute from './ProtectedRoute';
import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary
import NotFoundPage from './NotFoundPage'; // Import NotFoundPage

// 🚀 Eager-loaded component
import Landing from './landingNew/main';

// 🔄 Lazy-loaded components (Non-critical Paths)
const AIimages = React.lazy(() => import('./components/AIimages'));
const JewelryForm = React.lazy(() => import('./components/Basic/BasicForm'));
const Option = React.lazy(() => import('./components/Basic/Option'));
const Modes = React.lazy(() => import('./components/Basic/Modes'));
const Questions = React.lazy(() => import('./components/LightningMode/Questions'));
const Login = React.lazy(() => import('./components/Login'));
const Catalogue = React.lazy(() => import('./components/BrowseCatalogue/Catalogue'));
const DetailedImageView = React.lazy(() => import('./components/BrowseCatalogue/DetailedImageView'));
const EditImageData = React.lazy(() => import('./components/BrowseCatalogue/EditImageData'));
const LikedImages = React.lazy(() => import('./components/BrowseCatalogue/LikedImages'));
const DashboardPage = React.lazy(() => import('./components/Dashboards/Admin/DashboardPage'));
const OrderPage = React.lazy(() => import('./components/Dashboards/Admin/OrderPage'));
const AdminLayout = React.lazy(() => import('./components/Dashboards/Admin/AdminLayout'));
const Orders = React.lazy(() => import('./components/BrowseCatalogue/Orders'));
const OrderDetailsPage = React.lazy(() => import('./components/Dashboards/Admin/OrderDetailsPage'));
const CADPage = React.lazy(() => import('./components/Dashboards/Admin/CADPage'));
const CADDetailsPage = React.lazy(() => import('./components/Dashboards/Admin/CADDetailsPage'));
const ImageGrid = React.lazy(() => import('./components/ImageManager/ImageGrid'));
const FilteredImageGrid = React.lazy(() => import('./components/ImageManager/FilteredImageGrid'));
const ProModeChatUI = React.lazy(() => import('./components/ProMode/chat'));
const ContextProvider = React.lazy(() => import('./context/context'));
const ImgVar = React.lazy(() => import('./components/ProMode/ImageVariation/imgVar'));
const SetGen = React.lazy(() => import('./components/ProMode/SetGeneration/SetGen'));
const ExpertMode = React.lazy(() => import('./components/ExpertMode/ExpertMode'));
const DemoForm = React.lazy(() => import('./components/Contact/contactSAP'));
const UserProfile = React.lazy(() => import('./components/UserProfile/UserProfile'));
const AstrologyForm = React.lazy(() => import('./AstrologyFeature/AstrologyForm'));
const AstrologySignature = React.lazy(() => import('./AstrologyFeature/AstrologySignature'));
const AstroJewelryApp = React.lazy(() => import('./AstrologyFeature/images'));
const SketchToJwellery = React.lazy(() => import('./SketchToJwellery/Sketch2Jwellery_landing'));
const SketchModification = React.lazy(() => import('./SketchToJwellery/Sketchmodification'));
const MetadataEditor = React.lazy(() => import('./components/BrowseCatalogue/MetadataEditor'));
const TermsAndConditions = React.lazy(() => import('./components/LandingPage/terms_and_conditions'));
const PrivacyNotice = React.lazy(() => import('./components/LandingPage/privacy_notice'));
const TeamComponent = React.lazy(() => import('./landingNew/KinMitraTeam'));

// Defining the router with lazy-loaded routes
const router = createBrowserRouter([
  // 🚀 Eager-loaded routes
  { path: '/', element: <Landing /> },

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
    path: '/Contact-Us',
    element: (
      <Suspense fallback={<div>Loading Contact Form...</div>}>
        <DemoForm />
      </Suspense>
    ),
  },
  {
    path: '/terms-and-conditions',
    element: (
      <Suspense fallback={<div>Loading Terms and Conditions...</div>}>
        <TermsAndConditions />
      </Suspense>
    ),
  },
  {
    path: '/privacy-Notice',
    element: (
      <Suspense fallback={<div>Loading Privacy Notice...</div>}>
        <PrivacyNotice />
      </Suspense>
    ),
  },
  {
    path: '/orders',
    element: (
      <Suspense fallback={<div>Loading Orders...</div>}>
        <ProtectedRoute>
          <Orders />
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
    path: '/lightningMode',
    element: (
      <Suspense fallback={<div>Loading Lightning Mode...</div>}>
        <ProtectedRoute>
          <Questions />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/aiimages',
    element: (
      <Suspense fallback={<div>Loading AI Images...</div>}>
        <ProtectedRoute>
          <AIimages />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/catalog',
    element: (
      <Suspense fallback={<div>Loading Catalogue...</div>}>
        <ProtectedRoute>
          <Catalogue />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/catalog/likedimages',
    element: (
      <Suspense fallback={<div>Loading Liked Images...</div>}>
        <ProtectedRoute>
          <LikedImages />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/catalog/:url',
    element: (
      <Suspense fallback={<div>Loading Detailed Image...</div>}>
        <ProtectedRoute>
          <DetailedImageView />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/edit',
    element: (
      <Suspense fallback={<div>Loading Edit Image Data...</div>}>
        <ProtectedRoute>
          <EditImageData />
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
    path: '/admin/*',
    element: (
      <Suspense fallback={<div>Loading Admin Layout...</div>}>
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
    path: '/promode',
    element: (
      <Suspense fallback={<div>Loading ProMode...</div>}>
        <ProtectedRoute>
          <ContextProvider>
            <ProModeChatUI />
          </ContextProvider>
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        path: 'ImageVariation',
        element: (
          <Suspense fallback={<div>Loading Image Variation...</div>}>
            <ProtectedRoute>
              <ImgVar />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: 'SetGeneration',
        element: (
          <Suspense fallback={<div>Loading Set Generation...</div>}>
            <ProtectedRoute>
              <SetGen />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/expert-mode',
    element: (
      <Suspense fallback={<div>Loading Expert Mode...</div>}>
        <ProtectedRoute>
          <ExpertMode />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/expert-mode/set-generation',
    element: (
      <Suspense fallback={<div>Loading Set Generation...</div>}>
        <ProtectedRoute>
          <SetGen />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/expert-mode/image-variation',
    element: (
      <Suspense fallback={<div>Loading Image Variation...</div>}>
        <ProtectedRoute>
          <ImgVar />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/expert-mode/astrology',
    element: (
      <Suspense fallback={<div>Loading Astrology...</div>}>
        <ProtectedRoute>
          <AstrologyForm />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/expert-mode/astrology/astroSign',
    element: (
      <Suspense fallback={<div>Loading Astrology Signature...</div>}>
        <ProtectedRoute>
          <AstrologySignature />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/expert-mode/astrology/astroSign/astro-images',
    element: (
      <Suspense fallback={<div>Loading Astro Jewelry App...</div>}>
        <ProtectedRoute>
          <AstroJewelryApp />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/expert-mode/sketchToJwellery',
    element: (
      <Suspense fallback={<div>Loading Sketch to Jewelry...</div>}>
        <ProtectedRoute>
          <SketchToJwellery />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/expert-mode/sketchToJwellery/sketchModification',
    element: (
      <Suspense fallback={<div>Loading Sketch Modification...</div>}>
        <ProtectedRoute>
          <SketchModification />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    // Catch-all route for navigation errors (404)
    path: '*',
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />, // Handle navigation errors
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
