const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const topicsData = require('./routes/topic')
const fs = require('fs')


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('This is my API')
})

app.use('/api/tema', topicsData)

mongoose.connect('mongodb+srv://isaacromero315:N693cjWcnUAudBbu@clusterapipoo.twzmbqi.mongodb.net/cursos?retryWrites=true&w=majority&appName=ClusterApiPOO');



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
    console.log('api activa')
    console.log(`http://localhost:${port}`)
})