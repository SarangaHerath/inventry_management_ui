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
        {product.productName}-{product.weight}g
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
const [quantityValues, setQuantityValues] = useState({});
const handleProductIdsChange = async (event) => {
  const selectedProductIds = event.target.value;

  const updatedSelectedProducts = selectedProductIds.map(async (productId) => {
    // Fetch product details for each selected product
    const productDetailsResponse = await axios.get(`http://localhost:8080/api/v1/product/get-by-id/${productId}`);
    const productDetailsData = productDetailsResponse.data;
    console.log(productDetailsResponse)
    return {
      productId,
      productName: productDetailsData.productName,
      unitPrice: productDetailsData.unitPrice,
      weight:productDetailsData.weight,
      quantity: quantityValues[productId] || 0,
      total: (quantityValues[productId] || 0) * productDetailsData.unitPrice,
    };
  });

  // Update selected products with details
  setSelectedProducts(await Promise.all(updatedSelectedProducts));
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
////////////////////////////////////////////////////
const [discountItemAmount, setDiscountItemAmount] = useState(0);
const [freeItemAmount, setFreeItemAmount] = useState(0);
const [retunItemAmount, setReturnItemAmount] = useState(0);
const [cashAmount, setCashAmount] = useState(0);
const [creditAmount, setCreditAmount] = useState(0);

const handleCashAmountChange = (event) => {
  const amount = parseFloat(event.target.value) || 0;
  setCashAmount(amount);
};

const handleCreditAmountChange = (event) => {
  const amount = parseFloat(event.target.value) || 0;
  setCreditAmount(amount);
};
const handlediscountItemAmountChange = (event) => {
  const amount = parseFloat(event.target.value) || 0;
  setDiscountItemAmount(amount);
};
  const handleFreeItemAmountChange = (event) => {
    const amount = parseFloat(event.target.value) || 0;
    setFreeItemAmount(amount);
  };
  const handleReturnItemAmountChange = (event) => {
    const amount = parseFloat(event.target.value) || 0;
    setReturnItemAmount(amount);
  };
const calculateTotal = () => {
  const total = selectedProducts.reduce((acc, product) => acc + product.total, 0);
  return total;
};

// Update the total whenever selectedProducts changes
useEffect(() => {
  const total = calculateTotal() + freeItemAmount;
  // Update the state of the Total TextField
  // You might want to format the total value as needed (e.g., round to 2 decimal places)
  // and handle any additional logic related to discounts, free items, etc.
}, [selectedProducts]);


const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  const handleAddSale = async () => {
    try {
      const saleData = {
        shopId: selectedShop,
        total: calculateTotal() + freeItemAmount + discountItemAmount + retunItemAmount,
        returnValue: retunItemAmount,
        date: formattedDate,
        freeItems: freeItemAmount,
        cash: cashAmount,
        credit: creditAmount,
        cheque: checkAmount || 0,
        discount: discountItemAmount,
        salesInvoiceDetails: selectedProducts.map((product) => ({
          id: null, // Assuming the backend generates the ID
          salesInvoiceId: null, // Assuming the backend generates the ID
          product: {
            productId: product.productId,
            productName: product.productName,
            quantity: product.quantity,
            unitPrice: product.unitPrice,
          },
          quantity: product.quantity,
          unitPrice: product.unitPrice,
        })),
      };
  
      console.log("Sale Data:", saleData);
  
      // Make a POST request to your backend API to save the sale
      const response = await axios.post("http://localhost:8080/api/v1/sales-invoices/save", saleData);
  
      // Handle success, e.g., show a success message, reset state, etc.
      console.log("Sale added successfully:", response.data);
  
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error adding sale:", error);
    }
  };
  
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
              <TableCell>Weight</TableCell>
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
                    <TableCell>{product.weight}</TableCell>
                    <TableCell>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={handleQuantityChange(product.productId)}
                      ></input>
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
              name='discount'
              label="Discount Price"
              size='small'
              onChange={handlediscountItemAmountChange}
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
                      name='freeItem'
                      size='small'
                      onChange={handleFreeItemAmountChange}
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
                      name='return'
                      fullWidth
                      size='small'
                      onChange={handleReturnItemAmountChange}
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
              name='chequeamount'
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
                      name='creaditamount'
                      fullWidth
                      size='small'
                      onChange={handleCreditAmountChange}
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
                      name='cashamount'
                      fullWidth
                      size='small'
                      onChange={handleCashAmountChange}
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

              <div className='total'>
                <span>{calculateTotal() + freeItemAmount + discountItemAmount + retunItemAmount}</span>
              </div>
           

            </div>
          </div>
          <div className="form-input">
         
            <div className="form-input-product">
            <Button style={{backgroundColor:"#186bfa",color:'white'}}onClick={handleAddSale}>Add Sale</Button>
           
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
