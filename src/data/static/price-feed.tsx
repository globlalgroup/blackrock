import TERPEL from '@/assets/images/coin/Terpel.jpg';
import Ecopetrol from '@/assets/images/coin/Ecopetrol.png';
import Repsol from '@/assets/images/coin/Repsol.png';
import Iberdrola from '@/assets/images/coin/Iberdrola.png';
import Apple from '@/assets/images/coin/Apple.png';
import Tesla from '@/assets/images/coin/Tesla.png';
import CardanoImage from '@/assets/images/coin/cardano.svg';
import BinanceImage from '@/assets/images/coin/binance.svg';

import { Bitcoin } from '@/components/icons/bitcoin';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Cardano } from '@/components/icons/cardano';
import { Terpel } from '@/components/icons/Terpel';

const TerpelIcon = () => (
  <img src={TERPEL.src} alt="Terpel" width="40" height="40" style={{ objectFit: "contain", height: "40px !important"}}

/>
);

const EcopetrollIcon = () => (
  <img src={Ecopetrol.src} alt="Ecopetrol" width="40" height="40" style={{ objectFit: "contain", height: "40px !important"}}

/>
);

const RepsolIcon = () => (
  <img src={Repsol.src} alt="Repsol" width="40" height="40" style={{ objectFit: "contain", height: "40px !important"}}

/>
);

const IberdrolaIcon = () => (
  <img src={Iberdrola.src} alt="Iberdrola" width="40" height="40" style={{ objectFit: "contain", height: "40px !important"}}

/>
);
const AppleIcon = () => (
  <img src={Apple.src} alt="Apple" width="40" height="40" style={{ objectFit: "contain", height: "40px !important"}}

/>
);
const TeslaIcon = () => (
  <img src={Tesla.src} alt="Tesla" width="40" height="40" style={{ objectFit: "contain", height: "40px !important"}}

/>
);

export const priceFeedData = [
  {
    id: '0',
    name: 'Terpel',
    symbol: 'TERPEL',
    balance: '0.2231345',
    usdBalance: '11,032.24',
    logo: TERPEL,
    change: '+12.5%',
    isChangePositive: true,
    color: '#FDEDD4',
    icon: <TerpelIcon/>,
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 34698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 26577.4 },
      { name: 7, value: 23577.4 },
      { name: 8, value: 18577.4 },
      { name: 9, value: 28577.4 },
    ],
  },
  {
    id: '1',
    name: 'Ecopetrol',
    symbol: 'ECOPETROL',
    balance: '1.2345',
    usdBalance: '1,032.24',
    logo: Ecopetrol,
    change: '-1.5%',
    isChangePositive: false,
    color: '#E1F9F1',
    icon: <EcopetrollIcon/>
,
    prices: [
      { name: 1, value: 12187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 37698.98 },
      { name: 4, value: 39587.55 },
      { name: 5, value: 29577.4 },
      { name: 6, value: 31577.4 },
      { name: 7, value: 47577.4 },
      { name: 8, value: 36577.4 },
      { name: 9, value: 28577.4 },
    ],
  },
  {
    id: '2',
    name: 'Repsol',
    symbol: 'REPSOL',
    balance: '1.2370',
    usdBalance: '532.94',
    logo: Repsol,
    change: '+12.5%',
    isChangePositive: true,
    color: '#DBE3FF',
    icon: <RepsolIcon />,
    prices: [
      { name: 1, value: 25187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 34698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 26577.4 },
      { name: 7, value: 23577.4 },
      { name: 8, value: 18577.4 },
      { name: 9, value: 28577.4 },
    ],
  },
  {
    id: '3',
    name: 'Iberdrola',
    symbol: 'IBERDROLA',
    balance: '210.55',
    usdBalance: '440.24',
    logo: Iberdrola,
    change: '+1.1%',
    isChangePositive: true,
    color: '#FBF5D5',
    icon: <IberdrolaIcon />,
    prices: [
      { name: 1, value: 15184.44 },
      { name: 2, value: 16350.99 },
      { name: 3, value: 17690.98 },
      { name: 4, value: 37580.55 },
      { name: 5, value: 17574.4 },
      { name: 6, value: 20576.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
  },
  {
    id: '4',
    name: 'Apple',
    symbol: 'AAPL',
    balance: '240.55',
    usdBalance: '340.24',
    logo: Apple,
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    icon: <AppleIcon />,
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 16356.99 },
      { name: 3, value: 17698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 20577.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
  },
  {
    id: '5',
    name: 'Tesla',
    symbol: 'TSLA',
    balance: '230.55',
    usdBalance: '340.24',
    logo: Tesla,
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    icon: <TeslaIcon />,
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 16356.99 },
      { name: 3, value: 17698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 20577.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
  },
];
