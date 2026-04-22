export const orderReducer = (state, action) => {
  switch (action.type) {
    case "MARK_DELIVERED":
      return {
        ...state,
        orders: state.orders.map(order =>
          order.orderId === action.payload
            ? { ...order, status: "delivered" }
            : order
        )
      };

    default:
      return state;
  }
};