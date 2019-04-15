import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});
const User = mongoose.model('Users', userSchema);

export default User;