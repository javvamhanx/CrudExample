var fakeDB = [];
var pixelJson = { "color": 0, "name": "" };
var currentY = 0;
var currentX = 0;
var currentPixel;

var colorOptions = ["", "red-div", "yellow-div", "black-div", "green-div", "blue-div"];

function createData() {
  fakeDB = Array(10).fill(Array(10).fill(undefined));
}

createData();

document.querySelectorAll("#art .row").forEach((item) => {
  item.setAttribute("style", "display: table-row;");
});

function removeAllColors() {
  if (confirm('Are you sure you want to delete all your items?')) {
    document.querySelectorAll("#art .pixel").forEach((item) => {
      item.classList.remove("red-div");
      item.classList.remove("yellow-div");
      item.classList.remove("black-div");
      item.classList.remove("green-div");
      item.classList.remove("blue-div");
    });
    createData();
  }
}

function removeColor(element) {
  element.parentElement.parentElement.classList.remove("red-div");
  element.parentElement.parentElement.classList.remove("yellow-div");
  element.parentElement.parentElement.classList.remove("black-div");
  element.parentElement.parentElement.classList.remove("green-div");
  element.parentElement.parentElement.classList.remove("blue-div");
}

function FindColPos(element) {
  var colPos = 0;
  var prev = element.previousElementSibling;

  while (prev) {
    if (prev.classList.contains("pixel"))
      colPos++;
    prev = prev.previousElementSibling;
  }

  return colPos;
}

function FindRowPos(element) {
  var rowPos = 0;
  var prev = element.parentNode.previousElementSibling;

  while (prev) {
    if (prev.classList.contains("row"))
      rowPos++;
    prev = prev.previousElementSibling;
  }

  return rowPos;
}

function editColor(element) {
  readPixel(element, 1);
  currentPixel = element;
}

function changePicture() {
  var selectedColor = document.querySelector("#editPixelColor").selectedIndex;
  backgroundChange(document.querySelector(".picture-style"), selectedColor);
}

function backgroundChange(element, colorIndex) {
  switch (colorIndex) {
    case 1:
      element.style.backgroundColor = "red";
      break;
    case 2:
      element.style.backgroundColor = "yellow";
      break;
    case 3:
      element.style.backgroundColor = "black";
      break;
    case 4:
      element.style.backgroundColor = "green";
      break;
    case 5:
      element.style.backgroundColor = "blue";
      break;
    default:
      element.style.backgroundColor = "white";
      break;
  }
}

function pixelBkgdChange(element, colorIndex) {
  removeColor(element);
  switch (colorIndex) {
    case 1:
      element.parentElement.parentElement.classList.add("red-div");
      break;
    case 2:
      element.parentElement.parentElement.classList.add("yellow-div");
      break;
    case 3:
      element.parentElement.parentElement.classList.add("black-div");
      break;
    case 4:
      element.parentElement.parentElement.classList.add("green-div");
      break;
    case 5:
      element.parentElement.parentElement.classList.add("blue-div");
      break;
    default:
      break;
  }
}

function savePixel() {
  if (fakeDB[currentX][currentY])
    updatePixel();
  else
    createPixel();
}

// CRUD methods (Create, Read, Update, Delete)

function createPixel() {
  fakeDB[currentX][currentY] = { "color": 0, "name": "" };
  updatePixel();
}

function readPixel(element, modalType) {
  currentX = FindColPos(element.parentElement.parentElement);
  currentY = FindRowPos(element.parentElement.parentElement);

  let currentValue = fakeDB[currentX][currentY];
  var picture = modalType == 1 ? document.querySelector("#editPictureStyle") : document.querySelector("#viewPictureStyle");
  if (currentValue && currentValue != pixelJson) {
    backgroundChange(picture, currentValue.color);
    if (modalType == 1) {
      document.querySelector("#editPixelName").value = currentValue.name;
      document.querySelector("#editPixelColor").selectedIndex = currentValue.color;
    } else {
      document.querySelector("#pixelName").value = currentValue.name;
      document.querySelector("#pixelColor").value = colorOptions[currentValue.color].split('-')[0];
    }
  }
  else {
    backgroundChange(picture, -1);
    if (modalType == 1) {
      document.querySelector("#editPixelColor").selectedIndex = 0;
      document.querySelector("#editPixelName").value = "";
    } else {
      document.querySelector("#pixelName").value = "";
      document.querySelector("#pixelColor").value = "";
    }

  }
}

function updatePixel() {
  let currentValue = fakeDB[currentX][currentY];
  currentValue.name = document.querySelector("#editPixelName").value;
  currentValue.color = document.querySelector("#editPixelColor").selectedIndex;
  pixelBkgdChange(currentPixel, currentValue.color)
}

function deletePixel(element) {
  removeColor(element);
  fakeDB[currentX][currentY] = undefined;
}