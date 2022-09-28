import './App.css';
import { useState } from 'react';

function App() {
  const [postgresql, setPostgresql] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setPostgresql((current) => { 
      if (inputValue.includes("FROM dual")) {
        const word = inputValue.split('FROM');

        return [...current, {
          value: `${word[0]};`, 
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
      <form id="oracle-query" onSubmit={handleSubmit}>
        <input type="text" value ={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
        }} />
        <button type="submit">변환</button>
      </form>
      
      <ol>{postgresql.map((item) => (
        <div>
          <span>{item.value}</span>
        </div>
      ))}</ol>
    </div>
  );
}

export default App;
