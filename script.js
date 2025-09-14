<script>
/* -------- Spoken 20-30s intro (approx 25s at natural pace) -------- */
const introText = `Hi, I’m Abbas Molvi. I’m an Interim Regulations Manager at PST dot AG, with three and a half years of experience turning legal updates into accurate tariff data. I enjoy the intersection of international trade and automation — building ETL pipelines and Python tools that feed enterprise systems. I also study finance, human psychology and enjoy exploring food and places around the world.`;

/* ------- Tour segments: each speaks and highlights a section ------- */
const tourSteps = [
  { id: 'section-bio', title: 'Three Key Questions', text:
      'Let me answer the three questions that matter most for our conversation today.'
  },
  { id: 'question-1', title: 'PST.AG Role & Experience', text:
      'I have been with PST dot AG for three and a half years as Interim Regulations Manager. I love being the bridge between legal complexity and technological innovation, transforming regulatory documents into machine-readable data. My work involves ETL pipeline development, SAP integration, and process optimization that has reduced processing time from 48 hours to 4 hours per update cycle.'
  },
  { id: 'question-2', title: 'My Global Journey & Travel Experiences', text:
      'I am originally from India but have lived across eight countries and thirty seven cities spanning three continents. Each place has shaped my worldview - from Tanzania teaching me about resilience and community, to the UAE showing me modern trade dynamics, to the UK developing my professional skills. My top travel recommendation is to start with local markets and food streets where you truly understand a culture.'
  },
  { id: 'question-3', title: 'My Hobbies & Interests', text:
      'I enjoy studying finance, human psychology, international trade, travel and food, philosophy, and music. These diverse interests help me understand both the technical and human aspects of business, while music connects me to different cultures and provides a universal language of emotion and expression.'
  },
  { id: 'section-countries', title: 'Countries I have Experienced', text:
      'Click on any country flag to see detailed information about cities visited, famous places, and food recommendations from my travels.'
  },
  { id: 'section-langs', title: 'Languages I Understand', text:
      'I speak eight languages including English, Hindi, Swahili, Spanish and Arabic. This multilingual ability helps me work effectively across different regions and cultures.'
  }
];

/* Utility: speak text using Web Speech API with enhanced error handling */
function speakText(text, onend){
  if(!('speechSynthesis' in window)){
    console.warn('Speech synthesis not supported in this browser.');
    showNotification('Speech synthesis not supported in this browser.', 'warning');
    if(onend) onend();
    return;
  }
  
  try {
    window.speechSynthesis.cancel(); // stop any ongoing
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1; 
    utter.pitch = 1;
    utter.volume = 0.8;
    
    const voices = window.speechSynthesis.getVoices();
    if(voices && voices.length){
      let v = voices.find(x=>/en-US/i.test(x.lang)) || voices.find(x=>/en-GB/i.test(x.lang)) || voices[0];
      if(v) utter.voice = v;
    }
    
    utter.onend = ()=> { 
      if(onend) onend(); 
    };
    
    utter.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      showNotification('Speech synthesis failed. Please try again.', 'error');
      if(onend) onend();
    };
    
    window.speechSynthesis.speak(utter);
  } catch (error) {
    console.error('Error in speech synthesis:', error);
    showNotification('Speech synthesis error. Please try again.', 'error');
    if(onend) onend();
  }
}

/* Notification system for user feedback */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10001;
    background: ${type === 'error' ? '#ff4444' : type === 'warning' ? '#ff8800' : '#145bff'};
    color: white; padding: 12px 16px; border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    font-size: 14px; max-width: 300px;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/* Add CSS for notifications */
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;
document.head.appendChild(notificationStyles);

/* Performance optimizations */
// Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src || img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Preload critical resources
function preloadCriticalResources() {
  const criticalImages = [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
  preloadCriticalResources();
});

/* Play intro button */
document.getElementById('playIntro').addEventListener('click', ()=>{
  speakText(introText);
});

/* Stop speech button */
document.getElementById('stopSpeech').addEventListener('click', ()=>{
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  document.querySelectorAll('.highlight').forEach(e=> e.classList.remove('highlight'));
});

/* Guided tour: speak and highlight each section sequentially */
document.getElementById('startTour').addEventListener('click', ()=>{
  if(!('speechSynthesis' in window)){
    alert('Guided tour requires a browser with speech synthesis support.');
    return;
  }
  document.getElementById('startTour').disabled = true;
  runTourSteps(0);
});

function runTourSteps(index){
  if(index >= tourSteps.length){
    document.getElementById('startTour').disabled = false;
    document.querySelectorAll('.highlight').forEach(e=> e.classList.remove('highlight'));
    return;
  }
  const step = tourSteps[index];
  const el = document.getElementById(step.id);
  if(!el){ runTourSteps(index+1); return; }
  el.scrollIntoView({behavior:'smooth', block:'center'});
  setTimeout(()=>{
    el.classList.add('highlight');
    speakText(step.text, ()=>{
      setTimeout(()=> {
        el.classList.remove('highlight');
        runTourSteps(index+1);
      }, 350);
    });
  }, 420);
}

/* ---------------- Timeline expand/collapse (only one open) ---------------- */
function closeAllTimeline(){
  document.querySelectorAll('.timeline-content').forEach(c=>{
    c.classList.remove('open'); c.style.maxHeight = null;
  });
}
document.querySelectorAll('.timeline-item').forEach(item=>{
  item.addEventListener('click', (e)=>{
    if(e.target.tagName.toLowerCase() === 'a') return;
    const content = item.querySelector('.timeline-content');
    const isOpen = content.classList.contains('open');
    closeAllTimeline();
    if(!isOpen){
      content.classList.add('open');
      content.style.maxHeight = content.scrollHeight + "px";
      setTimeout(()=> item.scrollIntoView({behavior:'smooth', block:'center'}), 120);
    }
  });
});

/* Auto-open current PST manager role on load */
window.addEventListener('load', ()=>{
  const pst = document.getElementById('item-pst-manager');
  if(pst){
    const content = pst.querySelector('.timeline-content');
    content.classList.add('open');
    content.style.maxHeight = content.scrollHeight + "px";
    setTimeout(()=> pst.scrollIntoView({behavior:'smooth', block:'center'}), 250);
  }
});

/* Countries/Languages tooltips (click to toggle; click outside closes) */
document.querySelectorAll('ul.flags li').forEach(item=>{
  item.addEventListener('click', (ev)=>{
    ev.stopPropagation();
    const t = item.querySelector('.tooltip');
    const was = t && t.style.display === 'block';
    document.querySelectorAll('.tooltip').forEach(x=>x.style.display='none');
    if(t && !was) t.style.display = 'block';
  });
});
document.addEventListener('click', ()=> document.querySelectorAll('.tooltip').forEach(t=>t.style.display='none'));

/* Download Resume - opens printable page and includes hobbies */
document.getElementById('downloadResume').addEventListener('click', ()=>{
  const name = document.querySelector('h1').textContent;
  const role = document.querySelector('.role').textContent;
  const shortBio = document.getElementById('bio-text').outerHTML;
  const items = Array.from(document.querySelectorAll('.timeline-item')).map(it=>{
    const title = it.querySelector('h4').textContent;
    const meta = it.querySelector('span').textContent;
    const content = it.querySelector('.timeline-content').innerHTML;
    return `<div style="margin-bottom:12px">
              <h3 style="margin:0;font-size:16px">${title}</h3>
              <div style="color:#555;margin:4px 0 8px">${meta}</div>
              <div style="color:#222">${content}</div>
            </div>`;
  }).join('\n');
  const countries = Array.from(document.querySelectorAll('#section-countries ul.flags li')).map(li=>li.textContent.trim());
  const langs = Array.from(document.querySelectorAll('#section-langs ul.flags li')).map(li=>li.textContent.trim());
  const hobbies = Array.from(document.querySelectorAll('#section-hobbies .hobby-card')).map(h=>{
    return h.querySelector('strong').textContent + ' — ' + h.querySelector('p').textContent;
  });

  const docHtml = `<!doctype html><html><head><meta charset="utf-8"><title>${name} — Resume</title>
    <style>body{font-family:Arial,Helvetica,sans-serif;padding:24px;color:#111}h1{margin:0;font-size:24px}h2{margin-top:18px;font-size:18px;color:#145bff}h3{margin:8px 0;font-size:15px}p{margin:6px 0;color:#333}ul{margin:6px 0 12px 18px}.section{margin-top:14px}.meta{color:#666;font-size:13px}</style>
    </head><body>
    <h1>${name}</h1><div class="meta">${role}</div>
    <div class="section"><h2>Summary</h2>${shortBio}</div>
    <div class="section"><h2>Work Experience</h2>${items}</div>
    <div class="section"><h2>Countries</h2><div>${countries.join(' · ')}</div></div>
    <div class="section"><h2>Languages</h2><div>${langs.join(' · ')}</div></div>
    <div class="section"><h2>Hobbies & Interests</h2><ul>${hobbies.map(h=>`<li>${h}</li>`).join('')}</ul></div>
    <div style="margin-top:18px;color:#666;font-size:13px">Generated from interactive resume — ${new Date().toLocaleDateString()}</div>
    </body></html>`;
  const w = window.open('', '_blank', 'toolbar=0,location=0,menubar=0');
  if(!w){ alert('Popup blocked. Allow popups or use Print (Ctrl/Cmd+P).'); return; }
  w.document.open(); w.document.write(docHtml); w.document.close(); w.focus();
  setTimeout(()=> { w.print(); }, 500);
});

/* ---------------- Alternative Popup Modes ---------------- */
let currentMode = 'compact'; // Default mode

  // Country data with background images (optimized for performance)
  const countryData = {
    tanzania: {
      flag: 'tz',
      name: 'Tanzania',
      cities: 'Dar es Salaam, Zanzibar, Arusha',
      places: 'Serengeti, Ngorongoro, Stone Town',
      food: 'Ugali, Nyama choma, Zanzibar biryani, Mandazi',
      background: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75'
    },
    uae: {
      flag: 'ae',
      name: 'United Arab Emirates',
      cities: 'Dubai, Abu Dhabi, Sharjah',
      places: 'Burj Khalifa, Sheikh Zayed Mosque, Palm Jumeirah',
      food: 'Shawarma, Falafel, Luqaimat, Karak chai',
      background: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75'
    },
    india: {
      flag: 'in',
      name: 'India',
      cities: 'Mumbai, Delhi, Pune, Indore, Ahmedabad',
      places: 'Taj Mahal, Gateway of India, Red Fort',
      food: 'Thali, Biryani, Vada pav, Chole bhature',
      background: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75'
    },
    uk: {
      flag: 'gb',
      name: 'United Kingdom',
      cities: 'London, Manchester, Birmingham',
      places: 'Big Ben, Tower Bridge, Hyde Park',
      food: 'Fish & chips, Sunday roast, Afternoon tea, Bangers & mash',
      background: 'https://images.unsplash.com/photo-1513635269975-59663e0ae1c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75'
    },
    kenya: {
      flag: 'ke',
      name: 'Kenya',
      cities: 'Nairobi, Mombasa, Kisumu',
      places: 'Maasai Mara, Mount Kenya, Diani Beach',
      food: 'Nyama choma, Ugali, Sukuma wiki, Mandazi',
      background: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75'
    },
    oman: {
      flag: 'om',
      name: 'Oman',
      cities: 'Muscat, Salalah, Nizwa',
      places: 'Sultan Qaboos Mosque, Muttrah Souq, Wahiba Sands',
      food: 'Shuwa, Majboos, Halwa, Kahwa',
      background: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75'
    },
    egypt: {
      flag: 'eg',
      name: 'Egypt',
      cities: 'Cairo, Alexandria, Luxor',
      places: 'Pyramids of Giza, Sphinx, Valley of the Kings',
      food: 'Koshari, Ful medames, Shawarma, Baklava',
      background: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75'
    },
    qatar: {
      flag: 'qa',
      name: 'Qatar',
      cities: 'Doha, Al Khor, Al Wakrah',
      places: 'Museum of Islamic Art, Souq Waqif, Katara Cultural Village',
      food: 'Machboos, Luqaimat, Karak, Thareed',
      background: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75'
    }
};

// Modal mode only - no mode switching needed

// Country click handlers - modal only
document.querySelectorAll('#section-countries ul.flags li').forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const countryId = item.dataset.country;
    const data = countryData[countryId];
    showModal(data);
  });
});

// Languages don't need click handlers - they use hover subtitles only

function showModal(data) {
  try {
    // Update modal flag with flag-icons
    const modalFlag = document.getElementById('modalFlag');
    modalFlag.className = `flag-large fi fi-${data.flag}`;
    
    document.getElementById('modalTitle').textContent = data.name;
    
    // Set background image with loading state
    const modalHeader = document.querySelector('.modal-header');
    modalHeader.style.setProperty('--modal-bg', `url('${data.background}')`);
    
    // Show loading state
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-section">
        <h4>Loading...</h4>
        <p>Please wait while we load the information.</p>
      </div>
    `;
    
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.add('show');
    modalOverlay.setAttribute('aria-hidden', 'false');
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      document.getElementById('modalBody').innerHTML = `
        <div class="modal-section">
          <h4>Cities Visited</h4>
          <p>${data.cities}</p>
        </div>
        <div class="modal-section">
          <h4>Famous Places</h4>
          <p>${data.places}</p>
        </div>
        <div class="modal-section">
          <h4>Food to Try</h4>
          <p>${data.food}</p>
        </div>
      `;
      
      // Focus management for accessibility
      const closeButton = document.getElementById('modalClose');
      closeButton.focus();
    }, 300);
    
  } catch (error) {
    console.error('Error showing modal:', error);
    showNotification('Failed to load country details. Please try again.', 'error');
  }
}

// Enhanced close handlers with keyboard support
function closeModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.classList.remove('show');
  modalOverlay.setAttribute('aria-hidden', 'true');
  
  // Return focus to the element that opened the modal
  const activeElement = document.activeElement;
  if (activeElement && activeElement.dataset.country) {
    activeElement.focus();
  }
}

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay.classList.contains('show')) {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Tab') {
      // Trap focus within modal
      const focusableElements = modalOverlay.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
});

// Add keyboard support for country flags
document.querySelectorAll('#section-countries ul.flags li').forEach(item => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

// Add keyboard support for timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

</script>