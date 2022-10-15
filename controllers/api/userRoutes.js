const router = require('express').Router();
const { response } = require("express");
const { User } = require('../../models');

// signup create
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            userName: req.body.userName,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.userName = newUser.userName;
            req.session.logged_in = true;

            res.json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//login check
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect uses name or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect uses name or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.userName = userData.userName;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json({ message: 'No user account found!' });
    }
});


router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;