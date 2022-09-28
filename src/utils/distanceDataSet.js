// función que convierte raw data en un set que pueda ser usado en los charts
import geoDistance from "./geoDistance";
import moment from "moment";

export const distanceDataSet = (measuresArray) => {
    console.log("measuresArray: ", measuresArray)
    const newSet = measuresArray?.map(({ DevEUI_uplink }, i) => {
        const date1 = moment(DevEUI_uplink.Time);
        const date2 =
            moment(measuresArray[i + 1]?.DevEUI_uplink.Time).format("DD MM YYYY hh:mm") ||
            date1;
        const lat1 = DevEUI_uplink.LrrLAT;
        const long1 = DevEUI_uplink.LrrLON;
        const lat2 = measuresArray[i + 1]?.DevEUI_uplink.LrrLAT || lat1;
        const long2 = measuresArray[i + 1]?.DevEUI_uplink.LrrLON || long1;
        return {
            time: measuresArray[i+1]? date2 : null,
            distance: geoDistance(lat1, long2, lat2, long2) || 0,
        };
    });
    return newSet;
}
