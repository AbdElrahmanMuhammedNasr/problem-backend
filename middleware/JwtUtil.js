const jwt = require('jsonwebtoken');
const secret_key = "this is our key";

exports.generateToken = (email, name, userId) => {
    const token = jwt.sign({
        email,
        name,
        userId
    }, secret_key, {expiresIn: '1000h'})

    return token;
}

exports.isValidToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                req.user = user;
                return true;
            }
        })
    } else {
        return false;
    }
}
