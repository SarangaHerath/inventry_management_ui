import React, { useState } from 'react';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl, Grid } from '@mui/material';
import './addNewShop.scss';

export const AddNewShop = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    phoneNumber: '',
    deliveryRoute: ''
  });

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Implement logic to submit form data (e.g., send a request to the server)

    // Reset the form after submission
    setFormData({
      shopName: '',
      address: '',
      phoneNumber: '',
      deliveryRoute: ''
    });
  };

  return (
    <form className='add-shop-form' style={{width:'400px'}} onSubmit={handleFormSubmit} >
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
        name="deliveryRoute"
        value={formData.deliveryRoute}
        onChange={handleInputChange}
        label="Delivery Route"
        size="small"
        fullWidth
      >
        {/* ... Menu items ... */}
      </Select>
    </FormControl>
    
  </Grid>
</Grid>

      {/* Add more fields as needed */}
      <Button type="submit" variant="contained" color="primary" className='buttonfield'>
        Add Shop
      </Button>
    </form>
  );
};
