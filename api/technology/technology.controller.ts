import { Request, Response } from 'express'
import { Technology } from './models'
const { query, getById } = require('./technology.service')

async function getTechnologies(req: Request, res: Response) {
    try {
        // if (typeof req.query.techSerach === 'string') {

        // const techSearch = JSON.parse(req.query.techSerach)
        console.log(req.query.techSerach)
        // }

        const technologies: Technology[] = await query(req.query.techSerach)
        res.send(technologies)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get technologies' })
    }
}

async function getTechnologyById(req: Request, res: Response) {
    try {
        const technologyId: string = req.params.id
        const technology: Technology = await getById(technologyId)
        res.send(technology)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get technology' })
    }
}

module.exports = {
    getTechnologies,
    getTechnologyById
}


