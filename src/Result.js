import { useEffect, useState } from "react";
import axios from "axios";

const Result = () => {

  const BASE_URL = 'http://localhost:3001/api/v1'
  const API_HEADER = {
    'content-type': 'application/json',
    'uid': 'test@example.com',
    'client': 'jfD5l2dpHpwyDHPMCy3TDg',
    'access-token': 'bf7ub-mYPKZoUq4THuIoPQ'
  }

  const [resultList, setRsultList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResult = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/results?user_id=1&year=2023&month=8`,
          { headers: API_HEADER }
        );
        setRsultList(response.data.data);
      } catch (error) {
        setError(error.message)
      }
    };
    getResult();
  }, [])


  if (error) return `Error: ${error}`;

  return (
    <div>
      <div style={{ display: 'flex' }}>
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
          <p style={{ width: '120px' }}>
            {daily.year}/{daily.month}/{daily.day}({daily.weekday})
          </p>
          <p style={{ width: '50px' }}>
            {daily.sleep_pattern_name}
          </p>
          <p style={{ width: '70px' }}>
            {daily.weight}{daily.weight? 'kg' : ''}
          </p>
          <p style={{ width: '150px' }}>
            {daily.daily_note}
          </p>
          <div>
            {daily.results.map((result, index2) => (
            <div key={index2} style={{ display: 'flex' }}>
              <p style={{ width: '70px' }}>
                {result.temperature}度
              </p>
              <p style={{ width: '70px' }}>
                {result.timing_name}
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
                {result.result_note}
              </p>
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
