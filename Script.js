// --- DITO MO PALITAN ANG PANGALAN AT MGA PICTURES/NOTES ---
const appData = {
  friendName: "Maria", // Pangalan ng kaibigan mo
  subtitle: "Wishing you a day filled with love, laughter, and unforgettable memories! Tap on each photo below to read my special notes for you.",
  photos: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
      caption: "Best Memories 🎉",
      note: "Happy Birthday! Sa lahat ng tawanan at bonding natin, solid ka talagang kasama. Stay awesome!"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80",
      caption: "Always Smiling ✨",
      note: "Salamat sa laging pag-stay at pagpapasaya sa amin. Sana matupad lahat ng mga pangarap mo ngayong taon!"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80",
      caption: "More Cake & Joy 🎂",
      note: "Cake time!! Sana busog at masaya ka ngayong araw. Deserve mo ang lahat ng blessing!"
    }
  ]
};

let audioContext = null;
let isPlayingAudio = false;

// --- DOM Elements ---
const displayFriendName = document.getElementById('displayFriendName');
const displaySubtitle = document.getElementById('displaySubtitle');
const photoGrid = document.getElementById('photoGrid');
const celebrateBtn = document.getElementById('celebrateBtn');

// Modal DOM
const photoModal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalNote = document.getElementById('modalNote');
const closeModal = document.getElementById('closeModal');

// --- Render Website UI ---
function renderApp() {
  if (displayFriendName) displayFriendName.textContent = appData.friendName;
  if (displaySubtitle) displaySubtitle.textContent = appData.subtitle;

  if (photoGrid) {
    photoGrid.innerHTML = '';
    appData.photos.forEach((/** @type {any} */ item, /** @type {number} */ index) => {
      const card = document.createElement('div');
      const rotations = ['rotate(-1deg)', 'rotate(1deg)', 'rotate(-2deg)', 'rotate(2deg)'];
      const currentRot = rotations[index % rotations.length];
      
      card.className = 'polaroid-card';
      card.style.transform = currentRot;

      card.innerHTML = `
        <div class="polaroid-img-wrapper">
          <img src="${item.url}" alt="${item.caption}">
        </div>
        <h4>${item.caption}</h4>
        <span class="polaroid-hint">Click to read note 💌</span>
      `;

      card.addEventListener('click', () => openPhotoModal(item));
      photoGrid.appendChild(card);
    });
  }

  //@ts-ignore
  if (typeof lucide !== 'undefined') {
    //@ts-ignore
    lucide.createIcons();
  }
}

// Modal Control
function openPhotoModal(/** @type {any} */ item) {
  if (!photoModal) return;
  if (modalImage) modalImage.src = item.url;
  if (modalCaption) modalCaption.textContent = item.caption;
  if (modalNote) modalNote.textContent = item.note;
  
  photoModal.classList.remove('hidden');
  setTimeout(() => {
    photoModal.classList.remove('opacity-0');
  }, 10);
}

function closePhotoModal() {
  if (!photoModal) return;
  photoModal.classList.add('opacity-0');
  setTimeout(() => {
    photoModal.classList.add('hidden');
  }, 300);
}

// Confetti Fireworks Trigger
function triggerConfetti() {
  //@ts-ignore
  if (typeof confetti === 'function') {
    //@ts-ignore
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// --- Audio Synthesizer (Happy Birthday Melody) ---
function playBirthdayTune() {
  if (isPlayingAudio) return;
  isPlayingAudio = true;
  
  //@ts-ignore
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  
  audioContext = new AudioContextClass();

  const notes = [
    { note: 264, duration: 0.4 }, { note: 264, duration: 0.4 },
    { note: 297, duration: 0.8 }, { note: 264, duration: 0.8 },
    { note: 352, duration: 0.8 }, { note: 330, duration: 1.2 }
  ];

  let startTime = audioContext.currentTime;

  notes.forEach(item => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = item.note;
    
    gain.gain.setValueAtTime(0.1, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.duration - 0.05);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(startTime);
    osc.stop(startTime + item.duration);

    startTime += item.duration;
  });

  setTimeout(() => {
    isPlayingAudio = false;
  }, (startTime - audioContext.currentTime) * 1000);
}

// --- Event Listeners ---
if (celebrateBtn) {
  celebrateBtn.addEventListener('click', () => {
    triggerConfetti();
    playBirthdayTune();
  });
}

document.getElementById('musicToggle')?.addEventListener('click', playBirthdayTune);
closeModal?.addEventListener('click', closePhotoModal);
photoModal?.addEventListener('click', (e) => {
  if (e.target === photoModal) closePhotoModal();
});

// Initial Load
renderApp();
setTimeout(triggerConfetti, 500);
