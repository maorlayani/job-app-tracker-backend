import { Request, Response } from 'express'
import { FilterBy, Application } from './models'
import { query, getById, add, remove, update, getCoordinates } from './tracker.service'
import { getLoggedInUser } from '../user/user.service'

export async function getApplications(req: Request, res: Response) {
    try {
        let filterBy: FilterBy = {
            position: [], location: [], status: [], searchInput: ''
        }
        if (typeof req.query.filterBy === 'string') filterBy = JSON.parse(req.query.filterBy)

        let JWT: string = ''
        if (typeof req.query.JWT === 'string') JWT = JSON.parse(req.query.JWT)

        let userId: string = await _setUserId(JWT)
        const applications: Application[] = await query(filterBy, userId)
        res.send(applications)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get applications' })
    }
}

export async function getApplicationById(req: Request, res: Response) {
    try {
        const applicationId: string = req.params.id
        const application: Application = await getById(applicationId)
        res.send(application)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get application' })
    }
}

export async function addApplication(req: Request, res: Response) {
    try {
        const application = req.body.application
        const JWT = req.body.JWT
        console.log(req.body);

        let userId: string = await _setUserId(JWT)
        const addedApplication = await add(application, userId)
        res.send(addedApplication)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add application' })
    }
}

export async function updateApplication(req: Request, res: Response) {
    try {
        const application = req.body
        const updatedApplication = await update(application)
        res.send(updatedApplication)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add application' })
    }
}

export async function deleteApplication(req: Request, res: Response) {
    try {
        const applicationId = req.params.id
        await remove(applicationId)
        res.send({ msg: 'Removed succesfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to remove application' })
    }
}

export async function getCoordinatesBylocation(req: Request, res: Response) {
    try {
        let location = req.params.location
        const coor = await getCoordinates(location)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get coordinates' })
    }
}

async function _setUserId(jwt: string) {
    try {
        let userId = await getLoggedInUser(jwt)
        if (!userId) userId = 'guest101'
        return userId
    } catch (err) {
        throw err
    }
}