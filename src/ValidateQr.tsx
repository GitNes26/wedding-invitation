import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import env from "./constants/env";
import { formatDatetime } from "./utils/formats";

export default function ValidarQR() {
   const [scannedPhone, setScannedPhone] = useState("");
   const [guestData, setGuestData] = useState<any>(null);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const [cameraError, setCameraError] = useState(false);
   const [scannerActive, setScannerActive] = useState(true);
   const scannerRef = useRef<HTMLDivElement>(null);

   const handleScan = async (text: string) => {
      if (text && text !== scannedPhone) {
         setScannerActive(false); // Bloquea la cámara tras escanear
         const guestCode = text;
         setScannedPhone(guestCode);
         setLoading(true);
         try {
            const res = await fetch(
               `https://script.google.com/macros/s/${env.ID_MACRO_SCRIPT}/exec?guestCode=${guestCode}&action=validateGuest`,
            );
            const data = await res.json();
            if (data.autorizado) {
               setGuestData(data);
               Swal.fire({
                  title: "Acceso permitido",
                  html: `
                     <div style="text-align:left;">
                        <p class='text-lg font-marcellus mb-2'>Invitado: <b>${
                           data.nombre
                        }</b><p/>
                        <p class='text-lg font-marcellus mb-2'>Confirmado: <b>${
                           data.confirmado ? "Sí" : "No"
                        }</b><p/>
                        <p class='text-lg font-marcellus mb-2'>Pases: <b>${
                           data.max
                        }</b><p/>
                        ${
                           data.llegada
                              ? `<p class='text-lg font-marcellus mb-2'>Hora de llegada: <b>${formatDatetime(
                                   data.llegada,
                                   true,
                                )}</b><p/>`
                              : ""
                        }
                     </div>
                  `,
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#4CAF50",
                  customClass: {
                     popup: "font-marcellus",
                     title: "font-marcellus text-green-700",
                  },
                  allowOutsideClick: false,
                  allowEscapeKey: false,
               });
            } else setError(data.msg);
         } catch (err) {
            setError("Error al consultar invitado");
         } finally {
            setLoading(false);
         }
      }
   };

   const handleCameraError = () => {
      setCameraError(true);
   };

   const handleRetry = () => {
      setCameraError(false);
      setError("");
      setGuestData(null);
      setScannedPhone("");
      setScannerActive(true);
      if (scannerRef.current) {
         scannerRef.current.innerHTML = "";
      }
      startScanner();
   };

   const startScanner = () => {
      if (scannerRef.current && scannerActive) {
         const scanner = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 15, qrbox: { width: 720, height: 720 } },
            false,
         );
         scanner.render(
            (decodedText: string) => {
               handleScan(decodedText);
            },
            (error: any) => {
               // No bloquea por error de escaneo, solo por error de cámara
            },
         );
      }
   };

   useEffect(() => {
      if (!cameraError && scannerActive && scannerRef.current) {
         scannerRef.current.innerHTML =
            '<div id="qr-reader" style="width:100%; min-height:340px;"></div>';
         startScanner();
      }
      // eslint-disable-next-line
   }, [cameraError, scannerActive]);

   return (
      <div className="p-2 text-center max-w-xl mx-auto">
         <h1 className="text-2xl font-bold mb-4">
            📷 Escanea un código QR <br />
            <small className="text-sm">
               para registrar la asistencia en la recepción.
            </small>
         </h1>

         <div className="w-full max-w-xl mx-auto bg-base-300 rounded-lg shadow-lg p-4 mb-2 relative min-h-[360px] flex items-center justify-center">
            {!cameraError ? (
               <>
                  <div ref={scannerRef} className="w-full h-full" />
                  {loading && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-300/80 z-20 rounded-lg">
                        <span className="loading loading-spinner loading-lg text-primary mb-2"></span>
                        <span className="font-marcellus text-lg text-primary font-bold animate-pulse">
                           Buscando invitado...
                        </span>
                     </div>
                  )}
               </>
            ) : (
               <div className="text-center py-8">
                  <p className="text-red-700 font-bold mb-2">
                     No se pudo acceder a la cámara.
                     <br />
                     Verifica los permisos del navegador, que el sitio esté en
                     HTTPS y que la cámara no esté siendo usada por otra app.
                  </p>
                  <button
                     className="btn btn-primary btn-sm mt-2"
                     onClick={handleRetry}>
                     Reintentar
                  </button>
               </div>
            )}
         </div>

         {/* Indicadores y mensajes debajo de la cámara */}
         <div className="w-full max-w-md mx-auto flex flex-col gap-2 mb-4">
            {guestData && (
               <div className="flex flex-row justify-center gap-6 mb-2 animate-fade-in">
                  <div className="flex flex-col items-center bg-base-200 rounded-lg px-4 py-2 shadow">
                     <span className="text-lg font-bold text-primary">
                        Invitaciones escaneadas
                     </span>
                     <span className="text-5xl font-extrabold text-primary">
                        {guestData.invitaciones ?? "-"}
                     </span>
                  </div>
                  <div className="flex flex-col items-center bg-base-200 rounded-lg px-4 py-2 shadow">
                     <span className="text-lg font-bold text-primary">
                        Pases acumulados
                     </span>
                     <span className="text-5xl font-extrabold text-primary">
                        {guestData.pases ?? "-"}
                     </span>
                  </div>
               </div>
            )}
            {error && (
               <div className="bg-gradient-to-br from-red-100 to-red-200 border border-red-400 shadow-lg rounded-xl p-4 text-red-800 animate-fade-in ">
                  <span className="text-2xl mr-2">❌</span> {error}
               </div>
            )}
         </div>
      </div>
   );
}
