import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeAlert, TicketIcon } from "lucide-react";
import Divider from "./Divider";

const Considerations = ({ giftRegistryUrls }) => {
   return (
      <div className="max-w-4xl mx-auto">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center">
            <div className="flex justify-center mb-4">
               <BadgeAlert className="h-12 w-12 text-primary/75" />
            </div>
            <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
               Consideraciones
            </h2>
            <motion.div
               initial={{ opacity: 0, scale: 0, x: 50 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{
                  delay: 0.5,
                  duration: 1,
                  type: "spring",
               }}>
               <Divider color="primary" />
            </motion.div>
            <p className="font-marcellus leading-relaxed max-w-3xl mx-auto mb-8">
               "Para que todos podamos disfrutar de este día especial, les
               compartimos algunas consideraciones:"
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <div className="text-base-content/75 rounded-full px-8 py-6">
                  La celebración está pensada únicamente para adultos (no
                  niños).
               </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <div className="text-base-content/75 rounded-full px-8 py-6">
                  Aunque no habrá alcohol incluido, son bienvenidos a traer sus
                  bebidas favoritas.
               </div>
            </motion.div>
         </motion.div>
      </div>
   );
};

export default Considerations;
