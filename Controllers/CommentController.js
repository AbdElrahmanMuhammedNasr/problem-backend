const Comment = require('../DatabaseSchema/comments')

exports.addNewComment = async (req, res, next) => {
    const commentBody = req.body;

    const comment = new Comment({
        ...commentBody,
        created: new Date()
    })
    const result = await comment.save();

    res.status(200).json(result)

}

exports.getComments =async (req, res, next) => {
    const {postId,limit} = req.params
    const result = await Comment
        .find({"postId":postId},'-__v')
        .populate('userId','-__v -following -followers -created')
        .limit(parseInt(limit))
    if (result === null) {
        return res.status(200).json([]);
    }

    res.status(200).json(result);


}
exports.deleteComment = async (req, res, next) => {
    const {commentId} = req.params
    const result = await Comment.findOneAndDelete({'_id':commentId});
    res.status(200).json(result)

}
