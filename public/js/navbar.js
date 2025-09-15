import { protectRoute } from "./protectrout.js";

const token = localStorage.getItem("token");

function navBar() {
  return `
    <nav class="nav">
      <div class="nav__logo" >
        <a href="/index.html"><img src="../image/logo.png" alt="logo"></a>
      </div>
      <ul class="nav__list">
        <li><a href="/index.html" class="nav-link">Home</a></li>
        <li><a href="/index.html#about" class="nav-link">About</a></li>
        <li><a href="/index.html#testimonials" class="nav-link">Testimonials</a></li>
        <li><a href="/pages/groupcampaign.html" class="nav-link">Campaigns</a></li>
      </ul>
      <div class="menu">
        <i class="fa-solid fa-align-justify"></i>
      </div>
      <ul class="nav__sign"></ul>
    </nav>
  `;
}

function menuToggle() {
  const menuBtn = document.querySelector(".menu");
  const navList = document.querySelector(".nav__list");
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      navList.classList.toggle("active");
    });
  }
}

function logOut() {
  localStorage.removeItem("token");
  localStorage.clear();
  location.reload();
  window.location.href = "/index.html";
}

function logIn() {
  window.location.href = "/pages/login.html";
}
function setActiveLink() {
  const links = document.querySelectorAll(".nav-link");

  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  links.forEach(function (link) {
    link.classList.remove("active");
  });

  let activeLink = null;

  if (currentHash) {
    activeLink = Array.from(links).find(function (link) {
      return link.hash === currentHash;
    });
  }

  if (!activeLink) {
    activeLink = Array.from(links).find(function (link) {
      const linkPath = new URL(link.href).pathname;

      return (
        (currentPath === "/" && linkPath.includes("index.html")) ||
        (currentPath === "/index.html" && linkPath.includes("index.html")) ||
        (linkPath === currentPath && !link.hash)
      );
    });
  }

  if (activeLink) {
    activeLink.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", setActiveLink);

window.addEventListener("hashchange", setActiveLink);

document.addEventListener("DOMContentLoaded", () => {
  setActiveLink();
});

window.addEventListener("hashchange", setActiveLink);


export let NavBar = () => {
  const navContent = document.querySelector("#nav");
  if (!navContent) return;

  protectRoute();

  navContent.innerHTML = navBar();
  const navSign = document.querySelector(".nav__sign");

  const userName = localStorage.getItem("userName");

  if (token) {
    navSign.innerHTML = `
      <div class="log">
        <div class="user-dropdown">
          <p class="user-name">Hi ${userName}</p>
          <div class="dropdown-menu">
            <a href="/pages/addCampaign.html">Add Campaigns</a>
            <a href="../pages/mycampaign.html">My Campaign</a>
            <a href="../pages/Mypledges.html">My Pledges</a>
          </div>
        </div>
        <button type="submit" id="logout" class="btn btn--full">Logout</button>
      </div>
    `;

    const userNameEl = document.querySelector(".user-name");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (userNameEl && dropdownMenu) {
      userNameEl.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("show");
      });

      document.addEventListener("click", () => {
        dropdownMenu.classList.remove("show");
      });
    }

    document.querySelector("#logout").addEventListener("click", logOut);
  } else {
    navSign.innerHTML = ` 
      
      <a href="/pages/regester.html"> <button   class="log btn btn--full">Register</button></a>
          <a href="/pages/login.html"> <button  id="login" class="log btn btn--full">login</button></a>

      `;
    document.querySelector("#login").addEventListener("click", logIn);
  }

  menuToggle();
  setActiveLink();
};

document.addEventListener("DOMContentLoaded", () => {
  NavBar();
});
window.addEventListener("hashchange", setActiveLink);
