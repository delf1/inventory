import React, { useRef, useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  addButton: {
    alignSelf: "flex-end",
  },
}));

const NewOrderDialogItems = ({
  products,
  items,
  handleSubmit,
  handleAddItem,
  dialogButtons,
}) => {
  const classes = useStyles();
  const formRef = useRef("form");

  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleItemChange = (event) => {
    const target = event.target;
    setSelectedItem(target.value);
  };

  const handleQuantityChange = (event) => {
    const target = event.target;
    setQuantity(target.value);
  };

  return (
    <ValidatorForm
      ref={formRef}
      onSubmit={handleSubmit}
      onError={(errors) => null}
    >
      <Grid container spacing={2}>
        <Grid item lg={5} md={5} sm={12} xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedItem}
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
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextValidator
            className={classes.formControl}
            label="Quantity"
            onChange={handleQuantityChange}
            value={quantity}
            type="number"
            name="quantity"
            errorMessages={["this field is required"]}
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12} className={classes.addButton}>
          <Button onClick={() => handleAddItem(selectedItem)}>Add</Button>
        </Grid>
      </Grid>
      {dialogButtons()}
    </ValidatorForm>
  );
};

export default NewOrderDialogItems;
