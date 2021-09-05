import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {HelmetProvider} from 'react-helmet-async'

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
