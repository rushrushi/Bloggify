const {createHmac, randomBytes} = require('node:crypto');

const mongoose = require('mongoose');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type: String,
        // required: true,
    },
    password :{
        type: String,
        required: true,
    },
    profileImageURl: {
        type: String,
        default: '/images/default_pp.png'
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
},{timestamps: true})

userSchema.pre('save', function(next){
    const user = this

    if(!user.isModified('password')) return next()

    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')
    
    this.salt = salt
    this.password = hashedPassword
    next()
})

userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
    const user = await this.findOne({email})
    if(!user) 
        throw new Error('User not found')

    const salt = user.salt
    const hashedPassword = user.password

    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex')

    if (hashedPassword !== userProvidedHash) 
        throw new Error('Password Incorrect')
    
    const token = createTokenForUser(user)
    return token

})

const User = mongoose.model('User', userSchema)

module.exports = User