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
  Divider,
} from '@mui/material';
import './newSales.scss'
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

    const updatedSelectedProducts = selectedProductIds.map((productId) => {
      return {
        productId,
        productName: `Product ${productId}`,
        unitPrice: 10.0,
        quantity: 1,
        total: 10.0,
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
    console.log('Sale Data:', saleData);
    console.log('Selected Products:', selectedProducts);
  };

  return (
    <div>
      <h2>Add New Sale</h2>
      <form onSubmit={handleSubmit}>
    
        <Grid container spacing={2} className='grid'>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined" className="formControl">
              <InputLabel>Customer ID</InputLabel>
              <Select
                label="Customer ID"
                value={saleData.customerId}
                onChange={handleInputChange('customerId')}
                size="small"
                id="filled-hidden-label-small"
                defaultValue="Small"
              >
                <MenuItem value={1}>Customer 1</MenuItem>
                <MenuItem value={2}>Customer 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2} className="addButton">
            <FormControl fullWidth variant="outlined">
              <Button variant="outlined" color="primary" padding="10px">
                New Customer
              </Button>
            </FormControl>
          </Grid>
          <Divider />
 
        </Grid>
        <Grid container spacing={2} className='grid'>
        <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Product IDs</InputLabel>
              <Select
                label="Product IDs"
                multiple
                value={saleData.productIds}
                onChange={handleProductIdsChange}
                size="small"
                id="filled-hidden-label-small"
                defaultValue="Small"
              >
                <MenuItem value={1}>Product 1</MenuItem>
                <MenuItem value={2}>Product 2</MenuItem>
              </Select>
            </FormControl>
            </Grid>
          </Grid>
      </form>

      {/* Display selected products in a table */}
      <TableContainer style={{ maxHeight: '300px', overflowY: 'auto' }} className="tableContainer">
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
                  <input type="number"
                    value={product.quantity}
                    onChange={handleQuantityChange(product.productId)}></input>
                  {/* <TextField
                    
                    size="small"
              id="filled-hidden-label-small"
              defaultValue="Small"
                  /> */}
                </TableCell>
                <TableCell>{product.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="fixedInputSection">
        <Grid container spacing={2} className='grid'>
          <Grid item xs={12} sm={1}>
            <TextField
              label="Discount ID"
              fullWidth
              variant="outlined"
              value={saleData.discountId}
              onChange={handleInputChange('discountId')}
              padding={0}
              size="small"
              id="filled-hidden-label-small"
              defaultValue="Small"
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              label="Other Input"
              fullWidth
              variant="outlined"
              size="small"
              id="filled-hidden-label-small"
              defaultValue="Small"
              // Add other input fields as needed
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              label="Other Input"
              fullWidth
              variant="outlined"
              size="small"
              id="filled-hidden-label-small"
              defaultValue="Small"
              // Add other input fields as needed
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              label="Other Input"
              fullWidth
              variant="outlined"
              size="small"
              id="filled-hidden-label-small"
              defaultValue="Small"
              // Add other input fields as needed
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              label="Other Input"
              fullWidth
              variant="outlined"
              size="small"
              id="filled-hidden-label-small"
              defaultValue="Small"
              // Add other input fields as needed
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button type="button" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NewSales;
