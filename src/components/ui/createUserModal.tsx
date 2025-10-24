'use client';

import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  users: { id: number; username: string; email: string; role: string; password: string; balance: number; balanceNFT: number; nfts: any[] }[];
  onCreateUser: (user: { id: number; username: string; email: string; role: string; password: string; balance: number; balanceNFT: number; nfts: any[] }) => void;
}

const CreateUserModal: React.FC<Props> = ({ isOpen, onClose, users = [], onCreateUser }) => {
  const [formData, setFormData] = useState({ username: '', email: '', role: 'user', password: '', balance: 0, balanceNFT: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.name === 'balance' || e.target.name === 'balanceNFT' ? parseFloat(e.target.value) || 0 : e.target.value });
  };

  // 📌 Generar ID único
  const generateUniqueId = (): number => {
    let newId = Math.floor(Math.random() * 10000);
    if (users.length > 0) {
      while (users.some(user => user.id === newId)) {
        newId = Math.floor(Math.random() * 10000);
      }
    }
    return newId;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { id: generateUniqueId(), ...formData, nfts: [] }; // ✅ Agregar propiedad `nfts`

    console.log("Nuevo usuario a crear:", newUser); // 📌 Verificar salida en consola

    onCreateUser(newUser);
    onClose(); // 📌 Cerrar modal después de crear usuario
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Crear Nuevo Usuario</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            onChange={handleChange}
            required
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            onChange={handleChange}
            required
          />
          
          {/* 🔹 Campo para balanceNFT */}
          <input
            type="number"
            name="balanceNFT"
            placeholder="Saldo NFT"
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            onChange={handleChange}
            required
          />

          {/* 🔹 Campo para balance */}
          <input
            type="number"
            name="balance"
            placeholder="Saldo"
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-2">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;