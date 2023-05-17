import express from 'express'
import {
    getTechnologies,
    getTechnologyById

} from './technology.controller'

const router = express.Router()

router.get('/', getTechnologies)
router.get('/:id', getTechnologyById)


// module.exports = router    
export default router