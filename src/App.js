import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import ora2pg from "./Handlers/queryHandler";
import oraFunc2pgFunc from "./Handlers/functionHandler";
const Container = styled.div`
  margin: 10px;
`;
const Title = styled.p`
  font-size: 20px;
`;
const OracleQuery = styled.form``;
const InputBtn = styled.button`
  height: 54px;
  padding: 10px;
  margin-right: 5px;
`;
const QuerySentences = styled.ul`
  list-style: none;
`;
const PageResetBtn = styled.button`
  margin-top: 10px;
`;
const MatchingList = styled.div`
  margin-bottom: 10px;
  border: solid black 2px;
`;

function App() {
  const [postgresql, setPostgresql] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [functionChanged, setFunctionChanged] = useState([]);
  const [queryChanged, setQueryChanged] = useState([]);

  const onPageReset = () => {
    setFunctionChanged([]);
    setQueryChanged([]);
    setPostgresql("");
    setInputValue("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let qStr = inputValue;
    //쿼리 문법 변환작업
    let queryResult = ora2pg(qStr);
    qStr = queryResult.string;
    setQueryChanged(queryResult.changedList);
    // 함수 변환작업
    let functionResult = oraFunc2pgFunc(qStr);
    qStr = functionResult.string;
    setFunctionChanged(functionResult.changedList);
    setPostgresql(qStr);
  };

  return (
    <>
      <Container>
        <Title>Query Converter</Title>
        <OracleQuery onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
          <InputBtn type="submit">변환</InputBtn>
        </OracleQuery>
        <QuerySentences id="query_sentence">
          <MatchingList>
            Matching Querys :{" "}
            {queryChanged.map((ele) => {
              return <li>{ele}</li>;
            })}
          </MatchingList>
          <MatchingList>
            Mathcing Functions :{" "}
            {functionChanged.map((ele) => {
              return <li>{ele}</li>;
            })}
          </MatchingList>
          <MatchingList>Converted to : {postgresql}</MatchingList>
        </QuerySentences>
        <PageResetBtn onClick={onPageReset}>비우기</PageResetBtn>
      </Container>
    </>
  );
}

export default App;
