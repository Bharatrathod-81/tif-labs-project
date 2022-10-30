import React, { useState } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';


export const ChartPage = () => {

    const ref = useRef();
    const counterRef = useRef(null);
    const [call, setCall] = useState(false);
    const [city, setCity] = useState("USD");

    useEffect(() => {
        (async () => {
            try {
                    const { data: { getFiveCurrency, date, base } } = await axios.get(`http://localhost:5000/exchange-rate/${city.label}`);
                    
                    const decendingList = getFiveCurrency.sort((a, b) => b.currentValue - a.currentValue);
                    
                    ref.current.props.data.labels = decendingList.map(e => e.name);
                    ref.current.props.data.datasets[0].data = decendingList.map(e => e.highValue.value);
                    ref.current.props.data.datasets[1].data = decendingList.map(e => e.currentValue);
                    ref.current.refresh()
                } catch (err) {
                    console.log(err);
                }
            })();

            clearInterval(counterRef.current)
            counterRef.current = setInterval(() => {
                setCall(!call)
            }, 60000);

    }, [call,city.label]);


    const [basicData] = useState({
        labels: [],
        datasets: [
            {
                label: 'highest value compared to USD',
                backgroundColor: '#42A5F5',
                data: []
            },
            {
                label: 'Current Exchange rate',
                backgroundColor: '#FFA726',
                data: []
            }
        ]
    });

    let basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    const citySelectItems = [
        { label: 'USD' },
        { label: 'INR' },
        { label: 'CNY' },
        { label: 'GBP' },
        { label: 'RUB' }
    ];

    return (
        <div>
            <div className="card">
                <h5>Currency Exchange Rate</h5>
                <div className='flex p-3'>
                    <Dropdown value={city} options={citySelectItems} onChange={(e) => setCity(e.value)} placeholder="USD" />
                </div>
                <Chart type="bar" ref={ref} data={basicData} options={basicOptions} className='pl-1' />
            </div>
        </div>
    )
}