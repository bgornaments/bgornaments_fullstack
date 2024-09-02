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
import Orders from "./components/BrowseCatalogue/Orders.tsx"
import OrderDetailsPage from "./components/Dashboards/Admin/OrderDetailsPage.tsx";
import CADPage from "./components/Dashboards/Admin/CADPage.tsx";
import CADDetailsPage from "./components/Dashboards/Admin/CADDetailsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },

  {
    path: "/option",
    element: <Option />,
  },
  {
    path: "/modes",
    element: <Modes />,
  },
  {
    path: "/form",
    element: <JewelryForm />,
  },
  {
    path: "/lightningMode",
    element: <Questions />,
  },
  {
    path: "/aiimages",
    element: <AIimages />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  { 
    path: "/catalog", 
    element: <Catalogue /> 
  },
  {
    path: "/catalog/likedimages",
    element: <LikedImages />,
  },
  {
    path: "/catalog/:url",
    element: <DetailedImageView />,
  },

  {
    path: "/edit",
    element: <EditImageData />,
  },
  {
    path: "/admin/*",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "orders",
        element: <OrderPage />,
      },
      {
        path: "cad",
        element: <CADPage />,
      },
    ],
  },
  {
    path: "/order/:orderID",
    element: <OrderDetailsPage />,
  },
  {
    path: "/cad/:cadId",
    element: <CADDetailsPage />,
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
