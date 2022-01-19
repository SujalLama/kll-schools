import React, {useState, useEffect, useRef } from "react";
import query_overpass from "query-overpass";
import L from "leaflet";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
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
        setSchools(osmData);
      }
   }, options)

  }

function App() {
  const [schools, setSchools] = useState(undefined);
  const [selected, setSelected] = useState('');
  const [selectedSchool, setSelectedSchool] = useState({});
  const [showModal, setShowModal] = useState(false);

  const GET_SCHOOL_QUERY = `
    [out:json][timeout:2500];
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
      node["isced:level" = "primary"](27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
      way["isced:level" = "primary"](27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
    );
    out body;
    >;
    out skel qt;`;

    const GET_SECONDARY_SCHOOL_QUERY = `
    [out:json][timeout:25];
    (
      node["isced:level" = "secondary"](27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
      way["isced:level" = "secondary"](27.684288135257813,85.25922775268555,27.735655344273848,85.38454055786133);
    );
    out body;
    >;
    out skel qt;`;

    // fetching all types of schools
    useEffect(() => {
      if(!schools) {
        getData(setSchools, GET_SCHOOL_QUERY);
      }
    }, [])

    useEffect(() => {
      console.log(selected);
      if(selected === "primary") {
        getData(setSchools, GET_PRIMARY_SCHOOL_QUERY)
      }

      if(selected === "secondary") {
        getData(setSchools, GET_SECONDARY_SCHOOL_QUERY);
      }

      if(selected === "all") {
        getData(setSchools, GET_SCHOOL_QUERY);
      }
    }, [selected])

    function onEachSchool (obj, layer) {
      const {properties} = obj;
      layer.bindPopup(properties.name ? properties.name : properties['name:en']);
      // layer.options.fillOpacity = Math.random(); 
    }

    function openSchoolModal(obj) {
      const {sourceTarget: {feature}} = obj
      const {properties} = feature;
      console.log(properties);
      setShowModal(true);
      setSelectedSchool(properties)
    }


  return (
    
    <div className="home">
      <div className="sidebar">
        <h1 className="header">Schools of Kathmandu</h1>
        <div className="filter-wrapper">
          <h2 className="filter-header">Filter Options:</h2>
          <div className="form-group">
            <label for="school type">Type:</label>
            <select name="type" id="type" value={selected} onChange={(e) => setSelected(e.target.value)}>
              <option value="all">All</option>
              <option value="primary" >Primary School</option>
              <option value="secondary" >Secondary School</option>
            </select>
          </div>
        </div>
      </div>
      <div className={`sidebar-right ${showModal && 'active'}`}>
          <h1>{selectedSchool?.name ? selectedSchool.name : selectedSchool['name:en']}</h1>
          <p>type:{selectedSchool?.['isced:level']}</p>
      </div>
      <div className="map-wrapper">
        <Map center={[27.7172, 85.3240]} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {schools && <GeoJSON
          key={schools.features[0].id}
          data={schools.features}
          onEachFeature={onEachSchool}
          onclick={openSchoolModal}
          />}
        </Map>
      </div>
    </div>
  );
}

export default App;
