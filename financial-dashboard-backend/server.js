require('dotenv').config();

const express = require('express');
var cors = require('cors');

var corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200
}


const app = express();
const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;

app.get('/', cors(corsOptions), (req, res) => {
    res.json({msg: 'This is CORS-enabled'});
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://:${PORT}`);
});

