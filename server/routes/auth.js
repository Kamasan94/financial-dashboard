const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = process.env.jwtSecret;

//Register Route
router.post('/register', async(req, res) => {
    //Take object from body request
    const { username, password } = req.body;

    try{
        let user = await User.findOne( { username });
        if(user) {
            return res.status(400).json({msg: 'User already exists'});
        }

        user = new User({ username, password });
        user.name = username;

        //Password hashing
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: { id: user.id }
        };

        //Signing web tocken
        jwt.sign(payload, jwtSecret,  {expiresIn: 3600}, 
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        );
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try{
        //Check if user exists
        let user = await User.findOne({username});
        if(!user) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        //Check if password is correcct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const payload = {
            user: { id: user.id }
        };

        //Signing web tocken
        jwt.sign(payload, jwtSecret,  {expiresIn: 3600}, 
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        );
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;