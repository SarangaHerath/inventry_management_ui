import React, { useEffect, useState } from 'react';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl, Grid } from '@mui/material';
import './addNewShop.scss';
import axios from 'axios';

export const AddNewShop = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    phoneNumber: '',
    delivery_route_id: ''
  });

  const [deliveryRoutes, setDeliveryRoutes] = useState([]);

  useEffect(() => {
    const fetchDeliveryRoutes = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/route/all'
        );
        const routes = response.data;

        // Update the state with the fetched delivery routes
        setDeliveryRoutes(routes);
      } catch (error) {
        console.error('Error fetching delivery routes:', error);
      }
    };

    fetchDeliveryRoutes();
  }, []); // Run this effect only once when the component mounts

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend with the form data
      const response = await axios.post(
        'http://localhost:8080/api/v1/shop/add-shop',
        formData
      );

      // Handle successful response, e.g., show a success message
      console.log('Shop added successfully:', response.data);
      window.location.reload();
      // Reset the form after submission
      setFormData({
        shopName: '',
        address: '',
        phoneNumber: '',
        delivery_route_id: '',
      });
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error adding shop:', error);
    }
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      className='add-shop-form'
      style={{ width: '400px' }}
      onSubmit={handleFormSubmit}
    >
      {/* Form for adding a new shop */}
      <label className='form-title'>Add New Shop</label>
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
  );
};
