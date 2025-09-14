export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateName(name) {
  const nameValue = name.trim();
  const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;

  if (!nameValue) return { valid: false, msg: "Please enter your full name" };
  if (!nameRegex.test(nameValue))
    return { valid: false, msg: "Name cannot contain numbers or symbols" };

  return { valid: true, msg: "" };
}

export function showMessage(element, message, type = "error") {
  element.textContent = message;
  element.classList.remove("error", "success");
  element.classList.add(type);
}

export function clearMessage(element) {
  element.textContent = "";
  element.classList.remove("error", "success");
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}
