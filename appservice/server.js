const express = require('express');
const app = express()

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors())
require('dotenv').config()
const connectDb = require('./config/db')
const data = require('./assets/data.json')

// let conn = connectDb()

const posts = [
    {
        username: 'Siva',
        email: 'sivass@cb.com'
    }
]

app.get('/',authenticateToken, (req,res) => { 
    console.log(req.user);
    res.json(posts)
})

app.get('/projects', (req, res) => {
    const userId = req.query.userId
    res.status(200).send(data.projects)
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(4000)