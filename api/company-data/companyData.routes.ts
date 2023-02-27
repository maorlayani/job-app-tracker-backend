import express from 'express'
const {
    addCompany,
    getCompanyByName
} = require('./companyData.controller')

const router = express.Router()

router.get('/:name', getCompanyByName)
router.post('/', addCompany)

module.exports = router    