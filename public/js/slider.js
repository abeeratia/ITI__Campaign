document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const slider = document.querySelector(".slider");
  const startBtn = document.querySelector(".start-btn");
  const loginPopup = document.getElementById("loginPopup");
  const closePopup = document.getElementById("closePopup");
  let current = 0;

  const userName = localStorage.getItem("userName");

  const token = localStorage.getItem("token");
  if (token) {
    startBtn.textContent = `Welcome  ${userName}`;
  }

  if (slides.length) {
    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[index].classList.add("active");
    }

    nextBtn?.addEventListener("click", () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });

    prevBtn?.addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });

    let auto = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 3000);

    slider?.addEventListener("mouseenter", () => clearInterval(auto));
    slider?.addEventListener("mouseleave", () => {
      auto = setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 3000);
    });
  }

  startBtn?.addEventListener("click", () => {
    const token = localStorage.getItem("token");
    if (!token) {
      loginPopup.classList.add("show");
    }
  });

  closePopup?.addEventListener("click", () => {
    loginPopup.classList.remove("show");
  });

  loginPopup?.addEventListener("click", (e) => {
    if (e.target === loginPopup) {
      loginPopup.classList.remove("show");
    }
  });
});
