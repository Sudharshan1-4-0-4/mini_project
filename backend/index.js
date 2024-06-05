const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.use(cors());
const dbPath = path.join(__dirname, "user_information.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(4001, () => {
      console.log("Server Running at http://localhost:4001/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();



const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        
        next();
      }
    });
  }
};


//Registe_API!!!

app.post("/register", async (request, response) => {
  const { name, phone, email, password } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.password, 10);
  const selectUserQuery = `SELECT * FROM user WHERE name = '${name}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    const createUserQuery = `
      INSERT INTO 
        user (name, phone, email, password) 
      VALUES 
        (
          
          '${name}',
          '${phone}',
          '${email}',
          '${hashedPassword}'
          
        )`;
    const dbResponse = await db.run(createUserQuery);
    const newUserId = dbResponse.lastID;
    response.send(`Created new user with ${newUserId}`);
  } else {
    response.status = 400;
    response.send("User already exists");
  }
});

//Login_API!!!!

app.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const selectUserQuery = `SELECT * FROM user WHERE name = '${username}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400).json({ error: "Invalid Password" });
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched === true) {
      // response.send("Login Success!");
        const payload = {
          username: username,
        };
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        response.send({ jwtToken });
    } else {
      
      response.status(400).json({ error: "Invalid Password" });
    }
  }
});

app.get("/user/", authenticateToken, async (request, response) => {
  const getUsersQuery = `
  SELECT
    *
  FROM
    user
  ORDER BY
    id;`;
  const usersArray = await db.all(getUsersQuery);
  response.send(usersArray);
});



app.post("/userDetails", async (request, response) => {
  const { username, password } = request.body;
  const selectUserQuery = `SELECT * FROM user WHERE name = '${username}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status = 400;
    response.send("Invalid User");
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched === true) {
      
      const selectUserQuery1 = `SELECT * FROM user WHERE name = '${username}'`;
      const dbUser1 = await db.get(selectUserQuery1);
      response.send(dbUser1);
     
      
    } else {
      response.status = 400;
      response.send("Invalid Password");
    }
  }
});



app.get("/user1/", (request, response) => {
  response.send("sudharshan");
});



//API-5 delete method
app.delete("/user/:userId/",authenticateToken, async (request, response) => {
  const { userId } = request.params;
  const delete1query = `DELETE FROM user WHERE id = ${userId};`;
  const res4 = await db.run(delete1query);
  response.send("user Deleted");
});


//API-5 delete method
app.delete("/registration/:registrationId/", async (request, response) => {
  const { registrationId } = request.params;
  const delete1query = `DELETE FROM registrations WHERE id = ${registrationId};`;
  const res4 = await db.run(delete1query);
  response.send("registration Deleted");
});


app.get("/jobList",authenticateToken, async  (request, response) => {
    const getJobsQuery = `
    SELECT
      *
    FROM
      jobs
    ORDER BY
      id;`;
    const jobsArray = await db.all(getJobsQuery);
    response.send(jobsArray);
})



app.get("/jobs/:id",authenticateToken, async  (request, response) => {
  const {id} = request.params;
  const getJobsQuery = `
  SELECT
    *
  FROM
    jobs
  WHERE id = ${id}
  ORDER BY
    id;`;
  const jobsArray = await db.get(getJobsQuery);
  response.send(jobsArray);
})

app.get("/registration", async  (request, response) => {
  const getJobsQuery = `
  SELECT
    *
  FROM
    registrations
  ORDER BY
    id;`;
  const jobsArray = await db.all(getJobsQuery);
  response.send(jobsArray);
})



app.post("/applications", async  (request, response) => {
  const {user_name} = request.body;
  const getJobsQuery = `
  SELECT
    *
  FROM
    registrations
  WHERE
    user_name = '${user_name}'
  `;
  const jobsArray = await db.all(getJobsQuery);
  response.send(jobsArray);
})



app.post("/registrations", async (request, response) => {
  const { id, job_name, user_name, ph_no, email, image, employment_type, packages, location } = request.body;
 
  const selectUserQuery = `SELECT * FROM registrations WHERE id = '${id}' AND email = '${email}'`;
  const dbUser = await db.get(selectUserQuery);


   

  if (dbUser !== undefined) {
    response.status(400);
    response.send("job already applied...");
  } else {
   
      const insertQuery = `
      INSERT INTO 
      registrations (id, job_name, user_name, ph_no, email, image, employment_type, packages, location) 
    VALUES 
      (
          ${id},
        '${job_name}',
        '${user_name}',
        '${ph_no}',
        '${email}',
        '${image}',
        '${employment_type}',
        '${packages}',
        '${location}'
        
      )`;
    const dbResponse = await db.run(insertQuery);
    
    response.send(`registration successful....`);
  
  }
});






app.get("/jbss/" , authenticateToken, async (request, response) => {
  const { search = "", employment_type="", amount=0, } = request.query;

  // Construct the query and parameters based on the search input
  let getBooksQuery;
  

  if (search) {
    getBooksQuery = `
      SELECT
        *
      FROM
        jobs
      WHERE LOWER(job_name) LIKE '%${search}%'
    `;
   
  } else if(employment_type){
    getBooksQuery = `
      SELECT
        *
      FROM
        jobs
      WHERE LOWER(employment_type) = '${employment_type}' AND amount > ${amount};
    `;

  } else if(amount){

    getBooksQuery = `SELECT * FROM jobs WHERE amount > ${amount}`;

  } else {
      getBooksQuery = `
        SELECT
          *
        FROM
          jobs
      ;
      `;
  }
  
  try {
    const booksArray = await db.all(getBooksQuery);
    response.send(booksArray);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: 'An error occurred while fetching the jobs.' });
  }
});




module.exports = app;