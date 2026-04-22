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
      <h2>Filter Orders</h2>

      <input
        placeholder="Search restaurant"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search === "" ? (
        <p>Enter something</p>
      ) : filtered.length === 0 ? (
        <p>No results</p>
      ) : (
        filtered.map(o => (
          <div key={o.orderId}>{o.restaurant}</div>
        ))
      )}
    </div>
  );
}