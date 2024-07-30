import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const API_URL = 'http://localhost:3000'; // URL chính xác của máy chủ

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/orders`)
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Có lỗi xảy ra khi lấy danh sách đơn hàng.');
                setLoading(false);
                console.error('Có lỗi xảy ra khi lấy danh sách đơn hàng:', error);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.productName}</TableCell>
                            <TableCell>{order.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderList;
