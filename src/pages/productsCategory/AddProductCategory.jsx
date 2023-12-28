import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './addProductCategory.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
// import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

export const AddProductCategory = () => {
  // State to manage form data
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    id: '',
    categoryName: ''
  });

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleFormSubmit =async (event) => {
    event.preventDefault();

    // Implement logic to submit form data (e.g., send a request to the server)
    try{
      const response = await axios.post(
        'http://localhost:8080/api/v1/category/save',
        formData
      );

      console.log('Route added successfully:', response.data);
      // Reset the form after submission
    setFormData({
      id: '',
      categoryName: ''
    });
      // Reload the page
    window.location.reload();
    }catch(error){
      console.error('Error adding product:', error);
    }

    
  };

  return (
    <div>
     
      {/* Form for adding a new shop */}
      <form onSubmit={handleFormSubmit} className='add-shop-form'>
      <label className='form-title'>Add New Category</label>
      <div>
      <TextField
          variant="outlined"
          label="Category Name"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          size="small"
        />
        
      </div>
      
        {/* Add more fields as needed */}
        
        <Button type="submit" variant="contained" color="primary">
          Add Category
        </Button>
      </form>
    </div>
  );
};
