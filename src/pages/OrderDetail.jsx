import { useParams } from "react-router-dom";
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export default function OrderDetail() {
  const { id } = useParams();
  const { state } = useContext(OrderContext);

  const order = state.orders.find(o => o.orderId == id);

  if (!order) return <p>Order not found</p>;

  return (
    <div>
      <h2>{order.customerName}</h2>

      {order.items.map((item, i) => {
        const subtotal = item.price * item.quantity;

        return (
          <div key={i}>
            {item.name} - ₹{subtotal}
          </div>
        );
      })}
    </div>
  );
}