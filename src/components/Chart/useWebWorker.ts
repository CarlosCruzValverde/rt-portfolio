import React from 'react';

// Simple Web Worker wrapper
export const useSharpeRatioWorker = (returns: number[]) => {
    const [ratio, setRatio] = React.useState<number | null>(null);

    React.useEffect(() => {
        const worker = new Worker(new URL('../../workers/sharpeRatio.ts', import.meta.url));
        worker.postMessage(returns);
        worker.onmessage = (e) => setRatio(e.data);
        return () => worker.terminate();
    }, [returns]);

    return ratio;
};

// worker/sharpeRatio.ts:
self.onmessage = (e: MessageEvent<number[]>) => {
    const returns = e.data;
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const stdDev = Math.sqrt(returns.map(x => Math.pow(x - avgReturn, 2)).reduce((a, b) => a + b) / returns.length);
    postMessage(avgReturn / stdDev); // Simplified Sharpe ratio
};