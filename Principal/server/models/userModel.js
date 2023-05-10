const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    date: {type: Date, default: Date.now},
});

userSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function (next) {
    if(!this.isModified){
        next();
    }

    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;