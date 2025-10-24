import React, { useState } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
  balanceNFT: number;
  balance: number;
  nfts: any[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onEditUser: (user: User) => void;
}

const EditUserModal: React.FC<Props> = ({ isOpen, onClose, user, onEditUser }) => {
  const [formData, setFormData] = useState({ ...user });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === "balance" || e.target.name === "balanceNFT" ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true); // 📌 Muestra la confirmación antes de guardar
  };

  const confirmSaveChanges = () => {
    onEditUser(formData);
    setShowConfirmModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Editar Usuario</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            required
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
          </select>

          {/* 🔹 Input para Balance */}
          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            placeholder="Saldo"
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            required
          />

          {/* 🔹 Input para BalanceNFT */}
          <input
            type="number"
            name="balanceNFT"
            value={formData.balanceNFT}
            onChange={handleChange}
            placeholder="Saldo NFT"
            className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-gray-100"
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>

      {/* 🔹 Modal de confirmación antes de guardar */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-900 p-6 rounded shadow-lg text-center w-96">
            <h2 className="text-lg font-semibold text-white mb-4">¿Seguro que deseas guardar los cambios?</h2>
            <p className="text-gray-300 mb-4">Los datos de {formData.username} se actualizarán.</p>
            <button onClick={confirmSaveChanges} className="bg-green-500 px-4 py-2 text-white rounded mr-2">
              Sí, guardar cambios
            </button>
            <button onClick={() => setShowConfirmModal(false)} className="bg-red-500 px-4 py-2 text-white rounded">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserModal;