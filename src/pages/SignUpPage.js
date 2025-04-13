import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/pages/Signup.module.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    nickname: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    server: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      server: ""
    };

    if (formData.password !== formData.confirmPassword) {
      newErrors.username = "비밀번호가 일치하지 않습니다.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "이메일 형식에 맞지 않습니다.";
    }

    // setErrors((prev)=>newErrors);
    setErrors((prev) => ({ ...prev, newErrors }));

    // 에러 메시지 중 하나라도 있으면 false
    return !Object.values(newErrors).some((msg) => msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newUser = {
      username: formData.username,
      password: formData.password,
      passwordCheck: formData.confirmPassword,
      email: formData.email,
      nickname: formData.nickname
    };

    try {
      // const res = await fetch("http://localhost:9000/register", {
      const res = await fetch("http://localhost:9000/api/members/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      const data = await res.json();

      if (!res.ok) {
        alert("회원가입 실패");
        throw new Error(data.error || "회원가입에 실패했습니다.");
      }
      alert(data.message || "회원가입이 완료되었습니다.");
      navigate("/login-page");
    } catch (err) {
      alert("에러감지")
      setErrors((prev) => ({ ...prev, server: err.message }));
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.signupTitle}>회원가입</h2>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            아이디
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
          <label htmlFor="nickname" className={styles.label}>
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className={styles.input}
            placeholder="닉네임을 입력하세요"
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

        {/* 에러 메시지 출력 */}
        {errors.username && <p className={styles.errorMessage}>{errors.username}</p>}
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
        {errors.server && <p className={styles.errorMessage}>{errors.server}</p>}

        <button type="submit" className={styles.signupButton}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
