"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "./components/AudioPlayer";
import ThemeChanger from "./components/ThemeChanger";
import CountdownTimer from "./components/CountdownTimer";
import TimelineBoda from "./components/TimelineBoda";
import RsvpForm from "./components/RsvpForm";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Divider from "./components/Divider";
import { useMobile } from "./hooks/useMobile";
import audios from "./constants/audios";
import { detectOS, formatDatetime, getLinkWhatsApp } from "./utils/formats";
import LoveHistory from "./components/LoveHistory";
import DressCode from "./components/DressCode";
import GiftTable from "./components/GiftTable";
import DetailsEvent from "./components/DetailsEvent";
import InvitationCard from "./components/InvitationCard";
import Considerations from "./components/Considerations";
import { useGlobalContext } from "./contexts/GlobalContext";
import SplashLoader from "./components/SplashLoader";
import env from "./constants/env";
import Loading from "./components/Loading";

export default function App() {
   // const { theme, setTheme } = useTheme();
   const { themeActive } = useGlobalContext();

   const [showRsvp, setShowRsvp] = useState(false);
   const isMobile = useMobile();
   const [isScrolled, setIsScrolled] = useState(false);
   const mainRef = useRef(null);
   const rsvpRef = useRef(null);

   useEffect(() => {
      setIsLoading(false);
      // console.log(`🚀 ~ App ~ themeActive:`, themeActive);
   }, [themeActive]);

   useEffect(() => {
      const handleScroll = () => {
         const scrollPosition = window.scrollY;
         setIsScrolled(scrollPosition > 500); // Ajusta este valor según necesites
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   // Variables
   const weddingDate = new Date("2025-10-03T20:00:00");
   const weddingPlace = "Hacienda Elegancia";
   const location = "Torreón, Coahuila";
   const girlfriend = "Daniela",
      boyfriend = "Néstor";

   const formattedDate = formatDatetime(
      weddingDate,
      true,
      "dddd DD [de] MMMM [de] YYYY",
   );

   const formattedTime = formatDatetime(weddingDate, false, "HH:mm");

   // Crear enlace para Google Calendar
   const calendarUrl = `https://calendar.google.com/calendar/`; // ["MacOS", "iOS"].includes(detectOS()) ? `webcal://pXX-caldav.icloud.com/`:
   const googleCalendarUrl = `${calendarUrl}render?action=TEMPLATE&text=Boda+de+${girlfriend}+y+${boyfriend}&dates=${weddingDate
      .toISOString()
      .replace(/-|:|\.\d+/g, "")
      .slice(0, 15)}00Z/${weddingDate
      .toISOString()
      .replace(/-|:|\.\d+/g, "")
      .slice(
         0,
         15,
      )}00Z&details=¡Estamos+emocionados+de+celebrar+nuestro+día+especial+contigo!&location=${weddingPlace.replace(
      " ",
      "+",
   )},+${location.replace(" ", "+")}&sf=true&output=xml`;

   // Crear enlace para Google Maps
   const googleMapsUrl = "https://maps.app.goo.gl/oX2AEVkygjnscaXo9"; //["MacOS", "iOS"].includes(detectOS()) ? `http://maps.apple.com/?q=${weddingPlace},${location}` :

   // Crear enlace para mesa de regalos
   const giftRegistryUrls = [
      { site: "Cimaco", link: "https://www.cimaco.com.mx/mesa-regalo" },
      { site: "Mercado Libre", link: "https://meli.uniko.co/Home" },
   ];

   const weddingInfo = {
      bride: girlfriend,
      groom: boyfriend,
      date: formattedDate,
      time: formattedTime,
      theDate: weddingDate,
      fullDate: formatDatetime,
      place: weddingPlace,
      location: location,
      calendarUrl: googleCalendarUrl,
      mapsUrl: googleMapsUrl,
      giftTable: giftRegistryUrls,
   };

   const handleClickConfirm = () => {
      setShowRsvp(true);
      setTimeout(() => {
         rsvpRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
   };
   const [showSplash, setShowSplash] = useState(true);
   const [isPlaying, setIsPlaying] = useState(false);
   const { isLoading, setIsLoading } = useGlobalContext();

   // dark:from-slate-900 dark:to-slate-800
   return (
      <>
         <SplashLoader
            weddingInfo={weddingInfo}
            show={showSplash}
            setShow={setShowSplash}
            setIsPlaying={setIsPlaying}
         />

         {!showSplash && (
            <>
               <Loading open={isLoading} animation="bounce" />
               <motion.header
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  // exit={{ translateY: -100, scale: 0, opacity: 0 }}>
                  ref={mainRef}
                  className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 transition-colors duration-500 relative overflow-hidden">
                  {/* <!-- Elementos decorativos laterales --> */}
                  {/* <div className="decorative-element top-left"></div>
         <div className="decorative-element top-right"></div>
         <div className="decorative-element middle-left"></div>
         <div className="decorative-element middle-right"></div>
         <div className="decorative-element bottom-left"></div>
         <div className="decorative-element bottom-right"></div> */}

                  {/* Botones flotantes */}
                  <div className="fixed top-4 right-4 z-50 flex gap-2">
                     <AudioPlayer
                        audios={[audios.bailando, audios.todoVaAEstarBien]}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                     />
                     <ThemeChanger />
                  </div>

                  {/* Contador sticky */}
                  <AnimatePresence>
                     {isScrolled && (
                        <motion.div
                           initial={{ opacity: 0, scale: 0.8, x: -100 }}
                           animate={{ opacity: 1, scale: 1, x: 0 }}
                           exit={{ opacity: 0, scale: 0.8, x: -100 }}
                           className="fixed top-4 left-4 z-50">
                           <CountdownTimer
                              targetDate={weddingDate}
                              isSticky={true}
                           />
                        </motion.div>
                     )}
                  </AnimatePresence>

                  {/* Encabezado */}
                  <InvitationCard
                     bride={girlfriend}
                     groom={boyfriend}
                     weddingDate={formattedDate}
                     weddingTime={formattedTime}
                     weddingPlace={weddingPlace}
                     location={location}
                     option={1}
                     onConfirmClick={handleClickConfirm}
                  />

                  {/* Sección de cuenta regresiva */}
                  <section className="py-10 px-6 relative bg-base-100">
                     <div className="max-w-4xl mx-auto">
                        <motion.div
                           initial={{ opacity: 0, y: 50 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.8 }}
                           viewport={{
                              once: false,
                              margin: isMobile ? "0px" : "-25% 0px",
                           }}>
                           <CountdownTimer targetDate={weddingDate} />
                        </motion.div>
                     </div>
                  </section>

                  {/* Sección de historia */}
                  <section className="py-20 px-6 relative">
                     <LoveHistory />
                  </section>

                  {/* Sección de Linea de tiempo */}
                  <section className="py-20 px-6 bg-base-100 relative">
                     <TimelineBoda weddingInfo={weddingInfo} />
                  </section>

                  {/* Sección de detalles */}
                  <section className="py-20 px-6 relative">
                     <DetailsEvent
                        formattedDate={formattedDate}
                        formattedTime={formattedTime}
                        googleCalendarUrl={googleCalendarUrl}
                        weddingPlace={weddingPlace}
                        weddingDate={weddingDate}
                        location={location}
                        googleMapsUrl={googleMapsUrl}
                     />
                  </section>

                  {/* Sección de mesa de regalos */}
                  <section className="py-20 px-6  bg-base-100 relative">
                     <GiftTable giftRegistryUrls={giftRegistryUrls} />
                  </section>

                  {/* Sección de Código de Vestimenta */}
                  <section className="py-20 px-6 relative">
                     <DressCode />
                  </section>

                  {/* Sección de mesa de reglamento */}
                  <section className="py-20 px-6 bg-base-100 relative">
                     <Considerations giftRegistryUrls={giftRegistryUrls} />
                  </section>

                  {/* Sección de RSVP */}
                  <section className="py-20 px-6 relative" ref={rsvpRef}>
                     <RsvpForm weddingInfo={weddingInfo} />
                  </section>

                  {/* Footer */}
                  <footer className="py-2 px-6 text-center font-marcellus bg-base-100">
                     <p className="">Con amor,</p>
                     <h2 className="font-dashing text-2xl mb-4 text-primary">
                        {girlfriend} & {boyfriend}
                     </h2>
                     <p className="text-sm font-marcellus">
                        &copy; {new Date().getFullYear()} | Diseñado con ♥{" "}
                        <span
                           className="link hover:animate-pulse"
                           onClick={() =>
                              window.open(
                                 getLinkWhatsApp(
                                    "8715265468",
                                    "Hola, vi tu invitación dígital y quisiera saber más información",
                                 ),
                                 "_blank",
                              )
                           }>
                           WhatsApp
                        </span>{" "}
                        | {env.VERSION}
                     </p>
                  </footer>

                  {/* Modal de RSVP para móviles */}
                  {/* {isMobile && showRsvp && (
            <div className="fixed inset-0 bg-base-100 z-50 flex items-center justify-center p-4">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-base-100 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-serif text-xl text-rose-800 dark:text-rose-300">
                        Confirma tu Asistencia
                     </h3>
                     <button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowRsvp(false)}
                        className="text-base-content">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round">
                           <path d="M18 6 6 18" />
                           <path d="m6 6 12 12" />
                        </svg>
                     </button>
                  </div>
                  <RsvpForm onComplete={() => setShowRsvp(false)} />
               </motion.div>
            </div>
         )} */}

                  {/* Botón para volver arriba */}
                  <ScrollToTopButton />
               </motion.header>
            </>
         )}
      </>
   );
}
