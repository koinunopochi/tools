// main.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const naganoCoords = [36.6484, 138.1943];
const naganoMarker = L.marker(naganoCoords).addTo(map);

// 3. マーカーにポップアップを設定（クリックで情報表示）
naganoMarker.bindPopup(`
  <h3>長野市</h3>
  <p>ここに長野市の詳細情報を表示できます。</p>
`);

  // ユーザーの位置情報を取得できるか確認
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      // ユーザーの位置に地図の中心を移動
      map.setView([lat, lng], 13);
      
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup('あなたの現在地です。')
        .openPopup();
    },
    (error) => {
      console.error('位置情報の取得に失敗しました:', error);
    }
  );
} else {
  alert('このブラウザは位置情報をサポートしていません。');
}
