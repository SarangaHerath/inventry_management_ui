import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import './chequeDetails.scss'
export const ChequeDetails = () => {
  const [formData, setFormData] = useState({
    productName: '',
    weight: '',
    date: '',
    unitPrice: 0,
    quantity: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/product/add-product',
        formData
      );

      console.log('Product added successfully:', response.data);
      // Reset the form after successful submission
      setFormData({
        productName: '',
        weight: '',
        date: '',
        unitPrice: 0,
        quantity: 0,
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="add-product-form">
      <label className='form-title'>Add Cheque Details</label>
      <div >
      <TextField
        variant="outlined"
        label="Cheque Name"
        name="chequeName"
        value={formData.productName}
        onChange={handleInputChange}
        required
        className='textfield'
        size='small'
      />
      <TextField
        variant="outlined"
        label="Cheque Number"
        name="chequenumber"
        value={formData.weight}
        onChange={handleInputChange}
        required
        className='textfield'
        size='small'
      />
      </div>
      <div>
      <TextField
  variant="outlined"
  type="date"
  label="Received Date"
  name="receiveddate"
  value={formData.date || ''} // Set value to an empty string if formData.date is falsy
  onChange={handleInputChange}
  required
  className='textfield'
  size='small'
/>

        <TextField
        variant="outlined"
        type="date"
        label="Bank Date"
        name="bankdate"
        value={formData.date}
       
        onChange={handleInputChange}
        required
        className='textfield'
        size='small'
      />
      

      </div>
    
    <div>
    <TextField
        variant="outlined"
        type="number"
        label="Quantity"
        name="quantity"
        value={formData.quantity}
        onChange={handleInputChange}
        required
        className='textfield'
        size='small'
      />
   
    </div>
     
      <Button type="submit" variant="contained" color="primary"  className='buttonfiled'>
        Add Cheque
      </Button>
      
    </form>
  );
};
