import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const SearchOrders = ({ onSearch }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    // Fetch the products list when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error);
            });
    }, []);

    // Handle search action
    const handleSearch = () => {
        const searchParams = {
            startDate,
            endDate,
            productId: selectedProduct,
            sortOrder
        };

        // Call the parent component's search function with the search parameters
        onSearch(searchParams);
    };

    // Toggle the sort order and trigger search
    const handleSortChange = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        handleSearch();
    };

    return (
        <div>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="product-select-label">Sản phẩm</InputLabel>
                <Select
                    labelId="product-select-label"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    label="Sản phẩm"
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    {products.map(product => (
                        <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Từ ngày"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Đến ngày"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Tìm kiếm
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleSortChange}
            >
                Sắp xếp theo tổng tiền ({sortOrder === 'asc' ? 'Tăng' : 'Giảm'})
            </Button>
        </div>
    );
};

export default SearchOrders;
