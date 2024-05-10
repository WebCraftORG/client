// RoverDisplaySection.tsx

import React, { useState, useEffect, useRef } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

interface Rover {
  id: string;
  deployed?: boolean;
}

function RoverDisplaySection() {
  const [rovers, setRovers] = useState<Rover[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [itemsCollected, setItemsCollected] = useState<number>(0);
  const collectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchRovers() {
      try {
        const { data, error } = await supabase.from<Rover>("contentROVERIMAGES").select("*");
        if (error) throw error;
        setRovers(data || []);
      } catch (error) {
        console.error("Error fetching rovers:", error);
        alert("Failed to fetch rovers. Please refresh the page.");
      }
    }
    fetchRovers();
  }, []);

  useEffect(() => {
    if (itemsCollected >= 20) return;

    collectionIntervalRef.current = setInterval(() => {
      setItemsCollected((prevItems) => prevItems + 1);
    }, 10000);

    return () => {
      if (collectionIntervalRef.current) clearInterval(collectionIntervalRef.current);
    };
  }, [itemsCollected]);

  const handleSectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSector(event.target.value);
  };

  const deployRover = async (roverId: string) => {
    try {
      const newItem = {
        item: roverId,
        owner: "user123",
        quantity: 1,
        location: "Planet X",
        sector: selectedSector,
        planetSector: "Sector 42",
        notes: "Collected by rover deployment",
        time_of_deploy: new Date().toISOString(),
      };

      await supabase.from("inventoryUSERS").insert([newItem]);

      const updatedRovers = rovers.map((rover) =>
        rover.id === roverId ? { ...rover, deployed: true } : rover
      );
      setRovers(updatedRovers);

      alert(`Rover deployed successfully to sector ${selectedSector}! Item collected.`);
    } catch (error) {
      console.error("Error deploying rover:", error);
      alert("Error deploying rover. Please try again later.");
    }
  };

  const handleInventoryAccess = () => {
    console.log("Inventory accessed!");
  };

  return (
    <div className="flex justify-between gap-4">
      <button onClick={handleInventoryAccess}>View Inventory</button>
    </div>
  );
}

export default RoverDisplaySection;