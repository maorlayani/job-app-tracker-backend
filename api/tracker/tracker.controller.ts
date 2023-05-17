import { Request, Response } from 'express'
import { FilterBy, Application } from './models'
import { query, getById, add, remove, update, getCoordinates } from './tracker.service'

export async function getApplications(req: Request, res: Response) {
    try {
        let filterBy: FilterBy = {
            position: [], location: [], status: [], searchInput: ''
        }
        if (typeof req.query.filterBy === 'string') {
            filterBy = JSON.parse(req.query.filterBy)
        }
        const applications: Application[] = await query(filterBy)
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
        const application = req.body
        const addedApplication = await add(application)
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
        // location = location.split('-').join(' ')
        // console.log(location);
        const coor = await getCoordinates(location)
        // console.log('******************************************************************', coor);
        // console.log(typeof coor);

        // res.send(coor.data)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get coordinates' })
    }
}

// module.exports = {
//     getApplications,
//     getApplicationById,
//     addApplication,
//     updateApplication,
//     deleteApplication,
//     getCoordinatesBylocation
// }


