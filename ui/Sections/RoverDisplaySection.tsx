// Import necessary components to display rovers. I understand that we use MainContent to add content and any child content to the planet layout.
import React, { useState, useEffect } from "react";
import { PlanetLayout, MainContent } from "./PlanetLayout"; // Update path
import { createClient } from "@supabase/supabase-js"; // Import Supabase client
import { SessionContextProvider } from "@supabase/auth-helpers-react";

/**
 * Represents a rover with relevant data.
 */
interface Rover {
  id: string; // Unique identifier for the rover
  name: string; // Name of the rover
  image?: string; // Optional image URL for the rover
  // TODO: Add other relevant rover data fields based on Liam's requirements
}

/**
 * Displays information about deployed rovers.
 */
function RoverDisplaySection(): React.FC {
  // State to hold retrieved rovers
  const [rovers, setRovers] = useState<Rover[]>([]);

  // Initialize Supabase client
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  useEffect(() => {
    const fetchRovers = async () => {
      try {
        const { data, error } = await supabase.from("rovers").select("*");

        if (error) {
          console.error("Error fetching rovers:", error);
        } else {
          setRovers(data);
        }
      } catch (error) {
        console.error("Error fetching rovers:", error);
      }
    };
    fetchRovers();
  }, []);

  /**
   * Deploys a rover to a specified sector.
   * @param roverId - ID of the rover to deploy
   * @param sectorId - ID of the target sector
   */
  const deployRover = async (roverId: string, sectorId: string) => {
    try {
      // Update rover data in Supabase
      const updateResponse = await supabase
        .from("rovers")
        .update({ deployed: true, sectorId })
        .eq("id", roverId);

      if (updateResponse.error) {
        throw new Error("Error deploying rover"); // Re-throw for easier handling
      }

      console.log("Rover deployed successfully!");

      // Update local state (if needed)
      const updatedRovers = rovers.map((rover) =>
        rover.id === roverId ? { ...rover, deployed: true } : rover
      );
      setRovers(updatedRovers);

      // Display user-friendly success message
      alert(`Rover deployed successfully to sector ${sectorId}!`);
    } catch (error) {
      console.error("Error deploying rover:", error);
      // Display user-friendly error message (optional)
      alert("Error deploying rover. Please try again later.");
    }
  };

  return (
    <div className="flex justify-between gap-4">
      {rovers.map((rover) => (
        <div key={rover.id} className="rounded-lg shadow-md p-4 flex flex-col items-center">
          <img src={rover.image} alt={rover.name} className="w-20 h-20 mb-2" />
          <h3 className="text-lg font-semibold">{rover.name}</h3>
          <button onClick={() => deployRover(rover.id, "sector123")}>
            Deploy Rover
          </button>
          {/* Add other buttons or interactions specific to each rover */}
        </div>
      ))}
    </div>
  );
}




export default MainContent;
export { RoverDisplaySection }; // Export for potential reuse
