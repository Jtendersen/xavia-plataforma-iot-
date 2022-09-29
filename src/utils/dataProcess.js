const pointInPolygon = require('point-in-polygon');

const getBreakingPoints = (measures) => {

  let changeBreakpoint = true;

  const breakpoints = measures.map((time, i) => {
    if (
      i === 0 &&
      (time.DevEUI_uplink.LrrLAT !== measures[i + 1].DevEUI_uplink.LrrLAT ||
        time.DevEUI_uplink.LrrLON !== measures[i + 1].DevEUI_uplink.LrrLON)
    ) {
      return time;
    } else if (i === measures.length - 1) return time;
    else if (
      time.DevEUI_uplink.LrrLAT === measures[i + 1].DevEUI_uplink.LrrLAT &&
      time.DevEUI_uplink.LrrLON === measures[i + 1].DevEUI_uplink.LrrLON &&
      changeBreakpoint
    ) {
      changeBreakpoint = !changeBreakpoint;
      return time;
    } else if (
      (time.DevEUI_uplink.LrrLAT !== measures[i + 1].DevEUI_uplink.LrrLAT ||
        time.DevEUI_uplink.LrrLON !== measures[i + 1].DevEUI_uplink.LrrLON) &&
      !changeBreakpoint
    ) {
      changeBreakpoint = !changeBreakpoint;
      return time;
    }
  });

  return breakpoints.filter((e) => e !== undefined);
};

const geoDistance = (lat1, lon1, lat2, lon2) => {  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d * 1000; // meters
}

const getArea = (coordinates) => {
  const area1 = [ [-34.67347260514825, -58.361439538405854],[-34.64736765604387, -58.32736941165345],[-34.50015965336804, -58.40905834328793],[-34.493333025811424, -58.60943570934088]];
  const area2 = [ [-34.493333025811424, -58.60943570934088],[-34.65454311821215, -58.84091546211309],[-34.84261258999526, -58.60303025685572],[-34.67347260514825, -58.361439538405854]];
  const area3 = [ [-34.67347260514825, -58.361439538405854],[-34.84261258999526, -58.60303025685572],[-34.97003716240066, -58.33862065069739],[-34.84676776741471, -58.2497141615426]];
  const area4 = [ [-34.67347260514825, -58.361439538405854],[-34.84676776741471, -58.2497141615426],[-34.76221053068039, -58.091287506904784],[-34.64736765604387, -58.32736941165345]];
   if(pointInPolygon(coordinates, area1)) {return "area1"}
   if(pointInPolygon(coordinates, area2)) {return "area2"}
   if(pointInPolygon(coordinates, area3)) {return "area3"}
   if(pointInPolygon(coordinates, area4)) {return "area4"}
 }

const getCycles = (measures) => {
  const breakpoints = getBreakingPoints(measures);
  const payload = []
  for (let i = 0;i<=breakpoints.length; i++){
    if (i===breakpoints.length-1) {break}
    const data = {}
    data.cycle = i+1
    data.payload = [breakpoints[i], breakpoints[i+1]]
    data.distanceMeters = geoDistance(breakpoints[i].DevEUI_uplink.LrrLAT,breakpoints[i].DevEUI_uplink.LrrLON,breakpoints[i+1].DevEUI_uplink.LrrLAT, breakpoints[i+1].DevEUI_uplink.LrrLON)
    data.timeMinutes=  (new Date(breakpoints[i].DevEUI_uplink.Time)-(new Date(breakpoints[i + 1].DevEUI_uplink.Time))) /
    1000 /
    60
    data.AvgSpeedMeterPerMinute= data.distanceMeters/data.timeMinutes
    data.batteryStatus = breakpoints[i+1].batteryVoltage
    data.area = [getArea([breakpoints[i].DevEUI_uplink.LrrLAT,breakpoints[i].DevEUI_uplink.LrrLON]),getArea([breakpoints[i+1].DevEUI_uplink.LrrLAT, breakpoints[i+1].DevEUI_uplink.LrrLON])]
    payload.push(data)
  };
  
  return payload
}




export { getBreakingPoints, getCycles}
