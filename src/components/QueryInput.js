import { useState } from "react";
import ora2pg from "../Handlers/queryHandler";
import printMessage from "../Handlers/functionArray";
import oraFunc2pgFunc from "../Handlers/functionHandler";
import { useSetRecoilState } from "recoil";
import valueOutAtom from "../recoil/atoms/valueOutAtom";
import functionChangedAtom from "../recoil/atoms/functionChangedAtom";
import queryChangedAtom from "../recoil/atoms/queryChangedAtom";
import printInputQueryAtom from "../recoil/atoms/printInputQueryAtom";
import errorMessageAtom from "../recoil/atoms/errorMessageAtom";

import { TrashIcon } from "@heroicons/react/24/outline";
import { ArrowRight } from "@heroicons/react/24/outline";

export default function QueryInput() {
  const [inputValue, setInputValue] = useState([]);
  const setValueOut = useSetRecoilState(valueOutAtom);
  const setFunctionChanged = useSetRecoilState(functionChangedAtom);
  const setQueryChanged = useSetRecoilState(queryChangedAtom);
  const setPrintInputQuery = useSetRecoilState(printInputQueryAtom);
  const setErrorMessage = useSetRecoilState(errorMessageAtom);

  const refreshPage = () => {
    window.location.reload();
    // setInputValue("");
    // setValueOut("");
    // setPrintInputQuery("");
    // setErrorMessage([]);
    // setFunctionChanged([]);
    // setQueryChanged([]);
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
            className="bg-gray-100
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

          <div>
            <div className="relative hidden sm:inline-grid">
              <button
                type="submit"
                id="Precautions"
                onClick={refreshPage}
                className="bg-white inline-flex w-full justify-center 
                      sm:rounded-bl-md rounded-none focus:bg-white
                      px-4 py-2 text-base font-bold text-gray-700 
                      hover:bg-gray-200 sm:w-auto sm:text-sm sm:bg-white"
              >
                Precautions
              </button>
            </div>

            <div className="relative w-14 sm:hidden">
              <TrashIcon
                type="submit"
                id="Precautions"
                onClick={refreshPage}
                className="bg-white-700 inline-flex w-full justify-center rounded-bl-md
                    px-4 py-2 text-base font-bold text-gray-700 
                    hover:bg-gray-200 sm:w-auto sm:text-sm"
              >
              </TrashIcon>
            </div>
          </div>

          <div className="ml-auto">
            <div className="relative hidden sm:inline-grid inline-flex">
              <button
                type="submit"
                id="page-reset"
                onClick={refreshPage}
                className="mt-0 inline-flex w-full justify-center
                  sm:bg-white px-4 py-2 text-base font-bold text-gray-700 
                  hover:bg-gray-200 focus:outline-none focus:bg-white
                  sm:mt-0 sm:ml-0 sm:w-auto sm:text-sm sm:rounded-none sm:ml-auto sm:bg-white"
              >
                Refresh
              </button>
            </div>
            <div className="relative w-14 sm:hidden inline-flex">
              <TrashIcon
                type="submit"
                id="Precautions"
                onClick={refreshPage}
                className="bg-white-700 inline-flex w-full justify-center rounded-bl-md
                    px-4 py-2 text-base font-bold text-gray-700 
                    hover:bg-gray-200 sm:w-auto sm:text-sm"
              >
              </TrashIcon>
            </div>
          </div>

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
  );
}
