import React from 'react';
import {BallTriangle} from 'react-loader-spinner';
import { Map, TileLayer, GeoJSON } from "react-leaflet";

const MapWrapper = ({loading, schools, openSchoolModal}) => {
  return <div className="map-wrapper">
          {loading 
          ? <div className="loader"><BallTriangle color="#00ccbe" height={100} width={100} /></div>
          : <Map center={[27.7172, 85.3240]} zoom={13.4}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {schools && <GeoJSON
            key={schools?.features[0]?.id}
            data={schools?.features}
            onclick={openSchoolModal}
            />}
          </Map>}
        </div>;
};

export default MapWrapper;
