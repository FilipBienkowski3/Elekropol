const cors = require('cors');
 var createError = require('http-errors');
 var express = require('express');
 var path = require('path');
 var cookieParser = require('cookie-parser');
 var logger = require('morgan');
 var models = require("./db");
 

 const clientsRouter = require('./routes/clients');
 const productsRouter = require('./routes/products');
 const owadsRouter = require('./routes/owads');

 var app = express();
 
 app.use(cors({
   origin: 'http://localhost:3001',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type','Authorization','Access-Control-Allow-Origin']
 }));
 
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'pug');
 
 app.use(logger('dev'));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));
 
 app.use('/owads', owadsRouter);

 app.use('/clients', clientsRouter);
 app.use('/products', productsRouter);
 app.use(function(req, res, next) {
   next(createError(404));
 });
 
 app.use(function(err, req, res, next) {
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};
 
   res.status(err.status || 500);
   res.render('error');
 });
 
 module.exports = app;