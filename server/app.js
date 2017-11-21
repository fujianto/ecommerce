// const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = require('express') ();
const customerRouter = require('./routes/customerRoute')
const productRouter = require('./routes/productRoute');
const transactionRouter = require('./routes/transactionRoute');

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productRouter);
app.use('/customers', customerRouter);
app.use('/transactions', transactionRouter);

app.listen(3000);