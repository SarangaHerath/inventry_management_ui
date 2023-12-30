import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import './dashboard.scss';
import { Paid, PeopleAlt } from '@mui/icons-material';
import axios from 'axios';
export const Dashboard = () => {
  // Placeholder data for the graph
  const graphData = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];
  const [details, setDetails] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '2023-12-30',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
      // Calculate the first day of the current month
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      // Format the date as 'YYYY-MM-DD' (assuming your API expects this format)
      const formattedStartDate = firstDayOfMonth.toISOString().split('T')[0];
      console.log(formattedStartDate)
      // Set the startDate in the state
      setDateRange((prevDateRange) => ({
        ...prevDateRange,
        startDate: formattedStartDate,
      }));
        const response = await axios.get(
          `http://localhost:8080/api/v1/sales-invoices/totalBySelectedDateRange/${formattedStartDate}/${dateRange.endDate}`,
          {
              withCredentials: true,
              headers: {
                  'Content-Type': 'application/json',
                  // Add any additional headers if needed
              },
          }
      );
      setDetails(response.data)
          console.log(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
  fetchData()
  }, []);

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/cheque/getAll"
        );
        const responseData = response.data;
        console.log(responseData);
        // Assuming your response data has a property named 'newRows'
        const newRows = responseData.newRows;

        console.log(newRows);
        setRows(newRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Typography variant="h6" gutterBottom>
        DASHBOARD
      </Typography>

      <Grid container spacing={3} className="card-container">
        {/* Card 1: Total Profit */}
        <Grid item xs={12} sm={6} md={3} className='custom-card-grid'>
          <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' ,borderRadius:'20px'}}>
            <CardContent>
              <Typography style={{ fontSize:'18px',fontWeight:'bold',color:'#010929' }} color="textSecondary" gutterBottom>
                Total Returns
              </Typography>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
              
                <Grid item>
                  <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
                  <InventoryIcon fontSize="large" color="primary" style={{ color: 'white', backgroundColor: "#F1C40F", borderRadius: '10px', padding: '5px' }} />

                    <Typography style={{ fontSize:'26px',fontWeight:'500',color:'#010929' }}>{details.totalReturnValues}</Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography style={{ fontSize:'14px',fontWeight:'500',color:'#010929' }}>37.5%</Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: 'right' }}>
                <div>
                <Typography style={{ fontSize:'12px',fontWeight:'400',color:'#010929',marginTop:'10px' }}>Compared {dateRange.startDate} to {dateRange.endDate} </Typography>
                 </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Number of Shops */}
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' ,borderRadius:'20px'}}>
            <CardContent>
              <Typography style={{ fontSize:'18px',fontWeight:'bold',color:'#010929' }} color="textSecondary" gutterBottom>
              Total Free Items
              </Typography>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
              
                <Grid item>
                  <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
                  <RemoveShoppingCartIcon fontSize="large" color="primary" style={{ color: 'white', backgroundColor: "#2E86C1", borderRadius: '10px', padding: '5px' }} />

                    <Typography style={{ fontSize:'26px',fontWeight:'500',color:'#010929' }}>{details.totalFreeItems}</Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography style={{ fontSize:'14px',fontWeight:'500',color:'#010929' }}>37.5%</Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: 'right' }}>
                <div>
                  <Typography style={{ fontSize:'12px',fontWeight:'400',color:'#010929',marginTop:'10px' }}>Compared {dateRange.startDate} to {dateRange.endDate} </Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' ,borderRadius:'20px'}}>
            <CardContent>
              <Typography style={{ fontSize:'18px',fontWeight:'bold',color:'#010929' }} color="textSecondary" gutterBottom>
                Total Discounts
              </Typography>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
              
                <Grid item>
                  <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
                  <PeopleAlt fontSize="large" color="primary" style={{ color: 'white', backgroundColor: "#28B463", borderRadius: '10px', padding: '5px' }} />

                    <Typography style={{ fontSize:'26px',fontWeight:'500',color:'#010929' }}>{details.totalDiscount}</Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography style={{ fontSize:'14px',fontWeight:'500',color:'#010929' }}>37.5%</Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: 'right' }}>
                <div>
                <Typography style={{ fontSize:'12px',fontWeight:'400',color:'#010929',marginTop:'10px'}}>Compared {dateRange.startDate} to {dateRange.endDate} </Typography>
 </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' ,borderRadius:'20px'}}>
            <CardContent>
              <Typography style={{ fontSize:'18px',fontWeight:'bold',color:'#010929' }} color="textSecondary" gutterBottom>
                Total Sales
              </Typography>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
              
                <Grid item>
                  <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
                  <Paid fontSize="large" color="primary" style={{ color: 'white', backgroundColor: "#34495E", borderRadius: '10px', padding: '5px' }} />

                    <Typography style={{ fontSize:'26px',fontWeight:'500',color:'#010929' }}>{details.totalSale}</Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography style={{ fontSize:'14px',fontWeight:'500',color:'#010929' }}>37.5%</Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: 'right' }}>
                <div>
                <Typography style={{ fontSize:'12px',fontWeight:'400',color:'#010929',marginTop:'10px' }}>Compared {dateRange.startDate} to {dateRange.endDate} </Typography>
 </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    <Grid>
   
      
    </Grid>
      
    </div>
  );
};
