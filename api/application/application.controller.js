// import { Request, Response } from 'express'
const { query } = require('./application.service')

async function getApplications(req, res) {
    try {
        // let filterBy
        // if (typeof req.query === 'string') {
        const filterBy = JSON.parse(req.query.filterBy)
        // filterBy = {
        //     location: params.location,
        //     position: params.position,
        //     status: params.status,
        //     serachInput: params.serachInput
        // }
        // console.log('todo boom');
        // }
        // console.log(params)
        const applications = await query(filterBy)
        res.send(applications)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get applications' })
    }
}

module.exports = {
    getApplications
}
