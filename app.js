const express = require('express');
const app = express();
const mongoose = require('mongoose')

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const  users = require('./Routes/UserRoutes')
const  posts = require('./Routes/PostRoutes')
const comment = require('./Routes/CommentRoutes')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})


app.use('/user', users)
app.use('/post', posts)
app.use('/comment', comment)


mongoose.connect('mongodb://127.0.0.1:27017/problem',{ useFindAndModify: false })
// mongoose.connect('mongodb+srv://abdoNasr:123456789Abdo@cluster0.vf0qx.mongodb.net/uStore?retryWrites=true&w=majority',{ useFindAndModify: false })
    .then(result => {
        console.log("ok")

        app.listen(port)
    }).catch(err => {
        console.log("----------------------------------------------")
       console.log(err.message)
})

