
import React, { useState } from "react";
import { addFood } from "../services/api";
import "./Add.css";

function AddFood() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addFood({
        name,
        description,
        price: Number(price),
      });

      alert("Food added successfully");
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.log(error);
      alert("Failed to add food");
    }
  };

  return (
    <div className="add-page">
      <div className="add-card">
        <div className="add-left">
          <h1>Add Surplus Food</h1>
          <p>
            Help reduce food wastage by listing available food items for NGOs
            and recipient organizations.
          </p>
        </div>

        <form className="add-form" onSubmit={handleSubmit}>
          <h2>Food Details</h2>

          <input
            type="text"
            placeholder="Food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price / Value"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <button type="submit">Add Food</button>
        </form>
      </div>
    </div>
  );
}

export default AddFood;
