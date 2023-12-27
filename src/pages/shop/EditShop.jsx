import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './editShop.scss'
export const EditShop = (props) => {
  const { id } = props;
  console.log(id)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopId: '',
    deliveryRouteId: '',
    shopName: '',
    address: '',
    phoneNumber: '',
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/shop/get-by-id/${id}`);
        const { shopId, deliveryRouteId, shopName, address, phoneNumber } = response.data || {};
        setFormData({ shopId, deliveryRouteId, shopName, address, phoneNumber });
        setOpen(true);
      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };

    fetchData();
  }, [id]);
  const [routeOptions, setRouteOptions] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
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
  useEffect(() => {
    fetchDeliveryRoute();
  }, []);

  const handleRouteChange = (event) => {
    const selectedRouteId = event.target.value;
    setSelectedRoute(selectedRouteId)
 
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // Update the deliveryRouteId in formData
    const updatedFormData = { ...formData, deliveryRouteId: selectedRoute };
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/shop/update`,
        updatedFormData
      );
  
      console.log('Shop updated successfully:', response.data);
  
      handleClose();
      // Redirect to the shop list page or any other page
      window.location.reload();

    } catch (error) {
      console.error('Error updating shop:', error);
    }
  };

  return (
    <div>
    
          <form onSubmit={handleFormSubmit} className='edit-shop-form'>
          <div>
          <TextField
              variant="outlined"
              label="Shop ID"
              name="shopId"
              value={formData.shopId}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              size="small"
            />
            
          </div>
         
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
      )}     
          
          <div>
          <TextField
              variant="outlined"
              label="Shop Name"
              name="shopName"
              value={formData.shopName}
              onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              required
              fullWidth
              margin="normal"
              size="small"
            />
            <TextField
              variant="outlined"
              label="Address"
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              fullWidth
              margin="normal"
              size="small"
            />
          </div>
          
            <TextField
              variant="outlined"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
              fullWidth
              margin="normal"
              size="small"
            />
            <Button type="submit" variant="contained" color="primary">
                Update Shop
              </Button>
    
          </form>
      
    </div>
  );
};
