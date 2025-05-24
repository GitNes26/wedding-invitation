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
import QRCode from "qrcode.react";

// Estilos para el PDF
const styles = StyleSheet.create({
   page: {
      backgroundColor: "#fff0f5",
      padding: 30,
   },
   section: {
      margin: 10,
      padding: 10,
   },
   title: {
      fontSize: 24,
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
});

export const generateQRValue = (guestPhone: string) => {
   return `https://tusitio.com/verificar-asistencia/${guestPhone}`;
};

export const generatePDFInvitation = (formData: { phone: string; name: string; },weddingInfo:{date:string,time:string,place:string,location:string}
   
) => { 
   const qrValue = generateQRValue(formData.phone); // o cualquier identificador único

  const pdfDocument = (
    <InvitationPDF
      name={formData.name}
      eventDate="24 de junio de 2025"
      eventLocation="Salón de Eventos Elegancia, Torreón, Coahuila"
      qrValue={qrValue}
    />
  );

  // Descargar el PDF
  const blob = await pdf(<InvitationPDF ...props />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Invitacion_${formData.name}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
 }

// Componente del documento PDF
const InvitationPDF = ({ name, eventDate, eventLocation, qrValue }) => (
   <Document>
      <Page size="A5" style={styles.page}>
         <View style={styles.section}>
            <Text style={styles.title}>Invitación a Nuestra Boda</Text>
            <Text style={styles.text}>Estimado/a {name},</Text>
            <Text style={styles.text}>
               Nos complace invitarte a nuestra boda.
            </Text>
            <Text style={styles.text}>Fecha: {eventDate}</Text>
            <Text style={styles.text}>Lugar: {eventLocation}</Text>
            <Text style={styles.text}>
               Por favor, presenta este código QR al ingresar:
            </Text>
            <View style={styles.qrContainer}>
               <QRCode value={qrValue} size={128} />
            </View>
         </View>
      </Page>
   </Document>
);

export default InvitationPDF;
