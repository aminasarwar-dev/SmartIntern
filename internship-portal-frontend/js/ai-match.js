document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       MOBILE SIDEBAR
    ========================= */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.querySelector(".dashboard-sidebar");


    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle("open");

            }
        );

    }



    /* =========================
       AI SCORE ANIMATION
    ========================= */

    const score =
        document.getElementById("overallScore");


    if (score) {

        let current = 0;

        const target = 94;

        const duration = 900;

        const startTime = performance.now();


        function animateScore(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            current =
                Math.floor(
                    progress * target
                );

            score.textContent =
                current + "%";


            if (progress < 1) {

                requestAnimationFrame(
                    animateScore
                );

            }

        }


        requestAnimationFrame(
            animateScore
        );

    }



    /* =========================
       MATCH FILTER
    ========================= */

    const filter =
        document.getElementById("matchFilter");

    const cards =
        document.querySelectorAll(".match-card");


    if (filter) {

        filter.addEventListener(
            "change",
            function () {

                const selected =
                    filter.value;


                cards.forEach(
                    function (card) {

                        const match =
                            Number(
                                card.dataset.match
                            );


                        if (selected === "all") {

                            card.classList.remove(
                                "hidden"
                            );

                        }


                        else if (
                            selected === "high"
                        ) {

                            if (match >= 90) {

                                card.classList.remove(
                                    "hidden"
                                );

                            } else {

                                card.classList.add(
                                    "hidden"
                                );

                            }

                        }


                        else if (
                            selected === "medium"
                        ) {

                            if (
                                match >= 80 &&
                                match < 90
                            ) {

                                card.classList.remove(
                                    "hidden"
                                );

                            } else {

                                card.classList.add(
                                    "hidden"
                                );

                            }

                        }

                    }
                );

            }
        );

    }



    /* =========================
       NOTIFICATION BUTTON
    ========================= */

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                alert(
                    "You have 3 new internship notifications."
                );

            }
        );

    }



    /* =========================
       LOGOUT
       SAME EXISTING PROJECT LOGIC
    ========================= */

    const logoutLink =
        document.getElementById("logoutLink");


    if (logoutLink) {

        logoutLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmLogout) {

                    window.location.href =
                        "login.html";

                }

            }
        );

    }

});