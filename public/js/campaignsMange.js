import { AdminSidebar } from "./admin.js";
import {
  getAllCampaigns,
  updateCampaign,
  deleteCampaign,
} from "./crudcampaign.js";

AdminSidebar();

const tableBody = document.getElementById("table-body");

window.addEventListener("DOMContentLoaded", async () => {
  const data = await getAllCampaigns();
  console.log(data);

  data.forEach((campaign) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${campaign.id}</td>
            <td>${campaign.title}</td>
            <td><img src="${campaign.image}" alt="${campaign.name}" /></td>
            <td>${campaign.description}</td>
            <td>${campaign.goal}</td>
            <td>${campaign.deadline}</td>
            <td>
              <span class="status ${
                campaign.isApproved ? "approved" : "not-approved"
              }">
                ${campaign.isApproved ? "Approved" : "Not Approved"}
              </span>
            </td>
            <td>
                <button id="approveBtn${campaign.id}" data-id="${campaign.id}" 
                  class="btn-approve">
                  ${campaign.isApproved ? "Unapprove" : "Approve"}
                </button>
                <button id="deleteBtn${campaign.id}" data-id="${campaign.id}" 
                  class="btn-delete">
                  Delete
                </button>
            </td>
        `;
    tableBody.appendChild(row);

    document
      .getElementById(`approveBtn${campaign.id}`)
      .addEventListener("click", async () => {
        const campaignId = campaign.id;
        const newStatus = !campaign.isApproved;

        const res = await updateCampaign(campaignId, {
          isApproved: newStatus,
        });
        if (res) {
          window.location.reload();
        }
      });

    document
      .getElementById(`deleteBtn${campaign.id}`)
      .addEventListener("click", async () => {
        const campaignId = campaign.id;
        const confirmed = confirm(
          "are you sure you want to delete this campaign?"
        );
        if (confirmed) {
          const res = await deleteCampaign(campaignId);
          if (res) {
            row.remove();
          } else {
            alert("error for delete campaign");
          }
        }
      });
  });
});
