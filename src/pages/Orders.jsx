import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import OrderCard from "../components/OrderCard";

export default function Orders() {
  const { state } = useContext(OrderContext);

  const validOrders = state.orders.filter(order =>
    order.items.length > 0 &&
    order.items.every(i => i.quantity > 0) &&
    order.totalAmount > 0
  );

  return (
    <div>
      <h2>Orders</h2>
      {validOrders.map(order => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}