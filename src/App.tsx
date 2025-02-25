import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroPage from "./components/LandingPage/HeroPage.tsx";
import AIimages from "./components/AIimages.tsx";
import JewelryForm from "./components/Basic/BasicForm.tsx";
import Option from "./components/Basic/Option.tsx";
import Modes from "./components/Basic/Modes.tsx";
import Questions from "./components/LightningMode/Questions.tsx";
import Login from "./components/Login.tsx";
import { Authenticator } from "@aws-amplify/ui-react";
import Catalogue from "./components/BrowseCatalogue/Catalogue.tsx";
import DetailedImageView from "./components/BrowseCatalogue/DetailedImageView.tsx";
import EditImageData from "./components/BrowseCatalogue/EditImageData.tsx";
import LikedImages from "./components/BrowseCatalogue/LikedImages.tsx";
import DashboardPage from "./components/Dashboards/Admin/DashboardPage.tsx";
import OrderPage from "./components/Dashboards/Admin/OrderPage.tsx";
import AdminLayout from "./components/Dashboards/Admin/AdminLayout.tsx";
import Orders from "./components/BrowseCatalogue/Orders.tsx";
import OrderDetailsPage from "./components/Dashboards/Admin/OrderDetailsPage.tsx";
import CADPage from "./components/Dashboards/Admin/CADPage.tsx";
import CADDetailsPage from "./components/Dashboards/Admin/CADDetailsPage.tsx";
import ImageGrid from "./components/ImageManager/ImageGrid.tsx";
import FilteredImageGrid from "./components/ImageManager/FilteredImageGrid.tsx";
import ProModeChatUI from "./components/ProMode/chat.tsx";
import ContextProvider from "./context/context.tsx";
import ImgVar from "./components/ProMode/ImageVariation/imgVar.tsx";
import SetGen from "./components/ProMode/SetGeneration/SetGen.tsx";
import ProtectedRoute from "./ProtectedRoute";  // import the ProtectedRoute component
import ExpertMode from "./components/ExpertMode/ExpertMode.tsx";
import DemoForm from "./components/Contact/contactSAP.tsx";
import UserProfile from "./components/UserProfile/UserProfile.tsx";
import AstrologyForm from "./AstrologyFeature/AstrologyForm.tsx";
import AstrologySignature from "./AstrologyFeature/AstrologySignature.tsx";
import AstroJewelryApp from "./AstrologyFeature/images.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HeroPage /> },
  { path: "/login", element: <Login /> },
  { path: "/Contact-Us", element: <DemoForm/> },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/option",
    element: (
      <ProtectedRoute>
        <Option />
      </ProtectedRoute>
    ),
  },
  {
    path: "/modes",
    element: (
      <ProtectedRoute>
        <Modes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/form",
    element: (
      <ProtectedRoute>
        <JewelryForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lightningMode",
    element: (
      <ProtectedRoute>
        <Questions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/aiimages",
    element: (
      <ProtectedRoute>
        <AIimages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/catalog",
    element: (
      <ProtectedRoute>
        <Catalogue />
      </ProtectedRoute>
    ),
  },
  {
    path: "/catalog/likedimages",
    element: (
      <ProtectedRoute>
        <LikedImages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/catalog/:url",
    element: (
      <ProtectedRoute>
        <DetailedImageView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit",
    element: (
      <ProtectedRoute>
        <EditImageData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile-page",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/*",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <DashboardPage /> },
      { path: "orders", element: <OrderPage /> },
      { path: "cad", element: <CADPage /> },
    ],
  },
  {
    path: "/order/:orderID",
    element: (
      <ProtectedRoute>
        <OrderDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cad/:cadId",
    element: (
      <ProtectedRoute>
        <CADDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/imageManager",
    element: (
      <ProtectedRoute>
        <ImageGrid />
      </ProtectedRoute>
    ),
  },
  {
    path: "/filteredImages",
    element: (
      <ProtectedRoute>
        <FilteredImageGrid />
      </ProtectedRoute>
    ),
  },
  {
    path: "/promode",
    element: (
      <ProtectedRoute>
        <ContextProvider>
          <ProModeChatUI />
        </ContextProvider>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "ImageVariation",
        element: (
          <ProtectedRoute>
            <ImgVar />
          </ProtectedRoute>
        ),
      },
      {
        path: "SetGeneration",
        element: (
          <ProtectedRoute>
            <SetGen />
          </ProtectedRoute>
        ),
      },
    ],
  }, 
  {
    path: "/expert-mode",
    element: (
      <ProtectedRoute>
        <ExpertMode />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expert-mode/set-generation",
    element: (
      <ProtectedRoute>
        <SetGen />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expert-mode/image-variation",
    element: (
      <ProtectedRoute>
        <ImgVar />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expert-mode/astrology",
    element: (
      <ProtectedRoute>
        <AstrologyForm />
      </ProtectedRoute>
    ),
  }, 
  {
    path: "/expert-mode/astrology/astroSign",
    element: (
      <ProtectedRoute>
        <AstrologySignature />
      </ProtectedRoute>
    ),
  }, 
  {
    path: "/expert-mode/astrology/astroSign/astro-images",
    element: (
      <ProtectedRoute>
        <AstroJewelryApp />
      </ProtectedRoute>
    ),
  },
]);

const App: React.FC = () => {
  return (
    <Authenticator.Provider>
      <RouterProvider router={router} />
    </Authenticator.Provider>
  );
};

export default App;
