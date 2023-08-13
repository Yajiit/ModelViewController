// blogRoutes.js
// api
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Comment routes
// create new comment
router.post('/:blog_id/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      blog_id: req.params.blog_id,
    });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
