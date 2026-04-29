import { useEffect, useState } from "react";
import { getFood } from "../services/api";

function ViewFood() {
  const [foods, setFoods] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      const res = await getFood();
      setFoods(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = (food) => {
    const ngoName = prompt("Enter NGO Name:");
    const location = prompt("Enter NGO Location:");
    const paymentMode = prompt("Enter Payment Mode:");

    if (!ngoName || !location || !paymentMode) {
      alert("Please fill all details");
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fb",
        fontFamily: "Segoe UI",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg,#ff7e5f,#feb47b)",
          color: "white",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h1 style={{ fontSize: "48px", margin: 0 }}>
          Reduce Food Waste
        </h1>

        <p style={{ fontSize: "20px", marginTop: "10px" }}>
          Connect donors with NGOs and help people in need
        </p>
      </div>

      <h2
        style={{
          textAlign: "center",
          marginTop: "35px",
          fontSize: "32px",
        }}
      >
        Available Food Items
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px",
          padding: "40px",
        }}
      >
        {foods.map((food) => (
          <div
            key={food.id}
            style={{
              background: "white",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow:
                "0 12px 30px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={`https://source.unsplash.com/400x300/?${food.name},food`}
              alt={food.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "20px" }}>
              <h3>{food.name}</h3>

              <p style={{ color: "#666" }}>
                {food.description}
              </p>

              <h4
                style={{
                  color: "#ff6b35",
                  fontSize: "24px",
                }}
              >
                ₹{food.price}
              </h4>

              {role === "ngo" && (
                <button
                  onClick={() => handleOrder(food)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    background: "#ff6b35",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Request Food
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewFood;
