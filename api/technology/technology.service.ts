import { companyData } from "../company-data/models"
import { Technology } from "./models"
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById
}

async function query(techSearch: string): Promise<Technology[]> {
    try {
        const criteria = _buildCriteria(techSearch)
        const collection = await dbService.getCollection('technologies')
        let technologies: Technology[] = await collection.find({}).toArray()
        if (!technologies || !technologies.length) technologies = await collection.insertMany(gDefaultTechnologies)
        technologies = await collection.find(criteria).toArray()
        return technologies
    } catch (err) {
        console.error('ERROR: cannot find technologies', err)
        throw err
    }
}

function _buildCriteria(techSearch: string) {
    let criteria: any = {}
    if (techSearch) {
        const regex = new RegExp(techSearch, 'i')
        const regexTest = { $regex: regex }
        criteria = { name: regexTest }
    }
    return criteria
}

async function getById(technologyId: string): Promise<Technology> {
    try {
        const collection = await dbService.getCollection('technologies')
        const technology: Technology = await collection.findOne({ _id: new ObjectId(technologyId) })
        return technology
    } catch (err) {
        console.error('ERROR: cannot find technology', err)
        throw err
    }
}



const gDefaultTechnologies = [
    {
        name: 'React',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228176/job-application-tracker/tech-logo/react_clfxcz.svg'
    },
    {
        name: 'JavaScript',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228090/job-application-tracker/tech-logo/javascript_ezxryn.svg'
    },
    {
        name: 'Angular',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228010/job-application-tracker/tech-logo/angular_e1hjz2.svg'
    },
    {
        name: 'Vue',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228251/job-application-tracker/tech-logo/vuejs_kjxgnd.svg'
    },
    {
        name: 'Node.js',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228414/job-application-tracker/tech-logo/nodejs_x8nvfs.svg'
    },
    {
        name: 'Express',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228699/job-application-tracker/tech-logo/icons8-express-js_u2cxmb.svg'
    },
    {
        name: 'MongoDB',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228806/job-application-tracker/tech-logo/mongodb_ur58tt.svg'
    },
    {
        name: 'MySQL',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228897/job-application-tracker/tech-logo/mysql_opfkyv.svg'
    },
    {
        name: 'Redis',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228933/job-application-tracker/tech-logo/redis_dnkbs3.svg'
    },
    {
        name: 'Java',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228985/job-application-tracker/tech-logo/java_lfwcjg.svg'
    },
    {
        name: 'GitLab',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683781526/job-application-tracker/tech-logo/gitlab_rdxtes.svg'
    },
    {
        name: 'HTML5',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683781883/job-application-tracker/tech-logo/html5_i37y0a.svg'
    },
    {
        name: 'Jest',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683781932/job-application-tracker/tech-logo/jest_wyzckn.svg'
    },
    {
        name: 'jQuery',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782434/job-application-tracker/tech-logo/jquery_c7zsza.svg'
    },
    {
        name: 'PostgreSQL',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782524/job-application-tracker/tech-logo/postgresql_bsd9gp.svg'
    },
    {
        name: 'Python',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782524/job-application-tracker/tech-logo/python_p6xzla.svg'
    },
    {
        name: 'Redux',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782524/job-application-tracker/tech-logo/redux_vssvhz.svg'
    },
    {
        name: 'Sass',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782776/job-application-tracker/tech-logo/sass_tnkeji.svg'
    },
    {
        name: 'Ruby on Rails',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782776/job-application-tracker/tech-logo/ruby-on-rails_gz3cq6.svg'
    },
    {
        name: 'Swift',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782894/job-application-tracker/tech-logo/swift_bixui1.svg'
    },
    {
        name: 'Typescript',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782894/job-application-tracker/tech-logo/typescript_dtlmct.svg'
    },
    {
        name: 'Three.js',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782894/job-application-tracker/tech-logo/threejs_vfwaq0.svg'
    },
    {
        name: 'Dart',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782992/job-application-tracker/tech-logo/dart_ztzv3d.svg'
    },
    {
        name: 'Ember',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782992/job-application-tracker/tech-logo/ember_ikya5b.svg'
    },
    {
        name: 'WordPress',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683782992/job-application-tracker/tech-logo/wordpress-blue_onxyew.svg'
    },
    {
        name: 'Glup',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683783131/job-application-tracker/tech-logo/gulp_h2n0sx.svg'
    },
    {
        name: 'Bootstrap',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683783209/job-application-tracker/tech-logo/bootstrap_c2ahhm.svg'
    },
    {
        name: 'Less',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683783209/job-application-tracker/tech-logo/less_p2tyfs.svg'
    },
    {
        name: 'CSS3',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683783209/job-application-tracker/tech-logo/css3_unqfd3.svg'
    },
    {
        name: 'php',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683784068/job-application-tracker/tech-logo/php-icon_dmmgxr.svg'
    },
    {
        name: 'Git',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683784754/job-application-tracker/tech-logo/visual-studio-team-services-git-repository_iqhhhm.svg'
    },
    {
        name: 'GitHub',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683784754/job-application-tracker/tech-logo/github_evtyw7.svg'
    },
    {
        name: 'Qwik',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683784979/job-application-tracker/tech-logo/qwik-seeklogo.com_m2juea.svg'
    },
    {
        name: 'Flutter',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683785107/job-application-tracker/tech-logo/file_type_flutter_icon_130599_t4hlxf.svg'
    },
    {
        name: 'React Native',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1679228176/job-application-tracker/tech-logo/react_clfxcz.svg'
    },
    {
        name: 'npm',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683785164/job-application-tracker/tech-logo/npm_rfdffm.svg'
    },
    {
        name: 'Nest.js',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683785449/job-application-tracker/tech-logo/NestJS_xw5bxh.svg'
    },
    {
        name: 'Next.js',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683785617/job-application-tracker/tech-logo/nextjs-icon-svgrepo-com_fu7njk.svg'
    },
    {
        name: 'Ionic',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683785709/job-application-tracker/tech-logo/ionic_kwik5h.svg'
    },
    {
        name: 'Gatsby',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683785773/job-application-tracker/tech-logo/gatsbyjs-icon_zn9e45.svg'
    },
    {
        name: 'GraphQL',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683786752/job-application-tracker/tech-logo/graphql-icon_soaoaa.svg'
    },
    {
        name: 'C#',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683786992/job-application-tracker/tech-logo/c--4_v4hv3o.svg'
    },
    {
        name: 'C++',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683790530/job-application-tracker/tech-logo/c_shhorn.svg'
    },
    {
        name: 'Laravel',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683826552/job-application-tracker/tech-logo/Laravel_sghmva.svg'
    },
    {
        name: 'Django',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683826931/job-application-tracker/tech-logo/django-icon-svgrepo-com_a0580u.svg'
    },
    {
        name: 'ASP.NET Core',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683827061/job-application-tracker/tech-logo/.NET_Core_Logo_z1cjea.svg'
    },
    {
        name: 'Flask',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683835694/job-application-tracker/tech-logo/flask-svgrepo-com_k1kaqt.svg'
    },
    {
        name: 'Spring Boot',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683836182/job-application-tracker/tech-logo/springio-icon_c6stj8.svg'
    },
    {
        name: 'aws',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683836509/job-application-tracker/tech-logo/icons8-amazon-web-services_bbg1lt.svg'
    },
    {
        name: 'Azure',
        logoUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1683836644/job-application-tracker/tech-logo/Microsoft_Azure_izhoai.svg'
    },

]
