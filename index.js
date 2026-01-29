
// --- DATA ---
const SCHEDULE = [
  {
    day: 'Monday',
    sessions: [
      { time: '18:00 - 19:00', name: 'Boxing (9yrs+)'},
      { time: '19:00 - 20:00', name: 'Carded Amateurs Only'},
      { time: '20:00 - 21:30', name: 'Seniors/Adults'},
    ]
  },
  {
    day: 'Tuesday',
    sessions: [
      { time: 'TBA', name: "121's & Open Gym"},
    ]
  },
  {
    day: 'Wednesday',
    sessions: [
      { time: '18:00 - 19:00', name: 'Boxing (9yrs+)'},
      { time: '19:00 - 20:00', name: 'Carded Amateurs Only'},
      { time: '20:00 - 21:30', name: 'Seniors/Adults'},
    ]
  },
  {
    day: 'Thursday',
    sessions: [
      { time: '18:00 - 19:00', name: 'Boxing (9yrs+)' },
      { time: '19:00 - 20:00', name: 'Carded Amateurs Only'},
      { time: '20:00 - 21:30', name: 'Seniors/Adults' },
    ]
  },
  {
    day: 'Friday',
    sessions: [
      { time: 'Available', name: "121's & Private Hire"},
    ]
  },
    {
    day: 'Saturday',
    sessions: [
      { time: 'Available', name: "121's & Private Hire"},
    ]
  },
    {
    day: 'Sunday',
    sessions: [
      { time: 'Available', name: "121's & Private Hire"},
    ]
  }
];

const GALLERY_ITEMS = [
//   { url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1000&auto=format&fit=crop', title: 'Main Training Area', category: 'Facility' },
//   { url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop', title: 'Heavy Bag Row', category: 'Facility' },
//   { url: 'https://images.unsplash.com/photo-1517438322351-375848d00c31?q=80&w=1000&auto=format&fit=crop', title: 'Intense Mitt Work', category: 'Training' },
//   { url: 'https://images.unsplash.com/photo-1552072047-54d036433021?q=80&w=1000&auto=format&fit=crop', title: 'Youth Program', category: 'Training' },
//   { url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop', title: 'Professional Sparring', category: 'Sparring' },
//   { url: 'https://images.unsplash.com/photo-1634620019234-a2929e47266a?q=80&w=1000&auto=format&fit=crop', title: 'Strength Section', category: 'Facility' },


];

// --- NAVIGATION LOGIC ---
function navigate() {
  const hash = window.location.hash || '#home';
  const pageId = hash.substring(1);

  // Hide all sections
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });

  // Show active section
  const activeSection = document.getElementById(pageId);
  if (activeSection) {
    activeSection.classList.add('active');
  }

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    }
  });

  // Scroll to top
  window.scrollTo(0, 0);
  
  // Close mobile menu if open
  document.getElementById('mobile-menu').classList.add('hidden');
  document.getElementById('mobile-menu').classList.add('flex');
}

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);

// --- MOBILE MENU ---
document.getElementById('menu-toggle').addEventListener('click', () => {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// --- NAVBAR SCROLL EFFECT ---
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('bg-black/90', 'backdrop-blur-md', 'border-b', 'border-white/5');
    navbar.classList.remove('bg-transparent', 'py-6');
    navbar.classList.add('py-3');
  } else {
    navbar.classList.remove('bg-black/90', 'backdrop-blur-md', 'border-b', 'border-white/5');
    navbar.classList.add('bg-transparent', 'py-6');
    navbar.classList.remove('py-3');
  }
});

// --- TIMETABLE RENDERING ---
let currentDay = SCHEDULE[0].day;

function renderTimetable() {
  const daySelector = document.getElementById('day-selector');
  const grid = document.getElementById('timetable-grid');
  
  // Populate day buttons
  daySelector.innerHTML = SCHEDULE.map(day => `
    <button class="day-btn px-8 py-4 font-bold uppercase tracking-widest transition-all stencil-text text-xs border-2 ${currentDay === day.day ? 'bg-red-600 text-white border-red-600' : 'bg-transparent text-stone-500 border-white/10'}" data-day="${day.day}">
      ${day.day}
    </button>
  `).join('');

  // Populate grid
  const scheduleForDay = SCHEDULE.find(d => d.day === currentDay);
  grid.innerHTML = scheduleForDay.sessions.map(session => `
    <div class="bg-[#111111] border border-white/5 border-l-4 border-l-red-600 p-10 hover:bg-[#151515] transition-all group shadow-lg">

      <h3 class="text-2xl font-black stencil-text mb-2 text-stone-200">${session.name}</h3>
      <div class="text-red-600 font-bold text-lg tracking-widest mb-8">${session.time}</div>

    </div>
  `).join('');

  // Add listeners to new buttons
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentDay = e.target.getAttribute('data-day');
      renderTimetable();
    });
  });
}

// --- GALLERY RENDERING ---
let currentFilter = 'All';

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  const filtered = currentFilter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === currentFilter);

  grid.innerHTML = filtered.map(item => `
    <div class="group relative aspect-square overflow-hidden bg-[#111] border border-white/5 shadow-2xl">
      <img src="${item.url}" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100" />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div class="absolute bottom-0 left-0 p-10 opacity-0 group-hover:opacity-100 transition-all translate-y-6 group-hover:translate-y-0 duration-500">
        <span class="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">${item.category}</span>
        <h3 class="text-2xl font-black stencil-text text-white">${item.title}</h3>
      </div>
    </div>
  `).join('');
}

// Filter listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    currentFilter = e.target.getAttribute('data-filter');
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.replace('text-red-600', 'text-stone-600'));
    e.target.classList.replace('text-stone-600', 'text-red-600');
    renderGallery();
  });
});

// Initial Init
renderTimetable();
renderGallery();
