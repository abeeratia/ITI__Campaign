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
            <td>${campaign.isApproved ? "Approved" : "Not Approved"}</td>

            <td>
                <button id="approveBtn${campaign.id}" data-id="${campaign.id}" 
                  class="btn-approve">
                  ${campaign.isApproved ? "Approved" : "Approve"}
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
        const approvedStatus = campaign.isApproved ? false : true;

        const res = await updateCampaign(campaignId, {
          isApproved: approvedStatus,
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
          "Are you sure you want to delete this campaign?"
        );
        if (confirmed) {
          const res = await deleteCampaign(campaignId);
          if (res) {
            row.remove(); 
          } else {
            alert("Failed to delete campaign!");
          }
        }
      });
  });
});
