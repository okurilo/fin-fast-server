var mongoose = require('mongoose');

const costsSchema = new mongoose.Schema({
    // id: {type: Number, default: 0, min: 0}
    text: String,
    value: {type: Number, default: 0, min: 0}
});
const budgetScheme = new mongoose.Schema({
    income: {type: Number, default: 0, min: 0},
    startDay: Date,
    days: {type: Number, default: 0, min: 0, max: 366 },
    percentStorage: {type: Number, default: 0 },
    costs: [ costsSchema ],
    total: {
        storage: {type: Number, default: 0 },
        balance: {type: Number, default: 0 },
        budget: {type: Number, default: 0 }
    }
});
mongoose.model('Budget', budgetScheme);