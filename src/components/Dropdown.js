import React, {useState} from 'react';
import {MdArrowDropDown} from 'react-icons/md';

const Dropdown = ({selected, setSelected, data}) => {
  const [open, setOpen] = useState(false);
  return (
        <div 
            className={`dropdown-wrapper ${open && 'active'}`} 
            onClick={() => setOpen(!open)}
        >
            <div className="dropdown-title">
                <span>{data.filter(item => item.value === selected)[0]?.name}</span>
                <MdArrowDropDown />
            </div>
            <div className="dropdown-list">
                <ul>
                    {
                        data.map(item => <li key={item.id} onClick={() => setSelected(item.value)}>{item.name}</li>)
                    }
                </ul>
            </div>
        </div>
  )
};

export default Dropdown;
