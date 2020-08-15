import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Breadcrumb, SimpleCard } from "matx";
import { Button, Grid } from "@material-ui/core";
import { getAllProducts } from "./../../redux/actions/ProductActions";
import { getProducts } from "./../../redux/selectors/ProductSelector";
import ProductsTable from "./ProductsTable";

const Products = ({ products, getAllProducts }) => {
  useEffect(() => {
    if (Object.keys(products).length === 0) {
      getAllProducts();
    }
  }, [products, getAllProducts]);

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: "Products" }]} />
      </div>
      <div className="mb-sm-20">
        <Button variant="contained" color="primary">
          New Product
        </Button>
      </div>
      <div className="py-2" />
      <Grid container>
        <Grid item lg={8} sm={12}>
          <SimpleCard title="Products">
            <ProductsTable products={products} />
          </SimpleCard>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
});

export default connect(mapStateToProps, { getAllProducts })(Products);
