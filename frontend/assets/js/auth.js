/**
 * TravelBase Authentication & Account Management
 * Handles login, registration, CSRF validation, and password recovery.
 */

const AUTH_ERRORS = {
  invalid_credentials: "The email or password you entered is incorrect.",
  invalid_name: "Please enter your full name (1 to 120 characters).",
  invalid_email: "Please enter a valid email address.",
  invalid_phone: "Please enter a valid telephone number.",
  weak_password: "Password must be at least 8 characters long.",
  password_mismatch: "The entered passwords do not match. Please verify.",
  email_exists: "An account with this email address already exists.",
};

/**
 * Fetch a fresh CSRF token from the backend
 */
async function getCsrfToken() {
  try {
    const res = await fetch("/csrf-token", { credentials: "same-origin" });
    if (!res.ok) throw new Error("Security verification failed.");
    const data = await res.json();
    return data.token;
  } catch (err) {
    console.error("Unable to retrieve CSRF token:", err);
    return null;
  }
}

/**
 * Handle form submission to Flask auth endpoints
 */
async function submitAuthForm(form, messageBox) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : "Submit";

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Please wait...`;
    }

    const token = await getCsrfToken();
    if (!token) {
      throw new Error("Unable to establish a secure connection. Please verify the server is running.");
    }

    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        "X-CSRF-Token": token,
      },
      credentials: "same-origin",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error("The request could not be processed. Please check your network and try again.");
    }

    // Check if the server redirected with an error query param
    const destinationUrl = new URL(response.url);
    const errorCode = destinationUrl.searchParams.get("error");

    if (errorCode && AUTH_ERRORS[errorCode]) {
      showMessage(messageBox, AUTH_ERRORS[errorCode], "error");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
      return;
    }

    // Success — redirect user to their dashboard
    window.location.assign(response.url);

  } catch (error) {
    console.error("Authentication error:", error);
    showMessage(
      messageBox,
      error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
      "error",
    );
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  }
}

/**
 * Attach validation and submit listener to an auth form
 */
function setupAuthForm(form) {
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const messageBox = document.querySelector("#form-message");

    if (!form.reportValidity()) {
      showMessage(messageBox, "Please fill in all required fields accurately.", "error");
      return;
    }

    // Registration specific validation
    if (form.id === "register-form") {
      const password = form.elements.namedItem("password");
      const confirmPassword = form.elements.namedItem("confirmPassword");

      if (password && (password.value.length < 8 || password.value.length > 128)) {
        showMessage(messageBox, "Password must be between 8 and 128 characters.", "error");
        password.focus();
        return;
      }

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        showMessage(messageBox, "The passwords do not match. Please verify.", "error");
        confirmPassword.focus();
        return;
      }
    }

    submitAuthForm(form, messageBox);
  });
}

/**
 * Handle "Forgot password" demo helper
 */
function setupPasswordRecoveryLink() {
  const link = document.querySelector("#forgot-password");
  if (!link) return;

  link.addEventListener("click", (event) => {
    event.preventDefault();
    const messageBox = document.querySelector("#form-message");
    showMessage(
      messageBox,
      "Password recovery instructions have been sent if an active account is associated with this email.",
      "success",
    );
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  setupAuthForm(document.querySelector("#login-form"));
  setupAuthForm(document.querySelector("#register-form"));
  setupPasswordRecoveryLink();

  // Surface any server-passed error in URL params
  const errorCode = new URLSearchParams(window.location.search).get("error");
  if (errorCode && AUTH_ERRORS[errorCode]) {
    const messageBox = document.querySelector("#form-message");
    showMessage(messageBox, AUTH_ERRORS[errorCode], "error");
  }
});
