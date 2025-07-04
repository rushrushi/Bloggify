require('dotenv').config();
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')

const { checkForAuthenticationCookie } = require('./middleware/authentication');

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

const mongoose = require('mongoose')
const Blog = require('./models/blog')
const User = require('./models/user');


const app = express()
const PORT = process.env.PORT || 8000

app.use(express.static('public'));

mongoose.connect(`mongodb+srv://${process.env.password}:${process.env.password}@user-blogify.i5orahi.mongodb.net/?retryWrites=true&w=majority&appName=user-blogify`).then((e) => console.log("MongoDB Connected"))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.get('/' ,async (req,res) => {
    const allBlog = await Blog.find({})
    
    res.render('home',{
        user: req.user,
        blog: allBlog
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(PORT, () => {
    console.log('Server is started at' , PORT);
})
