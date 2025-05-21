import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import Divider from "./Divider";

const GiftTable = ({ giftRegistryUrl }) => {
   return (
      <div className="max-w-4xl mx-auto">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center">
            <div className="flex justify-center mb-4">
               <Gift className="h-12 w-12 text-rose-600 dark:text-rose-400" />
            </div>
            <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-6 text-rose-800 dark:text-rose-300">
               Mesa de Regalos
            </h2>
            <Divider />
            <p className="font-marcellus text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
               Tu presencia es nuestro mejor regalo. Sin embargo, si deseas
               obsequiarnos algo, hemos creado una mesa de regalos para
               facilitar tu elección.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <button className="btn bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 py-6">
                  <a
                     href={giftRegistryUrl}
                     target="_blank"
                     rel="noopener noreferrer">
                     Ver Mesa de Regalos
                  </a>
               </button>
            </motion.div>
         </motion.div>
      </div>
   );
};

export default GiftTable;
