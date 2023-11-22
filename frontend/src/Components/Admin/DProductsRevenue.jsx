import React, { useState, useEffect } from 'react'
import { getToken } from "../../Utilitys/helpers";
import axios from "axios";
import Loader from '../Layout/Loader';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const barColors = ["#0d6efd", "#6610f2", "#6f42c1", "#d63384", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#fff", "#6c757d", "#343a40", "#007bff", "#6c757d", "#28a745", "#17a2b8", "#ffc107", "#dc3545", "#f8f9fa", "#343a40"];
export default function DProductsRevenue({ data }) {
    const [prod, setProd] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const ProdRevenue = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.get(`http://localhost:4000/api/v1/admin/productRevenue`, config)
            setProd(data.sales)
            console.log(data.sales)
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
        }
    }
    useEffect(() => {
        ProdRevenue()

    }, [])

    return (
        <ResponsiveContainer width="100%" height="100%">
        {loading ? <Loader /> : (<BarChart
            data={prod}
        >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalRevenue" >
                {
                    prod.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                    ))
                }
            </Bar>
        </BarChart>)}
      </ResponsiveContainer>


    )
            }