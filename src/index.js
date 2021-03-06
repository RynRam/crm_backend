require('./models/User')
require('./models/SubAccount')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const subAccountRoutes = require('./routes/subAccountRoutes');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth')
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(subAccountRoutes);

const mongoUri = 'mongodb+srv://root:atet0380@cluster0-vzy2s.mongodb.net/test?retryWrites=true&w=majority';

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
