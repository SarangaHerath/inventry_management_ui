// PopupComponent.js

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const PopupComponent = ({ data, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Free Issues</DialogTitle>
      <DialogContent>
        {data.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No data to display.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PopupComponent;
