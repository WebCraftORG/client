// Importing  necessary components to display rovers I unserstood that we use MainContent to add content and any child content to the planet layout 
import React, { useState, useEffect } from "react";
import { PlanetLayout,  MainContent } from "./PlanetLayout.tsx"; // Update path

/**
 * Represents a rover with relevant data.
 */

interface Rover {
  id: string; // Unique identifier for the rover
  name: string; // Name of the rover
  image?: string; // Optional image URL for the rover
  //TODO:Add other relevant rover data fields based on liams requirments 
}

/**
 * Displays information about deployed rovers.
 */
function RoverDisplaySection(): React.FC {
  // State to hold retrieved rovers
  const [rovers, setRovers] = useState<Rover[]>([]);

  // Fetch user's automatons (rovers) from users using the ID 

  useEffect(() => {
    const fetchRovers = async () => {
      try {
        // TODO: Implement Supabase query to retrieve rover data
        const response = await // Supabase query here
        setRovers(response.data);
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
  const deployRover = (roverId: string, sectorId: string) => {
    //TODO: Implement the logic to deploy the rover to the specified sector
    // TODO:Update the rover's status, collect items, etc.

   //included for ease f testing 
    console.log(`Deploying rover ${roverId} to sector ${sectorId}`);
  };

  return (
    <div className="flex justify-between gap-4">
      {rovers.map((rover) => (
        <div key={rover.id} className="rounded-lg shadow-md p-4 flex flex-col items-center">
          <img src={rover.image} alt={rover.name} className="w-20 h-20 mb-2" /> {/* Assuming image field exists */}
          <h3 className="text-lg font-semibold">{rover.name}</h3>
          <button onClick={() => deployRover(rover.id, "sector123")}>Deploy Rover</button>
          {/* Add other buttons or interactions specific to each rover */}
        </div>
      ))}
    </div>
  );
}

// Usage in MainContent
function MainContent({ children, backgroundImage }: { children: React.ReactNode; backgroundImage?: string }) {

   // TODO:implement the display using MainContent

   //template css for visual implementation of the backround the roverdisplay 

  return (
    <main className="pt-20 pb-20 md:pb-0" style={{ backgroundImage }}>
      {children}
      <RoverDisplaySection />
    </main>
  );
}

export default MainContent;
export { RoverDisplaySection }; //  export for potential reuse

//TODO:include this compoenent in Planet layout once you develop the functionality 