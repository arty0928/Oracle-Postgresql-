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
      
    if(/ RATIO_TO_REPORT */i.test(inputValue))
    {
      var RTRquery = inputValue.split('(')[1].split(')')[0];
      var RTRquery1 = inputValue.split('s)')[1].split('ORACLE.')[0];
      
      return [...current, {
        value: `select(${RTRquery}), sum(${RTRquery}) / sum(sum(${RTRquery})) ${RTRquery1} track group by ${RTRquery};`, 
     },]; 

    }

      // PERSCENT_RANK & RPAD & ROW_NUMBER & ntile & RANK & SCN_TO_TIMESTAMP
      if(/TEAM12. */i.test(inputValue) === true)
      {
        var p1erRQuery = inputValue.split('TEAM12')[0];
        var p1erRQuery1 = inputValue.split('.')[1];
        return [...current, {
           value: `${p1erRQuery}${p1erRQuery1}`, 
        },]; 
      }

      //NVL
      if((/SELECT */i.test(inputValue) === true) && /NVL */i.test(inputValue) === true )
      {
        var nvlQuery = inputValue.split('NVL')[0];
        var nvlQuery2 = inputValue.split('NVL')[1].split('ORACLE')[0]
        var nvlQuery3 = inputValue.split('ORACLE.')[1];
        return [...current, {
           value: `${nvlQuery} coalesce ${nvlQuery2}${nvlQuery3}`, 
        },]; 

      }         

      //RAWTOHEX
      if((/SELECT */i.test(inputValue) === true) && /RAWTOHEX */i.test(inputValue) === true )
      {
        var RthQuery = inputValue.split('(')[1].split(')')[0];
        return [...current, {
           value: `SELECT  encode(${RthQuery},'hex');`, 
        },]; 

      }



      //SESSIONTIMEZONE
      if((/SELECT */i.test(inputValue) === true) && /SESSIONTIMEZONE */i.test(inputValue) === true )
      {
        var stzQuery = inputValue.split('SESSION')[1].split(' FROM')[0];
        return [...current, {
           value: `SELECT current_setting ('${stzQuery}') ;`, 
        },]; 

      }


      // REMAINDER
      if((/SELECT */i.test(inputValue) === true) && /REMAINDER */i.test(inputValue) === true )
      {
        var remQuery = inputValue.split('(')[1].split(')')[0];
        var remQuery1 = inputValue.split('SELECT ')[1].split(' (')[0];
        return [...current, {
           value: `SELECT mod (${remQuery}) as "${remQuery1}";`, 
        },]; 

      }

      /* NLS_INITCAP & NLS_LOWER & NLS_UPPER
      */
      if((/SELECT */i.test(inputValue) === true) && /NLS_ */i.test(inputValue) === true)
      {
        var initQuery = inputValue.split('_')[1].split('FROM')[0];
        return [...current, {
           value: `select ${initQuery};`, 
        },]; 

      }
      // PERSCENT_RANK & RPAD & ROW_NUMBER & ntile & RANK
      
      //if((/PERCENT_RANK */i.test(inputValue) === true || /RPAD */i.test(inputValue) === true 
      //|| /ROW_NUMBER */i.test(inputValue) === true || /ntile */i.test(inputValue) === true 
      //|| /RANK */i.test(inputValue) === true))
      //{
      //  var perRQuery = inputValue.split('ORACLE')[0];
      //  var perRQuery1 = inputValue.split('.')[1];
      //  return [...current, {
      //     value: `${perRQuery}${perRQuery1}`, 
      //  },]; 

      //}
      

      /* EMPTY BLOB || EMPTY CLOB */
      if((/EMPTY_BLOB() */i.test(inputValue) === true) || /EMPTY_CLOB() */i.test(inputValue) === true )
      {
        var postgresqlQuery;
        if((/EMPTY_BLOB() */i.test(inputValue) === true))
          postgresqlQuery = inputValue.replace('EMPTY_BLOB()','"');
          
        else if((/EMPTY_CLOB() */i.test(inputValue) === true))
          postgresqlQuery = inputValue.replace('EMPTY_CLOB()','"');
       
       return [...current, {
          value: postgresqlQuery,
       },];
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
      if((/SELECT */i.test(inputValue) === true) && /BIN_TO_NUM */i.test(inputValue) === true )
      //if (inputValue.includes('SELECT') && (inputValue.includes('BIN_TO_NUM'))) 
      {
        var postgresqlQuery = inputValue.split('(')[1].split(')')[0].replace(/,/g,""); 
        return [...current, {
           value: `select B'${postgresqlQuery}'::int;`, 
        },];
      }

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
