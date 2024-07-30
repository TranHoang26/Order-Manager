import React, { useState } from 'react';
import SearchOrders from './components/SearchOrders';
import OrderList from './components/OrderList';
import AddOder from './components/AddOder';
import { Container, Button } from '@mui/material';

const App = () => {
    const [searchParams, setSearchParams] = useState({});
    const [showAddProduct, setShowAddProduct] = useState(false);

    const handleSearch = (params) => {
        setSearchParams(params);
    };

    const handleAddProduct = (newProduct) => {
        // Cập nhật trạng thái hoặc thực hiện các hành động cần thiết khi thêm sản phẩm mới
        setShowAddProduct(false);
    };

    return (
        <Container>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAddProduct(!showAddProduct)}
            >
                {showAddProduct ? 'Quay về' : 'Thêm sản phẩm'}
            </Button>
            {showAddProduct ? (
                <AddOder onAddProduct={handleAddProduct} />
            ) : (
                <>
                    <SearchOrders onSearch={handleSearch} />
                    <OrderList searchParams={searchParams} />
                </>
            )}
        </Container>
    );
};

export default App;
