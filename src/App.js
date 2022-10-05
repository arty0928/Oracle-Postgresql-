import './App.css';
import { useState } from 'react';

function App() {
  const [postgresql, setPostgresql] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const onReset = () => {
    setInputValue("");
  };
  const onPageReset = () => {
    const remove = document.getElementById('query_sentence');
    remove.innerHTML="";
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setPostgresql((current) => { 

      /* FROMDUAL 변환작업 */
      if (/from dual *;/i.test(inputValue) === true) {
        var queryNotIncludeDual = inputValue.split(/FROM/i);
        var postgresqlQuery = queryNotIncludeDual[0];
        return [...current, {
          value: `${postgresqlQuery};`, 
        },];
      }
      else return [...current, {
        value: inputValue, 
      },];
      
    });

    setInputValue("");
    
  };

  return (
    <div>
      <p id="title">Query Converter</p>
      <form id="oracle-query" onSubmit={handleSubmit}>
        <input type="text" 
        
        value ={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
        }} />
        <button type="submit">변환</button>
        <button onClick={onReset}>초기화</button>
      </form>
      
      <ol id="query_sentence">{postgresql.map((item) => (
        <div>
          {item.value}
        </div>
      ))}</ol>
      <button onClick={onPageReset}>비우기</button>
    </div>
  );
}

export default App;
