const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({

    email: {
        type: String,
        require: true,
        index: {
            unique: true
        }
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

UserSchema.pre('save', function(next) {
    try {
        this.password = bcrypt.hashSync(this.password, saltRounds)
        next()
    } catch (error) {
        console.log(error);
    }
})

module.exports = mongoose.model('Users', UserSchema);