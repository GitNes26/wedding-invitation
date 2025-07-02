import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt } from "lucide-react";
import Divider from "./Divider";
import images from "../constants/images";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useMobile } from "../hooks/useMobile";

const DressCode = ({}) => {
   const { themeActive } = useGlobalContext();
   const isMobile = useMobile();

   // Definir los colores recomendados
   const coloresRecomendados = [
      { nombre: "Azul marino", hex: "#0a2463" },
      { nombre: "Borgoña", hex: "#800020" },
      { nombre: "Burdeos", hex: "#6d1a36" },
      { nombre: "Verde esmeralda", hex: "#046307" },
      { nombre: "Terracota", hex: "#cc4a3a" },
      { nombre: "Mostaza", hex: "#d4a017" },
      { nombre: "Dorado viejo", hex: "#d4af37" },
      { nombre: "Marrón chocolate", hex: "#5c4033" },
      { nombre: "Gris marengo", hex: "#4a4a4a" },
      { nombre: "Óxido", hex: "#b7410e" },
      { nombre: "Vino tinto", hex: "#722f37" },
      { nombre: "Cobre", hex: "#b87333" },
      { nombre: "Verde bosque", hex: "#0b6623" },
      { nombre: "Azul petróleo", hex: "#003b4d" },
      { nombre: "Beige arena", hex: "#d2b48c" },
      { nombre: "Camel", hex: "#c19a6b" },
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
            viewport={{
               once: false,
               margin: isMobile ? "0px" : "-25% 0px",
            }}
            className="text-center">
            <div className="flex justify-center mb-4">
               <Shirt className="h-12 w-12 text-primary/75" />
            </div>
            <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
               Código de Vestimenta
            </h2>
            <motion.div
               initial={{ opacity: 0, scale: 0, x: 50 }}
               whileInView={{ opacity: 1, scale: 1, x: 0 }}
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
               viewport={{
                  once: false,
                  margin: isMobile ? "0px" : "-25% 0px",
               }}
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
               viewport={{
                  once: false,
                  margin: isMobile ? "0px" : "-25% 0px",
               }}
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
            viewport={{
               once: false,
               margin: isMobile ? "0px" : "-25% 0px",
            }}>
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
                              data-tip={`${
                                 color.nombre
                              } - ${color.hex.toUpperCase()}`}>
                              <div
                                 className={`${
                                    isMobile ? "w-14 h-14" : "w-16 h-16"
                                 } rounded-full mb-2 border border-base-300 shadow-sm -mx-2`}
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
            viewport={{
                        once: false,
                        margin: isMobile ? "0px" : "-25% 0px",
                     }}>
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
            viewport={{
                        once: false,
                        margin: isMobile ? "0px" : "-25% 0px",
                     }}>
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
