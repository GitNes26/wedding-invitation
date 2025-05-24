"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2 } from "lucide-react";

/**
 * Props para el componente AudioPlayer.
 * @param audios - Arreglo de URLs de archivos de audio a reproducir en secuencia.
 */
interface AudioPlayerProps {
   audios: string[];
}

/**
 * Componente de reproducción de audio con control de volumen.
 */
export default function AudioPlayer({ audios }: AudioPlayerProps) {
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [volume, setVolume] = useState(0.3); // Estado de volumen
   const audioRef = useRef<HTMLAudioElement | null>(null);

   useEffect(() => {
      if (!audios.length) return;

      const newAudio = new Audio(audios[currentIndex]);
      newAudio.volume = volume;

      const handleEnded = () => {
         const nextIndex = (currentIndex + 1) % audios.length;
         setCurrentIndex(nextIndex);
      };

      newAudio.addEventListener("ended", handleEnded);
      audioRef.current = newAudio;

      if (isPlaying) {
         newAudio.play().catch(console.error);
      }

      return () => {
         newAudio.pause();
         newAudio.removeEventListener("ended", handleEnded);
         audioRef.current = null;
      };
   }, [currentIndex, audios]);

   useEffect(() => {
      if (audioRef.current) {
         audioRef.current.volume = volume;
      }
   }, [volume]);

   useEffect(() => {
      if (isPlaying && audioRef.current) {
         audioRef.current.play().catch(console.error);
      } else if (audioRef.current) {
         audioRef.current.pause();
      }
   }, [isPlaying]);

   const togglePlay = () => {
      setIsPlaying((prev) => !prev);
   };

   return (
      <div className="flex items-center gap-4">
         <div
            className="tooltip tooltip-bottom"
            data-tip={isPlaying ? "Mutear música" : "Reproducir música"}>
            <button
               className={`btn ${
                  isPlaying ? "btn-circle" : ""
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
         {/* Control de Volumen */}
         {isPlaying && (
            <div className="flex items-center gap-2 w-full max-w-xs">
               <span className="text-sm">🔉</span>
               <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="range range-error range-xs flex-1"
               />
               <span className="text-sm">🔊</span>
            </div>
         )}
      </div>
   );
}
