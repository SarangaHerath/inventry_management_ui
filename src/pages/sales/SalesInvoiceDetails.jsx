import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { alpha, LinearProgress, Button, Dialog, Grow } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";

function createData(id, salesInvoiceId, product, quantity, unitPrice) {
  return {
    id,
    salesInvoiceId,
    product,
    quantity,
    unitPrice,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  { id: "salesInvoiceId", numeric: false, disablePadding: false, label: "Sales Invoice ID" },
  { id: "salesDate", numeric: false, disablePadding: false, label: "Sales Date" },
  { id: "shop", numeric: false, disablePadding: false, label: "Shop" },
  { id: "productName", numeric: false, disablePadding: false, label: "Product Name" },
  { id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
  { id: "unitPrice", numeric: true, disablePadding: false, label: "Unit Price" },
  // { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Sales Invoice Details List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export const SalesInvoiceDetails = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/sales-invoices/getAllSalesDetails"
      );
      const responseData = response.data;
      console.log(responseData);
  
    
      const newRows = responseData.map((data) => ({
        id: data.id,
        salesInvoiceId: data.salesInvoice.id,
        salesDate: data.salesInvoice.date,
        shop: data.salesInvoice.shop.shopName,
        productName: data.product.productName,
        quantity: data.quantity,
        unitPrice: data.unitPrice
      }));
  
      setRows(newRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  fetchData();
}, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the API endpoint
      await axios.delete(`https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/sales-invoice-details/delete/${id}`);

      // Update the state to reflect the changes (remove the deleted row)
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);

      // Clear the selected items
      setSelected([]);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleOpenEdit = (row) => {
    setSelectedDetails(row);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleAddDetails = async () => {
    // Add logic to handle adding sales invoice details
    // ...
    // After adding the details, close the modal
    handleClose();
  };

  return (
    <Box sx={{}}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        {/* <Button variant="contained" onClick={handleOpen}>
          Add New Sales Invoice Details +
        </Button> */}
      </div>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        TransitionComponent={Grow}
        transitionDuration={500}
      >
        {/* <EditSalesInvoiceDetails
          salesInvoiceDetails={selectedDetails}
          handleAddDetails={handleAddDetails}
        /> */}
      </Dialog>
      <Paper sx={{ width: "100%", mb: 1 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        {rows.length > 0 ? (
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
      <TableBody>
        {stableSort(rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <TableRow
                hover
                tabIndex={-1}
                key={row.id}
                style={{ cursor: 'pointer', padding: '0px', height: '50px' }}
              
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.salesInvoiceId}</TableCell>
                <TableCell align="left">{row.salesDate}</TableCell>
                <TableCell align="left">{row.shop}</TableCell>
                <TableCell align="left">{row.productName}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.unitPrice}</TableCell>
                {/* <TableCell align="left">
                  <IconButton
                    sx={{ color: "#3498DB" }}
                    aria-label="Edit"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => handleDelete(row.id)}
                    sx={{ color: "#E74C3C" }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            );
          })}
      </TableBody>

            </Table>
          </TableContainer>
        ) : (
          <LinearProgress />
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
