document.querySelectorAll("#art .row").forEach((item) => {
    item.setAttribute("style", "display: table-row;"); 
});

function testMethod(element) {
    return element.style.backgroundColor;
}