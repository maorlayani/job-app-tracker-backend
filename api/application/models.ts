
export interface Application {
    _id: string,
    company: string,
    position: string,
    positionDesc?: string,
    postedAt?: string,
    submittedAt: number | string,
    status: Status,
    location: string,
    contact?: string,
    postedDate?: Date,
    companyDesc?: string,
    technologies?: string[]
    experience?: number,
    submittedVia: string,
    logoUrl?: string,
    isPinned: boolean
}

export interface DraftApplication {
    _id?: string,
    company: string,
    position: string,
    positionDesc?: string,
    postedAt?: string,
    status: Status,
    location: string,
    contact?: string,
    postedDate?: Date,
    companyDesc?: string,
    technologies?: string[]
    experience?: number,
    submittedVia: string,
    submittedAt?: number | string
}

export interface FilterBy {
    position: string[],
    location: string[],
    status: string[],
    serachInput: string
}

export interface Criteria {
    location?: { $in: string[] },
    position?: { $in: string[] },
    $or: [{}]
}

export enum Status {
    submitted = 'Submitted',
    assignment = 'Home Assignment',
    interview = 'Scheduled Interview',
    contract = 'Contract',
    rejection = 'Rejection'
}