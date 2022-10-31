import './App.css';
import { useState } from 'react';

function App() {
  const [postgresql, setPostgresql] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const onPageReset = () => {
    const remove = document.getElementById('query_sentence');
    remove.innerHTML="";
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setPostgresql((current) => { 
      var qStr = inputValue;
      // FROMDUAL 변환작업 
      qStr = qStr.replace(/FROM\s+DUAL/igs, "");

      // 함수이름 변환작업
      // qStr = qStr.작업 코드;
      qStr = qStr.replace(/\bRATIO_TO_REPORT/igs, "sum(milliseconds) / sum( sum");
      qStr = qStr.replace(/\bOVER/igs, ") OVER");
      qStr = qStr.replace(/\bTEAM12.TRACK/igs, "track group by milliseconds"); 


      return [...current, {
        value: `${qStr}`, 
      },];

    });

    setInputValue("");
    
  };

  return (
    <div id="container">
      <p id="title">Query Converter</p>
      <form id="oracle-query" onSubmit={handleSubmit}>
        <input type="text" 
        
        value ={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
        }} />
        <button id="input_button" type="submit">변환</button>
      </form>

      

      <ol id="query_sentence">{postgresql.map((item) => (
        <div>
          {item.value}
        </div>
      ))}</ol>
      <button id='page-reset' onClick={onPageReset}>비우기</button>
    </div>
  );
}

export default App;