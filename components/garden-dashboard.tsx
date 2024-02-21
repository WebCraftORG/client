import Link from "next/link"
import { Button } from "./_Core/ui/addons/button"
import { DashboardLogs, InventoryBlock } from "./dashboard-logs";
import { useState } from "react";
import { Garden } from "./Content/Planets/GalleryList";

export function GardenDashboard() {
  const [showGalaxy, setShowGalaxy] = useState(false);
  const handleOpenGalaxy = () => {
    setShowGalaxy(true);
  };

  return (
    <div className="flex-col justify-center">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="grid gap-4 p-4">
        </div>
        {/* <DashboardLogs /> */}
        <InventoryBlock />
        <Button onClick={handleOpenGalaxy} className="mt-4 px-4 py-2 rounded">
            Visit a planet
        </Button>
        <div className="mt-10">
          {showGalaxy &&
            <>
              <div className="mt-10">
                <Garden onClose={() => setShowGalaxy(false)} />
              </div>
            </>
          }
          </div>
      </div>
    </div>
  );
};