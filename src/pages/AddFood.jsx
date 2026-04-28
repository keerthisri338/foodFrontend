import React, { useState } from "react";
import { addFood } from "../services/api";

function AddFood() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodData = {
      name: name,
      description: description,
      price: Number(price),
    };

    try {
      await addFood(foodData);
      alert("Food Added Successfully to Backend");

      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.log(error);
      alert("Failed to add food");
    }
  };

  return (
    <div>
      <h2>Add Food</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add Food</button>
      </form>
    </div>
  );
}

export default AddFood;
