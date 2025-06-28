const {Router} = require('express')
const Blog = require('../models/blog')
const Comment = require('../models/comments')

const router = Router()

router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user
    })
})

router.get('/:_id',async (req, res) => {
    const blog = await Blog.findById(req.params._id)
    const comment = await Comment.find({ blogId: req.params._id })
    
    return res.render('blog', {
        user: req.user,
        blog,
        comment
    })
})

router.post('/add-new', async (req, res) => {
    const { title, body } = req.body
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id
    })
    return res.redirect('/')

})

router.post('/:_id', async (req, res) => {
    const {userName , content} = req.body
    console.log("Logged in user:", req.user);
    const comment = await Comment.create({
        userName: req.user.email,
        content,
        blogId: req.params._id
    })
    return res.redirect(`/blog/${req.params._id}`)
})




router.post('/delete/:_id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params._id);

        if (!blog) return res.status(404).send("Blog not found");
        // Optional: check if the logged-in user is the author
        if (!blog.createdBy.equals(req.user._id)) {
            return res.status(403).send("Unauthorized");
        }

        await Blog.findByIdAndDelete(req.params._id);
        res.redirect('/');
    } catch (error) {
        console.error("Error deleting blog:", error.message);
        res.status(500).send("Internal Server Error");
    }
})




module.exports = router
