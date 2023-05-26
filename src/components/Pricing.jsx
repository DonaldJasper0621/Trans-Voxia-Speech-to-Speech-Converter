import React from "react";
import { CheckIcon } from "@heroicons/react/solid";
import thirdCardComponent from "./PricingCard";

function YoCardComponent() {
  return (
    <div className=" border border-indigo-600 bg-white  flex-col border-opacity-10 rounded-md shadow-xl cursor-pointer">
      {/* {Card Header} */}
      <div className="px-6 py-12 border-b-2 border-gray-200">
        <p className="text-3xl font-semibold text-center items-center mb-4">
          Premium
        </p>
        <div className="flex justify-center items-center">
          <div className="flex items-start">
            <p className="text-4xl font-medium">$</p>
            <p className="text-7xl font-medium">99</p>
          </div>
          <p className="text-2xl text-gray-400">/Month</p>
        </div>
      </div>
      {/* {Card Body} */}
      <div className="p-12 bg-gray-100">
        <ul className="space-y-3">
          <li className="flex items-center space-x-4">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className=" text-lg text-gray-600">Unlimited Voice Generations</p>
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
          <li className="flex items-center space-x-4">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className=" text-lg text-gray-600 ">
              Unlimited Projects
            </p>
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

function CardComponent() {
  return (
    <div className=" border border-indigo-600 bg-white  flex-col border-opacity-10 rounded-md shadow-xl cursor-pointer">
      {/* {Card Header} */}
      <div className="px-6 py-12 border-b-2 border-gray-200">
        <p className="text-3xl font-semibold text-center items-center mb-4">
          Free Plan
        </p>
        <div className="flex justify-center items-center">
          <div className="flex items-start">
            <p className="text-4xl font-medium">$</p>
            <p className="text-7xl font-medium">0</p>
          </div>
          <p className="text-2xl text-gray-400">/Month</p>
        </div>
      </div>
      {/* {Card Body} */}
      <div className="p-12 bg-gray-100">
        <ul className="space-y-3">
          <li className="flex items-center space-x-4">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className=" text-lg text-gray-600">15 minutes videos per month</p>
          </li>
          <li className="flex items-center space-x-4">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className=" text-lg text-gray-600 ">
              Access to all premium voices
            </p>
          </li>
          <li className="flex items-center space-x-4">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className=" text-lg text-gray-600 ">Try Voice Cloning for free</p>
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

function BestOffer() {
  return (
    <div className=" border-indigo-600 bg-white  flex-col rounded-md shadow-xl cursor-pointer relative border-2 border-border-opacity-10">
      {/* {Popular tag} */}
      <span className="bg-indigo-600 text-white px-6 py-1 rounded-full uppercase text-sm font-semibold whitespace-nowrap absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {" "}
        Most Popular{" "}
      </span>
      {/* {Card Header} */}
      <div className="px-6 py-12 border-b-2 border-gray-200">
        <p className="text-3xl font-semibold text-center items-center mb-4">
          Professional
        </p>
        <div className="flex justify-center items-center">
          <div className="flex items-start">
            <p className="text-4xl font-medium">$</p>
            <p className="text-7xl font-medium">39</p>
          </div>
          <p className="text-2xl text-gray-400">/Month</p>
        </div>
      </div>
      {/* {Card Body} */}
      <div className="p-12 bg-gray-100">
        <ul className="space-y-3">
          <li className="flex items-center space-x-4">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className=" text-lg text-gray-600">240 minutes video per month</p>
          </li>
          <li className="flex items-center space-x-4">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className=" text-lg text-gray-600 ">All Premium Voices</p>
          </li>
          <li className="flex items-center space-x-4">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className=" text-lg text-gray-600 ">Audio Previews</p>
          </li>
          <li className="flex items-center space-x-4">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className=" text-lg text-gray-600 ">Unlimited Downloads</p>
          </li>
          <li className="flex items-center space-x-4">
            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className=" text-lg text-gray-600 ">Commercial License</p>
          </li>
        </ul>
        {/* {CTA} */}
        <button
          className="mt-12 w-full py-4 px-8 rounded-lg text-lg 
        whitespace-nowrap bg-white 
        focus:outline-none focus:ring-4 focus:ring-indigo-600 
        focus:ring-opacity-50 transition-all items-center justify-center flex font-bold hover:bg-indigo-700 text-indigo-600 hover:scale-105 transform"
        >
          Start your free Trial
        </button>
      </div>
    </div>
  );
}


function Pricing() {
  return (
    <div className=" h-full lg:flex lg:justify-center lg:items-center px-6 py-12 pb-60 pt-28">
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-0 ">
        <div className="w-full max-w-md mx-auto lg:transform lg:scale-90">
          <CardComponent />
        </div>
        <div className="w-full max-w-md mx-auto order-first lg:order-none lg:scale-110 lg:transform lg:z-10">
          <BestOffer />
        </div>
        <div className="w-full max-w-md mx-auto lg:transform lg:scale-90">
          <YoCardComponent/>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
