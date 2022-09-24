const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.hasMany(Comments, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Post, Comments };