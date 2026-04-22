import React, { createContext, useReducer } from "react";
import { orderReducer } from "./orderReducer";
import data from "../data";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: data
  });

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};