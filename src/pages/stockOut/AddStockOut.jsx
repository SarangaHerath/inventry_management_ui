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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        console.log(productdetails);
        // Update the state with the fetched delivery routes
        setProduct(productdetails);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };

    fetchProduct();
  }, []); // Run this effect only once when the component mounts

  const [vehicle, setVehicle] = useState([]);
const [selectedVehicle,setSelectedVehicle]=useState()
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

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/category/all`
        );
        const categoryData = response.data;
        console.log("Category Data", categoryData);
        const categoryOptions = categoryData.map((category) => (
          <MenuItem key={category.categoryId} value={category.categoryId}>
            {category.categoryName}
          </MenuItem>
        ));

        setCategoryOptions(categoryOptions);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };
    fetchCategories();
  }, []);
  // Function to handle form submission

  const [productOptions, setProductOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState();
  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/stock-out/productsByCategory/${id}`
      );
      const productData = response.data;

      const productOptions = productData.map((product) => (
        <MenuItem key={product.productId} value={product.productId}>
          {product.productName} :- {product.weight}g
          {/* <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'20px',width:'100%'}}>
            <div>
            {product.productName}
            </div>
            <div style={{backgroundColor:'#D5D8DC',height:'30px',width:'70px',borderRadius:'5px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            {product.weight}g
            </div>
          
          </div> */}
        </MenuItem>
      ));
      setProductOptions(productOptions);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    fetchProduct(selectedCategoryId);
  };
  const handleProductChange = (event) => {
    const selectedProductIds = event.target.value;
    setSelectedProducts(selectedProductIds);
  };
  const handleVehicleChange=(event)=>{
    const selectedVehicleId=event.target.value;
    setSelectedVehicle(selectedVehicleId)

  }
  console.log(selectedVehicle)
  console.log(selectedProducts)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        ...formData,
        productId: selectedProducts,
        vehicleId:selectedVehicle,
      };
      console.log(requestData)
      // Send a POST request to the backend with the form data
      const response = await axios.post(
        "http://localhost:8080/api/v1/stock-out/add-stockOut",
        requestData
      );

      // Handle successful response, e.g., show a success message
      console.log("Stock Out added successfully:", response.data);
      toast.success("Stock out added successfully:");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
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
      toast.error(`Error add stock out: ${errorMessage}`);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <form
      className="add-shop-form"
      style={{ width: "400px" }}
      onSubmit={handleFormSubmit}
    >
      <ToastContainer />
      {/* Form for adding a new shop */}
      <label className="form-title">Add New Stock Out</label>
      <Grid container spacing={1}>
        {/* Shop Name and Address on the same line */}
        <Grid item xs={12} sm={12} className="grid-item">
          {categoryOptions && (
            <TextField

              id="outlined-select-currency2"
              select
              label="Select Category"
              size="small"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.props.value} value={option.props.value}>
                  {option.props.children}
                </MenuItem>
              ))}
            </TextField>
          )}
          {productOptions && (
            <TextField
              id="outlined-select-currency2"
              select
              label="Select Product"
              size="small"
              value={selectedProducts}
              onChange={handleProductChange}
              
            >
              {productOptions.map((option) => (
                <MenuItem key={option.props.value} value={option.props.value}>
                  {option.props.children}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>
        <Grid item xs={12} sm={12} className="grid-item">
        {vehicle && (
            <TextField
            
              id="outlined-select-currency2"
              select
              label="Select Vehicle"
              size="small"
              value={selectedVehicle}
              onChange={handleVehicleChange}
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
              ))}
            </TextField>
          )}
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
          </Grid>
 
          <Grid container spacing={1} className="grid-container" style={{width:'95%',marginLeft:'8px'}}>
          <TextField
          variant="outlined"
          type="date"
          name="dateOut"
          value={formData.dateOut}
          onChange={handleInputChange}
          required
          className="textfield"
          size="small"
          // fullWidth // Add this property to make the TextField take the full container width
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
