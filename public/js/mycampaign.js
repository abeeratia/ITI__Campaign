import { NavBar } from "./navbar.js";
import { CampaignFooter } from "./footer.js";
import { deleteCampaign } from "./crudcampaign.js";

NavBar();
CampaignFooter();

const user = Number(localStorage.getItem("userId"));
const container = document.getElementById("campaign-container");
console.log(user);

async function fetchUserCampaigns() {
  try {
    const response = await fetch(
      `http://localhost:3001/campaigns?creatorId=${user}`
    );
    if (!response.ok) throw new Error("No campaigns found");

    const campaigns = await response.json();
    console.log(campaigns);

    displayCampaigns(campaigns);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p style="color:red; text-align:center;">No campaigns found</p>`;
  }
}

function displayCampaigns(campaigns) {
  if (!campaigns.length) {
    container.innerHTML = `<p style="color:red; text-align:center;">No campaigns found</p>`;
    return;
  }

  container.innerHTML = campaigns
    .map(
      (c) => `
      <div class="campaign-card">
        <img class="campaign-image" src="${c.image}" alt="Campaign Image">
        <h2 class="campaign-title">${c.title}</h2>
        <p class="campaign-description">${c.description}</p>
        <div class="campaign-info">
          <p>Goal: <span>${c.goal}</span></p>
          <p>Deadline: <span>${c.deadline}</span></p>
          <p>Status: <span class="${
            c.isApproved ? "status-approved" : "status-pending"
          }">
            ${c.isApproved ? "Approved" : "Pending"}
          </span></p>
        </div>
        <div class="rewards">
          ${c.rewards
            .map(
              (r) => `
              <div class="reward">
                <span>${r.title}</span>
                <span>$${r.amount}</span>
              </div>
            `
            )
            .join("")}
        </div>
        <button class="btn btn-update" data-id="${
          c.id
        }">Update Campaign</button>
        <button class="btn btn-delete" data-id="${
          c.id
        }">Delete Campaign</button>
      </div>
    `
    )
    .join("");

  document.querySelectorAll(".btn-update").forEach((btn) => {
    btn.addEventListener("click", () => {
      const campaign = campaigns.find((x) => x.id == btn.dataset.id);
      openPopup(campaign);
    });
  });

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      if (confirm("Are you sure you want to delete this campaign?")) {
        const success = await deleteCampaignEle(id);
        if (success) {
          alert("campaign deleted successfully!");
          fetchUserCampaigns();
        } else {
          alert("error deleting campaign");
        }
      }
    });
  });
}

function openPopup(campaign) {
  const popup = document.createElement("div");
  popup.className = "popupUpdate";

  popup.innerHTML = `
    <div class="popupUpdate-content">
      <h3>Update Campaign</h3>

      <label>Title:
        <input type="text" id="title" value="${campaign.title}">
      </label>

      <label>Description:
        <textarea id="description">${campaign.description}</textarea>
      </label>

      <label>Goal:
        <input type="number" id="goal" value="${campaign.goal}">
      </label>

      <label>Deadline:
        <input type="date" id="deadline" value="${
          campaign.deadline.split("T")[0]
        }">
      </label>

      <label>Image:
        <input type="file" id="imageInput" accept="image/*">
      </label>
      <img id="imagePreview" src="${campaign.image}" 
           style="width:150px; margin-top:10px;" />

      <div class="rewards-edit">
        ${campaign.rewards
          .map(
            (r, i) => `
          <div class="reward-edit">
            <input type="text" id="reward-title-${i}" value="${r.title}">
            <input type="number" id="reward-amount-${i}" value="${r.amount}">
          </div>
        `
          )
          .join("")}
      </div>

      <div class="popupUpdate-buttons">
        <button id="save">Save</button>
        <button id="cancel">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      imagePreview.src = URL.createObjectURL(file);
    }
  });

  document.getElementById("cancel").onclick = () => popup.remove();
  document.getElementById("save").onclick = async () => {
    const updatedData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      goal: Number(document.getElementById("goal").value),
      deadline: document.getElementById("deadline").value,
      rewards: campaign.rewards.map((r, i) => ({
        id: r.id,
        title: document.getElementById(`reward-title-${i}`).value,
        amount: Number(document.getElementById(`reward-amount-${i}`).value),
      })),
      isApproved: false,
    };

    if (imageInput.files[0]) {
      updatedData.image = await toBase64(imageInput.files[0]);
    } else {
      updatedData.image = campaign.image;
    }

    await updateCampaign(campaign.id, updatedData);
    popup.remove();
    fetchUserCampaigns();
  };
}

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

async function updateCampaign(id, data) {
  try {
    const response = await fetch(`http://localhost:3001/campaigns/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update");
    alert("Campaign updated successfully! (Waiting admin approval)");
  } catch (err) {
    console.error(err);
    alert("error updating campaign");
  }
}

async function deleteCampaignEle(id) {
  try {
    const res = await deleteCampaign(id);
    if (!res.ok) throw new Error("Failed to delete campaign");
    return true;
  } catch (error) {
    console.error("error delete campaign :", error);
    return false;
  }
}

document.addEventListener("DOMContentLoaded", fetchUserCampaigns);
