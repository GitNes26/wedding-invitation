import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Divider from "./Divider";
import { Calendar, MapPin } from "lucide-react";

const DetailsEvent = ({
   formattedDate,
   formattedTime,
   googleCalendarUrl,
   weddingPlace,
   location,
   googleMapsUrl
}) => {
   return (
      <div className="max-w-4xl mx-auto">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-6 text-rose-800 dark:text-rose-300">
               Detalles del Evento
            </h2>
            <Divider />
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="text-center">
               <div className="flex justify-center mb-4">
                  <Calendar className="h-12 w-12 text-rose-600 dark:text-rose-400" />
               </div>
               <h3 className="text-xl font-medium mb-4 text-slate-800 dark:text-slate-200">
                  Fecha y Hora
               </h3>
               <p className="text-slate-700 dark:text-slate-300 mb-4">
                  {formattedDate}
               </p>
               <p className="text-slate-700 dark:text-slate-300 mb-6">
                  {formattedTime} hrs
               </p>
               <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <button
                     // variant="outline"
                     className="btn btn-outline rounded-full border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30">
                     <a
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        Agregar a Google Calendar
                     </a>
                  </button>
               </motion.div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="text-center">
               <div className="flex justify-center mb-4">
                  <MapPin   className="h-12 w-12 text-rose-600 dark:text-rose-400" />
               </div>
               <h3 className="text-xl font-medium mb-4 text-slate-800 dark:text-slate-200">
                  Ubicación
               </h3>
               <p className="text-slate-700 dark:text-slate-300 mb-4">
                  {weddingPlace}
               </p>
               <p className="text-slate-700 dark:text-slate-300 mb-6">
                  {location}
               </p>
               <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <button
                     // variant="outline"
                     className="btn btn-outline rounded-full border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30">
                     <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        Ver en Google Maps
                     </a>
                  </button>
               </motion.div>
            </motion.div>
         </div>
      </div>
   );
};

export default DetailsEvent;
