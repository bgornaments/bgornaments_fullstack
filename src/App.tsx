//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroPage from "./components/LandingPage/HeroPage.tsx";
// import AIGenerated from "./components/AIGenerated.tsx";
import AIimages from "./components/AIimages.tsx";
import BasicForm from "./components/Basic/BasicForm.tsx"
import Option from "./components/Basic/Option.tsx"
import Modes from "./components/Basic/Modes.tsx";
import Questions from "./components/LightningMode/Questions.tsx";
import Navbar from "./components/LandingPage/Navbar.jsx";
import Footer from "./components/LandingPage/Footer.jsx";
import Login from "./components/Login.tsx";

//const client = generateClient<Schema>();

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
    element: <BasicForm />,
  },
  {
    path: "/Navbar",
    element: <Navbar />,
  },
  {
    path:"/lightningMode",
    element:<Questions/>
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
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
