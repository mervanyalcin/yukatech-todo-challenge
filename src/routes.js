import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import Login from "./pages/Login";
import NewTodo from "./pages/NewTodo";

export const routes = [
  {
    element: <MainLayout />,
    auth: true,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/newtodo",
        element: <NewTodo />
      }
    ],
  },
  
  {
    path: "/login",
    index: true,
    element: <Login />,
  },
];
