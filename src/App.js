import React, {useState, useEffect } from "react";
import query_overpass from "query-overpass";
import L from "leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { 
  generateAccumulatedQueryWithCount, 
  generateAccumulatedQueryWithoutCount, 
  GET_SCHOOL_QUERY} from "./services/queries";
import { schoolOperatorDropdown, schoolTypeDropdown } from "./constants";
import Header from "./components/Header";
import SearchWrapper from "./components/SearchWrapper";
import Dropdown from "./components/Dropdown";
import MapWrapper from "./components/MapWrapper";
import Sidebar from "./components/Sidebar";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


function App() {
  const [schools, setSchools] = useState(undefined);
  const [search, setSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schoolType, setSchoolType] = useState('all_type');
  const [schoolOperator, setSchoolOperator] = useState('all_operator');
  const [studentMinCount, setStudentMinCount] = useState(0);
  const [studentMaxCount, setStudentMaxCount] = useState(3300);
  const [employeeMinCount, setEmployeeMinCount] = useState(0);
  const [employeeMaxCount, setEmployeeMaxCount] = useState(300);

  // fetch data to get schools of kathmandu
  async function getData(query) {
    try {
      setLoading(true);
      const options = {
        flatProperties: true,
        overpassUrl: "https://overpass-api.de/api/interpreter"
      };
     query_overpass(query, (error, osmData) => {
        if (!error && osmData.features !== undefined) {
          setSchools(osmData);
          setLoading(false);
        }
        if(error) {
          setLoading(false);
          console.log(error);
        }
     }, options)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

    // fetching all types of schools
    useEffect(() => {
      if(!schools) {
        getData(GET_SCHOOL_QUERY);
      }
    }, [schools])

    function openSchoolModal(obj) {
      const {sourceTarget: {feature}} = obj
      const {properties} = feature;
      setSelectedSchool(properties)
    }

  return (
    <div className="home">
      <Header />
      <div className="home__content">
        <div className="sidebar">
          <SearchWrapper search={search} setSearch={setSearch} loading={loading} getData={getData}/>
          <div className="filter-wrapper">
            <h2 className="title">Filter Options:</h2>
            <div className="form-group">
              <label htmlFor="school type" className="title">Type:</label>
              <Dropdown selected={schoolType} setSelected={setSchoolType} data={schoolTypeDropdown}/>
            </div>
            <div className="form-group">
              <label htmlFor="school type" className="title">Operator:</label>
              <Dropdown selected={schoolOperator} setSelected={setSchoolOperator} data={schoolOperatorDropdown}/>
            </div>
            <button 
              className="primary-btn" 
              disabled={loading}
              onClick={() => getData(
              generateAccumulatedQueryWithoutCount(
                schoolType, 
                schoolOperator, 
                ))}
                >Filter</button>
            <div className="form-group">
              <label htmlFor="school type" className="title">Students:</label>
              <MinMaxComponent min={studentMinCount} max={studentMaxCount} setMin={setStudentMinCount} setMax={setStudentMaxCount} />
            </div>
            <div className="form-group">
              <label htmlFor="school type" className="title">Employees:</label>
              <MinMaxComponent min={employeeMinCount} max={employeeMaxCount} setMin={setEmployeeMinCount} setMax={setEmployeeMaxCount} />
            </div>            
            <button 
              className="primary-btn" 
              disabled={loading}
              onClick={() => getData(
              generateAccumulatedQueryWithCount(
                schoolType, 
                schoolOperator, 
                employeeMinCount, 
                employeeMaxCount, 
                studentMinCount, 
                studentMaxCount))}
                >Add Filter</button>
          </div>
        </div>
        <MapWrapper loading={loading} schools={schools} openSchoolModal={openSchoolModal}/>
        <Sidebar schools={schools} selectedSchool={selectedSchool} />
      </div>
    </div>
  );
}

function MinMaxComponent ({min, setMin, max, setMax}) {
  return (
      <div className="min-max-wrapper">
          <div className="min">
            <span>Min</span>
            <input value={min} type="number" onChange={(e) => setMin(e.target.value)}/>
          </div>
          <div className="min">
            <span>Max</span>
            <input value={max} type="number" onChange={(e) => setMax(e.target.value)}/>
          </div>
        </div>
  )
}

export default App;
