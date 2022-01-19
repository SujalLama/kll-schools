import React, {useState, useEffect, useRef } from "react";
import query_overpass from "query-overpass";
import L from "leaflet";
import { Map, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

// Importing images from locally stored assets to address a bug
// in CodeSandbox: https://github.com/codesandbox/codesandbox-client/issues/3845

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("./images/marker-icon-2x.png"),
//   iconUrl: require("./images/marker-icon.png"),
//   shadowUrl: require("./images/marker-shadow.png")
// });

// When importing into your own app outside of CodeSandbox, you can import directly
// from the leaflet package like below
//
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export async function getData(setSchools, query) {
    const options = {
      flatProperties: true,
      overpassUrl: "https://overpass-api.de/api/interpreter"
    };
   query_overpass(query, (error, osmData) => {
      if (!error && osmData.features !== undefined) {
        console.log(osmData.features)
        setSchools(osmData);
      }
   }, options)

  }

function App() {
  const mapRef = useRef();
  const [schools, setSchools] = useState(undefined);

  const GET_SCHOOL_QUERY = `
    [out:json][timeout:25];
    (
      node["amenity"="school"](27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
      way["amenity"="school"](27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
    );
    out body;
    >;
    out skel qt;`;
  
    const GET_PRIMARY_SCHOOL_QUERY = `
    [out:json][timeout:25];
    (
      node["amenity"="school"]["isced:level" = "secondary"](27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
    );
    out body;
    >;
    out skel qt;`;

  useEffect(() => {
    if(!schools) {
      getData(setSchools, GET_SCHOOL_QUERY);
    }
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if (!map) return;
    const parksGeoJson = new L.GeoJSON(schools, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { name } = properties;
        
        if (!name && !properties['name:en']) return;
        layer.bindPopup(`<p className="popup">${name ? name : properties['name:en']}</p>`);
      }
    });

    parksGeoJson.addTo(map);
  }, [schools]);

  return (
    <div className="App">
      <div className="header">
        <span>Filter</span>
        <span onClick={()=>getData(setSchools, GET_PRIMARY_SCHOOL_QUERY)}>primary school</span>
        <span>secondary school</span>
      </div>
      <Map ref={mapRef} center={[27.7172, 85.3240]} zoom={14}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    </div>
  );
}

export default App;
