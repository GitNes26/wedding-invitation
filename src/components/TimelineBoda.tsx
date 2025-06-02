"use client";

import type React from "react";
import { motion } from "framer-motion";
import Divider from "./Divider";

const TimelineBoda: React.FC = () => {
   // Definir los eventos de la boda
   const eventos = [
      {
         hora: "15:30",
         titulo: "Ceremonia",
         subtitulo: "Religiosa",
         icono: "fa-church",
      },
      {
         hora: "16:00",
         titulo: "Ceremonia",
         subtitulo: "Civil",
         icono: "fa-rings",
      },
      {
         hora: "16:30",
         titulo: "Sesión",
         subtitulo: "Fotográfica",
         icono: "fa-camera",
      },
      {
         hora: "17:00",
         titulo: "Brindis",
         subtitulo: "de Honor",
         icono: "fa-champagne-glasses",
      },
      {
         hora: "17:30",
         titulo: "Cena",
         subtitulo: "Especial",
         icono: "fa-utensils",
      },
      {
         hora: "18:00",
         titulo: "Pastel",
         subtitulo: "de Bodas",
         icono: "fa-cake-slice",
      },
      {
         hora: "18:30",
         titulo: "¡A Bailar!",
         subtitulo: "Fiesta",
         icono: "fa-music",
      },
   ];

   return (
      <>
         <div className="mx-auto">
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="text-center mb-16">
               <h2
                  className="font-anodina-extraboldl text-3xl md:text-4xl mb-2">
                  Wedding Timeline
               </h2>
               <p className="text-lg mb-6" style={{ color: "#8b7355" }}>
                  MARÍA & JUAN
               </p>
               <Divider />
            </motion.div>

            {/* Timeline horizontal */}
            <div className="relative overflow-x-auto">
               <div className="min-w-[800px] relative">
                  {/* Línea ondulada SVG */}
                  <svg
                     className="absolute top-32 left-0 w-full h-16"
                     viewBox="0 0 800 60"
                     preserveAspectRatio="none">
                     <path
                        d="M 0 30 Q 100 10 200 30 T 400 30 T 600 30 T 800 30"
                        stroke="#8b7355"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                     />
                     {/* Puntos en la línea */}
                     {eventos.map((_, index) => {
                        const x = (index * 800) / (eventos.length - 1);
                        const y = 30 + Math.sin((index * Math.PI) / 3) * 10;
                        return (
                           <circle
                              key={`point-${index}`}
                              cx={x}
                              cy={y}
                              r="4"
                              fill="#8b7355"
                           />
                        );
                     })}
                  </svg>

                  {/* Eventos */}
                  <div className="flex justify-between items-start pt-8">
                     {eventos.map((evento, index) => (
                        <motion.div
                           key={`event-${index}`}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.5, delay: index * 0.1 }}
                           viewport={{ once: true }}
                           className="flex flex-col items-center text-center w-24 md:w-32">
                           {/* Icono */}
                           <div
                              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 flex items-center justify-center mb-4 shadow-sm"
                              style={{ borderColor: "#8b7355" }}>
                              <i
                                 className={`fa-solid ${evento.icono} text-xl md:text-2xl`}
                                 style={{
                                    color: "#8b7355",
                                    transition: "transform 0.3s ease",
                                 }}
                                 onMouseOver={(e) =>
                                    (e.currentTarget.style.transform =
                                       "scale(1.1)")
                                 }
                                 onMouseOut={(e) =>
                                    (e.currentTarget.style.transform =
                                       "scale(1)")
                                 }></i>
                           </div>

                           {/* Espacio para la línea */}
                           <div className="h-16"></div>

                           {/* Hora */}
                           <div
                              className="text-lg md:text-xl font-bold mb-1"
                              style={{ color: "#2c2c2c" }}>
                              {evento.hora}
                           </div>

                           {/* Título y subtítulo */}
                           <div className="text-sm md:text-base">
                              <div
                                 className="font-medium"
                                 style={{ color: "#2c2c2c" }}>
                                 {evento.titulo}
                              </div>
                              <div
                                 className="text-xs md:text-sm"
                                 style={{ color: "#8b7355" }}>
                                 {evento.subtitulo}
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Nota al pie */}
            <div className="text-center mt-12">
               <p className="text-sm italic" style={{ color: "#8b7355" }}>
                  *Los horarios pueden variar ligeramente
               </p>
            </div>
         </div>

         <style jsx>{`
            @media (max-width: 768px) {
               .min-w-[800px] {
                  min-width: 600px;
               }
            }
         `}</style>
      </>
   );
};

export default TimelineBoda;
