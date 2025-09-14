import { NavBar } from "./navbar.js";
import { validateEmail } from "./data.js";
import { CampaignFooter } from "./footer.js"; 
CampaignFooter()

NavBar();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#login-form");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const emailMsg = document.querySelector("#email-msg");
  const passwordMsg = document.querySelector("#password-msg");
  const loginMsg = document.querySelector("#login-msg");

  function validateEmailInput() {
    if (!emailInput.value.trim()) {
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
      emailMsg.textContent = "Please enter your email";
      emailMsg.classList.add("error");
      return false;
    } else if (!validateEmail(emailInput.value.trim())) {
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
    if (!passwordInput.value.trim()) {
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
      passwordMsg.textContent = "Please enter your password";
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

  emailInput.addEventListener("input", validateEmailInput);
  passwordInput.addEventListener("input", validatePasswordInput);

  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("blur", () => {
      const msgEl = document.querySelector(`#${input.id}-msg`);
      if (input.classList.contains("is-valid") && msgEl) {
        input.classList.remove("is-invalid");
        msgEl.textContent = "";
        msgEl.classList.remove("error");
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const validEmail = validateEmailInput();
    const validPassword = validatePasswordInput();

    if (!validEmail || !validPassword) {
      loginMsg.textContent = "Please fix the errors above before login";
      loginMsg.classList.add("error");
      loginMsg.classList.remove("success");
      return;
    }

    loginMsg.textContent = "";
    loginMsg.classList.remove("error");

    const data = {
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        loginMsg.textContent = result;
        loginMsg.classList.add("error");
        return;
      }

      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("userName", result.user.name);
      localStorage.setItem("userIsActive", result.user.isActive);
      localStorage.setItem("role", result.user.role);

      localStorage.setItem("token", result.accessToken);
      loginMsg.textContent = "Login successful!";
      loginMsg.classList.add("success");

      setTimeout(() => {
        if (result.user.role === "admin") {
          window.location.href = "/pages/admin.html";
        } else {
          window.location.href = "/index.html";
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      loginMsg.textContent = "Network or server error";
      loginMsg.classList.add("error");
    }
  });
});
