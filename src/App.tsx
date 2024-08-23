import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroPage from "./components/LandingPage/HeroPage.tsx";
import AIimages from "./components/AIimages.tsx";
import JewelryForm from "./components/Basic/BasicForm.tsx";
import Option from "./components/Basic/Option.tsx";
import Modes from "./components/Basic/Modes.tsx";
import Questions from "./components/LightningMode/Questions.tsx";
import Navbar from "./components/LandingPage/Navbar.jsx";
import Footer from "./components/LandingPage/Footer.jsx";
import Login from "./components/Login.tsx";
import { Authenticator } from "@aws-amplify/ui-react";
import Catalogue from "./components/BrowseCatalogue/Catalogue.tsx";
import DetailedImageView from "./components/BrowseCatalogue/DetailedImageView.tsx";
import EditImageData from "./components/BrowseCatalogue/EditImageData.tsx";
import LikedImages from "./components/BrowseCatalogue/LikedImages.tsx";
import DashboardPage from "./components/Dashboards/Admin/DashboardPage.tsx";
import OrderPage from "./components/Dashboards/Admin/OrderPage.tsx";
import AdminLayout from "./components/Dashboards/Admin/AdminLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
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
    path: "/navbar",
    element: <Navbar />,
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
    path: "/footer",
    element: <Footer />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/catalog",
    element: <Catalogue />,
    children: [
      {
        path: "likedimages",
        element: <LikedImages />,
      },
      {
        path: ":url",
        element: <DetailedImageView />,
      },
    ],
  },
  {
    path: "/edit",
    element: <EditImageData />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
   