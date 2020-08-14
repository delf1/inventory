import React, { useEffect } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import { Button } from "@material-ui/core";
import OrdersTable from "./OrdersTable";

import { connect } from "react-redux";
import { getAllOrders } from "../../redux/actions/OrderActions";
import { convertToCurrency } from "../../redux/selectors/OrderSelector";
import { status } from "../../utils/orderUtils";

const Orders = ({ orders, getAllOrders }) => {
  useEffect(() => {
    if (orders.length === 0) {
      getAllOrders();
    }
  }, [orders.length, getAllOrders]);

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: "Orders" }]} />
      </div>
      <div className="mb-sm-20">
        <Button variant="contained" color="primary">
          New Order
        </Button>
      </div>
      <div className="py-2" />
      <SimpleCard title="Pending Orders">
        <OrdersTable
          orders={orders.filter((order) => order.status === status.pending)}
        />
      </SimpleCard>
      <div className="py-2" />
      <SimpleCard title="Completed Orders">
        <OrdersTable
          orders={orders.filter((order) => order.status === status.complete)}
        />
      </SimpleCard>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: convertToCurrency(state),
});

export default connect(mapStateToProps, { getAllOrders })(Orders);
