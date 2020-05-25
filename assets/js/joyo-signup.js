"use strict";

(function () {
  var url = "https://bono.joyo.fit/api/joyo-interest";
  var joyoForm = document.getElementById("joyo-signup-form");
  if (joyoForm) initJoyoSignup(joyoForm);

  function initJoyoSignup(joyoForm) {
    var fieldset = document.getElementById("joyo-signup-fieldset");
    var emailInput = document.getElementById("joyo-email-input");
    var emailError = document.getElementById("joyo-email-error");
    var hpInput = document.getElementById("joyo-password-input");

    joyoForm.addEventListener("submit", handleSubmit);

    function handleSubmit(event) {
      event.preventDefault();
      if (hpInput.value) return;

      disableForm(true);

      var email = emailInput.value.trim();
      var validationError = validateEmail(email);
      updateValidationError(validationError);

      if (!validationError) {
        setTimeout(function () {
          sendRequest(email);
        }, 500);
      } else {
        disableForm(false);
      }
    }

    function validateEmail(email) {
      if (!email) return "☝️ Milyen email címen érhetünk el?";
      if (!isValidEmail(email)) return "☝️ Hibás email cím. Kérlek javítsd.";
    }

    function isValidEmail(email) {
      if (email.length > 320) return false;
      var emailRegExp = /.+@.+\..+/i;
      return emailRegExp.test(email);
    }

    function updateValidationError(validationError) {
      emailError.innerText = validationError || "";
    }

    function disableForm(shouldBeDisabled) {
      if (shouldBeDisabled) fieldset.setAttribute("disabled", "");
      else fieldset.removeAttribute("disabled");
    }

    function showSuccess() {
      const successBox = document.createElement("div");
      successBox.className = "c-FormMessage";
      successBox.innerHTML =
        "<strong>Köszönjük</strong> ❤️<br>Hamarosan&nbsp;jelentkezünk.";
      joyoForm.parentNode.appendChild(successBox);
      joyoForm.style.display = "none";
    }

    function sendRequest(email) {
      axios
        .post(url, { email: email })
        .then(function (response) {
          showSuccess();
        })
        .catch(function (error) {
          var errorMessage =
            "⚡️ Hálózati probléma miatt a regisztráció nem sikerült. Kérlek próbáld meg később.";
          updateValidationError(errorMessage);
          console.error(error);
        })
        .then(function () {
          disableForm(false);
        });
    }
  }
})();
