import { useEffect, useState } from "react";
import { getFood } from "../services/api";
import "./Home.css";

function ViewFood() {
  const [foods, setFoods] = useState([]);
  const role = localStorage.getItem("role");

  const loadFoods = async () => {
    try {
      const res = await getFood();
      setFoods(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load food data");
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleOrder = (food) => {
    const ngoName = prompt("Enter NGO Name:");
    const location = prompt("Enter NGO Location:");
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
    alert("Order request sent to admin");
  };

  const totalFoods = foods.length;
  const totalPrice = foods.reduce(
    (sum, food) => sum + Number(food.price || 0),
    0
  );

  return (
    <div className="home-page">
      <section className="hero">
        <div>
          <h1>Reduce Food Waste. Improve Food Security.</h1>
          <p>
            A smart platform that connects food donors with NGOs to distribute
            surplus food efficiently.
          </p>
        </div>
      </section>

      <div className="stats">
        <div className="stat-box">
          <h2>{totalFoods}</h2>
          <p>Available Items</p>
        </div>

        <div className="stat-box">
          <h2>₹{totalPrice}</h2>
          <p>Total Food Value</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>Access</p>
        </div>
      </div>

      <h2 className="section-title">Available Food Items</h2>

      <div className="food-grid">
        {foods.map((food) => (
          <div className="food-card" key={food.id}>
            <img
              src={`https://source.unsplash.com/400x300/?${food.name},food`}
              alt={food.name}
            />

            <div className="food-content">
              <h3>{food.name}</h3>
              <p>{food.description || "Fresh food available for donation."}</p>
              <h4>₹{food.price}</h4>

              {role === "ngo" && (
                <button onClick={() => handleOrder(food)}>Request Food</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewFood;
