import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, InputLabel, Select, FormControl } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';import { Label } from '@mui/icons-material';

export const EditShop = (props) => {
  const { id } = props;
  console.log(id)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    phoneNumber: '',
    delivery_route_id: ''
  });
  const [deliveryRoutes, setDeliveryRoutes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch the route details based on routeId when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/shop/get-by-id/${id}`);
        const { shopName, address, phoneNumber, delivery_route_id } = response.data || {};
        setFormData({ shopName, address, phoneNumber, delivery_route_id });
        setOpen(true);
      } catch (error) {
        console.error('Error fetching route details:', error);
      }
    };
    
    
    
    fetchData();
  }, [id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/shop/update`,
        formData
      );

      console.log('Route updated successfully:', response.data);
      handleClose();
      window.location.reload();
      // You may want to trigger a re-render or update the state in the parent component
    } catch (error) {
      console.error('Error updating route:', error);
    }
  };

  return (
   
      
    
      <div>
       <form
      className='add-shop-form'
      style={{ width: '400px' }}
      onSubmit={handleFormSubmit}
    >
      {/* Form for adding a new shop */}
      <label className='form-title'>Edit Shop</label>
      <Grid container spacing={2}>
        {/* Shop Name and Address on the same line */}
        <Grid item xs={12} sm={12} className="grid-item">
          <TextField
            variant="outlined"
            label="Shop Name"
            name="shopName"
            value={formData.shopName}
            onChange={handleInputChange}
            required
            fullWidth
            className='textfield'
            size="small"
          />
          <TextField
            variant="outlined"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            fullWidth
            className='textfield'
            size="small"
          />
        </Grid>

        {/* Phone Number and Delivery Route on the same line */}
        <Grid item xs={12} sm={12} className="grid-item">
          <TextField
            variant="outlined"
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            fullWidth
            className='textfield'
            size="small"
          />
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="delivery-route-label">Delivery Route</InputLabel>
            <Select
              labelId="delivery-route-label"
              id="delivery-route"
              name="delivery_route_id"
              value={formData.delivery_route_id}
              onChange={handleInputChange}
              label="Delivery Route"
              size="small"
              fullWidth
            >
              {deliveryRoutes.map((route) => (
                <MenuItem key={route.id} value={route.id}>
                  {route.routeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Add more fields as needed */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className='buttonfield'
      >
        Add Shop
      </Button>
    </form>
        </div>

  );
};
