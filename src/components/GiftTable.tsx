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
               <Gift className="h-12 w-12 text-primary/75" />
            </div>
            <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
               Mesa de Regalos
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
               Tu presencia es nuestro mejor regalo. Sin embargo, si deseas
               obsequiarnos algo, hemos creado una mesa de regalos para
               facilitar tu elección.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <button className="btn btn-primary rounded-full px-8 py-6">
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
