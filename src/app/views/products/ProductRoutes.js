import React from "react";
import { authRoles } from "../../auth/authRoles";

const productRoutes = [
  {
    path: "/products",
    component: React.lazy(() => import("./Products")),
    auth: authRoles.admin,
  },
];

export default productRoutes;
