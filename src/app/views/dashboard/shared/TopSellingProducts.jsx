import React from "react";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const TopSellingProducts = ({ list = [] }) => {
  const productList = [
    {
      imgUrl: "/assets/images/products/headphone-2.jpg",
      name: "earphone",
      price: 100,
      available: 15,
    },
    {
      imgUrl: "/assets/images/products/headphone-3.jpg",
      name: "earphone",
      price: 1500,
      available: 30,
    },
    {
      imgUrl: "/assets/images/products/iphone-2.jpg",
      name: "iPhone x",
      price: 1900,
      available: 35,
    },
    {
      imgUrl: "/assets/images/products/iphone-1.jpg",
      name: "iPhone x",
      price: 100,
      available: 0,
    },
    {
      imgUrl: "/assets/images/products/headphone-3.jpg",
      name: "Head phone",
      price: 1190,
      available: 5,
    },
  ];

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
                    <p className="m-0 ml-8">{product.id}</p>
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
