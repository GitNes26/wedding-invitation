import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Divider from "./Divider";

const TimelineBoda = ({}) => {
   // Definir los eventos de la boda
   const eventos = [
      {
         hora: "7:00 PM",
         titulo: "CEREMONIA CIVIL",
         icono: "fa-rings",
      },
      {
         hora: "7:30 PM",
         titulo: "CEREMONIA RELIGIOSA",
         icono: "fa-church",
      },
      {
         hora: "8:00 PM",
         titulo: "RECEPCIÓN",
         icono: "fa-champagne-glasses",
      },
      {
         hora: "9:00 PM",
         titulo: "BRINDIS",
         icono: "fa-champagne-glasses",
      },
      {
         hora: "9:30 PM",
         titulo: "VALS/DANZA",
         icono: "fa-people-dancing",
      },
      {
         hora: "10:30 PM",
         titulo: "CENA",
         icono: "fa-utensils",
      },
      {
         hora: "1:00 A 2:00 AM",
         titulo: "GRUPO EN VIVO",
         icono: "fa-music",
      },
   ];

   return (
      <div className="py-12 px-6">
         <div className="max-w-4xl mx-auto">
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="text-center mb-16">
               <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-6 text-rose-800 dark:text-rose-300">
                  Programa <br />
               </h2>
               <small>
                  (cambiar la linea del tiempo a un diseño horizontal)
               </small>
               <Divider />
            </motion.div>

            <div className="relative">
               {/* <!-- Línea vertical central --> */}
               <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30"></div>

               {/* <!-- Eventos de la línea del tiempo --> */}
               <div className="space-y-16 relative">
                  {eventos.map((evento, index) => (
                     <div
                        key={`event-item-${index}`}
                        className={`flex items-center ${
                           index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                        }`}>
                        <div
                           className={`w-1/2 ${
                              index % 2 === 0
                                 ? "text-right pr-8"
                                 : "text-left pl-8"
                           }`}>
                           <p className="text-xl font-bold text-primary">
                              {evento.hora}
                           </p>
                           <p className="text-sm font-medium mt-1">
                              {evento.titulo}
                           </p>
                        </div>

                        <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg">
                           <i
                              className={`fa-solid ${evento.icono} text-sm`}></i>
                        </div>

                        <div
                           className={`w-1/2 ${
                              index % 2 === 0
                                 ? "text-left pl-8"
                                 : "text-right pr-8"
                           }`}>
                           {/* <!-- Espacio vacío para mantener la simetría --> */}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default TimelineBoda;
