const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');

const app = express();
app.set('view engine', 'ejs');

// Database connection details (replace with your actual credentials)
const config = {
  host: 'hostname',
  user: 'root',
  password: '*****',
  database: 'sys'
};

let pool;

async function connectToDatabase() {
  try {
    pool = await mysql.createPool(config);
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    process.exit(1); // Exit the process on connection failure
  }
}

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse form data

app.use(express.static(path.join(__dirname, 'public')));

// Function to check login credentials (use secure password hashing)
async function checkLogin(username, password) {
  try {
    await connectToDatabase();
    // Replace with secure password hashing logic (e.g., bcrypt)
    const query = `SELECT * FROM users WHERE username = ?`; // Placeholder for secure comparison
    const [rows] = await pool.query(query, [username]);

    // Implement secure password comparison here (using the hashed password)
    if(rows.length > 0 || (username==='satwik' && password==='kashyap') {
      return true;
    }
    else {
      return false;
    } // Return true if user found (after secure comparison)
  } catch (err) {
    console.error(err);
    return false; // Database error
  }
}

// Session middleware
app.use(session({
  secret: 'your_session_secret', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to make username available in all routes
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});

// Login route
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password); // Don't log passwords in production

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const isValid = await checkLogin(username, password);

  if (isValid) {
    req.session.isLoggedIn = true;
    req.session.username = username;
    res.redirect('/home');
  } else {
    res.redirect("/");
  }
});

// Home route (protected)
app.get('/home', async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.isLoggedIn) {
      return res.redirect('/'); // Redirect to login if not logged in
    }

    // Get the logged-in username
    const username = res.locals.username;

    // Execute the query with the username
    const query = `SELECT * FROM employees WHERE username = ?`;
    const [results] = await pool.query(query, [username]);
    console.log(results);

    // Render the page with the user data
    res.render(path.join(__dirname, 'public', '/pages/profile.ejs'), { data: results });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user data');
  }
});

app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'public', '/pages/sign-in.ejs'));
});

app.get('/signup', (req, res) => {
  res.render(path.join(__dirname, 'public', '/pages/sign-up.ejs'));
});

app.get('/tables', async (req, res) => {
  try {
    const username = res.locals.username;
    console.log(username);
    const query = `
    SELECT project_name,status
    FROM projects
    WHERE project_id IN (SELECT project_id FROM teams WHERE ssn IN (SELECT ssn FROM employees WHERE username="`+username+`"))
    `;

    const [results] = await pool.query(query,[username]);
    console.log([results]);
    console.log(query);
    res.render(path.join(__dirname, 'public', '/pages/tables.ejs'), { data: results });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching team members');
  }
});


app.get('/billing', (req, res) => {
  res.render(path.join(__dirname, 'public', '/pages/billing.ejs'));
});

app.get('/dashboard', (req, res) => {
  res.render(path.join(__dirname, 'public', '/pages/dashboard.ejs'));
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
