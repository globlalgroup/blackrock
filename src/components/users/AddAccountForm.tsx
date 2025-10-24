import React, { useState } from 'react';

interface Props {
  userId: number;
  onAccountAdded: () => void;
}

export default function AddAccountForm({ userId, onAccountAdded }: Props) {
  const [form, setForm] = useState({ name: '', balance: '', valuation: '', availableFunds: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        balance: Number(form.balance),
        valuation: Number(form.valuation),
        availableFunds: Number(form.availableFunds)
      })
    });
    setForm({ name: '', balance: '', valuation: '', availableFunds: '' });
    onAccountAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Cuenta" className="border px-2 py-2 rounded bg-gray-800 text-white" required />
      <input name="balance" value={form.balance} onChange={handleChange} placeholder="Saldo" type="number" className="border px-2 py-2 rounded bg-gray-800 text-white" required />
      <input name="valuation" value={form.valuation} onChange={handleChange} placeholder="Valoración (%)" type="number" className="border px-2 py-2 rounded bg-gray-800 text-white" required />
      <input name="availableFunds" value={form.availableFunds} onChange={handleChange} placeholder="Fondos disponibles" type="number" className="border px-2 py-2 rounded bg-gray-800 text-white" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Agregar</button>
    </form>
  );
}