import express from 'express'
import {
    getApplications,
    getApplicationById,
    addApplication,
    updateApplication,
    deleteApplication,
    getCoordinatesBylocation
} from './tracker.controller'

const router = express.Router()

router.get('/', getApplications)
router.get('/:id', getApplicationById)
router.get('/location/:location', getCoordinatesBylocation)
router.post('/', addApplication)
router.put('/:id', updateApplication)
router.delete('/:id', deleteApplication)

// module.exports = router  
export default router 