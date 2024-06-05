// src/components/CourseCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function JobCard({ job }) {
  return (
   <Link to={`/jobs/${job.id}`}>
      <div key={job.id} className="job1">
             <div className='first-container'>
              <img src={job.image} className='company-logo'/>
              <div>
                <h2>{job.job_name}</h2>
                <p>⭐ {job.rating}</p>
              </div>
             </div>
             
             <div className='second-container'>
              <div className='inner-container'>
                <p className='element'>🌍{job.localtion}</p>
                <p>💼{job.employment_type}</p>
              </div>
              <p>{job.package}</p>
             </div>

             <hr/>

             <div className='des'>
              <h3>Description</h3>
              <p>{job.description}</p>
             </div>
       </div>
   </Link> 
  );
}

export default JobCard;
