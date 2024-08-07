import React, {useState, useEffect} from 'react'; 
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl p-4 text-center">Pantry Tracker</h1>
        <div className="bg-slate-800 p-5 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item:"
            />
            <input
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Enter quantity:"
            />
            <button
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl col-span-1"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
