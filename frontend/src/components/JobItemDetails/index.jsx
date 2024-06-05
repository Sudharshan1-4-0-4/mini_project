import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Registration from '../Registration';
import './index.css';


function JobItemDetails() {
  const [jobs, setJobs] = useState(null);
  const [details, setDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams(); // Extract course ID from URL parameters

  

  useEffect(() => {
    getJobs();
  }, [id]);
  
  const getJobs = async () => {
    const apiUrl = `http://localhost:4001/jobs/${id}`;
    const options = {
      headers: {
        Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2FpcmEiLCJpYXQiOjE3MTcxMzIyMzZ9.S0x2EsHZKwr-u7OHcDxhYmsc0ZEPFfp55x6KNStwblo",
      },
      method: 'GET',
    };
  
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const responseData = await response.json();
      
      setJobs(responseData);
     
    } else {
      console.log("Error occurred:", response);
    }
  };
  
  if (!jobs) {
    return <div>Loading...</div>;
  }

  
  

  const registrationForm = () => {
    console.log("clicked..");
    console.log(jobs);
    setIsVisible(true);
    setDetails(jobs);
  };

//   const addCart = () => {
//     console.log("adding...")
//     console.log(course);
//     addCartItem(course); 
   
//   }

 

  const handleParentClick = (event) => {
    console.log(event.target.className);
    if (event.target.className === 'orders-container') {
      setIsVisible(false);
    }
  };

  return (
    <div className='back' onClick={handleParentClick}>
       <div key={jobs.id} className="content">
             <div className='first-container1'>
              <img src={jobs.image} className='company-logo1'/>
              <div>
                <h2>{jobs.job_name}</h2>
                <p>⭐ {jobs.rating}</p>
              </div>
             </div>
             
             <div className='second-container1'>
              <div className='inner-container1'>
                <p className='element1'>🌍{jobs.localtion}</p>
                <p>💼{jobs.employment_type}</p>
              </div>
              <p>{jobs.package}</p>
             </div>

             <hr/>

             <div className='des1'>
              <h3>Description</h3>
              <p>{jobs.description}</p>
             </div>


             <div>
             <h3>Basic Skills Needed..👨‍💻</h3>
              <ul>
                <li>Data Structures and Algorithms</li>
                <li>Programming Languages</li>
                <li>Databases</li>
                <li>Software Development Methodologies</li>
                <li>Problem-Solving</li>
                <li>Communication</li>
                <li>Teamwork</li>
              </ul>
             </div>
            <div>
              <h3>Life at Company..</h3>
              <div className='life-container'>
              <p className='descrip'>{jobs.life}</p>
              <img src="https://img.freepik.com/free-photo/business-colleagues-discussing-together-office-night-teamwork-partnership_482257-32811.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1716768000&semt=ais_user" className='life'/>
              </div>
              
            </div>

             <button onClick={registrationForm} className='button'>Register</button>
       </div>
      {isVisible && <Registration details={details} />}
     
    </div>
  );
}

export default JobItemDetails;
