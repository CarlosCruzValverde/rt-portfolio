import { BarData, UTCTimestamp } from 'lightweight-charts';

interface StockData {
    ticker: string;
    price: number;
    change: number; // Percentage
    lastUpdated: Date;
    volume: number;
    sector: string;
}

const SECTORS = [
    'Technology', 'Financial', 'Healthcare',
    'Consumer', 'Energy', 'Utilities'
];

const TICKERS = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META',
    'JPM', 'V', 'WMT', 'XOM', 'TSLA'
];

export const generateMockData = (count = 50): StockData[] => {
    const basePrices: Record<string, number> = {
        AAPL: 180, MSFT: 320, GOOGL: 140, AMZN: 120, META: 300,
        JPM: 160, V: 220, WMT: 60, XOM: 110, TSLA: 250
    };

    return Array.from({ length: count }, (_, i) => {
        const ticker = i < TICKERS.length ? TICKERS[i] : `STK${i + 1}`;
        const basePrice = basePrices[ticker] || Math.random() * 200 + 50;
        const volatility = Math.random() * 0.2 + 0.05; // 5-25% volatility

        // Simulate trending (+/- 10% from base)
        const trend = (Math.random() * 0.2 - 0.1) * basePrice;
        const price = basePrice + trend + (Math.random() - 0.5) * volatility * basePrice;

        return {
            ticker,
            price: parseFloat(price.toFixed(2)),
            change: parseFloat(((price - basePrice) / basePrice * 100).toFixed(2)),
            lastUpdated: new Date(),
            volume: Math.floor(Math.random() * 1e6 + 1e5),
            sector: SECTORS[Math.floor(Math.random() * SECTORS.length)]
        };
    });
};

// For candlestick charts
export const generateCandlestickData = (days = 30): BarData[] => {
    const basePrice = 180;
    return Array.from({ length: days }, (_, i) => {
        const open = basePrice * (0.95 + Math.random() * 0.1);
        const close = open * (0.98 + Math.random() * 0.04);
        const high = Math.max(open, close) * (1 + Math.random() * 0.02);
        const low = Math.min(open, close) * (0.98 - Math.random() * 0.02);

        return {
            time: (Date.now() / 1000 - (days - i) * 86400) as UTCTimestamp,
            open,
            high,
            low,
            close
        };
    });
};