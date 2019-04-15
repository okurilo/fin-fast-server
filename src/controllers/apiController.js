import mongoose from 'mongoose';
import models from '../models';

const sendJsonResponse = (res, status, content) => {
    res.status( status );
    res.json( content )
}
const budgetByUser = function (req, res) {
    // var userId = req.params.userId;
    var userId = req.session.userId;
    if (userId) {
        models.Budget
            .find({"user": userId})
            .exec(function (err, user) {
                if (err) return sendJsonResponse(res, 400, err);
                sendJsonResponse(res, 200, {status: user});
            })

    } else {
        sendJsonResponse(res, 400, "Not Loggined")
    }
    // sendJsonResponse(res, 200, {status: "success"});
}
export default {
    budgetByUser: budgetByUser
};