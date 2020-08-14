import React from "react";

const productsRoutes = [
  {
    path: "/products/basic",
    component: React.lazy(() => import("./BasicForm"))
  },
  {
    path: "/products/editor",
    component: React.lazy(() => import("./EditorForm"))
  }
];

export default productsRoutes;
