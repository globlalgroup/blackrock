'use client';

import React, { useEffect, useState } from 'react';
import cn from '@/utils/cn';
import AuthorCard from '@/components/ui/author-card';
import Logo from '@/components/ui/logo';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Button from '@/components/ui/button';
import { useDrawer } from '@/components/drawer-views/context';
import { Close } from '@/components/icons/close';
import { defaultMenuItems } from '@/layouts/sidebar/_menu-items';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { useLayout } from '@/lib/hooks/use-layout';
import { useRouter } from 'next/navigation';
import routes from '@/config/routes';
import SimpleBar from '@/components/ui/simplebar';

import { getMenuItemsByRole } from '@/layouts/sidebar/_menu-items';
//images
import AuthorImage from '@/assets/images/author.jpg';

interface SidebarProps {
  className?: string;
  layoutOption?: string;
  menuItems?: any[];
}

export default function Sidebar({ className }: SidebarProps) {
  const { closeDrawer } = useDrawer();
  const { layout } = useLayout();
  const router = useRouter();

  // 📌 Estado para almacenar datos del usuario
  const [user, setUser] = useState<{ name: string; role: string; username: string; profileImage?: string } | null>(null);
  const [profileImage, setProfileImage] = useState<string>(AuthorImage);

  // 🔹 Obtener datos del usuario desde `localStorage`
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      if (userData.profileImage) setProfileImage(userData.profileImage);
    }
  }, []);

  // 🔹 Sincronizar imagen de perfil con backend si hay userId
  useEffect(() => {
    if (!user?.id) return;
    fetch(`https://blackrockdpto.net/api/users`)
      .then((res) => res.json())
      .then((data) => {
        const backendUser = data.users.find((u: any) => u.id === user.id);
        if (backendUser?.profileImage) {
          setProfileImage(backendUser.profileImage);
          // Actualiza también en localStorage para mantener sincronizado
          const storedUser = localStorage.getItem('userData');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            userData.profileImage = backendUser.profileImage;
            localStorage.setItem('userData', JSON.stringify(userData));
          }
        }
      })
      .catch((err) => {
        console.error('Error al obtener la imagen de perfil:', err);
      });
  }, [user?.id]);

  const sideBarMenus = user
    ? getMenuItemsByRole(user.role)?.map((item) => ({
        name: item.name,
        icon: item.icon,
        href: layout === LAYOUT_OPTIONS.RETRO && item.href === '/' ? '' : item.href,
        ...(item.dropdownItems && {
          dropdownItems: item.dropdownItems.map((dropdownItem: any) => ({
            name: dropdownItem.name,
            icon: dropdownItem.icon,
            href: dropdownItem.href,
          })),
        }),
      }))
    : [];

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed xl:w-72 2xl:w-80 ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l',
        className,
      )}
    >
      <div className="relative flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        <Logo />
        <div className="md:hidden">
          <Button title="Close" color="white" shape="circle" variant="transparent" size="small" onClick={closeDrawer}>
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <SimpleBar className="h-[calc(100%-96px)]">
        <div className="px-6 pb-5 2xl:px-8">
          {/* 🔹 Cambia los datos del usuario dinámicamente */}
          <AuthorCard
            image={profileImage}
            name={user?.username || 'Usuario Desconocido'}
            role={user?.role || 'guest'}
            onClick={() => {
              const newPath =
                layout === LAYOUT_OPTIONS.MODERN ? routes.profile : `/${layout}${routes.profile}`;
              router.push(newPath);
            }}
          />

          <div className="mt-12">
            {sideBarMenus?.map((item, index) => (
              <MenuItem
                key={'default' + item.name + index}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
        </div>
      </SimpleBar>
    </aside>
  );
}