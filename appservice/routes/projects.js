const express = require('express')
const router = express.Router()

const data = require('../assets/data.json')

router.get('/', (req, res) => {
    const userId = req.query.userId
    res.status(200).send(data.projects)
})

router.post('/', (req, res) => {
    
})

router.get('/modules', (req, res) => {
    const {projectId, userId} = req.query
    res.status(200).send(data.modules)
})

module.exports =  router