import { Bitcoin } from '@/components/icons/bitcoin';
import { Bnb } from '@/components/icons/bnb';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Usdc } from '@/components/icons/usdc';

import TERPEL from '@/assets/images/coin/Terpel.jpg';
import Ecopetrol from '@/assets/images/coin/Ecopetrol.png';
import Repsol from '@/assets/images/coin/Repsol.png';
import Iberdrola from '@/assets/images/coin/Iberdrola.png';
import Apple from '@/assets/images/coin/Apple.png';
import Tesla from '@/assets/images/coin/Tesla.png';
import YPF from '@/assets/images/coin/YPF.png';
import NVIDIA from '@/assets/images/coin/NVIDIA.png';
import JPM from '@/assets/images/coin/JPM.png';
import BBVA from '@/assets/images/coin/BBVA.png';
import PEMEX from '@/assets/images/coin/PEMEX.png';
import GOLD from '@/assets/images/coin/GOLD.jpg';
import NATGAS from '@/assets/images/coin/NATGAS.png';
import BRENT from '@/assets/images/coin/BRENT.png';
import EURO from '@/assets/images/coin/EURO.png';


const TerpelIcon = () => (
  <img src={TERPEL.src} alt="Terpel" width="30" height="30" style={{ objectFit: "contain" ,height: "30px !important"}}

/>
);

const EcopetrollIcon = () => (
  <img src={Ecopetrol.src} alt="Ecopetrol" width="30" height="30" style={{ objectFit: "contain" ,height: "30px !important"}}

/>
);

const RepsolIcon = () => (
  <img src={Repsol.src} alt="Repsol" width="30" height="30" style={{ objectFit: "contain" ,height: "30px !important"}}

/>
);

const IberdrolaIcon = () => (
  <img src={Iberdrola.src} alt="Iberdrola" width="30" height="30" style={{ objectFit: "contain" ,height: "30px !important"}}

/>
);
const AppleIcon = () => (
  <img src={Apple.src} alt="Apple" width="30" height="30" style={{ objectFit: "contain" ,height: "30px !important"}}

/>
);
const TeslaIcon = () => (
  <img src={Tesla.src} alt="Tesla" width="30" height="30" style={{ objectFit: "contain", height: "30px !important"}}

/>
);

const YPFIcon = () => (
  <img src={YPF.src} alt="YPF" width="30" height="30" style={{ objectFit: "contain", height: "30px !important"}}

/>
);
const NVIDIAIcon = () => (
  <img src={NVIDIA.src} alt="NVIDIA" width="30" height="30" style={{ objectFit: "contain", height: "30px !important"}}

/>
);
const BBVAIcon = () => (
  <img src={BBVA.src} alt="BBVA" width="30" height="30" style={{ objectFit: "contain", height: "30px !important"}}

/>
);
const JPMIcon = () => (
  <img src={JPM.src} alt="JPM" width="30" height="30" style={{ objectFit: "contain", height: "30px !important"}}

/>
);
const PEMEXIcon = () => (
  <img src={PEMEX.src} alt="PEMEX" width="30" height="30" style={{ objectFit: "contain", height: "30px !important"}}

/>
);
const GOLDIcon = () => (
  <img src={GOLD.src} alt="GOLD" width="30" height="30" style={{ objectFit: "contain", height: "30px !important"}}

/>
);
const NATGASicon = () => (
  <img src={NATGAS.src} alt="NATGAS" width="30" height="30" style={{ objectFit: "contain", height: "30px !important"}}

/>
);
const BRENTicon = () => (
  <img src={BRENT.src} alt="BRENT" width="30" height="30" style={{ objectFit: "contain", height: "30px !important"}}

/>
);
const EUROicon = () => (
  <img src={EURO.src} alt="EURO" width="30" height="30" style={{ objectFit: "contain", height: "30px !important"}}

/>
);

export const CoinPriceData = [
  {
    symbol: 'TERPEL',
    market_cap_rank: '1',
    image: <TerpelIcon />,
    name: 'Terpel',
    current_price: 11300,
    price_change_percentage_1h_in_currency: '-1.80',
    price_change_percentage_24h_in_currency: '2.50',
    circulating_supply: 32000000,
    total_volume: 5820000,
  },
  {
    symbol: 'ECOPETROL',
    market_cap_rank: '2',
    image: <EcopetrollIcon />,
    name: 'Ecopetrol',
    current_price: 2150,
    price_change_percentage_1h_in_currency: '1.42',
    price_change_percentage_24h_in_currency: '2.10',
    circulating_supply: 480000000,
    total_volume: 15300000,
  },
  {
    symbol: 'REPSOL',
    market_cap_rank: '3',
    image: <RepsolIcon />,
    name: 'Repsol',
    current_price: 11.27,
    price_change_percentage_1h_in_currency: '-1.21',
    price_change_percentage_24h_in_currency: '2.44',
    circulating_supply: 92000000,
    total_volume: 4700000,
  },
  {
    symbol: 'IBERDROLA',
    market_cap_rank: '4',
    image: <IberdrolaIcon />,
    name: 'Iberdrola',
    current_price: 15.49,
    price_change_percentage_1h_in_currency: '-0.15',
    price_change_percentage_24h_in_currency: '1.79',
    circulating_supply: 850000000,
    total_volume: 10200000,
  },
  {
    symbol: 'AAPL',
    market_cap_rank: '5',
    image: <AppleIcon />,
    name: 'Apple',
    current_price: 198.53,
    price_change_percentage_1h_in_currency: '0.53',
    price_change_percentage_24h_in_currency: '1.10',
    circulating_supply: 1650000000,
    total_volume: 48900000,
  },
  {
    symbol: 'TSLA',
    market_cap_rank: '6',
    image: <TeslaIcon />,
    name: 'Tesla',
    current_price: 298.26,
    price_change_percentage_1h_in_currency: '-4.72',
    price_change_percentage_24h_in_currency: '6.30',
    circulating_supply: 1300000000,
    total_volume: 26500000,
  },
  {
    symbol: 'YPF',
    market_cap_rank: '7',
    image: <YPFIcon />,
    name: 'YPF',
    current_price: 31.00,
    price_change_percentage_1h_in_currency: '2.41',
    price_change_percentage_24h_in_currency: '3.10',
    circulating_supply: 63000000,
    total_volume: 3900000,
  },
  {
    symbol: 'NVIDIA',
    market_cap_rank: '8',
    image: <NVIDIAIcon />,
    name: 'Nvidia',
    current_price: 116.65,
    price_change_percentage_1h_in_currency: '-0.61',
    price_change_percentage_24h_in_currency: '2.50',
    circulating_supply: 900000000,
    total_volume: 22300000,
  },
  {
    symbol: 'JPM',
    market_cap_rank: '9',
    image: <JPMIcon />,
    name: 'J.P. Morgan',
    current_price: 147.28,
    price_change_percentage_1h_in_currency: '0.94',
    price_change_percentage_24h_in_currency: '1.55',
    circulating_supply: 450000000,
    total_volume: 15700000,
  },
  {
    symbol: 'BBVA',
    market_cap_rank: '10',
    image: <BBVAIcon />,
    name: 'BBVA',
    current_price: 12.81,
    price_change_percentage_1h_in_currency: '0.04',
    price_change_percentage_24h_in_currency: '1.50',
    circulating_supply: 650000000,
    total_volume: 8700000,
  },
  {
    symbol: 'PEMEX',
    market_cap_rank: '11',
    image: <PEMEXIcon />,
    name: 'PEMEX',
    current_price: 57.46,
    price_change_percentage_1h_in_currency: '1.22',
    price_change_percentage_24h_in_currency: '3.15',
    circulating_supply: 38000000,
    total_volume: 4150000,
  },
  {
    symbol: 'GOLD',
    market_cap_rank: '12',
    image: <GOLDIcon />,
    name: 'Oro',
    current_price: 3324.39,
    price_change_percentage_1h_in_currency: '-0.27',
    price_change_percentage_24h_in_currency: '1.10',
    circulating_supply: 2900000000,
    total_volume: 42000000,
  },
  {
    symbol: 'NATGAS',
    market_cap_rank: '13',
    image: <NATGASicon />,
    name: 'Gas Natural',
    current_price: 3.7055,
    price_change_percentage_1h_in_currency: '4.65',
    price_change_percentage_24h_in_currency: '5.20',
    circulating_supply: 2900000000,
    total_volume: 42000000,
  },
  {
    symbol: 'BRENT',
    market_cap_rank: '14',
    image: <BRENTicon />,
    name: 'Petróleo Brent',
    current_price: 64.42,
    price_change_percentage_1h_in_currency: '-1.05',
    price_change_percentage_24h_in_currency: '2.00',
    circulating_supply: 920000000,
    total_volume: 7400000,
  },
  {
    symbol: 'EUR/USD',
    market_cap_rank: '15',
    image: <EUROicon />,
    name: 'Euro/Dólar',
    current_price: 1.08,
    price_change_percentage_1h_in_currency: '0.10',
    price_change_percentage_24h_in_currency: '0.50',
    circulating_supply: 1200000000,
    total_volume: 50000000,
  },
];

/*export const CoinPriceData = [
  {
    symbol: 'BTC',
    market_cap_rank: '1',
    image: <Bitcoin />,
    name: 'Bitcoin',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '-0.5',
    price_change_percentage_24h_in_currency: '-4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Ethereum',
    market_cap_rank: '2',
    image: <Ethereum />,
    name: 'Ethereum',
    current_price: 1719.3,
    price_change_percentage_1h_in_currency: '-0.3',
    price_change_percentage_24h_in_currency: '-2.9',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Cardano',
    market_cap_rank: '3',
    image: <Cardano />,
    name: 'Cardano',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Doge',
    market_cap_rank: '4',
    image: <Doge />,
    name: 'Doge',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Bnb',
    market_cap_rank: '5',
    image: <Bnb />,
    name: 'Bnb',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Tether',
    market_cap_rank: '6',
    image: <Tether />,
    name: 'Tether',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Usdc',
    market_cap_rank: '7',
    image: <Usdc />,
    name: 'Usdc',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'BTC',
    market_cap_rank: '8',
    image: <Bitcoin />,
    name: 'Bitcoin',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '-0.5',
    price_change_percentage_24h_in_currency: '-4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Ethereum',
    market_cap_rank: '9',
    image: <Ethereum />,
    name: 'Ethereum',
    current_price: 1719.3,
    price_change_percentage_1h_in_currency: '-0.3',
    price_change_percentage_24h_in_currency: '-2.9',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Cardano',
    market_cap_rank: '10',
    image: <Cardano />,
    name: 'Cardano',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Doge',
    market_cap_rank: '11',
    image: <Doge />,
    name: 'Doge',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Bnb',
    market_cap_rank: '12',
    image: <Bnb />,
    name: 'Bnb',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Tether',
    market_cap_rank: '13',
    image: <Tether />,
    name: 'Tether',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Usdc',
    market_cap_rank: '14',
    image: <Usdc />,
    name: 'Usdc',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'BTC',
    market_cap_rank: '15',
    image: <Bitcoin />,
    name: 'Bitcoin',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '-0.5',
    price_change_percentage_24h_in_currency: '-4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Ethereum',
    market_cap_rank: '16',
    image: <Ethereum />,
    name: 'Ethereum',
    current_price: 1719.3,
    price_change_percentage_1h_in_currency: '-0.3',
    price_change_percentage_24h_in_currency: '-2.9',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Cardano',
    market_cap_rank: '17',
    image: <Cardano />,
    name: 'Cardano',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Doge',
    market_cap_rank: '17',
    image: <Doge />,
    name: 'Doge',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Bnb',
    market_cap_rank: '19',
    image: <Bnb />,
    name: 'Bnb',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Tether',
    market_cap_rank: '20',
    image: <Tether />,
    name: 'Tether',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
  {
    symbol: 'Usdc',
    market_cap_rank: '21',
    image: <Usdc />,
    name: 'Usdc',
    current_price: 26861.75,
    price_change_percentage_1h_in_currency: '0.5',
    price_change_percentage_24h_in_currency: '4.0',
    circulating_supply: 19330475,
    total_volume: 21000000,
  },
];*/

export const CoinMarketData = [
  {
    id: 1,
    coin: {
      icon: <Bitcoin />,
      name: 'Bitcoin',
      symbol: 'BTC',
    },
    prices: 218.56,
    plus_depth: 2405540.02,
    minus_depth: 2405540.02,
    volume: 154327864,
    volume_per: '14.72%',
    confidence: 'High',
    liquidity: '736',
    updated: 'Recently',
  },
  {
    id: 2,
    coin: { icon: <Ethereum />, symbol: 'ETH', name: 'Ethereum' },
    prices: 218.56,
    plus_depth: 2405540.02,
    minus_depth: 2405540.02,
    volume: 154327864,
    volume_per: '14.72%',
    confidence: 'High',
    liquidity: '736',
    updated: 'Recently',
  },
  {
    id: 3,
    coin: { icon: <Tether />, symbol: 'USDT', name: 'Tether USD' },
    prices: 218.56,
    plus_depth: 2405540.02,
    minus_depth: 2405540.02,
    volume: 154327864,
    volume_per: '14.72%',
    confidence: 'High',
    liquidity: '736',
    updated: 'Recently',
  },
  {
    id: 4,
    coin: { icon: <Bnb />, symbol: 'BNB', name: 'Binance Coin' },
    prices: 218.56,
    plus_depth: 2405540.02,
    minus_depth: 2405540.02,
    volume: 154327864,
    volume_per: '14.72%',
    confidence: 'High',
    liquidity: '736',
    updated: 'Recently',
  },
  {
    id: 5,
    coin: { icon: <Usdc />, symbol: 'USDC', name: 'USD Coin' },
    prices: 218.56,
    plus_depth: 2405540.02,
    minus_depth: 2405540.02,
    volume: 154327864,
    volume_per: '14.72%',
    confidence: 'High',
    liquidity: '736',
    updated: 'Recently',
  },
  {
    id: 6,
    coin: { icon: <Cardano />, symbol: 'ADA', name: 'Cardano' },
    prices: 218.56,
    plus_depth: 2405540.02,
    minus_depth: 2405540.02,
    volume: 154327864,
    volume_per: '14.72%',
    confidence: 'High',
    liquidity: '736',
    updated: 'Recently',
  },
  {
    id: 7,
    coin: { icon: <Doge />, symbol: 'DOGE', name: 'Doge Coin' },
    prices: 218.56,
    plus_depth: 2405540.02,
    minus_depth: 2405540.02,
    volume: 154327864,
    volume_per: '14.72%',
    confidence: 'High',
    liquidity: '736',
    updated: 'Recently',
  },
];

export const CoinHistoryData = [
  {
    date: 'Jun 01, 2022',
    open: '28,041.60',
    high: '28,527.72',
    low: '27,242.88',
    close: '27,767.24',
    volume: '1,062,609,997',
    market_cap: '35,804,105,858',
  },
  {
    date: 'Jun 02, 2022',
    open: '28,041.60',
    high: '28,527.72',
    low: '27,242.88',
    close: '27,767.24',
    volume: '1,062,609,997',
    market_cap: '35,804,105,858',
  },
  {
    date: 'Jun 03, 2022',
    open: '28,041.60',
    high: '28,527.72',
    low: '27,242.88',
    close: '27,767.24',
    volume: '1,062,609,997',
    market_cap: '35,804,105,858',
  },
  {
    date: 'Jun 04, 2022',
    open: '28,041.60',
    high: '28,527.72',
    low: '27,242.88',
    close: '27,767.24',
    volume: '1,062,609,997',
    market_cap: '35,804,105,858',
  },
  {
    date: 'Jun 05, 2022',
    open: '28,041.60',
    high: '28,527.72',
    low: '27,242.88',
    close: '27,767.24',
    volume: '1,062,609,997',
    market_cap: '35,804,105,858',
  },
  {
    date: 'Jun 06, 2022',
    open: '28,041.60',
    high: '28,527.72',
    low: '27,242.88',
    close: '27,767.24',
    volume: '1,062,609,997',
    market_cap: '35,804,105,858',
  },
  {
    date: 'Jun 07, 2022',
    open: '28,041.60',
    high: '28,527.72',
    low: '27,242.88',
    close: '27,767.24',
    volume: '1,062,609,997',
    market_cap: '35,804,105,858',
  },
  {
    date: 'Jun 08, 2022',
    open: '28,041.60',
    high: '28,527.72',
    low: '27,242.88',
    close: '27,767.24',
    volume: '1,062,609,997',
    market_cap: '35,804,105,858',
  },
  {
    date: 'Jun 09, 2022',
    open: '28,041.60',
    high: '28,527.72',
    low: '27,242.88',
    close: '27,767.24',
    volume: '1,062,609,997',
    market_cap: '35,804,105,858',
  },
  {
    date: 'Jun 10, 2022',
    open: '28,041.60',
    high: '28,527.72',
    low: '27,242.88',
    close: '27,767.24',
    volume: '1,062,609,997',
    market_cap: '35,804,105,858',
  },
];
