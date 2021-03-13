const router = require('express').Router()
const controller = require('../Controllers/CommentController')

router.get('/getComments/:postId/:limit', controller.getComments);
router.post('/addComment', controller.addNewComment)
router.delete('/deleteComment/:commentId', controller.deleteComment)

module.exports = router
