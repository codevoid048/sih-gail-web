/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-loss-of-precision */
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

const defaultLocations = [
  { id: 1, name: "William", lat: 16.543609746787915, lon: 81.49612331161717 },
  { id: 2, name: "John Prakash", lat: 16.743609746787915, lon: 81.49612331161600 },
  { id: 3, name: "Vikram", lat: 16.643609746787800, lon: 81.49612331161717 },
];

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
}

function EmployeeLocations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState([51.505, -0.09]);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const searchedLocation = defaultLocations.find(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchedLocation) {
      setSelectedLocation([searchedLocation.lat, searchedLocation.lon]);
    } else {
      alert("Employee not found!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Search employee by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </form>

      <MapContainer
        center={selectedLocation} 
        zoom={13}
        className="h-5/6 w-5/6 rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        <RecenterMap center={selectedLocation} />

        {defaultLocations.map((location) => (
          <Marker key={location.id} position={[location.lat, location.lon]}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default EmployeeLocations;
