// NewSales.jsx

import React, { useEffect, useState } from 'react';
import './NewSales.scss'; // Import the SCSS file
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, MenuItem, Button, Dialog, Grow } from '@mui/material';
import { Label } from 'recharts';
import { AddNewProducts } from '../products/AddNewProducts';
import { AddNewShop } from '../shop/AddNewShop';
import { ChequeDetails } from '../../components/chequeDetails/ChequeDetails';
import { CalendarViewDay } from '@mui/icons-material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from 'axios';


export const NewSales = () => {
  const [shopOptions, setShopOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [shopDetails, setShopDetails] = useState(null);
  const [saleData, setSaleData] = useState({
    customerId: '',
    productIds: [],
    paymentMethodId: '',
    discountId: '',
  });
  const fetchShops = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/shop/all");
      const shopData = response.data;

      const shopOptions = shopData.map((shop) => (
        <MenuItem key={shop.shopId} value={shop.shopId}>
          {shop.shopName}
        </MenuItem>
      ));

      setShopOptions(shopOptions);
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  };

  const fetchShopDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/shop/get-by-id/${id}`);
      const shopDetailsData = response.data;
      setShopDetails(shopDetailsData);
    } catch (error) {
      console.error("Error fetching shop details:", error);
    }
  };
console.log(shopDetails)
  const handleCustomerChange = (event) => {
    const selectedShopId = event.target.value;
    setSelectedShop(selectedShopId)
    fetchShopDetails(selectedShopId);
  };

  useEffect(() => {
    fetchShops();
  }, []);
//////////////////////product/////////////////////////////////////////
const fetchProduct = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/product/all");
    const productData = response.data;

    const productOptions = productData.map((product) => (
      <MenuItem key={product.productId} value={product.productId}>
        {product.productName}
      </MenuItem>
    ));

    setProductOptions(productOptions);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};
console.log(productOptions)
useEffect(() => {
  fetchProduct();
}, []);
const [selectedProducts,setSelectedProducts]=useState([])
const [productDetails,serProductDetails]=useState([])
const handleProductIdsChange = (event) => {
  const selectedProductIds = event.target.value;

  const updatedSelectedProducts = selectedProductIds.map((productId) => {
    const selectedProduct = productDetails.find((product) => product.productId === productId);

    return selectedProduct || { productId, productName: '', unitPrice: 0, quantity: 0, total: 0 };
  });

  setSelectedProducts(updatedSelectedProducts);
  setQuantityValues({}); // Reset quantity values when product selection changes
};

const handleQuantityChange = (productId) => (event) => {
  const newQuantity = parseInt(event.target.value, 10);

  setQuantityValues((prevQuantityValues) => ({
    ...prevQuantityValues,
    [productId]: newQuantity,
  }));

  // Update total value based on quantity
  const updatedSelectedProducts = selectedProducts.map((product) => {
    if (product.productId === productId) {
      return {
        ...product,
        quantity: newQuantity,
        total: newQuantity * product.unitPrice,
      };
    }
    return product;
  });

  setSelectedProducts(updatedSelectedProducts);
};



///////////////////////////////////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [openCheque, setOpenCheque] = useState(false);
  const [checkAmount, setCheckAmount] = useState(null);

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

const handleCloseCheque = (checkAmount) => {
  setOpenCheque(false);
  setCheckAmount(checkAmount);
  // Use the check amount as needed in the NewSales component
  console.log('Received check amount in NewSales:', checkAmount);
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
            {shopOptions && (
        <TextField
          id="outlined-select-currency1"
          select
          label="Select Shop"
          defaultValue=""
          size="small"
          value={selectedShop}
          onChange={handleCustomerChange}
        >
          {shopOptions.map((option) => (
            <MenuItem key={option.props.value} value={option.props.value}>
              {option.props.children}
            </MenuItem>
          ))}
        </TextField>
      )}

      <Button onClick={handleOpenShop}>New +</Button>
            </div>
            {selectedShop && shopDetails && (
  <div className='customer-details'>
   
    <div> <span>{shopDetails.shopName} | {shopDetails.phoneNumber}</span></div>
    <span>{shopDetails.address}</span>
  
  </div>
)}

          </div>

          {/* Second input field with button */}
          <div className="form-input">
            <div className="form-input-product">
            {productOptions && (
              <TextField
  id="outlined-select-currency2"
  select
  label="Select Product"
  size="small"
  value={selectedProducts.map((product) => product.productId)}
  onChange={handleProductIdsChange}
  SelectProps={{
    multiple: true,
  }}
  disabled={!selectedShop}
>

    {productOptions.map((option) => (
      <MenuItem key={option.props.value} value={option.props.value}>
        {option.props.children}
      </MenuItem>
    ))}
  </TextField>
)}

            <Button onClick={handleOpen} disabled={!selectedShop}>New +</Button>

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
              disabled={!selectedShop}
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
                      disabled={!selectedShop}
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
                      disabled={!selectedShop}
                   />
            </div>
          </div>
            <div className="form-input">
            <span className='sub-title' style={{marginBottom:"10px",marginTop:'20px',textAlign:'start'}}>Payment Types</span>
            <div className="form-input-product">
              <Button onClick={handleOpenCheque} disabled={!selectedShop}>Add Cheque Details</Button>
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
              value={checkAmount !== null ? checkAmount : ''} // Display the check amount or an empty string
              disabled // Disable the TextField if you want it to be read-only
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
                      disabled={!selectedShop}
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
                      disabled={!selectedShop}
                   />
            </div>
          </div>
          </div>
       {/* ////////////////////////////////////////////// */}
          <div>
         
          <div className="form-input">
          <span className='sub-title' style={{marginBottom:"15px"}}>Total</span>
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
    <Dialog open={openCheque}onClose={() => handleCloseCheque(null)}TransitionComponent={Grow}
        transitionDuration={500} >
            <ChequeDetails shopId={selectedShop} onClose={handleCloseCheque}/>
    </Dialog>
    </div>
  );
};
