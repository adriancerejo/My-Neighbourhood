import React from 'react';
import { usePosition } from 'use-position';

import Weather from './Weather';
import MapLocation from './MapLocation';
import News from './News';

const App = () => {
  const { latitude, longitude} = usePosition();

  if (typeof latitude !== "undefined" && typeof longitude !== "undefined"){
    return (
      <div >
        <header>
          <h1>My Neighbourhood</h1>
        </header>
        <News lat={latitude} lng={longitude}/>
        <MapLocation/>
        <Weather lat={latitude} lng={longitude}/>
      </div>
    );
  }

  return (
    <div>
      
    </div>
  );
}

export default App;
