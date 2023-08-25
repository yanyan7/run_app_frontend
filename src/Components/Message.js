import { useContext } from "react";
import { MessageContext } from "../App";

const Message = () => {
  const { message } = useContext(MessageContext);

  if (typeof message === 'object') return message.map((item, index) => <p key={index}>{item}</p>)
  if (message) return message;
};

export default Message;
