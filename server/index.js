const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const userRoutes = require('./routes/user');
const yogaCourseRoutes = require('./routes/yogaCourse');
const classRoutes = require('./routes/class');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false }
}));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ msg: 'Invalid JSON' });
    }
    next();
});

app.use('/auth', userRoutes); 
app.use('/course', yogaCourseRoutes); 
app.use('/class', classRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});