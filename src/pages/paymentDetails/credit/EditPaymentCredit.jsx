import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./EditPaymentCredit.scss";

export const EditPaymentCredit = (props) => {
  const { id } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    creditId: "",
    shopName: "",
    creditAmount: "",
    billDate: "",
    paidAmount: "",
    lastPaymentDate: "",
  });

  const [open, setOpen] = useState(false);

  const [shopOptions, setShopOptions] = useState([]);
  // const [vehicleOptions, setVehicleOptions] = useState([]);

  const [selectedshop, setSelectedShop] = useState("");
  // const [selectedVehicle, setSelectedVehicle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/credit/getById/${id}`
        );
     
        const {
          creditId,
          shop,
          creditAmount,
          billDate,
          paidAmount,
          lastPaymentDate,
        } = response.data || {};
  
        setFormData({
          creditId,
          shopName: shop.shopName,
          creditAmount,
          billDate,
          paidAmount,
          lastPaymentDate,
        });
      
        // setSelectedShop(shopId);
        // setSelectedVehicle(vehicleId);
        setOpen(true);
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    };

    fetchData();
  }, [id]);
  console.log(formData);
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
      "http://localhost:8080/api/v1/shop/all",
      setShopOptions,
      "shopName"
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
      creditId: id,
      shopId: selectedshop,
    };
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/credit/updateCredit`,
        updatedFormData
      );
  
      console.log("Full response:", response); // Log the entire response
  
      if (response.status === 200) {
        console.log("Credit updated successfully:", response.data);
        toast.success('Credit updated successfully');
        handleClose();
        // Wait for 3 seconds before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else if (response.status === 400) {
        console.error("Error updating credit:", response.data);
        // Access the error message from the response body
        const errorMessage = response.data;
        toast.error(`Error updating credit: ${errorMessage}`);
        // Wait for 3 seconds before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        // Handle other error cases
        console.error("Error updating credit:", response.data);
        toast.error(`Error updating credit: ${response.data}`);
        // Wait for 3 seconds before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating credit:", error);
  
      if (error.response && error.response.status === 400) {
        // Access the error message from the response body
        const errorMessage = error.response.data;
        toast.error(`Error updating credit: ${errorMessage}`);
      } else {
        toast.error(`Error updating credit: ${error.message}`);
      }
  
      // Wait for 3 seconds before reloading the page
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
            label="Credit ID"
            name="creditId"
            value={formData.creditId}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
            size="small"
          />
        </div>

        <TextField
          id="outlined-select-currency1"
          // select
          label="Select Shop"
          // defaultValue={selectedshop}
          InputProps={{ readOnly: true }}
          size="small"
          name="shopId"
          value={formData.shopName}
          onChange={(e) =>
            handleSelectChange(e, setSelectedShop, setFormData, "shopId")
          }
        >
          {shopOptions}
        </TextField>

        <div>
          <TextField
            variant="outlined"
            label="Credit Amount"
            name="creditAmount"
            value={formData.creditAmount}
            InputProps={{ readOnly: true }}
            onChange={(e) =>
              setFormData({ ...formData, creditAmount: e.target.value })
            }
            required
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            variant="outlined"
            label="Paid Amount"
            name="paidAmount"
            value={formData.paidAmount}
            onChange={(e) =>
              setFormData({ ...formData, paidAmount: e.target.value })
            }
            required
            fullWidth
            margin="normal"
            size="small"
          />
        </div>

        <div>
          <TextField
            variant="outlined"
            label="Bill Date"
            type="date"
            name="billDate"
            value={formData.billDate}
            onChange={(e) =>
              setFormData({ ...formData, billDate: e.target.value })
            }
            required
            className="textfield"
            size="small"
          />
          <TextField
            variant="outlined"
            label="Last Payment Date"
            type="date"
            name="lastPaymentDate"
            value={formData.lastPaymentDate}
            onChange={(e) =>
              setFormData({ ...formData, lastPaymentDate: e.target.value })
            }
            required
            className="textfield"
            size="small"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Update Credit
        </Button>
      </form>
    </div>
  );
};
