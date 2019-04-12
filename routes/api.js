var mongoose = require('mongoose');
var Budget = mongoose.model('Budget');

var express = require('express');
var router = express.Router();

var apiController = require('../controllers/apiController');

var sendJsonResponse = (res, status, content) => {
    res.status( status );
    res.json( content )
}
function checkAuth(req, res, next) {
    if (!req.session.logged_user) {
      res.send('You are not authorized to view this page');
    } else {
      next();
    }
  }
/* GET home page. */
router.get('/budget', checkAuth, apiController.budgetByUser);
router.post('/budget', checkAuth, function(req, res) {
    Budget.create({
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
        } {
            sendJsonResponse(res, 200, budget);
        }
    });
});
router.put('/', function(req, res) {
    res.send('respond with a resource');
});
router.delete('/', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;