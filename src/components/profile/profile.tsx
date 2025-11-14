'use client';

import { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'react-use';
import AuthorInformation from '@/components/author/author-information';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import Button from '@/components/ui/button';
import ProfileTab from '@/components/profile/profile-tab';
import usersData from '@/data/users.json';

// Datos iniciales en el código
const initialUser = {
  id: 157896,
  name: 'Inversionista asociado ',
  user_name: 'BlackRockInvestment',
  wallet_key: '0xdF0AaD952C482a19A5B44116b609Fd042BC0C708',
  following: 101240,
  followers: 15556700,
};

function animateNumber(start: number, end: number, setFn: (n: number) => void, duration = 1200) {
  const startTime = performance.now();
  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (end - start) * eased);
    setFn(value);
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

export default function Profile() {
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // Estados para los contadores animados
  const [following, setFollowing] = useState(initialUser.following);
  const [followers, setFollowers] = useState(initialUser.followers);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) setCurrentUserId(Number(id));
  }, []);

  useEffect(() => {
    let currentFollowing = following;
    let currentFollowers = followers;
    let timeoutId: NodeJS.Timeout;

    function increaseCounts() {
      const nextFollowing = currentFollowing + 500;
      const nextFollowers = currentFollowers + 500;

      animateNumber(currentFollowing, nextFollowing, setFollowing, 1200);
      animateNumber(currentFollowers, nextFollowers, setFollowers, 1200);

      currentFollowing = nextFollowing;
      currentFollowers = nextFollowers;

      // Random entre 3 y 7 segundos
      const nextDelay = Math.floor(Math.random() * 4000) + 3000;
      timeoutId = setTimeout(increaseCounts, nextDelay);
    }

    timeoutId = setTimeout(increaseCounts, Math.floor(Math.random() * 4000) + 3000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCopyToClipboard() {
    copyToClipboard(initialUser.wallet_key);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(false);
    }, 2500);
  }

  return (
    <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row 3xl:pt-12">
      <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 2xl:w-80 3xl:w-96 3xl:ltr:pr-14 3xl:rtl:pl-14">
        <div className="text-center ltr:md:text-left rtl:md:text-right">
          <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
            {initialUser.name}
          </h2>
          <div className="mt-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
            @{initialUser.user_name}
          </div>
          <div className="md:max-w-auto mx-auto mt-5 flex h-9 max-w-sm items-center rounded-full bg-white shadow-card dark:bg-light-dark md:mx-0 xl:mt-6">
            <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
              #{initialUser.id}
            </div>
            <div className="text truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:text-sm">
              {initialUser.wallet_key}
            </div>
            <div
              title="Copy Address"
              className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={handleCopyToClipboard}
            >
              {copyButtonStatus ? (
                <Check className="h-auto w-3.5 text-green-500" />
              ) : (
                <Copy className="h-auto w-3.5" />
              )}
            </div>
          </div>
        </div>
        {/* Botón para abrir el modal */}
        <div className="mt-8 flex justify-center">
          <Button onClick={() => setShowModal(true)} className="w-full">
            Cambiar contraseña
          </Button>
        </div>
        {/* Modal para cambiar contraseña */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white text-xl font-bold"
                onClick={() => setShowModal(false)}
                aria-label="Cerrar"
                type="button"
              >
                ×
              </button>
              <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">Cambiar contraseña</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setShowLoading(true);
                  setShowModal(false);
                  setPopupMessage('');
                  const form = e.target as HTMLFormElement;
                  const oldPasswordInput = form.elements.namedItem('oldPassword') as HTMLInputElement;
                  const newPasswordInput = form.elements.namedItem('newPassword') as HTMLInputElement;
                  const oldPassword = oldPasswordInput ? oldPasswordInput.value : '';
                  const newPassword = newPasswordInput.value.trim();
                  try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${currentUserId}/password`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        currentPassword: oldPassword.trim(),
                        newPassword: newPassword
                      })
                    });
                    const data = await res.json();
                    setShowLoading(false);
                    setPopupMessage(data.message || data.error || `Error: ${res.status}`);
                  } catch (error) {
                    setShowLoading(false);
                    setPopupMessage('Error de red o del servidor');
                  }
                  form.reset();
                }}
              >
                <div className="mb-2">
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Contraseña actual"
                    className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Nueva contraseña"
                    className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Cambiar contraseña
                </Button>
              </form>
            </div>
          </div>
        )}
        {/* Popup de carga */}
        {showLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Cambiando contraseña...</p>
            </div>
          </div>
        )}
        {/* Popup de mensaje final */}
        {popupMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{popupMessage}</p>
              <button onClick={() => setPopupMessage('')} className="bg-blue-600 text-white px-4 py-2 rounded">OK</button>
            </div>
          </div>
        )}
        {/* Stats y redes sociales */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-y border-dashed border-gray-200 py-5 text-center dark:border-gray-700 md:justify-start ltr:md:text-left rtl:md:text-right xl:mt-12 xl:gap-8 xl:py-6">
          <div>
            <div className="flex items-center mb-1.5">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-lg font-medium tracking-tighter text-gray-900 dark:text-white transition-all duration-500">
                {following.toLocaleString()}
              </span>
            </div>
            <div className="text-sm tracking-tighter text-gray-600 dark:text-gray-400">
              Usuario en línea
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-900 dark:text-white transition-all duration-500">
              {followers.toLocaleString()}
            </div>
            <div className="text-sm tracking-tighter text-gray-600 dark:text-gray-400">
              Usuarios Registrados
            </div>
          </div>
        </div>
        <AuthorInformation className="hidden md:block" data={initialUser} />
      </div>
      <div className="grow pb-9 pt-6 md:-mt-2.5 md:pb-0 md:pt-1.5 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 3xl:ltr:pl-14 3xl:rtl:pr-14">
        <ProfileTab />
      </div>
      <AuthorInformation data={initialUser} />
    </div>
  );
}
