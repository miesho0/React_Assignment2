import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white py-6 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center w-full border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <img src="./src/assets/images/logo-BfNap0Pe.png" className='h-8' alt="logo" />
            <span className="text-2xl font-semibold text-gray-800"> Recipe </span>
          </div>
          <span className="text-2xl font-semibold text-blue-600">Route</span>
        </div>
        <div className="text-center text-sm text-gray-500"> © {new Date().getFullYear()} Mohamed Hesham™. All Rights Reserved.</div>
      </div>
    </footer>
  );
}