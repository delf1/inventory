import Mock from "./mock";

import "./db/users";
import "./db/orders";
import "./db/products";
import "./db/inventory";

Mock.onAny().passThrough();
