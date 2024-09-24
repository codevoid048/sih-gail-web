import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

const defaultLocations = [
  { id: 1, name: "William", lat: 16.543609746787915, lon: 81.49612331161717 },
  { id: 2, name: "John Prakash", lat: 16.743609746787915, lon: 81.49612331161600 },
  { id: 3, name: "Vikram", lat: 16.643609746787800, lon: 81.49612331161717 },
];

// Component to change the map center when a location is selected
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
}

function EmployeeLocations() {
  // State to store the search query
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to store the location the map should center on
  const [selectedLocation, setSelectedLocation] = useState([51.505, -0.09]);

  // Handle input change for the search bar
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Find the employee based on the search query
  const searchedLocation = defaultLocations.find(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Center the map on the searched employee when the form is submitted
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
      {/* Search Bar */}
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

      {/* Map Container */}
      <MapContainer
        center={selectedLocation} // Initial center on load
        zoom={13}
        className="h-5/6 w-5/6 rounded-lg shadow-lg"
      >
        {/* Tile layer for map background */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        {/* Recenter map when selectedLocation changes */}
        <RecenterMap center={selectedLocation} />

        {/* Display all locations */}
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
