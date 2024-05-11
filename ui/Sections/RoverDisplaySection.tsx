import React, { useState, useEffect, useRef } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

interface Rover {
  id: string;
  deployed?: boolean;
}

function RoverDisplaySection() {
  const [rovers, setRovers] = useState<Rover[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [itemsCollected, setItemsCollected] = useState<number>(0);
  const collectionIntervalRef = useRef<NodeJS.Timeout | null>(null);


  const supabase: SupabaseClient = useSupabaseClient();

  useEffect(() => {
    async function fetchRovers() {
      const { data, error } = await supabase.from<Rover>("contentROVERIMAGES").select("*");
      if (error) throw error;
      setRovers(data || []);
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