import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Breadcrumb, SimpleCard } from "matx";
import { Button, Grid } from "@material-ui/core";
import InventoryTable from "./InventoryTable";
import { getAllInventory } from "../../redux/actions/InventoryActions";
import { enrichedInventory } from "../../redux/selectors/InventorySelector";

const Inventory = ({ inventory, getAllInventory }) => {
  useEffect(() => {
    if (Object.keys(inventory).length === 0) {
      getAllInventory();
    }
  }, [inventory, getAllInventory]);

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: "Inventory" }]} />
      </div>
      <div className="mb-sm-20">
        <Button variant="contained" color="primary">
          Add Inventory
        </Button>
        <Button variant="contained" color="primary">
          New Inventory Item
        </Button>
      </div>
      <div className="py-2" />
      <Grid container>
        <Grid item lg={8} sm={12}>
          <SimpleCard title="Inventory">
            <InventoryTable inventory={inventory} />
          </SimpleCard>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  inventory: enrichedInventory(state),
});

export default connect(mapStateToProps, { getAllInventory })(Inventory);
