// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import { RoverMobileTest } from "../../components/Modals/rover-mobile-test";
import { RoverInterface, RoverInterfaceDark } from "../../components/Modals/rover-interface";
import Layout from "../../components/Section/Layout";
import Navigation from "../../components/Section/Navbar";

export default function Explore() {
    // const supabase = useSupabaseClient();
    // const session = useSession();

    return (
        // <RoverMobileTest />
        // <RoverInterface />
        <>
        <style jsx global>
             {`
               body {
                 background: url('garden.png') center/cover;
               }
               
               @media only screen and (max-width: 767px) {
                 .planet-heading {
                   color: white;
                   font-size: 24px;
                   text-align: center;
                   margin-bottom: 10px;
                 }
               }
             `}
           </style>
            <Navigation />
            <div className="">
                <RoverInterfaceDark />
            </div>
        </>
    );
};