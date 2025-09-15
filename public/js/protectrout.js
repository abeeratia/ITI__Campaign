let role = localStorage.getItem("role");
let token = localStorage.getItem("token");

export function protectRoute() {
  let path = window.location.pathname;

  if (
    path.includes("admin") ||
    path.includes("campaignsMange") ||
    path.includes("pledgesManage") ||
    path.includes("campaignDetails") ||
    path.includes("mycampaign") ||
    path.includes("addCampaign") ||
    path.includes("pledges")
  ) {
    if (!token) {
      window.location.href = "/index.html";

      return;
    }
  }

  if (
    path.includes("admin") ||
    path.includes("campaignsMange") ||
    path.includes("pledgesManage")
  ) {
    if (role !== "admin") {
      window.location.href = "/index.html";
      return;
    }
  }

  if (
    path.includes("campaignDetails") ||
    path.includes("mycampaign") ||
    path.includes("checkout") ||
    path.includes("addCampaign") ||
    path.includes("Mypledges")
  ) {
    if (role !== "user") {
      window.location.href = "/index.html";
      return;
    }
  }
}
