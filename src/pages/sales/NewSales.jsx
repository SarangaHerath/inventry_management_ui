import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

const NewSales = () => {
  const [saleData, setSaleData] = useState({
    customerId: '',
    productIds: [],
    paymentMethodId: '',
    discountId: '',
  });

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleInputChange = (field) => (event) => {
    setSaleData({ ...saleData, [field]: event.target.value });
  };

  const handleProductIdsChange = (event) => {
    const selectedProductIds = event.target.value;
    setSaleData({ ...saleData, productIds: selectedProductIds });

    // Fetch and update product details based on selected product IDs
    // (You should replace this with your actual logic to fetch product details from the server)
    const updatedSelectedProducts = selectedProductIds.map((productId) => {
      return {
        productId,
        productName: `Product ${productId}`, // Replace with actual product name
        unitPrice: 10.0, // Replace with actual unit price
        quantity: 1, // Default to 1 quantity
        total: 10.0, // Default to unit price
      };
    });

    setSelectedProducts(updatedSelectedProducts);
  };

  const handleQuantityChange = (productId) => (event) => {
    const updatedSelectedProducts = selectedProducts.map((product) => {
      if (product.productId === productId) {
        const quantity = parseInt(event.target.value, 10) || 0;
        const total = quantity * product.unitPrice;
        return { ...product, quantity, total };
      }
      return product;
    });

    setSelectedProducts(updatedSelectedProducts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send data to the server)
    console.log('Sale Data:', saleData);
    console.log('Selected Products:', selectedProducts);
    // Add your logic to send the data to the server
  };

  return (
    <div>
      <h2>Add New Sale</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Customer ID</InputLabel>
              <Select
                label="Customer ID"
                value={saleData.customerId}
                onChange={handleInputChange('customerId')}
              >
                {/* Replace with your customer options */}
                <MenuItem value={1}>Customer 1</MenuItem>
                <MenuItem value={2}>Customer 2</MenuItem>
                {/* Add more items as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Payment Method ID</InputLabel>
              <Select
                label="Payment Method ID"
                value={saleData.paymentMethodId}
                onChange={handleInputChange('paymentMethodId')}
              >
                {/* Replace with your payment method options */}
                <MenuItem value={1}>Payment Method 1</MenuItem>
                <MenuItem value={2}>Payment Method 2</MenuItem>
                {/* Add more items as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Product IDs</InputLabel>
              <Select
                label="Product IDs"
                multiple
                value={saleData.productIds}
                onChange={handleProductIdsChange}
              >
                {/* Replace with your product options */}
                <MenuItem value={1}>Product 1</MenuItem>
                <MenuItem value={2}>Product 2</MenuItem>
                {/* Add more items as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Sale
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Display selected products in a table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProducts.map((product) => (
              <TableRow key={product.productId}>
                <TableCell>{product.productId}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.unitPrice}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={product.quantity}
                    onChange={handleQuantityChange(product.productId)}
                  />
                </TableCell>
                <TableCell>{product.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NewSales;
