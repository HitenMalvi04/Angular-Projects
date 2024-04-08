const express = require('express');
const mongoose = require('mongoose');
const userApiRouter = require('./Schema/UsersApi');
const productApiRouter = require('./Schema/ProductApi');
const adminApiRouter = require('./Schema/AdminApi');
const cartApiRouter = require('./Schema/CartApi');
const orderApiRouter = require('./Schema/OrderApi');
const carthistoryRouter = require('./Schema/CartHistory');

const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect('mongodb+srv://malvihiten:malvihiten@cluster0.kyy3i5k.mongodb.net/Ecommerce_Database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to atlas !");
    const express = require('express');
    const app = express();
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    // Use routes
    app.use('/userapi', userApiRouter);
    app.use('/productapi', productApiRouter);
    app.use('/adminapi', adminApiRouter);
    app.use('/cartapi', cartApiRouter);
    app.use('/orderapi', orderApiRouter);
    app.use('/carthistory', carthistoryRouter);

    app.listen(3030,() => {
        console.log("Server started at port 3030 !");
    })
});