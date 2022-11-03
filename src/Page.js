import * as React from "react";
import App from "./App";
import { useNavigate } from "react-router-dom";

function Precautions(){
 


<div class="flex flex-col justify-center m-auto">
   <div class="flex md:flex-row flex-col bg-teal-200 justify-center md:text-left text-center">
      <div class="flex flex-col justify-center items-center relative">
         <div class="w-56 h-12 md:flex hidden justify-center">
            <div class="h-full  border-teal-300 border-dashed"></div>
         </div>
         <div class="rounded-full w-12 h-12 text-xl text-teal-100 bg-teal-700 font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">1</div>
         {/* <img alt="step1" class="w-56 h-56 rounded-full shadow my-5 object-scale-down" src="https://image.flaticon.com/icons/svg/1330/1330216.svg">  */}
         <div class="w-56 h-12 md:flex hidden justify-center">
            <div class="h-full border-r-4 border-teal-300 border-dashed"></div>
         </div>
      </div>
      <div class="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-teal-200">
         <div class="text-xs uppercase font-bold text-teal-500">Step 1 - Idea</div>
         <div class="md:text-3xl text-xl font-bold text-teal-700">Find your best idea</div>
         <div class="mt-4 text-teal-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam facilis, voluptates error alias dolorem praesentium sit soluta iure incidunt labore explicabo eaque, quia architecto veritatis dolores, enim consequatur nihil ipsum.</div>
      </div>
   </div>
   <div class="flex md:flex-row flex-col bg-orange-200 justify-center md:text-left text-center">
      <div class="flex flex-col justify-center items-center relative">
         <div class="w-56 h-12 md:flex hidden justify-center">
            <div class="h-full border-r-4 border-orange-300 border-dashed"></div>
         </div>
         <div class="rounded-full w-12 h-12 text-xl text-orange-100 bg-orange-700 font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">2</div>
         {/* <img alt="step2" class="w-56 h-56 rounded-full shadow my-5 object-scale-down" src="https://image.flaticon.com/icons/svg/1330/1330216.svg">  */}
         <div class="w-56 h-12 md:flex hidden justify-center">
            <div class="h-full border-r-4 border-orange-300 border-dashed"></div>
         </div>
      </div>
      <div class="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-orange-200">
         <div class="text-xs uppercase font-bold text-orange-500">Step 2 - Collaboration</div>
         <div class="md:text-3xl text-xl font-bold text-orange-700">Find your team and collaborate</div>
         <div class="mt-4 text-orange-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam facilis, voluptates error alias dolorem praesentium sit soluta iure incidunt labore explicabo eaque, quia architecto veritatis dolores, enim consequatur nihil ipsum.</div>
      </div>
   </div>
   <div class="flex md:flex-row flex-col bg-indigo-200 justify-center md:text-left text-center">
      <div class="flex flex-col justify-center items-center relative">
         <div class="w-56 h-12 md:flex hidden justify-center">
            <div class="h-full border-r-4 border-indigo-300 border-dashed"></div>
         </div>
         <div class="rounded-full w-12 h-12 text-xl text-indigo-100 bg-indigo-700 font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">3</div>
         {/* <img alt="step3" class="w-56 h-56 rounded-full shadow my-5 object-scale-down" src="https://image.flaticon.com/icons/svg/1330/1330216.svg">  */}
         <div class="w-56 h-12 md:flex hidden justify-center">
            <div class="h-full border-r-4 border-indigo-300 border-dashed"></div>
         </div>
      </div>
      <div class="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-indigo-200">
         <div class="text-xs uppercase font-bold text-indigo-500">Step 3 - Planification</div>
         <div class="md:text-3xl text-xl font-bold text-indigo-700">Make a good plan and prepare tasks</div>
         <div class="mt-4 text-indigo-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam facilis, voluptates error alias dolorem praesentium sit soluta iure incidunt labore explicabo eaque, quia architecto veritatis dolores, enim consequatur nihil ipsum.</div>
      </div>
   </div>
   <div class="flex md:flex-row flex-col bg-pink-200 justify-center md:text-left text-center">
      <div class="flex flex-col justify-center items-center relative">
         <div class="w-56 h-12 md:flex hidden justify-center">
            <div class="h-full border-r-4 border-pink-300 border-dashed"></div>
         </div>
         <div class="rounded-full w-12 h-12 text-xl text-pink-100 bg-pink-700 font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">4</div>
         {/* <img alt="step4" class="w-56 h-56 rounded-full shadow my-5 object-scale-down" src="https://image.flaticon.com/icons/svg/1330/1330216.svg">  */}
         <div class="w-56 h-12 md:flex hidden justify-center">
            <div class="h-full  border-pink-300 border-dashed"></div>
         </div>
      </div>
      <div class="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-pink-200">
         <div class="text-xs uppercase font-bold text-pink-500">Step 4 - Implementation</div>
         <div class="md:text-3xl text-xl font-bold text-pink-700">Execute, impletement your solution</div>
         <div class="mt-4 text-pink-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam facilis, voluptates error alias dolorem praesentium sit soluta iure incidunt labore explicabo eaque, quia architecto veritatis dolores, enim consequatur nihil ipsum.</div>
      </div>
   </div>
</div>
}

export default Precautions;