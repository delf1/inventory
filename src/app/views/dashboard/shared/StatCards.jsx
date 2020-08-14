import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const styles = (theme) => ({
  icon: {
    fontSize: "44px",
    opacity: 0.6,
    color: theme.palette.primary.main,
  },
});

const cardLayout = ({ classes, icon, title, statistic, details }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card className="play-card p-sm-24 bg-paper" elevation={6}>
        <div className="flex items-center">
          <Icon className={classes.icon}>{icon}</Icon>
          <div className="ml-3">
            <small className="text-muted">{title}</small>
            <h6 className="m-0 mt-1 text-primary font-medium">{statistic}</h6>
          </div>
        </div>
        {details ? (
          <Tooltip title="View Details" placement="top">
            <IconButton onClick={() => details()}>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        ) : undefined}
      </Card>
    </Grid>
  );
};

const StatCards = ({ classes, sales = 0, numOrders }) => {
  return (
    <Grid container spacing={3} className="mb-3">
      {cardLayout({
        classes,
        icon: "attach_money",
        title: "Sales this month",
        statistic: sales,
      })}
      {cardLayout({
        classes,
        icon: "shopping_cart",
        title: "Orders to deliver",
        statistic: numOrders ? numOrders + " Orders" : "None",
      })}
    </Grid>
  );
};

StatCards.propTypes = {
  numOrders: PropTypes.number.isRequired,
};

export default withStyles(styles, { withTheme: true })(StatCards);
