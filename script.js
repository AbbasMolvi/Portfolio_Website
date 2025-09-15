/* -------- Spoken 20-30s intro (approx 25s at natural pace) -------- */
const introText = `Hi, I’m Abbas Molvy. I’m an Interim Regulations Manager at PST dot AG, with three and a half years of experience turning legal updates into accurate tariff data. I enjoy the intersection of international trade and automation — building ETL pipelines and Python tools that feed enterprise systems. I also study finance, human psychology and enjoy exploring food and places around the world.`;

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
  
  // Check if speech synthesis is available and ready
  if(window.speechSynthesis.speaking){
    console.log('Speech synthesis is already speaking, stopping current speech');
    window.speechSynthesis.cancel();
  }
  
  // Reset cancelled flag
  window.speechCancelled = false;
  
  try {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.85; // Slightly slower for better clarity and consistency
    utter.pitch = 0.95; // Slightly lower pitch for more masculine tone
    utter.volume = 0.8;
    
    // Wait for voices to load if they're not ready yet
    const speakWithVoice = () => {
    const voices = window.speechSynthesis.getVoices();
      if(voices && voices.length > 0){
        // Try to find a natural male voice with priority order
        let selectedVoice = 
          // First try: Male voices with specific names (most natural)
          voices.find(x => /en-US/i.test(x.lang) && (
            /david|daniel|alex|mark|mike|john|paul|steve|tom|brian|chris|matt|james|robert|william|michael|richard|charles|thomas|christopher|anthony|mark|donald|steven|paul|andrew|joshua|kenneth|kevin|brian|george|timothy|jason|jeffrey|ryan|jacob|gary|nicholas|eric|jonathan|stephen|larry|justin|scott|brandon|benjamin|samuel|gregory|frank|raymond|alexander|patrick|jack|dennis|jerry|tyler|aaron|jose|henry|douglas|adam|peter|nathan|zachary|kyle|walter|harold|jeremy|ethan|carl|keith|roger|gerald|arthur|ryan|juan|wayne|roy|ralph|eugene|louis|philip|bobby|johnny|billy|jordan|albert|alan|jesse|willie|gabriel|logan|wayne|ralph|eugene|louis|philip|bobby|johnny|billy|jordan|albert|alan|jesse|willie|gabriel|logan/i.test(x.name)
          )) ||
          // Second try: Male voices by gender (if available)
          voices.find(x => /en-US/i.test(x.lang) && x.name.toLowerCase().includes('male')) ||
          // Third try: Common male voice names
          voices.find(x => /en-US/i.test(x.lang) && (
            /microsoft.*david|google.*male|samantha|alex|daniel|mark|mike|john|paul|steve|tom|brian|chris|matt|james|robert|william|michael|richard|charles|thomas|christopher|anthony|mark|donald|steven|paul|andrew|joshua|kenneth|kevin|brian|george|timothy|jason|jeffrey|ryan|jacob|gary|nicholas|eric|jonathan|stephen|larry|justin|scott|brandon|benjamin|samuel|gregory|frank|raymond|alexander|patrick|jack|dennis|jerry|tyler|aaron|jose|henry|douglas|adam|peter|nathan|zachary|kyle|walter|harold|jeremy|ethan|carl|keith|roger|gerald|arthur|ryan|juan|wayne|roy|ralph|eugene|louis|philip|bobby|johnny|billy|jordan|albert|alan|jesse|willie|gabriel|logan/i.test(x.name)
          )) ||
          // Fourth try: Any English male voice
          voices.find(x => /en/i.test(x.lang) && (
            /david|daniel|alex|mark|mike|john|paul|steve|tom|brian|chris|matt|james|robert|william|michael|richard|charles|thomas|christopher|anthony|mark|donald|steven|paul|andrew|joshua|kenneth|kevin|brian|george|timothy|jason|jeffrey|ryan|jacob|gary|nicholas|eric|jonathan|stephen|larry|justin|scott|brandon|benjamin|samuel|gregory|frank|raymond|alexander|patrick|jack|dennis|jerry|tyler|aaron|jose|henry|douglas|adam|peter|nathan|zachary|kyle|walter|harold|jeremy|ethan|carl|keith|roger|gerald|arthur|ryan|juan|wayne|roy|ralph|eugene|louis|philip|bobby|johnny|billy|jordan|albert|alan|jesse|willie|gabriel|logan/i.test(x.name)
          )) ||
          // Fifth try: Any English voice
          voices.find(x => /en-US/i.test(x.lang)) || 
          voices.find(x => /en-GB/i.test(x.lang)) || 
          voices.find(x => /en/i.test(x.lang)) || 
          // Fallback: First available voice
          voices[0];
        
        if(selectedVoice) {
          utter.voice = selectedVoice;
          console.log('Using voice:', selectedVoice.name, selectedVoice.lang, 'Gender:', selectedVoice.name.toLowerCase().includes('male') ? 'Male' : 'Unknown');
        }
      }
      
      utter.onstart = () => {
        console.log('Speech synthesis started');
        showNotification('Playing audio...', 'info');
      };
      
      utter.onend = () => { 
        console.log('Speech synthesis ended');
        if(!window.speechCancelled && onend) onend(); 
    };
    
    utter.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      if(window.speechCancelled) {
        // Suppress error notifications if user intentionally stopped speech
        return;
      }
        let errorMessage = 'Speech synthesis failed. ';
        switch(event.error) {
          case 'not-allowed':
            errorMessage += 'Please allow audio permissions and try again.';
            break;
          case 'audio-busy':
            errorMessage += 'Audio is busy. Please wait and try again.';
            break;
          case 'audio-hardware':
            errorMessage += 'Audio hardware error. Please check your speakers.';
            break;
          case 'network':
            errorMessage += 'Network error. Please check your connection.';
            break;
          case 'synthesis-unavailable':
            errorMessage += 'Speech synthesis is not available.';
            break;
          case 'synthesis-failed':
            errorMessage += 'Speech synthesis failed. Please try again.';
            break;
          case 'language-unavailable':
            errorMessage += 'Language not supported.';
            break;
          case 'voice-unavailable':
            errorMessage += 'Voice not available.';
            break;
          case 'text-too-long':
            errorMessage += 'Text is too long to synthesize.';
            break;
          case 'invalid-argument':
            errorMessage += 'Invalid argument.';
            break;
          default:
            errorMessage += 'Unknown error. Please try again.';
        }
        showNotification(errorMessage, 'error');
        if(!window.speechCancelled && onend) onend();
    };
    
    window.speechSynthesis.speak(utter);
    };
    
    // If voices are not loaded yet, wait for them
    if(window.speechSynthesis.getVoices().length === 0) {
      console.log('Voices not loaded yet, waiting...');
      window.speechSynthesis.addEventListener('voiceschanged', speakWithVoice, { once: true });
      // Fallback timeout
      setTimeout(speakWithVoice, 1000);
    } else {
      speakWithVoice();
    }
    
  } catch (error) {
    console.error('Error in speech synthesis:', error);
    showNotification('Speech synthesis error: ' + error.message, 'error');
    if(onend) onend();
  }
}

/* Enhanced notification system with loading states */
function showNotification(message, type = 'info', duration = 3000) {
  // Remove existing notifications of the same type
  const existing = document.querySelectorAll(`.notification-${type}`);
  existing.forEach(n => n.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  // Add loading spinner for loading type
  if (type === 'loading') {
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <div class="spinner"></div>
        <span>${message}</span>
      </div>
    `;
  } else {
  notification.textContent = message;
  }
  
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10001;
    background: ${type === 'error' ? '#ff4444' : type === 'warning' ? '#ff8800' : type === 'success' ? '#00aa44' : type === 'loading' ? '#145bff' : '#145bff'};
    color: white; padding: 12px 16px; border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    font-size: 14px; max-width: 300px;
    animation: slideIn 0.3s ease;
    cursor: ${type === 'loading' ? 'default' : 'pointer'};
  `;
  
  // Make notifications clickable to dismiss (except loading)
  if (type !== 'loading') {
    notification.addEventListener('click', () => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    });
  }
  
  document.body.appendChild(notification);
  
  // Auto-remove after duration (except loading)
  if (type !== 'loading') {
  setTimeout(() => {
      if (notification.parentNode) {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
      }
    }, duration);
  }
  
  return notification;
}

/* Loading state management */
function showLoadingState(elementId, message = 'Loading...') {
  const element = document.getElementById(elementId);
  if (!element) return null;
  
  const originalContent = element.innerHTML;
  element.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; padding: 20px; gap: 8px;">
      <div class="spinner"></div>
      <span>${message}</span>
    </div>
  `;
  
  return () => {
    element.innerHTML = originalContent;
  };
}

/* Sidebar Navigation Functions */
function initializeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  
  // Desktop sidebar toggle
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
  }
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('show');
      mobileMenuBtn.style.display = sidebar.classList.contains('open') ? 'none' : 'block';
    });
  }
  
  // Close sidebar when clicking overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('show');
      mobileMenuBtn.style.display = 'block';
    });
  }
  
  // Restore sidebar state
  const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  if (isCollapsed) {
    sidebar.classList.add('collapsed');
  }
  
  // Show/hide mobile menu button based on screen size
  function handleResize() {
    if (window.innerWidth <= 1024) {
      mobileMenuBtn.style.display = 'block';
      sidebar.classList.remove('collapsed');
    } else {
      mobileMenuBtn.style.display = 'none';
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('show');
    }
  }
  
  window.addEventListener('resize', handleResize);
  handleResize(); // Initial check
}

/* Page Navigation Functions */
function initializePageNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const mainCard = document.getElementById('mainCard');
  
  // Create page sections
  createPageSections();
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Show the selected page
      showPage(page);
      
      // Close mobile menu if open
      const sidebar = document.getElementById('sidebar');
      const sidebarOverlay = document.getElementById('sidebarOverlay');
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      
      if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
        mobileMenuBtn.style.display = 'block';
      }
    });
  });
}

function createPageSections() {
  const mainCard = document.getElementById('mainCard');
  const currentContent = mainCard.innerHTML;
  
  // Create page container
  const pageContainer = document.createElement('div');
  pageContainer.className = 'page-container';
  pageContainer.innerHTML = `
    <div class="page active" id="page-summary">
      ${currentContent}
    </div>
    <div class="page" id="page-experience">
      <div class="page-header">
        <h1>💼 Work Experience</h1>
        <p>My professional journey across different roles and companies</p>
      </div>
      <div id="section-timeline"></div>
    </div>
    <div class="page" id="page-travel">
      <div class="page-header">
        <h1>🌍 Travel & Countries</h1>
        <p>Countries I've experienced and places I've visited</p>
      </div>
      <div id="section-countries"></div>
    </div>
    <div class="page" id="page-languages">
      <div class="page-header">
        <h1>🗣️ Languages</h1>
        <p>Languages I understand and speak</p>
      </div>
      <div id="section-langs"></div>
    </div>
    <div class="page" id="page-hobbies">
      <div class="page-header">
        <h1>🎯 Hobbies & Interests</h1>
        <p>What I enjoy doing in my free time</p>
      </div>
      <div id="section-hobbies"></div>
    </div>
    <div class="page" id="page-skills">
      <div class="page-header">
        <h1>⚡ Skills & Expertise</h1>
        <p>My technical and professional capabilities</p>
      </div>
      <div id="section-skills"></div>
    </div>
  `;
  
  // Replace main card content
  mainCard.innerHTML = '';
  mainCard.appendChild(pageContainer);
  
  // Move existing sections to their respective pages
  moveSectionsToPages();
}

function moveSectionsToPages() {
  // Move timeline to experience page
  const timelineSection = document.querySelector('#section-timeline');
  if (timelineSection) {
    document.querySelector('#page-experience #section-timeline').appendChild(timelineSection);
  }
  
  // Move countries to travel page
  const countriesSection = document.querySelector('#section-countries');
  if (countriesSection) {
    document.querySelector('#page-travel #section-countries').appendChild(countriesSection);
  }
  
  // Move languages to languages page
  const languagesSection = document.querySelector('#section-langs');
  if (languagesSection) {
    document.querySelector('#page-languages #section-langs').appendChild(languagesSection);
  }
  
  // Move hobbies to hobbies page
  const hobbiesSection = document.querySelector('#section-hobbies');
  if (hobbiesSection) {
    document.querySelector('#page-hobbies #section-hobbies').appendChild(hobbiesSection);
  }
  
  // Move skills to skills page
  const skillsSection = document.querySelector('#section-skills');
  if (skillsSection) {
    document.querySelector('#page-skills #section-skills').appendChild(skillsSection);
  }
}

/* Search Functionality */
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  if (!searchInput || !searchBtn) return;
  
  // Search on input
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length > 0) {
      performSearch(query);
    } else {
      clearSearch();
    }
  });
  
  // Search on button click
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length > 0) {
      performSearch(query);
    }
  });
  
  // Search on Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.toLowerCase().trim();
      if (query.length > 0) {
        performSearch(query);
      }
    }
  });
}

function performSearch(query) {
  const pages = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.nav-item');
  let foundResults = false;
  
  // Clear previous highlights
  clearSearch();
  
  pages.forEach(page => {
    const content = page.textContent.toLowerCase();
    if (content.includes(query)) {
      foundResults = true;
      
      // Highlight matching text
      highlightText(page, query);
      
      // Show the page if it contains results
      if (!page.classList.contains('active')) {
        const pageId = page.id.replace('page-', '');
        const navItem = document.querySelector(`[data-page="${pageId}"]`);
        if (navItem) {
          navItems.forEach(nav => nav.classList.remove('active'));
          navItem.classList.add('active');
          showPage(pageId);
        }
      }
    }
  });
  
  if (foundResults) {
    showNotification(`Found results for "${query}"`, 'success', 2000);
  } else {
    showNotification(`No results found for "${query}"`, 'warning', 2000);
  }
}

function highlightText(element, query) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  const textNodes = [];
  let node;
  
  while (node = walker.nextNode()) {
    if (node.textContent.toLowerCase().includes(query)) {
      textNodes.push(node);
    }
  }
  
  textNodes.forEach(textNode => {
    const parent = textNode.parentNode;
    const text = textNode.textContent;
    const regex = new RegExp(`(${query})`, 'gi');
    const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
    
    if (highlightedText !== text) {
      const wrapper = document.createElement('span');
      wrapper.innerHTML = highlightedText;
      parent.replaceChild(wrapper, textNode);
    }
  });
}

function clearSearch() {
  const highlights = document.querySelectorAll('.search-highlight');
  highlights.forEach(highlight => {
    const parent = highlight.parentNode;
    parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
    parent.normalize();
  });
}

function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  const targetPage = document.getElementById(`page-${pageId}`);
  
  // Hide all pages
  pages.forEach(page => {
    page.classList.remove('active');
    page.style.display = 'none';
  });
  
  // Show target page
  if (targetPage) {
    targetPage.classList.add('active');
    targetPage.style.display = 'block';
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show notification
    const pageNames = {
      'summary': 'Summary',
      'experience': 'Work Experience',
      'travel': 'Travel & Countries',
      'languages': 'Languages',
      'hobbies': 'Hobbies & Interests',
      'skills': 'Skills & Expertise'
    };
    
    showNotification(`Switched to ${pageNames[pageId]} page`, 'info', 2000);
  }
}

/* Add CSS for notifications and loading states */
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
  
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  .btn:disabled:hover {
    transform: none !important;
    box-shadow: 0 8px 24px rgba(20,91,255,0.14) !important;
  }
  
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }
  
  .loading-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }
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

// Test speech synthesis availability
function testSpeechSynthesis() {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return false;
  }
  
  try {
    const testUtter = new SpeechSynthesisUtterance('Test');
    testUtter.volume = 0;
    testUtter.rate = 10;
    window.speechSynthesis.speak(testUtter);
    console.log('Speech synthesis test successful');
    return true;
  } catch (error) {
    console.error('Speech synthesis test failed:', error);
    return false;
  }
}

// Function to log available voices for debugging
function logAvailableVoices() {
  const voices = window.speechSynthesis.getVoices();
  console.log('Available voices:');
  voices.forEach((voice, index) => {
    console.log(`${index + 1}. ${voice.name} (${voice.lang}) - ${voice.gender || 'Unknown gender'}`);
  });
  
  // Log specifically male voices
  const maleVoices = voices.filter(voice => 
    voice.name.toLowerCase().includes('male') || 
    /david|daniel|alex|mark|mike|john|paul|steve|tom|brian|chris|matt|james|robert|william|michael|richard|charles|thomas|christopher|anthony|mark|donald|steven|paul|andrew|joshua|kenneth|kevin|brian|george|timothy|jason|jeffrey|ryan|jacob|gary|nicholas|eric|jonathan|stephen|larry|justin|scott|brandon|benjamin|samuel|gregory|frank|raymond|alexander|patrick|jack|dennis|jerry|tyler|aaron|jose|henry|douglas|adam|peter|nathan|zachary|kyle|walter|harold|jeremy|ethan|carl|keith|roger|gerald|arthur|ryan|juan|wayne|roy|ralph|eugene|louis|philip|bobby|johnny|billy|jordan|albert|alan|jesse|willie|gabriel|logan/i.test(voice.name)
  );
  
  console.log('Male voices found:', maleVoices.length);
  maleVoices.forEach(voice => {
    console.log(`- ${voice.name} (${voice.lang})`);
  });
}

// Initialize performance optimizations and event listeners
document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
  preloadCriticalResources();
  
  // Test speech synthesis on page load
  const speechSupported = testSpeechSynthesis();
  if (!speechSupported) {
    console.warn('Speech synthesis may not be available');
  }
  
  // Log available voices for debugging (with delay to ensure voices are loaded)
  setTimeout(() => {
    logAvailableVoices();
  }, 2000);
  
  // Initialize sidebar navigation
  initializeSidebar();
  initializePageNavigation();
  initializeSearch();

/* Play intro button */
document.getElementById('playIntro').addEventListener('click', ()=>{
    const button = document.getElementById('playIntro');
    const originalText = button.textContent;
    
    // Clear any existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Show loading state
    button.disabled = true;
    button.textContent = 'Loading...';
    showNotification('Preparing audio...', 'loading');
    
    // Check if this is the first user interaction
    if(!window.userInteracted) {
      window.userInteracted = true;
      console.log('First user interaction detected, enabling speech synthesis');
    }
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      speakText(introText, () => {
        // Reset button when speech ends
        button.disabled = false;
        button.textContent = originalText;
        showNotification('Audio playback completed', 'success', 2000);
      });
    }, 500);
});

/* Stop speech button */
document.getElementById('stopSpeech').addEventListener('click', ()=>{
  if('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    console.log('Speech synthesis stopped');
    
    // Set cancelled flag for current speech
    window.speechCancelled = true;
  }
  
  // Clear all highlights
  document.querySelectorAll('.highlight').forEach(e=> e.classList.remove('highlight'));
  
  // Clear all notifications
  document.querySelectorAll('.notification').forEach(n => n.remove());
  
  // Reset tour state
  window.tourInProgress = false;
  
  // Reset UI states for buttons
  const playIntroBtn = document.getElementById('playIntro');
  if (playIntroBtn) { playIntroBtn.disabled = false; playIntroBtn.textContent = 'Play 25s Intro ▶'; }
  const startTourBtn = document.getElementById('startTour');
  if (startTourBtn) { startTourBtn.disabled = false; startTourBtn.textContent = 'Start Guided Tour'; }

  showNotification('Speech stopped', 'info', 2000);
});

/* Guided tour: speak and highlight each section sequentially */
document.getElementById('startTour').addEventListener('click', ()=>{
    const button = document.getElementById('startTour');
    const originalText = button.textContent;
    
  if(!('speechSynthesis' in window)){
      showNotification('Guided tour requires a browser with speech synthesis support.', 'warning');
    return;
  }
    
    // Check if user has interacted with the page
    if(!window.userInteracted) {
      showNotification('Please click "Play 25s Intro" first to enable audio features.', 'info');
    return;
  }
    
    // Clear any existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Set tour state
    window.tourInProgress = true;
    
    // Show loading state
    button.disabled = true;
    button.textContent = 'Starting Tour...';
    showNotification('Starting guided tour...', 'loading');
    
    // Small delay for better UX
    setTimeout(() => {
      runTourSteps(0, () => {
        // Reset button when tour ends
        button.disabled = false;
        button.textContent = originalText;
        window.tourInProgress = false;
        showNotification('Guided tour completed!', 'success', 3000);
      });
    }, 800);
  });

  /* Timeline expand/collapse (only one open) */
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

  /* Country click handlers - modal only */
  document.querySelectorAll('#section-countries ul.flags li').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const countryId = item.dataset.country;
      const data = countryData[countryId];
      
      // Show loading state on the clicked item
      const originalContent = item.innerHTML;
      item.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <div class="spinner" style="width: 12px; height: 12px;"></div>
          <span>Loading...</span>
        </div>
      `;
      item.style.pointerEvents = 'none';
      
      showModal(data, () => {
        // Reset item when modal opens
        item.innerHTML = originalContent;
        item.style.pointerEvents = 'auto';
      });
    });
  });

/* Download Resume - opens printable page and includes hobbies */
document.getElementById('downloadResume').addEventListener('click', ()=>{
    const button = document.getElementById('downloadResume');
    const originalText = button.textContent;
    
    // Show loading state
    button.disabled = true;
    button.textContent = 'Generating PDF...';
    showNotification('Generating resume PDF...', 'loading');
    
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
    // Simulate processing delay for better UX
    setTimeout(() => {
      try {
  const w = window.open('', '_blank', 'toolbar=0,location=0,menubar=0');
        if(!w){ 
          showNotification('Popup blocked. Allow popups or use Print (Ctrl/Cmd+P).', 'warning');
          button.disabled = false;
          button.textContent = originalText;
          return; 
        }
        w.document.open(); 
        w.document.write(docHtml); 
        w.document.close(); 
        w.focus();
        
        // Reset button
        button.disabled = false;
        button.textContent = originalText;
        showNotification('Resume PDF generated successfully!', 'success', 3000);
        
        setTimeout(() => { w.print(); }, 500);
      } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('Failed to generate PDF. Please try again.', 'error');
        button.disabled = false;
        button.textContent = originalText;
      }
    }, 1000);
  });

  /* Modal close handlers */
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  });

  /* Add keyboard support for country flags */
  document.querySelectorAll('#section-countries ul.flags li').forEach(item => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  /* Add keyboard support for timeline items */
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  /* Auto-open current PST manager role on load */
  const pst = document.getElementById('item-pst-manager');
  if(pst){
    const content = pst.querySelector('.timeline-content');
    content.classList.add('open');
    content.style.maxHeight = content.scrollHeight + "px";
    setTimeout(()=> pst.scrollIntoView({behavior:'smooth', block:'center'}), 250);
  }
});

function runTourSteps(index, onComplete){
  // Check if tour was stopped
  if(window.tourInProgress === false) {
    console.log('Tour stopped by user');
    document.querySelectorAll('.highlight').forEach(e=> e.classList.remove('highlight'));
    return;
  }
  
  if(index >= tourSteps.length){
    document.querySelectorAll('.highlight').forEach(e=> e.classList.remove('highlight'));
    window.tourInProgress = false;
    if(onComplete) onComplete();
    return;
  }
  const step = tourSteps[index];
  const el = document.getElementById(step.id);
  if(!el){ 
    runTourSteps(index+1, onComplete); 
    return; 
  }
  
  // Show progress notification
  showNotification(`Tour Step ${index + 1} of ${tourSteps.length}: ${step.title}`, 'info', 2000);
  
  el.scrollIntoView({behavior:'smooth', block:'center'});
  setTimeout(()=>{
    // Check again if tour was stopped during timeout
    if(window.tourInProgress === false) {
      console.log('Tour stopped during timeout');
      return;
    }
    
    el.classList.add('highlight');
    speakText(step.text, ()=>{
      // Check if tour was stopped during speech
      if(window.tourInProgress === false) {
        console.log('Tour stopped during speech');
        el.classList.remove('highlight');
        return;
      }
      
      setTimeout(()=> {
        el.classList.remove('highlight');
        runTourSteps(index+1, onComplete);
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


// Add click outside to close tooltips
document.addEventListener('click', ()=> document.querySelectorAll('.tooltip').forEach(t=>t.style.display='none'));

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

function showModal(data, onOpen) {
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
    
    // Call onOpen callback if provided
    if(onOpen) onOpen();
    
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
      
      // Show success notification
      showNotification(`Loaded details for ${data.name}`, 'success', 2000);
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
