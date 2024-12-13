import { stations } from './src/data/stations.js';
import { RadioPlayer } from './src/js/RadioPlayer.js';

function createStationsList(radioPlayer) {
  const stationsList = document.getElementById('stations-list');
  stations.forEach(station => {
    const li = document.createElement('li');
    li.className = 'station-item';
    li.dataset.id = station.id;
    li.innerHTML = `
      <button class="station-button">
        <span class="station-name">${station.name}</span>
        <span class="station-indicator">🎵</span>
      </button>
    `;
    li.addEventListener('click', () => radioPlayer.changeStation(station));
    stationsList.appendChild(li);
  });
}

// Inicializar o player
const radioPlayer = new RadioPlayer();
createStationsList(radioPlayer);