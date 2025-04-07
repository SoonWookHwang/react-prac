import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import SuccessPage from "./pages/SuccessLogin";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    const success = Cookies.get("loginSuccess") === "true";
    setIsLogin(success);
  
    if (success) {
      const user = Cookies.get("loginUser");
      console.log("loginUser-app", user);
      setLoginUser(user);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} loginUser={loginUser} />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLogin ? "/success" : "/login-page"} />}
          />
          <Route
            path="/login-page"
            element={<LoginPage setIsLogin={setIsLogin} setLoginUser={setLoginUser}/>}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/success"
            element={
              <PrivateRoute isLogin={isLogin}>
                <SuccessPage loginUser={loginUser} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
