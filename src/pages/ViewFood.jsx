import { useEffect, useState } from "react";

function ViewFood() {
  const [foods, setFoods] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("foods"));

    // 👉 Add default foods if empty
    if (!data || data.length === 0) {
      data = [
        { name: "Pizza", quantity: 10 },
        { name: "Burger", quantity: 15 },
        { name: "Rice Meal", quantity: 20 },
        { name: "Sandwich", quantity: 8 },
      ];
      localStorage.setItem("foods", JSON.stringify(data));
    }

    setFoods(data);
  }, []);

  // 👉 Order function
  const handleOrder = (food) => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
      name: food.name,
      quantity: food.quantity,
      status: "Pending",
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Order placed successfully!");
  };

  // 👉 Dashboard stats
  const totalFoods = foods.length;
  const totalQty = foods.reduce((sum, f) => sum + Number(f.quantity), 0);

  return (
    <div style={styles.container}>
      <h2>🍔 Food Dashboard</h2>

      {/* 📊 Stats */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3>{totalFoods}</h3>
          <p>Total Items</p>
        </div>

        <div style={styles.statCard}>
          <h3>{totalQty}</h3>
          <p>Total Quantity</p>
        </div>
      </div>

      {/* 🍔 Food Cards */}
      <div style={styles.grid}>
        {foods.map((food, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={`https://source.unsplash.com/200x150/?${food.name}`}
              alt="food"
              style={styles.image}
            />

            <h3>{food.name}</h3>
            <p>Quantity: {food.quantity}</p>

            {/* NGO can order */}
            {role === "ngo" && (
              <button
                style={styles.button}
                onClick={() => handleOrder(food)}
              >
                Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    background: "#f5f5f5",
    minHeight: "100vh",
  },

  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },

  statCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "150px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },

  card: {
    width: "220px",
    padding: "15px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer",
  },

  image: {
    width: "100%",
    borderRadius: "10px",
  },

  button: {
    marginTop: "10px",
    padding: "8px",
    background: "#ff7e5f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ViewFood;