import './Results.css';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRecoilValue } from "recoil";
import errorMessageAtom from "../recoil/atoms/errorMessageAtom";
import errorPrecautionsMessageAtom from "../recoil/atoms/errorPrecautionsMessageAtom";
import errorQueryMessageAtom from "../recoil/atoms/errorQueryMessageAtom";
import functionChangedAtom from "../recoil/atoms/functionChangedAtom";
import printInputQueryAtom from "../recoil/atoms/printInputQueryAtom";
import queryChangedAtom from "../recoil/atoms/queryChangedAtom";
import valueOutAtom from "../recoil/atoms/valueOutAtom";

export default function Results() {
  const printInputQuery = useRecoilValue(printInputQueryAtom);
  const queryChanged = useRecoilValue(queryChangedAtom);
  const valueOut = useRecoilValue(valueOutAtom);
  const functionChanged = useRecoilValue(functionChangedAtom);
  const errorMessage = useRecoilValue(errorMessageAtom);
  const errorPrecautionsMessage = useRecoilValue(errorPrecautionsMessageAtom);
  const errorQueryMessage = useRecoilValue(errorQueryMessageAtom);

  return (
    <>
      <dl>
        <div id="query_sentence">
          <div className="mt-10 mb-5">
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
                {errorQueryMessage &&
                  errorQueryMessage.map((ele) => {
                    return <div key={ele} className="text-red-500 font-bold">{ele + " "}</div>;
                  })}
              </dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Functions</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">
                {functionChanged &&
                  functionChanged.map((ele) => {
                    return <span key={ele}>{ele + " "}</span>;
                  })}
                {errorMessage &&
                  errorMessage.map((ele) => {
                    return <div key={ele} className="text-red-500 font-bold">{ele + " "}</div>;
                  })}
                {errorPrecautionsMessage &&
                  errorPrecautionsMessage.map((ele) => {
                    return <div key={ele} className="text-gray-700 font-bold">{ele + " "}</div>;
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
              <CopyToClipboard text={valueOut}>
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
    </>
  );
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
function closeModal() {
  setTimeout(() => setTimeoutModal(), 1000);
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
