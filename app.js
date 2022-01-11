const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');

const app = express();
const newsRoutes = require('./routes/news');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());
app.use('/api/news',newsRoutes);
app.use('/api/auth', authRoutes);

mongoose.
connect('Enter your connection string..')
.then(result=>{
    console.log("Server is running on 8000...");
    app.listen(8000);
})
.catch(err=>console.log(err));


