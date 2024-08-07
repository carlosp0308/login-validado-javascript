document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const emailError = document.getElementById("errorEmail");
    const passwordError = document.getElementById("errorPassword");
    const confirmPasswordError = document.getElementById("errorConfirmPassword");
    const showHideButton = document.getElementById("show-hide");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        validateForm();
    })

    emailInput.addEventListener("blur", function() {
        validateEmail(emailError);
    })

    emailInput.addEventListener("change", function() {
        clearError(emailError);
    })

    passwordInput.addEventListener("change", function() {
        clearError(passwordError);
    })

    confirmPasswordInput.addEventListener("change", function() {
        clearError(confirmPasswordError);
    })

    showHideButton.addEventListener("click", function() {
        if(passwordInput.type == "password") {
            passwordInput.type = "text";
            confirmPasswordInput.type = "text";
        } else {
            passwordInput.type = "password";
            confirmPasswordInput.type = "password";
        }
    })

    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if(isValidEmail && isValidPassword && passwordMatch) {
            saveToLocalStorage();
            alert("Has ingresado con exito");
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim();
        
        if(!emailRegex.test(emailValue)) {
            showError(emailError, "Ingresa un mail valido");
            return false;
        }
        
        return true;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();

        if(passwordValue.length < 6) {
            showError(passwordError, "Ingresa una contraseña de al menos 6 caracteres");
            return false
        }

        return true;
    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if(passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError, "Las contraseñas no coinciden");
            return false;
        }

        return true;
    }

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = "block";
    }

    function clearError(errorElement) {
        errorElement.style.display = "none";
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem("email", emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }

    function bodyBuilderJSON () {
        return {
            "email": emailInput.value,
            "password": passwordInput.value
        }
    }
})