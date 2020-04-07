require('./models/User')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth')
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://admin:passwordpassword@testcrm-m5cum.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('connected mongo')
});

mongoose.connection.on('error', (err) => {
    console.log('error mongo', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your Email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('listening to port 3000!');
})
