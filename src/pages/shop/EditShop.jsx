import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './editShop.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditShop = (props) => {
  const { id } = props;
  console.log(id)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopId: '',
    deliveryRouteId: '',
    routeName:'',
    shopName: '',
    address: '',
    phoneNumber: '',
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/shop/get-by-id/${id}`);
            const { shopId, deliveryRoute, shopName, address, phoneNumber } = response.data || {};

            setFormData({
                shopId,
                deliveryRouteId: deliveryRoute?.id || '', // Using optional chaining and providing a default value
                routeName: deliveryRoute?.routeName || '',
                shopName,
                address,
                phoneNumber
            });

            console.log("edit data", response.data);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching shop details:', error);
        }
    };

    fetchData();
}, [id]);

  console.log("formdata",formData);
  const [routeOptions, setRouteOptions] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const fetchDeliveryRoute = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/route/all");
      const routeData = response.data;
      console.log(routeData)
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
    const selectedRoute = event.target.value;
    setSelectedRoute(selectedRoute);
};

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.put(
            `http://localhost:8080/api/v1/shop/update`,
            {
                ...formData,
            }
        );

        console.log('Shop updated successfully:', response.data);

        handleClose();
        // Redirect to the shop list page or any other page
        toast.success("Shop updated successfully:")
        setTimeout(() => {
            window.location.reload();
        }, 1500);

    } catch (error) {
        console.error('Error updating shop:', error);
        toast.error(`Error updating shop: ${errorMessage}`);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
};


  return (
    <div>
    <ToastContainer />
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
          <TextField
              variant="outlined"
              label="Delivery Route ID"
              name="shopId"
              value={formData.routeName}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              size="small"
            />
          
          
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
