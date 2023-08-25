import { useEffect, useState, useContext } from "react";
import { MessageContext } from "../App";
import { getResults } from '../api/result'
import Logout from './Logout'

const Result = () => {

  const { setMessage } = useContext(MessageContext);
  const [resultList, setRsultList] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handlePrev = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getResults(year, month);
        setRsultList(response.data.data);
      } catch (error) {
        setMessage(error.message)
      }
    };
    fetchData();
  }, [year, month])

  return (
    <div>
      <Logout />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={handlePrev}>前月</button>
        <h2 style={{ margin: '20px 20px' }}>{year}年{month}月</h2>
        <button onClick={handleNext}>翌月</button>
      </div>
      <div style={{ display: 'flex' }}>
        <p style={{ width: '70px' }}></p>
        <p style={{ fontWeight: 'bold', width: '120px' }}>日付</p>
        <p style={{ fontWeight: 'bold', width: '50px' }}>睡眠</p>
        <p style={{ fontWeight: 'bold', width: '70px' }}>体重</p>
        <p style={{ fontWeight: 'bold', width: '150px' }}>日記</p>
        <p style={{ fontWeight: 'bold', width: '70px' }}>気温</p>
        <p style={{ fontWeight: 'bold', width: '70px' }}>時間帯</p>
        <p style={{ fontWeight: 'bold', width: '100px' }}>練習</p>
        <p style={{ fontWeight: 'bold', width: '70px' }}>距離</p>
        <p style={{ fontWeight: 'bold', width: '80px' }}>時間</p>
        <p style={{ fontWeight: 'bold', width: '70px' }}>ペース</p>
        <p style={{ fontWeight: 'bold', width: '80px' }}>場所</p>
        <p style={{ fontWeight: 'bold', width: '150px' }}>シューズ</p>
        <p style={{ fontWeight: 'bold', width: '150px' }}>コメント</p> 
      </div>

      {resultList.map((daily, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <p style={{ width: '70px' }}>
            <button>編集</button>
          </p>
          <p style={{ width: '120px' }}>
            {daily.year}/{daily.month}/{daily.day}({daily.weekday})
          </p>
          <p style={{ width: '50px' }}>
            {daily.sleepPatternName}
          </p>
          <p style={{ width: '70px' }}>
            {daily.weight}{daily.weight? 'kg' : ''}
          </p>
          <p style={{ width: '150px' }}>
            {daily.dailyNote}
          </p>
          <div>
            {daily.results.map((result, index2) => (
            <div key={index2} style={{ display: 'flex' }}>
              <p style={{ width: '70px' }}>
                {result.temperature}度
              </p>
              <p style={{ width: '70px' }}>
                {result.timingName}
              </p>
              <p style={{ width: '100px' }}>
                {result.content}
              </p>
              <p style={{ width: '70px' }}>
                {result.distance}km
              </p>
              <p style={{ width: '80px' }}>
                {result.time}
              </p>
              <p style={{ width: '70px' }}>
                {result.pace}
              </p>
              <p style={{ width: '80px' }}>
                {result.place}
              </p>
              <p style={{ width: '150px' }}>
                {result.shoes}
              </p>
              <p style={{ width: '150px' }}>
                {result.resultNote}
              </p>
              {/* <p style={{ width: '50px' }}>
                <button>編集</button>
              </p> */}
            </div>
            ))
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default Result;
