import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const EditProductCategory = (props) => {
  const { id } = props;
  console.log(id)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryId: '',
    categoryName: ''
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch the route details based on routeId when the component mounts
    const fetchData = async () => {
      console.log("Fetching data for id:", id);
      try {
        const response = await axios.get(`https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/category/getById/${id}`);
        const { categoryId, categoryName } = response.data || {};
        console.log("Data received:", response.data);
        console.log("id:", categoryId); // Use the renamed variable here
        setFormData({ categoryId, categoryName });
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/category/update`,
        formData
      );

      console.log('category updated successfully:', response.data);
      handleClose();
      toast.success("Category update successfully:")
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      // You may want to trigger a re-render or update the state in the parent component
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(`Error updating category: ${errorMessage}`);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
   
      
    
      <div>
        <ToastContainer />
        <form onSubmit={handleFormSubmit} className='add-shop-form'>
          <TextField
            variant="outlined"
            label="ID"
            name="id"
            value={id}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            variant="outlined"
            label="Category Name"
            name="categoryName"
            value={formData.categoryName}
            onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
            required
            fullWidth
            margin="normal"
            size="small"
          />
           <Button type="submit" variant="contained" color="primary">
              Update Category
            </Button>
          {/* <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Update Route
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions> */}
        </form>
        </div>

  );
};
