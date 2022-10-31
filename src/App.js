import React from 'react';
import "./App.css";
import { useState } from "react";
import "../src/App.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [inputValue, setInputValue] = useState([]);
  const [valueOut, setValueOut] = useState([]);
  //const [changingF, setChangingF] = useState([]);
  //const [changingQ, setChangingQ] = useState([]);
  const queryKey = [];

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const sentences = inputValue.split(";");
    sentences.forEach((sentence) => {
      for (var i = 0; i < sentences.length - 1; i++) {
        queryKey.push("queryKey" + i);
        valueOut[i] = { key: "queryKey" + i, name: "queryNumber" };
        valueOut[i].input = sentences[i] + ";"; //입력한 문자를 넣음

        valueOut[i].first = "sentences[i].쿼리함수를 변환하는 함수";
        var secondSentence = sentences[i].replace(/FROM\s+DUAL/gis, "");
        valueOut[i].second = secondSentence + ";";
        valueOut[i].third = "sentences[i].검증결과를 출력하는 함수";
      }
    });

    setInputValue("");
    return valueOut;
  };

  return (
    <div class="container">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Query Converter
            </h2>
            <div className="mt-2 text-center text-sm text-gray-600">
              <div className="font-medium text-indigo-500 hover:text-indigo-400">
                please input oracle query to translate
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-6" id="oracle-query">
            <form
              className="-space-y-px rounded-md bg-gray-50 border"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="sr-only" id="oracle-query">
                  input oracle query
                </label>
                <textarea
                  id="input-box"
                  type="text"
                  rows="2"
                  required
                  className="
                relative block w-full appearance-none rounded-none rounded-t-md
                px-3 py-2 text-gray-900 placeholder-gray-500 border-b
                focus:z-10 focus:outline-none 
                sm:text-sm"
                  placeholder="input oracle query"
                  value={inputValue}
                  onChange={(event) => {
                    setInputValue(event.target.value);
                  }}
                />
              </div>

              <div className=" px-0 py-0 sm:flex sm:flex-row sm:px-0">
                <button
                  type="submit"
                  id="page-reset"
                  onClick={refreshPage}
                  className="mt-0 inline-flex w-full justify-center 
                sm:bg-white px-4 py-2 text-base font-medium text-gray-700 
                hover:bg-gray-200 focus:outline-none focus:bg-white
                sm:mt-0 sm:ml-0 sm:w-auto sm:text-sm sm:rounded-none sm:ml-auto sm:bg-white"
                >
                  Refresh
                </button>
                <button
                  type="submit"
                  id="input_button"
                  className="bg-indigo-500 inline-flex w-full justify-center rounded-b-md
                sm:rounded-none sm:rounded-br-md focus:bg-indigo-500
                px-4 py-2 text-base font-medium text-white 
                hover:bg-indigo-700 sm:w-auto sm:text-sm"
                >
                  Translate
                </button>
              </div>
            </form>
          </div>

          <dl>
            <div id="query_sentence">
              {valueOut.map((item) => (
                <div key={queryKey} name={item.name} className="mt-10 mb-5">
                  {/* <div className="bg-gray-100 px-4 py-5">
                <dt key={queryKey} className="text-sm font-medium text-indigo-600">{item.value}</dt>
              </div>   */}
                  <span className="font-medium">{item.input}</span>
                  <div className="rounded-t-md bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">First</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {item.first}
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Second
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {item.second}
                    </dd>
                  </div>

                  <div className="rounded-b-md bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt
                      className="text-sm font-medium text-indigo-500"
                      id="final-query"
                    >
                      Final
                    </dt>
                    <CopyToClipboard text={item.third}>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <div class="show-button">
                          <button>{item.third}</button>
                        </div>
                      </dd>
                    </CopyToClipboard>
                  </div>
                </div>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default App;
