// NewSales.jsx

import React, { useState } from 'react';
import './NewSales.scss'; // Import the SCSS file
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, MenuItem, Button, Dialog, Grow } from '@mui/material';
import { Label } from 'recharts';
import { AddNewProducts } from '../products/AddNewProducts';
import { AddNewShop } from '../shop/AddNewShop';
import { ChequeDetails } from '../../components/chequeDetails/ChequeDetails';
import { CalendarViewDay } from '@mui/icons-material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const getCustomerDetails = (customerId) => {
  // Fetch customer details based on the customerId
  // Implement this function
  return {
    name: 'John Doe',
    address: '123 Main St',
    phone: '123-456-7890',
  };
};

export const NewSales = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [saleData, setSaleData] = useState({
    customerId: '',
    productIds: [],
    paymentMethodId: '',
    discountId: '',
  });
  const handleCustomerChange = (event) => {
    const customerId = event.target.value;
    const customerDetails = getCustomerDetails(customerId);
    setSelectedCustomer(customerDetails);
    setSaleData({ ...saleData, customerId });
  };
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleInputChange = (field) => (event) => {
    setSaleData({ ...saleData, [field]: event.target.value });
  };

  const handleProductIdsChange = (event) => {
    const selectedProductIds = event.target.value;
  
    // Map selected product IDs to actual product details
    const updatedSelectedProducts = selectedProductIds.map((productId) => {
      const existingProduct = selectedProducts.find((product) => product.productId === productId);
  
      if (existingProduct) {
        return existingProduct; // Use existing product details
      } else {
        // If the product is not found in the existing products, create a new one
        return {
          productId,
          productName: `Product ${productId}`,
          unitPrice: 10.0,
          quantity: 1,
          total: 10.0,
        };
      }
    });
  
    setSaleData({ ...saleData, productIds: selectedProductIds });
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
  const [open, setOpen] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [openCheque, setOpenCheque] = useState(false);

const handleOpen = () => {
  setOpen(true);
};
const handleOpenShop = () => {
  setOpenShop(true);
};
const handleOpenCheque = () => {
  setOpenCheque(true);
};
const handleClose = () => {
  setOpen(false);
  setOpenShop(false);
  setOpenCheque(false)
};

const handleAddProduct = async () => {
  // Add logic to handle adding a product
  // ...
  // After adding the product, close the modal
  handleClose();
};
const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  return (
    <div className="container1">
      <div className="left-side">
        <div className="form">
          {/* First input field with button */}
          <div className="form-input">
            <div className='form-input-customer'>
            <TextField
              id="outlined-select-currency1"
              select
              label="Select Customer"
              defaultValue="EUR"
              size='small'
              value={saleData.customerId}
              onChange={handleCustomerChange}
            >
               <MenuItem value={1}>Customer 1</MenuItem>
                <MenuItem value={2}>Customer 2</MenuItem>
            </TextField>
            <Button onClick={handleOpenShop}>New +</Button>
            </div>
            {selectedCustomer && (
              <div className='customer-details'>
                <span>Customer Name: {selectedCustomer.name}</span>
                <span>Customer Address: {selectedCustomer.address}</span>
                <span>Phone: {selectedCustomer.phone}</span>
              </div>
            )}
          </div>

          {/* Second input field with button */}
          <div className="form-input">
            <div className="form-input-product">
                          <TextField
                id="outlined-select-currency2"
                select
                label="Select Product"
              
                size='small'
                value={saleData.productIds}
                onChange={handleProductIdsChange}
                SelectProps={{
                  multiple: true,
                }}
              >
              <MenuItem value={1}>Product 1</MenuItem>
              <MenuItem value={2}>Product 2</MenuItem>
              <MenuItem value={3}>Product 2</MenuItem>
              <MenuItem value={4}>Product 2</MenuItem>
              <MenuItem value={5}>Product 2</MenuItem>
              <MenuItem value={6}>Product 2</MenuItem>
              <MenuItem value={7}>Product 2</MenuItem>
              <MenuItem value={8}>Product 2</MenuItem>
              <MenuItem value={9}>Product 2</MenuItem>
              <MenuItem value={10}>Product 2</MenuItem>
              <MenuItem value={11}>Product 2</MenuItem>
              <MenuItem value={12}>Product 2</MenuItem>
              <MenuItem value={13}>Product 2</MenuItem>
              <MenuItem value={14}>Product 2</MenuItem>
              <MenuItem value={15}>Product 2</MenuItem>
              <MenuItem value={16}>Product 2</MenuItem>
              <MenuItem value={17}>Product 2</MenuItem>
            </TextField>

            <Button onClick={handleOpen}>New +</Button>

                </div>
            <div className='product-details'>
           
              <span>{formattedDate}</span> <CalendarMonthIcon />
            </div>
          </div>
        </div>
        <div className="table">
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
        </div>
      </div>
      <div className="right-side">
          <div>
        
          <div className="form-input">
          <span className='sub-title' style={{marginBottom:"10px"}}>Additionals</span>
            <div className="form-input-product">
              <TextField
              id="outlined"
              type='number'
              label="Discount Price"
              size='small'
              fullWidth
            />
           
            </div>
          </div>
          <div className="form-input">
            
            <div className="form-input-product">
                    <TextField
                      type='number'
                      id="outlined"
                      label="Free Items Price"
                      fullWidth
                      size='small'
                   />
            </div>
          </div>
          <div className="form-input">
            
            <div className="form-input-product">
                    <TextField
                      type='number'
                      id="outlined"
                      label="Return Items Price"
                      fullWidth
                      size='small'
                   />
            </div>
          </div>
          
           
            <div className="form-input">
            <span className='sub-title' style={{marginBottom:"10px",marginTop:'20px',textAlign:'start'}}>Payment Types</span>
            <div className="form-input-product">
              <Button onClick={handleOpenCheque}>Add Cheque Details</Button>
            </div>
           
          </div>
          
          <div className="form-input">
          <div className="form-input-product">
                    <TextField
                      type='number'
                      id="outlined"
                      label="Cheque Value"
                      fullWidth
                      size='small'
                   />
            </div>
          </div>
          <div className="form-input">
          <div className="form-input-product">
                    <TextField
                      type='number'
                      id="outlined"
                      label="Creadit Value"
                      fullWidth
                      size='small'
                   />
            </div>
          </div>
          <div className="form-input">
          <div className="form-input-product">
                    <TextField
                      type='number'
                      id="outlined"
                      label="Cash Value"
                      fullWidth
                      size='small'
                   />
            </div>
          </div>
          </div>
       {/* ////////////////////////////////////////////// */}
          <div>
         
          <div className="form-input">
          <span className='sub-title' style={{marginBottom:"10px"}}>Total</span>
            <div className="form-input-product">
              <TextField
              id="outlined"
              type='number'
              label="Total"
              size='small'
              fullWidth
            />
           
            </div>
          </div>
          <div className="form-input">
         
            <div className="form-input-product">
            <Button style={{backgroundColor:"#186bfa",color:'white'}}>Add Sale</Button>
           
            </div>
          </div>
          </div>
      </div>
      <Dialog open={open} onClose={handleClose}TransitionComponent={Grow}
        transitionDuration={500} >
        <AddNewProducts></AddNewProducts>
    </Dialog>
    <Dialog open={openShop} onClose={handleClose}TransitionComponent={Grow}
        transitionDuration={500} >
       <AddNewShop></AddNewShop>
    </Dialog>
    <Dialog open={openCheque} onClose={handleClose}TransitionComponent={Grow}
        transitionDuration={500} >
          <ChequeDetails></ChequeDetails>
    </Dialog>
    </div>
  );
};
