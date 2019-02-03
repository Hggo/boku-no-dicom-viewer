export const study = {
    Url: 'tools/find',
    body: {
        Level: 'Study',
        Expand: true,
        Query: {}
    }
}

export const seriesFromStudy = (studyInstanceUID: string): HttpQuery  => {
    return {
        Url: 'tools/find',
        body: {
            Level: 'Series',
            Expand: true,
            Query: { 
                'StudyInstanceUID': studyInstanceUID 
            }
        }
    }
}

export const instancesFromSerie = (serieId: string): HttpQuery  => {
    return {
        Url: 'tools/find',
        body: {
            Level: 'Instance',
            Expand: true,
            Query: {
                'SeriesInstanceUID': serieId
            }
        }
    }
}

export const tags = (instanceId: string): HttpQuery  => {
    return {
        Url: `/instances/${instanceId}/tags`,
        body: {}
    }
}

export const pixelData = (instanceId: string, frame: number): HttpQuery  => {
    return {
        Url: `/instances/${instanceId}/frames/${frame}/raw`,
        body: {
            responseType: 'arraybuffer'
        }
    }
}

export interface HttpQuery {
    Url: string;
    body: any;
}