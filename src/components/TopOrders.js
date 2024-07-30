import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from '@mui/material';
import { format } from 'date-fns';

const TopOrders = () => {
    const [topOrders, setTopOrders] = useState([]);

    const fetchTopOrders = () => {
        axios.get('/orders')
            .then(response => {
                const sortedOrders = response.data.sort((a, b) => b.total - a.total);
                setTopOrders(sortedOrders);
            });
    };

    useEffect(() => {
        fetchTopOrders();
    }, []);

    return (
        <div>
            <Button variant="contained" color="primary" onClick={fetchTopOrders}>
                Xem Top Đơn Hàng
            </Button>
            <Table className="my-4">
                <thead>
                <tr>
                    <th>Số thứ tự</th>
                    <th>Mã đơn hàng</th>
                    <th>Tên sản phẩm</th>
                    <th>Ngày mua</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                </tr>
                </thead>
                <tbody>
                {topOrders.map((order, index) => (
                    <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.orderId}</td>
                        <td>{order.productName}</td>
                        <td>{format(new Date(order.purchaseDate), 'dd/MM/yyyy')}</td>
                        <td>{order.price}</td>
                        <td>{order.quantity}</td>
                        <td>{order.total}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TopOrders;
