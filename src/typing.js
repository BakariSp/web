
// Get the element with the ID "myElement"
var myElement = document.getElementById("container");
console.log("container", myElement);

// Update the transparency of the element when the user scrolls
window.onscroll = function() {
    // Get the number of pixels the user has scrolled
    var scrollPosition = window.scrollY;

    // Calculate the new transparency for the element (from 0 to 1)
    var newOpacity = (scrollPosition / 10);
    console.log("new opacity", newOpacity);

    // Update the element's transparency
    myElement.style.opacity = newOpacity;
}
