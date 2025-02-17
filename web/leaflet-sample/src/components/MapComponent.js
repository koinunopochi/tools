import L from 'leaflet';

export function createMapComponent(mapId) {
  // 長野県付近を初期中心に設定
  const map = L.map(mapId).setView([36.65, 138.2], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  return map;
}
