<<<<<<< Updated upstream
async function submitToFlask(form, url, message) {
  try {
    const tokenResponse = await fetch("/csrf-token", { credentials: "same-origin" });
    const { token } = await tokenResponse.json();
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRF-Token": token,
      },
      body: new URLSearchParams(new FormData(form)),
    });
    if (new URL(response.url).searchParams.has("error")) {
      showMessage(message, "That didn't work. Check your details and try again.", "error");
      return;
    }
    window.location.href = response.url;
  } catch (error) {
    showMessage(message, "Could not reach the server. Is it running?", "error");
  }
}

function setupRegistrationForm() {
  const form = document.querySelector("#register-form");
=======
const authErrors = {
  invalid_credentials: "The email or password is incorrect.",
  invalid_name: "Enter a name using 1 to 120 characters.",
  invalid_email: "Enter a valid email address.",
  invalid_phone: "Enter a valid phone number.",
  weak_password: "Use a password between 8 and 128 characters.",
  password_mismatch: "The passwords do not match.",
  email_exists: "An account already uses that email address.",
};
>>>>>>> Stashed changes

async function submitAuthForm(form, message) {
  try {
    const tokenResponse = await fetch("/csrf-token", {
      credentials: "same-origin",
    });
    if (!tokenResponse.ok) {
      throw new Error("Unable to start a secure session.");
    }

    const { token } = await tokenResponse.json();
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "X-CSRF-Token": token },
      credentials: "same-origin",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error("The request could not be completed. Please try again.");
    }

<<<<<<< Updated upstream
    submitToFlask(form, "/register", message);
  });
}

function setupLoginForm() {
  const form = document.querySelector("#login-form");

=======
    window.location.assign(response.url);
  } catch (error) {
    console.error("Authentication request failed.", error);
    showMessage(
      message,
      error instanceof Error
        ? error.message
        : "The request could not be completed. Please try again.",
      "error",
    );
  }
}

function setupAuthForm(form) {
>>>>>>> Stashed changes
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = document.querySelector("#form-message");
<<<<<<< Updated upstream

    if (!form.reportValidity()) {
      showMessage(
        message,
        "Enter a valid email address and password to continue.",
        "error",
      );
      return;
    }

    submitToFlask(form, "/login", message);
=======
    if (!form.reportValidity()) {
      showMessage(message, "Please check the required fields.", "error");
      return;
    }

    if (form.id === "register-form") {
      const password = form.elements.namedItem("password");
      const confirmPassword = form.elements.namedItem("confirmPassword");
      if (password.value.length < 8 || password.value.length > 128) {
        showMessage(message, "Use a password between 8 and 128 characters.", "error");
        password.focus();
        return;
      }
      if (password.value !== confirmPassword.value) {
        showMessage(message, "The passwords do not match.", "error");
        confirmPassword.focus();
        return;
      }
    }

    submitAuthForm(form, message);
>>>>>>> Stashed changes
  });
}

function setupPasswordRecoveryLink() {
  const link = document.querySelector("#forgot-password");

  if (!link) {
    return;
  }

  link.addEventListener("click", (event) => {
    event.preventDefault();
    showMessage(
      document.querySelector("#form-message"),
      "Password recovery will be available when the account service is connected.",
      "error",
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupAuthForm(document.querySelector("#register-form"));
  setupAuthForm(document.querySelector("#login-form"));
  setupPasswordRecoveryLink();

  const errorCode = new URLSearchParams(location.search).get("error");
  if (errorCode && authErrors[errorCode]) {
    showMessage(
      document.querySelector("#form-message"),
      authErrors[errorCode],
      "error",
    );
  }
});
