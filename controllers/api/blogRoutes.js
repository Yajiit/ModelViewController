// blogRoutes.js
// api
const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// BLOG ROUTES //
// create new blog
router.post('/', withAuth, async (req, res) => {
    try {
      const newBlog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
  
      res.status(201).json(newBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // update blog
router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatedBlog = await Blog.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      if (!updatedBlog[0]) {
        res.status(404).json({ message: 'Blog not found' });
        return;
      }
  
      res.status(200).json(updatedBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // delete blog
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const deletedBlog = await Blog.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!deletedBlog) {
        res.status(404).json({ message: 'Blog not found' });
        return;
      }
  
      res.status(200).json(deletedBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// COMMENT ROUTES //
// create new comment
router.post('/:blog_id/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      blog_id: req.params.blog_id,
      createdAt: new Date(),
    });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
