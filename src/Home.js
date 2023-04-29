import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const doggos = [
  { breed: "Labrador Retriever", coords: generateRandomCoords(10) },
  { breed: "Poodle", coords: generateRandomCoords(5) },
  { breed: "Bulldog", coords: generateRandomCoords(3) },
];

function generateRandomCoords(numCoords) {
    const coords = [];
  
    for (let i = 0; i < numCoords; i++) {
      const lat = Math.random() * (90 - (-90)) + (-90);
      const lng = Math.random() * (180 - (-180)) + (-180);
      coords.push({ lat, lng });
    }
  
    return coords;
  }

function Home() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCNUN2NIEZDZAyeh7VWIPtTUTvJUbDA_08",
  });

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 0,
    lng: 0,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  return isLoaded ? (
    <div className="container mt-5">
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={3}
      options={options}
    >
      {doggos.map((doggo) =>
        doggo.coords.map((coord, index) => (
          <Marker key={`${doggo.breed}-${index}`} position={coord} />
        ))
      )}
    </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default Home;
