import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { StockData } from '../../contexts/DataContext';

const Row: React.FC<{
    index: number;
    style: React.CSSProperties;
    data: StockData[];
}> = ({ index, style, data }) => {
    const stock = data[index];
    const color = stock.change >= 0 ? 'text-green-600' : 'text-red-600';

    return (
        <div style={style} className={`flex justify-between px-4 py-2 ${index % 2 ? 'bg-gray-50' : ''}`}>
            <span className="font-mono">{stock.ticker}</span>
            <span className={`font-mono ${color}`}>
                {stock.price.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%)
            </span>
        </div>
    );
};

export const VirtualizedGrid: React.FC<{ stocks: StockData[] }> = ({ stocks }) => (
    <List
        height={400}
        itemCount={stocks.length}
        itemSize={50}
        width="100%"
        itemData={stocks}
    >
        {Row}
    </List>
);