const express = require('express')
const app = express();
app.use(express.json());



const db = require('./middleware/database');
require('dotenv').config();

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 3000;

const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);
app.use('/mentor', mentorRoutes);
app.use('/student', studentRoutes);


app.listen(PORT, ()=>{
    console.log('Server Start');
})
