import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => {
  const token = localStorage.getItem("token");

  let auth = { token: false };
  if (token) {
    auth.token = true;
  }

  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
