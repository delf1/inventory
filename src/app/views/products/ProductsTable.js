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

const Row = ({ product }) => {
  const { ingredients = [] } = product;
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
          {product.name}
        </TableCell>
        <TableCell className="px-0" align="center">
          <IconButton>
            <Icon color="primary">edit</Icon>
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
                Ingredients
              </Typography>
              <Table size="small" aria-label="ingredients">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Available</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients
                    .sort((i1, i2) => {
                      if (i1.name === undefined || i2.name === undefined) {
                        return i1.id - i2.id;
                      } else return i1.name.localeCompare(i2.name);
                    })
                    .map(({ id, name, quantity, unit, available }) => (
                      <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell align="right">
                          {quantity} {unit}
                        </TableCell>
                        <TableCell align="right">{available}</TableCell>
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

const ProductsTable = ({ products }) => {
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
            <TableCell className="px-0" align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(products)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product, index) => (
              <Row product={product} key={index} />
            ))}
        </TableBody>
      </Table>

      <TablePagination
        className="px-4"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Object.keys(products).length}
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

export default ProductsTable;
