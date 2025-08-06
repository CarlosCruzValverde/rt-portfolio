import React from 'react';
import { CandlestickChart } from '../components/Chart/CandlestickChart';
import { VirtualizedGrid } from '../components/DataGrid/VirtualizedGrid';
import { LLMSummary } from '../components/Summary/LLMSummary';
import { useData } from '../contexts/DataContext';
import { convertToCandlestickData } from '../utils/finance';

export const Dashboard: React.FC = () => {
    const { stocks } = useData();
    const candlestickData = convertToCandlestickData(stocks.slice(0, 50)); // Sample for chart

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Portfolio Analytics</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <h2 className="font-semibold mb-4">Price Movement (AAPL)</h2>
                        <CandlestickChart data={candlestickData} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <LLMSummary />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="font-semibold mb-4">Portfolio Holdings</h2>
                        <VirtualizedGrid stocks={stocks} />
                    </div>
                </div>
            </div>
        </div>
    );
};