var fakeDB = [];
var baseJson = { "color": 0, "name": "" };
var currentY = 0;
var currentX = 0;

var colorOptions = ["", "red-div", "yellow-div", "black-div", "green-div", "blue-div"];

function createData() {
  fakeDB = Array(10).fill(Array(10).fill(0).map(y => baseJson));
  console.log(fakeDB);
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
  }
}

function removeColor(element) {
  console.log(FindColPos(element.parentElement.parentElement));
  console.log(FindRowPos(element.parentElement.parentElement));
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
  console.log("color edited");
}

function viewColor(element) {
  currentX = FindColPos(element.parentElement.parentElement);
  currentY = FindRowPos(element.parentElement.parentElement);

  let currentValue = fakeDB[currentX][currentY];
  var picture = document.querySelector("#viewPictureStyle");
  if (currentvalue && currentValue != baseJson) {
    backgroundChange(picture, currentValue.color);
    document.querySelector("#pixelName").value = currentValue.name;
    document.querySelector("#pixelColor").value = colorOptions[currentValue.color].split('-')[0];
  }
  else {
    backgroundChange(picture, -1);
  }
}

function changePicture() {
  var selectedColor = document.querySelector("#colorSelect").selectedIndex;
  switch (selectedColor) {
    case 0:
      document.querySelector(".picture-style").style.backgroundColor = "red";
      break;
    case 1:
      document.querySelector(".picture-style").style.backgroundColor = "yellow";
      break;
    case 2:
      document.querySelector(".picture-style").style.backgroundColor = "black";
      break;
    case 3:
      document.querySelector(".picture-style").style.backgroundColor = "green";
      break;
    case 4:
      document.querySelector(".picture-style").style.backgroundColor = "blue";
      break;
    default:
      document.querySelector(".picture-style").style.backgroundColor = "white";
      break;
  }
}

function backgroundChange(element, colorIndex) {
  switch (colorIndex) {
    case 0:
      element.style.backgroundColor = "red";
      break;
    case 1:
      element.style.backgroundColor = "yellow";
      break;
    case 2:
      element.style.backgroundColor = "black";
      break;
    case 3:
      element.style.backgroundColor = "green";
      break;
    case 4:
      element.style.backgroundColor = "blue";
      break;
    default:
      element.style.backgroundColor = "white";
      break;
  } 
}