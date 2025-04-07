import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isLogin, children }) => {
  return isLogin ? children : <Navigate to="/login-page" />;
};

export default PrivateRoute;