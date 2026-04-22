import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export default function Stats() {
  const { state } = useContext(OrderContext);

  const stats = state.orders.reduce(
    (acc, order) => {
      acc.total++;

      if (order.status === "delivered") acc.delivered++;
      if (order.status === "cancelled") acc.cancelled++;

      return acc;
    },
    {
      total: 0,
      delivered: 0,
      cancelled: 0
    }
  );

  window.appState = stats;

  return (
    <div>
      <h2>Stats</h2>
      <p>Total: {stats.total}</p>
      <p>Delivered: {stats.delivered}</p>
      <p>Cancelled: {stats.cancelled}</p>
    </div>
  );
}