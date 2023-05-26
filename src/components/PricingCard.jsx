import React from "react";
import { CheckIcon } from "@heroicons/react/solid";

function thirdCardComponent() {
    return (
      <div className=" border border-indigo-600 bg-white  flex-col border-opacity-10 rounded-md shadow-xl cursor-pointer">
        {/* {Card Header} */}
        <div className="px-6 py-12 border-b-2 border-gray-200">
          <p className="text-3xl font-semibold text-center items-center mb-4">
            Growth
          </p>
          <div className="flex justify-center items-center">
            <div className="flex items-start">
              <p className="text-4xl font-medium">$</p>
              <p className="text-7xl font-medium">19</p>
            </div>
            <p className="text-2xl text-gray-400">/Month</p>
          </div>
        </div>
        {/* {Card Body} */}
        <div className="p-12 bg-gray-100">
          <ul className="space-y-3">
            <li className="flex items-center space-x-4">
              <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className=" text-lg text-gray-600">600,000 words per month</p>
            </li>
            <li className="flex items-center space-x-4">
              <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className=" text-lg text-gray-600 ">
                Access to all premium voices
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className=" text-lg text-gray-600 ">Unlimited downloads</p>
            </li>
          </ul>
          {/* {CTA} */}
          <button
            className="mt-12 w-full py-4 px-8 rounded-lg text-lg 
          whitespace-nowrap bg-white text-indigo-600
          focus:outline-none focus:ring-4 focus:ring-indigo-600 
          focus:ring-opacity-50 transition-all items-center justify-center flex font-bold  hover:bg-indigo-500 hover:scale-100"
          >
            Start your free Trial
          </button>
        </div>
      </div>
    );
  }
  
  export default thirdCardComponent