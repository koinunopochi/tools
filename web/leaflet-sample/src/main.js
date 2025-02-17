import { createHeader } from './components/Header.js';
import { createFooter } from './components/Footer.js';
import { createMapComponent } from './components/MapComponent.js';
import { createSpotList } from './components/SpotList.js';

// メインコンテナを取得
const app = document.getElementById('app');

// ヘッダーを追加
const header = createHeader();
app.appendChild(header);

// メイン領域（マップ＋サイドバー）の作成
const mainContainer = document.createElement('main');

// マップコンテナ
const mapContainer = document.createElement('div');
mapContainer.id = 'map';
mainContainer.appendChild(mapContainer);

// サイドバーコンテナ
const sidebarContainer = document.createElement('div');
sidebarContainer.id = 'sidebar';
mainContainer.appendChild(sidebarContainer);

app.appendChild(mainContainer);

// フッターを追加
const footer = createFooter();
app.appendChild(footer);

// Leaflet マップの初期化（長野県付近を中心）
const map = createMapComponent('map');

// おすすめスポットのデータ
const recommendedSpots = [
  {
    id: 'nagano-city',
    coords: [36.6484, 138.1943],
    title: '長野市',
    description: '歴史ある街で、善光寺などの名所があります。',
  },
  {
    id: 'zenkoji',
    coords: [36.6513, 138.1818],
    title: '善光寺',
    description: '日本最古級の寺院。パワースポットとしても人気です。',
  },
  {
    id: 'matsumoto-castle',
    coords: [36.2381, 137.9724],
    title: '松本城',
    description: '国宝に指定される美しいお城。',
  },
  {
    id: 'nozawa-onsen',
    coords: [36.873, 138.202],
    title: '野沢温泉',
    description: '雪国ならではの温泉街。冬はスキーも楽しめます。',
  },
];

// 各スポットのマーカーを作成し、ID をキーとしたマッピングを作成
const spotMarkers = {};
recommendedSpots.forEach((spot) => {
  const marker = L.marker(spot.coords).addTo(map);
  marker.bindPopup(`
    <h3>${spot.title}</h3>
    <p>${spot.description}</p>
  `);
  spotMarkers[spot.id] = marker;
});

// サイドバー用スポットリストコンポーネントを生成してサイドバーに追加
const spotListComponent = createSpotList(recommendedSpots, spotMarkers, map);
sidebarContainer.appendChild(spotListComponent);

// ユーザーの現在地を取得してマーカーを追加（オプション）
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const userMarker = L.marker([lat, lng]).addTo(map);
      userMarker.bindPopup('あなたの現在地です。');
    },
    (error) => {
      console.error('位置情報の取得に失敗:', error);
    }
  );
} else {
  alert('このブラウザは位置情報をサポートしていません。');
}
