import { useEffect, useState } from "react";
import "./Food.css";

function ViewFood() {
  const [foods, setFoods] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const savedFoods = JSON.parse(localStorage.getItem("frontendFoods")) || [];
    setFoods(savedFoods);
  }, []);

  const deleteFood = (id) => {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
    localStorage.setItem("frontendFoods", JSON.stringify(updatedFoods));
    alert("Food deleted");
  };

  const orderFood = (food) => {
    const ngoName = prompt("Enter NGO Name:");
    const location = prompt("Enter Location:");
    const paymentMode = prompt("Enter Payment Mode:");

    if (!ngoName || !location || !paymentMode) {
      alert("Enter all details");
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
    alert("Order request sent to admin");
  };

  return (
    <div className="food-home">
      <div className="hero">
        <h1>Reduce Food Waste</h1>
        <p>Connect food donors with NGOs and help people in need.</p>
      </div>

      <h2 className="title">Available Food Items</h2>

      {foods.length === 0 ? (
        <h3 className="empty">No food added yet</h3>
      ) : (
        <div className="food-grid">
          {foods.map((food) => (
            <div className="food-card" key={food.id}>
              <img src={food.image} alt={food.name} />

              <div className="food-info">
                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <h4>₹{food.price}</h4>

                {role === "ngo" && (
                  <button onClick={() => orderFood(food)}>Request Food</button>
                )}

                {role === "admin" && (
                  <button className="delete" onClick={() => deleteFood(food.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewFood;
