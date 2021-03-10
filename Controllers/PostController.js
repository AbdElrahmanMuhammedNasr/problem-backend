const Post = require('../DatabaseSchema/post');

exports.getSomePosts = async (req, res, next) => {
    // const result = await Post.find({},'-__v  -category -solution -problem') //  not useful i need it random
    const result = await Post.aggregate([
        {$sample: {size: 10}},
        {
            $project:
                {
                    userId: '$userId',
                    title: '$title',
                    description: '$description',

                }
        }
    ])


    if (result === null) {
        return res.status(200).json([]);
    }
    res.status(200).json(result);
}


exports.getSomePostsUsingCategory = async (req, res, next) => {

    const {category} = req.params;

    // const result = await Post.find({'category': category}, 'userId  title description')

    const result = await Post.aggregate([
        {$match: {category: category}},
        {$sample: {size: 10}},
        {
            $project:
                {
                    userId: '$userId',
                    title: '$title',
                    description: '$description',

                }
        }
    ])

    if (result === null) {
        return res.status(200).json([]);
    }
    res.status(200).json(result);

}

exports.getUserPosts = async (req, res, next) => {
    const {userId} = req.params;

    const result = await Post.find({'userId': userId}, 'title description created').limit(20);
    if (result === null) {
        return res.status(200).json([]);
    }
    res.status(200).json(result);

}

exports.getPost = async (req, res, next) => {
    const {postId} = req.params;

    const result = await Post
        .findById({'_id': postId}, '-__v')
        .populate('userId','-__v -following -followers -created');
    if (result === null) {
        return res.status(200).json([]);
    }

    res.status(200).json(result);

}
////////////////////////////////////////////
exports.addNewPost = async (req, res, next) => {
    const postBody = req.body;

    const post = new Post({
        ...postBody,
        created: new Date()
    })

    const result = await post.save()
        .catch(err => {
            return res.status(406).json(err.errmsg)
        })

    res.status(200).json(result)

}
////////////////////////////////////////////
exports.deletePost = async (req, res, next) => {
    const {postId} = req.params;
    // check if the user is own this post
    const result = await Post.findOneAndDelete({'_id': postId});
    if (result === null) {
        return res.status(404).json({
            message: 'Post Not  Found'
        })
    }
    res.status(200).json({
        message: 'DELETED'
    })


}
