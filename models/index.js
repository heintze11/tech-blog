const Post = require('./Post');
const Comments = require('./Comments');

Post.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(Post, {
  foreignKey: 'user_id'
});

module.exports = { Post, Comments };