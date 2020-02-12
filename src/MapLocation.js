import React  from 'react';
import './App.css';
import { Map, TileLayer } from "react-leaflet";
import "./App.css";
import { usePosition } from 'use-position';


const MapLocation = () => {
  const { latitude, longitude} = usePosition();
  
  
  if (typeof latitude !== "undefined" && typeof longitude !== "undefined"){
    return (
      <div>
      <Map center={[latitude, longitude]} zoom={16}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
      </div>
    );
  }
  return (
    <div>
    <Map center={[40, 80]} zoom={16}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
    </div>
  );
}

export default MapLocation;
