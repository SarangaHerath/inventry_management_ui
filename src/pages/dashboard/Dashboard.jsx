import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import './dashboard.scss';
import { Paid, PeopleAlt } from '@mui/icons-material';
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
                Total Products
              </Typography>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
              
                <Grid item>
                  <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
                  <InventoryIcon fontSize="large" color="primary" style={{ color: 'white', backgroundColor: "#F1C40F", borderRadius: '10px', padding: '5px' }} />

                    <Typography style={{ fontSize:'26px',fontWeight:'500',color:'#010929' }}>100</Typography>
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
                  <Typography style={{ fontSize:'15px',fontWeight:'400',color:'#010929' }}>Compared to Oct 2023</Typography>
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
              Out-of-Stock Products
              </Typography>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
              
                <Grid item>
                  <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
                  <RemoveShoppingCartIcon fontSize="large" color="primary" style={{ color: 'white', backgroundColor: "#2E86C1", borderRadius: '10px', padding: '5px' }} />

                    <Typography style={{ fontSize:'26px',fontWeight:'500',color:'#010929' }}>100</Typography>
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
                  <Typography style={{ fontSize:'15px',fontWeight:'400',color:'#010929' }}>Compared to Oct 2023</Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' ,borderRadius:'20px'}}>
            <CardContent>
              <Typography style={{ fontSize:'18px',fontWeight:'bold',color:'#010929' }} color="textSecondary" gutterBottom>
                Total Customers
              </Typography>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
              
                <Grid item>
                  <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
                  <PeopleAlt fontSize="large" color="primary" style={{ color: 'white', backgroundColor: "#28B463", borderRadius: '10px', padding: '5px' }} />

                    <Typography style={{ fontSize:'26px',fontWeight:'500',color:'#010929' }}>100</Typography>
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
                  <Typography style={{ fontSize:'15px',fontWeight:'400',color:'#010929' }}>Compared to Oct 2023</Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' ,borderRadius:'20px'}}>
            <CardContent>
              <Typography style={{ fontSize:'18px',fontWeight:'bold',color:'#010929' }} color="textSecondary" gutterBottom>
                Total Profit
              </Typography>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
              
                <Grid item>
                  <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
                  <Paid fontSize="large" color="primary" style={{ color: 'white', backgroundColor: "#34495E", borderRadius: '10px', padding: '5px' }} />

                    <Typography style={{ fontSize:'26px',fontWeight:'500',color:'#010929' }}>100</Typography>
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
                  <Typography style={{ fontSize:'15px',fontWeight:'400',color:'#010929' }}>Compared to Oct 2023</Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    
      
    </div>
  );
};