import './App.css';
import React, { useState } from "react";

const root = document.getElementById("root");

function App() {
  const [inputText, setInputText] = useState("");

  const onChange = (event) => {
    setInputText(event.target.value);
  };
  const onReset = () => {
    setInputText("");
  };

  return (
    <div>
        <p>
          query converter
        </p>

      <div>
        <form>
          <label htmlFor="oracle-query">oracle-query</label>
          <input
            defaultValue={inputText}
            id="oracle-query"
            type="text"
            onChange={onChange}
          />
          <button onClick={onReset}>초기화</button>
        </form>

        <button type="submit">변환</button>

        <div className="postgres-query">
          <span>postgres-query</span>
          <div>
          {inputText.indexOf('abc') !== -1 && inputText.replace('abc', 'def')}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;