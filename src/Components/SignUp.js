import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";
import { MessageContext } from "../App";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { setMessage } = useContext(MessageContext);
  const navigate = useNavigate();

  const generateParams = () => {
    const signUpParams = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    };
    return signUpParams;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    try {
      const res = await signUp(params);
      console.log(res);
      navigate('/login');
      setMessage('ユーザーを登録しました');
    } catch (e) {
      if (e.response.status === 422) {
        setMessage(e.response.data.errors.fullMessages);
      }
      console.log(e);
    }
  };
  return (
    <>
      <h1>サインアップページです</h1>
      <form>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">パスワード確認</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button type="submit" onClick={(e) => handleSignUpSubmit(e)}>
          認証
        </button>
      </form>
      <Link to="/login">ログインへ</Link>
    </>
  );
};

export default SignUp;
