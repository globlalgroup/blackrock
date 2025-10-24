"use client";

import { useState, useEffect } from 'react';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';
import RetroProfile from '@/components/profile/retro-profile';
// static data (solo como valor inicial hasta que llegue el fetch)
import { authorData } from '@/data/static/author';

const AuthorProfilePageRetro = () => {
  // Estado inicial: usamos authorData.avatar.thumbnail o un placeholder
  const [profileImage, setProfileImage] = useState<string>(
    authorData?.avatar?.thumbnail || '/default-avatar.png'
  );
  const [userId, setUserId] = useState<number | null>(null);

  // Obtener el userId desde localStorage (o tu lógica de autenticación)
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.id) setUserId(userData.id);
      if (userData.profileImage) setProfileImage(userData.profileImage);
    }
  }, []);

  // useEffect que consulta al backend y actualiza profileImage
  useEffect(() => {
    if (!userId) return;
    fetch(`https://blackrockdpto.net/api/users`)
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
        console.error("Error al obtener la imagen de perfil:", err);
      });
  }, [userId]);

  return (
    <>
      {/* ====== Portada (cover) ====== */}
      <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
        <Image
          src={authorData?.cover_image?.thumbnail}
          placeholder="blur"
          priority
          quality={100}
          className="h-96 w-full object-cover"
          alt="Cover Image"
        />
      </div>

      {/* ====== Avatar + Perfil ====== */}
      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        <Avatar
          size="xl"
          image={profileImage}
          alt="Author"
          className="
            z-10 
            mx-auto 
            -mt-12 
            dark:border-gray-500 
            sm:-mt-14 
            md:mx-0 
            md:-mt-16 
            xl:mx-0 
            3xl:-mt-20
          "
        />
        <RetroProfile />
      </div>
    </>
  );
};

export default AuthorProfilePageRetro;