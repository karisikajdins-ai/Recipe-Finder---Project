const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsSection = document.getElementById('results-section');
const detailsSection = document.getElementById('details-section');

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMeals(query);
  }
});

async function fetchMeals(query) {
  resultsSection.innerHTML = 'Laddar...';
  detailsSection.innerHTML = '';

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();

    if (data.meals) {
      displayResults(data.meals);
    } else {
      resultsSection.innerHTML = 'Ingen måltid hittades.';
    }
  } catch (error) {
    resultsSection.innerHTML = 'Ett fel uppstod vid hämtning av data.';
    console.error(error);
  }
}

function displayResults(meals) {
  resultsSection.innerHTML = '';
  meals.forEach(meal => {
    const card = document.createElement('div');
    card.className = 'meal-card';
    card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;
    card.addEventListener('click', () => showDetails(meal));
    resultsSection.appendChild(card);
  });
}

function showDetails(meal) {
  detailsSection.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:300px">
        <h3>Ingredienser:</h3>
        <ul>
            ${getIngredients(meal).map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <h3>Instruktioner:</h3>
        <p>${meal.strInstructions}</p>
    `;
}

function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }
  }
  return ingredients;
}
