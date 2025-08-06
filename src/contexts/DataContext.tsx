import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { generateMockData } from '../utils/mockData';

export type StockData = {
    ticker: string;
    price: number;
    change: number;
    lastUpdated: Date;
};

type DataContextType = {
    stocks: StockData[];
};

export const DataContext = createContext<DataContextType>({ stocks: [] });

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [stocks, setStocks] = useState<StockData[]>(generateMockData());

    useEffect(() => {
        const interval = setInterval(() => {
            setStocks(prev => prev.map(stock => ({
                ...stock,
                price: stock.price * (1 + (Math.random() - 0.5) * 0.01), // ±1%
                lastUpdated: new Date()
            })));
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return <DataContext.Provider value={{ stocks }}>{children}</DataContext.Provider>;
};

// Add this custom hook at the bottom of the file
export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};