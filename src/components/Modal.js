import './Modal.css';

export default function Modal() {
  return (
    <div id="modal_overlay" className="hidden fixed right-1/3 left-1/3 top-2/4">
      <div
        id="modal"
        className="place-content-center mx-auto mt-0 flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
        role="alert"
      >
        <svg
          id="madal-icon"
          className="w-5 h-5 inline mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <span className="text-md font-medium">copied success!</span>
        </div>
      </div>
    </div>
  );
}
