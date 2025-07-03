"use client";

import { useState, useRef, useEffect } from "react";
import {
   motion,
   AnimatePresence,
   useScroll,
   useTransform,
} from "framer-motion";
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
import PhotosThrown from "./components/PhotosThrown";
import images from "./constants/images";
import { useDynamicFavicon } from "./hooks/useDynamicFavicon";

export default function App() {
   //#region SCROLL DENSO
   // const containerRef = useRef(null);
   // // 1. Obtenemos el progreso del scroll (0 a 1)
   // const { scrollYProgress } = useScroll({
   //    container: containerRef, // Contenedor personalizado
   // });

   // // 2. Aplicamos una transformación no lineal para hacerlo más lento
   // const denseScroll = useTransform(
   //    scrollYProgress,
   //    [0, 1], // Rango de entrada
   //    [0, 1], // Rango de salida
   //    { clamp: false }, // Permite valores fuera del rango
   // );

   // // 3. Mapeamos a un desplazamiento "más lento"
   // const y = useTransform(denseScroll, [0, 1], ["0%", "-50%"]);

   //OPCION 2
   // const containerRef = useRef(null);
   // const contentRef = useRef(null);

   // useEffect(() => {
   //    const container = containerRef.current;
   //    const content = contentRef.current;

   //    const handleScroll = () => {
   //       console.log("🚀 ~ handleScroll ~ handleScroll:");
   //       const scrollY = container.scrollTop;
   //       // Ajusta la velocidad (0.5 = 50% más lento)
   //       content.style.transform = `translateY(${scrollY * 0.5}px)`;
   //    };

   //    container?.addEventListener("scroll", handleScroll);
   //    return () => container?.removeEventListener("scroll", handleScroll);
   // }, []);
   //#endregion SCROLL DENSO

   // const { theme, setTheme } = useTheme();
   const { themeActive } = useGlobalContext();
   useDynamicFavicon();

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
      {
         site: "Cimaco",
         link: "https://www.cimaco.com.mx/mesa-regalo/45392",
         image: images.cimaco,
         color: "white",
         type: "link",
      },
      // {
      //    site: "Mercado Libre",
      //    link: "https://meli.uniko.co/Home",
      //    image: "",
      //    color: "yellow-500",
      //    type: "link",
      // },
      {
         type: "transferencia",
         bankData: {
            banco: "BBVA",
            nombre: "Néstor Josue Puentes Inchaurregui",
            numeroTarjeta: "4152 3139 8353 6074",
            clabe: "012 078 02895772494 9",
            concepto: "Regalo boda de [Tu Nombre]",
            linkCobro: null, //"https://bbva.mx/tu-link-de-cobro",
         },
      },
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

   const photos = [
      {
         src: images.memory1,
         alt: "Nuestra primera cita",
      },
      { src: images.memory2, alt: "Día en la playa" },
      { src: images.memory3, alt: "Cena romántica" },
      { src: images.memory4, alt: "Viaje a París" },
      {
         src: images.memory5,
         alt: "Cumpleaños juntos",
      },
      {
         src: images.memory6,
         alt: "Navidad en familia",
      },
      { src: images.memory7, alt: "Día de lluvia" },
      {
         src: images.memory8,
         alt: "Atardecer perfecto",
      },
      {
         src: images.memory9,
         alt: "Picnic en el parque",
      },
      {
         src: images.memory10,
         alt: "Concierto favorito",
      },
      {
         src: images.memory11,
         alt: "Picnic en el parque",
      },
      {
         src: images.memory12,
         alt: "Concierto favorito",
      },
      { src: images.memory13, alt: "Viaje a París" },
      {
         src: images.memory14,
         alt: "Cumpleaños juntos",
      },
      // Puedes añadir tantas como quieras...
   ];
   // Textos personalizados
   const customTexts = [
      {
         text: `🎵Y así te fui queriendo a diario Sin una ley sin un horario🎶`,
         position: { x: 40, y: 37 },
         delay: 0.1,
      },
      {
         text: "Cada foto cuenta nuestra historia",
         position: { x: 80, y: 25 },
         delay: 0.2,
      },
      {
         text: "Momentos que atesoramos para siempre",
         position: { x: 20, y: 58 },
         delay: 0.3,
      },
      {
         text: "Cada foto es un latido de nuestro corazón",
         position: { x: 4, y: 20 },
         delay: 0.4,
      },
      {
         text: "Momentos que se vuelven eternos",
         position: { x: 20, y: 90 },
         delay: 0.5,
      },
      {
         text: "Nuestra historia de amor en imágenes",
         position: { x: 70, y: 85 },
         delay: 0.6,
      },
      {
         text: "Las memorias nos vuelven a enamorar",
         position: { x: 6, y: 70 },
         delay: 0.7,
      },
   ];

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
                  // style={{ y }}
                  className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 transition-colors duration-500 max-w-[100vw] relative">
                  {/* <!-- Elementos decorativos laterales --> */}
                  {/* <div className="decorative-element top-left"></div>
                  <div className="decorative-element top-right"></div>
                  <div className="decorative-element middle-left"></div>
                  <div className="decorative-element middle-right"></div>
                  <div className="decorative-element bottom-left"></div>
                  <div className="decorative-element bottom-right"></div> */}

                  {/* Botones flotantes */}
                  <div className="fixed top-4 right-6 z-50 flex gap-2">
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
                  {/* <section className="py-20 px-6 relative">
                     <LoveHistory />
                  </section> */}

                  {/* Sección de Fotografias */}
                  {/* <section className="py-10 px-6 relative bg-base-100"> */}
                  {/* <secction className={`min-h-screen absolute`}> */}
                  <PhotosThrown
                     photos={photos}
                     title="Aventando Nuestros Recuerdos"
                     subtitle={`${photos.length} momentos especiales volando hacia la mesa`}
                     // sectionHeight="auto" // Se calcula automáticamente basado en número de fotos
                     sectionHeight="2000vh"
                     animationSpeed={0.05} // Más rápido para muchas fotos
                     photoSizes={{
                        minWidth: 100,
                        maxWidth: 180,
                        minHeight: 100,
                        maxHeight: 200,
                     }}
                     floatingTexts={customTexts}
                     finalMessage={{
                        title: "♥ Recuerdos que avivan nuestro amor",
                        description: `cada memoria un tesoro de nuestra historia juntos.`,
                     }}
                     backgroundImage={images.bgTableLove}
                  />
                  {/* </secction> */}

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

                  {/* Sección de Consideraciones */}
                  <section className="py-20 px-6 bg-base-100 relative">
                     <Considerations />
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

                  {/* Botón para volver arriba */}
                  {/* <ScrollToTopButton /> */}
               </motion.header>
            </>
         )}
      </>
   );
}
