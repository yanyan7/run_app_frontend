import Cookies from "js-cookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { AuthContext } from "../App";

const Logout = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.set("_access_token", '');
      Cookies.set("_client", '');
      Cookies.set("_uid", '');
      setCurrentUser('');
      setIsSignedIn(false);
      navigate('/login',{state: {message: 'ログアウトしました'}});
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button onClick={handleLogout}>ログアウト</button>
  )
} 

export default Logout;
