document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('recipeForm');
    const recipeList = document.querySelector('#recipe-list');
    const searchBox = document.getElementById('input');
    const recipes = [
        {
            name: 'Spaghetti',
            ingredients: ['200g spaghetti', '1 tablespoon olive oil', '1 clove garlic (minced)', '1 can crushed tomatoes', 'Salt and pepper to taste', 'Fresh basil leaves (optional)'],
            method: '1. Cook spaghetti according to package instructions.\n2. In a pan, heat olive oil over medium heat.\n3. Add minced garlic until fragrant.\n4. Pour in crushed tomatoes and season with salt and pepper.\n5. Simmer the sauce for 15-20 minutes, stirring occasionally.\n6. Toss cooked spaghetti into the sauce and mix well.\n7. Serve with fresh basil leaves if desired.'
        },
        
        {
            name: 'Simple Salad',
            ingredients: ['Lettuce', 'Tomatoes', 'Cucumbers', 'Olive Oil', 'Salt', 'Pepper'],
            method: '1. Wash and chop the lettuce, tomatoes, and cucumbers.\n' +
               '2. Combine them in a bowl.\n' +
               '3. Drizzle with olive oil.\n' +
               '4. Season with salt and pepper to taste.\n' +
               '5. Toss the salad until ingredients are well mixed.\n' +
               '6. Serve and enjoy!'
        },
    ];
    

    function formSubmit(event) {
        event.preventDefault();
        const nameInput = document.querySelector('#recipeName');
        const ingrInput = document.querySelector('#ingredients');
        const methodInput = document.querySelector('#method');
        const name = nameInput.value.trim();
        const ingredients = ingrInput.value.trim().split(",").map(i => i.trim());
        const method = methodInput.value.trim();
        if (name && ingredients.length > 0 && method) {
            const newRecipe = { name, ingredients, method };
            recipes.push(newRecipe);
            displayRecipes();
            nameInput.value = '';
            ingrInput.value = '';
            methodInput.value = '';
        }
    }

    function displayRecipes() {
        recipeList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong></p>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <p><strong>Method:</strong></p>
            <p>${recipe.method}</p>
            <button class='delete-btn' data-index='${index}'>Delete</button>`;
            recipeDiv.classList.add('recipe');
            recipeList.appendChild(recipeDiv);
        });
    }

    form.addEventListener('submit', formSubmit);
    displayRecipes();


    function recipeDelete(event){
        if (event.target.classList.contains('delete-btn')){
            let index = event.target.dataset.index;
        // Check if the index is valid
        if (!isNaN(index) && index >= 0 && index < recipes.length) {
            // Remove the recipe at the specified index
            recipes.splice(index, 1);
            // Update the displayed recipes
            displayRecipes();
        }
    }
    }
    recipeList.addEventListener('click', recipeDelete);

    function search(query) {
        // Filter recipes based on the query
        const filteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(query.toLowerCase());
        });
    
        // Clear the recipe list before displaying the filtered recipes
        recipeList.innerHTML = '';
    
        // Display the filtered recipes
        filteredRecipes.forEach(recipe => {
            // Create a new div element for each filtered recipe
            const recipeEl = document.createElement('div');
    
            // Populate the inner HTML of the div with recipe details
            recipeEl.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong></p>
                <ul>
                    ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
                </ul>
                <p><strong>Method:</strong></p>
                <p>${recipe.method}</p>
                <button class="delete-button" data-index="${recipes.indexOf(recipe)}">Delete</button>
            `;
    
            // Add a CSS class to the div for styling 
            recipeEl.classList.add('recipe');
    
            // Append the div to the recipeList container
            recipeList.appendChild(recipeEl);
        });
    }
    
    // Initial display of all recipes
    search('');
    
    // Attach the input event listener to the search box
    searchBox.addEventListener('input', event => search(event.target.value));
    
   
});
