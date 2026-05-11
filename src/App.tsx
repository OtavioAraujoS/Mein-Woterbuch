import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./layout";

import { SearchPage } from "./pages/search/page";
import "./index.css";
import Library from "./pages/library/page";
import { Toaster } from "./components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" theme="dark" richColors />
      <RouterProvider router={router} />
    </>
  );
}
