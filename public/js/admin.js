import { protectRoute } from "./protectrout.js";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

function sidebarLayout() {
  return `
    <div class="sidebar">
      <div>
        <div class="logo">Admin Panel</div>
        <ul class="menu" id="sidebarMenu">
          <a href="/pages/admin.html"><li data-tab="users">Users</li></a>
          <a href="/pages/campaignsMange.html"><li data-tab="campaigns">Campaigns</li></a>
          <a href="/pages/pledgesManage.html"><li data-tab="pledges">Pledges</li></a>
        </ul>
      </div>
      <div class="sidebar-footer" id="sidebarFooter"></div>
    </div>
  `;
}

function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/index.html";
}

export function AdminSidebar() {
  const sidebar = document.querySelector("#admin");
  if (!sidebar) return;

  protectRoute()

  sidebar.innerHTML = sidebarLayout();

  const sidebarFooter = document.querySelector("#sidebarFooter");
  sidebarFooter.innerHTML = `<button class="btn btn--full" id="logout">Logout</button>`;
  document.querySelector("#logout").addEventListener("click", logOut);
  const currentPath = window.location.pathname;
  document.querySelectorAll("#sidebarMenu a").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.querySelector("li").classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  AdminSidebar();
});
