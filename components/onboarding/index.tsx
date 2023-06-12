import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import React from 'react';
import Login from '../../pages/login';
import { useDarkMode } from '../Globals/DarkModeToggle';

const Instructions: React.FC = () => {
  // User prefs
  const supabase = useSupabaseClient();
  const session = useSession();

  // Styling hooks
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  if (!session) {
    return (
      <Login />
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 font-sans">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Welcome to the Star Sailors training program!
        </h2>
        {/* <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}
        <p className="text-gray-700">
          There's a number of exciting research projects you're going to be able to contribute to!
        </p>
        <p className="text-gray-700">
          Using the transit method to find exoplanets reveals a lot of information about the planet itself - the size of the dip in light is related to the fraction of light that is being blocked out by a planet - for a given star, a larger planet means the dip is larger, and a smaller planet results in a smaller dip.
        </p>
        <div className="my-8">
        <img src="https://file.notion.so/f/s/93246fc4-b0db-46a7-b488-37a82c7e53d1/Untitled.png?id=f02de9d7-b9a6-41e9-8adc-54b773d5295b&table=block&spaceId=215717d6-87ba-4724-a957-c84891dfbb82&expirationTimestamp=1688104800000&signature=0pxfyuWzoTSrZ0Fcggay1xvDhieon_3npbbrJlHfp9g&downloadName=Untitled.png" alt="Size Estimation" className="w-full" />
        </div>
        <p className="text-gray-700">
          Space-based satellites such as <a href="https://solarsystem.nasa.gov/missions/gaia/in-depth/" className="text-accent underline">Gaia</a> can tell us the size of stars that TESS looks at, meaning that when a transit event is found, its depth can be used to estimate the size of the planet.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-primary">Why not use AI?</h2>
        <blockquote className="italic bg-beige p-4 border-l-4 border-accent">
          <p className="text-gray-700">
            You might be wondering why astronomers use visual vetting (looking at data by eye) when there are computers that can do this. Computer algorithms are very good at finding certain types of transit events; however, they also tend to miss other types of transits. More specifically, most transit search algorithms require at least two transit events for the algorithm to identify it. This means that machines are biased toward finding short period planets (planets where the duration of a year is very short) and tend to miss the longer period planets.
          </p>
        </blockquote>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-4 text-primary">Other projects/classifications</h2>
        <p className="text-gray-700">
          There are several citizen science projects that focus on the discovery, analysis, and follow-up of exoplanets - planets outside our Solar System. The Planet Hunters TESS Coffee Chat team works in collaboration with these projects, in particular, <a href="https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess" className="text-accent underline">Planet Hunters Transiting Exoplanet Survey Satellite</a> or TESS.
        </p>
      </div>
      
    </div>
  );
};

export default Instructions;
