import React from 'react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-orange-400 border-dashed rounded-full animate-spin">
      </div>
      <h3 className="mt-4 text-lg font-bold text-black">Loading...</h3>
    </div>
  );
}
