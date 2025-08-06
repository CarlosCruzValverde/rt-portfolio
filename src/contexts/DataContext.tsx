import React, { createContext, useState, useEffect } from 'react';

interface DataContextProps {
    data: any[]; // Replace with your data type
    isLoading: boolean;
    error: Error | null;
}

export interface StockData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    ticker: string;
    price: number;
    change: number;
}

export const DataContext = createContext<{
    data: StockData[]; // Replace `any[]` with `StockData[]`
    isLoading: boolean;
    error: Error | null;
}>({
    data: [],
    isLoading: false,
    error: null,
});

interface DataProviderProps {
    children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/mock-data.json');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, isLoading, error }}>
            {children}
        </DataContext.Provider>
    );
};