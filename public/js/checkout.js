import { getCampaignById, updateCampaign } from "./crudcampaign.js";
import { NavBar } from "./navbar.js";
import {protectRoute}from './protectrout.js'
import { CampaignFooter } from "./footer.js";
CampaignFooter();
protectRoute();
NavBar();

const hash = location.hash.split("#");

const campaignId = hash[1];
const rewardId = hash[2];

const userId = localStorage.getItem("userId");

const nameInput = document.getElementById("name");
const cardNumberInput = document.getElementById("cardNumber");
const expiryInput = document.getElementById("expiry");
const cvvInput = document.getElementById("cvv");
const payMent = document.getElementById("payMent");

const nameError = document.getElementById("name-error");
const cardError = document.getElementById("cardNumber-error");
const expiryError = document.getElementById("expiry-error");
const cvvError = document.getElementById("cvv-error");
const generalMsg = document.getElementById("general-msg");

payMent.addEventListener("click", async (e) => {
  e.preventDefault();

  nameError.textContent = "";
  cardError.textContent = "";
  expiryError.textContent = "";
  cvvError.textContent = "";
  generalMsg.textContent = "";

  let valid = true;

  if (nameInput.value === "") {
    nameError.textContent = "Name is required";
    nameInput.classList.add("is-invalid");
    valid = false;
  } else {
    nameInput.classList.add("is-valid");
  }

  if (cardNumberInput.value === "") {
    cardError.textContent = "Card number is required";
    cardNumberInput.classList.add("is-invalid");
    valid = false;
  } else {
    cardNumberInput.classList.add("is-valid");
  }

  if (expiryInput.value === "") {
    expiryError.textContent = "Expiry date is required";
    expiryInput.classList.add("is-invalid");
    valid = false;
  } else {
    expiryInput.classList.add("is-valid");
  }

  if (cvvInput.value === "") {
    cvvError.textContent = "CVV is required";
    cvvInput.classList.add("is-invalid");
    valid = false;
  } else {
    cvvInput.classList.add("is-valid");
  }

  if (!valid) {
    generalMsg.textContent = "Please fix the errors above.";
    return;
  }

  const campaign = await getCampaignById(campaignId);

  const reward = campaign?.rewards.find((r) => r.id == rewardId);

  if (!reward) {
    generalMsg.textContent = "Reward not found!";
    return;
  }
  const confirmPay = confirm(
    `Are you sure you want to pay $${reward.amount} for this campaign?`
  );

  if (!confirmPay) {
  generalMsg.textContent = "Payment cancelled by user.";
    return;
  }

  const pledges = {
    campaignId: campaignId,
    userId: userId,
    rewardId: rewardId,
    amount: reward.amount,
    date: new Date().toISOString(),
  };
 
  try {
    const response = await fetch(`http://localhost:3001/pledges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pledges),
    });
    
    
   
    const campaign= await getCampaignById(campaignId);
    const newAmount = campaign.currentAmount + reward.amount;
    
    await updateCampaign(campaignId, { currentAmount: newAmount });



    if (response.ok) {
      generalMsg.textContent = "Payment processed successfully!";
      window.location.href = "./../index.html";
    } else {
      generalMsg.textContent = "Error processing payment!";
    }
  } catch (error) {
    console.error("Error:", error);
    generalMsg.textContent = "Something went wrong!";
  }
});
