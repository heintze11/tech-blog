const router = require('express').Router();
const { User } = require('../../models');

// signup create
router.post('/', async (req, res) => {
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
        const user = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });

        if (!user) {
            res.status(400).json({ message: 'Incorrect uses name or password, please try again' });
            return;
        }

        const validPassword = await user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect uses name or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.userName = user.userName;
            req.session.logged_in = true;

            res.json({ user, message: 'You are now logged in!' });
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