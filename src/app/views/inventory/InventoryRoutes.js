import React from "react";
import { authRoles } from "../../auth/authRoles";

const inventoryRoutes = [
  {
    path: "/inventory",
    component: React.lazy(() => import("./Inventory")),
    auth: authRoles.admin,
  },
];

export default inventoryRoutes;
