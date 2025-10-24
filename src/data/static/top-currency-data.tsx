import { Bitcoin } from '@/components/icons/bitcoin';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';
import {
  FaApple,
  FaCar,
  FaGasPump,
  FaOilCan,
  FaEuroSign,
  FaBuilding,
  FaMoneyBill,
  FaIndustry,
  FaGem,
  FaChartLine,
  FaLeaf,
  FaBolt,
  FaUniversity,
  FaTrain,
} from 'react-icons/fa';

// Tamaño y color estándar para todos los iconos
const ICON_SIZE = 28;

export const TopCurrencyData = [
  {
    id: 1,
    coin: {
      icon: <Bitcoin width={ICON_SIZE} height={ICON_SIZE} style={{ color: '#F7931A' }} />,
      name: 'Bitcoin',
      symbol: 'BTC',
    },
    prices: [
      { name: 1, value: 41000.23 },
      { name: 2, value: 42350.12 },
      { name: 3, value: 39876.55 },
      { name: 4, value: 41234.67 },
      { name: 5, value: 42987.34 },
      { name: 6, value: 41567.89 },
      { name: 7, value: 42123.45 },
      { name: 8, value: 43012.78 },
      { name: 9, value: 41876.22 },
    ],
    usd_price: '42123.45',
    usd_price_change_24h: 2.34,
    usd_marketcap: '810.12 B',
    usd_volume_24h: '35.67 B',
  },
  {
    id: 2,
    coin: {
      icon: <Ethereum width={ICON_SIZE} height={ICON_SIZE} style={{ color: '#627EEA' }} />,
      name: 'Ethereum',
      symbol: 'ETH',
    },
    prices: [
      { name: 1, value: 2850.12 },
      { name: 2, value: 2923.67 },
      { name: 3, value: 2789.45 },
      { name: 4, value: 2890.78 },
      { name: 5, value: 2954.32 },
      { name: 6, value: 2876.54 },
      { name: 7, value: 2934.21 },
      { name: 8, value: 2990.11 },
      { name: 9, value: 2912.34 },
    ],
    usd_price: '2934.21',
    usd_price_change_24h: -1.15,
    usd_marketcap: '350.45 B',
    usd_volume_24h: '18.23 B',
  },
  {
    id: 3,
    coin: {
      icon: <Tether width={ICON_SIZE} height={ICON_SIZE} style={{ color: '#26A17B' }} />,
      name: 'Tether USD',
      symbol: 'USDT',
    },
    prices: Array(9)
      .fill({ name: null, value: 1.0 })
      .map((_, i) => ({ name: i + 1, value: 1.0 })),
    usd_price: '1.00',
    usd_price_change_24h: 0.0,
    usd_marketcap: '82.34 B',
    usd_volume_24h: '28.90 B',
  },
  {
    id: 4,
    coin: {
      icon: <Bnb width={ICON_SIZE} height={ICON_SIZE} style={{ color: '#F3BA2F' }} />,
      name: 'Binance Coin',
      symbol: 'BNB',
    },
    prices: [325.45, 330.12, 318.76, 327.89, 335.67, 329.45, 333.21, 337.34, 331.89].map(
      (v, i) => ({ name: i + 1, value: v })
    ),
    usd_price: '333.21',
    usd_price_change_24h: 1.12,
    usd_marketcap: '61.78 B',
    usd_volume_24h: '9.45 B',
  },
  {
    id: 5,
    coin: {
      icon: <Usdc width={ICON_SIZE} height={ICON_SIZE} style={{ color: '#2775CA' }} />,
      name: 'USD Coin',
      symbol: 'USDC',
    },
    prices: Array(9)
      .fill({ name: null, value: 1.0 })
      .map((_, i) => ({ name: i + 1, value: 1.0 })),
    usd_price: '1.00',
    usd_price_change_24h: 0.0,
    usd_marketcap: '32.10 B',
    usd_volume_24h: '6.78 B',
  },
  {
    id: 6,
    coin: {
      icon: <Cardano width={ICON_SIZE} height={ICON_SIZE} style={{ color: '#0033AD' }} />,
      name: 'Cardano',
      symbol: 'ADA',
    },
    prices: [1.23, 1.25, 1.2, 1.22, 1.24, 1.21, 1.26, 1.27, 1.23].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '1.24',
    usd_price_change_24h: -0.45,
    usd_marketcap: '40.12 B',
    usd_volume_24h: '2.34 B',
  },
  {
    id: 7,
    coin: {
      icon: <Doge width={ICON_SIZE} height={ICON_SIZE} style={{ color: '#C2A633' }} />,
      name: 'Dogecoin',
      symbol: 'DOGE',
    },
    prices: [0.075, 0.078, 0.072, 0.074, 0.077, 0.073, 0.079, 0.08, 0.076].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '0.077',
    usd_price_change_24h: 3.56,
    usd_marketcap: '11.56 B',
    usd_volume_24h: '0.45 B',
  },
  {
    id: 8,
    coin: {
      icon: <FaOilCan size={ICON_SIZE} color="#8B5E3C" />,
      name: 'Repsol',
      symbol: 'REP',
    },
    prices: [12.34, 12.56, 12.1, 12.45, 12.78, 12.67, 12.9, 12.83, 12.49].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '12.67',
    usd_price_change_24h: 0.85,
    usd_marketcap: '20.45 B',
    usd_volume_24h: '0.67 B',
  },
  {
    id: 9,
    coin: {
      icon: <FaLeaf size={ICON_SIZE} color="#4CAF50" />,
      name: 'Iberdrola',
      symbol: 'IBE',
    },
    prices: [10.12, 10.05, 10.3, 10.22, 10.45, 10.38, 10.5, 10.6, 10.33].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '10.38',
    usd_price_change_24h: -0.25,
    usd_marketcap: '65.12 B',
    usd_volume_24h: '0.54 B',
  },
  {
    id: 10,
    coin: {
      icon: <FaApple size={ICON_SIZE} color="#A2AAAD" />,
      name: 'Apple',
      symbol: 'AAPL',
    },
    prices: [178.45, 179.67, 177.23, 178.9, 180.12, 179.45, 180.78, 181.23, 179.9].map(
      (v, i) => ({
        name: i + 1,
        value: v,
      })
    ),
    usd_price: '180.12',
    usd_price_change_24h: 0.67,
    usd_marketcap: '2.85 T',
    usd_volume_24h: '75.34 B',
  },
  {
    id: 11,
    coin: {
      icon: <FaCar size={ICON_SIZE} color="#E53935" />,
      name: 'Tesla',
      symbol: 'TSLA',
    },
    prices: [650.12, 660.45, 645.78, 655.34, 670.23, 660.12, 675.89, 680.45, 665.32].map(
      (v, i) => ({
        name: i + 1,
        value: v,
      })
    ),
    usd_price: '670.23',
    usd_price_change_24h: 1.45,
    usd_marketcap: '650.23 B',
    usd_volume_24h: '12.45 B',
  },
  {
    id: 12,
    coin: {
      icon: <FaOilCan size={ICON_SIZE} color="#2E4053" />,
      name: 'YPF',
      symbol: 'YPF',
    },
    prices: [15.23, 15.45, 15.1, 15.34, 15.56, 15.4, 15.68, 15.72, 15.39].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '15.40',
    usd_price_change_24h: -0.55,
    usd_marketcap: '18.34 B',
    usd_volume_24h: '0.23 B',
  },
  {
    id: 13,
    coin: {
      icon: <FaTrain size={ICON_SIZE} color="#6C3483" />,
      name: 'SNCF',
      symbol: 'SNCF',
    },
    prices: [4.12, 4.08, 4.15, 4.1, 4.2, 4.18, 4.22, 4.25, 4.17].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '4.18',
    usd_price_change_24h: 0.12,
    usd_marketcap: '5.45 B',
    usd_volume_24h: '0.12 B',
  },
  {
    id: 14,
    coin: {
      icon: <FaChartLine size={ICON_SIZE} color="#00BFFF" />,
      name: 'Nvidia',
      symbol: 'NVDA',
    },
    prices: [750.23, 760.45, 740.12, 755.34, 770.56, 765.4, 780.68, 785.72, 760.39].map(
      (v, i) => ({
        name: i + 1,
        value: v,
      })
    ),
    usd_price: '770.56',
    usd_price_change_24h: 2.45,
    usd_marketcap: '1.92 T',
    usd_volume_24h: '22.34 B',
  },
  {
    id: 15,
    coin: {
      icon: <FaUniversity size={ICON_SIZE} color="#1A5276" />,
      name: 'J.P. Morgan',
      symbol: 'JPM',
    },
    prices: [140.12, 142.34, 138.56, 141.23, 144.45, 143.1, 145.67, 146.78, 142.89].map(
      (v, i) => ({
        name: i + 1,
        value: v,
      })
    ),
    usd_price: '144.45',
    usd_price_change_24h: -0.89,
    usd_marketcap: '460.12 B',
    usd_volume_24h: '3.12 B',
  },
  {
    id: 16,
    coin: {
      icon: <FaBuilding size={ICON_SIZE} color="#34495E" />,
      name: 'BBVA',
      symbol: 'BBVA',
    },
    prices: [6.12, 6.15, 6.05, 6.1, 6.2, 6.18, 6.22, 6.25, 6.19].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '6.20',
    usd_price_change_24h: 0.33,
    usd_marketcap: '45.67 B',
    usd_volume_24h: '1.02 B',
  },
  {
    id: 17,
    coin: {
      icon: <FaOilCan size={ICON_SIZE} color="#B9770E" />,
      name: 'Pemex',
      symbol: 'PEMEX',
    },
    prices: [18.45, 18.67, 18.23, 18.34, 18.78, 18.56, 18.9, 18.85, 18.49].map(
      (v, i) => ({
        name: i + 1,
        value: v,
      })
    ),
    usd_price: '18.56',
    usd_price_change_24h: -0.15,
    usd_marketcap: '15.23 B',
    usd_volume_24h: '0.34 B',
  },
  {
    id: 18,
    coin: {
      icon: <FaGem size={ICON_SIZE} color="#F1C40F" />,
      name: 'Oro',
      symbol: 'XAU',
    },
    prices: [
      1950.12, 1960.45, 1945.78, 1955.34, 1970.23, 1965.12, 1975.89, 1980.45, 1965.32,
    ].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '1970.23',
    usd_price_change_24h: 0.85,
    usd_marketcap: '12.45 T',
    usd_volume_24h: '35.12 B',
  },
  {
    id: 19,
    coin: {
      icon: <FaGasPump size={ICON_SIZE} color="#16A085" />,
      name: 'Gas natural',
      symbol: 'NGAS',
    },
    prices: [3.12, 3.15, 3.05, 3.1, 3.2, 3.18, 3.22, 3.25, 3.19].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '3.20',
    usd_price_change_24h: -1.05,
    usd_marketcap: '230.12 B',
    usd_volume_24h: '0.76 B',
  },
  {
    id: 20,
    coin: {
      icon: <FaOilCan size={ICON_SIZE} color="#273746" />,
      name: 'Petróleo Brent',
      symbol: 'BRN',
    },
    prices: [72.12, 73.45, 71.78, 72.89, 74.23, 73.56, 74.9, 75.45, 73.32].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '74.23',
    usd_price_change_24h: 1.15,
    usd_marketcap: '900.45 B',
    usd_volume_24h: '15.23 B',
  },
  {
    id: 21,
    coin: {
      icon: <FaEuroSign size={ICON_SIZE} color="#2980B9" />,
      name: 'EUR/USD',
      symbol: 'EURUSD',
    },
    prices: [1.1, 1.11, 1.09, 1.1, 1.12, 1.11, 1.13, 1.14, 1.11].map((v, i) => ({
      name: i + 1,
      value: v,
    })),
    usd_price: '1.13',
    usd_price_change_24h: -0.02,
    usd_marketcap: 'N/A',
    usd_volume_24h: 'N/A',
  },
];