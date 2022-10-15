const router = require('express').Router();
const { User, Post, Comments } = require('../models');
const auth = require('../utils/auth');

// get route for all posts - Include user - no need to include comments
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ include: [User] });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// include user and comments by user
router.get ('/post/:id', auth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
                include: [
                  User,
                  {
                    model: Comment,
                    include: [User],
                  },
                ],
        });
        const post = postData.get({ plain: true });
        res.render('post', { post, logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get ('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('signUp');
  });

  router.get('/dashboard', auth, async (req, res) => {
    if (req.session.logged_in) {
        res.render('dashboard', req.session);
        return;
      }
    
      res.render('login');
    });

module.exports = router;