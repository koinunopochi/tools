export function createSpotList(spots, spotMarkers, map) {
  const container = document.createElement('div');
  spots.forEach((spot) => {
    const spotItem = document.createElement('div');
    spotItem.className = 'spot-item';
    spotItem.innerHTML = `<h4>${spot.title}</h4><p>${spot.description}</p>`;
    spotItem.addEventListener('click', () => {
      // クリックで該当スポットへセンタリング＆ポップアップ表示
      map.setView(spot.coords, 13);
      const marker = spotMarkers[spot.id];
      if (marker) {
        marker.openPopup();
      }
    });
    container.appendChild(spotItem);
  });
  return container;
}
