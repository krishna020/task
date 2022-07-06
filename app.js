const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./routes/auth.router');
const router = require('./routes/ethRouter');
const router = require('./routes/router');
const router = require('./routes/router');
const router = require('./routes/tron');
const conn = require('./config/connDB');

const port = process.env.PORT;

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});