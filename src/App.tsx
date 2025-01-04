import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";
import HeroPage from "./components/LandingPage/HeroPage.tsx";
import AIimages from "./components/AIimages.tsx";
import JewelryForm from "./components/Basic/BasicForm.tsx";
import Option from "./components/Basic/Option.tsx";
import Modes from "./components/Basic/Modes.tsx";
import Questions from "./components/LightningMode/Questions.tsx";
import Login from "./components/Login.tsx";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
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
import { useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { route } = useAuthenticator();
  const location = useLocation();

  if (route !== "authenticated") {
    // Save the originally requested path in localStorage before redirecting
    localStorage.setItem("redirectPath", location.pathname);
    return <Navigate to="/login" replace />;
  }

  return element;
};

const LoginWrapper: React.FC = () => {
  const { route } = useAuthenticator();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (route === "authenticated") {
      const redirectPath = localStorage.getItem("redirectPath");
      localStorage.removeItem("redirectPath");

      // Ensure redirectPath is not null before navigating
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate("/"); // Fallback to a default path
      }
    }
  }, [route, navigate]);

  return <Login />;
};


const router = createBrowserRouter([
  { path: "/", element: <HeroPage /> },
  { path: "/orders", element: <ProtectedRoute element={<Orders />} /> },
  { path: "/option", element: <ProtectedRoute element={<Option />} /> },
  { path: "/modes", element: <ProtectedRoute element={<Modes />} /> },
  { path: "/form", element: <ProtectedRoute element={<JewelryForm />} /> },
  { path: "/lightningMode", element: <ProtectedRoute element={<Questions />} /> },
  { path: "/aiimages", element: <ProtectedRoute element={<AIimages />} /> },
  { path: "/catalog", element: <ProtectedRoute element={<Catalogue />} /> },
  { path: "/catalog/likedimages", element: <ProtectedRoute element={<LikedImages />} /> },
  { path: "/catalog/:url", element: <ProtectedRoute element={<DetailedImageView />} /> },
  { path: "/edit", element: <ProtectedRoute element={<EditImageData />} /> },
  {
    path: "/admin/*",
    element: <ProtectedRoute element={<AdminLayout />} />,
    children: [
      { path: "", element: <ProtectedRoute element={<DashboardPage />} /> },
      { path: "orders", element: <ProtectedRoute element={<OrderPage />} /> },
      { path: "cad", element: <ProtectedRoute element={<CADPage />} /> },
    ],
  },
  { path: "/order/:orderID", element: <ProtectedRoute element={<OrderDetailsPage />} /> },
  { path: "/cad/:cadId", element: <ProtectedRoute element={<CADDetailsPage />} /> },
  { path: "/imageManager", element: <ProtectedRoute element={<ImageGrid />} /> },
  { path: "/filteredImages", element: <ProtectedRoute element={<FilteredImageGrid />} /> },
  {
    path: "/promode",
    element: (
      <ProtectedRoute
        element={
          <ContextProvider>
            <ProModeChatUI />
          </ContextProvider>
        }
      />
    ),
    children: [
      { path: "ImageVariation", element: <ProtectedRoute element={<ImgVar />} /> },
      { path: "SetGeneration", element: <ProtectedRoute element={<SetGen />} /> },
    ],
  },
  { path: "/login", element: <LoginWrapper /> },
]);

const App: React.FC = () => {
  return (
    <Authenticator.Provider>
      <RouterProvider router={router} />
    </Authenticator.Provider>
  );
};

export default App;
