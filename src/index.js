
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

import App from "./App";
import AllProperties from "./properties/AllProperties";
import AllProperty from "./Property-details/AllProperty";
import AllContact from "./Contant/AllContact";
import Single from "./Property-details/Single";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/properties",
    element: <AllProperties />,
  },
  {
    path: "/property-details",
    element: <AllProperty />,
  },
  {
    path: "/property-details/:id",
    element: <Single />,
  },
  {
    path: "/contact",
    element: <AllContact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ScrollToTop smooth />
  </React.StrictMode>
);
