import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import adminOrderReducer from "./Admin/Orders/reducer";
import categoryReducer from "./Admin/Category/reducer";
import levelOneCategoriesReducer from "./Category/Reducer";
import sidebarReducer from "./Admin/SideBar/SidebarReducer";
import { productMetadataReducer } from "./Admin/AttributesMetadata/reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  products: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  category: categoryReducer,
  adminOrder: adminOrderReducer,
  levelOneCategoriesReducer: levelOneCategoriesReducer,
  sidebar: sidebarReducer,
  productMetaData: productMetadataReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
