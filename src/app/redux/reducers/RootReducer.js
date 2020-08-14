import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import OrderReducer from "./OrderReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import NavigationReducer from "./NavigationReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  orders: OrderReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  navigations: NavigationReducer,
});

export default RootReducer;
