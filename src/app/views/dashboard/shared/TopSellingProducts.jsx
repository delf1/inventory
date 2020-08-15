import React from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const TopSellingProducts = ({ list = [] }) => {
  return (
    <Card elevation={3} className="pt-5 mb-6">
      <div className="card-title px-6 mb-3">
        top selling products this month
      </div>
      <div className="overflow-auto">
        <Table className="product-table">
          <TableHead>
            <TableRow>
              <TableCell className="px-6" colSpan={4}>
                Name
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                Revenue
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                Total Sold
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" colSpan={4} align="left">
                  <div className="flex items-center">
                    {/* <img
                      className="circular-image-small"
                      src={product.imgUrl}
                      alt="user"
                    /> */}
                    {product.name}
                  </div>
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                  {product.revenue.format()}
                </TableCell>

                <TableCell className="px-0" align="left" colSpan={2}>
                  <p className="m-0 ml-8">{product.quantity}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TopSellingProducts;
