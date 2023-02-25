const dbService = require('../../services/db.service')
// const ObjectId = require('mongodb').ObjectId

module.exports = {
    query
}

async function query(filterBy) {
    let criteria = {}
    const { serachInput, location, position } = filterBy
    if (serachInput) {
        const regex = new RegExp(serachInput, 'i')
        const regexTest = { $regex: regex }
        criteria = { $or: [{ location: regexTest }, { position: regexTest }, { company: regexTest }] }
    }
    try {
        const collection = await dbService.getCollection('tracker')
        let applications = await collection.find({}).toArray()
        if (!applications || !applications.length) applications = await collection.insertMany(gDefaultApplication)
        console.log(criteria);
        applications = await collection.find(criteria).toArray()
        return applications
    } catch (err) {
        ('ERROR: cannot find boards', err)
        throw err
    }
}

const gDefaultApplication = [
    {
        id: _makeId(),
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
        id: _makeId(),
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
        id: _makeId(),
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
        id: _makeId(),
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
        id: _makeId(),
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
        id: _makeId(),
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
        id: _makeId(),
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
        id: _makeId(),
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

function _makeId(length = 4) {
    let txt = ''
    const possible = '0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}