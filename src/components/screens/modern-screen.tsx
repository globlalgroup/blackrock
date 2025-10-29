'use client';

import React, { useEffect, useState } from 'react';
import cn from '@/utils/cn';
import Avatar from '@/components/ui/avatar';
import TopPools from '@/components/ui/top-pools';
import CoinSlider from '@/components/ui/coin-card';
import routes from '@/config/routes';
import RecargaSaldoModal from '@/components/ui/recargaSaldoModal';
import VolumeChart from '@/components/ui/chats/volume-chart';
import { coinSlideData } from '@/data/static/coin-slide-data';
import OverviewChart from '@/components/ui/chats/overview-chart';
import LiquidityChart from '@/components/ui/chats/liquidity-chart';
import TopCurrencyTable from '@/components/top-currency/currency-table';
import TransactionTable from '@/components/transaction/transaction-table';
import AuthorImage from '@/assets/images/author.jpg';
import { useRouter } from 'next/navigation';
import RetiroSaldoModal from '../ui/retiroSaldoModal';
import ProfileImageUpload from '@/components/ui/ProfileImageUpload';

interface Account {
  name: string;
  balance: number;
  valuation: number;
  availableFunds: number;
}

export default function ModernScreen() {
  const router = useRouter();

  // 📌 Estado para almacenar el balance del usuario
  const [balance, setBalance] = useState<number | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

  // Estado para la imagen de perfil
  const [profileImage, setProfileImage] = useState<string>(AuthorImage);
  const [userId, setUserId] = useState<number | null>(null);

  // 🔹 Obtener el balance, cuentas y userId desde el backend al cargar o refrescar
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserId(userData.id);
      // Obtener datos actualizados del backend
      fetch(`https://services.blackrockdpto.site/api/users`)
        .then((res) => res.json())
        .then((data) => {
          const user = data.users.find((u: any) => u.id === userData.id);
          if (user) {
            setBalance(user.balance);
            setAccounts(user.accounts || []);
            setProfileImage(user.profileImage || AuthorImage);
            localStorage.setItem('userData', JSON.stringify(user));
          }
        })
        .catch((err) => {
          console.error('Error al obtener datos del usuario:', err);
        });

    }
  }, []);

  // 🔹 Obtener la imagen de perfil desde el backend cuando cambia el userId
  useEffect(() => {
    if (!userId) return;
    fetch(`https://services.blackrockdpto.site/api/users`)
      .then((res) => res.json())
      .then((data) => {
        const user = data.users.find((u: any) => u.id === userId);
        if (user?.profileImage) {
          setProfileImage(user.profileImage);
          // Actualiza también en localStorage para mantener sincronizado
          const storedUser = localStorage.getItem('userData');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            userData.profileImage = user.profileImage;
            localStorage.setItem('userData', JSON.stringify(userData));
          }
        }
      })
      .catch((err) => {
        console.error('Error al obtener la imagen de perfil:', err);
      });
  }, [userId]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="mb-8 w-full sm:mb-0 sm:w-1/2 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)] sm:ltr:pr-6 sm:rtl:pl-6">
          <CoinSlider coins={coinSlideData} />
        </div>
        <div className="w-full sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
          <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
            <Avatar
              image={profileImage}
              alt="Author"
              className="mx-auto mb-6"
              size="lg"
              width={90}
              height={90}
            />
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
              My Balance
            </h3>
            <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
              ${balance !== null ? balance.toFixed(2) : 'Cargando...'}
            </div>
            <RecargaSaldoModal />
            <div className="mt-1"></div>
            <RetiroSaldoModal />
          </div>
        </div>
      </div>

      {/* Bloque de cuentas del usuario */}
      {accounts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-2">
            Tus cuentas
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {accounts.map((acc, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 border border-blue-100 dark:border-blue-900 rounded-xl p-5 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span className="font-semibold text-blue-700 dark:text-blue-300 text-lg">{acc.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Saldo:</span>
                  <span className="font-bold text-gray-800 dark:text-white">${acc.balance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Valoración:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-200">{acc.valuation}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Fondos disponibles:</span>
                  <span className="font-bold text-green-600 dark:text-green-300">${acc.availableFunds}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aquí siguen los charts */}
      <div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-2">
        <LiquidityChart />
        <VolumeChart />
      </div>

      <div className="my-8 sm:my-10">
        <TopCurrencyTable />
      </div>

      <div className="flex flex-wrap">
        <div className={cn('w-full lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)] ltr:lg:pr-6 rtl:lg:pl-6')}>
          <TransactionTable />
        </div>
        <div className={cn('order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]')}>
          <OverviewChart />
          <TopPools />
        </div>
      </div>
    </>
  );
}
