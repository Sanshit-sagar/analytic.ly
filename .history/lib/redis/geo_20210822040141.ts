import * as d3 from 'd3'
import redis from './index'

interface Coordinate {
    latitude?: number;
    longitude?: number; 
    x: number;
    y: number; 
}

interface GeoDatum {
    cfRay: string;
    latitude: number;
    longitude: number;
    city: string;
    country: string; 
    postalCode: number;
    metroCode: number;
    timezone: string;
    timestamp: number;
    coordinate: Coordinate;
    count?: number;
}

function hashifyCoordinate(coord: Coordinate): string {
    return `(${coord.x},${coord.y})`;
}

// TODO: fix for edge case of different users having the same coordinates, 
// store arr of objs in seen[hash]
function formatGeoClickstream(userClickstream: any[]): GeoDatum[] {
    const output: any[] = [];
    const seen = {}

    userClickstream.map((click: any, i: number) => {
        let data = JSON.parse(click);
        let reqHeaders = data.requestHeaders

        const coordinate: Coordinate = {  
            latitude: parseFloat(reqHeaders.latitude),  
            longitude: parseFloat(reqHeaders.longitude),
            x: Math.round(parseFloat(reqHeaders.latitude)),
            y: Math.round(parseFloat(reqHeaders.longitude)),
        }
        let hash = hashifyCoordinate(coordinate)

         output.push({
            cfRay: reqHeaders.cfRay,
            city: reqHeaders.city,
            country: reqHeaders.country,
            postalCode: parseInt(reqHeaders.postalCode),
            metroCode: parseInt(reqHeaders.metroCode),
            timezone: reqHeaders.timezone,
            timestamp: parseInt(reqHeaders.timestamp),
            coordinate: coordinate,
            hash: hash
        });

        if(!seen[hash]) {
            seen[hash] = { ...output[output.length - 1], count: 1 };
        } else {
            seen[hash] = { ...seen[hash], count: seen[hash].count + 1 }
        }
    });

    return { output, seen }; 
}

function getUserGeoClickstreamFrequencies(geodata: any[]) {
    let cityFreqs = {}, countryFreqs = {}, metroCodeFreqs = {}, timezoneFreqs = {}, postalCodeFreqs = {}


    geodata.map((gc: GeoDatum, _: number) => {
        cityFreqs[gc.city] = !cityFreqs[gc.city] ? 1 : cityFreqs[gc.city] + 1
        countryFreqs[gc.country] = !countryFreqs[gc.country] ? 1 : countryFreqs[gc.country] + 1
        metroCodeFreqs[gc.metroCode] = !metroCodeFreqs[gc.metroCode] ? 1 : metroCodeFreqs[gc.metroCode] + 1
        timezoneFreqs[gc.timezone] = !timezoneFreqs[gc.timezone] ? 1 : timezoneFreqs[gc.timezone] + 1
        postalCodeFreqs[gc.postalCode] = !postalCodeFreqs[gc.postalCode] ?  1 : postalCodeFreqs[gc.postalCode] + 1
    });

    return { cityFreqs, countryFreqs, metroCodeFreqs, timezoneFreqs, postalCodeFreqs };
}

function getUserGeoClickstreamFrequencyDetails(geodata: any[]) {
    let cityFreqs = {}, countryFreqs = {}, metroCodeFreqs = {}, timezoneFreqs = {}, postalCodeFreqs = {}

    geodata.map((gc: GeoDatum, _: number) => {
        cityFreqs[gc.city] = !cityFreqs[gc.city] ? [{...gc}] : [...cityFreqs[gc.city], {...gc}]
        countryFreqs[gc.country] = !countryFreqs[gc.country] ? [{...gc}] : [...countryFreqs[gc.country], {...gc}]
        metroCodeFreqs[gc.metroCode] = !metroCodeFreqs[gc.metroCode] ? [{...gc}] : [...metroCodeFreqs[gc.metroCode], {...gc}]
        timezoneFreqs[gc.timezone] = !timezoneFreqs[gc.timezone] ? [{...gc}] : [...timezoneFreqs[gc.timezone], {...gc}]
        postalCodeFreqs[gc.postalCode] = !postalCodeFreqs[gc.postalCode] ?  [{...gc}] : [...postalCodeFreqs[gc.postalCode], {...gc}]
    });

    return { cityFreqs, countryFreqs, metroCodeFreqs, timezoneFreqs, postalCodeFreqs };
}


export async function getUserGeoClickstream(email: string, page?: number, getMap?: boolean = true) {
    const userClickstream = await redis.lrange(`clickstream.user.${email}`, 0, -1);
    const { output, seen } = formatGeoClickstream(userClickstream);
    return getMap ? seen : output; 
}

export async function getUserGeoClickstreamStats(email: string, more: boolean) {
    const output = await getUserGeoClickstream(email, 1, false);
    return more ? getUserGeoClickstreamFrequencyDetails(output) : getUserGeoClickstreamFrequencies(output)
}
