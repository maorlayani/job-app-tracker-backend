import axios from "axios"
import { companyData } from "../company-data/models"
import { Application, DraftApplication, FilterBy } from "./models"
import { getByName } from '../company-data/companyData.service'
import { getCollection } from '../../services/db.service'
import { ObjectId } from 'mongodb'

export async function query(filterBy: FilterBy, userId: string): Promise<Application[]> {
    const criteria = _buildCriteria(filterBy, userId)
    try {
        const collection = await getCollection('tracker')
        const applications = await collection.find(criteria).toArray()
        return applications
    } catch (err) {
        console.error('ERROR: cannot find applications', err)
        throw err
    }
}

export async function getById(applicationId: string): Promise<Application> {
    try {
        const collection = await getCollection('tracker')
        const application: Application = await collection.findOne({ _id: new ObjectId(applicationId) })
        return application
    } catch (err) {
        console.error('ERROR: cannot find application', err)
        throw err
    }
}

export async function add(application: DraftApplication, userId: string): Promise<Application> {
    try {
        const collection = await getCollection('tracker')
        const companyData: companyData = await getByName(application.company)
        const applicationToAdd = {
            ...application,
            isPinned: false,
            isArchived: false,
            userId,
            ..._getCompanyData(companyData, application.companyDesc)
        }
        const { insertedId } = await collection.insertOne(applicationToAdd)
        const addedApplication = await getById(insertedId)
        return addedApplication
    } catch (err) {
        throw err
    }
}

export async function update(application: Application) {
    try {
        const applicationToSave = { ...application, _id: new ObjectId(application._id) }
        const collection = await getCollection('tracker')
        await collection.updateOne({ _id: applicationToSave._id }, { $set: applicationToSave })
        return applicationToSave
    } catch (err) {
        throw err
    }
}

export async function remove(applicationId: string): Promise<string> {
    try {
        const collection = await getCollection('tracker')
        await collection.deleteOne({ _id: new ObjectId(applicationId) })
        return applicationId
    } catch (err) {
        console.error('ERROR: cannot remove application', err)
        throw err
    }
}

function _buildCriteria(filterBy: FilterBy, userId: string) {
    let criteria: any = { userId: userId }
    const { searchInput, location, position, status } = filterBy
    if (searchInput) {
        const regex = new RegExp(searchInput, 'i')
        const regexTest = { $regex: regex }
        criteria = {
            ...criteria,
            $or: [
                { location: regexTest },
                { position: regexTest },
                { company: regexTest }]
        }
    }
    if (location.length) criteria.location = { $in: location }
    if (position.length) criteria.position = { $in: position }
    if (status.length) criteria.status = { $in: status }
    return criteria
}

function _getCompanyData(companyData: companyData, companyDesc: string | undefined) {
    const logos = companyData.logos
    const iconLogo = logos.find(logo => logo.type === 'icon')
    const iconNA =
        'https://res.cloudinary.com/dqhrqqqul/image/upload/v1677083107/job-application-tracker/na-icon_ngcgpa.png'
    let applicationData: { logoUrl: string, companyDesc: string, links: [{ name: string, url: string }] } =
        { logoUrl: '', companyDesc: '', links: [{ name: '', url: '' }] }
    applicationData.logoUrl = iconLogo ? iconLogo.formats[0].src : iconNA
    applicationData.links = companyData.links
    applicationData.companyDesc = companyDesc ? companyDesc : companyData.description
    return applicationData
}
async function _createNewTrackerBoard(userId: string) {
    const collection = await getCollection('tracker')
    const newTrackerBoard = {
        userId,
        applications: []
    }
    const { insertedId } = await collection.insertOne(newTrackerBoard)
    return insertedId
}

export async function getCoordinates(location: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    try {
        const res = await axios.get(url)
        return res
    } catch (err) {
        console.error('Cannot get coordinates', err);
    }
}

