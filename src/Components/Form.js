import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MessageContext } from "../App";
import Logout from './Logout'

const Form = () => {

  const { setMessage } = useContext(MessageContext);

  return (
    <div>
      <Logout />
      <Link to="/result">一覧画面へ</Link>
      <h1>入力ページ</h1>
    </div>
  );
};

export default Form;
