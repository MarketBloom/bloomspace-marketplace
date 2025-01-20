export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  
  console.log('Distance calculation details:', {
    lat1, lon1, lat2, lon2,
    dLat: dLat * (180 / Math.PI), // Convert back to degrees for logging
    dLon: dLon * (180 / Math.PI),
    distance: distance.toFixed(2) + ' km'
  });
  
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Add to window object for global access
window.calculate_distance = calculateDistance;