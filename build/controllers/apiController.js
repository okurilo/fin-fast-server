"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sendJsonResponse = function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
};

var budgetByUser = function budgetByUser(req, res) {
  // var userId = req.params.userId;
  var userId = req.session.userId;

  if (userId) {
    _models["default"].Budget.find({
      "user": userId
    }).exec(function (err, user) {
      if (err) return sendJsonResponse(res, 400, err);
      sendJsonResponse(res, 200, {
        status: user
      });
    });
  } else {
    sendJsonResponse(res, 400, "Not Loggined");
  } // sendJsonResponse(res, 200, {status: "success"});

};

var _default = {
  budgetByUser: budgetByUser
};
exports["default"] = _default;
//# sourceMappingURL=apiController.js.map