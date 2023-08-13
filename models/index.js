const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreignKey: 'blogger_id',
    onDelete: 'CASCADE',
  });
  
  User.hasMany(Comment, {
    foreignKey: 'commenter_id',
    onDelete: 'CASCADE',
  });
  
  Blog.belongsTo(User, {
    foreignKey: 'blogger_id',
  });
  
  Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
  });
  
  Comment.belongsTo(User, {
    foreignKey: 'commenter_id',
  });
  
  Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
  });

module.exports = { User, Blog, Comment };
