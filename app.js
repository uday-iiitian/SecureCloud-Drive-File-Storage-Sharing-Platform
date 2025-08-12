const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/user-routes');
const indexRoutes = require('./routes/index-routes');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/users', userRoutes);

app.listen(3000)