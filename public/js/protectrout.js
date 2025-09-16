export function protectRoute() {
  const path = window.location.pathname;
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (path.endsWith("index.html") || path === "/") {
    return;
  }

  if (
    path.includes("admin") ||
    path.includes("campaignsMange") ||
    path.includes("pledgesManage")
  ) {
    if (!token || role !== "admin") {
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
    if (!token || role !== "user") {
      window.location.href = "/index.html";
      return;
    }
  }
}
