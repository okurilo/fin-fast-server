var mongoose = require('mongoose');
var Budget = mongoose.model('Budget');

var sendJsonResponse = (res, status, content) => {
    res.status( status );
    res.json( content )
}
var budgetByUser = function (req, res) {
    // var userId = req.params.userId;
    var userId = req.session.userId;
    if (userId) {
        Budget
            .find({"user": userId})
            .exec(function (err, user) {
                if (err) return sendJsonResponse(res, 400, err);;
                sendJsonResponse(res, 200, {status: user});
            })

    }
    // sendJsonResponse(res, 200, {status: "success"});
}
module.exports = {
    budgetByUser: budgetByUser
};