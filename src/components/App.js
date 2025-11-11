import React, { useEffect, useState } from "react";
import Header from "./Header";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants((prev) => [...prev, newPlant]);
  };

  const handleToggleSoldOut = (id) => {
    setPlants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, soldOut: !p.soldOut } : p))
    );
  };

  const filteredPlants = plants.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onToggleSoldOut={handleToggleSoldOut} />
    </div>
  );
}

export default App;
