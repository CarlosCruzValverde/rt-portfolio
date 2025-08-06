import { StockData } from '../contexts/DataContext';

// Example function that now type-checks correctly
export const generateMockData = (stocks: StockData[], timeWindow: number = 30) => {
    const now = Math.floor(Date.now() / 1000);
    return stocks.slice(0, timeWindow).map((stock, i) => ({
        time: now - (timeWindow - i) * 86400,
        open: stock.price * 0.99,    // Now valid
        close: stock.price,          // Now valid
        high: stock.price * 1.01,    // Now valid
        low: stock.price * 0.98,     // Now valid
        ticker: stock.ticker,        // Include if needed
        change: stock.change         // Include if needed
    }));
};