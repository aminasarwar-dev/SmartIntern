document.addEventListener("DOMContentLoaded", function () {

    const logoutLink = document.getElementById("logoutLink");

    if (!logoutLink) {
        return;
    }


    /* =====================================================
       CREATE LOGOUT MODAL
       ===================================================== */

    const modal = document.createElement("div");

    modal.className = "logout-modal";

    modal.innerHTML = `
        <div class="logout-modal-box" role="dialog" aria-modal="true">

            <h2>
                Are you sure <em>to logout?</em>
            </h2>

            <p>
                You will be signed out of your SmartIntern account.
            </p>

            <div class="logout-modal-actions">

                <button
                    type="button"
                    class="logout-modal-btn logout-cancel-btn"
                    id="logoutCancelBtn">
                    Cancel
                </button>

                <button
                    type="button"
                    class="logout-modal-btn logout-confirm-btn"
                    id="logoutConfirmBtn">
                    Logout
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    /* =====================================================
       BUTTONS
       ===================================================== */

    const cancelBtn = document.getElementById("logoutCancelBtn");
    const confirmBtn = document.getElementById("logoutConfirmBtn");


    /* =====================================================
       OPEN MODAL
       ===================================================== */

    function openLogoutModal() {

        modal.classList.add("show");

        document.body.style.overflow = "hidden";
    }


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeLogoutModal() {

        modal.classList.remove("show");

        document.body.style.overflow = "";
    }


    /* =====================================================
       LOGOUT LINK
       ===================================================== */

    logoutLink.addEventListener("click", function (event) {

        event.preventDefault();

        openLogoutModal();

    });


    /* =====================================================
       CANCEL
       ===================================================== */

    cancelBtn.addEventListener("click", function () {

        closeLogoutModal();

    });


    /* =====================================================
       CONFIRM LOGOUT
       ===================================================== */

    confirmBtn.addEventListener("click", function () {

        // Clear current session
        sessionStorage.clear();

        // Remove SmartIntern login information
        localStorage.removeItem("smartInternUser");
        localStorage.removeItem("smartInternRole");

        // Go back to login page
        window.location.href = "login.html";

    });


    /* =====================================================
       CLICK OUTSIDE MODAL
       ===================================================== */

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeLogoutModal();

        }

    });


    /* =====================================================
       ESC KEY
       ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeLogoutModal();

        }

    });

});