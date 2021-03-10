const router = require('express').Router();
const controller = require('../Controllers/PostController')

router.get('/getSomePosts', controller.getSomePosts);
router.get('/getSomePostsUsingCategory/:category', controller.getSomePostsUsingCategory);
router.get('/getUserPosts/:userId', controller.getUserPosts);
router.get('/getPost/:postId', controller.getPost);

/////////////////////////////////////////////////////

router.post('/addNewPost', controller.addNewPost);

/////////////////////////////////////////////////////

router.delete('/deletePost/:postId', controller.deletePost);

module.exports = router
