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
            newPassword.value;

        const confirm =
            confirmPassword.value;


        /* New password required */

        if (!password) {

            newPasswordError.textContent =
                "New password is required.";

            return;

        }


        /* Confirm password required */

        if (!confirm) {

            confirmPasswordError.textContent =
                "Please confirm your new password.";

            return;

        }


        /* Password match */

        if (password !== confirm) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            return;

        }


        /*
         * BACKEND RESET PASSWORD API
         * will be connected here.
         */

        console.log("Password reset requested");


        /*
         * After successful backend response:
         *
         * window.location.href = "login.html";
         */

    });

});