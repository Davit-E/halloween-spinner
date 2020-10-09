
// Dynamic fence quontity
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
