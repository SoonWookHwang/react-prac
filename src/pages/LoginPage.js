import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "../assets/styles/components/LoginPage.module.css";

const LoginPage = ({ setIsLogin, setLoginUser }) => {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState("id");
  const [userInfo, setUserInfo] = useState({ loginId: "", password: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const toggleLoginMode = () => {
    setLoginMode((prev) => (prev === "id" ? "email" : "id"));
    setUserInfo((prev) => ({ ...prev, loginId: "" }));
    setLoginError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    setTimeout(() => {
      try {
        // 회원 db(로컬스토리지)에서 로그인 유효성 검증
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const matchedUser = users.find((user) => {
          if (
            user.password === userInfo.password &&
            (loginMode === "id"
              ? user.loginId === userInfo.loginId
              : user.email === userInfo.loginId)
          ) {
            // 유효할 때 로그인된 유저를 리턴
            return user;
          } else {
            // 유효하지 않을때 null 반환
            return null;
          }
        });
        // 유효하다면
        if (matchedUser) {
          // 로그인 상태와 로그인 유저 정보를 쿠키에 저장
          Cookies.set("loginSuccess", "true", { path: "/" });
          console.log("matchedUser", matchedUser);
          Cookies.set("loginUser", matchedUser.loginId, { path: "/" });
          setIsLogin(true);
          // 이렇게 안하면 바로 반영이 안됌
          setLoginUser(matchedUser.loginId);
          navigate("/success");
        } else {
          setLoginError("아이디/이메일 또는 비밀번호가 틀렸습니다.");
        }
      } catch (error) {
        setLoginError("로그인 중 오류가 발생했습니다.");
      } finally {
        setIsLoggingIn(false);
      }
    }, 2000);
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>로그인</h2>
      <button
        type="button"
        onClick={toggleLoginMode}
        className={styles.toggleButton}
      >
        {loginMode === "id" ? "이메일로 로그인" : "아이디로 로그인"}
      </button>

      <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="loginId" className={styles.label}>
            {loginMode === "id" ? "아이디" : "이메일"}
          </label>
          <input
            type={loginMode === "id" ? "text" : "email"}
            id="loginId"
            name="loginId"
            value={userInfo.loginId}
            onChange={handleChange}
            placeholder={
              loginMode === "id" ? "아이디를 입력하세요" : "이메일을 입력하세요"
            }
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            className={styles.input}
          />
        </div>
        {loginError && <p className={styles.errorMessage}>{loginError}</p>}
        <button
          type="submit"
          disabled={isLoggingIn}
          className={styles.loginButton}
        >
          {isLoggingIn ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <p className={styles.signupLink}>
        아직 계정이 없으신가요?{" "}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className={styles.signupButton}
        >
          회원가입
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
