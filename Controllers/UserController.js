const User = require('../DatabaseSchema/user');
const Post = require('../DatabaseSchema/post');
const bycrpt = require('bcryptjs')


exports.addUser = async (req, res, next) => {
    const userBody = req.body;

    const hashPassword = await bycrpt.hash(userBody.password,10);
    
    const user = new User({
        ...userBody,
        password:hashPassword,
        following: 0,
        followers: 0,
        created: new Date()
    });

    const result = await user.save().catch(err => {
        res.status(406).json(err.errmsg)
    });
    res.status(200).json(result)

}

exports.getUser = async (req, res, next) => {
    const {id} = req.params;

    const user = await User.findOne({'_id': id}, '-__v');

    if (user === null) {
        return res.status(200).json({
            message: "User not Found"
        })

    }
    res.status(200).json(user)

}

exports.deleteUser = async (req, res, next) => {
    // this is from user in request
    const {email} = req.user;
    // end

    const result = await User.findOneAndDelete({'email': email});

    const postResult = await Post.deleteMany({'userId': result['_id']});

    console.log(postResult)
    console.log(result)
    if (result === null) {
        return res.status(404).json({
            message: 'User Not Found'
        })
    }
    res.status(200).json({
        message: 'DELETED'
    })
}
