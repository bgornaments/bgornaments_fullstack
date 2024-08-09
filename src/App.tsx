import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroPage from "./components/LandingPage/HeroPage.tsx";
import AIimages from "./components/AIimages.tsx";
import BasicForm from "./components/Basic/BasicForm.tsx";
import Option from "./components/Basic/Option.tsx";
import Modes from "./components/Basic/Modes.tsx";
import Questions from "./components/LightningMode/Questions.tsx";
import Navbar from "./components/LandingPage/Navbar.jsx";
import Footer from "./components/LandingPage/Footer.jsx";
import Login from "./components/Login.tsx";
import { Authenticator } from "@aws-amplify/ui-react";
import Catalogue from "./components/BrowseCatalogue/Catalogue.tsx"
import DetailedImageView from "./components/BrowseCatalogue/DetailedImageView.tsx";
// import LikedImages from "./components/BrowseCatalogue/LikedImages.tsx";

// const RequireAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const { route } = useAuthenticator();
//   if (route !== "authenticated") {
//     return <Navigate to="/login" />;
//   }
//   return <>{children}</>;
// };

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
  },
  {
    path: "/catalog/:id", 
    element: <DetailedImageView />,
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
