require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./db');
const models = require('./models/models');
const UserRoutes = require('./routes/index');

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', UserRoutes);

const start = () => {
    try{
        sequelize.authenticate();
        sequelize.sync();
        app.listen(PORT, () => {console.log(`Server is started on port ${PORT}`)});
    } catch (e) {
        console.log(e)
    }
};

start();
