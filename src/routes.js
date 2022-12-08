import Home from "./pages/Home/Home";
import MainLayout from "./pages/MainLayout";
import Login from "./pages/Login/Login";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    auth: true,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    index: true,
    element: <Login />,
  },
];
