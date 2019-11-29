const express = require('express')
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
        } catch (err) {
            console.error( err.message);
            res.status(500).send('Server Error')
        }
});

router.post('/', async (req, res) => {
     

     const {email, password} = req.body;

     try {
            let user = await User.findOne({ email });

            if(!user) {
                return res.status(400).json({ msg: 'Invalid Credentials'})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials'})
            };

            const payload = {
                user: {
                    id: user._id
                }
            }

            jwt.sign(payload, config.get('JWT_Secret'), {expiresIn: 360000},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

     } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error')
     }
});



module.exports = router; 