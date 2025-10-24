'use client';

import React, { useEffect, useState } from 'react';
import cn from '@/utils/cn';
import AuthorCard from '@/components/ui/author-card';
import Logo from '@/components/ui/logo';
import Image from '@/components/ui/image';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Button from '@/components/ui/button';
import { useDrawer } from '@/components/drawer-views/context';
import { Close } from '@/components/icons/close';
import { defaultMenuItems } from '@/layouts/sidebar/_menu-items';
// Images
import AuthorImage from '@/assets/images/author.jpg';
import ShapeImage from '@/assets/images/sidebar-shape.png';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useLayout } from '@/lib/hooks/use-layout';
import routes from '@/config/routes';
import SimpleBar from '@/components/ui/simplebar';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
  balance: number;
  nfts: { id: string; name: string; value: number }[];
  profileImage?: string;
}

export default function Sidebar({ className }: { className?: string }) {
  const { closeDrawer } = useDrawer();
  const router = useRouter();
  const { layout } = useLayout();

  const [user, setUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<string>(AuthorImage);

  // ✅ Obtener usuario y cargar imagen desde localStorage o API
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      if (userData.profileImage) {
        setProfileImage(userData.profileImage);
      } else {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
          .then((res) => res.json())
          .then((data) => {
            const backendUser = data.users.find((u: any) => u.id === userData.id);
            if (backendUser?.profileImage) {
              setProfileImage(backendUser.profileImage);
              userData.profileImage = backendUser.profileImage;
              localStorage.setItem('userData', JSON.stringify(userData));
            }
          })
          .catch((err) => {
            console.error('Error al obtener la imagen de perfil:', err);
          });
      }
    }
  }, []);

  const retroMenu = defaultMenuItems.map((item) => ({
    name: item.name,
    icon: item.icon,
    href: '/' + LAYOUT_OPTIONS.RETRO + (item.href === '/' ? '' : item.href),
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem: any) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        href:
          item.name === 'Authentication'
            ? dropdownItem.href
            : '/' + LAYOUT_OPTIONS.RETRO + dropdownItem.href,
      })),
    }),
  }));

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed xl:w-72 2xl:w-64',
        className
      )}
    >
      <div className="relative flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        <Logo />
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <SimpleBar className="h-[calc(100%-98px)]">
        <div className="px-6 pb-5 2xl:px-8">
          <AuthorCard
            image={profileImage}
            name={user?.username || 'Usuario Desconocido'}
            role={user?.role || 'guest'}
            onClick={() => {
              const newPath =
                layout === LAYOUT_OPTIONS.MODERN
                  ? routes.profile
                  : `/${layout}${routes.profile}`;
              router.push(newPath);
            }}
          />

          <div className="mt-12">
            {retroMenu.map((item, index) => (
              <MenuItem
                key={`retro-left-${index}`}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>

          <div className="relative mt-20 hidden flex-col rounded-lg bg-gray-200 p-6 dark:bg-[#333E59] lg:flex">
            <div className="-mt-12">
              <Image src={ShapeImage} alt="Shape image" width={200} />
            </div>
            <h2 className="mb-7 mt-5 text-center text-[20px] font-semibold leading-8 text-light-dark dark:text-white">
              Explore the new Blockchain System
            </h2>
            <button className="h-12 rounded-lg bg-brand text-white">
              Try Now
            </button>
          </div>
        </div>
      </SimpleBar>
    </aside>
  );
}

