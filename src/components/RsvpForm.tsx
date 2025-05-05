"use client";

// import type React from "react";

import React, { useState } from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { input } from "@/components/ui/input";
// import { label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/hooks/use-toast";

interface RsvpFormProps {
   onComplete?: () => void;
}

export default function RsvpForm({ onComplete }: RsvpFormProps) {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      attendance: "yes",
      guests: "0",
      message: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleRadioChange = (value: string) => {
      setFormData((prev) => ({ ...prev, attendance: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulación de envío de datos
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setIsSubmitted(true);
      // toast({
      //    title: "Confirmación enviada",
      //    description: "Gracias por confirmar tu asistencia.",
      // });

      if (onComplete) {
         setTimeout(onComplete, 2000);
      }
   };

   if (isSubmitted) {
      return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8">
            <div className="mb-6 text-green-600 dark:text-green-400">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
               </svg>
            </div>
            <h3 className="text-xl font-medium mb-2 text-slate-800 dark:text-slate-200">
               ¡Gracias por confirmar!
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
               Hemos recibido tu respuesta. Nos vemos en nuestra boda.
            </p>
         </motion.div>
      );
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         <div className="space-y-4">
            <div>
               <label className="" htmlFor="name">
                  Nombre completo
               </label>
               <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input w-full mt-1"
               />
            </div>

            <div>
               <label htmlFor="email">Correo electrónico</label>
               <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input w-full mt-1"
               />
            </div>

            <div>
               <label htmlFor="phone">Teléfono</label>
               <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input w-full mt-1"
               />
            </div>

            <div>
               <label>¿Asistirás a nuestra boda?</label>
               <div className="w-full">
                  <label htmlFor="yes">Sí, ahí estare</label>
                  <input
                     type="radio"
                     name="yes"
                     className="radio"
                     defaultChecked
                  />
                  <label className="ml-5" htmlFor="no">
                     No podre asistir
                  </label>
                  <input type="radio" name="no" className="radio" />
               </div>
               {/* <RadioGroup
                  value={formData.attendance}
                  onValueChange={handleRadioChange}
                  className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                     <RadioGroupItem value="yes" id="yes" />
                     <label htmlFor="yes" className="cursor-pointer">
                        Sí, asistiré
                     </label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <RadioGroupItem value="no" id="no" />
                     <label htmlFor="no" className="cursor-pointer">
                        No podré asistir
                     </label>
                  </div>
               </RadioGroup> */}
            </div>

            {formData.attendance === "yes" && (
               <div>
                  <label htmlFor="guests">Número de acompañantes</label>
                  <input
                     id="guests"
                     name="guests"
                     type="number"
                     min="0"
                     max="5"
                     value={formData.guests}
                     onChange={handleChange}
                     className="input w-full mt-1"
                  />
               </div>
            )}

            <div>
               <label htmlFor="message">Mensaje (opcional)</label>
               <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea w-full mt-1"
                  rows={3}
               />
            </div>
         </div>

         <button
            type="submit"
            className="btn w-full bg-rose-600 hover:bg-rose-700 text-white"
            disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Confirmar Asistencia"}
         </button>
      </form>
   );
}
