import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <div>
      <RouterProvider router={AppRouter} />
    </div>
  );
}
