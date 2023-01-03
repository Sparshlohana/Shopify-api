const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoutes');
const draftOrderRoute = require('./routes/draftOrderRoutes');
const orderRiskRoute = require('./routes/orderRiskRoute');
const PORT = process.env.PORT || 5000;
require('./database/index');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', authRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/draftOrder', draftOrderRoute);
app.use('/orderRisk', orderRiskRoute);

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});