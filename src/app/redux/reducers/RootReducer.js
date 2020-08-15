import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import OrderReducer from "./OrderReducer";
import NavigationReducer from "./NavigationReducer";
import ProductReducer from "./ProductReducer";
import InventoryReducer from "./InventoryReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  orders: OrderReducer,
  products: ProductReducer,
  inventory: InventoryReducer,
  navigations: NavigationReducer,
});

export default RootReducer;
