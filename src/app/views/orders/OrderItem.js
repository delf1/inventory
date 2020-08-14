import React, { Fragment } from "react";
import { format } from "date-fns";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Checkbox,
  Fab,
  Avatar,
  Hidden,
} from "@material-ui/core";
import PropTypes from "prop-types";

const OrderItem = ({ id, deliveryDate }) => {
  return (
    <Fragment key={id}>
      <Card className="py-2 px-4 project-card">
        <Grid container alignItems="center">
          <Grid item md={5} xs={7}>
            <div className="flex items-center">
              <Checkbox />
              <span className="card__roject-name font-medium">#{id}</span>
            </div>
          </Grid>

          <Grid item md={3} xs={4}>
            <div className="text-muted">
              {format(deliveryDate.getTime(), "MM/dd/yyyy hh:mma")}
            </div>
          </Grid>

          <Hidden smDown>
            <Grid item xs={3}>
              <div className="flex position-relative face-group">
                <Avatar className="avatar" src="/assets/images/face-4.jpg" />
                <Avatar className="avatar" src="/assets/images/face-4.jpg" />
                <Avatar className="avatar" src="/assets/images/face-4.jpg" />
                <Avatar className="number-avatar avatar">+3</Avatar>
              </div>
            </Grid>
          </Hidden>

          <Grid item xs={1}>
            <div className="flex justify-end">
              <IconButton>
                <Icon>more_vert</Icon>
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Card>
      <div className="py-2" />
    </Fragment>
  );
};

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date),
};

export default OrderItem;
