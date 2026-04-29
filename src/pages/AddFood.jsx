import React, { useState } from "react";
import { addFood } from "../services/api";

function AddFood() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodData = {
      name,
      description,
      price: Number(price),
    };

    try {
      await addFood(foodData);
      alert("Food Added Successfully");

      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.log(error);
      alert("Failed to add food");
    }
  };

  return (
    <div style={styles.container}>
      <h2>➕ Add New Food</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button style={styles.button} type="submit">
          Add Food
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
  },
  form: {
    width: "350px",
    margin: "auto",
    padding: "25px",
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#ff7e5f",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default AddFood;
