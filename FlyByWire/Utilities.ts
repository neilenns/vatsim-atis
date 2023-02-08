export interface LatLong {
  latitude: number;
  longitude: number;
}

function kilometersToMiles(kilometers: number): number {
  return kilometers * 0.62137;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function distanceBetweenTwoPointsInMiles(l1: LatLong, l2: LatLong) {
  return kilometersToMiles(distanceBetweenTwoPointsInKilometers(l1, l2));
}

// From https://gist.github.com/SimonJThompson/c9d01f0feeb95b18c7b0
export function distanceBetweenTwoPointsInKilometers(l1: LatLong, l2: LatLong) {
  var R = 6371; // km
  var x1 = l2.latitude - l1.latitude;
  var dLat = toRadians(x1);
  var x2 = l2.longitude - l1.longitude;
  var dLon = toRadians(x2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(l1.latitude)) *
      Math.cos(toRadians(l2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
