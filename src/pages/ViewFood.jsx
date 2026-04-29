import { useEffect, useState } from "react";
import { getFood, deleteFood } from "../services/api";

function ViewFood() {
  const [foods, setFoods] = useState([]);
  const role = localStorage.getItem("role");

  const loadFoods = async () => {
    try {
      const res = await getFood();
      setFoods(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load foods");
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFood(id);
      alert("Food deleted successfully");
      loadFoods();
    } catch (error) {
      console.log(error);
      alert("Delete failed. Check backend DELETE API.");
    }
  };

  const handleOrder = (food) => {
    const ngoName = prompt("Enter NGO Name:");
    const location = prompt("Enter Location:");
    const paymentMode = prompt("Enter Payment Mode: Cash / UPI / Card");

    if (!ngoName || !location || !paymentMode) {
      alert("Please enter all details");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
      id: Date.now(),
      foodName: food.name,
      price: food.price,
      ngoName,
      location,
      paymentMode,
      status: "Pending",
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Order placed successfully");
  };

  const totalFoods = foods.length;
  const totalPrice = foods.reduce(
    (sum, food) => sum + Number(food.price || 0),
    0
  );

  return (
    <div style={styles.container}>
      <h2>🍔 Food Dashboard</h2>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3>{totalFoods}</h3>
          <p>Total Items</p>
        </div>

        <div style={styles.statCard}>
          <h3>₹{totalPrice}</h3>
          <p>Total Price</p>
        </div>
      </div>

      <div style={styles.grid}>
        {foods.map((food) => (
          <div key={food.id} style={styles.card}>
            <img
              src={`https://source.unsplash.com/200x150/?${food.name}`}
              alt="food"
              style={styles.image}
            />

            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p>Price: ₹{food.price}</p>

            {role === "ngo" && (
              <button style={styles.orderBtn} onClick={() => handleOrder(food)}>
                Order
              </button>
            )}

            {role === "admin" && (
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(food.id)}
              >
                Delete
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
    marginBottom: "25px",
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
    width: "230px",
    padding: "15px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  orderBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    background: "#ff7e5f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ViewFood;
