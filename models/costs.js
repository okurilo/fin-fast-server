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
// const dateSchema = new mongoose.Schema({
//     createDate: Date,
//     createTime: String
// });
// const costsSchema = new mongoose.Schema({
//     description: String,
//     title: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         'default': 0
//     },
//     date: dateSchema,
//     img: Buffer
// });
mongoose.model('Costs', budgetScheme);