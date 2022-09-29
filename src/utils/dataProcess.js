const pointInPolygon = require('point-in-polygon');

const getBreakingPoints = (measures) => {
  let changeBreakpoint = true;

  const breakpoints = measures.map((time, i) => {
    if (
      i === 0 &&
      (time.payload[0].latitude !== measures[i + 1].payload[0].latitude ||
        time.payload[0].longitude !== measures[i + 1].payload[0].longitude)
    ) {
      return time;
    } else if (i === measures.length - 1) return time;
    else if (
      time.payload[0].latitude === measures[i + 1].payload[0].latitude &&
      time.payload[0].longitude === measures[i + 1].payload[0].longitude &&
      changeBreakpoint
    ) {
      changeBreakpoint = !changeBreakpoint;
      return time;
    } else if (
      (time.payload[0].latitude !== measures[i + 1].payload[0].latitude ||
        time.payload[0].longitude !== measures[i + 1].payload[0].longitude) &&
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
  const area1 = [ [-34.56688672912117, -58.45086306175136],[-34.56836654737671, -58.451925216475686],[-34.56933835399464, -58.45019787394422],[-34.567871805099315,-58.449060617370726]];
  const area2 = [ [-34.56933835399464, -58.45019787394422],[-34.5698419220473, -58.4492376431581],[-34.56842397262896, -58.44797700497522],[-34.567871805099315, -58.449060617370726]];
  const area3 = [ [-34.56842397262896, -58.44797700497522],[-34.56597884536577, -58.445481723518846],[-34.565197938511155, -58.447787998975905],[-34.567871805099315, -58.449060617370726]];
   if(pointInPolygon(coordinates, area1)) {return "area1"}
   if(pointInPolygon(coordinates, area2)) {return "area2"}
   if(pointInPolygon(coordinates, area3)) {return "area3"}
 }

const getCycles = (measures) => {
  const breakpoints = getBreakingPoints(measures);
  const payload = []
  for (let i = 0;i<=breakpoints.length; i++){
    if (i===breakpoints.length-1) {break}
    const data = {}
    data.cycle = i+1
    data.payload = [breakpoints[i], breakpoints[i+1]]
    data.distanceMeters = geoDistance(breakpoints[i].payload[0].latitude,breakpoints[i].payload[0].longitude,breakpoints[i+1].payload[0].latitude, breakpoints[i+1].payload[0].longitude)
    data.timeMinutes= (new Date(breakpoints[i + 1].createdAt) - new Date(breakpoints[i].createdAt)) /
    1000 /
    60
    data.AvgSpeedMeterPerMinute= data.distanceMeters/data.timeMinutes
    data.batteryStatus = breakpoints[i+1].batteryVoltage
    data.area = [getArea([breakpoints[i].payload[0].latitude,breakpoints[i].payload[0].longitude]),getArea([breakpoints[i+1].payload[0].latitude, breakpoints[i+1].payload[0].longitude])]
    payload.push(data)
  };
  
  return payload
}




export { getBreakingPoints, getCycles}
