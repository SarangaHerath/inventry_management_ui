import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import './chequeDetails.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ChequeDetails = ({ shopId,onClose }) => {
  console.log(shopId)
  const [formData, setFormData] = useState({
    chequeNumber: '',
    receivedDate: '',
    bankDate: '',
    amount: 0,
    remark:''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/cheque/save',
        {
          shop_id: shopId, // Pass the shopId to the server
          ...formData,
        }
      );

      console.log('Cheque details added successfully:', response.data);
      // Reset the form after successful submission
      toast.success("Cheque Added successfully:")
       
      setFormData({
        chequeNumber: '',
        receivedDate: '',
        bankDate: '',
        amount: 0,
        remark:''
      });
      onClose(response.data.amount);
    } catch (error) {
      console.error('Error adding cheque details:', error);
      toast.error(`Error adding cheque details: ${errorMessage}`);
        
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="add-cheque-form">
      <label className='form-title'>Add Cheque Details</label>
      <ToastContainer />
      <div>

        <TextField
          variant="outlined"
          label="Cheque Number"
          name="chequeNumber"
          value={formData.chequeNumber}
          onChange={handleInputChange}
          required
          className='textfield'
          size='small'
        />
        <TextField
          variant="outlined"
          label="Shop Id"
          name="shopId"
          value={shopId}
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
          name="receivedDate"
          value={formData?.receivedDate||0}
          onChange={handleInputChange}
          required
          className='textfield'
          size='small'
        />
        <TextField
          variant="outlined"
          type="date"
         label="Bank Date"
          name="bankDate"
          value={formData?.bankDate||0}
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
          label="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
          className='textfield'
          size='small'
        />
           <TextField
          variant="outlined"
          type="text"
          label="Remark"
          name="remark"
          value={formData.remark}
          onChange={handleInputChange}
          required
          className='textfield'
          size='small'
        />
      </div>
      <Button type="submit" variant="contained" color="primary" className='buttonfiled'>
        Add Cheque
      </Button>
    </form>
  );
};
