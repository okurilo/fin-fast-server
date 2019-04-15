"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  // return res.send(req.context.models.users[req.context.me.id]);
  return res.send("Success");
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=session.js.map