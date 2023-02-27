import express from 'express'
const {
    getApplications,
    getApplicationById,
    addApplication,
    updateApplication,
    deleteApplication
} = require('./application.controller')
const router = express.Router()

router.get('/', getApplications)
router.get('/:id', getApplicationById)
router.post('/', addApplication)
router.put('/:id', updateApplication)
router.delete('/:id', deleteApplication)

module.exports = router    