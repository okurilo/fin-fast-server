var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/okurilo';

if (true || process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb://okurilo:08041993oO@ds016118.mlab.com:16118/finfast';
    // dbURI = process.env.MONGOLAB_URI;
}//mongo ds040167.mlab.com:40167/nodenote -u okurilo -p 08041993oO

mongoose.connect(dbURI, {useNewUrlParser: true});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', (err) => {
    console.warn('Connection error' + err);
});
mongoose.connection.on('disconnect', () => {
    console.log('Mongoose disconnected');
});
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected throught ' + msg);
        callback();
    });
}
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        console.log("pshhhhhh....");
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        console.log("pshhhhhh....");
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        console.log("pshhhhhh....");
        process.exit(0);
    });
});

require('./costs');