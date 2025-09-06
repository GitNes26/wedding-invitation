import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import env from "./constants/env";
import { formatDatetime } from "./utils/formats";
import {
   CheckCircle2Icon,
   ListCheckIcon,
   ListIcon,
   RefreshCwIcon,
} from "lucide-react";

interface invitado {
   guestCode: string;
   nombre: string;
   telefono: string;
   personas: number;
   mesa: number;
   AsistenciaEscaneada: string;
}

export default function ValidarQR() {
   const [scannedPhone, setScannedPhone] = useState("");
   const [guestData, setGuestData] = useState<any>(null);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const [cameraError, setCameraError] = useState(false);
   const [scannerActive, setScannerActive] = useState(true);
   const scannerRef = useRef<HTMLDivElement>(null);
   const [disabledButtonRefresh, setDisabledButtonRefresh] = useState(false);
   const [dataInvitados, setDataInvitados] = useState<invitado[]>([]);
   const [search, setSearch] = useState("");

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

   useEffect(() => {
      handleRefresh();
   }, []);

   const handleRefresh = async () => {
      setDisabledButtonRefresh(true);
      const res = await fetch(
         `https://script.google.com/macros/s/${env.ID_MACRO_SCRIPT}/exec?action=getConfirmCount`,
      );
      const data = await res.json();
      console.log("🚀 ~ handleRefresh ~ data:", data);
      setGuestData(data);
      setDisabledButtonRefresh(false);
   };

   const handleGetListaInvitados = async () => {
      const res = await fetch(
         `https://script.google.com/macros/s/${env.ID_MACRO_SCRIPT}/exec?action=getList`,
      );
      const data = await res.json();
      console.log("🚀 ~ handleRefresh ~ data:", data);
      const headers = data.list[0]; // primera fila
      const rows = data.list.slice(1); // resto de filas

      // transformar en clave:valor
      const formatted = rows.map((row: any[]) =>
         Object.fromEntries(row.map((val, i) => [headers[i], val])),
      );
      console.log("🚀 ~ handleGetListaInvitados ~ formatted:", formatted);

      setDataInvitados(formatted);
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
         <button
            className="btn btn-outline btn-primary btn-xl mb-2"
            onClick={() => {
               handleGetListaInvitados();
               document.getElementById("modal_invitados").showModal();
            }}>
            <ListIcon /> Mostrar lista de invitados
         </button>
         <dialog
            id="modal_invitados"
            className="modal modal-bottom sm:modal-middle">
            {/* <div className="p-4 pb-2 text-xs opacity-60 tracking-wide ">
               Lista de invitados
               <div className="modal-action">
                  <form method="dialog">
                     {/* if there is a button in form, it will close the modal *
                     <button className="btn">Close</button>
                  </form>
               </div>
            </div> */}
            <div className="modal-box p-0">
               {/* HEADER FIJO */}
               <div className="sticky top-0 z-10 bg-base-200 px-4 py-3 border-b border-base-300">
                  <div className="flex justify-between items-center">
                     <h2 className="font-semibold text-sm opacity-70">
                        Lista de invitados
                     </h2>
                     <form method="dialog">
                        <button className="btn btn-sm">Cerrar</button>
                     </form>
                  </div>
                  {/* Buscador */}
                  <div className="mt-2">
                     <input
                        type="text"
                        placeholder="Buscar por nombre o teléfono..."
                        className="input input-bordered input-md w-full"
                        // aquí va tu lógica de filtrado
                        onChange={(e) => setSearch(e.target.value)}
                     />
                  </div>
               </div>
               <div className="max-h-[90vh] overflow-y-auto">
                  <ul className="list bg-base-100 rounded-box shadow-md">
                     {dataInvitados
                        .filter((invitado) => {
                           if (!search) return true; // si está vacío, no filtra
                           return (
                              invitado.nombre
                                 .toLowerCase()
                                 .includes(search.toLowerCase()) ||
                              invitado.telefono.includes(search)
                           );
                        })
                        .map((invitado, index) => (
                           <li
                              className={`list-row ${
                                 invitado.AsistenciaEscaneada === "✔️"
                                    ? "bg-success/25"
                                    : ""
                              }`}>
                              <div className="text-4xl font-thin opacity-30 tabular-nums">
                                 {index + 1}
                              </div>
                              {/* <div>
                                 <img
                                    className="size-10 rounded-box"
                                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                                 />
                              </div> */}
                              <div className="list-col-grow">
                                 <div className="font-semibold">
                                    {invitado.nombre}
                                 </div>
                                 <div className="text-xs uppercase opacity-60">
                                    {invitado.telefono}
                                 </div>
                                 <div className="flex w-full justify-between">
                                    <div className="w-full text-center border-r-2">
                                       Invitados: <b>{invitado.personas}</b>
                                    </div>
                                    <div className="w-full text-center">
                                       Mesa: <b>{invitado.mesa}</b>
                                    </div>
                                 </div>
                              </div>
                              {!invitado.AsistenciaEscaneada && (
                                 <button className="btn btn-square btn-ghost btn-lg">
                                    <CheckCircle2Icon size={30} />
                                 </button>
                              )}
                           </li>
                        ))}
                  </ul>
               </div>
            </div>
         </dialog>

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
               <div className="flex flex-row justify-center items-center gap-6 mb-2 animate-fade-in">
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
                  <button
                     className="btn btn-lg"
                     onClick={handleRefresh}
                     disabled={disabledButtonRefresh}>
                     <RefreshCwIcon
                        size={25}
                        className={`active:animate-spin ${
                           disabledButtonRefresh ? "animate-spin" : ""
                        }`}
                     />
                  </button>
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
