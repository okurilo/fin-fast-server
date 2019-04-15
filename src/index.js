import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import session from 'express-session';
import models, { connectDb } from './models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'secret session',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/session', routes.session);
app.use('/user', routes.user);
app.use('/budget', routes.budget);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

connectDb().then(async () => {
  app.listen(3000, () => {
      console.log('Listen port 3000!')
      console.log('Hello Node.js project.');
      console.log(process.env.MONGOLAB_URI);
  });
})