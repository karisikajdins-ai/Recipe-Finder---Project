const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');
const mealDetails = document.getElementById('mealDetails');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) return;
  fetchMeals(query);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

async function fetchMeals(query) {
  results.innerHTML = 'Laddar...';
  mealDetails.innerHTML = '';
  mealDetails.classList.add('hidden');

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    if (!data.meals) {
      results.innerHTML = '<p style="text-align:center;font-size:1.2rem;">Inga måltider hittades.</p>';
      return;
    }

    displayMeals(data.meals);
  } catch (err) {
    results.innerHTML = '<p style="text-align:center;font-size:1.2rem;">Fel vid hämtning av data.</p>';
  }
}

function displayMeals(meals) {
  results.innerHTML = meals.map(meal => `
    <div class="meal-card" onclick="fetchMealDetails('${meal.idMeal}')">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
    </div>
  `).join('');
}

async function fetchMealDetails(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  const meal = data.meals[0];

  mealDetails.classList.remove('hidden');
  mealDetails.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h3>Ingredienser:</h3>
    <ul>
      ${getIngredients(meal).map(i => `<li>${i}</li>`).join('')}
    </ul>
    <h3>Instruktioner:</h3>
    <p>${meal.strInstructions}</p>
  `;

  // Scrolla till detaljerna
  mealDetails.scrollIntoView({ behavior: 'smooth' });
}

function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }
  return ingredients;
}
