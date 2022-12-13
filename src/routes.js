import Home from "./pages/todo/Home";
import MainLayout from "./pages/todo/MainLayout";
import Login from "./pages/login/Login";
import Todo from "./pages/todo/NewTodo";
import EditTodo from "./pages/todo/EditTodo";

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
