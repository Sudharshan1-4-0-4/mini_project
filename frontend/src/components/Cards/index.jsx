// src/components/CourseCard.js
import React, {useContext} from 'react';

import './index.css';

function Cards({ a }) {
  console.log(a);
  return (
    <div className='main_container'>
      
      <div className='des'>
        <h2>Job_name : {a.job_name}</h2>
        <img src={a.image} className='logo'/>
        <p>Location : {a.location}</p>
        <p>Package : {a.packages}</p>
        <p>User_Name : {a.user_name}</p>
        <p>Email : {a.email}</p>
      </div>
      
    </div>
  );
}

export default Cards;
