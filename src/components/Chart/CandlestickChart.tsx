import React, { useEffect, useRef } from 'react';
import {
    createChart,
    ColorType,
    IChartApi,
    ISeriesApi,
    CandlestickSeriesOptions,
    CandlestickData
} from 'lightweight-charts';

type BarData = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
};

export const CandlestickChart: React.FC<{ data: BarData[] }> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Initialize chart
        chartRef.current = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'white' },
                textColor: '#333',
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });

        // Create candlestick series with proper typing
        const seriesOptions = {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        } as CandlestickSeriesOptions;

        seriesRef.current = (chartRef.current as any).addCandlestickSeries(seriesOptions);
        if (seriesRef.current) {
            // Convert BarData[] to CandlestickData[] with correct time format
            const formattedData = data.map(bar => ({
                ...bar,
                time: typeof bar.time === 'number'
                    ? new Date(bar.time * 1000).toISOString().slice(0, 10) // convert unix timestamp to 'yyyy-mm-dd'
                    : bar.time
            }));
            seriesRef.current.setData(formattedData);
        }

        const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth
                });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
            }
        };
    }, [data]);

    return <div ref={chartContainerRef} className="w-full h-[300px]" />;
};