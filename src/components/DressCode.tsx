import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt } from "lucide-react";
import Divider from "./Divider";
import images from "../constants/images";
import { useGlobalContext } from "../contexts/GlobalContext";

const DressCode = ({}) => {
   const { themeActive } = useGlobalContext();

   // Definir los colores recomendados
   const coloresRecomendados = [
      { nombre: "Azul marino", hex: "#0a2463" },
      { nombre: "Gris", hex: "#8d99ae" },
      { nombre: "Beige", hex: "#d6ccc2" },
      { nombre: "Verde oliva", hex: "#606c38" },
      { nombre: "Borgoña", hex: "#800020" },
      { nombre: "Dorado", hex: "#d4af37" },
   ];

   // Definir los colores prohibidos
   const coloresProhibidos = [
      { nombre: "Blanco", hex: "#ffffff" },
      { nombre: "Marfil", hex: "#fffff0" },
      { nombre: "Rojo brillante", hex: "#ff0000" },
   ];

   return (
      <div className="max-w-4xl mx-auto">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center">
            <div className="flex justify-center mb-4">
               <Shirt className="h-12 w-12 text-primary/75" />
            </div>
            <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
               Código de Vestimenta
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
            <p className="font-marcellus text-base-content leading-relaxed max-w-3xl mx-auto mb-8">
               Nos encantaría que nos acompañes con{" "}
               <span className="font-bold">vestimenta formal</span> para
               celebrar nuestro día especial.
            </p>
         </motion.div>

         {/* <!-- Vestimenta para damas y caballeros --> */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               viewport={{ once: true }}
               className="text-center">
               <div className="text-center">
                  <div className="flex justify-center mb-4">
                     <img
                        src={
                           themeActive === "dark"
                              ? images.weddingDressDark
                              : images.weddingDressLight
                        }
                        alt="Novio y Novia"
                        className="text-center w-12 h-12 transition-all text-primary"
                     />
                  </div>
                  <h3 className="text-3xl font-medium font-mayoritte mb-3">
                     Damas
                  </h3>
                  <p className="font-marcellus">
                     Vestido largo o midi, traje sastre elegante
                  </p>
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.5 }}
               viewport={{ once: true }}
               className="text-center">
               <div className="text-center">
                  <div className="flex justify-center mb-4">
                     <img
                        src={
                           themeActive === "dark"
                              ? images.suitDark
                              : images.suitLight
                        }
                        alt="Novio y Novia"
                        className="text-center w-12 h-12 transition-all text-primary"
                     />
                  </div>
                  <h3 className="text-3xl font-medium font-mayoritte mb-3">
                     Caballeros
                  </h3>
                  <p className="font-marcellus">
                     Traje formal con corbata o moño
                  </p>
               </div>
            </motion.div>
         </div>

         {/* <!-- Colores recomendados --> */}
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}>
            <div className="mb-10">
               <h3 className="text-xl font-medium font-marcellus text-center mb-6">
                  Colores Recomendados
               </h3>
               <div className="flex flex-wrap justify-center ">
                  {coloresRecomendados.map((color, index) => (
                     <motion.div
                        key={`item-recomendered-${color}-${index}`}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}>
                        <div className="text-center">
                           <div
                              className="tooltip tooltip-bottom"
                              data-tip={color.nombre}>
                              <div
                                 className="w-16 h-16 rounded-full mb-2 border border-base-300 shadow-sm -mx-2"
                                 style={{ backgroundColor: color.hex }}></div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </motion.div>

         {/* <!-- Colores prohibidos --> */}
         {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}>
            <div>
               <h3 className="text-xl font-medium text-center mb-6">
                  Colores a Evitar
               </h3>
               <div className="flex flex-wrap justify-center gap-4">
                  {coloresProhibidos.map((color, index) => (
                     <motion.div
                        key={`item-no-recomendered-${color}-${index}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}>
                        <div className="text-center">
                           <div
                              className="w-16 h-16 rounded-full mx-auto mb-2 border border-base-300 shadow-sm relative"
                              style={{ backgroundColor: color.hex }}>
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-full h-0.5 bg-error rotate-45 transform"></div>
                                 <div className="w-full h-0.5 bg-error -rotate-45 transform"></div>
                              </div>
                           </div>
                           <span className="text-sm">{color.nombre}</span>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </motion.div> */}

         {/* <!-- Nota adicional --> */}
         {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}>
            <div className="mt-10 text-center">
               <div className="alert bg-primary/10 max-w-lg mx-auto">
                  <i className="fa-solid fa-circle-info text-primary"></i>
                  <span>
                     El blanco está reservado para la novia. Agradecemos tu
                     comprensión.
                  </span>
               </div>
            </div>
         </motion.div> */}
      </div>
   );
};

export default DressCode;
