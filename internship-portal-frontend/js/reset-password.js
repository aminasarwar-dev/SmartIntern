document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("resetPasswordForm");

    const newPassword =
        document.getElementById("newPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const newPasswordError =
        document.getElementById("newPasswordError");

    const confirmPasswordError =
        document.getElementById("confirmPasswordError");


    /* ======================================================
       GET RESET TOKEN FROM URL
    ======================================================= */

    const urlParams = new URLSearchParams(window.location.search);

    const resetToken = urlParams.get("token");


    /* ======================================================
       SHOW / HIDE PASSWORD
    ======================================================= */

    document
        .querySelectorAll(".password-toggle")
        .forEach(button => {

            button.addEventListener("click", () => {

                const target =
                    document.getElementById(
                        button.dataset.target
                    );

                if (target.type === "password") {

                    target.type = "text";
                    button.textContent = "Hide";

                } else {

                    target.type = "password";
                    button.textContent = "Show";

                }

            });

        });


    /* ======================================================
       RESET PASSWORD
    ======================================================= */

    form.addEventListener("submit", async event => {

        event.preventDefault();

        newPasswordError.textContent = "";
        confirmPasswordError.textContent = "";


        const password =
            newPassword.value.trim();

        const confirm =
            confirmPassword.value.trim();


        /* ==================================================
           TOKEN CHECK
        ================================================== */

        if (!resetToken) {

            newPasswordError.textContent =
                "This password reset link is invalid or expired.";

            return;
        }


        /* ==================================================
           NEW PASSWORD REQUIRED
        ================================================== */

        if (!password) {

            newPasswordError.textContent =
                "New password is required.";

            return;
        }


        /* ==================================================
           CONFIRM PASSWORD REQUIRED
        ================================================== */

        if (!confirm) {

            confirmPasswordError.textContent =
                "Please confirm your new password.";

            return;
        }


        /* ==================================================
           PASSWORD MATCH
        ================================================== */

        if (password !== confirm) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            return;
        }


        /* ==================================================
           BACKEND RESET PASSWORD API
           
           Backend endpoint will be connected here
           after we confirm the actual backend route.
        ================================================== */

        console.log("Reset token:", resetToken);
        console.log("Password reset requested");


        /*
         * AFTER BACKEND SUCCESS:
         *
         * window.location.href = "login.html";
         */

    });

});