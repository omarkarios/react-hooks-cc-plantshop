import React, { useState } from "react";

function PlantCard({ plant, onToggleSoldOut }) {
  const [soldOut, setSoldOut] = useState(false);

  const handleClick = () => {
    setSoldOut(!soldOut);
    onToggleSoldOut(plant.id);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {soldOut ? (
        <button className="primary" onClick={handleClick}>
          Out of Stock
        </button>
      ) : (
        <button onClick={handleClick}>In Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
