import express from 'express'
const { getApplications } = require('./application.controller')
const router = express.Router()


// router.get('/', getApplications)
router.get('/', getApplications)

module.exports = router  