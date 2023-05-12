
export interface Application {
    _id: string,
    company: string,
    companyDesc?: string,
    position: string,
    positionDesc?: string,
    postedAt?: string,
    location: string,
    experience?: number,
    technologies?: string[]
    contact?: { name?: string, email?: string, phone?: string, linkedin?: string },
    submittedVia: string,
    submittedAt: number,
    status: Status,
    postedDate?: number,
    positionUrl?: string,
    logoUrl?: string,
    links?: [{ name: string, url: string }],
    isPinned: boolean
}

export interface DraftApplication {
    _id?: string,
    company: string,
    companyDesc?: string,
    position: string,
    positionDesc?: string,
    postedAt?: string,
    location: string,
    experience?: number,
    technologies?: Technology[]
    contact?: { name?: string, email?: string, phone?: string, linkedin?: string },
    submittedVia: string,
    submittedAt?: number | string
    status: Status,
    postedDate?: Date,
    positionUrl?: string
}

export interface FilterBy {
    position: string[],
    location: string[],
    status: string[],
    searchInput: string
}

export interface Criteria {
    location?: { $in: string[] },
    position?: { $in: string[] },
    $or: [{}]
}

// export interface Logo {
//     type: string,
//     theme: string,
//     formats: { src: string }[]
// }

export enum Status {
    submitted = 'Submitted',
    assignment = 'Home Assignment',
    interview = 'Scheduled Interview',
    contract = 'Contract',
    rejection = 'Rejection'
}

export interface Technology {
    id: string,
    name: string,
    logoUrl: string
}
