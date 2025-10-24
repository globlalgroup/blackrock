'use client';
import { useState } from 'react';
import countries from '@/data/countris'; // Archivo con la lista de países

const WithdrawalForm = () => {
  const [amount, setAmount] = useState('USDT');
  const [bank, setBank] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [iban, setIban] = useState('');
  const [bic, setBic] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [address, setAddress] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const withdrawalData = { 
      amount, bank, paymentAmount, firstName, lastName, email, country, 
      city, iban, bic, postalCode, bankName, address, bankAddress, 
      message: `Solicitud de retiro de ${amount} al banco ${bank}`
    };

    try {
      const response = await fetch('/api/sndMailCardRetiro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withdrawalData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Solicitud enviada correctamente.');
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg dark:bg-light-dark">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Retirar Fondos</h2>

      <form onSubmit={handleSubmit}>
        {/* Cantidad y Banco */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">MONEDA</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}
              placeholder="Ej: USDT" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Banco</label>
            <input type="text" value={bank} onChange={(e) => setBank(e.target.value)}
              placeholder="Ej: Banco Nacional" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"/>
          </div>
        </div>

        {/* Monto del pago */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Monto del Pago</label>
          <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="Ej: 150.00" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"/>
        </div>

        {/* Nombre y Apellido */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nombre</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ej: Juan" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Apellido</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
              placeholder="Ej: Pérez" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"/>
          </div>
        </div>

        {/* Correo electrónico */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Correo Electrónico</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Ej: correo@ejemplo.com" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"/>
        </div>

        {/* IBAN y BIC */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">IBAN - ID Wallet</label>
            <input type="text" value={iban} onChange={(e) => setIban(e.target.value)}
              placeholder="Ej: ES12345678901234567890" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">BIC - Red Wallet </label>
            <input type="text" value={bic} onChange={(e) => setBic(e.target.value)}
              placeholder="Ej: ABCDUS33XXX" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"/>
          </div>
        </div>

        {/* Botón de enviar */}
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded" disabled={loading}>
          {loading ? 'Procesando...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
};

export default WithdrawalForm;
