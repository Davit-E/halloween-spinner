// Dynamic fence quantity
let fences = document.querySelectorAll('.fence');
let fencePos = 276;
let fenceSize = 163;

let fenceWrapper = document.querySelector('#fence_wrapper');

let fenceImg = document.createElement('IMG');
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

let cocktailNames = cocktails.forEach((el) => {
  let h1 = document.createElement('H1');
  h1.classList.add('spinner_screen_option');
  h1.textContent = el.name;
  spinnerScreen.append(h1);
});

let cells = spinnerScreen.querySelectorAll('.spinner_screen_option');
let cellCount = cells.length;
let selectedIndex = 0;
let currentCell = 0;
let radius, theta;

initSpinner();

function initSpinner() {
  let cellHeight = spinnerScreen.offsetHeight;
  theta = 360 / cellCount;
  let cellSize = cellHeight;
  radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellCount));
  for (let i = 0; i < cellCount; i++) {
    let cell = cells[i];
    let cellAngle = theta * i;
    cell.style.transform =
      'rotateX' + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
  }

  rotateSpinner();
}

function rotateSpinner() {
  selectedIndex++;
  currentCell++;
  if (currentCell > cellCount - 1) {
    currentCell = 0;
  }
  let angle = theta * selectedIndex * -1;
  spinnerScreen.style.transform =
    'translateZ(' + -radius + 'px) ' + 'rotateX' + '(' + angle + 'deg)';
}

let spinForRecipe = document.querySelector('#spin_for_recipe');
let recipe = document.querySelector('#recipe');

let spinButton = document.querySelector('#spinner');
let spinAgainButton = document.querySelector('#spin_again_button');
spinButton.addEventListener('click', spin);
spinAgainButton.addEventListener('click', spin);

function spin() {
  spinnerScreen.style.transition = 'transform 5s';
  spinButton.style.pointerEvents = 'none';
  spinAgainButton.style.pointerEvents = 'none';
  spinForRecipe.style.opacity = 0;
  // Parameters
  let stopTime = Math.floor(Math.random() * 1000 + 2000);
  let randChoice = Math.floor(Math.random() * cellCount);
  let spinFrequency = 50;
  let firstInt = setInterval(rotateSpinner, spinFrequency);
  setTimeout(() => {
    clearInterval(firstInt);
    let secondInt = setInterval(() => {
      rotateSpinner();
      if (randChoice === currentCell) {
        handleStop(secondInt);
      }
    }, spinFrequency);
  }, stopTime);

  setTimeout(() => {
    spinnerScreen.style.opacity = 1;
  }, 500);
}

function handleStop(int) {
  clearInterval(int);
  recipe.style.display = 'flex';
  recipe.style.opacity = 0;
  setTimeout(() => {
    ingredientsList.textContent = '';
    fillInRecipe(cocktails[currentCell]);
    recipe.style.opacity = 1;
    spinButton.style.pointerEvents = 'all';
    spinAgainButton.style.pointerEvents = 'all';
    setTimeout(() => {
      recipe.scrollIntoView();
    }, 700);
  }, 4500);
}

let windowWidth = window.innerWidth;

window.addEventListener('resize', () => {
  if (windowWidth !== window.innerWidth) {
    location.reload();
  }
});
