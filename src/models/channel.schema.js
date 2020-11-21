const mongoose = require('mongoose');
const Schema = mongoose.Schema


const ChannelSchema = new Schema({
    name: {
        type: String,
        require: true,
        index: {
            unique: true
        }
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    history: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        message: {
            type: String,
            require: true
        },
        dateTime: {
            type: String,
            require: true,
        }
    }
})


module.exports = mongoose.model('Channels', ChannelSchema);