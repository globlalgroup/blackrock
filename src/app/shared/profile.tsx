"use client";

import { useRef, useState, useEffect } from 'react';
import Profile from '@/components/profile/profile';

const AVATAR_SIZE_REM = 7.5; // 7.5rem ≈ 120px

const AuthorProfilePage = () => {
  const [profileImage, setProfileImage] = useState<string>('/default-avatar.png');
  const [userId, setUserId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Obtener el usuario autenticado desde localStorage (o donde lo guardes)
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserId(userData.id);
      // Si ya tiene imagen, mostrarla
      if (userData.profileImage) {
        setProfileImage(userData.profileImage);
      }
    }
  }, []);

  // Cuando cambia el userId, obtener la imagen actualizada desde el backend
  useEffect(() => {
    if (!userId) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      .then(res => res.json())
      .then(data => {
        const user = data.users.find((u: any) => u.id === userId);
        if (user?.profileImage) {
 const urlConTimestamp = `${user?.profileImage}?t=${Date.now()}`;
          setProfileImage(urlConTimestamp);
          // Actualiza también en localStorage para mantener sincronizado
          const storedUser = localStorage.getItem('userData');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            userData.profileImage = user.profileImage;
            localStorage.setItem('userData', JSON.stringify(userData));
          }
        }
      });
  }, [userId]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && userId) {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile-image`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.imageUrl) {
        setProfileImage(data.imageUrl);
        // Actualiza también en localStorage para mantener sincronizado
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          userData.profileImage = data.imageUrl;
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      }
    }
  };

  return (
    <>
      {/* Contenedor del video */}
      <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Video.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>

      {/* Avatar fuera del contenedor del video */}
      <div className="relative">
        <div
          className={`
            absolute 
            left-4 
            top-[-3.75rem]      /* -3.75rem = -(7.5rem/2) = -(120px/2) */
            w-[7.5rem]          /* 7.5rem ≈ 120px */
            h-[7.5rem]          /* 7.5rem ≈ 120px */
            rounded-full 
            overflow-hidden 
            cursor-pointer 
            group 
            z-50
          `}
          onClick={() => fileInputRef.current?.click()}
          title="Cambiar imagen de perfil"
        >
          <img
            src={profileImage}
            alt="Author"
            className="w-full h-full object-cover rounded-full"
            draggable={false}
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition">
            <span className="text-white opacity-0 group-hover:opacity-100 transition text-xs font-semibold">
              Cambiar imagen
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Espacio debajo del avatar */}
      <div className="mt-[3.75rem] mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        <Profile />
      </div>
    </>
  );
};

export default AuthorProfilePage;
