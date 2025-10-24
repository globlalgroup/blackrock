import React, { useEffect, useState } from 'react';
import Image from '@/components/ui/image';
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/memecoin.png';
import Avatar from '@/components/ui/avatar';

export default function PreviewContent() {
  const [profileImage, setProfileImage] = useState<string>(AuthorImage);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.id) setUserId(userData.id);
      if (userData.profileImage) setProfileImage(userData.profileImage);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetch(`https://services.blackrockdpto.net/api/users`)
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
    <div className="w-full xs:w-96">
      <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
        <div className="flex items-center p-4 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400">
          <Avatar
            size="sm"
            image={profileImage}
            alt="Cameronwilliamson"
            width={90}
            height={90}
            className="border-white bg-gray-300 ltr:mr-3 rtl:ml-3 dark:bg-gray-400"
            shape="circle"
          />
          @Cameronwilliamson
        </div>
        <div className="relative block w-full">
          <Image
            src={NFT1}
            placeholder="blur"
            width={467}
            height={467}
            alt="Pulses of Imagination #214"
          />
        </div>
        <div className="p-5">
          <div className="text-sm font-medium text-black dark:text-white">
            Pulses Of Imagination #214
          </div>
          <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            0.40 ETH
          </div>
        </div>
      </div>
    </div>
  );
}
