import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditPaymentCredit.scss";

export const EditPaymentCredit = (props) => {
  const { id } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    creditId: "",
    shopId: "",
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
          shopId,
          creditAmount,
          billDate,
          paidAmount,
          lastPaymentDate,
        } = response.data || {};
        setFormData({
          creditId,
          shopId,
          creditAmount,
          billDate,
          paidAmount,
          lastPaymentDate,
        });
        console.log(response.data);
        setSelectedShop(shopId);
        // setSelectedVehicle(vehicleId);
        setOpen(true);
      } catch (error) {
        console.error("Error fetching shop details:", error);
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

      console.log("Credit updated successfully:", response.data);

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating cheque:", error);
    }
  };

  return (
    <div>
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
          value={selectedshop}
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
