import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import MissionList from "@/components/Content/MissionList";
import BuildFirstRover from "@/components/Gameplay/Automations/BuildRover";
import UserPlanetPage from "@/components/Gameplay/Inventory/UserPlanets";

export default function Home() {
  return (
    <Layout>
      <UserPlanetPage />
    </Layout>
  );
}; 

{/* Add a block for sectors? */}