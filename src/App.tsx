import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AIimages from './components/AIimages';
import JewelryForm from './components/Basic/BasicForm';
import Option from './components/Basic/Option';
import Modes from './components/Basic/Modes';
import Questions from './components/LightningMode/Questions';
import Login from './components/Login';
import { Authenticator } from '@aws-amplify/ui-react';
import Catalogue from './components/BrowseCatalogue/Catalogue';
import DetailedImageView from './components/BrowseCatalogue/DetailedImageView';
import EditImageData from './components/BrowseCatalogue/EditImageData';
import LikedImages from './components/BrowseCatalogue/LikedImages';
import DashboardPage from './components/Dashboards/Admin/DashboardPage';
import OrderPage from './components/Dashboards/Admin/OrderPage';
import AdminLayout from './components/Dashboards/Admin/AdminLayout';
import Orders from './components/BrowseCatalogue/Orders';
import OrderDetailsPage from './components/Dashboards/Admin/OrderDetailsPage';
import CADPage from './components/Dashboards/Admin/CADPage';
import CADDetailsPage from './components/Dashboards/Admin/CADDetailsPage';
import ImageGrid from './components/ImageManager/ImageGrid';
import FilteredImageGrid from './components/ImageManager/FilteredImageGrid';
import ProModeChatUI from './components/ProMode/chat';
import ContextProvider from './context/context';
import ImgVar from './components/ProMode/ImageVariation/imgVar';
import SetGen from './components/ProMode/SetGeneration/SetGen';
import ProtectedRoute from './ProtectedRoute';
import ExpertMode from './components/ExpertMode/ExpertMode';
import DemoForm from './components/Contact/contactSAP';
import UserProfile from './components/UserProfile/UserProfile';
import AstrologyForm from './AstrologyFeature/AstrologyForm';
import AstrologySignature from './AstrologyFeature/AstrologySignature';
import AstroJewelryApp from './AstrologyFeature/images';
import SketchToJwellery from './SketchToJwellery/Sketch2Jwellery_landing';
import SketchModification from './SketchToJwellery/Sketchmodification';
import MetadataEditor from './components/BrowseCatalogue/MetadataEditor';
import TermsAndConditions from './components/LandingPage/terms_and_conditions';
import PrivacyNotice from './components/LandingPage/privacy_notice';
import Landing from './landingNew/main';
import TeamComponent from './landingNew/KinMitraTeam';
import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary
import NotFoundPage from './NotFoundPage'; // Import NotFoundPage

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/Contact-Us', element: <DemoForm /> },
  { path: '/terms-and-conditions', element: <TermsAndConditions /> },
  { path: '/privacy-Notice', element: <PrivacyNotice /> },
  {
    path: '/orders',
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: '/option',
    element: (
      <ProtectedRoute>
        <Option />
      </ProtectedRoute>
    ),
  },
  {
    path: '/modes',
    element: (
      <ProtectedRoute>
        <Modes />
      </ProtectedRoute>
    ),
  },
  {
    path: '/kinmitra_team',
    element: <TeamComponent />,
  },
  {
    path: '/form',
    element: (
      <ProtectedRoute>
        <JewelryForm />
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
  {
    path: '/aiimages',
    element: (
      <ProtectedRoute>
        <AIimages />
      </ProtectedRoute>
    ),
  },
  {
    path: '/catalog',
    element: (
      <ProtectedRoute>
        <Catalogue />
      </ProtectedRoute>
    ),
  },
  {
    path: '/catalog/likedimages',
    element: (
      <ProtectedRoute>
        <LikedImages />
      </ProtectedRoute>
    ),
  },
  {
    path: '/catalog/:url',
    element: (
      <ProtectedRoute>
        <DetailedImageView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/edit',
    element: (
      <ProtectedRoute>
        <EditImageData />
      </ProtectedRoute>
    ),
  },
  {
    path: '/metadata-editor',
    element: (
      <ProtectedRoute>
        <MetadataEditor />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile-page',
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/*',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
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
      <ProtectedRoute>
        <OrderDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/cad/:cadId',
    element: (
      <ProtectedRoute>
        <CADDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/imageManager',
    element: (
      <ProtectedRoute>
        <ImageGrid />
      </ProtectedRoute>
    ),
  },
  {
    path: '/filteredImages',
    element: (
      <ProtectedRoute>
        <FilteredImageGrid />
      </ProtectedRoute>
    ),
  },
  {
    path: '/promode',
    element: (
      <ProtectedRoute>
        <ContextProvider>
          <ProModeChatUI />
        </ContextProvider>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'ImageVariation',
        element: (
          <ProtectedRoute>
            <ImgVar />
          </ProtectedRoute>
        ),
      },
      {
        path: 'SetGeneration',
        element: (
          <ProtectedRoute>
            <SetGen />
          </ProtectedRoute>
        ),
      },
    ],
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
    path: '/expert-mode/set-generation',
    element: (
      <ProtectedRoute>
        <SetGen />
      </ProtectedRoute>
    ),
  },
  {
    path: '/expert-mode/image-variation',
    element: (
      <ProtectedRoute>
        <ImgVar />
      </ProtectedRoute>
    ),
  },
  {
    path: '/expert-mode/astrology',
    element: (
      <ProtectedRoute>
        <AstrologyForm />
      </ProtectedRoute>
    ),
  },
  {
    path: '/expert-mode/astrology/astroSign',
    element: (
      <ProtectedRoute>
        <AstrologySignature />
      </ProtectedRoute>
    ),
  },
  {
    path: '/expert-mode/astrology/astroSign/astro-images',
    element: (
      <ProtectedRoute>
        <AstroJewelryApp />
      </ProtectedRoute>
    ),
  },
  {
    path: '/expert-mode/sketchToJwellery',
    element: (
      <ProtectedRoute>
        <SketchToJwellery />
      </ProtectedRoute>
    ),
  },
  {
    path: '/expert-mode/sketchToJwellery/sketchModification',
    element: (
      <ProtectedRoute>
        <SketchModification />
      </ProtectedRoute>
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