import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <div>
      <CitiesProvider>
        <AuthProvider>
          <RouterProvider router={AppRouter} />
        </AuthProvider>
      </CitiesProvider>
    </div>
  );
}
