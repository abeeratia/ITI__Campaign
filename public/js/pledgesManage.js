import { AdminSidebar } from "./admin.js";
import { getCampaignById } from "./crudcampaign.js";

AdminSidebar();
const tableBody = document.getElementById("table-body");

window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(`http://localhost:3001/pledges`);
  const pledges = await response.json();
  console.log(pledges);

  pledges.map(async (pledge) => {
    const campaign = await getCampaignById(pledge.campaignId);
    console.log(campaign);

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${pledge.id}</td>
        <td>${campaign.title}</td>
        <td><img src="${campaign.image}" alt="${campaign.title}" /></td>
        <td>${campaign.description}</td>
        <td>${campaign.goal}</td>
        <td>${campaign.deadline}</td>
        <td>${pledge.amount}</td>
        <td>${localStorage.getItem("userName")}</td>
    `;
    tableBody.appendChild(row);
  });
});
