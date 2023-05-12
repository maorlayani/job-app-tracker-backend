import { Request, Response } from 'express'
const { add, getByName } = require('./companyData.service')

async function getCompanyByName(req: Request, res: Response) {
    try {
        const companyName = req.params.name
        const company = await getByName(companyName)
        res.send(company)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get company' })
    }
}

async function addCompany(req: Request, res: Response) {
    try {
        const companyName: string = req.body
        const addedApplication = await add(companyName)
        res.send(addedApplication)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add application' })
    }
}

module.exports = {
    addCompany,
    getCompanyByName
}


