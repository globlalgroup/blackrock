//images
import Terpel from '@/assets/images/coin/Terpel.png';
import Ecopetrol from '@/assets/images/coin/Ecopetrol.png';
import Repsol from '@/assets/images/coin/Repsol.png';
import Iberdrola from '@/assets/images/coin/Iberdrola.png';
import TetherImage from '@/assets/images/coin/tether.svg';
import CardanoImage from '@/assets/images/coin/cardano.svg';
import BinanceImage from '@/assets/images/coin/binance.svg';

export const coinSlideData = [
  {
    id: '0',
    name: 'Terpel',
    symbol: 'TERPEL',
    balance: '0.2231345',
    usdBalance: '11,032.24',
    logo: Terpel,
    change: '+12.5%',
    isChangePositive: true,
    color: 'rgb(231 232 235)',
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
  },
  {
    id: '3',
    name: 'Iberdrola',
    symbol: 'IBERDROLA',
    balance: '240.55',
    usdBalance: '340.24',
    logo: Iberdrola,
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
  },
];
