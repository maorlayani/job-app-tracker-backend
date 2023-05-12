import express from 'express'
const {
    getTechnologies,
    getTechnologyById

} = require('./technology.controller')

const router = express.Router()

router.get('/', getTechnologies)
router.get('/:id', getTechnologyById)


module.exports = router    