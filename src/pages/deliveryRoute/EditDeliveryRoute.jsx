import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

export const EditDeliveryRoute = (props) => {
  const { id } = props;
  console.log(id)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    routeName: ''
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch the route details based on routeId when the component mounts
    const fetchData = async () => {
      console.log("Fetching data for id:", id);
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/route/getById/${id}`);
        const { id: routeId, routeName } = response.data || {};
        console.log("Data received:", response.data);
        console.log("id:", routeId); // Use the renamed variable here
        setFormData({ id: routeId, routeName });
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
        `http://localhost:8080/api/v1/route/update`,
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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Route</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            label="ID"
            name="id"
            value={formData.id}
            InputProps={{ readOnly: false }}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            variant="outlined"
            label="Route Name"
            name="routeName"
            value={formData.routeName}
            onChange={(e) => setFormData({ ...formData, routeName: e.target.value })}
            required
            fullWidth
            margin="normal"
            size="small"
          />
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Update Route
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
