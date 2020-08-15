import React, { Fragment, useEffect } from "react";
import { Grid } from "@material-ui/core";

import ModifiedAreaChart from "./shared/ModifiedAreaChart";
import StatCards from "./shared/StatCards";
import TopSellingProducts from "./shared/TopSellingProducts";
import UpcomingOrder from "./shared/UpcomingOrder";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { getAllOrders } from "../../redux/actions/OrderActions";
import { getAllProducts } from "../../redux/actions/ProductActions";
import { joinOrderProducts } from "../../redux/selectors/OrderSelector";
import {
  getItemList,
  calculateOrderTotal,
  zeroValue,
} from "../../utils/orderUtils";

const Dashboard1 = ({ orders, getAllOrders, getAllProducts }) => {
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <Fragment>
      <div className="pb-24 pt-7 px-8 bg-primary">
        <div className="card-title capitalize text-white mb-4 text-white-secondary">
          Last 12 months sales
        </div>
        <ModifiedAreaChart
          height="280px"
          option={{
            series: [
              {
                data: [34, 45, 31, 45, 31, 43, 26, 43, 31, 45, 33, 40],
                type: "line",
              },
            ],
            xAxis: {
              data: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          }}
        ></ModifiedAreaChart>
      </div>

      <div className="analytics m-sm-30 mt--18">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards
              numOrders={orders.length}
              sales={orders
                .map((order) => calculateOrderTotal(order))
                .reduce(
                  (accumulator, currentValue) => accumulator.add(currentValue),
                  zeroValue
                )
                .format()}
            />
            <h4 className="card-title text-muted mb-4">Upcoming Orders</h4>
            {orders.length === 0 ? (
              <h6 className="text-muted">No orders yet</h6>
            ) : (
              orders.map((order) => <UpcomingOrder key={order.id} {...order} />)
            )}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            {/* Top Selling Products */}
            <TopSellingProducts list={getItemList(orders)} />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orders: joinOrderProducts(state),
});

export default withStyles(
  {},
  { withTheme: true }
)(connect(mapStateToProps, { getAllOrders, getAllProducts })(Dashboard1));
