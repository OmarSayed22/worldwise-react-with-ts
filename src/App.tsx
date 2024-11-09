import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { CitiesProvider } from "./contexts/CitiesContext";

export default function App() {
  return (
    <div>
      <CitiesProvider>
        <RouterProvider router={AppRouter} />
      </CitiesProvider>
    </div>
  );
}
