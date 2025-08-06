import React, { useContext } from 'react';
import { CandlestickChart } from '../components/Chart/CandlestickChart';
import { DataContext } from '../contexts/DataContext';
import ErrorBoundary from '../components/ErrorBoundary';


const Dashboard: React.FC = () => {
    const { data, isLoading, error } = useContext(DataContext);

    // Debugging: Log data to verify it's loaded correctly
    console.log('Dashboard data:', data);

    // Handle loading/error states
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded">
                Error loading data: {error.message}
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="p-4 bg-yellow-100 text-yellow-700 rounded">
                No data available. Please check your data source.
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>

            {/* Wrap chart in ErrorBoundary to prevent crashes */}
            <ErrorBoundary fallback={<div className="p-4 bg-red-100 text-red-700 rounded">Chart failed to render</div>}>
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <CandlestickChart data={data} />
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default Dashboard;