import { useState } from "react";

function AddFood() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAdd = () => {
    const foods = JSON.parse(localStorage.getItem("foods")) || [];

    foods.push({ name, quantity });
    localStorage.setItem("foods", JSON.stringify(foods));

    alert("Food added!");
    setName("");
    setQuantity("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Add Food 🍱</h2>

        <input
          style={styles.input}
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button style={styles.button} onClick={handleAdd}>
          Add Food
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  card: {
    padding: "30px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "200px",
  },
  button: {
    padding: "10px",
    background: "#ff7e5f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
  },
};

export default AddFood;