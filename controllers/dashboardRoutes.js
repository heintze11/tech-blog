const router = require('express').Router();
const { Post } = require('../models/');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('allPosts', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/new', auth, (req, res) => {
    res.render('newPost', {
        layout: 'dashboard',
    });
});

router.get('/edit/:id', auth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });
            res.render('editPost', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;