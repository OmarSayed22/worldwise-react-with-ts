import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import ProductPage from "../pages/ProductPage";
import PricingPage from "../pages/PricingPage";
import PageNotFound from "../pages/PageNotFound.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import AppLayout from "../pages/AppLayout.tsx";
import CityList from "../components/layout/CityList.tsx";
import CountryList from "../components/layout/CountryList.tsx";
import City from "../components/common/City.tsx";
import Form from "../components/common/Form.tsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="cities" />,
      },
      {
        path: "cities",
        element: <CityList />,
      },
      {
        path: "cities/:id",
        element: <City />,
      },

      {
        path: "countries",
        element: <CountryList />,
      },
      {
        path: "form",
        element: <Form />,
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default AppRouter;
