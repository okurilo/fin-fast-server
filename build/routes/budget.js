"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = _interopRequireDefault(require("../models"));

var _apiController = _interopRequireDefault(require("../controllers/apiController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
var Budget = new _models["default"].Budget();

var sendJsonResponse = function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
};

function checkAuth(req, res, next) {
  if (!req.session.logged_user) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}
/* GET home page. */


router.get('/', checkAuth, _apiController["default"].budgetByUser);
router.post('/', checkAuth, function (req, res) {
  _models["default"].Budget.create({
    income: req.body.income,
    // startDay: req.body.startDay,
    startDay: new Date(),
    days: req.body.days,
    percentStorage: req.body.percentStorage,
    costs: JSON.parse(req.body.costs),
    total: {
      storage: req.body.storage,
      balance: req.body.balance,
      budget: req.body.budget
    },
    user: req.session.userId
  }, function (err, budget) {
    if (err) {
      sendJsonResponse(res, 400, err);
    }

    {
      sendJsonResponse(res, 200, budget);
    }
  });
});
router.put('/', function (req, res) {
  res.send('respond with a resource');
});
router["delete"]('/', function (req, res) {
  res.send('respond with a resource');
});
var _default = router;
exports["default"] = _default;