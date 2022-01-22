import React from 'react';
import { generateQueryBasedOnSearchTerm } from '../services/queries';

const SearchWrapper = ({loading, search, setSearch, getData}) => {
  return (<div className="search-wrapper">
            <div className="title">Search Schools in Kathmandu</div>
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type School Name"/>
            <button 
              className="primary-btn" 
              disabled={loading}
              onClick={() => getData(generateQueryBasedOnSearchTerm(search))}>search</button>
          </div>);
};

export default SearchWrapper;
