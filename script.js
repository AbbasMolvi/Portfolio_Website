/* -------- Spoken 20-30s intro (approx 25s at natural pace) -------- */
const introText = `Hi, I’m Abbas Molvy. I’m an Interim Regulations Manager at PST dot AG, where I turn legal updates into accurate tariff data. I enjoy the intersection of international trade and automation — building ETL pipelines and Python tools that feed enterprise systems. I also study finance, human psychology and enjoy exploring food and places around the world.`;

/* ------- Tour segments: each speaks and highlights a section ------- */
const tourSteps = [
  { id: 'question-2', title: 'My Global Journey & Travel Experiences', text:
      'I am originally from India but have lived across eight countries and thirty seven cities spanning three continents. Each place has shaped my worldview - from Tanzania teaching me about resilience and community, to the UAE showing me modern trade dynamics, to the UK developing my professional skills. My top travel recommendation is to start with local markets and food streets where you truly understand a culture.'
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
    <div class="page" id="page-skills">
      <div class="page-header">
        <h1>⚡ Skills & Expertise</h1>
        <p>My technical and professional capabilities</p>
      </div>
      <div id="section-skills"></div>
    </div>
    <div class="page" id="page-education">
      <div class="page-header">
        <h1>🎓 Education</h1>
        <p>Degrees, certifications and academic highlights</p>
      </div>
      <div id="section-education"></div>
    </div>
    <div class="page" id="page-languages">
      <div class="page-header">
        <h1>🗣️ Languages</h1>
        <p>Languages I understand and speak</p>
      </div>
      <div id="section-langs"></div>
    </div>
    <div class="page" id="page-travel">
      <div class="page-header">
        <h1>🌍 Travel & Countries</h1>
        <p>Countries I've experienced and places I've visited</p>
      </div>
      <div id="section-countries"></div>
    </div>
    <div class="page" id="page-hobbies">
      <div class="page-header">
        <h1>🎯 Hobbies & Interests</h1>
        <p>What I enjoy doing in my free time</p>
      </div>
      <div id="section-hobbies"></div>
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
  
  // Move Question 2 (Country details) content into Countries section without banner
  const q2 = document.querySelector('#question-2 .answer-content');
  if (q2) {
    const countriesLabel = document.querySelector('#page-travel #section-countries');
    if (countriesLabel) {
      const wrap = document.createElement('div');
      wrap.className = 'travel-intro-wrap';
      wrap.appendChild(q2);
      countriesLabel.prepend(wrap);
    }
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

  // Move education to education page
  const educationSection = document.querySelector('#section-education');
  if (educationSection) {
    document.querySelector('#page-education #section-education').appendChild(educationSection);
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

/* Chat Assistant Logic */
function initializeChatAssistant(){
  const toggle = document.getElementById('chatToggle');
  const widget = document.getElementById('chatWidget');
  const closeBtn = document.getElementById('chatClose');
  const body = document.getElementById('chatBody');
  const suggestions = document.getElementById('chatSuggestions');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatMessage');
  if(!toggle || !widget || !body || !form || !input) return;

  // Restore history for session only
  const history = [];
  history.forEach(msg=> appendMsg(msg.text, msg.role));

  toggle.addEventListener('click', ()=>{
    widget.classList.toggle('open');
    widget.setAttribute('aria-hidden', widget.classList.contains('open') ? 'false' : 'true');
    if(widget.classList.contains('open')) input.focus();
  });
  closeBtn && closeBtn.addEventListener('click', ()=>{
    widget.classList.remove('open');
    widget.setAttribute('aria-hidden','true');
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const text = input.value.trim();
    if(!text) return;
    appendMsg(text, 'user');
    input.value='';
    handleChat(text);
    saveHistory();
  });

  // Do not auto-open assistant on load
  widget.classList.remove('open');
  widget.setAttribute('aria-hidden','true');
  // Prepare suggestions (will be visible after open)
  renderSuggestions(['Download resume','Show experience','Start guided tour','Open LinkedIn','Open Upwork','Contact details']);

  function renderSuggestions(list){
    if(!suggestions) return;
    suggestions.innerHTML = '';
    suggestions.setAttribute('aria-hidden','false');
    list.forEach(text=>{
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chat-suggestion';
      chip.textContent = text;
      chip.addEventListener('click', ()=> handleChat(text));
      suggestions.appendChild(chip);
    });
  }

  async function handleChat(text){
    // Attempt AI hook if configured; else fallback
    const aiReply = await getAIReply(text).catch(()=> null);
    const reply = aiReply || generateReply(text);
    appendMsg(reply, 'bot');
    saveHistory();
  }

  async function getAIReply(text){
    // Support Ollama (local) by default if available
    const ollama = window.LLM_OLLAMA_ENDPOINT || 'http://localhost:11434/api/generate';
    const model = window.LLM_OLLAMA_MODEL || 'llama3.1:8b';
    try{
      const res = await fetch(ollama, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({model, prompt: text, stream:false}) });
      if(res.ok){
        const data = await res.json();
        if(data && data.response) return data.response.trim();
      }
    }catch(e){ /* ignore and fallback */ }
    // OpenAI-compatible endpoint fallback
    const endpoint = window.CHAT_API_ENDPOINT;
    if(endpoint){
      const res = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({message: text})});
      if(res.ok){ const data = await res.json(); return (data.reply||'').trim(); }
    }
    throw new Error('no-endpoint');
  }

  function appendMsg(text, role){
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function saveHistory(){
    const msgs = Array.from(body.querySelectorAll('.chat-msg')).map(el=>({
      text: el.textContent,
      role: el.classList.contains('user') ? 'user' : 'bot'
    }));
    sessionStorage.setItem('chatHistory', JSON.stringify(msgs.slice(-50)));
  }

  function generateReply(text){
    const t = text.toLowerCase();
    const answers = [];
    if(t.includes('resume')) answers.push('You can download my resume with the PDF button in the header, or use File > Print > Save as PDF for a full-page version.');
    if(t.includes('experience')||t.includes('work')) answers.push('I have 10+ years across ITeS, international trade compliance, data/ETL, Python, AI automation, SEO, recruitment and more.');
    if(t.includes('tour')||t.includes('guide')) answers.push('Use Start Guided Tour in the header; press Stop to end any time.');
    if(t.includes('voice')||t.includes('audio')) answers.push('Speech uses a natural male voice where available. Click Play Intro first to enable audio permissions.');
    if(t.includes('upwork')) answers.push('Upwork: https://www.upwork.com/freelancers/~01e048520f6cb273c4');
    if(t.includes('linkedin')) answers.push('LinkedIn: https://linkedin.com/in/abbasmolvi-6a53a6202');
    if(t.includes('contact')||t.includes('email')||t.includes('phone')) answers.push('Contact: ✉️ abbasalimolvi@gmail.com · 📞 +91 8602-8601-82');
    if(t.includes('skills')) answers.push('Key skills: Trade compliance, ETL, Python, AI automation, SEO, recruitment, CRM/PM tools.');
    if(answers.length) return answers.join(' ');
    const fallbacks = [
      'I can help with resume download, guided tour, experience, and contact details. What would you like to know?',
      'Try asking: “Start guided tour”, “Show experience”, or “Download resume”.',
      'Happy to help! Ask about my Upwork/LinkedIn, skills, or languages.'
    ];
    return fallbacks[Math.floor(Math.random()*fallbacks.length)];
  }

  // Clear chat
  const clearBtn = document.getElementById('chatClear');
  if(clearBtn){
    clearBtn.addEventListener('click', ()=>{
      body.innerHTML = '';
      sessionStorage.removeItem('chatHistory');
      appendMsg('Chat cleared. How can I assist you?', 'bot');
      renderSuggestions(['Download resume','Show experience','Start guided tour']);
      saveHistory();
    });
  }
}

/* PDF Exporter with options and html2pdf */
function initializePdfExporter(){
  const overlay = document.getElementById('pdfOptionsOverlay');
  const btnCancel = document.getElementById('pdfCancel');
  const btnGen = document.getElementById('pdfGenerate');
  if(!overlay || !btnCancel || !btnGen) return;

  btnCancel.addEventListener('click', ()=>{
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
  });

  btnGen.addEventListener('click', async ()=>{
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    showNotification('Generating PDF...', 'loading');

    const include = {
      header: document.getElementById('pdfIncludeHeader').checked,
      summary: document.getElementById('pdfIncludeSummary').checked,
      experience: document.getElementById('pdfIncludeExperience').checked,
      skills: document.getElementById('pdfIncludeSkills').checked,
      education: document.getElementById('pdfIncludeEducation').checked,
      languages: document.getElementById('pdfIncludeLanguages').checked,
      hobbies: document.getElementById('pdfIncludeHobbies').checked,
      countries: document.getElementById('pdfIncludeCountries').checked,
    };
    const layout = document.getElementById('pdfLayout').value;
    const theme = document.getElementById('pdfTheme').value;

    // (Server rendering moved below after wrapper is composed)

    // Build export document from selected sections only (ignores hidden page wrappers)
    const wrapper = document.createElement('div');
    wrapper.style.padding = '8px';
    wrapper.className = 'pdf-root';
    if(layout === 'two-col') wrapper.classList.add('pdf-two-col');
    if(theme === 'clean') wrapper.classList.add('pdf-clean');

    const sanitize = (node) => {
      if(!node) return null;
      // Remove interactive-only elements within the clone
      node.querySelectorAll('.chat-toggle,.chat-widget,.tools,.tools-vertical,.sidebar,.sidebar-overlay,.mobile-menu-btn,.sidebar-toggle,.header-graphic,.dialog-overlay,.download-resume-btn').forEach(el=> el.remove());
      // Neutralize sticky/fixed positions inside the clone
      node.querySelectorAll('*').forEach(el=>{
        const cs = window.getComputedStyle(el);
        if(cs.position === 'fixed' || cs.position === 'sticky') el.style.position = 'static';
      });
      return node;
    };

    const add = (selector, title) => {
      const src = document.querySelector(selector);
      if(!src) return;
      const block = src.cloneNode(true);
      sanitize(block);
      // Ensure visibility regardless of site page routing
      block.style.display = 'block';
      const sectionWrap = document.createElement('section');
      sectionWrap.className = 'section';
      // Try to include the corresponding page header from the same page, compact for PDF
      let headerNode = null;
      const page = src.closest('.page');
      if(page){
        const ph = page.querySelector('.page-header');
        if(ph){
          headerNode = ph.cloneNode(true);
          sanitize(headerNode);
          headerNode.classList.add('pdf-page-header');
        }
      }
      if(headerNode){
        sectionWrap.appendChild(headerNode);
      } else if(title){
        const h = document.createElement('h2');
        h.textContent = title;
        h.style.margin = '0 0 2px 0';
        h.style.color = '#145bff';
        h.style.fontSize = '18px';
        sectionWrap.appendChild(h);
      }
      sectionWrap.appendChild(block);
      wrapper.appendChild(sectionWrap);
    };

    if(include.header) add('header', null);
    if(include.summary) add('#summary-overview', '🧑\u200d💼 Summary');
    if(include.experience) add('#section-timeline', '💼 Work Experience');
    if(include.skills) {
      add('#section-skills', '🛠️ Skills');
      // Standardize grids for PDF
      wrapper.querySelectorAll('#section-skills .skills-grid').forEach(g=> g.classList.add('section-grid'));
    }
    if(include.education) add('#section-education', '🎓 Education');
    if(include.languages) add('#section-langs', '🗣️ Languages');
    if(include.hobbies) {
      // Prefer the dedicated page content for Hobbies
      if(document.querySelector('#page-hobbies #section-hobbies')){
        add('#page-hobbies #section-hobbies', '🎯 Hobbies & Interests');
      } else {
        add('#section-hobbies', '🎯 Hobbies & Interests');
      }
      wrapper.querySelectorAll('#section-hobbies .hobbies-grid').forEach(g=> g.classList.add('section-grid'));
    }
    if(include.countries) add('#section-countries', '🌍 Countries');

    // Inject PDF-specific styles for clean spacing, emojis, and typography
    const pdfStyle = document.createElement('style');
    pdfStyle.textContent = `
      .pdf-root{ width: 794px; max-width: 794px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; color:#111; background:#fff; font-size:12.5px; hyphens:auto }
      .pdf-root *, .pdf-root *::before, .pdf-root *::after{ box-sizing: border-box; hyphens:auto }
      .pdf-root h1{ margin: 0 0 4px 0; font-size: 26px; }
      .pdf-root h2{ margin: 0 0 2px; font-size: 18px; color:#145bff }
      /* Tighten site header spacing in PDF */
      .pdf-root header{ margin: 0 0 4px 0 !important; padding: 0 !important; border: 0 !important }
      .pdf-root h3{ margin: 6px 0 6px; font-size: 15px; }
      .pdf-root p{ margin: 2px 0; line-height: 1.45; }
      .pdf-root ul{ margin: 0 0 6px 16px; }
      .pdf-root .section{ margin: 0 0 6px; }
      .pdf-root .section > *:first-child{ margin-top: 0 }
      .pdf-root .section > *:last-child{ margin-bottom: 0 }
      /* Remove duplicate in-section labels and compress top spacing under headings */
      .pdf-root .section .label{ display:none !important }
      .pdf-root #summary-overview{ margin: 0 !important; padding-top: 0 !important }
      .pdf-root #section-timeline{ margin-top: 0 !important }
      .pdf-root .timeline{ margin: 0 0 6px 0 !important }
      .pdf-root .skills-grid{ margin-top: 0 !important }
      .pdf-root .hobbies-grid{ margin-top: 0 !important }
      .pdf-root #section-langs ul.flags{ margin: 2px 0 6px 0 !important }
      .pdf-root #section-countries ul.flags{ margin: 2px 0 6px 0 !important }
      /* Compact page headers included above each section */
      .pdf-root .pdf-page-header{ display:block !important; margin: 0 0 6px 0 !important; padding: 6px 8px !important; border-radius: 8px !important; border:1px solid rgba(20,91,255,0.12) !important; background: linear-gradient(135deg, rgba(20,91,255,0.04), rgba(11,111,91,0.04)) !important }
      .pdf-root .pdf-page-header h1{ font-size: 18px !important; margin: 0 0 2px 0 !important }
      .pdf-root .pdf-page-header p{ font-size: 12px !important; margin: 0 !important }
      /* Hide right header column and quotes in PDF to reduce space */
      .pdf-root .header-right{ display: none !important }
      .pdf-root .contact-quote-line{ display: none !important }
      .pdf-root .download-resume-btn{ display:none !important }
      .pdf-root .page, .pdf-root .page-container, .pdf-root .wrap, .pdf-root .content-wrapper{ padding:0 !important; margin:0 !important; max-width:100% !important }
      .pdf-root .section-grid{ display:grid; grid-template-columns: 1fr; gap: 8px; justify-items: stretch; align-items: start }
      .pdf-two-col .section-grid{ grid-template-columns: 1fr 1fr; gap: 8px }
      .pdf-root .avoid-break{ break-inside: avoid; page-break-inside: avoid; }
      /* Ensure blocks align and fit page width */
      .pdf-root *{ word-wrap: break-word; overflow-wrap: anywhere; }
      .pdf-root .skill-category,
      .pdf-root .hobby-item,
      .pdf-root .timeline-item{ width: 100% !important; box-sizing: border-box !important; margin: 0 0 6px 0 !important; box-shadow: none !important; transform: none !important; }
      .pdf-root .skill-category{ padding: 12px !important; border:1px solid rgba(0,0,0,0.08) !important; background:#fff !important; text-align:left !important }
      .pdf-root .hobby-item{ padding: 12px !important; border:1px solid rgba(0,0,0,0.08) !important; background:#fff !important; text-align:left !important }
      /* Language flags grid for neat alignment */
      .pdf-root ul.flags{ display:grid !important; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px !important; margin: 2px 0 6px 0 !important }
      .pdf-two-col ul.flags{ grid-template-columns: repeat(3, minmax(0,1fr)) }
      .pdf-root ul.flags li{ min-height: 36px !important; padding: 10px !important; box-shadow:none !important; transform:none !important; border:1px solid rgba(20,91,255,0.1) !important }
      /* Allow timeline items to break across pages without clipping */
      .pdf-root .timeline{ break-inside: auto; page-break-inside: auto; }
      .pdf-root .timeline-item{ break-inside: auto; page-break-inside: auto; display:block !important; padding:8px !important }
      .pdf-root .timeline-item .logo{ float:left; margin-right:10px; }
      .pdf-root .timeline-bullets li{ break-inside:auto; page-break-inside:auto; margin:4px 0 !important }
      .pdf-root .timeline-content{ max-height: none !important; overflow: visible !important; }
      /* Shrink oversized timeline fonts for PDF to avoid overflow */
      .pdf-root .timeline-item h4{ font-size: 15px !important; line-height: 1.3 !important }
      .pdf-root .timeline-company{ font-size: 15px !important; letter-spacing: 0 !important; text-transform: none !important }
      .pdf-root .timeline-role{ font-size: 12px !important; padding: 4px 8px !important }
      .pdf-root .timeline-item span{ font-size: 12px !important }
      .pdf-root .logo{ width: 24px !important; height: 24px !important }
      /* Normalize image/icon sizing in PDF */
      .pdf-root img{ max-width: 100% !important; height: auto !important }
      .pdf-root svg{ height: auto !important; max-width: 100% !important }
      .pdf-root img, .pdf-root svg{ vertical-align: top }
      .pdf-root .avatar-img{ width: 96px !important; height: 96px !important; border-width: 2px !important }
      .pdf-root .profile-icon{ width: 14px !important; height: 14px !important }
      .pdf-root .flag-emoji{ width: 20px !important; height: 14px !important }
      .pdf-root .hobby-icon{ width: 40px !important; height: 40px !important; font-size: 22px !important }
      .pdf-root .skill-icon{ width: 28px !important; height: 28px !important; font-size: 18px !important }
      .pdf-clean *{ border-radius: 0 !important; box-shadow: none !important; }
      .pdf-root .contact-landscape .contact-item{ border:1px solid rgba(0,0,0,0.08); background:#fafafa; color:#111 }
      .page-break{ break-before: always; page-break-before: always; }
    `;
    wrapper.prepend(pdfStyle);

    // Mark common cards to avoid page breaks, but allow timeline items to split across pages
    wrapper.querySelectorAll('.skill-category,.hobby-item,.summary-card').forEach(el=> el.classList.add('avoid-break'));
    
    // If a PDF server endpoint is configured, prefer it for best fidelity
    if(window.PDF_SERVER_ENDPOINT){
      try{
        const html = wrapper.outerHTML;
        const res = await fetch(window.PDF_SERVER_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ html, include, layout, theme }) });
        if(!res.ok) throw new Error('server-pdf-failed');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'Abbas_Molvi_Resume.pdf';
        document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        document.querySelectorAll('.notification-loading').forEach(n => n.remove());
        showNotification('PDF downloaded successfully (server).', 'success', 2500);
        return;
      }catch(err){
        console.warn('Server PDF failed, falling back to client:', err);
      }
    }

    // Render to PDF via html2pdf
    const opt = {
      margin:       0.4,
      filename:     'Abbas_Molvi_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'], avoid: ['.avoid-break'], before: '.page-break' }
    };

    try{
      // Temporarily hide dynamic UI elements in live DOM to avoid capture glitches (dialogs, notifications, overlays)
      document.querySelectorAll('.chat-toggle,.chat-widget,.tools,.tools-vertical,.dialog,.dialog-overlay,.notification,.notification-loading').forEach(el=> el.classList.add('print-temp-hide'));
      // Disable CSS animations/transitions during rasterization
      const animStyle = document.createElement('style');
      animStyle.id = 'pdf-anim-disable';
      animStyle.textContent = `*{animation:none !important; transition:none !important}`;
      document.head.appendChild(animStyle);
      if(typeof html2pdf === 'undefined') throw new Error('html2pdf-missing');
      await html2pdf().set(opt).from(wrapper).save();
      document.getElementById('pdf-anim-disable')?.remove();
      document.querySelectorAll('.print-temp-hide').forEach(el=> el.classList.remove('print-temp-hide'));
      document.querySelectorAll('.notification-loading').forEach(n => n.remove());
      showNotification('PDF downloaded successfully.', 'success', 2500);
    }catch(err){
      console.error('html2pdf failed, falling back to browser print:', err);
      // Fallback to print dialog to ensure user can still export
      fallbackPrint(wrapper, pdfStyle.textContent);
    }

    function fallbackPrint(wrapperNode, cssText){
      const button = document.getElementById('downloadResume');
      const originalHTML = button ? button.innerHTML : '';
      if(button){ button.disabled = true; button.innerHTML = '<span>Preparing...</span>'; }
      // Use a hidden iframe to print without opening a new window/tab
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`<!doctype html><html><head><meta charset="utf-8"><title>Resume</title><style>html,body{margin:0;padding:0} ${cssText}</style></head><body>${wrapperNode.outerHTML}</body></html>`);
      doc.close();
      const win = iframe.contentWindow;
      const cleanup = () => { try{ document.body.removeChild(iframe); }catch(e){} };
      win.focus();
      win.onafterprint = cleanup;
      setTimeout(()=> { win.print(); }, 50);
      document.querySelectorAll('.notification-loading').forEach(n => n.remove());
      if(button){ button.disabled = false; button.innerHTML = originalHTML; }
    }
  });
}

/* Sparkles + Welcome popup */
function launchWelcomeEffects(){
  // Sparkles
  const container = document.createElement('div');
  container.className = 'sparkle-container';
  document.body.appendChild(container);
  const emojis = ['✨','💫','🌟','✨','⭐'];
  let count = 0;
  const max = 60;
  const spawn = () => {
    if(count++ > max){ setTimeout(()=> container.remove(), 3000); return; }
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    s.style.left = Math.random()*100 + 'vw';
    s.style.top = '-10px';
    s.style.animationDuration = (1.6 + Math.random()*1.8) + 's';
    container.appendChild(s);
    setTimeout(()=> s.remove(), 3000);
    setTimeout(spawn, 80 + Math.random()*120);
  };
  spawn();

  // Popup thanks (5 seconds)
  const popup = document.createElement('div');
  popup.className = 'popup-thanks';
  popup.setAttribute('role','status');
  popup.textContent = 'Thanks for visiting my profile! I hope you enjoy the experience ✨';
  document.body.appendChild(popup);
  setTimeout(()=> popup.remove(), 3000);
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
  const targetPage = document.getElementById(`page-${pageId}`);
  if (!targetPage) return;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  targetPage.classList.add('active');
  if (pageId === 'summary') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const yOffset = 70;
    const y = targetPage.getBoundingClientRect().top + window.scrollY - yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/* Scroll spy to highlight nav as user scrolls */
function initializeScrollSpy() {
  const pages = Array.from(document.querySelectorAll('.page'));
  const navItems = document.querySelectorAll('.nav-item');
  const yOffset = 80; // adjust for any banners/headers

  function onScroll() {
    const scrollPos = window.scrollY + yOffset;
    let currentId = 'summary';
    pages.forEach(page => {
      const rect = page.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      if (scrollPos >= top) {
        currentId = page.id.replace('page-', '');
      }
    });
    navItems.forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-page="${currentId}"]`);
    if (navItem) navItem.classList.add('active');
  }

  window.addEventListener('scroll', throttle(onScroll, 50));
  onScroll();
}

/* Render simple donut charts for experience timeline */
function renderExperienceCharts() {
  const colorPalette = ['#145bff', '#0b6f5b', '#f59e0b', '#ef4444', '#6366f1'];
  const presets = {
    'pst-manager': [
      { label: 'ETL', value: 40 },
      { label: 'SAP', value: 30 },
      { label: 'QA', value: 15 },
      { label: 'Compliance', value: 15 }
    ],
    'opencv': [
      { label: 'HR/Recruitment', value: 35 },
      { label: 'LMS/Content', value: 35 },
      { label: 'Support', value: 15 },
      { label: 'Marketing', value: 15 }
    ],
    'inventive': [
      { label: 'QA', value: 50 },
      { label: 'B2B/Leads', value: 35 },
      { label: 'Reporting', value: 15 }
    ],
    'facile': [
      { label: 'QA', value: 45 },
      { label: 'ABM', value: 30 },
      { label: 'Coaching', value: 25 }
    ],
    'convergys': [
      { label: 'Evaluation', value: 50 },
      { label: 'Reporting', value: 25 },
      { label: 'Process', value: 25 }
    ],
    'lancesoft': [
      { label: 'Sourcing', value: 45 },
      { label: 'Screening', value: 35 },
      { label: 'Coordination', value: 20 }
    ],
    'teleperformance': [
      { label: 'Support', value: 60 },
      { label: 'Licensing', value: 25 },
      { label: 'Documentation', value: 15 }
    ]
  };

  document.querySelectorAll('.timeline-item').forEach(item => {
    const key = (item.getAttribute('data-company') || '').replace('item-', '') || item.dataset.company || '';
    const data = presets[key] || presets['pst-manager'];
    const total = data.reduce((s, d) => s + d.value, 0);
    let current = 0;
    const slices = data.map((d, i) => {
      const start = (current / total) * 360;
      current += d.value;
      const end = (current / total) * 360;
      const color = colorPalette[i % colorPalette.length];
      return `${color} ${start}deg ${end}deg`;
    }).join(', ');

    const chart = document.createElement('div');
    chart.className = 'donut-chart';
    chart.setAttribute('aria-label', 'Skill distribution');
    chart.style.background = `conic-gradient(${slices})`;
    const inner = document.createElement('div');
    inner.className = 'donut-inner';
    inner.textContent = '';
    chart.appendChild(inner);

    const legend = document.createElement('div');
    legend.className = 'donut-legend';
    data.forEach((d, i) => {
      const row = document.createElement('div');
      row.className = 'legend-row';
      const sw = document.createElement('span');
      sw.className = 'legend-swatch';
      sw.style.background = colorPalette[i % colorPalette.length];
      const txt = document.createElement('span');
      txt.textContent = `${d.label} ${d.value}%`;
      row.appendChild(sw);
      row.appendChild(txt);
      legend.appendChild(row);
    });

    const aside = document.createElement('div');
    aside.className = 'timeline-aside';
    aside.appendChild(chart);
    aside.appendChild(legend);

    const meta = item.querySelector('.timeline-meta');
    if (meta && !item.querySelector('.timeline-aside')) {
      item.insertBefore(aside, meta);
    }
  });
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
  initializeScrollSpy();
  // Charts disabled per request

  // Initialize Chat Assistant
  initializeChatAssistant();
  initializePdfExporter();

  // Welcome sparkles + popup
  launchWelcomeEffects();

  // Ensure page starts at Summary on load
  showPage('summary');

/* Play intro button */
document.getElementById('playIntro').addEventListener('click', ()=>{
    const button = document.getElementById('playIntro');
    const originalText = button.textContent;
    
    // Clear any existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Show loading state
    button.disabled = true;
    button.textContent = 'Loading...';
    const loadingToast = showNotification('Preparing audio...', 'loading');
    
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
        // Remove loading toast if still present
        document.querySelectorAll('.notification-loading').forEach(n => n.remove());
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
  // Extra: ensure loading toasts are removed
  document.querySelectorAll('.notification-loading').forEach(n => n.remove());
  
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
    const tourLoading = showNotification('Starting guided tour...', 'loading');
    
    // Small delay for better UX
    setTimeout(() => {
      runTourSteps(0, () => {
        // Reset button when tour ends
        button.disabled = false;
        button.textContent = originalText;
        window.tourInProgress = false;
        // Remove loading toast if still present
        document.querySelectorAll('.notification-loading').forEach(n => n.remove());
        showNotification('Guided tour completed!', 'success', 3000);
      });
    }, 800);
  });

  /* Timeline expand/collapse (only one open) */
document.querySelectorAll('.timeline-item').forEach(item=>{
  // Expand all by default
  const content = item.querySelector('.timeline-content');
  if (content && !content.classList.contains('open')) {
    content.classList.add('open');
    content.style.maxHeight = content.scrollHeight + "px";
  }
  // Click toggles individual item without closing others
  item.addEventListener('click', (e)=>{
    if(e.target.tagName.toLowerCase() === 'a') return;
    const c = item.querySelector('.timeline-content');
    const willOpen = !c.classList.contains('open');
    if (willOpen) {
      c.classList.add('open');
      c.style.maxHeight = c.scrollHeight + "px";
    } else {
      c.classList.remove('open');
      c.style.maxHeight = null;
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

/* Download Resume - print current page with print styles */
document.getElementById('downloadResume').addEventListener('click', ()=>{
  // Open PDF options modal
  const overlay = document.getElementById('pdfOptionsOverlay');
  if(overlay){ overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); }
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

  // Already expanded all timeline items above
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

