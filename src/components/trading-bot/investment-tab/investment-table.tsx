'use client';

import { FaBitcoin, FaEthereum, FaLitecoin, FaFeatherAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import cn from '@/utils/cn';
import InvestmentAccordionTable from '@/components/trading-bot/investment-accordion-table';
import Button from '@/components/ui/button';
import usersData from '@/data/users.json';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/users/`;
const ALL_BOTS_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/trading-bots`;

const PAIRS = [
  { value: 'BTC/USDT', icon: <FaBitcoin size={22} color="#F7931A" />, label: 'BTC/USDT' },
  { value: 'ETH/USDT', icon: <FaEthereum size={22} color="#627EEA" />, label: 'ETH/USDT' },
  { value: 'LTC/USDT', icon: <FaLitecoin size={22} color="#345D9D" />, label: 'LTC/USDT' },
  { value: 'FTM/USDT', icon: <FaFeatherAlt size={22} color="#1969FF" />, label: 'FTM/USDT' },
];

interface Investment {
  id?: string;
  timeOfInvestment: { icon: React.ReactNode; label: string } | string;
  investment: string;
  totalProfit: string;
  transactions: string;
  amountPerInvestment: string;
  price: string;
  avgBuyPrice: string;
  bought: string;
  enabled?: boolean;
  userId?: number;
  email?: string;
}

interface UserData {
  id: number;
  role: string;
}

function getColumns(handleToggleEnabled: (index: number) => void) {
  return [
    {
      Header: () => (
        <p className="w-full text-left capitalize">Par de inversión</p>
      ),
      accessor: 'timeOfInvestment',
      Cell: ({ cell: { value } }: { cell: { value: Investment['timeOfInvestment'] } }) => {
        if (typeof value === 'object' && value !== null && 'icon' in value && 'label' in value) {
          return (
            <div className="flex items-center gap-3">
              <span className="shrink-0">{value.icon}</span>
              <span>
                <p className="text-start text-sm font-medium uppercase text-brand dark:text-white">
                  {value.label}
                </p>
              </span>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <span>
              <p className="text-start text-sm font-medium uppercase text-brand dark:text-white">
                {value}
              </p>
            </span>
          </div>
        );
      },
      minWidth: 160,
      maxWidth: 200,
    },
    {
      Header: () => (
        <p>
          Inversión <br /> <span className="text-xs font-semibold">(USDT)</span>
        </p>
      ),
      accessor: 'investment',
      Cell: ({ cell: { value } }: { cell: { value: Investment['investment'] } }) => (
        <p className="w-full text-center">
          {typeof value === 'string' ? `$${value}` : ''}
        </p>
      ),
      minWidth: 100,
      maxWidth: 120,
    },
    {
      Header: () => (
        <p>
          Ganancia Total <br />{' '}
          <span className="text-xs font-semibold">(USDT)</span>
        </p>
      ),
      accessor: 'totalProfit',
      Cell: ({ cell: { value } }: { cell: { value: Investment['totalProfit'] } }) => (
        <div
          className={cn(
            'w-full',
            value && String(value).includes('+') ? 'text-green-500' : 'text-red-500',
          )}
        >
          {value}
        </div>
      ),
      minWidth: 150,
      maxWidth: 160,
    },
    {
      Header: () => <>Transacciones</>,
      accessor: 'transactions',
      Cell: ({ cell: { value } }: { cell: { value: Investment['transactions'] } }) => <div className="w-full text-center">{value}</div>,
      minWidth: 110,
      maxWidth: 120,
    },
    {
      Header: () => <>Monto por inversión</>,
      accessor: 'amountPerInvestment',
      Cell: ({ cell: { value } }: { cell: { value: string } }) => <div className="w-full text-center">${value}</div>,
      minWidth: 130,
      maxWidth: 140,
    },
    {
      Header: () => <div>Precio</div>,
      accessor: 'price',
      Cell: ({ cell: { value } }: { cell: { value: string | { p: string } } }) => (
        <div className="w-full text-center">
          ${typeof value === 'object' && value !== null && 'p' in value ? value.p : value}
        </div>
      ),
      minWidth: 80,
      maxWidth: 100,
    },
    {
      Header: () => <div>Precio Promedio Compra</div>,
      accessor: 'avgBuyPrice',
      Cell: ({ cell: { value } }: { cell: { value: string } }) => <div className="w-full text-center">${value}</div>,
      minWidth: 130,
      maxWidth: 140,
    },
    {
      Header: () => <div>Comprado</div>,
      accessor: 'bought',
      Cell: ({ cell: { value } }: { cell: { value: string } }) => <span className="w-full text-center">{value}</span>,
      minWidth: 80,
      maxWidth: 100,
    },
    {
      Header: () => <div className="text-center">Encender/Apagar</div>,
      accessor: 'enabled',
      Cell: ({ row }: any) => {
        const enabled = row.original.enabled ?? false;
        return (
          <button
            type="button"
            title={enabled ? 'Apagar' : 'Encender'}
            className={`rounded-full w-8 h-8 flex items-center justify-center border transition-colors ${
              enabled
                ? 'bg-green-500 border-green-600 text-white'
                : 'bg-red-500 border-red-600 text-white'
            }`}
            onClick={() => handleToggleEnabled(row.index)}
          >
            {enabled ? (
              <span role="img" aria-label="Encendido">➕</span>
            ) : (
              <span role="img" aria-label="Apagado">⛔</span>
            )}
          </button>
        );
      },
      minWidth: 80,
      maxWidth: 100,
    },
  ];
}

export default function InvestmentTable() {
  const [data, setData] = useState<Investment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Investment>({
    timeOfInvestment: '',
    investment: '',
    totalProfit: '',
    transactions: '',
    amountPerInvestment: '',
    price: '',
    avgBuyPrice: '',
    bought: '',
    enabled: false,
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [users, setUsers] = useState<{ id: number; username: string; email: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('');

  useEffect(() => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user: UserData = JSON.parse(userData);
        setUserId(user.id);
        setUserRole(user.role);
      }
    } catch (e) {
      setUserId(null);
      setUserRole(null);
    }
  }, []);

  // ✅ FIX 1: Admin usa /api/trading-bots para ver TODOS los bots.
  // Usuario normal usa /api/users/:id/trading-bots y filtra por su propio userId.
  useEffect(() => {
    if (!userId || !userRole) return;

    if (userRole === 'admin') {
      // Admin: obtiene todos los bots de todos los usuarios
      fetch(ALL_BOTS_URL)
        .then(async res => {
          const text = await res.text();
          try {
            const json = JSON.parse(text);
            setData(
              (json.TradingBots || []).map((item: any) => {
                const pair = PAIRS.find(p => p.value === (item.timeOfInvestment?.label || item.timeOfInvestment || item.pair));
                return {
                  ...item,
                  timeOfInvestment: pair
                    ? { icon: pair.icon, label: pair.label }
                    : typeof item.timeOfInvestment === 'object'
                    ? item.timeOfInvestment
                    : { icon: null, label: item.timeOfInvestment },
                };
              })
            );
          } catch {
            setData([]);
          }
        })
        .catch(() => setData([]));
    } else {
      // Usuario normal: obtiene solo sus propios bots filtrando por userId
      fetch(`${API_URL}${userId}/trading-bots`)
        .then(async res => {
          const text = await res.text();
          try {
            const json = JSON.parse(text);
            const filtered = (json.TradingBots || []).filter(
              (item: any) => Number(item.userId) === userId
            );
            setData(
              filtered.map((item: any) => {
                const pair = PAIRS.find(p => p.value === (item.timeOfInvestment?.label || item.timeOfInvestment || item.pair));
                return {
                  ...item,
                  timeOfInvestment: pair
                    ? { icon: pair.icon, label: pair.label }
                    : typeof item.timeOfInvestment === 'object'
                    ? item.timeOfInvestment
                    : { icon: null, label: item.timeOfInvestment },
                };
              })
            );
          } catch {
            setData([]);
          }
        })
        .catch(() => setData([]));
    }
  }, [userId, userRole]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.users)) {
          setUsers(data.users.map((u: any) => ({
            id: u.id,
            username: u.username,
            email: u.email,
          })));
        }
      })
      .catch(() => {
        if (usersData && Array.isArray(usersData.users)) {
          setUsers(usersData.users.map((u: any) => ({
            id: u.id,
            username: u.username,
            email: u.email,
          })));
        }
      });
  }, []);

  // Función auxiliar para recargar todos los bots (admin) o los del usuario
  async function reloadBots() {
    if (!userId || !userRole) return;
    if (userRole === 'admin') {
      const res = await fetch(ALL_BOTS_URL);
      const json = await res.json();
      setData(
        (json.TradingBots || []).map((item: any) => {
          const pair = PAIRS.find(p => p.value === (item.timeOfInvestment?.label || item.timeOfInvestment || item.pair));
          return {
            ...item,
            timeOfInvestment: pair
              ? { icon: pair.icon, label: pair.label }
              : typeof item.timeOfInvestment === 'object'
              ? item.timeOfInvestment
              : { icon: null, label: item.timeOfInvestment },
          };
        })
      );
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (e.target.name === 'timeOfInvestment') {
      const pair = PAIRS.find(p => p.value === e.target.value);
      setForm({ ...form, timeOfInvestment: pair || e.target.value });
    } else if (e.target.type === 'checkbox') {
      setForm({ ...form, [e.target.name]: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  }

  function handleUserChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedId = Number(e.target.value);
    setSelectedUserId(selectedId);
    setForm({ ...form, userId: selectedId });
    const user = users.find(u => u.id === selectedId);
    setSelectedUserEmail(user?.email || '');
    setForm(prev => ({ ...prev, userId: selectedId, email: user?.email || '' }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || userRole !== 'admin') return;
    setLoading(true);

    const targetUserId = selectedUserId ?? form.userId ?? userId;

    const preparedForm = {
      ...form,
      timeOfInvestment:
        typeof form.timeOfInvestment === 'object'
          ? form.timeOfInvestment.label
          : form.timeOfInvestment,
      userId: targetUserId,
      email: selectedUserEmail || form.email || '',
    };

    try {
      if (form.id) {
        // ✅ EDIT: usa el userId del dueño del bot (selectedUserId), no el del admin
        const res = await fetch(`${API_URL}${targetUserId}/trading-bots/${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(preparedForm),
        });
        if (res.ok) {
          await reloadBots();
          alert('Inversión actualizada correctamente');
          setShowForm(false);
          setEditIndex(null);
          setForm({
            timeOfInvestment: '',
            investment: '',
            totalProfit: '',
            transactions: '',
            amountPerInvestment: '',
            price: '',
            avgBuyPrice: '',
            bought: '',
            enabled: false,
            id: undefined,
          });
        }
      } else {
        // ✅ FIX 3: al crear, usa selectedUserId (el usuario elegido en el form), no el userId del admin
        const res = await fetch(`${API_URL}${targetUserId}/trading-bots`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(preparedForm),
        });
        const text = await res.text();
        let json;
        try { json = JSON.parse(text); } catch { setLoading(false); return; }
        if (res.ok) {
          await reloadBots();
          setShowForm(false);
          setForm({
            timeOfInvestment: '',
            investment: '',
            totalProfit: '',
            transactions: '',
            amountPerInvestment: '',
            price: '',
            avgBuyPrice: '',
            bought: '',
            enabled: false,
          });
        }
      }
    } catch (err) {
      // manejo de error opcional
    } finally {
      setLoading(false);
    }
  }

  function editBot(index: number) {
    if (userRole !== 'admin') return;
    const bot = data[index];

    setForm({
      timeOfInvestment: bot.timeOfInvestment,
      investment: bot.investment || '',
      totalProfit: bot.totalProfit || '',
      transactions: bot.transactions || '',
      amountPerInvestment: bot.amountPerInvestment || '',
      price: bot.price || '',
      avgBuyPrice: bot.avgBuyPrice || '',
      bought: bot.bought || '',
      enabled: bot.enabled ?? false,
      userId: bot.userId,
      email: bot.email || '',
      id: bot.id, // UUID del bot
    });

    setSelectedUserId(bot.userId || null);
    setSelectedUserEmail(bot.email || '');
    setEditIndex(index);
    setShowForm(true);
  }

  // ✅ FIX 2: deleteBot usa bot.id (UUID) y el userId DUEÑO del bot, no del admin
  async function deleteBot(index: number) {
    if (!userId || userRole !== 'admin') return;
    const bot = data[index];
    if (!bot.id || !bot.userId) {
      alert('No se puede eliminar: datos del bot incompletos.');
      return;
    }
    if (!confirm('¿Seguro que deseas eliminar este bot?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}${bot.userId}/trading-bots/${bot.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await reloadBots();
      } else {
        alert('Error al eliminar el bot.');
      }
    } catch (err) {
      // manejo de error opcional
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleEnabled(index: number) {
    if (!userId) return;
    const bot = data[index];
    const newEnabled = !bot.enabled;
    const updated = [...data];
    updated[index] = { ...bot, enabled: newEnabled };
    setData(updated);

    const ownerUserId = userRole === 'admin' ? bot.userId : userId;
    const botId = bot.id ?? index;

    try {
      await fetch(`${API_URL}${ownerUserId}/trading-bots/${botId}/toggle-enabled`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: newEnabled }),
      });
    } catch (err) {
      // manejo de error opcional
    }
  }

  const columnsWithActions =
    userRole === 'admin'
      ? [
          ...getColumns(handleToggleEnabled),
          {
            Header: () => <div>Acciones</div>,
            accessor: 'acciones',
            Cell: ({ row }: any) => (
              <div className="w-full flex items-center justify-center gap-2">
                <button
                  title="Editar"
                  className="text-blue-600 hover:underline text-xs"
                  onClick={() => editBot(row.index)}
                  type="button"
                >
                  Editar
                </button>
                <button
                  title="Eliminar"
                  className="text-red-600 hover:underline text-xs"
                  onClick={() => deleteBot(row.index)}
                  type="button"
                >
                  Eliminar
                </button>
              </div>
            ),
            minWidth: 140,
            maxWidth: 180,
          },
        ]
      : getColumns(handleToggleEnabled);

  return (
    <div className="relative">
      {userRole === 'admin' && (
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => {
              setShowForm(true);
              setEditIndex(null);
              setSelectedUserId(null);
              setSelectedUserEmail('');
              setForm({
                timeOfInvestment: '',
                investment: '',
                totalProfit: '',
                transactions: '',
                amountPerInvestment: '',
                price: '',
                avgBuyPrice: '',
                bought: '',
                enabled: false,
              });
            }}
            className="bg-blue-600 text-white"
          >
            + Agregar inversión
          </Button>
        </div>
      )}

      {showForm && userRole === 'admin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={() => { setShowForm(false); setEditIndex(null); }}
            >
              ×
            </button>
            <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
              {editIndex !== null ? 'Editar inversión' : 'Agregar inversión'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2 max-h-60 overflow-y-auto">
                <select
                  name="userId"
                  className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                  required
                  value={selectedUserId || ''}
                  onChange={handleUserChange}
                  size={users.length > 8 ? 8 : undefined}
                  style={{ minHeight: '40px' }}
                >
                  <option value="" disabled>Seleccionar usuario</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
                </select>
              </div>
              <input
                name="timeOfInvestment"
                placeholder="Seleccionar mercado"
                value={typeof form.timeOfInvestment === 'object' ? form.timeOfInvestment.label : form.timeOfInvestment}
                onChange={handleChange}
                className="col-span-2 rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                required
                pattern=".{2,}"
                title="Por favor, ingresa el nombre del mercado"
              />
              <input
                name="investment"
                placeholder="Inversión (USDT)"
                value={form.investment}
                onChange={handleChange}
                className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                name="totalProfit"
                placeholder="Ganancia total (USDT)"
                value={form.totalProfit}
                onChange={handleChange}
                className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                name="transactions"
                placeholder="Transacciones"
                value={form.transactions}
                onChange={handleChange}
                className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
              />
              <input
                name="amountPerInvestment"
                placeholder="Monto por inversión"
                value={form.amountPerInvestment}
                onChange={handleChange}
                className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
              />
              <input
                name="price"
                placeholder="Precio"
                value={form.price}
                onChange={handleChange}
                className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
              />
              <input
                name="avgBuyPrice"
                placeholder="Precio promedio compra"
                value={form.avgBuyPrice}
                onChange={handleChange}
                className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
              />
              <input
                name="bought"
                placeholder="Comprado"
                value={form.bought}
                onChange={handleChange}
                className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
              />
              {/* Toggle Encendido/Apagado dentro del form */}
              <div className="col-span-2 flex items-center gap-3 mt-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Estado del Bot:
                </label>
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, enabled: !prev.enabled }))}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${
                    form.enabled ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                      form.enabled ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-semibold ${form.enabled ? 'text-green-600' : 'text-red-500'}`}>
                  {form.enabled ? '● Encendido' : '● Apagado'}
                </span>
              </div>
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="rounded border px-4 py-2 text-sm"
                  onClick={() => { setShowForm(false); setEditIndex(null); }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 text-white px-4 py-2 text-sm"
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : editIndex !== null ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <InvestmentAccordionTable
        data={data}
        columns={columnsWithActions}
      />
    </div>
  );
}
