import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "./addNewProducts.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const AddNewProducts = () => {
  const [formData, setFormData] = useState({
    productName: "",
    categoryId: "",
    weight: "",
    date: "",
    unitPrice: 0,
    quantity: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/category/all"
        );
        const category = response.data;

        // Update the state with the fetched delivery routes
        setCategory(category);
      } catch (error) {
        console.error("Error fetching delivery category:", error);
      }
    };

    fetchCategory();
  }, []);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/product/add-product",
        formData
      );

      console.log("Product added successfully:", response.data);
      // Reset the form after successful submission
      setFormData({
        productName: "",
        categoryId: "",
        weight: "",
        date: "",
        unitPrice: 0,
        quantity: 0,
      });
      toast.success("Product add successfully:");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(`Error add product: ${errorMessage}`);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="add-product-form">
      <ToastContainer />
      <label className="form-title">Add New Product</label>
      <div>
        <TextField
          variant="outlined"
          label="Product Name"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
          required
          className="textfield"
          size="small"
        />
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="delivery-route-label">Category</InputLabel>
          <Select
            labelId="delivery-route-label"
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            label="Category"
            size="small"
            fullWidth
          >
            {category.map((category) => (
              <MenuItem key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Weight"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          required
          className="textfield"
          size="small"
        />
        <TextField
          variant="outlined"
          type="date"
          // label="Date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="textfield"
          size="small"
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          type="number"
          label="Unit Price"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleInputChange}
          required
          className="textfield"
          size="small"
        />

        <TextField
          variant="outlined"
          type="number"
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          required
          className="textfield"
          size="small"
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="buttonfiled"
      >
        Add Product
      </Button>
    </form>
  );
};
