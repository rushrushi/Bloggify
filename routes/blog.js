const {Router} = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comments')
const mongoose = require('mongoose')

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

router.get('/edit/:_id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params._id);

        if (!blog) return res.status(404).send("Blog not found");
        // Optional: check if the logged-in user is the author
        if (!blog.createdBy.equals(req.user._id)) {
            return res.status(403).send("Unauthorized");
        }
        res.render('edit', {blog});
    } catch (error) {
        console.error("Error deleting blog:", error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/edit/:_id', async (req, res) => {


    let { title, body } = req.body;

    try {
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params._id },
            { title, body },
            { new: true }
        );

        if (!blog) return res.status(404).send("Blog not found");

        res.redirect(`/blog/${req.params._id}`)
    } catch (error) {
        console.error("Error updating blog:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/comment/delete/:id', async (req, res) => {
    
    const comment = await Comment.findById(req.params.id)
    await Comment.findByIdAndDelete(req.params.id)
    const  blogId = comment.blogId
    res.redirect(`/blog/${blogId}`)
})
router.get('/myblog/:id', async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send("Invalid user ID");
    }

    const blogs = await Blog.find({ createdBy: userId });
    const user = await User.find({userId});
    res.render('myblogs', { blogs , user});
});

module.exports = router
