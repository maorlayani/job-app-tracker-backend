import { Application, DraftApplication, FilterBy } from "./models"

const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}

async function query(filterBy: FilterBy): Promise<Application[]> {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('tracker')
        let applications: Application[] = await collection.find({}).toArray()
        if (!applications || !applications.length) applications = await collection.insertMany(gDefaultApplication)
        // console.log(JSON.stringify(criteria));
        applications = await collection.find(criteria).toArray()
        console.log(applications);

        return applications
    } catch (err) {
        console.log('ERROR: cannot find applications', err)
        throw err
    }
}

async function getById(applicationId: string): Promise<Application> {
    try {
        const collection = await dbService.getCollection('tracker')
        const application: Application = await collection.findOne({ _id: new ObjectId(applicationId) })
        return application
    } catch (err) {
        console.log('ERROR: cannot find application', err)
        throw err
    }
}

async function add(application: DraftApplication): Promise<Application> {
    try {
        const collection = await dbService.getCollection('tracker')
        const applicationToAdd = {
            ...application,
            submittedAt: Date.now(),
            isPinned: false,
            logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1677083107/job-application-tracker/na-icon_ngcgpa.png'
        }
        const { insertedId } = await collection.insertOne(applicationToAdd)
        const addedApplication = await getById(insertedId)
        console.log('addedApplication', addedApplication)
        return addedApplication
    } catch (err) {
        throw err
    }
}

async function update(application: Application) {
    try {
        const applicationToSave = { ...application, _id: new ObjectId(application._id) }

        const collection = await dbService.getCollection('tracker')
        await collection.updateOne({ _id: applicationToSave._id }, { $set: applicationToSave })
        console.log(applicationToSave);
        return applicationToSave
    } catch (err) {
        throw err
    }
}


async function remove(applicationId: string): Promise<string> {
    try {
        const collection = await dbService.getCollection('tracker')
        await collection.deleteOne({ _id: new ObjectId(applicationId) })
        return applicationId
    } catch (err) {
        console.log('ERROR: cannot remove application', err)
        throw err
    }
}

function _buildCriteria(filterBy: FilterBy) {
    let criteria: any = {}
    const { serachInput, location, position } = filterBy
    if (serachInput) {
        const regex = new RegExp(serachInput, 'i')
        const regexTest = { $regex: regex }
        criteria = { $or: [{ location: regexTest }, { position: regexTest }, { company: regexTest }] }
    }
    if (location.length) {
        criteria.location = { $in: location }
    }
    if (position.length) {
        criteria.position = { $in: position }
    }
    return criteria
}

const gDefaultApplication = [
    {
        company: 'Google',
        position: 'Frontend Developer',
        submittedAt: Date.now(),
        status: 'Submitted',
        location: 'Tel-Aviv',
        technologies: ['Javascript', 'HTML', 'CSS'],
        experience: 5,
        submittedVia: 'Facebook',
        logoUrl: 'https://asset.brandfetch.io/id6O2oGzv-/idSuJ5ik7i.png',
        isPinned: false
    },
    {
        company: 'Apple',
        position: 'Fullstack Developer',
        submittedAt: Date.now(),
        status: 'Scheduled Interview',
        location: 'Herzliya',
        technologies: ['React', 'Vue', 'Sass', 'Node.js'],
        experience: 2,
        submittedVia: 'Linkedin',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672995446/job-application-tracker/idjRWo5z_2_a9ufp3.jpg',
        isPinned: false
    },
    {
        company: 'Elbit',
        position: 'Embedd Developer',
        submittedAt: Date.now(),
        status: 'Contract',
        location: 'Haifa',
        technologies: ['C++', 'AWS'],
        experience: 1,
        submittedVia: 'Friend',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672996691/job-application-tracker/idXH8VPLrT_hlt8ta.jpg',
        isPinned: false
    },
    {
        company: 'Monday',
        position: 'Backend Developer',
        submittedAt: Date.now(),
        status: 'Rejection',
        location: 'Tel-Aviv',
        technologies: ['Node.js', 'Express', 'Docker'],
        experience: 5,
        submittedVia: 'Linkedin',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672917933/job-application-tracker/idet9mV1nH_ruzwag.jpg',
        isPinned: false
    },
    {
        company: 'ironSource',
        position: 'Java Developer',
        submittedAt: Date.now(),
        status: 'Scheduled Interview',
        location: 'Tel-Aviv',
        technologies: ['Java', 'OOP'],
        experience: 1,
        submittedVia: 'Company website',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672996577/job-application-tracker/ido_Zvv_uK_a0hdw1.jpg',
        isPinned: false
    },
    {
        company: 'Google',
        position: 'Frontend Developer',
        submittedAt: Date.now(),
        status: 'Submitted',
        location: 'Tel-Aviv',
        technologies: ['Javascript', 'HTML', 'CSS'],
        experience: 5,
        submittedVia: 'Facebook',
        logoUrl: 'https://asset.brandfetch.io/id6O2oGzv-/idSuJ5ik7i.png',
        isPinned: false
    },
    {
        company: 'Apple',
        position: 'Fullstack Developer',
        submittedAt: Date.now(),
        status: 'Scheduled Interview',
        location: 'Herzliya',
        technologies: ['React', 'Vue', 'Sass', 'Node.js'],
        experience: 2,
        submittedVia: 'Linkedin',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672995446/job-application-tracker/idjRWo5z_2_a9ufp3.jpg',
        isPinned: false

    },
    {
        company: 'Elbit',
        position: 'Embedd Developer',
        submittedAt: Date.now(),
        status: 'Contract',
        location: 'Haifa',
        technologies: ['C++', 'AWS'],
        experience: 1,
        submittedVia: 'Friend',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672996691/job-application-tracker/idXH8VPLrT_hlt8ta.jpg',
        isPinned: false
    }
]