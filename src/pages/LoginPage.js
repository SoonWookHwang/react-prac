import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "../assets/styles/components/LoginPage.module.css";

const LoginPage = ({ setIsLogin, setLoginUser }) => {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState("username");
  const [userInfo, setUserInfo] = useState({ username: "", password: "", type: "username" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const toggleLoginMode = () => {
    setLoginMode((prev) => (prev === "id" ? "email" : "id"));
    setUserInfo((prev) => ({ ...prev, username: "" }));
    setLoginError("");
  };

  const login = async () => {
    const loginUrl = `http://localhost:9000/api/auth/login`;
    // ?username=${userInfo.username}&password=${userInfo.password}&type=${userInfo.type}
    try {
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(userInfo)
      });

      const data = await res.json();

      if (!res.ok) {
        // 서버에서 에러 메시지가 올 경우 출력
        setLoginError(data.message || "로그인에 실패했습니다.");
        return;
      }
      console.log(data)
      alert(data.message);
      setIsLogin(true);
      setLoginUser(data.nickname);
      navigate("/success")
    } catch (error) {
      console.error("로그인 요청 중 오류:", error);
      setLoginError("서버와의 연결에 실패했습니다.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    setTimeout(() => {
      try {
        login();
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
        {loginMode === "username" ? "이메일로 로그인" : "아이디로 로그인"}
      </button>

      <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            {loginMode === "username" ? "아이디" : "이메일"}
          </label>
          <input
            type={loginMode === "username" ? "text" : "email"}
            id="username"
            name="username"
            value={userInfo.username}
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
