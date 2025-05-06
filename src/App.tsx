import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import ProtectedRoute from './ProtectedRoute';
import ErrorBoundary from './ErrorBoundary';
import NotFoundPage from './NotFoundPage';

const Landing = React.lazy(() => import('./landingNew/main'));
const Login = React.lazy(() => import('./components/Login'));
const DemoForm = React.lazy(() => import('./components/Contact/contactSAP'));
const Option = React.lazy(() => import('./components/Basic/Option'));
const JewelryForm = React.lazy(() => import('./components/Basic/BasicForm'));
const Questions = React.lazy(() => import('./components/LightningMode/Questions'));
const Modes = React.lazy(() => import('./components/Basic/Modes'));
const AIimages = React.lazy(() => import('./components/AIimages'));
const Catalogue = React.lazy(() => import('./components/BrowseCatalogue/Catalogue'));
const LikedImages = React.lazy(() => import('./components/BrowseCatalogue/LikedImages'));
const DetailedImageView = React.lazy(() => import('./components/BrowseCatalogue/DetailedImageView'));
const EditImageData = React.lazy(() => import('./components/BrowseCatalogue/EditImageData'));
const MetadataEditor = React.lazy(() => import('./components/BrowseCatalogue/MetadataEditor'));
const Orders = React.lazy(() => import('./components/BrowseCatalogue/Orders'));
const DashboardPage = React.lazy(() => import('./components/Dashboards/Admin/DashboardPage'));
const OrderPage = React.lazy(() => import('./components/Dashboards/Admin/OrderPage'));
const AdminLayout = React.lazy(() => import('./components/Dashboards/Admin/AdminLayout'));
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
const UserProfile = React.lazy(() => import('./components/UserProfile/UserProfile'));
const AstrologyForm = React.lazy(() => import('./AstrologyFeature/AstrologyForm'));
const AstrologySignature = React.lazy(() => import('./AstrologyFeature/AstrologySignature'));
const AstroJewelryApp = React.lazy(() => import('./AstrologyFeature/images'));
const SketchToJwellery = React.lazy(() => import('./SketchToJwellery/Sketch2Jwellery_landing'));
const SketchModification = React.lazy(() => import('./SketchToJwellery/Sketchmodification'));
const TermsAndConditions = React.lazy(() => import('./components/LandingPage/terms_and_conditions'));
const PrivacyNotice = React.lazy(() => import('./components/LandingPage/privacy_notice'));
const TeamComponent = React.lazy(() => import('./landingNew/KinMitraTeam'));

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/Contact-Us', element: <DemoForm /> },
  { path: '/terms-and-conditions', element: <TermsAndConditions /> },
  { path: '/privacy-Notice', element: <PrivacyNotice /> },
  { path: '/orders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
  { path: '/option', element: <ProtectedRoute><Option /></ProtectedRoute> },
  { path: '/modes', element: <ProtectedRoute><Modes /></ProtectedRoute> },
  { path: '/kinmitra_team', element: <TeamComponent /> },
  { path: '/form', element: <ProtectedRoute><JewelryForm /></ProtectedRoute> },
  { path: '/lightningMode', element: <ProtectedRoute><Questions /></ProtectedRoute> },
  { path: '/aiimages', element: <ProtectedRoute><AIimages /></ProtectedRoute> },
  { path: '/catalog', element: <ProtectedRoute><Catalogue /></ProtectedRoute> },
  { path: '/catalog/likedimages', element: <ProtectedRoute><LikedImages /></ProtectedRoute> },
  { path: '/catalog/:url', element: <ProtectedRoute><DetailedImageView /></ProtectedRoute> },
  { path: '/edit', element: <ProtectedRoute><EditImageData /></ProtectedRoute> },
  { path: '/metadata-editor', element: <ProtectedRoute><MetadataEditor /></ProtectedRoute> },
  { path: '/profile-page', element: <ProtectedRoute><UserProfile /></ProtectedRoute> },
  {
    path: '/admin/*',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'orders', element: <OrderPage /> },
      { path: 'cad', element: <CADPage /> },
    ],
  },
  { path: '/order/:orderID', element: <ProtectedRoute><OrderDetailsPage /></ProtectedRoute> },
  { path: '/cad/:cadId', element: <ProtectedRoute><CADDetailsPage /></ProtectedRoute> },
  { path: '/imageManager', element: <ProtectedRoute><ImageGrid /></ProtectedRoute> },
  { path: '/filteredImages', element: <ProtectedRoute><FilteredImageGrid /></ProtectedRoute> },
  {
    path: '/promode',
    element: <ProtectedRoute><ContextProvider><ProModeChatUI /></ContextProvider></ProtectedRoute>,
    children: [
      { path: 'ImageVariation', element: <ProtectedRoute><ImgVar /></ProtectedRoute> },
      { path: 'SetGeneration', element: <ProtectedRoute><SetGen /></ProtectedRoute> },
    ],
  },
  { path: '/expert-mode', element: <ProtectedRoute><ExpertMode /></ProtectedRoute> },
  { path: '/expert-mode/set-generation', element: <ProtectedRoute><SetGen /></ProtectedRoute> },
  { path: '/expert-mode/image-variation', element: <ProtectedRoute><ImgVar /></ProtectedRoute> },
  { path: '/expert-mode/astrology', element: <ProtectedRoute><AstrologyForm /></ProtectedRoute> },
  { path: '/expert-mode/astrology/astroSign', element: <ProtectedRoute><AstrologySignature /></ProtectedRoute> },
  { path: '/expert-mode/astrology/astroSign/astro-images', element: <ProtectedRoute><AstroJewelryApp /></ProtectedRoute> },
  { path: '/expert-mode/sketchToJwellery', element: <ProtectedRoute><SketchToJwellery /></ProtectedRoute> },
  { path: '/expert-mode/sketchToJwellery/sketchModification', element: <ProtectedRoute><SketchModification /></ProtectedRoute> },
  { path: '*', element: <NotFoundPage />, errorElement: <NotFoundPage /> },
]);

const App: React.FC = () => {
  return (
    <Authenticator.Provider>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </Authenticator.Provider>
  );
};

export default App;