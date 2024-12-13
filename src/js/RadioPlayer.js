export class RadioPlayer {
  constructor() {
    this.audio = new Audio();
    this.isPlaying = false;
    this.currentStation = null;
    
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    this.playPauseButton = document.getElementById('playPause');
    this.playIcon = document.getElementById('playIcon');
    this.volumeControl = document.getElementById('volume');
    this.currentStationText = document.getElementById('current-station');
    this.stationsList = document.getElementById('stations-list');
  }

  setupEventListeners() {
    this.playPauseButton.addEventListener('click', () => this.togglePlay());
    this.volumeControl.addEventListener('input', (e) => this.setVolume(e.target.value));
    
    this.audio.addEventListener('playing', () => {
      this.playIcon.textContent = '⏸️';
      this.isPlaying = true;
    });
    
    this.audio.addEventListener('pause', () => {
      this.playIcon.textContent = '▶️';
      this.isPlaying = false;
    });
    
    this.audio.addEventListener('error', (e) => {
      console.error('Erro ao reproduzir áudio:', e);
      alert('Erro ao reproduzir a rádio. Por favor, tente novamente.');
    });
  }

  changeStation(station) {
    this.currentStation = station;
    this.currentStationText.textContent = station.name;
    
    this.audio.src = station.url;
    if (this.isPlaying) {
      this.audio.play();
    }

    // Atualiza visual da estação selecionada
    document.querySelectorAll('.station-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.id === station.id.toString()) {
        item.classList.add('active');
      }
    });
  }

  togglePlay() {
    if (!this.currentStation) {
      alert('Por favor, selecione uma estação primeiro.');
      return;
    }

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  setVolume(value) {
    this.audio.volume = value / 100;
  }
}