import express from 'express'
import {
    addCompany,
    getCompanyByName
}
    from './companyData.controller'

const router = express.Router()

router.get('/:name', getCompanyByName)
router.post('/', addCompany)

// module.exports = router  
export default router