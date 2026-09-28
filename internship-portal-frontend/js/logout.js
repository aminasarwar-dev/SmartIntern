document.addEventListener("DOMContentLoaded", function () {

    const logoutLink = document.getElementById("logoutLink");

    if (logoutLink) {

        logoutLink.addEventListener("click", function (event) {

            event.preventDefault();

            const confirmLogout = confirm(
                "Are you sure you want to log out?"
            );

            if (confirmLogout) {

                sessionStorage.clear();

                localStorage.removeItem("smartInternUser");
                localStorage.removeItem("smartInternRole");

                window.location.href = "login.html";
            }

        });

    }

});