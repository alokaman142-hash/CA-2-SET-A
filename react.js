import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import OrderCard from "../components/OrderCard";

export default function Orders() {
  const { state } = useContext(OrderContext);

  const validOrders = state.orders.filter(order =>
    order.items.length > 0 &&
    order.items.every(i => i.quantity > 0) &&
    order.totalAmount
  );

  return (
    <div>
      {validOrders.map(order => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}

export default function OrderCard({ order }) {
  return (
    <div data-testid="order-item">
      <h3>{order.customerName || "Unknown"}</h3>
      <p>{order.restaurant}</p>
    </div>
  );
}

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
            {item.name} - {subtotal}
          </div>
        );
      })}
    </div>
  );
}

import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";

export default function Filter() {
  const { state } = useContext(OrderContext);
  const [search, setSearch] = useState("");

  const filtered = state.orders.filter(order =>
    order.restaurant.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        placeholder="Search restaurant"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search === "" ? (
        <p>Error: empty input</p>
      ) : filtered.length === 0 ? (
        <p>No results found</p>
      ) : (
        filtered.map(o => (
          <div key={o.orderId}>{o.restaurant}</div>
        ))
      )}
    </div>
  );
}


import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export default function OrderCard({ order }) {
  const { dispatch } = useContext(OrderContext);

  return (
    <div>
      <h3>{order.customerName}</h3>

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

import { useContext, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";

export default function Stats() {
  const { state } = useContext(OrderContext);

  const stats = state.orders.reduce(
    (acc, order) => {
      if (!order.status) return acc;

      acc.totalOrders++;

      if (order.status === "delivered") acc.deliveredOrders++;
      if (order.status === "cancelled") acc.cancelledOrders++;

      return acc;
    },
    {
      totalOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0
    }
  );

  // global expose
  window.appState = stats;

  return (
    <div>
      <div data-testid="total-orders">{stats.totalOrders}</div>
      <div data-testid="delivered-orders">{stats.deliveredOrders}</div>
      <div data-testid="cancelled-orders">{stats.cancelledOrders}</div>
    </div>
  );
}


