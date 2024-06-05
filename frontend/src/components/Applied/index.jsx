import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie'


import Cards from '../Cards';

import './index.css';

function Applied() {
  const [app, setApplications] = useState([]);
  const user_name = Cookies.get('user_name');
  
  console.log(user_name);
  console.log(app);
  console.log("checking....");

  useEffect(() => {

    const calling = async () => {
      const userDetails = { user_name };
      
      
      const url = "http://localhost:4001/applications/";

      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(userDetails),
      };

      const response = await fetch(url, options);
      
      if (response.ok) {
       
        const data = await response.json(); // Parse response body as JSON
        
        setApplications(data);
        console.log("jobs added:", data);
      } else {
        console.log("Error adding orders");
      }
    };

    calling();

  }, []);

  return (
    <div className='course-container'>
      <div className='inn'>
      <h1 className='head'>Your Jobs...</h1>
      <marquee>🏃‍♂️🏃‍♂️...Jobby-platform..,🏃‍♂️🏃‍♂️</marquee>
      <div className='cards'>
        {app.length > 0 ? (
          app.map(a => (
            <Cards key={a.id} a={a} />
          ))
        ) : (
          <p>No Jobs found.</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default Applied;
