import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { AuthContext, MessageContext } from "../App";

export const Login = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const { setMessage } = useContext(MessageContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const generateParams = () => {
    const loginParams = {
      email: email,
      password: password,
    };
    return loginParams;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res = await login(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/result");
      }
    } catch (e) {
      if (e.response.status === 401) {
        setMessage(e.response.data.errors);
      }
      console.log(e);
    }
  };
  return (
    <>
      <h1>ログインページです</h1>
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
        <button type="submit" onClick={(e) => handleLoginSubmit(e)}>
          ログイン
        </button>
      </form>
      <Link to="/signup">サインアップへ</Link>

      <div style={{ marginTop: '20px' }}>※テスト用アカウント</div>
      <div>test@example.com</div>
      <div>Pass1234</div>
    </>
  );
};

export default Login;
