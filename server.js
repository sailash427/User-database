const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db');

const app = express();
const port = 3000;

connectDB();
app.use(bodyParser.json());
app.use(cors());

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    address:String
});

//api routes

const User =mongoose.model('User', userSchema);

//creating a new user
app.post('/api/user', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.name,
        phone: req.body.name,
        address: req.body.name
    });

    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'api is running' });
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

app.put('/api/users/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided in the request body
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.address) user.address = req.body.address;

    const updatedUser = await user.save();
    res.json(updatedUser);        
    } catch(err){
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/users/:email', async (req,res) => {
    try{
        const user = await User.findOneAndDelete({ email: req.paramas.email });
        if(!user){
            return res.state(404).json({ message: 'User not found'})
        }
        res.json({message: 'User deleted successfully' })
    }catch(err){
        res.status(400).json({message: err.message });
    }
})


//start server
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});
