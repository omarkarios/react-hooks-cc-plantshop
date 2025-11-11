import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PlantList from "./components/PlantList";
import NewPlantForm from "./components/NewPlantForm";
import Search from "./components/Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all plants when app loads
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then(setPlants)
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  // Add a new plant
  function handleAddPlant(newPlant) {
    setPlants((prev) => [...prev, newPlant]);
  }

  // Toggle sold out status
  function handleToggleSoldOut(id) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
      )
    );
  }

  // Filter plants by name
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <NewPlantForm onAddPlant={handleAddPlant} />
      <PlantList plants={displayedPlants} onToggleSoldOut={handleToggleSoldOut} />
    </div>
  );
}

export default App;
