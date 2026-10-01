// navigation
var navButtons = document.querySelectorAll(".nav-btn");
var pages = document.querySelectorAll(".page");
var logo = document.getElementById("logo");

// show selected page and hide the others
function showPage(pageId) {
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }
  document.getElementById(pageId).classList.add("active");

  // highlight active navigation button
  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].classList.remove("active");
    if (navButtons[i].getAttribute("data-page") === pageId) {
      navButtons[i].classList.add("active");
    }
  }
}

// clicking a navigation button shows corresponding page
for (var i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener("click", function () {
    showPage(this.getAttribute("data-page"));
  });
}

// logo goes to home
logo.addEventListener("click", function () {
  showPage("home");
});

// show home by default; year in footer
showPage("home");
document.getElementById("year").textContent = new Date().getFullYear();
