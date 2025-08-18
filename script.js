let lastScroll = 0;
const body = document.body;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    // At the very top of the page
    body.classList.remove("scroll-up", "scroll-down");
  } 
  else if (currentScroll > lastScroll) {
    // Scrolling down
    body.classList.add("scroll-down");
    body.classList.remove("scroll-up");
  } 
  else if (currentScroll < lastScroll) {
    // Scrolling up
    body.classList.add("scroll-up");
    body.classList.remove("scroll-down");
  }

  lastScroll = currentScroll;
});

