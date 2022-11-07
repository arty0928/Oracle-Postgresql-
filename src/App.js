import React from "react";
import "./App.css";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Results from "./components/Results";
import QueryInput from "./components/QueryInput";
function App() {
  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <Header></Header>
          <QueryInput></QueryInput>
          <Results></Results>
          <Modal></Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
