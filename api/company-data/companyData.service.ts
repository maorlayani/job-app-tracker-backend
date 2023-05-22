import axios from "axios"
import { getCollection } from '../../services/db.service'
import { ObjectId } from 'mongodb'
import { MY_BRAND_API_KEY, MY_BRAND_BASE_URL } from '../../private/privateKeys.service'

// module.exports = {
//     getByName,
//     add,
// }

export async function getByName(companyName: string) {
    try {
        const collection = await getCollection('company_data')
        console.log(companyName);

        let company = await collection.findOne({ name: companyName.toLowerCase() })
        console.log('From DB');
        console.log(company);
        if (!company) {
            console.log('New company');

            company = await add(companyName)
        }
        return company
    } catch (err) {
        console.error('ERROR: cannot find company data', err)
        throw err
    }
}

async function getById(companyId: string) {
    try {
        const collection = await getCollection('company_data')
        const company = await collection.findOne({ _id: new ObjectId(companyId) })
        return company
    } catch (err) {
        console.error('ERROR: cannot find company data', err)
        throw err
    }
}

export async function add(companyName: string) {
    try {
        const collection = await getCollection('company_data')
        let companyData = await _getCompanyData(companyName, 'com')
        if (!companyData) companyData = await _getCompanyData(companyName, 'io')
        // if (!companyData) return {}
        const { insertedId } = await collection.insertOne(companyData)
        const addedCompany = await getById(insertedId)
        return addedCompany
    } catch (err) {
        throw err
    }
}

async function _getCompanyData(companyName: string, domainExtension: string) {
    try {
        const apiData = await axios(
            `${MY_BRAND_BASE_URL}${companyName}.${domainExtension}`,
            {
                headers: {
                    'Authorization': `Bearer ${MY_BRAND_API_KEY}`
                }
            })
        console.log('API CALL');
        if (!apiData.data.name) return null
        apiData.data.name = apiData.data.name.toLowerCase()
        return apiData.data
    } catch (err) {
        console.error(err);
    }
}

