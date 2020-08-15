import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

import materialRoutes from "./views/material-kit/MaterialRoutes";
import dragAndDropRoute from "./views/Drag&Drop/DragAndDropRoute";

import formsRoutes from "./views/forms/FormsRoutes";
import mapRoutes from "./views/map/MapRoutes";

import orderRoutes from "./views/orders/OrderRoutes";
import productRoutes from "./views/products/ProductRoutes";
import inventoryRoutes from "./views/inventory/InventoryRoutes";
import settingsRoutes from "./views/settings/SettingsRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/analytics" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const devRoutes = [
  ...sessionRoutes,
  ...dashboardRoutes,
  ...materialRoutes,
  ...utilitiesRoutes,
  ...dragAndDropRoute,
  ...orderRoutes,
  ...productRoutes,
  ...inventoryRoutes,
  ...settingsRoutes,
  ...formsRoutes,
  ...mapRoutes,
  ...redirectRoute,
  ...errorRoute,
];

const prodRoutes = [
  ...sessionRoutes,
  ...dashboardRoutes,
  ...orderRoutes,
  ...productRoutes,
  ...inventoryRoutes,
  ...settingsRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default process.env.NODE_ENV === "development" ? devRoutes : prodRoutes;
