"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer({ audio = null }) {
   const [isPlaying, setIsPlaying] = useState(false);
   const audioRef = useRef<HTMLAudioElement | null>(null);

   useEffect(() => {
      audioRef.current = new Audio(audio);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;

      // Cleanup function
      return () => {
         console.log("hola reutn");
         if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
         }
      };
   }, []);

   const togglePlay = () => {
      console.log("togglePlay", isPlaying, audioRef);
      if (!audioRef.current) return;

      if (isPlaying) {
         audioRef.current.pause();
      } else {
         // Browsers require user interaction to play audio
         const playPromise = audioRef.current.play();

         if (playPromise !== undefined) {
            playPromise
               .then(() => {
                  console.log("entra aqui");
                  // Audio started playing successfully
               })
               .catch((error) => {
                  console.error("Audio playback failed:", error);
               });
         }
      }

      setIsPlaying(!isPlaying);
   };

   return (
      <div className="">
         <div
            className="tooltip tooltip-bottom"
            data-tip={isPlaying ? "Mutear música" : ""}>
            <button
               // variant="outline"
               // size="icon"
               className={`btn ${
                  isPlaying && "btn-circle"
               } rounded-full bg-background/80 bg-error backdrop-blur-sm transition-all duration-300 hover:scale-110`}
               onClick={togglePlay}
               aria-label={isPlaying ? "Mutear música" : "Reproducir música"}>
               {isPlaying ? (
                  <Volume2 className="h-5 w-5 text-error-content" />
               ) : (
                  <>💗 Reproducir música</>
               )}
            </button>
         </div>
      </div>
   );
}
