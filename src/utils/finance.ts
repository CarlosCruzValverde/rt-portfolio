import { StockData } from '../contexts/DataContext';

export interface BarData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export const convertToCandlestickData = (
    stocks: StockData[],
    timeWindow = 30
): BarData[] => {
    const now = Date.now() / 1000; // Current time in seconds
    return stocks.slice(0, timeWindow).map((stock, i) => ({
        time: now - (timeWindow - i) * 86400, // Spread data over last N days
        open: stock.price * 0.99, // Simulate opening price
        close: stock.price, // Use current price as closing price
        high: stock.price * 1.01, // Simulate daily high
        low: stock.price * 0.98, // Simulate daily low
    }));
};