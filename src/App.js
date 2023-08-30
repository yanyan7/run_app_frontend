import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "./api/auth";
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Result from './Components/Result';
import Form from './Components/Form';
import NotFound from './Components/NotFound';
import Message from './Components/Message'

export const AuthContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [message, setMessage] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        const message = 'セッションが切れました。ログインして下さい。';
        return <Navigate replace to="/login" state={{message: message}} key={'aaa'} />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser
      }}
    >
      
      <Message message={message} />
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Login />} />
          <Route path={`/signup`} element={<SignUp />} />
          <Route path={`/login`} element={<Login />} />
          <Route
            path={`/result`}
            element={
              <Private path={`/result`}>
                <Result />
              </Private>
            }
          />
          <Route
            path={`/form/:dailyId`}
            element={
              <Private path={`/form/:dailyId`}>
                <Form />
              </Private>
            }
          />
          <Route path={`/*`} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
