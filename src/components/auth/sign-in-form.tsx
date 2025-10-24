'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import { getMenuItemsByRole } from '@/layouts/sidebar/_menu-items';
import { JSX } from 'react/jsx-runtime';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<
    { name: string; icon: JSX.Element; href: string; dropdownItems?: { name: string; icon: JSX.Element; href: string; }[]; }[]
  >([]);

  useEffect(() => {
    // Recuperar el rol guardado en localStorage
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
      setMenuItems(getMenuItemsByRole(storedRole));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const signInData = { email, password };

    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Inicio de sesión exitoso!');
        console.log('Usuario autenticado:', data.user);

        // Guardar el rol y el id en localStorage y actualizar el estado
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('userId', String(data.user.id));

        setRole(data.user.role);
        setMenuItems(getMenuItemsByRole(data.user.role));
         // Redirigir al perfil
        window.location.href = '/account';


        // Aquí puedes redireccionar o guardar la sesión según lo necesites
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-[408px] grid-cols-1 gap-4 px-4"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tuemail@ejemplo.com"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2 text-white transition-all hover:bg-blue-700"
        >
          {loading ? 'Procesando...' : 'Iniciar Sesión'}
        </button>
      </form>

    </div>
  );
};

export default SignInForm;