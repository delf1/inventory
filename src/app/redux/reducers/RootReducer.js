import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import OrderReducer from "./OrderReducer";
import NavigationReducer from "./NavigationReducer";
import ProductReducer from "./ProductReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  orders: OrderReducer,
  products: ProductReducer,
  navigations: NavigationReducer,
});

export default RootReducer;
