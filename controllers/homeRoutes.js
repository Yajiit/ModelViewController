// homeRoutes.js
const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// must be logged in to view homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    const users = userData.map((user) => user.get({ plain: true }));

    const blogData = await Blog.findAll({
      include: User, // Include the associated user
      order: [['id', 'DESC']], // Order blogs by ID in descending order
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      users,
      blogs,
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

// viewing blog pages
router.get('/blogs/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [User] },
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// view dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userBlogsData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const userBlogs = userBlogsData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      userBlogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
