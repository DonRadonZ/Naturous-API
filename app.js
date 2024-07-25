const path = require('path')
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view enging', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));

// 1) MIDDLEWARE
if(process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
}

app.use(express.json());




app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

// 3) ROUTES
app.get('/', (req, res) => {
  res.status(200).render('base');
})

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*',(req, res, next) => {

  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(globalErrorHandler);

// 4) START SERVER
module.exports = app;