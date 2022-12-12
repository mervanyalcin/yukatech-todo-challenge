import { routes } from "./routes";
import { Navigate, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate()
  const showRoutes = useRoutes(routes);





  return <>{showRoutes}</>;
}

export default App;
