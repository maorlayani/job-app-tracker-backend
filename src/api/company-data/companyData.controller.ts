import { Request, Response } from 'express'
import { add, getByName } from './companyData.service'

export async function getCompanyByName(req: Request, res: Response) {
    try {
        const companyName = req.params.name
        const company = await getByName(companyName)
        res.send(company)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get company' })
    }
}

export async function addCompany(req: Request, res: Response) {
    try {
        const companyName: string = req.body
        const addedApplication = await add(companyName)
        res.send(addedApplication)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add application' })
    }
}

// module.exports = {
//     addCompany,
//     getCompanyByName
// }


