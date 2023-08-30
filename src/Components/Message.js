const Message = ({ message }) => {
  if (typeof message === 'object') return message.map((item, index) => <p key={index}>{item}</p>)
  if (message) return message;
};

export default Message;
