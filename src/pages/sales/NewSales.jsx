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
import { AddDeliveryRoute } from '../deliveryRoute/AddDeliveryRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NewSales = () => {
  const [routeOptions, setRouteOptions] = useState([]);
  const [shopOptions, setShopOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [shopDetails, setShopDetails] = useState(null);


  const fetchDeliveryRoute = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/route/all");
      const routeData = response.data;
      const routeOptions = routeData.map((droute) => (
        <MenuItem key={droute.id} value={droute.id}>
          {droute.routeName}
        </MenuItem>
      ));
      setRouteOptions(routeOptions);
    } catch (error) {
      console.error("Error fetching delivery routes:", error);
    }
  };
  
  const fetchShops = async (deliveryRouteId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/shop/by-delivery-route/${deliveryRouteId}`);
      const shopData = response.data;
      // console.log(deliveryRouteId)
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
const handleRouteChange = (event) => {
  const selectedRouteId = event.target.value;
  setSelectedRoute(selectedRouteId)
  fetchShops(selectedRouteId)
  
};
  const handleCustomerChange = (event) => {
    const selectedShopId = event.target.value;
    setSelectedShop(selectedShopId)
    fetchShopDetails(selectedShopId);
  };

  useEffect(() => {
    fetchDeliveryRoute();
  }, []);
  
  useEffect(() => {
    if (selectedRoute) {
      fetchShops(selectedRoute);
    }
  }, [selectedRoute]);
  
  useEffect(() => {
    if (selectedShop) {
      fetchShopDetails(selectedShop);
    }
  }, [selectedShop]);
  
//////////////////////product/////////////////////////////////////////
const fetchProduct = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/stock-out/all");
    const productData = response.data;
    console.log(productData)
    const productOptions = productData.map((product) => (
      <MenuItem key={product.product.productId} value={product.product.productId}>
        {product.product.productName}-{product.product.weight}g
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
const [quantityValues, setQuantityValues] = useState({});
const handleProductIdsChange = async (event) => {
  const selectedProductIds = event.target.value;

  const updatedSelectedProducts = await Promise.all(
    selectedProductIds.map(async (productId) => {
      try {
        const productDetailsResponse = await axios.get(`http://localhost:8080/api/v1/stock-out/product-details/${productId}`);
        const productDetailsData = productDetailsResponse.data[0]; // Access the first item in the array

        return {
          productId,
          productName: productDetailsData.product.productName,
          unitPrice: productDetailsData.product.unitPrice,
          weight: productDetailsData.product.weight,
          quantity: quantityValues[productId] || 0,
          total: (quantityValues[productId] || 0) * productDetailsData.product.unitPrice,
        };
      } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
      }
    })
  );

  // Update selected products with details
  setSelectedProducts(updatedSelectedProducts.filter((product) => product !== null));
};
const [quantityErrors, setQuantityErrors] = useState({});


const handleQuantityChange = (productId) => async (event) => {
  const newQuantity = parseInt(event.target.value, 10);


  try {
    const productDetailsResponse = await axios.get(`http://localhost:8080/api/v1/stock-out/product-details/${productId}`);
    const productDetailsData = productDetailsResponse.data[0]; // Access the first item in the array
    console.log(productDetailsData)
    // Compare the entered quantity with the available quantity
    if (newQuantity > productDetailsData.quantity) {
      // Display an error message
      setQuantityErrors((prevErrors) => ({
        ...prevErrors,
        [productId]: `Available Quantity: ${productDetailsData.quantity}`,
      }));
    } else {
      // Clear the error message
      setQuantityErrors((prevErrors) => ({
        ...prevErrors,
        [productId]: null,
      }));

      // Update state and total value based on quantity
      setQuantityValues((prevQuantityValues) => ({
        ...prevQuantityValues,
        [productId]: newQuantity,
      }));

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
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};




///////////////////////////////////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [openRoute, setOpenRoute] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [openCheque, setOpenCheque] = useState(false);
  const [checkAmount, setCheckAmount] = useState(null);

const handleOpen = () => {
  setOpen(true);
};
const handleOpenRoute = () => {
  setOpenRoute(true);
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
  setOpenRoute(false)
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
        deliveryRouteId:selectedRoute,
        total: calculateTotal(),
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
  
      toast.success("Sale create successfully:")
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error adding sale:", error);
      toast.error(`Error create sale: ${errorMessage}`);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
  };
  
  return (
    <div className="container1">
      <div className="left-side">
        <div className="form">
          {/* First input field with button */}
          <ToastContainer />
          <div className="form-input">
            <div className='form-input-customer'>
            {routeOptions && (
        <TextField
          id="outlined-select-currency1"
          select
          label="Select Delivery Route"
          defaultValue=""
          size="small"
          value={selectedRoute}
          onChange={handleRouteChange}
        >
          {routeOptions.map((option) => (
            <MenuItem key={option.props.value} value={option.props.value}>
              {option.props.children}
            </MenuItem>
          ))}
        </TextField>
      )}      <Button onClick={handleOpenRoute} variant="outlined">New +</Button>
            {shopOptions && (
        <TextField
          id="outlined-select-currency1"
          select
          label="Select Shop"
          defaultValue=""
          size="small"
          value={selectedShop}
          disabled={!selectedRoute}
          onChange={handleCustomerChange}
        >
          {shopOptions.map((option) => (
            <MenuItem key={option.props.value} value={option.props.value}>
              {option.props.children}
            </MenuItem>
          ))}
        </TextField>
      )}

      <Button onClick={handleOpenShop}disabled={!selectedRoute} variant="outlined">New +</Button>
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
                  
                  disabled={!selectedRoute}
                >
                  {productOptions.map((option) => (
                    <MenuItem key={option.props.value} value={option.props.value}>
                      {option.props.children}
                    </MenuItem>
                  ))}
                </TextField>
              )}

            <Button onClick={handleOpen} disabled={!selectedShop} variant="outlined">New +</Button>

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
                      <div>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={handleQuantityChange(product.productId)}
                      ></input>
                       {quantityErrors[product.productId] && (
                        <span className="error-message">{quantityErrors[product.productId]}</span>
                      )}
                      </div>
                      
                      
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
              
          disabled={!selectedRoute}
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
          disabled={!selectedRoute}
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
             
                      disabled={!selectedRoute}
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
                      disabled={!selectedRoute}
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
                      disabled={!selectedRoute}
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
                <span>{calculateTotal()}</span>
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
      <Dialog open={openRoute} onClose={handleClose}TransitionComponent={Grow}
        transitionDuration={500} >
        <AddDeliveryRoute></AddDeliveryRoute>
    </Dialog>
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
