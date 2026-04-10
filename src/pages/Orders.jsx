import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  const handleAccept = (index) => {
    const updated = [...orders];
    updated[index].status = "Accepted";

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div style={styles.container}>
      <h2>📦 Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} style={styles.card}>
            <h3>{order.name}</h3>
            <p>Quantity: {order.quantity}</p>

            <p>
              Status:{" "}
              <span
                style={{
                  color: order.status === "Pending" ? "orange" : "green",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>

            {/* Admin only */}
            {role === "admin" && order.status === "Pending" && (
              <button
                onClick={() => handleAccept(i)}
                style={styles.button}
              >
                Accept
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "20px" },
  card: {
    background: "#fff",
    margin: "10px auto",
    padding: "20px",
    width: "250px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  button: {
    padding: "8px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
};

export default Orders;