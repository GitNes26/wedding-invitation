import React, { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ThemeChanger from "./components/ThemeChanger";
import AudioPlayer from "./components/AudioPlayer";
import CountdownTimer from "./components/CountdownTimer";
import audios from "./constants/audios";

function App() {
   const [count, setCount] = useState(0);
   // const [isScrolled, setIsScrolled] = useState(false);
   const mainRef = useRef(null);

   // Fecha de la boda
   const weddingDate = new Date("2025-10-03T19:00:00");

   return (
      <div
         ref={mainRef}
         className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
         <div className="fixed top-4 right-4 z-50 flex gap-2">
            <AudioPlayer audio={audios.bailando} />
            <ThemeChanger />
         </div>
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>
         <CountdownTimer targetDate={weddingDate} />
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>{" "}
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>
         <div className="">
            <img
               src={viteLogo}
               className="logo animate-slide-up mb-3"
               alt="Vite logo"
            />
            <a href="https://vite.dev" target="_blank">
               <img
                  src={viteLogo}
                  className="logo animate-bounce"
                  alt="Vite logo"
               />
            </a>
            <a href="https://react.dev" target="_blank">
               <img
                  src={reactLogo}
                  className="logo react animate-[spin_3s_linear_infinite]"
                  alt="React logo"
               />
            </a>
         </div>
         <h1 className="text-3xl font-extrabold btn btn-accent m-2">
            Vite + React
         </h1>
         <div className="card">
            <button
               className="btn btn-error btn-outline"
               onClick={() => setCount((count) => count + 1)}>
               count is {count}
            </button>
            <p>
               Edit <code>src/App.jsx</code> and save to test HMR
            </p>
         </div>
         <p className="read-the-docs">
            Click on the Vite and React logos to learn more
         </p>
      </div>
   );
}

export default App;
