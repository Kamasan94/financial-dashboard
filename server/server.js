require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactionRoutes');

//Enable cors options for JSON response
var corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(cors());

//Configurations
const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;
const MONGO = process.env.MONGO_URI;

//DB Connection
mongoose.connect(`mongodb://${MONGO}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


//Method for root 
app.get('/', cors(corsOptions), (req, res) => {
    res.json({msg: 'This is CORS-enabled'});
});

//Enable auth api
app.use('/api/auth',authRoutes);
app.use('/api/transactions', transactionRoutes);


//Listening to requests
app.listen(PORT, () => {
    console.log(`Server is listening at http://${HOST}:${PORT}`);
});



