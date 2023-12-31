import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button, Dialog, Grow, LinearProgress, colors } from "@mui/material";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { AddStockOut } from "./AddStockOut";
import { EditStockOut } from "./EditStockOut";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function createData(stockOutId, product_id, vehicle_id, quantity, date_out) {
  return {
    stockOutId,
    product_id,
    vehicle_id,
    quantity,
    date_out,
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
  {
    id: "stockOutId",
    numeric: false,
    disablePadding: false,
    label: "Stock Out Id",
  },
  {
    id: "product_id",
    numeric: false,
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "vehicle_id",
    numeric: false,
    disablePadding: false,
    label: "Vehicle Number",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "date_out",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
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
          Stock Out List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
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
export const StockOut = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("unitPrice");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [selectedStockOut, setselectedStockOut] = React.useState(null);
  const [openedit, setOpenEdit] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/stock-out/all"
        );
        const responseData = response.data;
        console.log(responseData);
        const newRows = (responseData || []).map((data) => {
          if (!data) {
            console.log('Debugging: data is null', data);
            return null;
          }
        
          console.log('Debugging: data is', data);
        
          return createData(
            data.stockOutId,
            data.product.productName            , // Add null check for nested properties
            data.vehicle.vehicleNumber, // Add null check for nested properties
            data.quantity,
            data.dateOut
          );
        });
        

        console.log(newRows);
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
      await axios.delete(`https://inventrymanagement-springboot-7914283b4e2d.herokuapp.com/api/v1/stock-out/delete/${id}`);

      // Update the state to reflect the changes (remove the deleted row)
      // Inside handleDelete function
      const updatedRows = rows.filter((row) => row.stockOutId !== id);
      setRows(updatedRows);

      // Clear the selected items
      setSelected([]);
      toast.success("Stock out delete successfully:")
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error deleting stock out:", error);
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
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenEdit = (row) => {
    setselectedStockOut(row);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };
  // const formattedDate = new Date(data.date_out).toLocaleDateString();
  const handleAddProduct = async () => {
    // Add logic to handle adding a product
    // ...
    // After adding the product, close the modal
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
        <ToastContainer />
        <Button variant="contained" onClick={handleOpen}>
          Add Stock Out +{" "}
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Grow}
        transitionDuration={500}
      >
        <AddStockOut/>
      </Dialog>
      <Dialog
        open={openedit}
        onClose={handleEditClose}
        TransitionComponent={Grow}
        transitionDuration={500}
      >
        <EditStockOut id={selectedStockOut?selectedStockOut.stockOutId:null}/>
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
                    const uniqueKey = `row-${row.id}`;
                    return (
                      <TableRow
                        key={uniqueKey}
                        hover
                        tabIndex={-1}
                        style={{
                          cursor: "pointer",
                          padding: "0px",
                          height: "50px",
                        }}
                      >
                        <TableCell align="left">{row.stockOutId}</TableCell>
                        <TableCell align="left">{row.product_id}</TableCell>
                        <TableCell align="left">{row.vehicle_id}</TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left">
                          {row.date_out || "N/A"}
                        </TableCell>
                        <TableCell align="left" padding="20px">
                          <IconButton
                            sx={{ color: "#3498DB" }}
                            aria-label="Edit"
                            onClick={() => handleOpenEdit(row)} // Pass the row to handleOpenEdit
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            onClick={() => handleDelete(row.stockOutId)}
                            sx={{ color: "#E74C3C" }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
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
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
};
