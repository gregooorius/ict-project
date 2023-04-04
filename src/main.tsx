import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Details } from "./Pages/Details";
import { Home } from "./Pages/Home";
import { Provider } from "react-redux";
import { store } from "./store";
import { Favorites } from "./Pages/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "favorites/",
        element: <Favorites/>,
      },
      {
        path: "artwork/:id",
        element: <Details />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
