export interface companyData {
    _id: string,
    name: string,
    domain: string,
    claimed: boolean,
    description: string,
    links: [{ name: string, url: string }],
    logos: [{
        type: string, theme: string, formats: [
            {
                src: string,
                background?: string,
                size?: number,
                format?: string,
                width?: number,
                height?: number
            }
        ]
    }],
    colors: any[],
    fonts: any[],
    images: any[]
}