
// AI Chatbot functionality
const chatbotContainer = document.getElementById('ai-chatbot-container');
const chatbotToggle = document.getElementById('ai-chatbot-toggle');
const chatbotClose = document.getElementById('ai-chatbot-close');
const chatbotMessages = document.getElementById('ai-chatbot-messages');
const chatbotText = document.getElementById('ai-chatbot-text');
const chatbotSend = document.getElementById('ai-chatbot-send');

// Sample fitness knowledge base
const fitnessKnowledge = {
  greeting: ["Hello! I'm Gym Rock AI. How can I help with your fitness journey today?", "Hi there! Ready to crush your fitness goals? What can I help with?"],
  membership: ["We offer Basic, Premium, and Elite memberships. You can find details on our Pricing page.", "Our memberships start at $29/month. Check out the Pricing section for full details."],
  trainers: ["Our certified trainers specialize in strength, HIIT, and yoga. Meet them in the Trainers section!", "We have expert trainers with 5+ years experience. Visit the Trainers page to learn more."],
  programs: ["We offer Strength Training, Cardio, HIIT, and Yoga programs. Explore them in our Programs section!", "Check out our Programs page for workout options tailored to your goals."],
  hours: ["We're open Monday-Friday 5AM-11PM and Saturday-Sunday 7AM-9PM.", "Our hours are weekdays 5AM-11PM and weekends 7AM-9PM."],
  default: ["I'm not sure about that, but I can help with membership, trainers, programs, or gym hours.", "Hmm, I'm still learning. Try asking about our services, trainers, or programs."]
};

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
  chatbotContainer.classList.toggle('active');
});

chatbotClose.addEventListener('click', () => {
  chatbotContainer.classList.remove('active');
});

// Send message function
function sendMessage() {
  const message = chatbotText.value.trim();
  if (message) {
    addMessage(message, 'user');
    chatbotText.value = '';
    setTimeout(() => {
      const response = generateResponse(message);
      addMessage(response, 'bot');
    }, 500);
  }
}

// Add message to chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('ai-message', sender);
  messageDiv.textContent = text;
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Generate AI response
function generateResponse(message) {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
    return fitnessKnowledge.greeting[Math.floor(Math.random() * fitnessKnowledge.greeting.length)];
  } else if (lowerMsg.includes('membership') || lowerMsg.includes('price') || lowerMsg.includes('cost')) {
    return fitnessKnowledge.membership[Math.floor(Math.random() * fitnessKnowledge.membership.length)];
  } else if (lowerMsg.includes('trainer') || lowerMsg.includes('coach')) {
    return fitnessKnowledge.trainers[Math.floor(Math.random() * fitnessKnowledge.trainers.length)];
  } else if (lowerMsg.includes('program') || lowerMsg.includes('workout') || lowerMsg.includes('class')) {
    return fitnessKnowledge.programs[Math.floor(Math.random() * fitnessKnowledge.programs.length)];
  } else if (lowerMsg.includes('hour') || lowerMsg.includes('open') || lowerMsg.includes('time')) {
    return fitnessKnowledge.hours[Math.floor(Math.random() * fitnessKnowledge.hours.length)];
  } else {
    return fitnessKnowledge.default[Math.floor(Math.random() * fitnessKnowledge.default.length)];
  }
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Initial greeting
setTimeout(() => {
  addMessage(fitnessKnowledge.greeting[0], 'bot');
}, 1000);