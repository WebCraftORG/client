import React, { useEffect, useState } from "react";

import { GameplayLayout } from "../../components/Core/Layout";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
// import { UserContext } from "../../context/UserContext";
import { Database } from "../../utils/database.types";

import Login from "../login";
import PlanetGalleryCard from "../../components/Planets/PlanetGalleryCard";
import Link from "next/link";
import PlanetFormCard from "./createPlanet";

type Planets = Database['public']['Tables']['planets']['Row'];

export default function PlanetGalleryIndex () {
    const supabase = useSupabaseClient();
    const session = useSession();
    const [planets, setPlanets] = useState([]);
    const [planetTitle, setPlanetTitle] = useState('');
    
    useEffect(() => {
        getPlanets();
        /*fetch('/planets').then(res => res.json()).then(data => {
            setPlanetTitle(data.title);
        });*/
        fetch('/planets').then(response => response.json().then(data => {console.log(data)}))
    }, [session]);

    const getPlanets = async () => {
        try {
            const { data, error } = await supabase
                .from('planetsss')
                .select("*")
                .limit(10)
            if (data != null) { setPlanets(data); };
            if (error) throw error;
        } catch (error: any) { alert(error.message); };
    };

    if (!session) { return <Login />; };

    return (
        <GameplayLayout>
            <div className="flex px-10">
                <div className="w-1/2">{planets.map(planet => (
                    <PlanetGalleryCard key = { planet.id } {...planet}></PlanetGalleryCard>
                    ))}
                </div>
                <div className="mx-10 w-1/2">
                    <br /><div className="mx-10"><p>Create a planet</p></div><br />
                    <PlanetFormCard onCreate={getPlanets} />
                </div> {/* Maybe show user's planets or metadata here... */}
            </div>
        </GameplayLayout>
    )
}