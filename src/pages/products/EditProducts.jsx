import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

export const EditProducts = (props) => {
  const { id } = props;
  console.log(id)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productId,
    productName,
    weight,
    date,
    quantity,
    unitPrice,
    category
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch the route details based on routeId when the component mounts
    const fetchData = async () => {
      console.log("Fetching data for id:", id);
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/product/get-by-id/${id}`);
        const { productId, productName, weight,date,quantity,unitPrice,category } = response.data || {};
        console.log("Data received:", response.data);
        console.log("id:", productId); // Use the renamed variable here
        setFormData({ productId, productName, weight,date,quantity,unitPrice,category});
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
    console.log('Request Body:', formData);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/product/update`,
        formData
      );

      console.log('Route updated successfully:', response.data);
      handleClose();
      window.location.reload();
      // You may want to trigger a re-render or update the state in the parent component
    } catch (error) {
      console.error('Error updating route:', error);
    }
  };

  return (
   
      
    
      <div>
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
          <div>
          <TextField
            variant="outlined"
            label="Weight"
            name="weight"
            value={formData.weight}
            fullWidth
            margin="normal"
            size="small"
          />
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
          </div>
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
            onChange={(e) => setFormData({ ...formData,quantity : e.target.value })}
            required
            fullWidth
            margin="normal"
            size="small"
          />
          </div>
 
           <TextField
            variant="outlined"
            label="Category"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            fullWidth
            margin="normal"
            size="small"
          />
           <Button type="submit" variant="contained" color="primary">
              Update Product
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
