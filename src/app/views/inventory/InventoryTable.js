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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const Row = ({ inventoryItem }) => {
  const { history = [] } = inventoryItem;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
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
          {inventoryItem.name}
        </TableCell>
        <TableCell className="px-0 capitalize" align="left">
          {inventoryItem.available} {inventoryItem.unit}
        </TableCell>
        <TableCell className="px-0" align="center">
          <IconButton>
            <Icon color="primary">add</Icon>
          </IconButton>
          <IconButton>
            <Icon color="error">delete</Icon>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="history">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">
                      Quantity ({inventoryItem.unit})
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history
                    .sort((i1, i2) => {
                      if (i1.date === undefined || i2.date === undefined) {
                        return i1.id - i2.id;
                      } else return i1.date - i2.date;
                    })
                    .map(({ id, date, quantity, price }) => (
                      <TableRow key={id}>
                        <TableCell>
                          {typeof date === "object" &&
                          date.toISOString !== undefined
                            ? date.toISOString().substring(0, 10)
                            : ""}
                        </TableCell>
                        <TableCell align="right">{quantity}</TableCell>
                        <TableCell align="right">{price.format()}</TableCell>
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
    minWidth: "100px",
  },
}));

const InventoryTable = ({ inventory }) => {
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
            <TableCell className="px-0">Name</TableCell>
            <TableCell className="px-0">Available</TableCell>
            <TableCell className="px-0" align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(inventory)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((inventoryItem, index) => (
              <Row inventoryItem={inventoryItem} key={index} />
            ))}
        </TableBody>
      </Table>

      <TablePagination
        className="px-4"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Object.keys(inventory).length}
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

export default InventoryTable;
