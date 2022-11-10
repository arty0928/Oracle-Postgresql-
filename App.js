import './App.css';
import { useState} from 'react';

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

      /* CURRENT_DATE */
      if((/EMPTY_BLOB */i.test(inputValue) === true) || /EMPTY_CLOB */i.test(inputValue) === true )
      {
      //  var postgresqlQuery = inputValue.replace('EMPTY_BLOB'|| 'EMPTY_CLOB',"\");
      //  return [...current, {
      //     value: postgresqlQuery,
      //  },];
     }

      /* CURRENT_DATE */
      if((/SELECT */i.test(inputValue) === true) && /CURRENT_DATE */i.test(inputValue) === true )
      {
       var postgresqlQuery = inputValue;
       return [...current, {
          value: 'SELECT (CURRENT_DATE + CURRENT_TIME(0))::timestamp;',
       },];
     }


       /* BITAND */
       if((/SELECT */i.test(inputValue) === true) && /BITAND */i.test(inputValue) === true )
       //if (inputValue.includes('SELECT') && (inputValue.includes('BITAND'))) 
       {
        var postgresqlQuery = inputValue.split('(')[1].split(')')[0];
        return [...current, {
           value: `select ${postgresqlQuery.split(',')[0]}&${postgresqlQuery.split(',')[1]};`, 
        },];
      }

      /* SELECT BIN_TO_NUM */
      if((/SELECT */i.test(inputValue) === true) && /BIN_TO_NUM */i.test(inputValue) === true ) {
      //if (inputValue.includes('SELECT') && (inputValue.includes('BIN_TO_NUM'))) 
        var postgresqlQuery = inputValue.split('(')[1].split(')')[0].replace(/,/g,"");
        return [...current, {
           value: `select B'${postgresqlQuery}'::int;`, 
        },];
      }

      /* FROM_TZ */ //-보류//
      if((/SELECT */i.test(inputValue) === true) && /TIMESTAMP */i.test(inputValue) === true ) {
        var postgresqlQuery = inputValue.split(',')[0].split('(')[1].split('\'')[1].replace(/'/g,"");
        return [...current, {
          value: `select TIMESTAMP '${postgresqlQuery}' AT TIME ZONE 'UTC'`, 
       },];
      }

      /* SOUNDEX */
      if((/SELECT */i.test(inputValue) === true) && /SOUNDEX */i.test(inputValue) === true ) {
        var postgresqlQuery = inputValue.split('.')[0].replace('hr','public').concat('.',inputValue.split('.')[1]);
        return [...current, {
          value: `CREATE EXTESION fuzzystrmatch; ${postgresqlQuery}`, 
       },];
      }

      /* FROMDUAL 변환작업 */
      if (/from dual *;/i.test(inputValue) === true) {
        var queryNotIncludeDual = inputValue.split(/FROM/i);
        var postgresqlQuery = queryNotIncludeDual[0];
        return [...current, {
          value: `${postgresqlQuery}`, 
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