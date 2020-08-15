import React, { useState, useEffect } from "react";
import {
  Icon,
  Button,
  IconButton,
  Stepper,
  StepLabel,
  Step,
} from "@material-ui/core";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import NewOrderDialogDetails from "./NewOrderDialogDetails";
import NewOrderDialogItems from "./NewOrderDialogItems";
import { getProducts } from "./../redux/selectors/ProductSelector";
import { getAllOrders, saveOrder } from "./../redux/actions/OrderActions";
import { getAllProducts } from "./../redux/actions/ProductActions";
import {
  getAllInventory,
  saveInventoryItem,
} from "./../redux/actions/InventoryActions";
import { status } from "../../app/utils/orderUtils";
import { inventoryAfterOrder } from "../utils/inventoryUtils";
import { getInventory } from "app/redux/selectors/InventorySelector";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = ["Order Details", "Order Items"];

const NewOrderDialog = ({
  theme,
  settings,
  products,
  inventory,
  name,
  deliveryDate = new Date(),
  mobile,
  method,
  items = [],
  saveOrder,
  saveInventoryItem,
  getAllOrders,
  getAllProducts,
  getAllInventory,
}) => {
  const parentThemePalette = theme.palette;

  useEffect(() => {
    if (Object.keys(products).length === 0) {
      getAllProducts();
    }
  }, [products, getAllProducts]);

  useEffect(() => {
    if (Object.keys(inventory).length === 0) {
      getAllInventory();
    }
  }, [inventory, getAllInventory]);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name,
    deliveryDate,
    mobile,
    method,
    items,
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const order = {
      deliveryDate: values.deliveryDate,
      items: values.items,
      customer: { name: values.name, mobile: values.mobile },
      method: values.method,
      status: status.pending,
    };
    saveOrder(order);
    Object.values(
      inventoryAfterOrder(order, products, inventory)
    ).forEach((inventoryItem) => saveInventoryItem(inventoryItem));
  };

  const handleChange = (event) => {
    const target = event.target;
    setValues({ ...values, [target.name]: target.value });
  };

  const handleDateChange = (date) => {
    setValues({ ...values, deliveryDate: date });
  };

  const handleAddItem = (item) => {
    setValues({
      ...values,
      items: [...values.items, { ...item, name: products[item.id].name }],
    });
  };

  const handleRemoveItem = (id) => {
    setValues({
      ...values,
      items: values.items.filter((item) => item.id !== id),
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const dialogButtons = () => {
    const onClick = activeStep === 0 ? handleNext : handleSubmit;
    const type = "button";
    const backButton = activeStep === 0 ? "Cancel" : "Back";
    const nextButton = activeStep === 0 ? "Next" : "Submit";
    const nextDisabled =
      activeStep === 0
        ? values.name === undefined ||
          values.name.length === 0 ||
          values.deliveryDate === undefined ||
          values.mobile === undefined ||
          values.mobile.length === 0 ||
          values.method === undefined ||
          values.method.length === 0
        : values.items.length === 0;

    return (
      <DialogActions>
        <Button
          onClick={activeStep === 0 ? handleClose : handleBack}
          color="secondary"
          variant="outlined"
        >
          {backButton}
        </Button>
        <Button
          onClick={onClick}
          color="primary"
          type={type}
          disabled={nextDisabled}
        >
          {nextButton}
        </Button>
      </DialogActions>
    );
  };

  const getStepContent = (stepIndex) => {
    const detailDialog = (
      <NewOrderDialogDetails
        name={values.name}
        deliveryDate={values.deliveryDate}
        method={values.method}
        mobile={values.mobile}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        dialogButtons={dialogButtons}
      />
    );
    switch (stepIndex) {
      case 0:
        return detailDialog;
      case 1:
        return (
          <NewOrderDialogItems
            products={Object.values(products).filter(
              (product) => !values.items.some((item) => item.id === product.id)
            )}
            items={values.items}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            dialogButtons={dialogButtons}
          />
        );
      default:
        return detailDialog;
    }
  };

  return (
    <ThemeProvider theme={settings.themes[settings.activeTheme]}>
      <IconButton
        onClick={() => setOpen(true)}
        style={{
          color:
            parentThemePalette.type === "light"
              ? parentThemePalette.text.secondary
              : parentThemePalette.text.primary,
        }}
      >
        <Icon>add</Icon>
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add a new order</DialogTitle>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <DialogContent>{getStepContent(activeStep)}</DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

NewOrderDialog.propTypes = {
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.layout.settings,
  products: getProducts(state),
  inventory: getInventory(state),
});

export default withStyles(
  {},
  { withTheme: true }
)(
  connect(mapStateToProps, {
    getAllOrders,
    getAllProducts,
    getAllInventory,
    saveOrder,
    saveInventoryItem,
  })(NewOrderDialog)
);
