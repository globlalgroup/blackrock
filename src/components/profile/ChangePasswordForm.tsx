import { useState } from 'react';

interface Props {
  currentUserId: number;
}

export function ChangePasswordForm({ currentUserId }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword]       = useState('');
  const [error, setError]                   = useState<string | null>(null);
  const [success, setSuccess]               = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!currentPassword.trim()) {
      setError('Debes ingresar tu contraseña actual');
      return;
    }

    const res = await fetch(`https://blackrockdpto.net/api/users/${currentUserId}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    if (res.ok) {
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
    } else {
      const { error: msg } = await res.json();
      if (res.status === 401) {
        setError('La contraseña actual no coincide');
      } else {
        setError(msg || 'Error al cambiar la contraseña');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      {error && (
        <div className="mb-4 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-sm text-green-600">
          ¡Contraseña actualizada con éxito!
        </div>
      )}

      <div className="mb-3">
        <label className="block mb-1">Contraseña actual</label>
        <input
          type="password"
          required
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Ingresa tu contraseña actual"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Nueva contraseña</label>
        <input
          type="password"
          minLength={6}
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Ingresa tu nueva contraseña"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Cambiar contraseña
      </button>
    </form>
  );
}
