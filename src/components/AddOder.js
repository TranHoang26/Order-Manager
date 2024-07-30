// import React, { useState } from 'react';
// import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
// import axios from 'axios';
//
// const AddOder = ({ onAddProduct }) => {
//     const [productCode, setProductCode] = useState('');
//     const [productName, setProductName] = useState('');
//     const [price, setPrice] = useState('');
//     const [category, setCategory] = useState('');
//     const [error, setError] = useState('');
//
//     const handleAddProduct = () => {
//         if (!productCode || !productName || !price || !category) {
//             setError('Tất cả các trường đều bắt buộc.');
//             return;
//         }
//
//         if (parseFloat(price) <= 0) {
//             setError('Giá phải lớn hơn 0.');
//             return;
//         }
//
//         const newProduct = {
//             code: productCode,
//             name: productName,
//             price: parseFloat(price),
//             category: category
//         };
//
//         axios.post('http://localhost:3000/products', newProduct)
//             .then(response => {
//                 onAddProduct(response.data);
//                 setProductCode('');
//                 setProductName('');
//                 setPrice('');
//                 setCategory('');
//                 setError('');
//             })
//             .catch(error => {
//                 console.error('Có lỗi xảy ra khi thêm sản phẩm:', error);
//                 setError('Có lỗi xảy ra khi thêm sản phẩm.');
//             });
//     };
//
//     return (
//         <div>
//             <TextField
//                 label="Mã sản phẩm"
//                 value={productCode}
//                 onChange={(e) => setProductCode(e.target.value)}
//                 fullWidth
//                 margin="normal"
//             />
//             <TextField
//                 label="Tên sản phẩm"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 fullWidth
//                 margin="normal"
//             />
//             <TextField
//                 label="Giá"
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 fullWidth
//                 margin="normal"
//             />
//             <FormControl fullWidth margin="normal">
//                 <InputLabel id="category-select-label">Loại sản phẩm</InputLabel>
//                 <Select
//                     labelId="category-select-label"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     label="Loại sản phẩm"
//                 >
//                     <MenuItem value="Điện thoại">Điện thoại</MenuItem>
//                     <MenuItem value="Máy tính">Máy tính</MenuItem>
//                     <MenuItem value="Phụ kiện">Phụ kiện</MenuItem>
//                 </Select>
//             </FormControl>
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//             <Button variant="contained" color="primary" onClick={handleAddProduct}>
//                 Thêm sản phẩm
//             </Button>
//         </div>
//     );
// };
//
// export default AddOder;


import React, { useState } from 'react';
import axios from 'axios';

const AddOrder = () => {
    // State để quản lý các giá trị của form
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [status, setStatus] = useState('pending');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/orders', {
                productId,
                quantity,
                customerName,
                status
            });
            setSuccess('Order added successfully!');
            setError('');
            // Reset form sau khi thành công
            setProductId('');
            setQuantity('');
            setCustomerName('');
            setStatus('pending');
        } catch (error) {
            // Xử lý lỗi
            setError('Failed to add order. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="container">
            <h2>Add Order</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="productId">Product ID</label>
                    <input
                        type="text"
                        id="productId"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="customerName">Customer Name</label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-control"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="shipped">Shipped</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Order</button>
            </form>
        </div>
    );
};

export default AddOrder;
