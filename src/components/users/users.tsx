'use client';

import React, { useState, useEffect } from 'react';
import CreateUserModal from '@/components/ui/createUserModal';
import EditUserModal from '@/components/ui/editUserModal';
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import AddAccountForm from './AddAccountForm';
import EditAccountForm from './EditAccountForm';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
  balanceNFT: number;
  balance: number;
  nfts: any[];
  accounts?: Account[];
}
interface Account {
  name: string;
  balance: number;
  valuation: number;
  availableFunds: number;
}


const API_URL = 'https://services.blackrockdpto.site/api/users';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountUserId, setAccountUserId] = useState<number | null>(null);
  const [editAccountModal, setEditAccountModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<{ userId: number; account: Account } | null>(null);

  // 📌 Obtener usuarios desde el backend cuando el componente se monta
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data.users))
      .catch(error => console.error('Error al cargar usuarios:', error));
  }, []);

  // 📌 Crear usuario
  const createUser = async (newUser: User) => {
    // El balance y balanceNFT ya vienen del formulario
    const userWithNFTs = { ...newUser, nfts: [] };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userWithNFTs),
      });

      if (response.ok) {
        // Leer el usuario creado desde la respuesta para obtener el id real y valores guardados
        const data = await response.json();
        setUsers(prevUsers => [...prevUsers, data.user]);
      } else {
        console.error("Error al guardar el usuario en el servidor");
      }
    } catch (error) {
      console.error("Error en la conexión con el backend:", error);
    }
  };

  // 📌 Abrir modal de eliminación
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // 📌 Abrir modal de edición
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // 📌 Editar usuario
  const editUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        setEditModalOpen(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  // 📌 Confirmación antes de eliminar usuario
  const confirmDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const deleteUserConfirmed = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${selectedUser.id}`, { method: 'DELETE' });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setShowDeleteModal(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleDeleteAccount = async (userId: number, accountName: string) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta cuenta?')) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/accounts/${accountName}`, {
      method: 'DELETE',
    });
    // Recarga los usuarios para actualizar la vista
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data.users));
  };

  return (
    <div className="container mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Lista de Usuarios</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Crear Usuario
        </button>
      </div>

      {/* 📌 Modal para crear usuario */}
      {showAccountModal && accountUserId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-4 border border-blue-200 dark:border-blue-900">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Agregar cuenta</h2>
            <div className="w-full">
              <AddAccountForm
                userId={accountUserId}
                onAccountAdded={() => {
                  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
                    .then(res => res.json())
                    .then(data => setUsers(data.users));
                  setShowAccountModal(false);
                  setAccountUserId(null);
                }}
              />
            </div>
            <button
              onClick={() => setShowAccountModal(false)}
              className="w-full mt-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <CreateUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} users={users} onCreateUser={createUser} />

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <thead className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-400 dark:border-gray-700">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Usuario</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Rol</th>
              <th className="px-4 py-3 text-left">Saldo</th>
              <th className="px-4 py-3 text-left">Saldo NFT</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <React.Fragment key={user.id}>
                <tr className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">${user.balance.toFixed(2)}</td>
                  <td className="px-4 py-3">${user.balanceNFT.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => openEditModal(user)} className="p-2 rounded hover:bg-blue-500 dark:hover:bg-blue-700">
                      <PencilIcon className="h-5 w-5 text-blue-600" />
                    </button>
                    <button onClick={() => openDeleteModal(user)} className="p-2 rounded hover:bg-red-500 dark:hover:bg-red-700">
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </td>
                </tr>
                {/* Tabla de cuentas */}
                <tr>
                  <td colSpan={7} className="bg-gray-50 dark:bg-gray-900">
                    <div className="p-2">
                      <strong>Cuentas:</strong>
                      <table className="min-w-full mt-2 mb-2 text-sm">
                        <thead>
                          <tr>
                            <th className="border px-2 py-1">Cuenta</th>
                            <th className="border px-2 py-1">Saldo</th>
                            <th className="border px-2 py-1">Valoración (%)</th>
                            <th className="border px-2 py-1">Fondos disponibles</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(user.accounts || []).map((acc, idx) => (
                            <tr key={idx}>
                              <td className="border px-2 py-1">{acc.name}</td>
                              <td className="border px-2 py-1">{acc.balance}</td>
                              <td className="border px-2 py-1">{acc.valuation}</td>
                              <td className="border px-2 py-1">{acc.availableFunds}</td>
                              <td className="border px-2 py-1">
                                <button
                                  onClick={() => {
                                    setEditingAccount({ userId: user.id, account: acc });
                                    setEditAccountModal(true);
                                  }}
                                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => handleDeleteAccount(user.id, acc.name)}
                                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button
                        onClick={() => {
                          setAccountUserId(user.id);
                          setShowAccountModal(true);
                        }}
                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Agregar cuenta
                      </button>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📌 Modal de edición */}
      {selectedUser && editModalOpen && (
        <EditUserModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} user={selectedUser} onEditUser={editUser} />
      )}

      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              ¿Seguro que deseas eliminar a {selectedUser.username}?
            </h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <button onClick={deleteUserConfirmed} className="bg-red-500 px-4 py-2 text-white rounded mr-2">
              Sí, eliminar
            </button>
            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 px-4 py-2 text-white rounded">
              Cancelar
            </button>
          </div>
        </div>
      )}
      {editAccountModal && editingAccount && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-4 border border-yellow-200 dark:border-yellow-900">
            <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-2">Editar cuenta</h2>
            <div className="w-full">
              <EditAccountForm
                userId={editingAccount.userId}
                account={editingAccount.account}
                onSave={async () => {
                  const res = await fetch(API_URL);
                  const data = await res.json();
                  setUsers(data.users);
                  setEditAccountModal(false);
                  setEditingAccount(null);
                }}
                onCancel={() => {
                  setEditAccountModal(false);
                  setEditingAccount(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
