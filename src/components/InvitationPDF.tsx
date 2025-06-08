// components/InvitationPDF.tsx
import React from "react";
import {
   Document,
   Page,
   Text,
   View,
   StyleSheet,
   Font,
   pdf,
} from "@react-pdf/renderer";
import QRCode from "react-qr-code";
import { formatDatetime } from "../utils/formats";

// Estilos para el PDF
const styles = StyleSheet.create({
   page: {
      backgroundColor: "#fff0f5", //fffafc fontFamily: 'Helvetica'
      padding: 30,
   },
   section: {
      margin: 10,
      padding: 10,
   },
   title: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: "center",
      color: "#e11d48",
   },
   text: {
      fontSize: 14,
      margin: 5,
   },
   qrContainer: {
      alignItems: "center",
      marginTop: 20,
   },
   qr: { width: 150, height: 150, marginTop: 20, alignSelf: "center" },
});

export const generateQRValue = (guestPhone: string) => {
   return `https://tusitio.com/verificar-asistencia/${guestPhone}`;
};

export const generatePDFInvitation = (
   formData: { phone: string; name: string },
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
   },
) => {
   const qrUrl = generateQRValue(formData.phone); // o cualquier identificador único

   const pdfDocument = (
      <InvitationPDF
         name={formData.name}
         weddingInfo={weddingInfo}
         qrUrl={qrUrl}
      />
   );

   // Descargar el PDF
   pdf(
      <InvitationPDF
         name={formData.name}
         weddingInfo={weddingInfo}
         qrUrl={qrUrl}
      />,
   )
      .toBlob()
      .then((blob) => {
         const url = URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.download = `Invitacion_${formData.name}.pdf`;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      });
};

// Componente del documento PDF
const InvitationPDF = ({ name, weddingInfo, qrUrl }) => (
   <Document>
      <Page size="A5" style={styles.page}>
         <View style={styles.section}>
            <Text style={styles.title}>Invitación a Nuestra Boda</Text>
            <Text style={styles.text}>!hola {name}!,</Text>
            <Text style={styles.text}>
               Nos complace invitarte a nuestra boda.
            </Text>
            <Text style={styles.text}>
               Este es tu boleto de acceso para nuestra boda. Por favor,
               preséntalo el día del evento.
            </Text>
            <Text style={styles.text}></Text>

            <Text style={styles.text}>
               Fecha: {`${weddingInfo.date} ${weddingInfo.time} hrs`}
            </Text>
            <Text style={styles.text}>
               Lugar: {`${weddingInfo.place}, ${weddingInfo.location}`}
            </Text>
            <Text style={styles.text}>
               Por favor, presenta este código QR al ingresar:
            </Text>
            <View style={styles.qrContainer}>
               <QRCode value={qrUrl} size={128} height={50} width={50} />
            </View>
            <Text style={[styles.text, { marginTop: 12 }]}>
               Tus anfitrionas escanearán este código para validar tu
               asistencia.
            </Text>
         </View>
      </Page>
   </Document>
);

export default InvitationPDF;

// // components/InvitationPDF.tsx
// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import QRCode from 'react-qr-code';

// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: '#fff',
//     padding: 40,
//     fontFamily: 'Helvetica',
//   },
//   container: {
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 8,
//     color: '#d6336c', // un rosa elegante
//     textAlign: 'center',
//   },
//   bodyText: {
//     fontSize: 14,
//     marginVertical: 4,
//     textAlign: 'center',
//   },
//   qrContainer: {
//     marginTop: 20,
//     padding: 10,
//     border: '1px solid #ccc',
//   },
// });

// interface InvitationPDFProps {
//   name: string;
//   qrUrl: string;
// }

// const InvitationPDF: React.FC<InvitationPDFProps> = ({ name, qrUrl }) => (
//   <Document>
//     <Page size="A5" style={styles.page}>
//       <View style={styles.container}>
//         <Text style={styles.header}>¡Hola {name}!</Text>
//         <Text style={styles.bodyText}>
//           Este es tu boleto de acceso para nuestra boda. Por favor, preséntalo el día del evento.
//         </Text>
//         <Text style={styles.bodyText}></Text>
//         <View style={styles.qrContainer}>
//           <QRCode value={qrUrl} size={150} />
//         </View>
//         <Text style={[styles.bodyText, { marginTop: 12 }]}>
//           Tus anfitrionas escanearán este código para validar tu asistencia.
//         </Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default InvitationPDF;
