// homeRoutes.js
const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// must be logged in to view homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // redirect already logged in users to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    // Pass any necessary data to the login template
  });
});

router.get('/signup', (req, res) => {
  // redirect already logged in users to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup', {
    // Pass any necessary data to the login template
  });
});

module.exports = router;
