import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
} from "@mui/material";
import "./addStockOut.scss";
import axios from "axios";

export const AddStockOut = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    productId: "",
    vehicleId: "",
    quantity: "",
    dateOut: "",
  });

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/product/all"
        );
        const productdetails = response.data;

        // Update the state with the fetched delivery routes
        setProduct(productdetails);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };

    fetchProduct();
  }, []); // Run this effect only once when the component mounts

  const [vehicle, setVehicle] = useState([]);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/vehicle/all"
        );
        const vehicledetails = response.data;

        // Update the state with the fetched delivery routes
        setVehicle(vehicledetails);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };

    fetchVehicle();
  }, []);

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend with the form data
      const response = await axios.post(
        "http://localhost:8080/api/v1/stock-out/add-stockOut",
        formData
      );

      // Handle successful response, e.g., show a success message
      console.log("Stock Out added successfully:", response.data);
      window.location.reload();
      // Reset the form after submission
      setFormData({
        productId: "",
        vehicleId: "",
        quantity: "",
        dateOut: "",
      });
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error adding stock out:", error);
    }
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      className="add-shop-form"
      style={{ width: "400px" }}
      onSubmit={handleFormSubmit}
    >
      {/* Form for adding a new shop */}
      <label className="form-title">Add New Stock Out</label>
      <Grid container spacing={1}>
        {/* Shop Name and Address on the same line */}
        <Grid item xs={12} sm={12} className="grid-item">
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="product-name-label">Product Name</InputLabel>
            <Select
              labelId="product-name-label"
              id="product-name"
              name="productId" // Use the correct name for the field
              value={formData.productId}
              onChange={handleInputChange}
              label="Product Name"
              size="small"
              fullWidth
            >
              {product.map((productdetails) => (
                <MenuItem
                  key={productdetails.productId}
                  value={productdetails.productId}
                >
                  {productdetails.productName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="vehicle-number-label">Vehicle Number</InputLabel>
            <Select
              labelId="vehicle-number-label"
              id="vehicle-number"
              name="vehicleId" // Use the correct name for the field
              value={formData.vehicleId}
              onChange={handleInputChange}
              label="Vehicle Name"
              size="small"
              fullWidth
            >
              {vehicle.map(
                (
                  vehicledetails // Use the correct array (vehicle instead of product)
                ) => (
                  <MenuItem
                    key={vehicledetails.vehicleId}
                    value={vehicledetails.vehicleId}
                  >
                    {vehicledetails.vehicleNumber}{" "}
                    {/* Assuming vehicleNumber is the property you want to display */}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>
        {/* <TextField
            variant="outlined"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            fullWidth
            className="textfield"
            size="small"
          /> */}
        {/* Phone Number and Delivery Route on the same line */}
        <Grid item xs={12} sm={12} className="grid-item">
          <TextField
            variant="outlined"
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
            fullWidth
            className="textfield"
            size="small"
          />
          <TextField
            variant="outlined"
            type="date"
            name="dateOut" // Use the correct name for the field
            value={formData.dateOut}
            onChange={handleInputChange}
            required
            className="textfield"
            size="small"
          />
        </Grid>
      </Grid>

      {/* Add more fields as needed */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="buttonfield"
      >
        Add Stock Out
      </Button>
    </form>
  );
};
