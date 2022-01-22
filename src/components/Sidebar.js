import React from 'react';

const Sidebar = ({schools, selectedSchool}) => {
  return <div className="sidebar-right">
            <div className="heading">School Description</div>
            {schools && <h4 style={{padding: "0 24px 8px"}}>Total Schools: {schools?.features.length}</h4>}
            <hr />
            {!selectedSchool 
            ? <div className="subtle-title">No School Selected</div> 
            : <><h1 className="school-name">{selectedSchool?.name ? selectedSchool.name : selectedSchool['name:en']}</h1>
            {selectedSchool['isced:level'] 
            && <div className="label-wrapper"> 
                <span className="label">type:</span> 
                <p>{selectedSchool?.['isced:level']}</p>
                </div>}
            {selectedSchool['addr:street'] 
            && <div className="label-wrapper">
                <span className="label">address:</span>
                <p>{selectedSchool?.['addr:street']}</p>
              </div>}
            {selectedSchool['opening_hours'] 
            && <div className="label-wrapper">
              <span className="label">opening hours:</span>
              <p>{selectedSchool?.['opening_hours']}</p>
              </div>}
            {selectedSchool['phone'] 
            && <div className="label-wrapper">
              <span className="label">phone:</span>
              <p>{selectedSchool?.['phone']}</p>
              </div>}
            {selectedSchool['website'] 
            && <div className="label-wrapper">
              <span className="label">website:</span>
              <p>{selectedSchool?.['website']}</p>
              </div>}
            {selectedSchool['operator:type'] 
            && <div className="label-wrapper">
              <span className="label">operator:</span>
              <p>{selectedSchool?.['operator:type']}</p>
              </div>}
            {selectedSchool['student:count'] 
            && <div className="label-wrapper">
              <span className="label">student:</span>
              <p>{selectedSchool?.['student:count']}</p>
              </div>}
            {selectedSchool['personnel:count'] 
            && <div className="label-wrapper">
              <span className="label">Personnel:</span>
              <p>{selectedSchool?.['personnel:count']}</p>
              </div>}
            {selectedSchool['building_count'] 
            && <div className="label-wrapper">
              <span className="label">Building:</span>
              <p>{selectedSchool?.['building_count']}</p>
              </div>}
            {selectedSchool['wheelchair'] 
            && <div className="label-wrapper">
              <span className="label">WheelChair:</span>
              <p>{selectedSchool?.['wheelchair']}</p>
              </div>}</>}
        </div>;
};

export default Sidebar;
