import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './addNewShop.scss'
export const AddNewShop = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    phoneNumber: '',
    deliveryRoute:''
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
      deliveryRoute:''
    });
  };

  return (
    <div>
     
      {/* Form for adding a new shop */}
      <form onSubmit={handleFormSubmit} className='add-shop-form'>
      <label className='form-title'>Add New Shop</label>
      <div>
      <TextField
          variant="outlined"
          label="Shop Name"
          name="shopName"
          value={formData.shopName}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
        
          variant="outlined"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
      </div>
      <div>
      <TextField
          variant="outlined"
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
      <TextField
        
        variant="outlined"
        label="Delievry Route"
        name="delieveryRoute"
        value={formData.deliveryRoute}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      </div>
       

        {/* Add more fields as needed */}
        
        <Button type="submit" variant="contained" color="primary">
          Add Shop
        </Button>
      </form>
    </div>
  );
};
