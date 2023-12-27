import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditPaymentCheque.scss";

export const EditPaymentCheque = (props) => {
  const { id } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    chequeId: "",
    shopId: "",
    chequeNumber: "",
    receivedDate: "",
    bankDate: "",
    amount: "",
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
          `http://localhost:8080/api/v1/cheque/getById/${id}`
        );
        const { chequeId,shopId,chequeNumber,receivedDate,bankDate,amount } =
          response.data || {};
        setFormData({
          chequeId,
          shopId,
          chequeNumber,
          receivedDate,
          bankDate,
          amount,
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
      chequeId: id,
      shopId: selectedshop,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/cheque/update`,
        updatedFormData
      );

      console.log("Cheque updated successfully:", response.data);

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
            label="Check ID"
            name="chequeId"
            value={formData.chequeId}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
            size="small"
          />
        </div>

        <TextField
          id="outlined-select-currency1"
          select
          label="Select Shop"
          defaultValue={selectedshop}
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
            label="ChequeNumber"
            name="chequeNumber"
            value={formData.chequeNumber}
            onChange={(e) =>
              setFormData({ ...formData, chequeNumber: e.target.value })
            }
            required
            fullWidth
            margin="normal"
            size="small"
          />
<TextField
            variant="outlined"
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
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
            label="Receved Date"
            type="date"
            name="recevedDate"
            value={formData.receivedDate}
            onChange={(e) =>
              setFormData({ ...formData, receivedDate: e.target.value })
            }
            required
            className="textfield"
            size="small"
          />
 <TextField
            variant="outlined"
            label="Bank Date"
            type="date"
            name="bankDate"
            value={formData.bankDate}
            onChange={(e) =>
              setFormData({ ...formData, bankDate: e.target.value })
            }
            required
            className="textfield"
            size="small"
          />
 </div>
        <Button type="submit" variant="contained" color="primary">
          Update Cheque
        </Button>
      </form>
    </div>
  );
};
