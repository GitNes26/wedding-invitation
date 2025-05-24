"use client";

import React from "react";
import { motion } from "framer-motion";
import images from "../constants/images";
import { Heart } from "lucide-react";

interface InvitationCardProps {
   bride: string;
   groom: string;
   weddingDate: string;
   weddingTime: string;
   weddingPlace: string;
   location: string;
   option: 1 | 2;
   onConfirmClick?: () => void;
}

export default function InvitationCard({
   bride,
   groom,
   weddingDate,
   weddingTime,
   weddingPlace,
   location,
   option = 1,
   onConfirmClick,
}: InvitationCardProps) {
   return option == 1 ? (
      <motion.header
         className="relative h-screen flex flex-col items-center justify-center text-center p-6"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1.5 }}>
         <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="absolute inset-0 overflow-hidden z-0">
            <img
               src={images.hero}
               alt="Fondo floral"
               className="object-cover w-full h-full transition-all opacity-20 dark:opacity-50 "
            />
         </motion.div>

         <motion.div
            className="z-10 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}>
            <h1 className="font-dashing text-3xl md:text-9xl mb-4 text-rose-800 dark:text-rose-300">
               {bride} & {groom}
            </h1>
            {/* <h1 className="font-mayoritte text-3xl md:text-9xl mb-4 text-rose-800 dark:text-rose-300">
                        {bride} & {groom}
                     </h1> */}
            <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
               className="flex justify-center my-6">
               <Heart
                  className="text-rose-500 dark:text-rose-400 h-12 w-12 animate-pulse"
                  fill="currentColor"
               />
            </motion.div>
            <p className="font-marcellus text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-2">
               ¡Nos casamos!
            </p>
            <p className="font-anodina-extrabold text-lg text-slate-600 dark:text-slate-200">
               {weddingDate} - {weddingPlace} {location}
            </p>
            <p className="text-lg md:text-xl font-anodina-extrabold text-slate-800 dark:text-slate-200 mb-8">
               {weddingTime} hrs
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <button
                  className="btn bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 py-6 text-lg"
                  onClick={onConfirmClick}>
                  Confirmar Asistencia
               </button>
            </motion.div>
         </motion.div>

         {/* Flechita */}
         <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}>
            <div className="animate-bounce">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white">
                  <path d="M12 5v14M5 12l7 7 7-7" />
               </svg>
            </div>
         </motion.div>

         {/* <!-- Efecto de papel rasgado en la parte inferior --> */}
         <div className="torn-paper-effect"></div>
      </motion.header>
   ) : (
      <motion.section
         className="relative bg-rose-50 dark:bg-slate-800 py-20 px-6 text-center overflow-hidden"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1 }}>
         <img
            src={images.floral}
            alt="Decoración floral"
            className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-20 pointer-events-none"
         />

         <div className="relative z-10 max-w-xl mx-auto">
            <h1 className="font-dashing text-4xl md:text-6xl text-rose-700 dark:text-rose-300 mb-4">
               {bride} & {groom}
            </h1>
            <p className="font-marcellus text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-2">
               ¡Nos casamos!
            </p>
            <p className="font-anodina-extrabold text-lg text-slate-600 dark:text-slate-200">
               {weddingDate} - {location}
            </p>

            <div className="mt-8">
               <button
                  onClick={onConfirmClick}
                  className="btn bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105">
                  Confirmar Asistencia
               </button>
            </div>
         </div>
      </motion.section>
   );
}
