const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');

const session = require('express-session');
const passport = require('./auth/passport');
const app = express();
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const sessionHandler = require('./components/session/sessionHandler');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// app.engine('handlebars', express_handlebars({
//     section: express_handlebars_sections() 
// }));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./components/products');
const authRouter = require('./auth/authRouter');
const loginRouter = require('./routes/loginRouter');
const apiProductRouter = require('./api/product');
const cartRouter = require('./components/cart');
const paymentRouter =require('./components/payment');

const hbs = exphbs.create({
  defaultLayout: "layout",
  extname: "hbs",
  helpers: require('./helper/handlebar'),
  handlebars: allowInsecurePrototypeAccess(Handlebars),  
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(compression()); //Compress all routes
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  cookie: {maxAge: 24 * 60 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(sessionHandler);

app.use('/cart', cartRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/checkout/payment',paymentRouter);
app.use('/checkout', authRouter);
app.use('/', indexRouter);

app.use('/api/product', apiProductRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
