
import React, { useState } from "react";
import { addFood } from "../services/api";
import "./Food.css";

function AddFood() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodData = {
      id: Date.now(),
      name,
      description,
      price,
      image: image || `https://source.unsplash.com/400x300/?${name},food`,
    };

    try {
      await addFood({
        name,
        description,
        price: Number(price),
      });
    } catch (error) {
      console.log("Backend save failed, but frontend saved");
    }

    const oldFoods = JSON.parse(localStorage.getItem("frontendFoods")) || [];
    localStorage.setItem("frontendFoods", JSON.stringify([...oldFoods, foodData]));

    alert("Food added successfully");

    setName("");
    setDescription("");
    setPrice("");
    setImage("");
  };

  return (
    <div className="food-add-page">
      <div className="food-form-card">
        <h1>🍽 Add Food Donation</h1>
        <p>Add surplus food details for NGOs and needy people.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Food Description"
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

          <input
            type="text"
            placeholder="Image URL optional"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button type="submit">Add Food</button>
        </form>
      </div>
    </div>
  );
}

export default AddFood;
