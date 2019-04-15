"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("./user"));

var _budget = _interopRequireDefault(require("./budget"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dbURI = process.env.MONGOLAB_URI;

var connectDb = function connectDb() {
  return _mongoose["default"].connect(process.env.MONGOLAB_URI);
};

exports.connectDb = connectDb;

_mongoose["default"].connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

_mongoose["default"].connection.on('error', function (err) {
  console.warn('Connection error' + err);
});

_mongoose["default"].connection.on('disconnect', function () {
  console.log('Mongoose disconnected');
});

var gracefulShutdown = function gracefulShutdown(msg, callback) {
  _mongoose["default"].connection.close(function () {
    console.log('Mongoose disconnected throught ' + msg);
    callback();
  });
}; // For nodemon restarts


process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    console.log("Disconnect....");
    process.kill(process.pid, 'SIGUSR2');
  });
}); // For app termination

process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    console.log("Disconnect....");
    process.exit(0);
  });
}); // For Heroku app termination

process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app termination', function () {
    console.log("Disconnect....");
    process.exit(0);
  });
});
var models = {
  User: _user["default"],
  Budget: _budget["default"]
};
var _default = models;
exports["default"] = _default;