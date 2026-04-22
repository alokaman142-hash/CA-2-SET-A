import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export default function OrderCard({ order }) {
  const { dispatch } = useContext(OrderContext);

  return (
    <div data-testid="order-item">
      <h3>{order.customerName}</h3>
      <p>{order.restaurant}</p>

      {order.status !== "delivered" && (
        <button
          onClick={() =>
            dispatch({
              type: "MARK_DELIVERED",
              payload: order.orderId
            })
          }
        >
          Mark Delivered
        </button>
      )}
    </div>
  );
}