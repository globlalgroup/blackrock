import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// ✅ Configura Resend con la nueva clave API
const resend = new Resend('re_4SRzzvTb_KL8BKevatpyJaUQap5BCjdSx');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: '❌ Mensaje requerido' });
  }

  try {
    // ⚠️ En sandbox solo puedes enviar al correo con el que registraste la cuenta Resend
    const send = await resend.emails.send({
      from: 'onboarding@resend.dev', // Modo prueba obligatorio
      to: 'blackrock.groupx@gmail.com', // cambia esto si registras un dominio
      subject: '📩 Nuevo Mensaje de Solicitud',
      html: `<div style="font-family:Arial,sans-serif;font-size:14px">
        <h2>📬 Nuevo mensaje recibido</h2>
        <p>${message}</p>
      </div>`,
    });

    console.log('✅ Correo enviado:', send);
    res.status(200).json({ message: '✅ Correo enviado con éxito' });
  } catch (error: any) {
    console.error('❌ Error enviando correo:', error?.message || error);
    res.status(500).json({
      error: `❌ Error enviando correo: ${error?.message || 'Error desconocido.'}`,
    });
  }
}

