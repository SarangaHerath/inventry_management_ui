import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './editShop.scss'
export const EditShop = (props) => {
  const { id } = props;
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
        const response = await axios.get(`http://localhost:8080/api/v1/shop/getById/${id}`);
        const { shopId, deliveryRouteId, shopName, address, phoneNumber } = response.data || {};
        setFormData({ shopId, deliveryRouteId, shopName, address, phoneNumber });
        setOpen(true);
      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/shop/update`,
        formData
      );

      console.log('Shop updated successfully:', response.data);
      handleClose();
      // Redirect to the shop list page or any other page
      navigate('/shop-list');
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
            <TextField
              variant="outlined"
              label="Delivery Route ID"
              name="deliveryRouteId"
              value={formData.deliveryRouteId}
              onChange={(e) => setFormData({ ...formData, deliveryRouteId: e.target.value })}
              required
              fullWidth
              margin="normal"
              size="small"
            />
          </div>
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
