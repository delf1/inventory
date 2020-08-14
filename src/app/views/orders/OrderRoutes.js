import React from "react";
import { authRoles } from "../../auth/authRoles";

const dashboardRoutes = [
  {
    path: "/orders",
    component: React.lazy(() => import("./Orders")),
    auth: authRoles.admin,
  },
];

export default dashboardRoutes;
