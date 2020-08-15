import React, { useState } from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = ["Order Details", "Order Items"];

const NewOrderDialog = ({
  theme,
  settings,
  products,
  name,
  deliveryDate,
  mobile,
  deliveryMethod,
  items,
}) => {
  const parentThemePalette = theme.palette;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name,
    deliveryDate,
    mobile,
    deliveryMethod,
    items: [],
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
    const target = event.target;
    setValues({ ...values, [target.name]: target.value });
  };

  const handleDateChange = (date) => {
    // console.log(date);

    setValues({ ...values, date });
  };

  const handleAddItem = (item) => {
    setValues({ ...values, items: [...values.items, item] });
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

  const dialogButtons = () => (
    <DialogActions>
      <Button
        onClick={activeStep === 0 ? handleClose : handleBack}
        color="secondary"
        variant="outlined"
      >
        {activeStep === 0 ? "Cancel" : "Back"}
      </Button>
      <Button
        onClick={activeStep === 0 ? handleNext : handleSubmit}
        color="primary"
        type={activeStep === 0 ? "button" : "submit"}
      >
        {activeStep === 0 ? "Next" : "Submit"}
      </Button>
    </DialogActions>
  );

  const getStepContent = (stepIndex) => {
    const detailDialog = (
      <NewOrderDialogDetails
        name={name}
        deliveryDate={deliveryDate}
        deliveryMethod={deliveryMethod}
        mobile={mobile}
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
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleAddItem={handleAddItem}
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
        onClick={handleClickOpen}
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
});

export default withStyles(
  {},
  { withTheme: true }
)(connect(mapStateToProps, {})(NewOrderDialog));
