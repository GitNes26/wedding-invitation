import { useState } from "react";
import { QrReader } from "react-qr-reader";
import env from "./constants/env";

export default function ValidarQR() {
   const [scannedPhone, setScannedPhone] = useState("");
   const [guestData, setGuestData] = useState(null);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleScan = async (result: string | null) => {
      if (result && result !== scannedPhone) {
         const phone = result.split("telefono=")[1];
         setScannedPhone(phone);
         setLoading(true);

         try {
            const res = await fetch(
               `https://script.google.com/macros/s/${env.ID_MACRO_SCRIPT}/exec?telefono=${phone}&action=validateGuest`,
            );
            const data = await res.json();

            if (data.autorizado) setGuestData(data);
            else setError("Invitado no encontrado o no confirmado.");
         } catch (err) {
            setError("Error al consultar invitado");
         } finally {
            setLoading(false);
         }
      }
   };

   return (
      <div className="p-6 text-center max-w-xl mx-auto">
         <h1 className="text-2xl font-bold mb-4">📷 Escanea un código QR</h1>

         <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-4 mb-6">
            <QrReader
               constraints={{ facingMode: "environment" }}
               onResult={(result) => handleScan(result?.getText() || null)}
               containerStyle={{ width: "100%" }}
            />
         </div>

         {loading && <p>Cargando datos...</p>}

         {guestData && (
            <div className="bg-green-100 text-green-700 rounded-lg p-4">
               <h2 className="text-xl font-bold">✅ Acceso permitido</h2>
               <p>
                  Invitado: <strong>{guestData.nombre}</strong>
               </p>
               <p>Confirmado: {guestData.confirmado ? "Sí" : "No"}</p>
               <p>Acompañantes: {guestData.max}</p>
            </div>
         )}

         {error && (
            <div className="bg-red-100 text-red-700 rounded-lg p-4 mt-4">
               ❌ {error}
            </div>
         )}
      </div>
   );
}
