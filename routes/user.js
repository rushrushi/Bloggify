const {Router} = require('express')
const User = require('../models/user')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const { createTokenForUser } = require('../services/authentication');
const router = Router()

router.get('/signin', (req,res) => {
    return res.render('signin')
})


router.get('/signup', (req, res) => {
    return res.render('signup')
})


router.post('/signin', async (req, res) => {
    const {email, password} = req.body
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password)

        res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).redirect('/')
    } catch (error){
        res.render('signin', {
            error: "Incorrect Email or Password"
        })
    }
    
})

router.get('/logout', (req, res) => {
    return res.clearCookie("token").redirect('/')
})

router.post('/signup', async (req, res) => {
    const { fullName, email, password, profileImageURl } = req.body
    await User.create(
        {fullName,
        email,
        password
    })
    const token = createTokenForUser(User)
    console.log("User created", token);
    return res.cookie("token", token).redirect('/')
})




module.exports = router