import { getCampaignById } from "./crudcampaign.js";
import { NavBar } from "./navbar.js";
import { CampaignFooter } from "./footer.js"; 
CampaignFooter()


NavBar();

const user = localStorage.getItem("userId");
const userId = Number(user);

console.log(typeof (userId) );

const container = document.getElementById("pledges-container");

async function getPledges() {
  try {
    const res = await fetch(`http://localhost:3001/pledges?Id=${userId}`);
    const pledges = await res.json();
    console.log("Pledges:", pledges);

    if (!pledges.length) {
      container.innerHTML = `<p>No pledges found for this user.</p>`;
      return;
    }
    
    pledges.forEach(async(p) => {

      const acmpData =await getCampaignById(p.campaignId)
      
    
      const card = document.createElement("div");
      card.className = "pledge-card";

      card.innerHTML = `
      <img class="campImage" src ="${acmpData.image}">
        <p class="amount"><strong>Amount:</strong> $${p.amount}</p>
        <p class="date"><strong>Date:</strong> ${new Date(
          p.date
        ).toLocaleString()}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching pledges:", err);
    container.innerHTML = `<p style="color:red;">Error loading pledges.</p>`;
  }
}

getPledges();
