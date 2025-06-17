
// Nutrition Tracker
function initNutritionTracker() {
  if (document.querySelector('.nutrition-section')) {
    const nutritionForm = document.getElementById('nutrition-form');
    const mealList = document.getElementById('meal-list');
    let meals = JSON.parse(localStorage.getItem('gymRockMeals')) || [];
    
    // Load existing meals
    updateNutritionDisplay(meals);
    
    nutritionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const mealType = document.getElementById('meal-type').value;
      const foodItem = document.getElementById('food-item').value;
      const calories = parseInt(document.getElementById('calories').value);
      
      if (foodItem && !isNaN(calories)) {
        const meal = {
          type: mealType,
          food: foodItem,
          calories: calories,
          date: new Date().toISOString()
        };
        
        meals.push(meal);
        localStorage.setItem('gymRockMeals', JSON.stringify(meals));
        updateNutritionDisplay(meals);
        nutritionForm.reset();
      }
    });
    
    document.getElementById('analyze-nutrition').addEventListener('click', () => {
      provideNutritionAnalysis(meals);
    });
  }
}

function updateNutritionDisplay(meals) {
  const today = new Date().toISOString().split('T')[0];
  const todaysMeals = meals.filter(meal => meal.date.includes(today));
  
  // Update stats
  document.getElementById('total-calories').textContent = 
    todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);
  document.getElementById('meals-logged').textContent = todaysMeals.length;
  
  // Update meal list
  const mealList = document.getElementById('meal-list');
  mealList.innerHTML = '';
  
  if (todaysMeals.length === 0) {
    mealList.innerHTML = '<li>No meals logged today</li>';
  } else {
    todaysMeals.forEach(meal => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${meal.food} (${meal.type})</span>
        <span>${meal.calories} cal</span>
      `;
      mealList.appendChild(li);
    });
  }
}

function provideNutritionAnalysis(meals) {
  const today = new Date().toISOString().split('T')[0];
  const todaysMeals = meals.filter(meal => meal.date.includes(today));
  const totalCalories = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);
  
  let analysis = "";
  
  if (todaysMeals.length === 0) {
    analysis = "You haven't logged any meals today. Try adding some to get personalized nutrition advice!";
  } else if (totalCalories < 1200) {
    analysis = "Your calorie intake seems quite low for an active lifestyle. Consider adding more nutrient-dense foods to support your workouts.";
  } else if (totalCalories > 2500) {
    analysis = "You're consuming a high number of calories today. Make sure to balance this with your workout intensity for optimal results.";
  } else {
    analysis = "Your calorie intake looks balanced for moderate activity. Keep up the good work with your nutrition!";
  }
  
  alert(`AI Nutrition Analysis:\n\n${analysis}`);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initNutritionTracker);