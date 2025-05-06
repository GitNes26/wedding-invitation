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
 * Componente de reproducción de audio que permite reproducir múltiples pistas en secuencia.
 * - Usa un botón flotante para alternar entre reproducir y pausar.
 * - Cambia automáticamente al siguiente audio cuando el actual finaliza.
 * - Se puede personalizar pasando un arreglo de URLs de audio.
 *
 * @example
 * <AudioPlayer audios={['/cancion1.mp3', '/cancion2.mp3']} />
 */
export default function AudioPlayer({ audios }: AudioPlayerProps) {
   const [isPlaying, setIsPlaying] = useState(false); // Estado de reproducción
   const [currentIndex, setCurrentIndex] = useState(0); // Índice de la pista actual
   const audioRef = useRef<HTMLAudioElement | null>(null); // Referencia al elemento de audio

   // Maneja el cambio de pista
   useEffect(() => {
      if (!audios.length) return;

      const newAudio = new Audio(audios[currentIndex]);
      newAudio.volume = 0.3;

      // Cuando termine la pista actual, avanza a la siguiente
      const handleEnded = () => {
         const nextIndex = (currentIndex + 1) % audios.length;
         setCurrentIndex(nextIndex);
      };

      newAudio.addEventListener("ended", handleEnded);
      audioRef.current = newAudio;

      if (isPlaying) {
         newAudio.play().catch(console.error);
      }

      // Limpieza al desmontar o cambiar de pista
      return () => {
         newAudio.pause();
         newAudio.removeEventListener("ended", handleEnded);
         audioRef.current = null;
      };
   }, [currentIndex, audios]);

   // Maneja play/pausa cuando cambia el estado de isPlaying
   useEffect(() => {
      if (isPlaying && audioRef.current) {
         audioRef.current.play().catch(console.error);
      } else if (audioRef.current) {
         audioRef.current.pause();
      }
   }, [isPlaying]);

   // Alterna reproducción
   const togglePlay = () => {
      setIsPlaying((prev) => !prev);
   };

   return (
      <div>
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
      </div>
   );
}
