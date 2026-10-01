/* =========================================================
   SMARTINTERN — POST INTERNSHIP
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PAGE ANIMATION
       ===================================================== */

    requestAnimationFrame(() => {
        document.body.classList.add("post-page-loaded");
    });


    /* =====================================================
       MOBILE SIDEBAR
       SAME BEHAVIOR AS COMPANY DASHBOARD
       ===================================================== */

    const mobileMenu = document.getElementById("mobileMenu");
    const sidebar = document.getElementById("dashboardSidebar");
    const overlay = document.getElementById("sidebarOverlay");


    function openSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.add("open");
        overlay.classList.add("active");

    }


    function closeSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("open");
        overlay.classList.remove("active");

    }


    if (mobileMenu) {

        mobileMenu.addEventListener("click", openSidebar);

    }


    if (overlay) {

        overlay.addEventListener("click", closeSidebar);

    }


    document
        .querySelectorAll(".sidebar-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                if (window.innerWidth <= 900) {
                    closeSidebar();
                }

            });

        });


    /* =====================================================
       NOTIFICATION PANEL
       SAME BEHAVIOR AS COMPANY DASHBOARD
       ===================================================== */

    const notificationButton =
        document.getElementById("notificationButton");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const closeNotifications =
        document.getElementById("closeNotifications");


    if (notificationButton && notificationPanel) {

        notificationButton.addEventListener("click", event => {

            event.stopPropagation();

            notificationPanel.classList.toggle("active");

        });

    }


    if (closeNotifications && notificationPanel) {

        closeNotifications.addEventListener("click", () => {

            notificationPanel.classList.remove("active");

        });

    }


    document.addEventListener("click", event => {

        if (
            notificationPanel &&
            notificationButton &&
            !notificationPanel.contains(event.target) &&
            !notificationButton.contains(event.target)
        ) {

            notificationPanel.classList.remove("active");

        }

    });


    /* =====================================================
       FORM ELEMENTS
       ===================================================== */

    const form =
        document.getElementById("internshipForm");

    if (!form) return;


    const fields = {

        title: {
            input: document.getElementById("internshipTitle"),
            error: document.getElementById("titleError"),
            message: "Please enter the internship title."
        },

        category: {
            input: document.getElementById("category"),
            error: document.getElementById("categoryError"),
            message: "Please select a category."
        },

        workType: {
            input: document.getElementById("workType"),
            error: document.getElementById("workTypeError"),
            message: "Please select the work type."
        },

        duration: {
            input: document.getElementById("duration"),
            error: document.getElementById("durationError"),
            message: "Please select the internship duration."
        },

        deadline: {
            input: document.getElementById("applicationDeadline"),
            error: document.getElementById("deadlineError"),
            message: "Please select an application deadline."
        },

        skills: {
            input: document.getElementById("skills"),
            error: document.getElementById("skillsError"),
            message: "Please enter the required skills."
        },

        description: {
            input: document.getElementById("description"),
            error: document.getElementById("descriptionError"),
            message: "Please enter the internship description."
        },

        requirements: {
            input: document.getElementById("requirements"),
            error: document.getElementById("requirementsError"),
            message: "Please enter the internship requirements."
        }

    };


    /* =====================================================
       CLEAR FIELD ERROR
       ===================================================== */

    function clearError(field) {

        if (!field || !field.input || !field.error) return;

        field.input.classList.remove("input-error");

        field.error.textContent = "";

    }


    /* =====================================================
       SHOW FIELD ERROR
       ===================================================== */

    function showError(field) {

        if (!field || !field.input || !field.error) return;

        field.input.classList.add("input-error");

        field.error.textContent = field.message;

    }


    /* =====================================================
       LIVE ERROR CLEARING
       ===================================================== */

    Object.values(fields).forEach(field => {

        if (!field.input) return;


        field.input.addEventListener("input", () => {

            if (field.input.value.trim() !== "") {
                clearError(field);
            }

        });


        field.input.addEventListener("change", () => {

            if (field.input.value.trim() !== "") {
                clearError(field);
            }

        });

    });


    /* =====================================================
       DATE
       DON'T ALLOW PAST DEADLINE
       ===================================================== */

    const deadline =
        document.getElementById("applicationDeadline");


    if (deadline) {

        const today =
            new Date().toISOString().split("T")[0];

        deadline.min = today;

    }


    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    form.addEventListener("submit", event => {

        event.preventDefault();


        let isValid = true;


        Object.values(fields).forEach(field => {

            if (!field.input) return;


            if (!field.input.value.trim()) {

                showError(field);

                isValid = false;

            } else {

                clearError(field);

            }

        });


        /* =================================================
           DEADLINE VALIDATION
           ================================================= */

        if (deadline && deadline.value) {

            const selectedDate =
                new Date(deadline.value);

            const today =
                new Date();

            today.setHours(0, 0, 0, 0);


            if (selectedDate < today) {

                fields.deadline.input.classList.add(
                    "input-error"
                );

                fields.deadline.error.textContent =
                    "Application deadline cannot be in the past.";

                isValid = false;

            }

        }


        if (!isValid) {

            const firstError =
                form.querySelector(".input-error");

            if (firstError) {

                firstError.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                firstError.focus();

            }

            return;

        }


        /* =================================================
           CURRENTLY FRONTEND ONLY
           BACKEND POST ROUTE NOT PROVIDED YET
           ================================================= */

        const successMessage =
            document.getElementById("formSuccess");


        if (successMessage) {

            successMessage.classList.add("show");

            successMessage.textContent =
                "All internship details are complete and ready to publish.";

        }


        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });


});