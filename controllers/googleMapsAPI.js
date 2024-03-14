const axios = require('axios');

const url = "https://routes.googleapis.com/directions/v2:computeRoutes"
const apiKey = ""
const returnFields = "routes.duration,routes.distanceMeters,routes.travelAdvisory.tollInfo,routes.polyline.encodedPolyline,routes.polyline"

export async function calcRoute(origin, destination){
    const body = JSON.stringify({
        origin: {
            address: origin
        },
        destination: {
            address: destination
        },
        travelMode: "DRIVE",
        extraComputations: ["TOLLS"],
        routingPreference: "TRAFFIC_UNAWARE",
        computeAlternativeRoutes: false,
        routeModifiers: {
            avoidTolls: false,
            avoidHighways: false,
            avoidFerries: false
        },
        languageCode: "pt-BR",
        units: "METRIC",
    });

    const res = await axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': returnFields
        }
    });

    const response = {
        gasolinePrice: "R$" + String(parseFloat((((res.data.routes[0].distanceMeters)/1000/14.9)*5.58).toFixed(2))),
        taxesPrice: "R$" + (res.data.routes[0].travelAdvisory.tollInfo.estimatedPrice[0].units ? res.data.routes[0].travelAdvisory.tollInfo.estimatedPrice[0].units : "0") + "," + (res.data.routes[0].travelAdvisory.tollInfo.estimatedPrice[0].nanos ? String(res.data.routes[0].travelAdvisory.tollInfo.estimatedPrice[0].nanos).substring(0,2) : "00")
    }

    return response;
}
