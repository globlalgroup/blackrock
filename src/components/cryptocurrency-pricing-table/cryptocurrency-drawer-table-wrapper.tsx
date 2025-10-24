'use client';

import React, { useEffect, useState } from 'react';
import CryptocurrencyDrawerTable from './cryptocurrency-drawer-table';

const columns = [
  { Header: <div className="text-center w-full">Nombre</div>, accessor: 'name', Cell: ({ value }: any) => <div className="w-full text-center">{value}</div> },
  { Header: <div className="text-center w-full">Símbolo</div>, accessor: 'symbol', Cell: ({ value }: any) => <div className="w-full text-center">{value}</div> },
  { Header: <div className="text-center w-full">Ranking</div>, accessor: 'market_cap_rank', Cell: ({ value }: any) => <div className="w-full text-center">{value}</div> },
  { Header: <div className="text-center w-full">Precio</div>, accessor: 'current_price', Cell: ({ value }: any) => <div className="w-full text-center">${Number(value).toLocaleString()}</div> },
  {
    Header: <div className="text-center w-full">Cambio 1h</div>,
    accessor: 'price_change_percentage_1h_in_currency',
    Cell: ({ value }: any) => (
      <div className={`w-full text-center font-semibold ${String(value).includes('-') ? 'text-red-600' : 'text-green-600'}`}>
        {String(value).includes('-') ? '' : '+'}{value}%
      </div>
    ),
  },
  {
    Header: <div className="text-center w-full">Cambio 24h</div>,
    accessor: 'price_change_percentage_24h_in_currency',
    Cell: ({ value }: any) => (
      <div className={`w-full text-center font-semibold ${String(value).includes('-') ? 'text-red-600' : 'text-green-600'}`}>
        {String(value).includes('-') ? '' : '+'}{value}%
      </div>
    ),
  },
  { Header: <div className="text-center w-full">Suministro</div>, accessor: 'circulating_supply', Cell: ({ value }: any) => <div className="w-full text-center">{value?.toLocaleString()}</div> },
  { Header: <div className="text-center w-full">Volumen</div>, accessor: 'total_volume', Cell: ({ value }: any) => <div className="w-full text-center">{value?.toLocaleString()}</div> },
];

export default function CryptocurrencyDrawerTableWrapper() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coins`)
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo obtener los datos de monedas');
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Cargando datos...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return <CryptocurrencyDrawerTable columns={columns} data={data} />;
}
