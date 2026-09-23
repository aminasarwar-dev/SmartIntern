/* =========================================================
   SMARTINTERN LOGIN
   Three.js + GSAP + Form Validation
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initThreeScene();

    initAnimations();

    initRoleSwitch();

    initPasswordToggle();

    initLoginForm();

});


/* =========================================================
   THREE.JS
   ========================================================= */

function initThreeScene() {

    const canvas =
        document.getElementById("threeCanvas");

    if (
        !canvas ||
        typeof THREE === "undefined"
    ) {
        return;
    }


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth /
            window.innerHeight,
            0.1,
            100
        );


    camera.position.z = 6;


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
        window.innerWidth,
        window.innerHeight
    );


    /* ================= OUTER CRYSTAL ================= */

    const geometry =
        new THREE.IcosahedronGeometry(
            1.5,
            1
        );


    const material =
        new THREE.MeshBasicMaterial({

            color: 0xb38bd7,

            wireframe: true,

            transparent: true,

            opacity: .13

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
            1,
            1
        );


    const innerMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xe8a8c7,

            wireframe: true,

            transparent: true,

            opacity: .09

        });


    const innerCrystal =
        new THREE.Mesh(
            innerGeometry,
            innerMaterial
        );


    scene.add(innerCrystal);


    /* ================= MOUSE ================= */

    let mouseX = 0;
    let mouseY = 0;


    window.addEventListener(
        "pointermove",
        (event) => {

            mouseX =
                (event.clientX /
                    window.innerWidth -
                    .5) * .25;


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


        crystal.rotation.x += .0015;
        crystal.rotation.y += .0025;


        innerCrystal.rotation.x -= .001;
        innerCrystal.rotation.y -= .0018;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* ================= RESIZE ================= */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        }
    );

}


/* =========================================================
   GSAP
   ========================================================= */

function initAnimations() {

    if (
        typeof gsap === "undefined"
    ) {
        return;
    }


    gsap.from(
        ".signup-card",
        {
            opacity: 0,
            y: 35,
            scale: .97,
            duration: .8,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".signup-heading h1",
        {
            opacity: 0,
            y: 18,
            duration: .7,
            delay: .2,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".role-switch",
        {
            opacity: 0,
            y: 15,
            duration: .5,
            delay: .3,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".input-group",
        {
            opacity: 0,
            y: 12,
            duration: .45,
            stagger: .08,
            delay: .38,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".signup-button",
        {
            opacity: 0,
            y: 12,
            duration: .5,
            delay: .58,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".login-text",
        {
            opacity: 0,
            duration: .5,
            delay: .68
        }
    );

}


/* =========================================================
   STUDENT / COMPANY
   ========================================================= */

function initRoleSwitch() {

    const buttons =
        document.querySelectorAll(
            ".role-option"
        );


    const roleInput =
        document.getElementById(
            "accountRole"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const role =
                        button.dataset.role;


                    roleInput.value =
                        role;


                    buttons.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   PASSWORD SHOW / HIDE
   ========================================================= */

function initPasswordToggle() {

    const buttons =
        document.querySelectorAll(
            ".password-toggle"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const input =
                        document.getElementById(
                            button.dataset.target
                        );


                    if (
                        input.type === "password"
                    ) {

                        input.type = "text";

                        button.textContent =
                            "Hide";

                    }
                    else {

                        input.type =
                            "password";

                        button.textContent =
                            "Show";

                    }

                }
            );

        }
    );

}


/* =========================================================
   LOGIN FORM
   ========================================================= */

function initLoginForm() {

    const form =
        document.getElementById(
            "loginForm"
        );


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            clearErrors();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const password =
                document.getElementById(
                    "password"
                ).value;


            const role =
                document.getElementById(
                    "accountRole"
                ).value;


            let valid = true;


            /* EMAIL */

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailRegex.test(email)
            ) {

                showError(
                    "email",
                    "Please enter a valid email."
                );

                valid = false;

            }


            /* PASSWORD */

            if (
                password.length === 0
            ) {

                showError(
                    "password",
                    "Please enter your password."
                );

                valid = false;

            }


            if (!valid) {
                return;
            }


            /* SAVE LOGIN */

            const loginData = {

                role: role,

                email: email

            };


            sessionStorage.setItem(
                "smartInternLogin",
                JSON.stringify(loginData)
            );


            /* SUCCESS */

            showSuccess(role);

        }
    );

}


/* =========================================================
   ERROR
   ========================================================= */

function showError(
    field,
    message
) {

    const input =
        document.getElementById(
            field
        );


    if (input) {

        input.classList.add(
            "invalid"
        );

    }


    const errorMap = {

        email:
            "emailError",

        password:
            "passwordError"

    };


    const error =
        document.getElementById(
            errorMap[field]
        );


    if (error) {

        error.textContent =
            message;

    }

}


/* =========================================================
   CLEAR ERRORS
   ========================================================= */

function clearErrors() {

    document
        .querySelectorAll(
            ".error"
        )
        .forEach(
            (error) => {

                error.textContent = "";

            }
        );


    document
        .querySelectorAll(
            ".input-group input"
        )
        .forEach(
            (input) => {

                input.classList.remove(
                    "invalid"
                );

            }
        );

}


/* =========================================================
   SUCCESS
   ========================================================= */

/* =========================================================
   SUCCESS
   ========================================================= */

function showSuccess(role) {

    const overlay =
        document.getElementById(
            "successOverlay"
        );


    overlay.classList.add(
        "show"
    );


    const continueButton =
        document.getElementById(
            "continueBtn"
        );


    continueButton.onclick = () => {

        sessionStorage.setItem(
            "smartInternRole",
            role
        );


        window.location.href =
            "profile-setup.html";

    };

}