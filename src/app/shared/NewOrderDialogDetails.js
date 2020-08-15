import React, { useRef } from "react";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const NewOrderDialogDetails = ({
  name,
  deliveryDate,
  deliveryMethod,
  mobile,
  handleSubmit,
  handleChange,
  handleDateChange,
  dialogButtons,
}) => {
  const formRef = useRef("form");

  return (
    <ValidatorForm
      ref={formRef}
      onSubmit={handleSubmit}
      onError={(errors) => null}
    >
      <Grid container spacing={6}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextValidator
            className="mb-4 w-full"
            label="Customer Name"
            onChange={handleChange}
            type="text"
            name="username"
            value={name}
            validators={[
              "required",
              "minStringLength: 4",
              "maxStringLength: 9",
            ]}
            errorMessages={["this field is required"]}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className="mb-4 w-full"
              margin="none"
              id="mui-pickers-date"
              label="Delivery Date"
              inputVariant="standard"
              type="text"
              autoOk={true}
              value={deliveryDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextValidator
            className="mb-4 w-full"
            label="Customer Phone Number"
            onChange={handleChange}
            type="text"
            name="mobile"
            value={mobile}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <RadioGroup
            className="mb-4"
            value={deliveryMethod}
            name="gender"
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="Delivery"
              control={<Radio color="secondary" />}
              label="Delivery"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Pickup"
              control={<Radio color="secondary" />}
              label="Pickup"
              labelPlacement="end"
            />
          </RadioGroup>
        </Grid>
      </Grid>
      {dialogButtons()}
    </ValidatorForm>
  );
};

export default NewOrderDialogDetails;
