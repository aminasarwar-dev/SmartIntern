/* =========================================================
   SMARTINTERN
   STUDENT — BROWSE INTERNSHIPS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const sidebar =
        document.getElementById("dashboardSidebar");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const notificationButton =
        document.getElementById("notificationButton");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const closeNotifications =
        document.getElementById("closeNotifications");

    const searchInput =
        document.getElementById("internshipSearch");

    const searchButton =
        document.getElementById("searchButton");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const locationFilter =
        document.getElementById("locationFilter");

    const durationFilter =
        document.getElementById("durationFilter");

    const cards =
        document.querySelectorAll(".browse-card");

    const resultsCount =
        document.getElementById("resultsCount");

    const noResults =
        document.getElementById("noResults");



    /* =====================================================
       MOBILE SIDEBAR
       ===================================================== */

    function openSidebar() {

        sidebar.classList.add("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("show");
        }

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("show");
        }

    }


    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            openSidebar
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }



    /* =====================================================
       NOTIFICATIONS
       ===================================================== */

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                notificationPanel.classList.toggle(
                    "show"
                );

            }
        );

    }


    if (closeNotifications) {

        closeNotifications.addEventListener(
            "click",
            () => {

                notificationPanel.classList.remove(
                    "show"
                );

            }
        );

    }



    document.addEventListener(
        "click",
        (event) => {

            if (
                notificationPanel &&
                notificationButton &&
                !notificationPanel.contains(event.target) &&
                !notificationButton.contains(event.target)
            ) {

                notificationPanel.classList.remove(
                    "show"
                );

            }

        }
    );



    /* =====================================================
       FILTER STATE
       ===================================================== */

    let activeType = "all";



    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    btn =>
                        btn.classList.remove("active")
                );

                button.classList.add("active");

                activeType =
                    button.dataset.filter;

                filterInternships();

            }
        );

    });



    /* =====================================================
       SEARCH
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterInternships
        );

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            filterInternships
        );

    }



    /* =====================================================
       SELECT FILTERS
       ===================================================== */

    if (locationFilter) {

        locationFilter.addEventListener(
            "change",
            filterInternships
        );

    }


    if (durationFilter) {

        durationFilter.addEventListener(
            "change",
            filterInternships
        );

    }



    /* =====================================================
       FILTER FUNCTION
       ===================================================== */

    function filterInternships() {

        const searchValue =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";

        const selectedLocation =
            locationFilter
                ? locationFilter.value
                : "all";

        const selectedDuration =
            durationFilter
                ? durationFilter.value
                : "all";


        let visibleCount = 0;


        cards.forEach(card => {

            const type =
                card.dataset.type;

            const location =
                card.dataset.location;

            const duration =
                card.dataset.duration;

            const searchableText =
                card.dataset.search
                    .toLowerCase();


            const matchesType =
                activeType === "all" ||
                type === activeType;


            const matchesLocation =
                selectedLocation === "all" ||
                location === selectedLocation;


            const matchesDuration =
                selectedDuration === "all" ||
                duration === selectedDuration;


            const matchesSearch =
                searchValue === "" ||
                searchableText.includes(
                    searchValue
                );


            const shouldShow =
                matchesType &&
                matchesLocation &&
                matchesDuration &&
                matchesSearch;


            if (shouldShow) {

                card.style.display = "flex";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (resultsCount) {

            resultsCount.textContent =
                visibleCount;

        }


        if (noResults) {

            noResults.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";

        }

    }



    /* =====================================================
       GSAP — PAGE ENTRANCE
       ===================================================== */

    if (typeof gsap !== "undefined") {


        gsap.from(
            ".browse-hero",
            {
                opacity: 0,
                y: 25,
                duration: .8,
                ease: "power3.out"
            }
        );


        gsap.from(
            ".hero-copy > *",
            {
                opacity: 0,
                y: 18,
                duration: .65,
                stagger: .12,
                delay: .15,
                ease: "power3.out"
            }
        );


        gsap.from(
            ".hero-star",
            {
                opacity: 0,
                scale: .5,
                rotation: -20,
                duration: .8,
                delay: .35,
                ease: "back.out(1.7)"
            }
        );


        gsap.from(
            ".hero-ai-badge",
            {
                opacity: 0,
                x: 25,
                duration: .7,
                delay: .5,
                ease: "power3.out"
            }
        );


        gsap.from(
            ".search-panel",
            {
                opacity: 0,
                y: 20,
                duration: .7,
                delay: .35,
                ease: "power3.out"
            }
        );


        gsap.from(
            ".results-heading",
            {
                opacity: 0,
                y: 18,
                duration: .6,
                delay: .5,
                ease: "power3.out"
            }
        );


        gsap.from(
            ".browse-card",
            {
                opacity: 0,
                y: 25,
                duration: .65,
                stagger: .10,
                delay: .55,
                ease: "power3.out"
            }
        );


        /* Floating hero elements */

        gsap.to(
            ".hero-star",
            {
                y: -9,
                rotation: 17,
                duration: 2.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );


        gsap.to(
            ".orb-one",
            {
                y: -12,
                x: 7,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );


        gsap.to(
            ".orb-two",
            {
                y: 10,
                x: -6,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );


        /* AI badge floating */

        gsap.to(
            ".hero-ai-badge",
            {
                y: -5,
                duration: 2.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

    }



    /* =====================================================
       CARD 3D HOVER
       ===================================================== */

    cards.forEach(card => {


        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - .5) * 5;

                const rotateX =
                    ((y / rect.height) - .5) * -5;


                if (typeof gsap !== "undefined") {

                    gsap.to(
                        card,
                        {
                            rotationY: rotateY,
                            rotationX: rotateX,
                            scale: 1.012,
                            duration: .25,
                            ease: "power2.out"
                        }
                    );

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                if (typeof gsap !== "undefined") {

                    gsap.to(
                        card,
                        {
                            rotationY: 0,
                            rotationX: 0,
                            scale: 1,
                            duration: .45,
                            ease: "power3.out"
                        }
                    );

                }

            }
        );

    });



    /* =====================================================
       ACTIVE AI MATCH ANIMATION
       ===================================================== */

    const matchScores =
        document.querySelectorAll(".match-score");


    if (typeof gsap !== "undefined") {

        matchScores.forEach(
            (score, index) => {

                gsap.from(
                    score,
                    {
                        scale: .75,
                        opacity: 0,
                        duration: .5,
                        delay: .9 + (index * .08),
                        ease: "back.out(1.8)"
                    }
                );

            }
        );

    }



    /* =====================================================
       LOGOUT
       ===================================================== */

    const logoutLink =
        document.getElementById("logoutLink");


    if (logoutLink) {

        logoutLink.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const confirmed =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmed) {

                    window.location.href =
                        "login.html";

                }

            }
        );

    }



});