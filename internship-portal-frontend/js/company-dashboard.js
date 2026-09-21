/* =========================================================
   SMARTINTERN — COMPANY DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadCompanyData();

    initDashboardAnimations();

    initCompany3D();

    initCompanyCardTilt();

    initMobileSidebar();

    initNotifications();

    initLogout();

    initHeroParallax();

});


/* =========================================================
   COMPANY DATA
========================================================= */

function loadCompanyData() {

    const savedCompany =
        sessionStorage.getItem("smartInternCompanyProfile");

    if (!savedCompany) {
        return;
    }

    try {

        const company =
            JSON.parse(savedCompany);

        const companyName =
            company.companyName ||
            company.name ||
            "TechCorp";

        const initials =
            getCompanyInitials(companyName);


        const sidebarName =
            document.getElementById(
                "sidebarCompanyName"
            );

        const topbarName =
            document.getElementById(
                "topbarCompanyName"
            );

        const sidebarAvatar =
            document.getElementById(
                "sidebarCompanyAvatar"
            );

        const topbarAvatar =
            document.getElementById(
                "topbarCompanyAvatar"
            );


        if (sidebarName) {
            sidebarName.textContent =
                companyName;
        }


        if (topbarName) {
            topbarName.textContent =
                companyName;
        }


        if (sidebarAvatar) {
            sidebarAvatar.textContent =
                initials;
        }


        if (topbarAvatar) {
            topbarAvatar.textContent =
                initials;
        }

    } catch (error) {

        console.log(
            "Could not load company profile."
        );

    }

}


/* =========================================================
   COMPANY INITIALS
========================================================= */

function getCompanyInitials(name) {

    if (!name) {
        return "TC";
    }

    const words =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[1][0]
    ).toUpperCase();

}


/* =========================================================
   GSAP DASHBOARD ANIMATIONS
========================================================= */

function initDashboardAnimations() {

    if (typeof gsap === "undefined") {
        return;
    }


    const timeline =
        gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });


    timeline
        .from(
            ".company-topbar",
            {
                y: -25,
                opacity: 0,
                duration: .7
            }
        )
        .from(
            ".dashboard-hero",
            {
                y: 35,
                opacity: 0,
                duration: .8
            },
            "-=.35"
        )
        .from(
            ".stat-card",
            {
                y: 25,
                opacity: 0,
                duration: .55,
                stagger: .08
            },
            "-=.35"
        )
        .from(
            ".dashboard-card",
            {
                y: 25,
                opacity: 0,
                duration: .55,
                stagger: .07
            },
            "-=.3"
        );


    /* AI Card Floating */

    gsap.to(
        ".floating-ai-card",
        {
            y: -8,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        }
    );


    /* Candidate Card Floating */

    gsap.to(
        ".floating-candidate-card",
        {
            y: 7,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: .3
        }
    );


    /* Orbit animation */

    gsap.to(
        ".orbit-one",
        {
            rotation: 360,
            duration: 18,
            repeat: -1,
            ease: "none"
        }
    );


    gsap.to(
        ".orbit-two",
        {
            rotation: -360,
            duration: 24,
            repeat: -1,
            ease: "none"
        }
    );


    gsap.to(
        ".orbit-three",
        {
            rotation: 360,
            duration: 30,
            repeat: -1,
            ease: "none"
        }
    );

}


/* =========================================================
   THREE.JS 3D OBJECT
========================================================= */

function initCompany3D() {

    const canvas =
        document.getElementById(
            "companyDashboard3D"
        );


    if (!canvas) {
        return;
    }


    if (typeof THREE === "undefined") {
        return;
    }


    const container =
        canvas.parentElement;


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            45,
            container.clientWidth /
            container.clientHeight,
            .1,
            100
        );


    camera.position.z = 4.2;


    const renderer =
        new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    /* =====================================================
       MAIN CRYSTAL
    ===================================================== */

    const crystalGeometry =
        new THREE.IcosahedronGeometry(
            1.15,
            1
        );


    const crystalMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0xb38bd7,

            roughness: .18,

            metalness: .05,

            transparent: true,

            opacity: .72,

            flatShading: true

        });


    const crystal =
        new THREE.Mesh(
            crystalGeometry,
            crystalMaterial
        );


    scene.add(crystal);


    /* =====================================================
       INNER WIRE
    ===================================================== */

    const wireGeometry =
        new THREE.IcosahedronGeometry(
            1.28,
            1
        );


    const wireMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xe8a8c7,

            wireframe: true,

            transparent: true,

            opacity: .28

        });


    const wire =
        new THREE.Mesh(
            wireGeometry,
            wireMaterial
        );


    scene.add(wire);


    /* =====================================================
       LIGHTS
    ===================================================== */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.4
        );


    scene.add(ambientLight);


    const purpleLight =
        new THREE.PointLight(
            0xb38bd7,
            3,
            8
        );


    purpleLight.position.set(
        2,
        2,
        3
    );


    scene.add(purpleLight);


    const pinkLight =
        new THREE.PointLight(
            0xe8a8c7,
            2.5,
            7
        );


    pinkLight.position.set(
        -2,
        -1,
        2
    );


    scene.add(pinkLight);


    /* =====================================================
       PARTICLES
    ===================================================== */

    const particleCount = 120;

    const particleGeometry =
        new THREE.BufferGeometry();


    const particlePositions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const radius =
            1.8 + Math.random() * 1.3;

        const angle =
            Math.random() * Math.PI * 2;

        const height =
            (Math.random() - .5) * 3;

        particlePositions[
            i * 3
        ] =
            Math.cos(angle) * radius;

        particlePositions[
            i * 3 + 1
        ] =
            height;

        particlePositions[
            i * 3 + 2
        ] =
            Math.sin(angle) * radius;

    }


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0xd9c4e8,

            size: .025,

            transparent: true,

            opacity: .8

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);


    /* =====================================================
       MOUSE
    ===================================================== */

    let mouseX = 0;
    let mouseY = 0;


    container.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                container.getBoundingClientRect();


            mouseX =
                (
                    (event.clientX - rect.left)
                    /
                    rect.width
                    - .5
                );


            mouseY =
                (
                    (event.clientY - rect.top)
                    /
                    rect.height
                    - .5
                );

        }
    );


    container.addEventListener(
        "mouseleave",
        () => {

            mouseX = 0;
            mouseY = 0;

        }
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    function animate() {

        requestAnimationFrame(
            animate
        );


        crystal.rotation.y += .004;
        crystal.rotation.x += .0015;


        wire.rotation.y -= .0025;
        wire.rotation.x += .001;


        particles.rotation.y += .0008;


        crystal.rotation.y +=
            (mouseX * .25 -
             crystal.rotation.y * .01);


        crystal.rotation.x +=
            (mouseY * .15 -
             crystal.rotation.x * .01);


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            const width =
                container.clientWidth;

            const height =
                container.clientHeight;


            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );

        }
    );


    /* GSAP floating scale */

    if (typeof gsap !== "undefined") {

        gsap.to(
            crystal.scale,
            {
                x: 1.07,
                y: 1.07,
                z: 1.07,

                duration: 2.5,

                repeat: -1,

                yoyo: true,

                ease: "sine.inOut"
            }
        );

    }

}


/* =========================================================
   CARD TILT
========================================================= */

function initCompanyCardTilt() {

    const cards =
        document.querySelectorAll(
            ".stat-card, .dashboard-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 1000
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -1.5;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 1.5;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-2px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function initMobileSidebar() {

    const menuButton =
        document.getElementById(
            "mobileMenuButton"
        );


    const sidebar =
        document.getElementById(
            "dashboardSidebar"
        );


    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );


    if (
        !menuButton ||
        !sidebar ||
        !overlay
    ) {
        return;
    }


    function openSidebar() {

        sidebar.classList.add(
            "open"
        );

        overlay.classList.add(
            "show"
        );

    }


    function closeSidebar() {

        sidebar.classList.remove(
            "open"
        );

        overlay.classList.remove(
            "show"
        );

    }


    menuButton.addEventListener(
        "click",
        openSidebar
    );


    overlay.addEventListener(
        "click",
        closeSidebar
    );


    document
        .querySelectorAll(
            ".sidebar-link"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    if (
                        window.innerWidth <= 1000
                    ) {

                        closeSidebar();

                    }

                }
            );

        });

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function initNotifications() {

    const button =
        document.getElementById(
            "notificationButton"
        );


    const panel =
        document.getElementById(
            "notificationPanel"
        );


    const closeButton =
        document.getElementById(
            "closeNotification"
        );


    const navButton =
        document.getElementById(
            "notificationNav"
        );


    if (!button || !panel) {
        return;
    }


    function togglePanel() {

        panel.classList.toggle(
            "show"
        );

    }


    button.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            togglePanel();

        }
    );


    if (navButton) {

        navButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                togglePanel();

            }
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                panel.classList.remove(
                    "show"
                );

            }
        );

    }


    document.addEventListener(
        "click",
        (event) => {

            if (
                !panel.contains(event.target) &&
                !button.contains(event.target)
            ) {

                panel.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function initLogout() {

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (!logoutButton) {
        return;
    }


    logoutButton.addEventListener(
        "click",
        () => {

            sessionStorage.removeItem(
                "smartInternCompanyProfile"
            );

            sessionStorage.removeItem(
                "smartInternLogin"
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =========================================================
   HERO PARALLAX
========================================================= */

function initHeroParallax() {

    const hero =
        document.querySelector(
            ".dashboard-hero"
        );


    const visual =
        document.querySelector(
            "#companyHeroVisual"
        );


    if (!hero || !visual) {
        return;
    }


    hero.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth < 1000
            ) {
                return;
            }


            const rect =
                hero.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            const moveX =
                x / rect.width * 12;


            const moveY =
                y / rect.height * 12;


            if (
                typeof gsap !== "undefined"
            ) {

                gsap.to(
                    visual,
                    {
                        x: moveX,
                        y: moveY,
                        duration: .6,
                        ease: "power2.out"
                    }
                );

            }

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            if (
                typeof gsap !== "undefined"
            ) {

                gsap.to(
                    visual,
                    {
                        x: 0,
                        y: 0,
                        duration: .7,
                        ease: "power3.out"
                    }
                );

            }

        }
    );

}