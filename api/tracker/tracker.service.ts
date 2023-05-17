import axios from "axios"
import { companyData } from "../company-data/models"
import { Application, DraftApplication, FilterBy } from "./models"
import { GOOGLE_MAPS_API_KEY } from '../../private/privateKeys.service'

import { getByName } from '../company-data/companyData.service'
import { getCollection } from '../../services/db.service'
import { ObjectId } from 'mongodb'

// module.exports = {
//     query,
//     getById,
//     add,
//     update,
//     remove,
//     getCoordinates
// }

export async function query(filterBy: FilterBy): Promise<Application[]> {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await getCollection('tracker')
        let applications: Application[] = await collection.find({}).toArray()
        // if (!applications || !applications.length) applications = await collection.insertMany(gDefaultApplication)
        applications = await collection.find(criteria).toArray()
        // console.log(applications);

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

export async function add(application: DraftApplication): Promise<Application> {
    try {
        // console.log(application);

        const collection = await getCollection('tracker')
        const companyData: companyData = await getByName(application.company)
        const applicationToAdd = {
            ...application,
            // submittedAt: Date.now(),
            isPinned: false,
            isArchived: false,
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

function _buildCriteria(filterBy: FilterBy) {
    let criteria: any = {}
    const { searchInput, location, position } = filterBy
    if (searchInput) {
        const regex = new RegExp(searchInput, 'i')
        const regexTest = { $regex: regex }
        criteria = { $or: [{ location: regexTest }, { position: regexTest }, { company: regexTest }] }
    }
    if (location.length) criteria.location = { $in: location }
    if (position.length) criteria.position = { $in: position }
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
    // if (!companyDesc) applicationData.companyDesc = companyData.description
    // console.log(applicationData);

    return applicationData
}

export async function getCoordinates(location: string) {
    // console.log(location);

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_MAPS_API_KEY}`
    try {
        const res = await axios.get(url)
        // console.log(res)
        return res
    } catch (err) {
        console.error('Cannot get coordinates', err);

    }
}

const gDefaultApplication = [
    {
        company: 'Google',
        position: 'Frontend Developer',
        submittedAt: Date.now(),
        status: 'Submitted',
        location: 'Tel-Aviv',
        technologies: [
            // {
            //     id: 'tech01',
            //     name: 'React',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228176/job-application-tracker/tech-logo/react_clfxcz.svg'
            // },
            // {
            //     id: 'tech02',
            //     name: 'JavaScript',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228090/job-application-tracker/tech-logo/javascript_ezxryn.svg'
            // },
            // {
            //     id: 'tech03',
            //     name: 'Angular',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228010/job-application-tracker/tech-logo/angular_e1hjz2.svg'
            // }
        ],
        experience: 5,
        submittedVia: 'Facebook',
        logoUrl: 'https://asset.brandfetch.io/id6O2oGzv-/idSuJ5ik7i.png',
        links: [
            {
                name: "crunchbase",
                url: "https://crunchbase.com/organization/google"
            },
            {
                name: "twitter",
                url: "https://twitter.com/google"
            },
            {
                name: "instagram",
                url: "https://instagram.com/google"
            },
            {
                name: "linkedin",
                url: "https://linkedin.com/company/google"
            },
            {
                name: "facebook",
                url: "https://facebook.com/Google"
            }
        ],
        isPinned: false,
        isArchived: false
    },
    {
        company: 'Apple',
        position: 'Fullstack Developer',
        submittedAt: Date.now(),
        status: 'Scheduled Interview',
        location: 'Herzliya',
        technologies: [
            // {
            //     id: 'tech02',
            //     name: 'JavaScript',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228090/job-application-tracker/tech-logo/javascript_ezxryn.svg'
            // },
            // {
            //     id: 'tech03',
            //     name: 'Angular',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228010/job-application-tracker/tech-logo/angular_e1hjz2.svg'
            // }
        ],
        experience: 2,
        submittedVia: 'Linkedin',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672995446/job-application-tracker/idjRWo5z_2_a9ufp3.jpg',
        links: [
            {
                name: "crunchbase",
                url: "https://crunchbase.com/organization/apple"
            },
            {
                name: "twitter",
                url: "https://twitter.com/apple"
            },
            {
                name: "instagram",
                url: "https://instagram.com/apple"
            },
            {
                name: "linkedin",
                url: "https://linkedin.com/company/apple"
            },
            {
                name: "facebook",
                url: "https://facebook.com/apple"
            }
        ],
        isPinned: false,
        isArchived: false
    },
    {
        company: 'Elbit',
        position: 'Embedd Developer',
        submittedAt: Date.now(),
        status: 'Contract',
        location: 'Haifa',
        technologies: [
            // {
            //     id: 'tech05',
            //     name: 'Node.js',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228414/job-application-tracker/tech-logo/nodejs_x8nvfs.svg'
            // },
            // {
            //     id: 'tech06',
            //     name: 'Express',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228699/job-application-tracker/tech-logo/icons8-express-js_u2cxmb.svg'
            // },
            // {
            //     id: 'tech07',
            //     name: 'MongoDB',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228806/job-application-tracker/tech-logo/mongodb_ur58tt.svg'
            // },
            // {
            //     id: 'tech08',
            //     name: 'MySQL',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228897/job-application-tracker/tech-logo/mysql_opfkyv.svg'
            // }
        ],
        experience: 1,
        submittedVia: 'Friend',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672996691/job-application-tracker/idXH8VPLrT_hlt8ta.jpg',
        links: [
            {
                name: "crunchbase",
                url: "https://crunchbase.com/organization/elbit"
            },
            {
                name: "twitter",
                url: "https://twitter.com/elbit"
            },
            {
                name: "instagram",
                url: "https://instagram.com/elbit"
            },
            {
                name: "linkedin",
                url: "https://linkedin.com/company/elbit"
            },
            {
                name: "facebook",
                url: "https://facebook.com/elbit"
            }
        ],
        isPinned: false,
        isArchived: false
    },
    {
        company: 'Monday',
        position: 'Backend Developer',
        submittedAt: Date.now(),
        status: 'Rejection',
        location: 'Tel-Aviv',
        technologies: [
            // {
            //     id: 'tech07',
            //     name: 'MongoDB',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228806/job-application-tracker/tech-logo/mongodb_ur58tt.svg'
            // },
            // {
            //     id: 'tech08',
            //     name: 'MySQL',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228897/job-application-tracker/tech-logo/mysql_opfkyv.svg'
            // },
            // {
            //     id: 'tech09',
            //     name: 'Redis',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228933/job-application-tracker/tech-logo/redis_dnkbs3.svg'
            // },
            // {
            //     id: 'tech010',
            //     name: 'Java',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228985/job-application-tracker/tech-logo/java_lfwcjg.svg'
            // }
        ],
        experience: 5,
        submittedVia: 'Linkedin',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672917933/job-application-tracker/idet9mV1nH_ruzwag.jpg',
        links: [
            {
                name: "crunchbase",
                url: "https://crunchbase.com/organization/monday"
            },
            {
                name: "twitter",
                url: "https://twitter.com/monday"
            },
            {
                name: "instagram",
                url: "https://instagram.com/monday"
            },
            {
                name: "linkedin",
                url: "https://linkedin.com/company/monday"
            },
            {
                name: "facebook",
                url: "https://facebook.com/monday"
            }
        ],
        isPinned: false,
        isArchived: false
    },
    {
        company: 'ironSource',
        position: 'Java Developer',
        submittedAt: Date.now(),
        status: 'Scheduled Interview',
        location: 'Tel-Aviv',
        technologies: [
            // {
            //     id: 'tech09',
            //     name: 'Redis',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228933/job-application-tracker/tech-logo/redis_dnkbs3.svg'
            // },
            // {
            //     id: 'tech010',
            //     name: 'Java',
            //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228985/job-application-tracker/tech-logo/java_lfwcjg.svg'
            // }
        ],
        experience: 1,
        submittedVia: 'Company website',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672996577/job-application-tracker/ido_Zvv_uK_a0hdw1.jpg',
        links: [
            {
                name: "crunchbase",
                url: "https://crunchbase.com/organization/ironSource"
            },
            {
                name: "twitter",
                url: "https://twitter.com/ironSource"
            },
            {
                name: "instagram",
                url: "https://instagram.com/ironSource"
            },
            {
                name: "linkedin",
                url: "https://linkedin.com/company/ironSource"
            },
            {
                name: "facebook",
                url: "https://facebook.com/ironSource"
            }
        ],
        isPinned: false,
        isArchived: false
    },
    // {
    //     company: 'Google',
    //     position: 'Frontend Developer',
    //     submittedAt: Date.now(),
    //     status: 'Submitted',
    //     location: 'Tel-Aviv',
    //     technologies: ['Javascript', 'HTML', 'CSS'],
    //     experience: 5,
    //     submittedVia: 'Facebook',
    //     logoUrl: 'https://asset.brandfetch.io/id6O2oGzv-/idSuJ5ik7i.png',
    //     isPinned: false
    // },
    // {
    //     company: 'Apple',
    //     position: 'Fullstack Developer',
    //     submittedAt: Date.now(),
    //     status: 'Scheduled Interview',
    //     location: 'Herzliya',
    //     technologies: ['React', 'Vue', 'Sass', 'Node.js'],
    //     experience: 2,
    //     submittedVia: 'Linkedin',
    //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672995446/job-application-tracker/idjRWo5z_2_a9ufp3.jpg',
    //     isPinned: false

    // },
    // {
    //     company: 'Elbit',
    //     position: 'Embedd Developer',
    //     submittedAt: Date.now(),
    //     status: 'Contract',
    //     location: 'Haifa',
    //     technologies: ['C++', 'AWS'],
    //     experience: 1,
    //     submittedVia: 'Friend',
    //     logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1672996691/job-application-tracker/idXH8VPLrT_hlt8ta.jpg',
    //     isPinned: false
    // }
]