const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});


// Define a schema
const LoginSchema = new mongoose.Schema({
    user_name: String,
    password: String
});


// Create a model and specify the collection name
const Login = mongoose.model('Login', LoginSchema, 'logins');


// Define routes
// Create a new user
app.post('/users', async (req, res) => {
    const { user_name, password } = req.body;


    const login = new Login({ user_name, password });
    try {
        await login.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error saving user', err);
        res.status(500).json({ message: 'Error saving user' });
    }
});


// Retrieve all users
app.get('/users', async (req, res) => {
    try {
        const logins = await Login.find();
        res.json(logins);
    } catch (err) {
        console.error('Error retrieving users', err);
        res.status(500).json({ message: 'Error retrieving users' });
    }
});





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
