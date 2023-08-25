import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>お探しのページは見つかりませんでした。</h1>
      <div>
        <Link to={`/login`}>ログイン画面に戻る</Link>
      </div>
    </>
  );
};

export default NotFound;