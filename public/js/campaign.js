import { NavBar } from "./navbar.js";
import { addCampaign } from "./crudcampaign.js"; 
import { CampaignFooter } from "./footer.js"; 
CampaignFooter()

NavBar();

const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const goalInput = document.querySelector("#goal");
const deadlineInput = document.querySelector("#deadline");
const imageInput = document.querySelector("#image");
const campaignForm = document.querySelector("#campaignForm");
const formMessage = document.querySelector("#form-message");


function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}


function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}


function setInputError(input, message) {
  const errorDiv = input.parentElement.querySelector(".error-msg");
  if (message) {
    input.classList.add("input-error");
    if (errorDiv) errorDiv.textContent = message;
  } else {
    input.classList.remove("input-error");
    if (errorDiv) errorDiv.textContent = "";
  }
}


campaignForm.addEventListener("submit", async (e) => {
  e.preventDefault();


  setInputError(titleInput, "");
  setInputError(descriptionInput, "");
  setInputError(goalInput, "");
  setInputError(deadlineInput, "");
  formMessage.textContent = "";
  formMessage.className = "form-message";

  let hasError = false;


  if (!titleInput.value.trim()) {
    setInputError(titleInput, "Title is required");
    hasError = true;
  }
  if (!descriptionInput.value.trim()) {
    setInputError(descriptionInput, "Description is required");
    hasError = true;
  }
  if (!goalInput.value.trim() || parseFloat(goalInput.value) <= 0) {
    setInputError(goalInput, "Goal must be greater than 0");
    hasError = true;
  }
  if (deadlineInput.value && new Date(deadlineInput.value) < new Date()) {
    setInputError(deadlineInput, "Deadline must be in the future");
    hasError = true;
  }

  if (hasError) {
    showFormMessage("Please fix the errors above.", "error");
    return;
  }

  try {
    const userId = localStorage.getItem("userId") || "1"; 

    let base64Image = "";
    if (imageInput.files.length > 0) {
      base64Image = await toBase64(imageInput.files[0]);
    }


    const newCampaign = {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      goal: parseFloat(goalInput.value),
      deadline: deadlineInput.value || null,
      isApproved: false,
      creatorId: userId,
      rewards: [
        {
          id: Date.now(),
          title: "Early Bird",
          amount: 50,
        },
      ],
      image: base64Image,
      currentAmount: 0,
      createdAt: new Date().toISOString(),
    };


    const result = await addCampaign(newCampaign);
    console.log(result);

    if (result) {
      campaignForm.reset();
      showFormMessage("Campaign created successfully!", "success");
      console.log("New campaign:", result);
    } else {
      showFormMessage("Could not create campaign.", "error");
    }
  } catch (err) {
    console.error("Error adding campaign:", err);
    showFormMessage(
      "Something went wrong while creating the campaign.",
      "error"
    );
  }
});


[titleInput, descriptionInput, goalInput, deadlineInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (input.classList.contains("input-error") && input.value.trim()) {
      setInputError(input, "");
    }
  });
});
