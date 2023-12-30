import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = [];

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true}));

// Function to hash and salt the password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Route for home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + '/public/register.html'); 
})

app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    
    // Check if the email is already taken
    if(users.some((user) => user.email === email)) {
        return res.status(400).json({ error: 'Email already taken'});
    }

    // Hash and salt the password
    const hashedPassword = await hashPassword(password);

    // Store the user information
    users.push({ email, password: hashedPassword });

    res.status(200).json({ message: 'Registration successful'});
})

// Route for user login
app.post("/", async (req, res) => {
    const {email, password } = req.body;

    // Find the user by username
    const user = users.find((user) => user.email === email);

    // Check if the user exists
    if(!user) {
        return res.status(401).json({ error: 'Invalid credentials'});
    }

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials'})
    }

    // set session for logged-in user
    req.session.user = user;

    res.status(200).json({ message: 'Login successful'})
})

// Route for secured page
app.get("/secured", (req, res) => {
    // Check if the user is logged in
    if(!req.session.user) {
        return res.redirect("/");
    }

    res.sendFile(__dirname + '/public/secured.html');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})