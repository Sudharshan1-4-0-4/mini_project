import React, { useState, useEffect } from 'react';
import JobCard from '../JobCard';
import './index.css';
import Cookies from 'js-cookie';
import User from '../User';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [employment_type, setEmployeeTypeList] = useState('');
    const [amount, setMinimumSalary] = useState(0);
    const [search, setSearchInput] = useState('');

  

    useEffect(() => {
        getJobs();
      }, [search, employment_type, amount]);
    
      const getJobs = async () => {
       
        const token = Cookies.get('jwt_token');
        const apiUrl = `http://localhost:4001/jbss?search=${search.toLowerCase()}&employment_type=${employment_type.toLowerCase()}&amount=${amount}`;
        
        
        const options = {
          headers: {
            Authorization: `bearer ${token}`,
          },
          method: 'GET',
        };
    
        const response = await fetch(apiUrl, options);
        const responseData = await response.json();
        if (response.ok === true) {
         console.log("called...");
         
          setJobs(responseData);
         
        } else {
          console.log("error occured....");
        }
      };


      const clearing = () => {
        setEmployeeTypeList("");
        setMinimumSalary("");
      }
    return (
        <div className="App">
            
            <div className="filters">
                <User/>
                <button className="filter"  onClick={()=>{clearing()}}>Clear all Filters...</button>
                <select class="custom-select" value={employment_type} onChange={e => setEmployeeTypeList(e.target.value)}>
                  <option value="">Select Employment Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Internship">Internship</option>
                  <option value="FreeLance">FreeLance</option>
                  <option value="Part Time">Part Time</option>
                </select>

                <select class="custom-select" value={amount} onChange={e => setMinimumSalary(e.target.value)}>
                  <option value={0}>Select Minimum Package</option>
                  <option value={200000}>2LPA</option>
                  <option value={500000}>5LPA</option>
                  <option value={700000}>7LPA</option>
                  <option value={900000} >9LPA</option>
                </select>
                
               
            </div>
            <div className="job-list">
              <h1>Job Listings</h1>
              <div class="search-container">
                <input
                    type="search"
                    placeholder="Search"
                    className='search-input'
                    value={search}
                    onChange={e => setSearchInput(e.target.value)}
                />
                <button className="search-button" >🔍</button>
              </div>
                
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))
                  ) : (
                    <div className="no-jobs-view">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                        className="no-jobs-img"
                        alt="no jobs"
                      />
                      <h1 className="no-jobs-heading">No Jobs Found</h1>
                      <p className="no-jobs-description">
                        We could not find any jobs. Try other filters.
                      </p>
                    </div>
                 )}
               
            </div>
        </div>
    );
}

export default Jobs;
