import styles from "../assets/styles/components/Header.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Header = ({ isLogin, setIsLogin, loginUser }) => {
  console.log("loginUser", loginUser);
  const navigate = useNavigate();
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  useEffect(() => {
    const current_page = window.location.href;
    console.log(current_page);
    current_page.includes("/signup") ? setIsSignUpPage(true) : setIsSignUpPage(false);
  });
  const handleLogout = () => {
    // localStorage.removeItem("loginSuccess");
    Cookies.remove("loginSuccess", { path: "/" });
    Cookies.remove("loginUser", { path: "/" });
    setIsLogin(false);
    navigate("/login-page");
  };

  return (
    <div className={styles.headerContainer}>
      <ul className={styles.headerLeft}>
        <li>React Practice</li>
      </ul>
      <ul className={styles.headerRight}>
        {isLogin ? (
          <>
            <li>
              <div>
                <span className={styles.username}>{loginUser} </span>님
                환영합니다
              </div>
            </li>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          </>
        ) : (
          <li>
            {!isSignUpPage ? (
              <button onClick={() => navigate("/signup")}>회원가입</button>
            ) : <button onClick={() => navigate("/login-page")}>로그인</button>}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
