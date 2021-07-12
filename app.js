const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv').config()

const app = express();

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post created...",
                authData
            });
        }
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the Api"
    });;
});

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.post('/api/login', verifyToken, (req, res) => {

    const user = {
        id: 1,
        username: 'tenny',
        email: 'tenny@gmail.com'
    }
    
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
})

app.listen(process.env.PORT, () => console.log(`Listening to Port ${process.env.PORT}`))

