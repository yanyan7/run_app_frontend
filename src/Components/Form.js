import { useEffect, useState, useContext } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import Logout from './Logout'
import Message from './Message'
import { getDaily, createDaily, updateDaily } from "../api/daily";
import { getSleepPatterns } from "../api/sleepPattern";
import { getTimings } from "../api/timing";

const Form = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const initialDaily = {
    // id: '',
    date: location.state.date,
    userId: currentUser.id,
    sleepPatternId: null,
    weight: null,
    note: null,
    results: []
  };
  const initialResult = {
    // id: '',
    dailyId: '',
    userId: currentUser.id,
    date: location.state.date,
    temperature: null,
    timingId: null,
    content: null,
    distance: null,
    timeH: null,
    timeM: null,
    timeS: null,
    paceM: null,
    paceS: null,
    place: null,
    shoes: null,
    note: null
  };
  
  const dailyId = useParams().dailyId;
  const [daily, setDaily] = useState(initialDaily);
  const [sleepPatterns, setSleepPatterns] = useState([]);
  const [timings, setTimings] = useState([]);
  const [message, setMessage] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        const response = await getDaily(dailyId);
        setDaily(response.data.data);
      } catch (error) {
        setMessage(error.message);
      }
    };
    if (dailyId !== 'new') fetchDaily();
  }, []);

  useEffect(() => {
    const fetchSleepPatterns = async () => {
      try {
        const response = await getSleepPatterns();
        setSleepPatterns(response.data.data);
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchSleepPatterns();
  }, []);

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const response = await getTimings();
        setTimings(response.data.data);
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchTimings();
  }, []);

  const handleChangeDaily = (key ,value) => {
    setDaily({...daily, [key]: value});
  };

  const handleChangeResult = (key ,value, index) => {
    const results = [...daily.results];
    results[index][key] = value;
    setDaily({...daily, results});
  };

  const handleDeleteResult = (index) => {
    const results = [...daily.results];
    results.splice(index, 1);
    setDaily({...daily, results});
  };

  const handleAddResult = () => {
    const addResult = {...initialResult};
    addResult.dailyId = daily.id;
    addResult.userId = daily.userId;
    
    const results = [...daily.results, addResult];
    setDaily({...daily, results});
  };

  const handleSave = async () => {
    try {
      let results;
      if (!daily.id) {
        // 新規登録
        results = await createDaily(daily); 
      } else {
        // 更新
        results = await updateDaily(daily.id, daily);
      }
      navigate(`/result`, { state: { message: results.data.message }});
    } catch (error) {
      setMessage(error.response.data.data);
    }
    
  };

  return (
    <div>
      <Logout />
      <Link to="/result">一覧画面へ</Link>
      <Message message={message} />
      <h1>入力ページ</h1>
      <div>
        <p>日付：{daily.date}</p>
        <p>睡眠：
          <select
            value={daily.sleepPatternId ?? ''}
            onChange={(e) => handleChangeDaily('sleepPatternId', e.target.value)}
          >
            {sleepPatterns.map((item, index) => (
            <option
              key={index}
              value={item.id}
            >
              {item.name}
            </option>
            ))}
          </select>
        </p>
        <p>
          体重：
          <input
            type="text"
            value={daily.weight ?? ''}
            onChange={(e) => handleChangeDaily('weight', e.target.value)}
          ></input>
          &nbsp;kg
        </p>
        <p style={{display: 'flex'}}>
          <span>日記：</span>
          <textarea
            type="text"
            value={daily.note ?? ''}
            onChange={(e) => handleChangeDaily('note', e.target.value)}
          ></textarea>
        </p>

        <hr />

        {daily.results.map((result, index) => (
        <div key={index}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <h3>
              練習{index + 1}
            </h3>
            <button
              style={{marginLeft: '20px'}}
              onClick={() => handleDeleteResult(index)}
            >
              削除
            </button>
          </div>

          <p>
            気温：
            <input
              type="text"
              value={result.temperature ?? ''}
              style={{width: '30px'}}
              onChange={(e) => handleChangeResult('temperature', e.target.value, index)}
            ></input>
            &nbsp;度
          </p>
          <p>時間帯：
            <select
              value={result.timingId ?? ''}
              onChange={(e) => handleChangeResult('timingId', e.target.value, index)}
            >
              {timings.map((item, index) => (
              <option
                key={index}
                value={item.id}
              >
                {item.name}
              </option>
              ))}
            </select>
          </p>
          <p>
            練習内容：
            <input
              type="text"
              value={result.content ?? ''}
              onChange={(e) => handleChangeResult('content', e.target.value, index)}
            ></input>
          </p>
          <p>
            距離：
            <input
              type="text"
              value={result.distance ?? ''}
              style={{width: '30px'}}
              onChange={(e) => handleChangeResult('distance', e.target.value, index)}
            ></input>
            &nbsp;km
          </p>
          <p>
            時間：
            <input
              type="text"
              value={result.timeH ?? ''}
              style={{width: '30px'}}
              onChange={(e) => handleChangeResult('timeH', e.target.value, index)}
            ></input>
            ：
            <input
              type="text"
              value={result.timeM ?? ''}
              style={{width: '30px'}}
              onChange={(e) => handleChangeResult('timeM', e.target.value, index)}
            ></input>
            ：
            <input
              type="text"
              value={result.timeS ?? ''}
              style={{width: '30px'}}
              onChange={(e) => handleChangeResult('timeS', e.target.value, index)}
            ></input>
          </p>
          <p>
            ペース：
            <input
              type="text"
              value={result.paceM ?? ''}
              style={{width: '30px'}}
              onChange={(e) => handleChangeResult('paceM', e.target.value, index)}
            ></input>
            ：
            <input
              type="text"
              value={result.paceS ?? ''}
              style={{width: '30px'}}
              onChange={(e) => handleChangeResult('paceS', e.target.value, index)}
            ></input>
          </p>
          <p>
            場所：
            <input
              type="text"
              value={result.place ?? ''}
              onChange={(e) => handleChangeResult('place', e.target.value, index)}
            ></input>
          </p>
          <p>
            シューズ：
            <input
              type="text"
              value={result.shoes ?? ''}
              onChange={(e) => handleChangeResult('shoes', e.target.value, index)}
            ></input>
          </p>
          <p style={{display: 'flex'}}>
            <span>メモ：</span>
            <textarea
              type="text"
              value={result.note ?? ''}
              onChange={(e) => handleChangeResult('note', e.target.value, index)}
            ></textarea>
          </p>
        </div>
        ))}

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
          <button
            style={{marginTop: '20px'}}
            onClick={() => handleAddResult()}
          >
            追加
          </button>

          <button
            style={{marginTop: '40px'}}
            onClick={() => handleSave()}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
