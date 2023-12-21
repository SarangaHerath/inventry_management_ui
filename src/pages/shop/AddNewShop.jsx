import React, { useState } from 'react';
import { TextField, Button, InputLabel, Select, MenuItem, Grid } from '@mui/material';
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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
      <form onSubmit={handleFormSubmit} className='add-shop-form' >
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
       
      
        
       <InputLabel id="demo-simple-select-autowidth-label">Delivery Route</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={formData.deliveryRoute}
          onChange={handleInputChange}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          autoWidth
          label="Delivery Route"
          className='selectfield'
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
   
  

      </div>
       

        {/* Add more fields as needed */}
        
        <Button type="submit" variant="contained" color="primary">
          Add Shop
        </Button>
      </form>
    </div>
  );
};
