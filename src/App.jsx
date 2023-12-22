// App.js

import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css"; // Import your SCSS file for styling
import { Sidebar } from "./components/sidebar/Sidebar";

import { AddNewProducts } from "./pages/products/AddNewProducts";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Login } from "./pages/login/Login";
import { Navbar } from "./components/navbar/Navbar";
import { Products } from "./pages/products/Products";
import { AddNewShop } from "./pages/shop/AddNewShop";
import { Shop } from "./pages/shop/Shop";
import { SalesInvoice } from "./pages/sales/SalesInvoice";
import { SalesInvoiceDetails } from "./pages/sales/SalesInvoiceDetails";
import { DeliveryRoute } from "./pages/deliveryRoute/DeliveryRoute";
import { NewSales } from "./pages/sales/NewSales";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes without Sidebar */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with Sidebar */}
        <Route
          path="/*"
          element={
            <Sidebar>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/productList" element={<Products />} />
                <Route path="/shopsList" element={<Shop />} />
                <Route path="/deliveryRoute" element={<DeliveryRoute />} />
                <Route path="/newsale" element={<NewSales />} />
                <Route path="/salesInvoice" element={<SalesInvoice />} />
                <Route path="/salesInvoiceDetails" element={<SalesInvoiceDetails />} />
                <Route path="/addNewShop" element={<AddNewShop />} />
                {/* Add other protected routes here */}
              </Routes>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
