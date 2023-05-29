let array = [];
let elements = [];
let delay = 200;
let passNumber = 1;

// DOM elements
var checkbox = document.getElementById("randomCheckbox");
var elementToHide1 = document.getElementById("customNum");
var elementToHide2 = document.getElementById("numOfNums");
var generateButton = document.getElementById("generateButton");
var sortButton = document.getElementById("sortButton");

// Hide/show elements based on checkbox state
elementToHide2.style.display = "none";
checkbox.addEventListener("change", function () {
  elementToHide1.style.display = checkbox.checked ? "none" : "flex";
  elementToHide2.style.display = checkbox.checked ? "flex" : "none";
});

// Populate the array based on user input
function populateArray() {
  array = [];
  const isRandom = document.getElementById("randomCheckbox").checked;

  if (isRandom) {
    const numNumbers = parseInt(document.getElementById("numNumbers").value);
    for (let i = 0; i < numNumbers; i++) {
      array.push(Math.floor(Math.random() * 100));
    }
  } else {
    const customNumbersInput = document.getElementById("customNumbers");
    const inputValues = customNumbersInput.value.split(" ");

    for (let i = 0; i < inputValues.length; i++) {
      const inputValue = parseInt(inputValues[i]);
      if (!isNaN(inputValue)) {
        array.push(inputValue);
      }
    }
  }
}

// Create elements based on array values
function makeElements() {
  elements = [];
  const container = document.getElementById("container");
  const barContainer = document.getElementById("barContainer");
  container.innerHTML = "";
  barContainer.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let element = document.createElement("div");
    element.classList.add("element");
    element.innerHTML = array[i];
    container.appendChild(element);
    elements.push(element);

    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * 2 + "px";
    bar.style.width = 300 / array.length + "px";
    barContainer.appendChild(bar);
  }
}

// Perform the quicksort algorithm
function quicksort(array, low, high) {
  if (low < high) {
    let pivotIndex = partition(array, low, high);
    updateElements();

    setTimeout(function () {
      quicksort(array, low, pivotIndex - 1);
    }, delay);

    setTimeout(function () {
      quicksort(array, pivotIndex + 1, high);
    }, delay);
  }
}

// Partition the array for quicksort
function partition(array, low, high) {
  const preArray = array.slice();
  let pivot = array[low];
  let i = low;
  let j = high;

  elements[low].style.backgroundColor = "lightgreen";

  while (i < j) {
    while (array[i] <= pivot && i < high) {
      i++;
    }
    while (array[j] > pivot && j > low) {
      j--;
    }

    if (i < j) {
      swap(array, i, j);
      updateElements();
    }
  }

  swap(array, low, j);
  updateElements();

  setTimeout(function () {
    elements[low].style.backgroundColor = "";
    elements[j].style.backgroundColor = "";
  }, delay);

  const passesContainer = document.getElementById("passes");
  const partitionElement = document.createElement("div");
  partitionElement.classList.add("pass");
  partitionElement.innerHTML = "Pass " + passNumber + " ==> " + preArray.map((value, index) => {
    if (index === low) {
      return "<span class='pivot'>" + value + "</span>";
    } else {
      return value;
    }
  }).join(" ");
  passesContainer.appendChild(partitionElement);

  passNumber++;

  return j;
}

// Swap array elements
function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// Update the elements based on array values
function updateElements() {
  const bars = document.querySelectorAll(".bar");

  for (let i = 0; i < array.length; i++) {
    elements[i].innerHTML = array[i];
    bars[i].style.height = array[i] * 2 + "px";
  }
}

// Event listeners
generateButton.addEventListener("click", function () {
  populateArray();
  document.getElementById("passes").innerHTML = "";
  passNumber = 1;
  makeElements();
});

sortButton.addEventListener("click", function () {
  delay = parseInt(document.getElementById("delay").value);
  passNumber = 1;
  quicksort(array, 0, array.length - 1);
});
