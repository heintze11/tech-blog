const sequelize = require('../config/connection');
const { User, Post, Comments } = require('../models');

const userData = require('./user.json');
const postData = require('./post.json');
const commentData = require('./comments.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    await Post.bulkCreate(postData);
    await Comments.bulkCreate(commentData);
  
    process.exit(0);
};
  
seedDatabase();
  