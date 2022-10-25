import './App.css';
import { useState } from 'react';
import "../src/App.css";

function App() {
  const [inputValue, setInputValue] = useState([]);
  const [valueOut, setValueOut] = useState([]);
  const queryKey = [];
  
  /* 비우기 버튼 */
  const onPageReset = () => {
    //const remove = document.getElementById('query_sentence');
    //remove.innerHTML="";
    
  };
  /* 변환 버튼 */
  const handleSubmit = (event) => {
    event.preventDefault();
    
      const sentences = inputValue.split(';');
      sentences.forEach((sentence) => {
        for (var i = 0; i < sentences.length -1; i++) {
          queryKey.push('queryKey'+i);
          valueOut[i] = { key: "queryKey"+i } 
          valueOut[i].input = sentences[i]+";"; //입력한 문자를 넣음
          valueOut[i].first = "sentences[i].쿼리함수를 변환하는 함수"; 
          valueOut[i].second = "sentences[i].규칙에 따라 쿼리를 변환하는 함수";
          valueOut[i].third = "sentences[i].검증결과를 출력하는 함수";
          
        }});
        
    setInputValue("");
    return valueOut;
    
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      {/* <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Query Converter</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">please input oracle query to translate</a>
      </p>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST" id="oracle-query" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          
          <label className="sr-only" id="oracle-query" onSubmit={handleSubmit}>input oracle query</label>        
            <textarea id="input-box" type="text" rows="2" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="input oracle query"
             value ={inputValue}
             onChange={(event) => {
               setInputValue(event.target.value);
           }} />    
        </div>

        <div class="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="submit" id="input_button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">translate</button>
              <button type="button" id='page-reset' onClick={onPageReset} class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">flush</button>
        </div>   
     
      </div>
      
    </form>

    <dl>
      <ol id="query_sentence">
        {valueOut.map((item) => (
          <div class="border-t border-gray-200 mb-5" >      
              <div class="bg-gray-100 px-4 py-5">
                <dt key={queryKey} class="text-sm font-medium text-indigo-600">{item.input}</dt>
              </div>  

              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">First</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{item.first}</dd>
              </div>

              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Second</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{item.second}</dd>
              </div>

              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-indigo-600">Final</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{item.third}</dd>
              </div>
        </div>
        ))}</ol>
    </dl>
    
    
    
  </div>
</div>
  );
}

export default App;