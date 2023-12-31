import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    remark:"",
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
          `https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/cheque/getById/${id}`
        );
        const { chequeId,shopId,chequeNumber,receivedDate,bankDate,amount,remark } =
          response.data || {};
        setFormData({
          chequeId,
          shopId,
          chequeNumber,
          receivedDate,
          bankDate,
          amount,
          remark
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
      "https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/shop/all",
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
        `https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/cheque/update`,
        updatedFormData
      );

      console.log("Cheque updated successfully:", response.data);
      toast.success("Cheque updated successfully:")
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error updating cheque:", error);
      const errorMessage = error.response.data;
      toast.error(`Error updating cheque: ${errorMessage}`);
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
            label="Cheque ID"
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
          // select
          label="Select Shop"
          // defaultValue={selectedshop}
          InputProps={{ readOnly: true }}
          size="small"
          name="shopId"
          value={formData.shopId}
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
 <TextField
            variant="outlined"
            label="Remark"
            name="remark"
            value={formData.remark}
            onChange={(e) =>
              setFormData({ ...formData, remark: e.target.value })
            }
            required
            fullWidth
            margin="normal"
            size="small"
          />
        <Button type="submit" variant="contained" color="primary">
          Update Cheque
        </Button>
      </form>
    </div>
  );
};
