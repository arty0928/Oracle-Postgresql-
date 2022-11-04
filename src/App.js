import React from "react";
import "./App.css";
import { useState } from "react";
import "../src/App.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ora2pg from "./Handlers/queryHandler";
import oraFunc2pgFunc from "./Handlers/functionHandler";
import printMessage from "./Handlers/functionArray";

function closeModal() {
  setTimeout(() => setTimeoutModal(), 1000);
}

function setTimeoutModal() {
  const modal_overlay = document.querySelector("#modal_overlay");
  const modal = document.querySelector("#modal");

  const modalCl = modal.classList;
  const overlayCl = modal_overlay;

  modalCl.add("-translate-y-full");

  modalCl.add("opacity-0");
  modalCl.add("scale-150");
  setTimeout(() => overlayCl.classList.add("hidden"), 300);
}

function openModal() {
  const modal_overlay = document.querySelector("#modal_overlay");
  const modal = document.querySelector("#modal");

  const modalCl = modal.classList;
  const overlayCl = modal_overlay;

  overlayCl.classList.remove("hidden");
  setTimeout(() => {
    modalCl.remove("opacity-0");
    modalCl.remove("-translate-y-full");
    modalCl.remove("scale-150");
  }, 100);
  closeModal();
}

function App() {
  const [inputValue, setInputValue] = useState([]);
  const [valueOut, setValueOut] = useState([]);
  const [functionChanged, setFunctionChanged] = useState([]);
  const [queryChanged, setQueryChanged] = useState([]);
  const [printInputQuery, setPrintInputQuery] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  const refreshPage = () => {
    setInputValue("");
    setValueOut("");
    setPrintInputQuery("");
    setErrorMessage([]);
    setFunctionChanged([]);
    setQueryChanged([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPrintInputQuery(inputValue);
    let qStr = inputValue;
    // 에러 출력
    let error = printMessage(qStr);
    setErrorMessage(error.errorMessage);
    //쿼리 문법 변환작업
    let queryResult = ora2pg(qStr);
    qStr = queryResult.string;
    setQueryChanged(queryResult.changedList);
    // 함수 변환작업
    let functionResult = oraFunc2pgFunc(qStr);
    qStr = functionResult.string;
    setFunctionChanged(functionResult.changedList);
    setValueOut(qStr);
  };

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <div>
            {/* <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
            <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
              Query Converter
            </h2>
            <div className="mt-2 text-center text-sm text-gray-600">
              <div className="text-lg font-medium text-indigo-500 hover:text-indigo-400">
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
              <div className="mt-10 mb-5">
                {/* <div className="bg-gray-100 px-4 py-5">
                <dt key={queryKey} className="text-sm font-medium text-indigo-600">{item.value}</dt>
              </div>   */}
                <span id="print-value" className="font-medium">
                  {printInputQuery}
                </span>
                <button></button>
                <div className="rounded-t-md bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Querys</dt>

                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">
                    {queryChanged.map((ele) => {
                      return <span key={ele}>{ele + " "}</span>;
                    })}
                  </dd>
                </div>

                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Functions
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">
                    {functionChanged &&
                      functionChanged.map((ele) => {
                        return <span key={ele}>{ele + " "}</span>;
                      })}
                    {errorMessage &&
                      errorMessage.map((ele) => {
                        return <div key={ele} className="text-red-500 font-bold">{ele + " "}</div>;
                      })}
                  </dd>
                </div>

                <div className="rounded-b-md bg-gray-50 px-4 py-5  sm:gap-4 sm:px-6">
                  <dt
                    className="text-sm font-medium text-indigo-500 sm:pb-2"
                    id="final-query"
                  >
                    Final
                  </dt>
                  <CopyToClipboard>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">
                      <div>
                        <button
                          id="final"
                          onClick={openModal}
                          className="animate-pulse decoration-sky-500 decoration-2 hover:text-blue-500 text-start"
                          key={valueOut}
                        >
                          <span>{valueOut}</span>
                        </button>
                      </div>
                    </dd>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </dl>
          <div id="modal_overlay" className="hidden fixed right-1/3 left-1/3 top-2/4">
            <div id="modal" className="place-content-center mx-auto mt-0 flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" role="alert">
              <svg id="madal-icon" className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              <div>
                <span className="text-md font-medium">copied success!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
