const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')


const router = express.Router();

router.post('/signup', async (req, res) => {
    const { ip, database, email, password } = req.body;
    try {
        const user = new User({ ip, database, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    } catch (error) {
       return res.status(422).send(error.message)
    }
});

router.post('/signin', async (req, res) => {
    const { ip, database, email, password } = req.body;
    if (!email || !password || !ip || !database) {
        return res.status(422).send({error : 'Must provide correct information in all field'})
    }
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(422).send({error: 'Email not found'})
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id}, 'MY_SECRET_KEY');
        res.send({ token })
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password'})
    } 
});

module.exports = router