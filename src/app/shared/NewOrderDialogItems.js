import React, { useRef, useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { zeroValue } from "../utils/orderUtils";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  productFormControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  addButton: {
    alignSelf: "flex-end",
  },
}));

const ItemsTable = ({ items, handleRemoveItem }) => {
  return (
    <div className="overflow-auto">
      <Table className="product-table">
        <TableHead>
          <TableRow>
            <TableCell className="px-6" colSpan={2}>
              Name
            </TableCell>
            <TableCell className="px-0" colSpan={1}>
              Quantity
            </TableCell>
            <TableCell className="px-0" colSpan={1}>
              Price
            </TableCell>
            <TableCell className="px-0" colSpan={1}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="px-0 capitalize" colSpan={2} align="left">
                {item.name}
              </TableCell>
              <TableCell className="px-0 capitalize" align="left" colSpan={1}>
                {item.quantity}
              </TableCell>
              <TableCell className="px-0 capitalize" align="left" colSpan={1}>
                {zeroValue.add(item.price).format()}
              </TableCell>
              <TableCell className="px-0 capitalize" align="left" colSpan={1}>
                <IconButton onClick={() => handleRemoveItem(item.id)}>
                  <Icon color="error">delete</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const NewOrderDialogItems = ({
  products,
  items,
  handleSubmit,
  handleAddItem,
  handleRemoveItem,
  dialogButtons,
}) => {
  const classes = useStyles();
  const formRef = useRef("form");

  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleItemChange = (event) => {
    const target = event.target;
    setSelectedItemId(target.value);
  };

  const handleQuantityChange = (event) => {
    const target = event.target;
    setQuantity(target.value);
  };

  const handlePriceChange = (event) => {
    const target = event.target;
    setPrice(target.value);
  };

  const handleAddItemInternal = () => {
    if (selectedItemId.length !== 0 && quantity.length !== 0 && quantity > 0) {
      setSelectedItemId("");
      setQuantity("");
      setPrice("");
      handleAddItem({
        id: selectedItemId,
        quantity: Number(quantity),
        price: Number(price),
      });
    }
  };

  return (
    <ValidatorForm
      ref={formRef}
      onSubmit={handleSubmit}
      onError={(errors) => null}
    >
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <FormControl className={classes.productFormControl}>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedItemId}
              onChange={handleItemChange}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3} md={6} sm={12} xs={12}>
          <TextValidator
            className={classes.formControl}
            label="Quantity"
            onChange={handleQuantityChange}
            value={quantity}
            type="number"
            name="quantity"
            disabled={selectedItemId.length === 0}
            errorMessages={["Please enter a quantity"]}
          />
        </Grid>
        <Grid item lg={3} md={6} sm={12} xs={12}>
          <TextValidator
            className={classes.formControl}
            label="Price"
            onChange={handlePriceChange}
            value={price}
            type="number"
            name="price"
            disabled={selectedItemId.length === 0}
            errorMessages={["Please enter a price"]}
          />
        </Grid>
        <Grid item lg={2} md={6} sm={12} xs={12} className={classes.addButton}>
          <Button
            onClick={handleAddItemInternal}
            variant="outlined"
            color="primary"
            disabled={
              selectedItemId.length === 0 ||
              quantity.length === 0 ||
              quantity < 1
            }
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <ItemsTable items={items} handleRemoveItem={handleRemoveItem} />
      {dialogButtons()}
    </ValidatorForm>
  );
};

export default NewOrderDialogItems;
