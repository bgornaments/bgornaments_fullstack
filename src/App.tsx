//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroPage from "./components/LandingPage/HeroPage.tsx";
import AIGenerated from "./components/AIGenerated.tsx";
import AIimages from "./components/AIimages.tsx";
import BasicForm from "./components/Basic/BasicForm.tsx"
import Option from "./components/Basic/Option.tsx"
import Modes from "./components/Basic/Modes.tsx";
import Questions from "./components/LightningMode/Questions.tsx";

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
    path:"/lightningMode",
    element:<Questions/>
  },
  // {
  //   path: "/aiquestions",
  //   element: <AIGenerated />,
  // },
  // {
  //   path: "/aiimages",
  //   element: <AIimages />,
  // },
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
