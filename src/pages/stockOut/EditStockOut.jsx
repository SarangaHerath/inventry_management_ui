import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./editStockOut.scss";

export const EditStockOut = (props) => {
  const { id } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stockOutId: "",
    productId: "",
    vehicleId: "",
    quantity: "",
    dateOut: "",
  });

  const [open, setOpen] = useState(false);

  const [productOptions, setProductOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/stock-out/getById/${id}`
        );
        const { stockOutId, productId, vehicleId, quantity, dateOut } =
          response.data || {};
        setFormData({
          stockOutId,
          productId,
          vehicleId,
          quantity,
          dateOut,
        });
        console.log(response.data);
        setSelectedProduct(productId);
        setSelectedVehicle(vehicleId);
        setOpen(true);
      } catch (error) {
        console.error("Error fetching stock out details:", error);
      }
    };

    fetchData();
  }, [id]);

  const fetchOptions = async (url, setState, key) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      const options = data.map((option) => (
        <MenuItem key={option[key]} value={option[key]} data-id={option.id}>
          {option[key]}
        </MenuItem>
      ));

      setState(options); // Save options in state
    } catch (error) {
      console.error(`Error fetching ${key}s:`, error);
    }
  };

  useEffect(() => {
    fetchOptions(
      "http://localhost:8080/api/v1/product/all",
      setProductOptions,
      "productName"
    );
    fetchOptions(
      "http://localhost:8080/api/v1/vehicle/all",
      setVehicleOptions,
      "vehicleNumber"
    );
  }, []);

  const handleSelectChange = (event, setSelectState, setFormState, key) => {
    const selectedValue = event.target.value;
  
    setSelectState(selectedValue);
    setFormState((prevFormData) => ({
      ...prevFormData,
      [key]: selectedValue,
      [`${key}Id`]: selectedValue, // Corrected to use selectedValue instead of selectedId
    }));
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const updatedFormData = {
      ...formData,
      stockOutId: id,
      productId: selectedProduct,
      vehicleId: selectedVehicle,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/stock-out/update`,
        updatedFormData
      );

      console.log("Stock Out updated successfully:", response.data);

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating stock Out:", error);
    }
  };

  return (
    <div>
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
        </TextField>

        <TextField
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
        </TextField>

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
