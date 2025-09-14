import { NavBar } from "./navbar.js";
import { validateEmail, validateName } from "./data.js";
import { CampaignFooter } from "./footer.js";
CampaignFooter();

NavBar();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".register__form");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const confirmpasswordInput = document.querySelector("#confirmpassword");

  const nameMsg = document.querySelector("#name-msg");
  const emailMsg = document.querySelector("#email-msg");
  const passwordMsg = document.querySelector("#password-msg");
  const confirmpasswordMsg = document.querySelector("#confirmpassword-msg");
  const generalMsg = document.querySelector("#message");

  function validateNameInput() {
    const nameValue = nameInput.value.trim();
    let error = "";

    if (nameValue.length < 3) {
      error = "Name must be at least 3 characters";
    } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      error = "Name must contain only letters";
    }

    if (error) {
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
      nameMsg.textContent = error;
      nameMsg.classList.add("error");
      return false;
    } else {
      nameInput.classList.add("is-valid");
      nameInput.classList.remove("is-invalid");
      nameMsg.textContent = "";
      nameMsg.classList.remove("error");
      return true;
    }
  }

  function validateEmailInput() {
    if (!validateEmail(emailInput.value.trim())) {
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
      emailMsg.textContent = "Enter a valid email";
      emailMsg.classList.add("error");
      return false;
    } else {
      emailInput.classList.add("is-valid");
      emailInput.classList.remove("is-invalid");
      emailMsg.textContent = "";
      emailMsg.classList.remove("error");
      return true;
    }
  }

  function validatePasswordInput() {
    const password = passwordInput.value;
    const errors = [];
    if (password.length < 6) errors.push("at least 6 characters");
    if (!password.includes("@")) errors.push("contain '@'");

    if (errors.length > 0) {
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
      passwordMsg.textContent = "Password must " + errors.join(" and ");
      passwordMsg.classList.add("error");
      return false;
    } else {
      passwordInput.classList.add("is-valid");
      passwordInput.classList.remove("is-invalid");
      passwordMsg.textContent = "";
      passwordMsg.classList.remove("error");
      return true;
    }
  }

  function validateConfirmPasswordInput() {
    if (
      passwordInput.value !== confirmpasswordInput.value ||
      confirmpasswordInput.value === ""
    ) {
      confirmpasswordInput.classList.add("is-invalid");
      confirmpasswordInput.classList.remove("is-valid");
      confirmpasswordMsg.textContent = "Passwords do not match";
      confirmpasswordMsg.classList.add("error");
      return false;
    } else {
      confirmpasswordInput.classList.add("is-valid");
      confirmpasswordInput.classList.remove("is-invalid");
      confirmpasswordMsg.textContent = "";
      confirmpasswordMsg.classList.remove("error");
      return true;
    }
  }

  nameInput.addEventListener("input", validateNameInput);
  emailInput.addEventListener("input", validateEmailInput);
  passwordInput.addEventListener("input", validatePasswordInput);
  confirmpasswordInput.addEventListener("input", validateConfirmPasswordInput);

  [nameInput, emailInput, passwordInput, confirmpasswordInput].forEach(
    (input) => {
      input.addEventListener("blur", () => {
        if (input.classList.contains("is-valid")) {
          input.classList.remove("is-invalid");
          const msgEl = document.querySelector(`#${input.id}-msg`);
          if (msgEl) {
            msgEl.textContent = "";
            msgEl.classList.remove("error");
          }
        }
      });
    }
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    generalMsg.textContent = "";
    generalMsg.classList.remove("error", "success");

    const validName = validateNameInput();
    const validEmail = validateEmailInput();
    const validPassword = validatePasswordInput();
    const validConfirm = validateConfirmPasswordInput();

    if (!validName || !validEmail || !validPassword || !validConfirm) return;

    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
      role: "user",
      isActive: false,
    };

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        generalMsg.textContent = result;
        generalMsg.classList.add("error");
        return;
      }

      localStorage.setItem("token", result.accessToken);

      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("userName", result.user.name);
      localStorage.setItem("userIsActive", result.user.isActive);
      localStorage.setItem("userIsRole", result.user.role);

      generalMsg.textContent = "Registration successful!";
      generalMsg.classList.add("success");

      form.reset();
      [nameInput, emailInput, passwordInput, confirmpasswordInput].forEach(
        (input) => input.classList.remove("is-valid", "is-invalid")
      );
      [nameMsg, emailMsg, passwordMsg, confirmpasswordMsg].forEach(
        (msg) => (msg.textContent = "")
      );

      setTimeout(() => (location.href = "/pages/login.html"), 1000);
    } catch (err) {
      console.error(err);
      generalMsg.textContent = "Network or server error";
      generalMsg.classList.add("error");
    }
  });
});
