"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var costsSchema = new Schema({
  // id: {type: Number, default: 0, min: 0}
  text: String,
  value: {
    type: Number,
    "default": 0,
    min: 0
  }
});
var budgetScheme = new Schema({
  income: {
    type: Number,
    "default": 0,
    min: 0
  },
  startDay: Date,
  days: {
    type: Number,
    "default": 0,
    min: 0,
    max: 366
  },
  percentStorage: {
    type: Number,
    "default": 0
  },
  costs: [costsSchema],
  total: {
    storage: {
      type: Number,
      "default": 0
    },
    balance: {
      type: Number,
      "default": 0
    },
    budget: {
      type: Number,
      "default": 0
    }
  },
  user: String
});

var Budget = _mongoose["default"].model('Budget', budgetScheme);

var _default = Budget;
exports["default"] = _default;
//# sourceMappingURL=budget.js.map