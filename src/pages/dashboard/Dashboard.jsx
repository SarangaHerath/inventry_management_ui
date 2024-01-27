import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import DiscountTwoToneIcon from "@mui/icons-material/DiscountTwoTone";
import AssistWalkerSharpIcon from "@mui/icons-material/AssistWalkerSharp";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CreditScoreTwoToneIcon from '@mui/icons-material/CreditScoreTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';
import "./dashboard.scss";
import { Paid, PeopleAlt } from "@mui/icons-material";
import axios from "axios";
import PopupComponent from "./PopupComponent ";
export const Dashboard = () => {
  // Placeholder data for the graph
  const graphData = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  ];
  const [details, setDetails] = useState({});
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: new Date().toISOString().split("T")[0],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Move the declaration outside the try block
        const formattedStartDate = firstDayOfMonth.toISOString().split("T")[0];

        // Update the startDate in the state
        setDateRange((prevDateRange) => ({
          ...prevDateRange,
          startDate: formattedStartDate,
        }));

        // Fetch data for the total profit
        const profitResponse = await axios.get(
          `http://localhost:8080/api/v1/sales-invoices/totalBySelectedDateRange/${formattedStartDate}/${dateRange.endDate}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Update the total profit details in the state
        setDetails((prevDetails) => ({
          ...prevDetails,
          totalReturnValues: profitResponse.data.totalReturnValues,
          totalSale: profitResponse.data.totalSale,
          totalDiscount: profitResponse.data.totalDiscount,
          totalFreeItems: profitResponse.data.totalFreeItems,
          totalCheque: profitResponse.data.totalCheque,
          totalCredit: profitResponse.data.totalCredit,
          totalCash: profitResponse.data.totalCash,
          // Add more fields based on your API response structure
        }));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange.endDate]);
  

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/cheque/getAll"
        );
        const responseData = response.data;
        console.log(responseData);

        setRows(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/freeIssue/getFreeIssueMonth",
        {
          fromDate: dateRange.startDate,
          toDate: dateRange.endDate
        }
      );
      setPopupData(response.data);
      setPopupOpen(true);
    } catch (error) {
      console.error("Error fetching free issue data:", error);
    }
  };
  
  


  return (
    <div className="dashboard-container">
      <Typography variant="h6" gutterBottom>
        DASHBOARD
      </Typography>

      <Grid container spacing={3} className="card-container">
        {/* Card 1: Total Profit */}
        <Grid item xs={12} sm={6} md={3} className="custom-card-grid">
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#010929",
                }}
                color="textSecondary"
                gutterBottom
              >
                Total Returns
              </Typography>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <InventoryIcon
                      fontSize="large"
                      color="primary"
                      style={{
                        color: "white",
                        backgroundColor: "#F1C40F",
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                    />

                    <Typography
                      style={{
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    >
                      {details.totalReturnValues}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    ></Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: "right" }}>
                <div>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#010929",
                      marginTop: "10px",
                    }}
                  >
                    Compared {dateRange.startDate} to {dateRange.endDate}{" "}
                  </Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Number of Shops */}
        <Grid item xs={12} sm={6} md={3} onClick={handleCardClick}>
        <Card
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
            borderRadius: "20px",
          }}
        >
            <CardContent>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#010929",
                }}
                color="textSecondary"
                gutterBottom
              >
                Total Free Items
              </Typography>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <AssistWalkerSharpIcon
                      fontSize="large"
                      color="primary"
                      style={{
                        color: "white",
                        backgroundColor: "#2E86C1",
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                    />

                    <Typography
                      style={{
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    >
                      {details.totalFreeItems}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    ></Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: "right" }}>
                <div>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#010929",
                      marginTop: "10px",
                    }}
                  >
                    Compared {dateRange.startDate} to {dateRange.endDate}{" "}
                  </Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* Popup for Free Items */}
      <PopupComponent
        data={popupData}
        open={isPopupOpen}
        onClose={() => setPopupOpen(false)}
      />
        <Grid item xs={12} sm={6} md={3}>
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#010929",
                }}
                color="textSecondary"
                gutterBottom
              >
                Total Discounts
              </Typography>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <DiscountTwoToneIcon
                      fontSize="large"
                      color="primary"
                      style={{
                        color: "white",
                        backgroundColor: "#28B463",
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                    />

                    <Typography
                      style={{
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    >
                      {details.totalDiscount}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    ></Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: "right" }}>
                <div>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#010929",
                      marginTop: "10px",
                    }}
                  >
                    Compared {dateRange.startDate} to {dateRange.endDate}{" "}
                  </Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#010929",
                }}
                color="textSecondary"
                gutterBottom
              >
                Total Sales
              </Typography>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <Paid
                      fontSize="large"
                      color="primary"
                      style={{
                        color: "white",
                        backgroundColor: "#34495E",
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                    />

                    <Typography
                      style={{
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    >
                      {details.totalSale}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    ></Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: "right" }}>
                <div>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#010929",
                      marginTop: "10px",
                    }}
                  >
                    Compared {dateRange.startDate} to {dateRange.endDate}{" "}
                  </Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>


       <Grid></Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#010929",
                }}
                color="textSecondary"
                gutterBottom
              >
                Total Credit
              </Typography>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                  
                    <CreditScoreTwoToneIcon
                      fontSize="large"
                      color="primary"
                      style={{
                        color: "white",
                        backgroundColor: "#28B463",
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                    />

                    <Typography
                      style={{
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    >
                      {details.totalCredit}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    ></Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: "right" }}>
                <div>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#010929",
                      marginTop: "10px",
                    }}
                  >
                    Compared {dateRange.startDate} to {dateRange.endDate}{" "}
                  </Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} sm={6} md={3}>
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#010929",
                }}
                color="textSecondary"
                gutterBottom
              >
                Total Cheque
              </Typography>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                   
                    <PaymentTwoToneIcon
                      fontSize="large"
                      color="primary"
                      style={{
                        color: "white",
                        backgroundColor: "#28B463",
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                    />

                    <Typography
                      style={{
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    >
                      {details.totalCheque}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    ></Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: "right" }}>
                <div>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#010929",
                      marginTop: "10px",
                    }}
                  >
                    Compared {dateRange.startDate} to {dateRange.endDate}{" "}
                  </Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#010929",
                }}
                color="textSecondary"
                gutterBottom
              >
                Total Cash
              </Typography>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    
                    <PaymentsTwoToneIcon
                      fontSize="large"
                      color="primary"
                      style={{
                        color: "white",
                        backgroundColor: "#28B463",
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                    />

                    <Typography
                      style={{
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    >
                      {details.totalCash}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#010929",
                      }}
                    ></Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: "right" }}>
                <div>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#010929",
                      marginTop: "10px",
                    }}
                  >
                    Compared {dateRange.startDate} to {dateRange.endDate}{" "}
                  </Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>



      </Grid>
      <Typography variant="h6" gutterBottom>
        CHEQUE LIST
      </Typography>
      <Grid container spacing={3} className="card-container">
        <Grid item xs={12} sm={12} md={4}>
          <div style={{ height: "350px", overflowY: "auto" }}>
            {/* List of Containers for Rows */}
            {rows && rows.length > 0 ? (
              rows.map((row, index) => (
                <Grid item key={index}>
                  <Card
                    style={{
                      height: "50px",
                      marginBottom: "16px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Customize the content based on your row data */}
                    <CardContent
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Typography fontSize={12}>
                          {row.shop.shopName}
                        </Typography>
                        <Typography fontSize={12}>
                          {row.chequeNumber}
                        </Typography>
                      </div>

                      <Typography fontSize={12}>{row.bankDate}</Typography>

                      {/* Add more content based on your row structure */}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <p>No rows to display.</p>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
