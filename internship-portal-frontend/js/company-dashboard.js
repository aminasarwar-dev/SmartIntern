/* =========================================================
   SMARTINTERN COMPANY DASHBOARD
   Three.js + GSAP + Dashboard Interactions
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    loadCompanyData();

    initCompanyAnimations();

    initCompany3D();

    initMobileSidebar();

    initNotifications();

    initLogout();

    initHeroParallax();

});



/* =========================================================
   COMPANY DATA
   ========================================================= */

function loadCompanyData() {

    const storedProfile =
        sessionStorage.getItem(
            "smartInternCompanyProfile"
        );


    if (!storedProfile) {
        return;
    }


    try {

        const profile =
            JSON.parse(storedProfile);


        const companyName =
            profile.companyName ||
            profile.name ||
            "Company";


        const elements = [

            document.getElementById(
                "sidebarCompanyName"
            ),

            document.getElementById(
                "topbarCompanyName"
            )

        ];


        elements.forEach((element) => {

            if (element) {

                element.textContent =
                    companyName;

            }

        });


        const initials =
            getCompanyInitials(
                companyName
            );


        const avatarElements = [

            document.getElementById(
                "sidebarCompanyAvatar"
            ),

            document.getElementById(
                "topbarAvatar"
            )

        ];


        avatarElements.forEach((avatar) => {

            if (avatar) {

                avatar.textContent =
                    initials;

            }

        });


    }
    catch (error) {

        console.error(
            "Could not load company profile.",
            error
        );

    }

}



/* =========================================================
   COMPANY INITIALS
   ========================================================= */

function getCompanyInitials(name) {

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
   GSAP ANIMATIONS
   ========================================================= */

function initCompanyAnimations() {

    if (
        typeof gsap === "undefined"
    ) {
        return;
    }


    gsap.from(
        ".dashboard-topbar",
        {
            opacity: 0,
            y: -18,
            duration: .6,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".dashboard-welcome",
        {
            opacity: 0,
            y: 25,
            duration: .8,
            delay: .1,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".profile-progress-card",
        {
            opacity: 0,
            y: 20,
            duration: .6,
            delay: .25,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".stat-card",
        {
            opacity: 0,
            y: 18,
            duration: .5,
            stagger: .08,
            delay: .3,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".dashboard-section, .ai-match-card, .upcoming-card",
        {
            opacity: 0,
            y: 20,
            duration: .55,
            stagger: .08,
            delay: .45,
            ease: "power3.out"
        }
    );


}



/* =========================================================
   THREE.JS
   ========================================================= */

function initCompany3D() {

    if (
        typeof THREE === "undefined"
    ) {
        return;
    }


    const visual =
        document.querySelector(
            ".welcome-visual"
        );


    if (!visual) {
        return;
    }


    /*
     * Create canvas
     */

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.className =
        "company-dashboard-canvas";


    visual.insertBefore(
        canvas,
        visual.firstChild
    );


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            45,
            1,
            .1,
            100
        );


    camera.position.z = 5;


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


    function resize() {

        const width =
            visual.clientWidth;

        const height =
            visual.clientHeight;


        renderer.setSize(
            width,
            height,
            false
        );


        camera.aspect =
            width / height;


        camera.updateProjectionMatrix();

    }


    resize();


    window.addEventListener(
        "resize",
        resize
    );



    /* ================= CRYSTAL ================= */

    const geometry =
        new THREE.IcosahedronGeometry(
            1.25,
            1
        );


    const material =
        new THREE.MeshBasicMaterial({

            color: 0xb38bd7,

            wireframe: true,

            transparent: true,

            opacity: .23

        });


    const crystal =
        new THREE.Mesh(
            geometry,
            material
        );


    scene.add(crystal);



    /* ================= INNER CRYSTAL ================= */

    const innerGeometry =
        new THREE.IcosahedronGeometry(
            .78,
            1
        );


    const innerMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xe8a8c7,

            wireframe: true,

            transparent: true,

            opacity: .16

        });


    const innerCrystal =
        new THREE.Mesh(
            innerGeometry,
            innerMaterial
        );


    scene.add(innerCrystal);



    /* ================= PARTICLES ================= */

    const particleGeometry =
        new THREE.BufferGeometry();


    const particleCount = 70;


    const positions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount * 3;
        i++
    ) {

        positions[i] =
            (Math.random() - .5) * 6;

    }


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0xb38bd7,

            size: .035,

            transparent: true,

            opacity: .45

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);



    /* ================= MOUSE ================= */

    let mouseX = 0;
    let mouseY = 0;


    window.addEventListener(
        "pointermove",
        (event) => {

            mouseX =
                (event.clientX /
                    window.innerWidth -
                    .5) * .35;


            mouseY =
                (event.clientY /
                    window.innerHeight -
                    .5) * .25;

        }
    );



    /* ================= ANIMATION ================= */

    function animate() {

        requestAnimationFrame(
            animate
        );


        crystal.rotation.x += .002;
        crystal.rotation.y += .003;


        innerCrystal.rotation.x -= .0015;
        innerCrystal.rotation.y -= .002;


        particles.rotation.y += .0005;


        crystal.rotation.x +=
            mouseY * .002;


        crystal.rotation.y +=
            mouseX * .002;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* ================= GSAP FLOAT ================= */

    if (
        typeof gsap !== "undefined"
    ) {

        gsap.to(
            crystal.scale,
            {
                x: 1.08,
                y: 1.08,
                z: 1.08,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

    }

}



/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */

function initMobileSidebar() {

    const menu =
        document.getElementById(
            "mobileMenu"
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
        !menu ||
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


    menu.addEventListener(
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
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeSidebar
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
            "closeNotifications"
        );


    if (
        !button ||
        !panel
    ) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            panel.classList.toggle(
                "show"
            );

        }
    );


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

    const logout =
        document.getElementById(
            "logoutLink"
        );


    if (!logout) {
        return;
    }


    logout.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            sessionStorage.removeItem(
                "smartInternCompanyProfile"
            );


            sessionStorage.removeItem(
                "smartInternLogin"
            );


            sessionStorage.removeItem(
                "smartInternRole"
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
            ".dashboard-welcome"
        );


    const visual =
        document.querySelector(
            ".welcome-visual"
        );


    if (
        !hero ||
        !visual
    ) {
        return;
    }


    hero.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (event.clientX -
                    rect.left) /
                rect.width -
                .5;


            const y =
                (event.clientY -
                    rect.top) /
                rect.height -
                .5;


            if (
                typeof gsap !== "undefined"
            ) {

                gsap.to(
                    visual,
                    {
                        x: x * 10,
                        y: y * 7,
                        duration: .5,
                        ease: "power2.out",
                        overwrite: true
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