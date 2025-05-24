"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Divider from "./Divider";
import dayjs from "dayjs";
import env from "../constants/env";

interface RsvpFormProps {
   weddingInfo: {
      bride: string;
      groom: string;
      date: string;
      time: string;
      fullDate: string;
      theDate: Date;
      place: string;
      location: string;
      calendarUrl: string;
      mapsUrl: string;
      giftTable: string;
   };
   onComplete?: () => void;
}

export default function RsvpForm({ weddingInfo, onComplete }: RsvpFormProps) {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      attendance: "yes",
      guests: "0",
      message: "",
   });
   const [authorized, setAuthorized] = useState<boolean | null>(null);
   const [maxGuests, setMaxGuests] = useState<number | null>(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");

   const endpoint = env.TU_WEB_APP_URL;

   useEffect(() => {
      const checkPhone = async () => {
         if (formData.phone.length < 10) return;
         try {
            const res = await fetch(`${endpoint}?telefono=${formData.phone}`);
            const data = await res.json();
            console.log("🚀 ~ checkPhone ~ data:", data);
            setAuthorized(data.autorizado);
            if (data.autorizado) {
               setMaxGuests(data.max);
               setErrorMsg("");
            } else {
               setErrorMsg("Este número no está autorizado.");
               setMaxGuests(null);
            }
         } catch {
            setErrorMsg("Error validando el teléfono.");
         }
      };
      checkPhone();
   }, [formData.phone]);

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         const res = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({
               nombre: formData.name,
               email: formData.email,
               telefono: formData.phone,
               asistencia: formData.attendance,
               acompanantes: formData.guests,
               mensaje: formData.message,
            }),
            headers: { "Content-Type": "application/json" },
         });

         const result = await res.json();
         if (result.success) {
            setIsSubmitted(true);
            if (onComplete) setTimeout(onComplete, 2000);
         } else {
            setErrorMsg(result.error || "Error desconocido");
         }
      } catch {
         setErrorMsg("No se pudo enviar el formulario");
      } finally {
         setIsSubmitting(false);
      }
   };

   if (isSubmitted) {
      return (
         <>
            <motion.div
               className="text-center p-8"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}>
               <div className="mb-6 text-green-600">
                  <svg
                     className="mx-auto"
                     width="48"
                     height="48"
                     stroke="currentColor"
                     fill="none"
                     viewBox="0 0 24 24">
                     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                     <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold">¡Gracias por confirmar!</h3>
               <p>Nos vemos en la boda 🎉</p>
            </motion.div>
            <Divider />
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
               <h3 className="text-xl font-marcellus font-bold mb-2 text-slate-800 dark:text-slate-200">
                  ¡Gracias por confirmar!
               </h3>
               <p className="font-marcellus text-slate-600 dark:text-slate-400">
                  Hemos recibido tu respuesta. Nos vemos en nuestra boda.
               </p>
            </motion.div>
         </>
      );
   }

   return (
      <div className="max-w-4xl mx-auto">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-6 text-rose-800 dark:text-rose-300">
               Confirma tu Asistencia
            </h2>
            <Divider />
            <p className="font-marcellus text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
               Por favor, confirma tu asistencia antes del{" "}
               {dayjs(weddingInfo.theDate)
                  .subtract(32, "days")
                  .format("dddd DD [de] MMMM [de] YYYY")}
               .
            </p>
         </motion.div>
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <div className="relative max-w-6xl mx-auto">
               {/* Contenedor principal del boleto horizontal */}
               <div className="ticket-horizontal relative bg-gradient-to-r from-base-100 via-base-50 to-base-100 shadow-2xl overflow-hidden">
                  {/* Perforaciones superiores e inferiores */}
                  <div className="absolute top-0 left-0 w-full h-6 flex justify-around items-center">
                     {[...Array(20)].map((_, i) => (
                        <div
                           key={i}
                           className="w-3 h-3 bg-base-300 rounded-full -mt-1.5"></div>
                     ))}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-6 flex justify-around items-center">
                     {[...Array(20)].map((_, i) => (
                        <div
                           key={i}
                           className="w-3 h-3 bg-base-300 rounded-full -mb-1.5"></div>
                     ))}
                  </div>

                  {/* Línea de separación vertical decorativa */}
                  <div className="absolute left-1/3 top-6 bottom-6 w-px border-l-2 border-dashed border-primary/30"></div>

                  <div className="flex min-h-[500px]">
                     {/* Sección izquierda - Información del evento */}
                     <div className="w-1/3 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary/5 to-secondary/5">
                        <div className="space-y-4">
                           <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-primary-content text-2xl">
                                 ♥
                              </span>
                           </div>

                           <h3 className="text-2xl font-bold text-primary">
                              Invitación de Boda
                           </h3>

                           <div className="space-y-2">
                              <p className="font-dashing text-3xl mb-8 text-primary">
                                 {weddingInfo.bride} & {weddingInfo.groom}
                              </p>
                              <p className="font-anodina-extrabold text-secondary text-sm">
                                 {weddingInfo.date} <br />
                                 {weddingInfo.time} hrs
                              </p>
                           </div>

                           <div className="divider divider-primary opacity-50"></div>

                           <div className="space-y-1">
                              <p className="text-xs font-medium">
                                 {weddingInfo.place.toUpperCase()}
                              </p>
                              <p className="text-xs opacity-60">
                                 {weddingInfo.location}
                              </p>
                           </div>

                           <div className="mt-6 p-3 bg-base-100 rounded-lg shadow-inner">
                              <p className="text-xs font-mono">
                                 TICKET
                                 {/* #WED
                                 {Math.random()
                                    .toString(36)
                                    .substr(2, 4)
                                    .toUpperCase()} */}
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Sección derecha - Formulario */}
                     <div className="w-2/3 p-8">
                        <div className="mb-6">
                           <h4 className="text-xl font-bold text-center mb-2">
                              Confirmación de Asistencia
                           </h4>
                           <p className="text-sm text-center opacity-70">
                              Al ingresar el número telefónico podrás llenar el
                              formulario.
                           </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                           {/* Primera fila - Información básica */}
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="form-control">
                                 <label className="label">
                                    <span className="label-text font-medium text-sm">
                                       📱 Teléfono
                                    </span>
                                 </label>
                                 <input
                                    name="phone"
                                    type="tel"
                                    maxLength={10}
                                    className="input input-bordered input-sm input-primary focus:input-primary"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="10 dígitos"
                                 />
                              </div>

                              <div className="form-control">
                                 <label className="label">
                                    <span className="label-text font-medium text-sm">
                                       ✉️ Email
                                    </span>
                                 </label>
                                 <input
                                    name="email"
                                    type="email"
                                    className="input input-bordered input-sm input-primary focus:input-primary"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!authorized}
                                    placeholder="tu@email.com"
                                 />
                              </div>
                           </div>

                           {/* Segunda fila - Nombre */}
                           <div className="form-control">
                              <label className="label">
                                 <span className="label-text font-medium text-sm">
                                    👤 Nombre del invitado o Familia
                                 </span>
                              </label>
                              <input
                                 name="name"
                                 className="input input-bordered input-primary focus:input-primary text-center font-medium"
                                 required
                                 value={formData.name}
                                 onChange={handleChange}
                                 disabled={!authorized}
                                 placeholder="Escribe tu nombre aquí"
                              />
                           </div>

                           {/* Tercera fila - Asistencia */}
                           <div className="form-control">
                              <label className="label">
                                 <span className="label-text font-bold text-center w-full">
                                    🎉 ¿Nos acompañarás?
                                 </span>
                              </label>
                              <div className="flex justify-center gap-6 mt-2">
                                 <label className="cursor-pointer">
                                    <div
                                       className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-300 ${
                                          formData.attendance === "yes"
                                             ? "border-primary bg-primary/10 shadow-md"
                                             : "border-base-300 hover:border-primary/50"
                                       }`}>
                                       <input
                                          type="radio"
                                          name="attendance"
                                          value="yes"
                                          checked={
                                             formData.attendance === "yes"
                                          }
                                          onChange={() =>
                                             setFormData({
                                                ...formData,
                                                attendance: "yes",
                                             })
                                          }
                                          disabled={!authorized}
                                          className="radio radio-primary radio-sm"
                                       />
                                       <span className="text-lg">✅</span>
                                       <span className="font-medium">
                                          ¡Sí, asistiré!
                                       </span>
                                    </div>
                                 </label>

                                 <label className="cursor-pointer">
                                    <div
                                       className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-300 ${
                                          formData.attendance === "no"
                                             ? "border-error bg-error/10 shadow-md"
                                             : "border-base-300 hover:border-error/50"
                                       }`}>
                                       <input
                                          type="radio"
                                          name="attendance"
                                          value="no"
                                          checked={formData.attendance === "no"}
                                          disabled={!authorized}
                                          onChange={() =>
                                             setFormData({
                                                ...formData,
                                                attendance: "no",
                                             })
                                          }
                                          className="radio radio-error radio-sm"
                                       />
                                       <span className="text-lg">❌</span>
                                       <span className="font-medium">
                                          No podré asistir
                                       </span>
                                    </div>
                                 </label>
                              </div>
                           </div>

                           {/* Cuarta fila - Número de invitados y mensaje */}
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {maxGuests !== null &&
                                 formData.attendance === "yes" && (
                                    <div className="form-control">
                                       <label className="label">
                                          <span className="label-text font-medium text-sm">
                                             👥 Número de personas
                                          </span>
                                       </label>
                                       <div className="flex items-center gap-2">
                                          <input
                                             name="guests"
                                             type="number"
                                             className="input input-bordered input-sm input-primary focus:input-primary w-20 text-center font-bold"
                                             min="0"
                                             max={maxGuests}
                                             value={formData.guests}
                                             onChange={handleChange}
                                             disabled={!authorized}
                                          />
                                          <span className="text-sm">
                                             personas
                                          </span>
                                          <div className="badge badge-primary badge-sm">
                                             Max {maxGuests}
                                          </div>
                                       </div>
                                    </div>
                                 )}

                              <div className="form-control">
                                 <label className="label">
                                    <span className="label-text font-medium text-sm">
                                       💌 Mensaje
                                    </span>
                                 </label>
                                 <textarea
                                    name="message"
                                    className="textarea textarea-bordered textarea-sm textarea-primary focus:textarea-primary"
                                    rows={2}
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={!authorized}
                                    placeholder="Buenos deseos..."
                                 />
                              </div>
                           </div>

                           {/* Error message */}
                           {errorMsg && (
                              <div className="alert alert-error alert-sm">
                                 <span className="text-sm">⚠️ {errorMsg}</span>
                              </div>
                           )}

                           {/* Botón de envío */}
                           <div className="text-center pt-4">
                              <button
                                 className="btn btn-primary btn-wide rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                 disabled={isSubmitting || maxGuests === null}>
                                 {isSubmitting ? (
                                    <>
                                       <span className="loading loading-spinner loading-sm"></span>
                                       Enviando...
                                    </>
                                 ) : (
                                    <>
                                       <span>🎊</span>
                                       Confirmar Asistencia
                                       <span>🎊</span>
                                    </>
                                 )}
                              </button>
                           </div>
                        </form>

                        {/* Pie del formulario */}
                        <div className="text-center mt-6 pt-4 border-t border-dashed border-primary/20">
                           <p className="text-xs opacity-60">
                              Gracias por confirmar tu asistencia • Conserva
                              este boleto como recuerdo ♥
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Sombra decorativa */}
               <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl -z-10 blur-xl"></div>
            </div>
         </motion.div>
      </div>
   );
}
