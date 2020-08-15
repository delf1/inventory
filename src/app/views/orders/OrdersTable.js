import React, { useState } from "react";
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination,
  TableContainer,
  Collapse,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { calculateOrderTotal } from "../../utils/orderUtils";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const Row = ({ order }) => {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  console.log(order);
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
          </IconButton>
        </TableCell>
        <TableCell className="px-0 capitalize" align="left">
          {order.id}
        </TableCell>
        <TableCell className="px-0 capitalize" align="left">
          {order.customer.name}
        </TableCell>
        <TableCell className="px-0 capitalize" align="left">
          {order.deliveryDate.toISOString().substring(0, 10)}
        </TableCell>
        <TableCell className="px-0 capitalize">
          {calculateOrderTotal(order).format()}
        </TableCell>
        <TableCell className="px-0" align="center">
          <IconButton>
            <Icon style={{ color: "green" }}>done</Icon>
          </IconButton>
          <IconButton>
            <Icon color="primary">edit</Icon>
          </IconButton>
          <IconButton>
            <Icon color="error">delete</Icon>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items
                    .sort((i1, i2) => {
                      if (i1.name === undefined || i2.name === undefined) {
                        return i1.id - i2.id;
                      } else return i1.name.localeCompare(i2.name);
                    })
                    .map(({ id, name, quantity, price }) => (
                      <TableRow key={id}>
                        <TableCell>{name}</TableCell>
                        <TableCell align="right">{quantity}</TableCell>
                        <TableCell align="right">
                          {price.multiply(quantity).format()}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "600px",
  },
}));

const OrdersTable = ({ orders }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  const classes = useStyles();

  return (
    <TableContainer>
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className="px-0">ID</TableCell>
            <TableCell className="px-0">Customer Name</TableCell>
            <TableCell className="px-0">Delivery Date</TableCell>
            <TableCell className="px-0">Total</TableCell>
            <TableCell className="px-0" align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((order, index) => (
              <Row order={order} key={index} />
            ))}
        </TableBody>
      </Table>

      <TablePagination
        className="px-4"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default OrdersTable;
