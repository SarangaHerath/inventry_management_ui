import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./editStockOut.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditStockOut = (props) => {
  const { id } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stockOutId: "",
    productId: "",
    productName:"",
    vehicleId: "",
    vehicleNumber:"",
    quantity: "",
    dateOut: "",
  });

  const [open, setOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/stock-out/getById/${id}`
        );
        const { stockOutId, product, vehicle, quantity, dateOut } =
          response.data || {};

        setFormData({
          stockOutId,
          productId:product?.productId || '',
          productName: product?.productName || '',
          vehicleId:vehicle?.vehicleId || '',
          vehicleNumber:vehicle?.vehicleNumber || '',
          quantity,
          dateOut,
        });
        console.log(response.data);

        setOpen(true);
      } catch (error) {
        console.error("Error fetching stock out details:", error);
      }
    };

    fetchData();
  }, [id]);
  console.log("formdata",formData);
  
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedPrduct] = useState(null);
  
  const fetchProduct = async () => {
    try {
      const response = await axios.get("https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/product/all");
      const productData = response.data;
      console.log(productData)
      const productOptions = productData.map((product) => (
        <MenuItem key={product.productId} value={product.productId}>
          {product.productName}
        </MenuItem>
      ));
      setProductOptions(productOptions);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);


  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  const fetchVehicle = async () => {
    try {
      const response = await axios.get("https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/vehicle/all");
      const vehicleData = response.data;
      console.log(vehicleData)
      const vehicleOptions = vehicleData.map((vehicle) => (
        <MenuItem key={vehicle.vehicleId} value={vehicle.vehicleId}>
          {vehicle.vehicleNumber}
        </MenuItem>
      ));
      setVehicleOptions(vehicleOptions);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    }
  };
  useEffect(() => {
    fetchVehicle();
  }, []);

  const handleRouteChange = (event) => {
    const selectedProduct = event.target.value;
    const selectedVehicle = event.target.value;
    setSelectedPrduct(selectedProduct);
    setSelectedVehicle(selectedVehicle);
};

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.put(
            `https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/stock-out/update`,
            {
                ...formData,
            }
        );

        console.log('Shop updated successfully:', response.data);

        handleClose();
        // Redirect to the shop list page or any other page
        toast.success("Stock out updated successfully:")
        handleClose();
        setTimeout(() => {
            window.location.reload();
        }, 1500);

    } catch (error) {
        console.error('Error updating shop:', error);
        toast.error(`Error updating shop: ${errorMessage}`);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
};
  

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleFormSubmit} className="edit-shop-form">
        <div>
          <TextField
            variant="outlined"
            label="Stock Out ID"
            name="stockOutId"
            value={formData.stockOutId}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
            size="small"
          />
        </div>
        <TextField
              variant="outlined"
              label="Product ID"
              name="productId"
              value={formData.productName}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              size="small"
            />
        {/* <TextField
          id="outlined-select-currency1"
          select
          label="Select Product"
          defaultValue={selectedProduct}
          size="small"
          name="productId"
          value={selectedProduct}
          onChange={(e) =>
            handleSelectChange(e, setSelectedProduct, setFormData, "productId")
          }
        >
          {productOptions}
        </TextField> */}
<TextField
              variant="outlined"
              label="Vehicle Number"
              name="vehicleId"
              value={formData.vehicleNumber}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              size="small"
            />
        {/* <TextField
          id="outlined-select-currency2"
          select
          label="Select Vehicle Number"
          defaultValue={selectedVehicle}
          size="small"
          name="vehicleId"
          value={selectedVehicle}
          onChange={(e) =>
            handleSelectChange(e, setSelectedVehicle, setFormData, "vehicleId")
          }
        >
          {vehicleOptions}
        </TextField> */}

        <div>
          <TextField
            variant="outlined"
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            required
            fullWidth
            margin="normal"
            size="small"
          />

          <TextField
            variant="outlined"
            label="Date"
            type="date"
            name="dateOut"
            value={formData.dateOut}
            onChange={(e) =>
              setFormData({ ...formData, dateOut: e.target.value })
            }
            required
            className="textfield"
            size="small"
          />
        </div>

        <Button type="submit" variant="contained" color="primary">
          Update Stock Out
        </Button>
      </form>
    </div>
  );
};
