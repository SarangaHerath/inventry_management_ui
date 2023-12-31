import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './addProductCategory.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        'https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/category/save',
        formData
      );

      console.log('Route added successfully:', response.data);
      // Reset the form after submission
    setFormData({
      id: '',
      categoryName: ''
    });
      // Reload the page
      toast.success("Category added successfully:")
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }catch(error){
      console.error('Error adding category:', error);
      toast.error(`Error adding category: ${errorMessage}`);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }

    
  };

  return (
    <div>
       <ToastContainer />
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
