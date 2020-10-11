// Dynamic fence quantity
let fences = document.querySelectorAll('.fence');
let fencePos = 276;
let fenceSize = 163;

let fenceWrapper = document.querySelector('#fence_wrapper');

let fenceImg = document.createElement('IMG');
// let fenceQuantity = Math.round(window.innerWidth / 140);
fenceQuantity = 12;

for (let i = 0; i < fenceQuantity; i++) {
  let fenceImg = document.createElement('IMG');
  fenceImg.classList.add('fence');
  fenceImg.src = './assets/Fence.png';
  fenceImg.style.left = fencePos + 'px';
  fenceWrapper.appendChild(fenceImg);
  fencePos += fenceSize;
}

// Recipe Handling
let recipeTitle = document.querySelector('#recipe_title');
let recipeDescription = document.querySelector('#recipe_description');
let ingredientsList = document.querySelector('#ingredients_list');
let recipeDirections = document.querySelector('#directions');

// pumpkin svg
let pumpkinSvgWrapper = document.createElement('DIV');
pumpkinSvgWrapper.classList.add('ingredient_svg');
let pumpkinSvgImage = document.createElement('IMG');
pumpkinSvgImage.src = './assets/pumpkin.svg';
pumpkinSvgWrapper.appendChild(pumpkinSvgImage);

// Fill Ingredients
function fillInRecipe(cocktail) {
  recipeTitle.textContent = cocktail.name;
  recipeDescription.textContent = cocktail.description;
  recipeDirections.textContent = cocktail.directions;
  cocktail.ingredients.forEach(fillInIngredients);
}

function fillInIngredients(ingredient, i) {
  let listItem = document.createElement('LI');
  listItem.classList.add('ingredient_item');
  let p = document.createElement('P');
  p.textContent = ingredient;
  let pumpkin = pumpkinSvgWrapper.cloneNode(true);
  listItem.appendChild(pumpkin);
  listItem.appendChild(p);
  ingredientsList.appendChild(listItem);
}

//// Spinning ////
let spinnerScreen = document.querySelector('#spinner_screen');
let cocktailNames = cocktails.map((cocktail) => {
  return cocktail.name;
});

let cocktailSpinOptions = cocktailNames.map((el) => {
  let h1 = document.createElement('H1');
  h1.classList.add('spinner_screen_option');
  h1.textContent = el;
  return h1;
});

cocktailSpinOptions.forEach((el) => {
  spinnerScreen.append(el);
});

spinnerScreen.offsetWidth;
let spinOptionWidth = document.querySelector;

let cells = spinnerScreen.querySelectorAll('.spinner_screen_option');
let cellCount = cells.length;
let selectedIndex = 0;
let currentCell = 0;
let cellWidth = cells[0].offsetWidth;
let cellHeight = cells[0].offsetHeight;
let radius, theta;

initSpinner();

function initSpinner() {
  theta = 360 / cellCount;
  let cellSize = cellWidth;
  radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellCount));
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    cell.style.opacity = 0;
    let cellAngle = theta * i;
    cell.style.transform =
      'rotateX' + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    if (i > 0) {
      cell.style.opacity = 0;
    }
  }

  rotateSpinner();
}

function rotateSpinner() {
  if (currentCell > 3) {
    currentCell = 0;
  }
  let angle = theta * selectedIndex * -1;
  spinnerScreen.style.transform =
    'translateZ(' + -radius + 'px) ' + 'rotateX' + '(' + angle + 'deg)';
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    cell.style.opacity = 1;
  }
  currentCell++;
}

let spinForRecipe = document.querySelector('#spin_for_recipe');
let recipe = document.querySelector('#recipe');

let spinButton = document.querySelector('#slot_spin_wrapper');
let spinAgainButton = document.querySelector('#spin_again_button');
spinButton.addEventListener('click', spin);
spinAgainButton.addEventListener('click', spin);

function spin() {
  spinButton.style.pointerEvents = "none";
  spinAgainButton.style.pointerEvents = "none";
  let stopTime = Math.round(Math.random() * 1000 + 2000);
  let spinFrequency = 20;
  let myInt = setInterval(() => {
    selectedIndex++;
    rotateSpinner();
  }, spinFrequency);
  setTimeout(() => {
    clearInterval(myInt);
    recipe.style.display = 'flex';
    recipe.style.opacity = 0;
    setTimeout(() => {
      ingredientsList.textContent = '';
      fillInRecipe(cocktails[currentCell - 1]);
      spinForRecipe.style.opacity = 0;
      recipe.style.opacity = 1;
      spinButton.style.pointerEvents = "all";
      spinAgainButton.style.pointerEvents = "all";
      for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        if (i === currentCell-1) {
          cell.style.opacity = 1;
        } else {
          cell.style.opacity = 0;
        }
      }
    }, 1000);
  }, stopTime);

  setTimeout(() => {
    spinnerScreen.style.opacity = 1;
  }, 500);
}
