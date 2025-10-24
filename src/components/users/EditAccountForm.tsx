'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Account = {
  name: string;
  balance: number;
  valuation: number;
  availableFunds: number;
};

type EditAccountFormProps = {
  userId: number;
  account: Account;
  onSave: (updatedAccount: Account) => void;
  onCancel: () => void;
};

export default function EditAccountForm({ userId, account, onSave, onCancel }: EditAccountFormProps) {
  const [form, setForm] = useState<Account>(account);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setForm(account);
  }, [account]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://services.blackrockdpto.net/api/users/${userId}/accounts/${encodeURIComponent(account.name)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          originalName: account.name
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al actualizar la cuenta');
      }

      const data = await res.json();
      onSave(data.account);
      setSuccess(true);

      setTimeout(() => {
        onCancel();
        window.location.reload(); // ✅ Recarga total del navegador
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre de la cuenta</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 bg-gray-800 text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Balance</label>
        <input
          type="number"
          name="balance"
          value={form.balance}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 bg-gray-800 text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Valoración (%)</label>
        <input
          type="number"
          name="valuation"
          value={form.valuation}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 bg-gray-800 text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Fondos disponibles</label>
        <input
          type="number"
          name="availableFunds"
          value={form.availableFunds}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 bg-gray-800 text-white"
          required
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>
          Cancelar
        </button>
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {success && <div className="text-green-500 text-sm mt-2">Cuenta actualizada con éxito ✅</div>}
    </form>
  );
}
