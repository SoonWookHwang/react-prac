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
  useEffect(() => {
    const url = "https://apis.data.go.kr/B551011/KorPetTourService/detailIntro?serviceKey=koIDyUGqlic4RW3BT%2F0jpFe6QAyurUul%2B5ptcvujSy02%2FXtypSeDpl6uukW7y48MtbyPkVkKUbxy73%2F5hcYGbQ%3D%3D&MobileOS=ETC&MobileApp=test&contentId=2627867&contentTypeId=32&_type=json";
    const callApi = async () => {
      const res = await fetch(url);
      const data = await res.json();
      console.log("api data ", data)
    }
    callApi();
  }, [])
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
            element={<LoginPage setIsLogin={setIsLogin} setLoginUser={setLoginUser} />}
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
