import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import Login from "./pages/Login";
import Todo from "./pages/NewTodo";
import EditTodo from "./pages/EditTodo";

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
      {
        path: "newtodo",
        element: <Todo />
      },
      {
        path: "edit/:id",
        element: <EditTodo />
      },
    ],
    
  },
  
  {
    path: "login", 
    element: <Login />,
  },

];
