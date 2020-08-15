import React from "react";
import { authRoles } from "../../auth/authRoles";

const settingsRoutes = [
  {
    path: "/settings",
    component: React.lazy(() => import("./Settings")),
    auth: authRoles.admin,
  },
];

export default settingsRoutes;
