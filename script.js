// Navbar
const burger=document.querySelector('.burger');
const nav=document.querySelector('nav ul');
burger.addEventListener('click',()=>nav.classList.toggle('active'));

// Download Extension (Demo)
document.getElementById('download-btn').addEventListener('click', () => {
    window.location.href = "darkpattern-extension.zip";
});


// Demo Analyzer
// Expanded keywords for dark pattern detection
// ===== DEMO ANALYZER LOGIC =====
const demoText = document.getElementById("demo-text");
const analyzeBtn = document.getElementById("analyze-btn");
const demoResult = document.getElementById("demo-result");

analyzeBtn.addEventListener("click", () => {
    const text = demoText.value.trim();

    if (!text) {
        demoResult.innerHTML = "⚠️ Please enter some text to analyze.";
        return;
    }

    const detected = [];

    darkPatternKeywords.forEach(keyword => {
        if (text.toLowerCase().includes(keyword.toLowerCase())) {
            detected.push(keyword);
        }
    });

    if (detected.length === 0) {
        demoResult.innerHTML = "✅ No potential dark patterns detected.";
    } else {
        demoResult.innerHTML = `
            <h3>⚠️ Dark Patterns Detected</h3>
            <ul>
                ${detected.map(k => `<li>${k}</li>`).join("")}
            </ul>
        `;
    }
});



// Login
const loginLink=document.getElementById('login-link');
const loginModal=document.getElementById('login-modal');
const loginBtn=document.getElementById('login-btn');
const closeLogin=document.getElementById('close-login');
loginLink.addEventListener('click',()=>loginModal.style.display='flex');
closeLogin.addEventListener('click',()=>loginModal.style.display='none');
loginBtn.addEventListener('click',()=>{
    const username=document.getElementById('username').value.trim();
    const password=document.getElementById('password').value.trim();
    if(username && password){
        document.cookie=`username=${username}; path=/; max-age=${60*60*24}`;
        alert(`Logged in as ${username}`);
        loginModal.style.display='none';
        loginLink.innerText=`Hi, ${username}`;
    } else alert('Enter username and password');
});

// Cookie Banner
const cookieBanner=document.getElementById('cookie-banner');
document.getElementById('accept-cookies').addEventListener('click',()=>{
    document.cookie='cookiesAccepted=true; path=/; max-age=31536000';
    cookieBanner.style.display='none';
});
document.getElementById('decline-cookies').addEventListener('click',()=>{
    cookieBanner.style.display='none';
});

// Check login and cookies
window.onload=()=>{
    const cookies=document.cookie.split('; ');
    for(let c of cookies){
        if(c.startsWith('username='))loginLink.innerText=`Hi, ${c.split('=')[1]}`;
    }
    if(!document.cookie.includes('cookiesAccepted'))cookieBanner.style.display='flex';
};

// Chatbot (RAG + LLM)
// Chatbot Elements
// Chatbot Elements
const chatbotBtn = document.getElementById('chatbot-btn');
const chatPopup = document.getElementById('chat-popup');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const chatText = document.getElementById('chat-text');
const chatMessages = document.getElementById('chat-messages');

chatbotBtn.addEventListener('click', () => chatPopup.style.display = 'flex');
closeChat.addEventListener('click', () => chatPopup.style.display = 'none');

sendBtn.addEventListener('click', () => {
    const message = chatText.value.trim();
    if (!message) return;
    addMessage('You', message);
    chatText.value = '';
    addMessage('AI', 'Typing...');

    setTimeout(() => {
        const typingMsg = chatMessages.querySelector('.typing');
        if (typingMsg) typingMsg.remove();
        const answer = getBotResponse(message);
        addMessage('AI', answer);
    }, 800); // simulate typing
});

// Knowledge base
const knowledgeBase = [
  {
    keywords: ['problem', 'dark pattern', 'issue'],
    responses: [
      "Modern websites use dark patterns, which are deceptive UI tricks that manipulate users into unintended actions.",
      "Dark patterns can be hidden in pop-ups, banners, or misleading text, making users unknowingly share data or subscribe to services."
    ]
  },
  {
    keywords: ['solution', 'ai', 'extension', 'nlp', 'browser'],
    responses: [
      "The solution is an AI-powered browser extension that uses NLP to detect potential dark patterns in real time.",
      "Our browser extension analyzes webpage text like cookie banners and consent dialogs to alert users about manipulative UI designs."
    ]
  },
  {
    keywords: ['impact', 'benefit', 'effect'],
    responses: [
      "This tool promotes ethical web design and transparency.",
      "It encourages digital trust and prevents large-scale data exploitation.",
      "The solution can evolve into a compliance and auditing tool for regulatory purposes."
    ]
  },
  {
    keywords: ['prevent', 'privacy', 'user safety', 'protection'],
    responses: [
      "The extension helps users make informed decisions, protecting their privacy and data before they are misled.",
      "It acts as a preventive cybersecurity tool, warning users in real time."
    ]
  },
  {
    keywords: ['scalable', 'regulation', 'compliance'],
    responses: [
      "The system is scalable and can support regulatory or consumer-protection use cases.",
      "It can provide feedback for unethical UI practices and support auditing."
    ]
  },
  {
    keywords: ['ai', 'adaptive', 'intelligent'],
    responses: [
      "AI enables the extension to adapt to new dark pattern tactics automatically.",
      "Using machine learning and NLP allows the tool to detect subtle and evolving manipulations."
    ]
  }
];

// RAG + keyword-based response
function getBotResponse(message) {
    const msg = message.toLowerCase();
    const words = msg.split(/\s+/);
    const random = arr => arr[Math.floor(Math.random() * arr.length)];

    let bestMatch = null;
    let maxMatches = 0;

    for (const entry of knowledgeBase) {
        let count = 0;
        for (const kw of entry.keywords) {
            if (msg.includes(kw.toLowerCase())) count++;
        }
        if (count > maxMatches) {
            maxMatches = count;
            bestMatch = entry;
        }
    }

    if (bestMatch && maxMatches > 0) return random(bestMatch.responses);

    // Generic fallback
    const genericResponses = [
        "I'm here to answer questions about your Dark Pattern Detection solution. Can you clarify?",
        "Interesting! Could you provide more details about what you want to know?",
        "I’ll do my best to answer questions regarding AI-powered dark pattern detection."
    ];
    return random(genericResponses);
}

// Display messages in chat
function addMessage(sender, message) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    if (message === 'Typing...') msgDiv.classList.add('typing');
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
