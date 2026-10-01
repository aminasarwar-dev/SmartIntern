document.addEventListener("DOMContentLoaded", () => {

    const forgotPasswordForm =
        document.getElementById("forgotPasswordForm");

    const newPasswordForm =
        document.getElementById("newPasswordForm");

    const accountRole =
        document.getElementById("accountRole");

    const resetEmail =
        document.getElementById("resetEmail");

    const resetEmailError =
        document.getElementById("resetEmailError");

    const newPassword =
        document.getElementById("newPassword");

    const confirmNewPassword =
        document.getElementById("confirmNewPassword");

    const newPasswordError =
        document.getElementById("newPasswordError");

    const confirmNewPasswordError =
        document.getElementById("confirmNewPasswordError");


    /* ======================================================
       ROLE SWITCH
    ======================================================= */

    const roleOptions =
        document.querySelectorAll(".role-option");

    roleOptions.forEach(button => {

        button.addEventListener("click", () => {

            roleOptions.forEach(option => {
                option.classList.remove("active");
            });

            button.classList.add("active");

            accountRole.value =
                button.dataset.role;

        });

    });


    /* ======================================================
       PASSWORD SHOW / HIDE
    ======================================================= */

    document
        .querySelectorAll(".password-toggle")
        .forEach(button => {

            button.addEventListener("click", () => {

                const targetId =
                    button.dataset.target;

                const input =
                    document.getElementById(targetId);

                if (!input) return;

                if (input.type === "password") {

                    input.type = "text";

                    button.textContent = "Hide";

                } else {

                    input.type = "password";

                    button.textContent = "Show";

                }

            });

        });


    /* ======================================================
       STEP 1 — CHECK EMAIL
    ======================================================= */

    forgotPasswordForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            resetEmailError.textContent = "";

            const email =
                resetEmail.value.trim();

            const role =
                accountRole.value;


            if (!email) {

                resetEmailError.textContent =
                    "Email address is required.";

                return;

            }


            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

                resetEmailError.textContent =
                    "Please enter a valid email address.";

                return;

            }


            /*
             * BACKEND ROUTE WILL BE CONNECTED HERE.
             *
             * Example later:
             *
             * await apiJsonRequest(
             *     "/student/forgot-password",
             *     { email }
             * );
             *
             * OR company endpoint.
             */


            try {

                /*
                 * Temporary frontend flow.
                 *
                 * Once backend route is ready,
                 * replace this with actual API call.
                 */

                console.log(
                    "Checking account:",
                    role,
                    email
                );


                /* Move to new password step */

                forgotPasswordForm.classList.add("hidden");

                newPasswordForm.classList.remove("hidden");

            } catch (error) {

                resetEmailError.textContent =
                    error.message;

            }

        }
    );


    /* ======================================================
       STEP 2 — NEW PASSWORD
    ======================================================= */

    newPasswordForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            newPasswordError.textContent = "";

            confirmNewPasswordError.textContent = "";


            const password =
                newPassword.value;

            const confirmPassword =
                confirmNewPassword.value;


            if (!password) {

                newPasswordError.textContent =
                    "New password is required.";

                return;

            }


            if (!confirmPassword) {

                confirmNewPasswordError.textContent =
                    "Please confirm your new password.";

                return;

            }


            if (password !== confirmPassword) {

                confirmNewPasswordError.textContent =
                    "Passwords do not match.";

                return;

            }


            /*
             * BACKEND RESET PASSWORD API
             * WILL BE CONNECTED HERE.
             */


            console.log(
                "Password reset request:",
                accountRole.value,
                resetEmail.value.trim()
            );


            /*
             * After successful backend response:
             *
             * window.location.href = "login.html";
             */

        }
    );

});