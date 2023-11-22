import React, { useState, useEffect } from 'react'
import { getToken } from "../../Utilitys/helpers";
import axios from "axios";
import Loader from '../Layout/Loader';

import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DProductSale({ data }) {
    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const pieColors = [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF"
    ]
    // console.log(data)

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${percent}%`}
            </text>
        );
    };
    const productSales = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.get(`http://localhost:4000/api/v1/admin/product-sales`, config)
            setSales(data.totalPercentage)
            console.log(data.totalPercentage)
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)
            
        }
    }
    useEffect(() => {
        productSales()
    }, [])


    return (
        <ResponsiveContainer width="100%" height="100%">
           {loading ? <Loader /> :  <PieChart width={10} height={10}>
           <Pie
    dataKey="percent"
    nameKey="name"
    isAnimationActive={true}
    data={sales}
    cx="50%"
    cy="50%"
    outerRadius={80} // Adjust this value as needed
    fill="#8884d8"
    label={renderCustomizedLabel}
    labelLine={false}
  >  {
                        sales.map((entry, index) => <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="top" align="center" />
            </PieChart>}
        </ResponsiveContainer>


    );
}