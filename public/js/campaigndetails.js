import { NavBar } from "./navbar.js";
import { getCampaignById } from "./crudcampaign.js";
import { protectRoute } from "./protectrout.js";
import { CampaignFooter } from "./footer.js";
CampaignFooter();
protectRoute();
const campaignId = window.location.hash.substring(1);
const campaignDetailsDiv = document.getElementById("campaign-details");

document.addEventListener("DOMContentLoaded", async () => {
  NavBar();
  const token = localStorage.getItem("token");

  try {
    const campaign = await getCampaignById(campaignId);

    if (!campaignId || !campaign) {
      campaignDetailsDiv.innerHTML = `<p style="color:red;">Campaign not found.</p>`;
      return;
    }

    let rewardsList = `<p>No rewards available.</p>`;
    if (campaign.rewards && campaign.rewards.length > 0) {
      rewardsList = `
        <ul>
          ${campaign.rewards
            .map(
              (reward) => `
                <li class="rewards">
                  <strong>${reward.title}</strong> ${reward.amount}$
                  <p>
                    <span class="payment-word" data-reward="${reward.id}">Payment</span>
                  </p>
                </li>
              `
            )
            .join("")}
        </ul>
      `;
    }

    campaignDetailsDiv.innerHTML = `
      <h1>${campaign.title}</h1>
      <p>${campaign.description}</p>
      <p><strong>Goal:</strong> ${campaign.goal}</p>
      <p><strong>Deadline:</strong> ${campaign.deadline}</p>
      <img src="${campaign.image}" alt="${campaign.title}" style="max-width:100%;border-radius:8px;" />
      <h3>Rewards</h3>
      ${rewardsList}
    `;

    document.querySelectorAll(".payment-word").forEach((span) => {
      span.addEventListener("click", () => {
        const rewardId = span.getAttribute("data-reward");

        if (token) {
          window.location.href = `../pages/checkout.html#${campaignId}#${rewardId}`;
        } else {
          if (!document.getElementById("loginPopup")) {
            const popup = document.createElement("div");
            popup.id = "loginPopup";
            popup.className = "popup show";
            popup.innerHTML = `
              <div class="popup-content">
                <p>You must login to continue.</p>
                <button id="popupLoginBtn">Login</button>
                <button id="popupCloseBtn">Close</button>
              </div>
            `;
            document.body.appendChild(popup);

            document
              .getElementById("popupLoginBtn")
              .addEventListener("click", () => {
                window.location.href = "../pages/login.html";
              });

            document
              .getElementById("popupCloseBtn")
              .addEventListener("click", () => {
                popup.remove();
              });
          }
        }
      });
    });
  } catch (error) {
    console.error("Error loading campaign details:", error);
    campaignDetailsDiv.innerHTML = `<p style="color:red;">Failed to load campaign details.</p>`;
  }
});
