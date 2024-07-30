import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
// import { ThemeProvider } from "@aws-amplify/ui-react";
// import customTheme from './customTheme';
// import awsExports from './aws-exports';

// Configure Amplify
Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <ThemeProvider theme={customTheme}> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
