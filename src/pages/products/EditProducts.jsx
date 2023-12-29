import React, { useState, useEffect } from 'react';
import { TextField, Button, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditProducts = (props) => {
  const { id } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    weight: '',
    date: '',
    quantity: '',
    unitPrice: '',
    category: {
      categoryId: '',
      categoryName: ''
    }
  });

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for id:", id);
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/product/get-by-id/${id}`);
        const { productId, productName, weight, date, quantity, unitPrice, category } = response.data || {};
        setCategoryData([category]); // Wrap the category in an array
        setFormData({
          productId,
          productName,
          weight,
          date,
          quantity,
          unitPrice,
          category
        });
        handleClose(); // Use handleClose instead of setOpen
      } catch (error) {
        console.error('Error fetching route details:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData(prevData => ({
      ...prevData,
      category: {
        ...prevData.category,
        [name]: value,
      },
    }));
  };
 
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/product/update`,
        formData
      );
  
      console.log('Product updated successfully:', response.data);
      toast.success("Product updated successfully:");
      
  
      // Use a delay before reloading to allow time for the toast to be displayed
  navigate('/productList')
        window.location.reload();
 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleFormSubmit} className='add-shop-form'>
        <div>
          <TextField
            variant="outlined"
            label="ID"
            name="productId"
            value={formData.productId}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            variant="outlined"
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            required
            fullWidth
            margin="normal"
            size="small"
          />
        </div>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="product-name-label">Category Name</InputLabel>
          <Select
            labelId="product-name-label"
            id="product-name"
            name="categoryName"
            value={formData.category.categoryName}
            onChange={handleInputChange}
            label="Category Name"
            size="small"
            fullWidth
          >
            {categoryData && categoryData.map((categoryItem) => (
              <MenuItem
                key={categoryItem.categoryId}
                value={categoryItem.categoryName}
              >
                {categoryItem.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <TextField
            variant="outlined"
            label="Weight"
            name="weight"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            required
            fullWidth
            margin="normal"
            size="small"
          />
          
        </div>
        <TextField
            variant="outlined"
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            required
            className="textfield"
            size="small"
          />
        <div>
          <TextField
            variant="outlined"
            label="Unit Price"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            variant="outlined"
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
            fullWidth
            margin="normal"
            size="small"
          />
        </div>

       
        <Button type="submit" variant="contained" color="primary">
          Update Product
        </Button>
      </form>
    </div>
  );
};
