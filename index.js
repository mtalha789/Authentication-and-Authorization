const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./authroutes')

const app = express(); 

app.use(bodyParser.json())
app.use('/auth',authRoutes)

app.listen(3000)