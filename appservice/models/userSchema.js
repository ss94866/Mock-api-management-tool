const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})

const refreshTokenSchema = mongoose.Schema({
    refreshToken:{
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

const User = mongoose.model('User', userSchema)
const RefreshToken = mongoose.model('RefreshToken',refreshTokenSchema)

module.exports = {User, RefreshToken}
