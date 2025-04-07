import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/pages/Signup.module.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError("");

    if (formData.password !== formData.confirmPassword) {
      setUsernameError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 기존 회원 목록 가져오기 (없으면 빈 배열)
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // 새 회원 정보
    const newUser = {
      loginId: formData.loginId,
      password: formData.password,
      email: formData.email,
    };

    // 동일한 아이디 존재 여부 체크
    const isDuplicate = existingUsers.some(
      (user) => user.loginId === newUser.loginId
    );
    const emailValidation = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(newUser.email);
    };

    !emailValidation()
      ? setEmailError("이메일 형식에 맞지 않습니다")
      : setEmailError("");

    if (isDuplicate) {
      setUsernameError("이미 존재하는 아이디입니다.");
      return;
    }

    // 새 회원 추가
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("회원가입이 완료되었습니다.");
    navigate("/login-page");
  };

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.signupTitle}>회원가입</h2>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <div className={styles.formGroup}>
          <label htmlFor="loginId" className={styles.label}>
            아이디
          </label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            value={formData.loginId}
            onChange={handleChange}
            className={styles.input}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="이메일을 입력하세요"
            required
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
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </div>
        {usernameError && (
          <p className={styles.errorMessage}>{usernameError}</p>
        )}
        {emailError && <p className={styles.errorMessage}>{emailError}</p>}
        <button type="submit" className={styles.signupButton}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
