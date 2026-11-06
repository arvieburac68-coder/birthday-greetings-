// --- DITO MO PALITAN ANG PANGALAN AT MGA PICTURES/NOTES ---
const appData = {
  friendName: "Maria", // Pangalan ng kaibigan mo
  subtitle: "Wishing you a day filled with love, laughter, and unforgettable memories! Happy birthday nay!!",
  photos: [
    {
      id: 1,
      url: "pic1.jpg",
      caption: "vie",
      note: "Happy birthday Maria!!!!, 20 kana tanders kana talaga HWHAHAHAHAH i hope na hindi ka mag bago... kahit minsan may pag ka baliw ka, tanggap ka naman namin kahit ganyan ka HAHAHA i hope na maging masaya ka sa araw mo ngayon sayang at hindi ka namin mababasagan nang itlog since busy narin yung iba. And ayun lang stay safe and happy birthday🥳"    },
    {
      id: 2,
      url: "pic2.jpg",
      caption: "Tombits",
      note: "happy birthday rean bi ef ef, hope u live long happy at matulog ka na ng gabi wag na umaga"
    },
    {
      id: 3,
      url: "pic3.jpg",
      caption: "Zyro",
      note: "Happy birthday Ninang Rean!!!, wish you more birthday to come may Godbless you always mag ingat ka palagi kung saan ka man dalhin ng tadhana stay in a good health yun lang happy birthday ulittt"
    },
    {
      id: 4,
      url: "pic4.jpg",
      caption: "Ciswang",
      note: "Happiest birthday, Rean! 🥳✨ Today you turned 20 na HAHAHA MAGKAIDAD NA TAYO!🤣 Wish ko lang sayo is mag-ingat ka palagi and keep chasing your dreams, cuz God has plenty of plans for you. Thank you for being there for almost 7 years 😫HAHAHA isipin mo yon, ang tagal na natin magkakilala! Di lang talaga tayo that close nung pandemic HAHAHA, pero look at us now—surviving adulthood together! Seryoso, proud na proud ako sa lahat ng pinagdaanan mo. Entering the 20s club is a huge milestone, pero panatag ako kasi alam kong kayang-kaya mo anuman ang i-throw ng buhay sayo. Don't ever doubt yourself when things get tough, kasi aside sa guidance ni Lord, palagi lang akong nandito ready na mag-cheer at sumuporta sayo anytime. sana maging super saya at memorable ng araw na 'to for you. Treat yourself today kasi deserve mo! Once again, happy 20th birthday, Rean! cheers to more years of friendship, tawanan, at pag tupad ng mga pangarap natin. Love u and enjoy your day!          "
      
    }, 
    {
      
      id: 5,
      url: "pic5.jpg",
      caption: "Alex",
      note: "Happy Birthday La sana gumaling kana sa sakit mo kung ano man yon at sana pag palain ka ng poong may kapal na gabayan ka sa bawat hamon sa buhay, wag ka sana pabayaan ng mga anghel at kampon ng dilim."
    },
    {
      id: 6,
      url: "pic6.jpg",
      caption: "claude",
      note: "happy birthday rean! i wish you good health, happiness, and more blessings in life. sana makabalik ka na sa pag-aaral next year, and once you do, pagbutihin mo and never give up on your dreams. always believe in yourself. enjoy your special day! god bless you always!"
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
