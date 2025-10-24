'use client';

import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface Coin {
  symbol: string;
  market_cap_rank: string;
  image: string;
  name: string;
  current_price: string;
  price_change_percentage_1h_in_currency: string;
  price_change_percentage_24h_in_currency: string;
  circulating_supply: number;
  total_volume: number;
}

export default function CoinTable() {
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coins`)
      .then(response => response.json())
      .then(data => {
        setCoinData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 📌 Abrir modal de edición
  const openEditModal = (coin: Coin) => {
    setSelectedCoin({ ...coin });
    setShowEditModal(true);
  };

  // 📌 Guardar cambios y actualizar JSON
  const saveChanges = async () => {
    if (!selectedCoin) return;

    // Formatear los valores monetarios antes de enviar
    const formattedCoin = { ...selectedCoin };
    const moneyKeys = ["circulating_supply", "total_volume"] as const;
    // current_price: solo número decimal, sin comas
    if (formattedCoin.current_price !== undefined) {
      let clean = String(formattedCoin.current_price).replace(/,/g, '');
      // Solo permitir números y un punto decimal
      clean = clean.replace(/[^\d.]/g, '');
      // Si hay más de un punto, dejar solo el primero
      const parts = clean.split('.');
      if (parts.length > 2) clean = parts[0] + '.' + parts.slice(1).join('');
      formattedCoin.current_price = clean;
    }
    // Los otros campos sí van con comas
    moneyKeys.forEach(key => {
      if (formattedCoin[key] !== undefined) {
        const clean = String(formattedCoin[key]).replace(/,/g, '');
        if (!isNaN(Number(clean))) {
          // @ts-ignore
          formattedCoin[key] = Number(clean).toLocaleString();
        }
      }
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coins/${selectedCoin.symbol}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedCoin),
      });

      if (response.ok) {
        setCoinData(coinData.map(coin => (coin.symbol === selectedCoin.symbol ? formattedCoin : coin)));
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error al actualizar la moneda:", error);
    }
  };

  
// 📌 Abrir modal de confirmación para eliminar
const openDeleteModal = (coin: Coin) => {
  setSelectedCoin(coin);
  setShowConfirmModal(true);
};


// 📌 Confirmar eliminación
const deleteCoinConfirmed = async () => {
  if (!selectedCoin) return;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coins/${selectedCoin.symbol}`, { method: 'DELETE' });

    if (response.ok) {
      setCoinData(coinData.filter(coin => coin.symbol !== selectedCoin.symbol));
      setShowConfirmModal(false);
    } else {
      console.error("Error al eliminar la moneda.");
    }
  } catch (error) {
    console.error("Error en la conexión con el backend:", error);
  }
};





  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Lista de Monedas</h2>

      <table className="min-w-full border border-gray-300 bg-white shadow-md dark:bg-gray-900 mt-4">
        <thead>
          <tr className="border-b bg-gray-200 dark:bg-gray-800">
            <th className="p-3 text-left">Símbolo</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Precio</th>
            <th className="p-3 text-left">Cambio 1h</th>
            <th className="p-3 text-left">Cambio 24h</th>
            <th className="p-3 text-left">Suministro</th>
            <th className="p-3 text-left">Volumen</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {coinData.map(coin => (
            <tr key={coin.symbol} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
              <td className="p-3">{coin.symbol}</td>
              <td className="p-3">{coin.name}</td>
              <td className="p-3">${Number(coin.current_price).toFixed(2)}</td>
              <td className="p-3">{coin.price_change_percentage_1h_in_currency}%</td>
              <td className="p-3">{coin.price_change_percentage_24h_in_currency}%</td>
              <td className="p-3">{coin.circulating_supply.toLocaleString()}</td>
              <td className="p-3">{coin.total_volume.toLocaleString()}</td>
              
              <td className="p-3 flex gap-2">

                <button onClick={() => openEditModal(coin)} className="bg-green-500 text-white px-2 py-1 flex items-center gap-1">
                                     <FaEdit />
                                  </button>
                <button onClick={() => openDeleteModal(coin)} className="bg-red-500 text-white px-2 py-1 flex items-center gap-1">
                                     <FaTrash />
                                  </button>

             

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📌 Modal de edición */}
      {showEditModal && selectedCoin && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center p-4">
          <div className="bg-gray-900 p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Editar {selectedCoin.name}</h2>

            {/* 🔹 Inputs de edición para cada campo */}
            {Object.keys(selectedCoin).map(key => (
              key !== "symbol" &&
              key !== "image" && (
                <div key={key} className="mb-2">
                  <label className="block text-sm font-medium">{key.replace(/_/g, ' ')}</label>
                  <input
                    type="text"
                    name={key}
                    value={
                      ["current_price", "circulating_supply", "total_volume"].includes(key)
                        ? Number((selectedCoin as any)[key]).toLocaleString()
                        : (selectedCoin as any)[key]
                    }
                    onChange={e => {
                      let value = e.target.value;
                      // Remover comas para guardar el valor limpio
                      if (["current_price", "circulating_supply", "total_volume"].includes(key)) {
                        value = value.replace(/,/g, '');
                        if (!isNaN(Number(value))) {
                          setSelectedCoin({ ...selectedCoin, [key]: value });
                        }
                      } else {
                        setSelectedCoin({ ...selectedCoin, [key]: value });
                      }
                    }}
                    className="w-full p-2 bg-gray-700 text-white rounded"
                  />
                </div>
              )
            ))}

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={saveChanges} className="bg-blue-500 px-4 py-2 text-white rounded">
                Guardar
              </button>
              <button onClick={() => setShowEditModal(false)} className="bg-gray-500 px-4 py-2 text-white rounded">
                Cancelar
              </button>
            </div>
          </div>
        </div>

        
      )}
      {showConfirmModal && selectedCoin && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center p-4">
    <div className="bg-gray-900 p-6 rounded shadow-lg w-96 text-center">
      <h2 className="text-lg font-semibold mb-4">¿Seguro que deseas eliminar {selectedCoin.name}?</h2>
      <p className="mb-4">Esta acción no se puede deshacer.</p>
      <button onClick={deleteCoinConfirmed} className="bg-red-500 px-4 py-2 text-white rounded mr-2">
        Sí, eliminar
      </button>
      <button onClick={() => setShowConfirmModal(false)} className="bg-gray-500 px-4 py-2 text-white rounded">
        Cancelar
      </button>
    </div>
  </div>
)}
    </div>
    
  );
}