document.addEventListener("DOMContentLoaded", () => {
  // JavaScript for mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("active"); // Toggle 'active' class for sliding effect
    });
  }

  // JavaScript for mobile accordion dropdowns
  const mobileDropdownToggles = document.querySelectorAll(
    ".mobile-dropdown-toggle-container button"
  );

  mobileDropdownToggles.forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
      const dropdownLinks = toggleButton.nextElementSibling;
      dropdownLinks.classList.toggle("hidden");
    });
  });

  // JavaScript for full-width desktop dropdown menus with hover delay
  const dropdownTriggers = document.querySelectorAll("[data-dropdown-id]");
  const dropdowns = document.querySelectorAll(".desktop-dropdown-links");
  let hideTimeout;

  dropdownTriggers.forEach((trigger) => {
    const dropdownId = trigger.dataset.dropdownId;
    const dropdownElement = document.getElementById(dropdownId);
    const parentGroup = trigger.closest(".group");

    if (parentGroup && dropdownElement) {
      // Show dropdown on mouse enter the parent group (link)
      parentGroup.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
        // Hide all other dropdowns first
        dropdowns.forEach((dd) => {
          if (dd !== dropdownElement) {
            dd.classList.add("hidden");
          }
        });
        dropdownElement.classList.remove("hidden");
      });

      // Hide dropdown on mouse leave the parent group (link) with a delay
      parentGroup.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
          dropdownElement.classList.add("hidden");
        }, 200); // 200ms delay
      });

      // Clear the timeout if the mouse enters the dropdown container itself
      dropdownElement.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
      });

      // Hide the dropdown immediately when the mouse leaves the dropdown container
      dropdownElement.addEventListener("mouseleave", () => {
        dropdownElement.classList.add("hidden");
      });
    }
  });

  /* ----- SLIDESHOW LOGIC ----- */
  const slideshowInner = document.querySelector(".slideshow-inner");
  const slides = document.querySelectorAll(".mySlides");
  let slideIndex = 0;
  const intervalTime = 5000; // 5 seconds

  // This function moves the slideshow to the next slide
  function showNextSlide() {
    // Increment slide index, and loop back to 0 if at the end
    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }

    // Move the slideshow inner container left by the calculated amount
    slideshowInner.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  // Start the auto-sliding when the page loads
  setInterval(showNextSlide, intervalTime);
});
// JavaScript for the mobile slideshow
let slideIndexMobile = 0;
showSlidesMobile();

function showSlidesMobile() {
  let i;
  let slides = document.getElementsByClassName("mySlides-mobile");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndexMobile++;
  if (slideIndexMobile > slides.length) {
    slideIndexMobile = 1;
  }
  slides[slideIndexMobile - 1].style.display = "block";
  setTimeout(showSlidesMobile, 3000); // Change image every 3 seconds
}
