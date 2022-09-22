// función que convierte raw data en un set que pueda ser usado en los charts
import geoDistance from "./geoDistance";
import moment from "moment";

export const distanceDataSet = (wholeData) => {
    const newSet = wholeData.map(({ createdAt, payload }, i) => {
        const date1 = moment(createdAt);
        const date2 =
            moment(wholeData[i + 1]?.createdAt).format("DD MM YYYY hh:mm") ||
            date1;
        const lat1 = payload[0].latitude;
        const long1 = payload[0].longitude;
        const lat2 = wholeData[i + 1]?.payload[0].latitude || lat1;
        const long2 = wholeData[i + 1]?.payload[0].longitude || long1;
        return {
            time: wholeData[i+1]? date2 : null,
            distance: geoDistance(lat1, long2, lat2, long2) || 0,
        };
    });
    return newSet;
}
