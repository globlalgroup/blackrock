import React from 'react';
import routes from '@/config/routes';

import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { NewIcon } from '@/components/icons/coin';
import { NewspaperIcon } from '@/components/icons/newspaper';
import { UserIcon } from '@/components/icons/user';
import { MemIcon } from '@/components/icons/meme';
import { LivePricing } from '@/components/icons/live-pricing';
import { LockIcon } from '@/components/icons/lock-icon';
import { TradingBotIcon } from '@/components/icons/trading-bot-icon';

export type MenuItem = {
  name: string;
  icon: React.ReactElement;
  href: string;
  dropdownItems?: { name: string; icon: React.ReactElement; href: string }[];
};

// Administrador
export const defaultMenuItems: MenuItem[] = [
  {
    name: 'Usuarios',
    icon: <UserIcon />,
    href: routes.users
  },
  {
    name: 'Precios',
    icon: <NewIcon />,
    href: routes.coinAll
  },
  {
    name: 'Mi cuenta',
    icon: <HomeIcon />,
    href: routes.home
  },
  {
    name: 'Live Pricing',
    icon: <LivePricing />,
    href: routes.livePricing
  },
  {
    name: 'Trading Bot',
    icon: <TradingBotIcon />,
    href: routes.tradingBot
  },
  {
    name: 'Crear tu Proyecto',
    icon: <PlusCircle />,
    href: routes.search,
    dropdownItems: [
      {
        name: 'Explorar tus Proyectos',
        icon: <CompassIcon />,
        href: routes.search
      },
      {
        name: 'Crear tus Proyectos',
        icon: <PlusCircle />,
        href: routes.createNft
      },
      {
        name: 'Detalles del Proyecto',
        icon: <DiskIcon />,
        href: routes.nftDetails
      }
    ]
  },
  {
    name: 'AppStore',
    icon: <FarmIcon />,
    href: 'https://www.mobileapp.app/to/4YyZNvK?ref=mam'
  },
  {
    name: 'Intercambiar',
    icon: <ExchangeIcon />,
    href: routes.swap
  },
  {
    name: 'Liquides',
    icon: <PoolIcon />,
    href: routes.liquidity
  },
  {
    name: 'Perfil',
    icon: <ProfileIcon />,
    href: routes.profile
  },
  {
    name: 'Noticias',
    icon: <NewspaperIcon />,
    href: 'https://www.bloomberg.com/live/europe'
  },
  {
    name: 'Authenticación',
    icon: <LockIcon className="w-[18px]" />,
    href: routes.signIn,
    dropdownItems: [
      {
        name: 'Sign in',
        icon: <LockIcon />,
        href: routes.signIn
      },
      {
        name: 'Sign up',
        icon: <LockIcon />,
        href: routes.signUp
      },
      {
        name: 'Reset pin',
        icon: <LockIcon />,
        href: routes.resetPin
      },
      {
        name: 'Recupera password',
        icon: <LockIcon />,
        href: routes.forgetPassword
      },
      {
        name: 'Cargar documento',
        icon: <LockIcon />,
        href: routes.forgetPassword
      }
    ]
  },
  {
    name: 'Mis solicitudes',
    icon: <PoolIcon />,
    href: routes.solicitud
  }
];

export const MinimalMenuItems: MenuItem[] = [
  {
    name: 'Mi cuenta',
    icon: <HomeIcon />,
    href: routes.home
  },
  {
    name: 'Precio tiempo real',
    icon: <LivePricing />,
    href: routes.livePricing
  },
  {
    name: 'Trading Bot',
    icon: <TradingBotIcon />,
    href: routes.tradingBot
  },
  {
    name: 'Crear tu Proyecto',
    icon: <PlusCircle />,
    href: routes.search,
    dropdownItems: [
      {
        name: 'Explorar Proyectos',
        icon: <CompassIcon />,
        href: routes.search
      },
      {
        name: 'Crear Proyecto',
        icon: <PlusCircle />,
        href: routes.createNft
      },
      {
        name: 'detalles del Proyecto',
        icon: <DiskIcon />,
        href: routes.nftDetails
      }
    ]
  },
  {
    name: 'AppStore',
    icon: <FarmIcon />,
    href: 'https://www.mobileapp.app/to/4YyZNvK?ref=mam'
  },
  {
    name: 'Intercambiar',
    icon: <ExchangeIcon />,
    href: routes.swap
  },
  {
    name: 'Paginas',
    icon: <NewspaperIcon />,
    href: routes.pages,
    dropdownItems: [
      {
        name: 'Perfil',
        icon: <ProfileIcon />,
        href: routes.profile
      },
      {
        name: 'Liquides',
        icon: <PoolIcon />,
        href: routes.liquidity
      }
    ]
  },
  {
    name: 'Noticias',
    icon: <NewspaperIcon />,
    href: 'https://www.bloomberg.com/live/europe'
  },
  {
    name: 'Authenticación',
    icon: <LockIcon className="w-[18px]" />,
    href: routes.signIn,
    dropdownItems: [
      {
        name: 'Sign in',
        icon: <LockIcon />,
        href: routes.signIn
      },
      {
        name: 'Sign up',
        icon: <LockIcon />,
        href: routes.signUp
      },
      {
        name: 'Reset pin',
        icon: <LockIcon />,
        href: routes.resetPin
      },
      {
        name: 'Recuperar password',
        icon: <LockIcon />,
        href: routes.forgetPassword
      },
      {
        name: 'Cargar documento',
        icon: <LockIcon />,
        href: routes.forgetPassword
      }
    ]
  },
  {
    name: 'Mis solicitudes',
    icon: <PoolIcon />,
    href: routes.solicitud
  }
];

export const getMenuItemsByRole = (role: string): MenuItem[] => {
  if (role === 'admin') {
    return defaultMenuItems; // Los administradores ven todas las opciones
  } else if (role === 'user') {
    return MinimalMenuItems; // Los usuarios solo ven opciones limitadas
  }
  return []; // Si el rol no es válido, retorna un menú vacío
};
