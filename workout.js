
// Workout Recommender
function initWorkoutRecommender() {
  // Check if we're on the programs page
  if (window.location.hash === '#categories' || document.querySelector('.programs-section')) {
    const recommendButton = document.createElement('button');
    recommendButton.id = 'workout-recommender-btn';
    recommendButton.textContent = 'Get Personalized Recommendations';
    recommendButton.classList.add('btn', 'btn-primary');
    
    const programsSection = document.querySelector('.programs-section .container');
    if (programsSection) {
      programsSection.appendChild(recommendButton);
      
      recommendButton.addEventListener('click', () => {
        showWorkoutQuestionnaire();
      });
    }
  }
}

function showWorkoutQuestionnaire() {
  const modal = document.createElement('div');
  modal.id = 'workout-modal';
  modal.innerHTML = `
    <div class="workout-modal-content">
      <h3>Personalized Workout Recommendation</h3>
      <form id="workout-form">
        <div class="form-group">
          <label>What are your primary fitness goals?</label>
          <select id="fitness-goal">
            <option value="strength">Build Strength</option>
            <option value="weightloss">Lose Weight</option>
            <option value="endurance">Improve Endurance</option>
            <option value="flexibility">Increase Flexibility</option>
          </select>
        </div>
        <div class="form-group">
          <label>How many days per week can you workout?</label>
          <select id="workout-frequency">
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="4">4 days</option>
            <option value="5">5+ days</option>
          </select>
        </div>
        <div class="form-group">
          <label>What's your current fitness level?</label>
          <select id="fitness-level">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Get Recommendations</button>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  document.getElementById('workout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    generateRecommendations();
  });
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}

function generateRecommendations() {
  const goal = document.getElementById('fitness-goal').value;
  const frequency = document.getElementById('workout-frequency').value;
  const level = document.getElementById('fitness-level').value;
  
  // Simple recommendation logic (can be enhanced with more complex AI)
  let recommendedPrograms = [];
  
  if (goal === 'strength') {
    recommendedPrograms.push('Strength Training');
    if (frequency >= 3) recommendedPrograms.push('HIIT Workouts');
  } else if (goal === 'weightloss') {
    recommendedPrograms.push('Cardio Blast', 'HIIT Workouts');
  } else if (goal === 'endurance') {
    recommendedPrograms.push('Cardio Blast');
    if (frequency >= 3) recommendedPrograms.push('HIIT Workouts');
  } else if (goal === 'flexibility') {
    recommendedPrograms.push('Yoga & Mobility');
    if (frequency >= 3) recommendedPrograms.push('Pilates');
  }
  
  // Adjust for fitness level
  if (level === 'beginner') {
    recommendedPrograms = recommendedPrograms.map(p => `${p} (Beginner)`);
  } else if (level === 'advanced') {
    recommendedPrograms = recommendedPrograms.map(p => `${p} (Advanced)`);
  }
  
  // Show results
  const modal = document.getElementById('workout-modal');
  modal.querySelector('.workout-modal-content').innerHTML = `
    <h3>Recommended For You</h3>
    <p>Based on your goals and availability, we recommend:</p>
    <ul class="recommendations-list">
      ${recommendedPrograms.map(p => `<li>${p}</li>`).join('')}
    </ul>
    <button id="close-modal" class="btn btn-primary">Close</button>
  `;
  
  document.getElementById('close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initWorkoutRecommender);