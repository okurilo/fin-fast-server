import mongoose from 'mongoose';

import User from './user';
import Budget from './budget';

const dbURI = process.env.MONGOLAB_URI;
const connectDb = () => {
  return mongoose.connect(process.env.MONGOLAB_URI);
};

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
        console.log("Disconnect....");
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        console.log("Disconnect....");
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        console.log("Disconnect....");
        process.exit(0);
    });
});

const models = { User, Budget };

export { connectDb };

export default models;