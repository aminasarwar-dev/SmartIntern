document.addEventListener("DOMContentLoaded", () => {

    initThreeScene();

    initAnimations();

    initRoleSwitch();

    initPasswordToggle();

    initLoginForm();

    initRememberMe();

    initForgotPassword();

});



/* =========================================================
   THREE.JS LOGIN BACKGROUND
========================================================= */

function initThreeScene() {

    const canvas =
        document.getElementById("threeCanvas");

    if (!canvas || typeof THREE === "undefined") {
        return;
    }


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );


    camera.position.z = 7;


    const renderer =
        new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });


    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );



    /* =========================
       MAIN CRYSTAL
    ========================== */

    const geometry =
        new THREE.IcosahedronGeometry(
            1.45,
            1
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color: 0xb38bd7,

            transparent: true,

            opacity: 0.16,

            roughness: 0.15,

            metalness: 0.25,

            transmission: 0.2

        });


    const crystal =
        new THREE.Mesh(
            geometry,
            material
        );


    scene.add(crystal);



    /* =========================
       WIREFRAME
    ========================== */

    const wireGeometry =
        new THREE.IcosahedronGeometry(
            1.52,
            1
        );


    const wireMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xc982a7,

            wireframe: true,

            transparent: true,

            opacity: 0.24

        });


    const wire =
        new THREE.Mesh(
            wireGeometry,
            wireMaterial
        );


    scene.add(wire);



    /* =========================
       LIGHTS
    ========================== */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.2
        );


    scene.add(ambientLight);


    const purpleLight =
        new THREE.PointLight(
            0xb38bd7,
            2.2,
            8
        );


    purpleLight.position.set(
        3,
        2,
        4
    );


    scene.add(purpleLight);


    const pinkLight =
        new THREE.PointLight(
            0xe8a8c7,
            1.8,
            8
        );


    pinkLight.position.set(
        -3,
        -2,
        3
    );


    scene.add(pinkLight);



    /* =========================
       PARTICLES
    ========================== */

    const particleGeometry =
        new THREE.BufferGeometry();


    const particleCount = 80;


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
            (Math.random() - 0.5) * 12;

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

            size: 0.035,

            transparent: true,

            opacity: 0.45

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);



    /* =========================
       ANIMATION
    ========================== */

    function animate() {

        requestAnimationFrame(
            animate
        );


        crystal.rotation.x += 0.002;

        crystal.rotation.y += 0.004;


        wire.rotation.x -= 0.001;

        wire.rotation.y -= 0.002;


        particles.rotation.y += 0.0005;


        renderer.render(
            scene,
            camera
        );

    }


    animate();



    /* =========================
       RESIZE
    ========================== */

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
   GSAP ANIMATIONS
========================================================= */

function initAnimations() {

    if (typeof gsap === "undefined") {
        return;
    }


    gsap.from(
        ".login-card",
        {
            duration: 0.8,
            opacity: 0,
            y: 35,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".signup-heading h1",
        {
            duration: 0.7,
            opacity: 0,
            y: 18,
            delay: 0.15,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".role-switch",
        {
            duration: 0.6,
            opacity: 0,
            y: 12,
            delay: 0.25,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".input-group",
        {
            duration: 0.6,
            opacity: 0,
            y: 12,
            delay: 0.3,
            stagger: 0.08,
            ease: "power3.out"
        }
    );

}



/* =========================================================
   ROLE SWITCH
========================================================= */

function initRoleSwitch() {

    const roleButtons =
        document.querySelectorAll(
            ".role-option"
        );


    const accountRole =
        document.getElementById(
            "accountRole"
        );


    roleButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                roleButtons.forEach(
                    item => {
                        item.classList.remove(
                            "active"
                        );
                    }
                );


                button.classList.add(
                    "active"
                );


                const role =
                    button.dataset.role;


                accountRole.value =
                    role;

            }
        );

    });

}



/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function initPasswordToggle() {

    const toggleButtons =
        document.querySelectorAll(
            ".password-toggle"
        );


    toggleButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const targetId =
                    button.dataset.target;


                const input =
                    document.getElementById(
                        targetId
                    );


                if (!input) {
                    return;
                }


                if (
                    input.type === "password"
                ) {

                    input.type =
                        "text";

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

    });

}



/* =========================================================
   LOGIN FORM
========================================================= */

function initLoginForm() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            clearLoginErrors();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            const role =
                document
                    .getElementById("accountRole")
                    .value;


            let valid = true;



            /* =========================
               EMAIL
            ========================== */

            if (!email) {

                showLoginError(
                    "emailError",
                    "Please enter your email."
                );

                valid = false;

            }

            else if (
                !isValidEmail(email)
            ) {

                showLoginError(
                    "emailError",
                    "Please enter a valid email address."
                );

                valid = false;

            }



            /* =========================
               PASSWORD
            ========================== */

            if (!password) {

                showLoginError(
                    "passwordError",
                    "Please enter your password."
                );

                valid = false;

            }


            if (!valid) {
                return;
            }



            /* =========================
               LOGIN REQUEST
            ========================== */

            const endpoint =
                role === "company"
                    ? "/company/login"
                    : "/student/login";


            try {

                const result =
                    await apiJsonRequest(
                        endpoint,
                        {
                            email: email,
                            password: password
                        }
                    );



                /* =========================
                   SAVE LOGIN DATA
                ========================== */

                if (result.access_token) {

                    sessionStorage.setItem(
                        "access_token",
                        result.access_token
                    );

                }


                sessionStorage.setItem(
                    "user_role",
                    role
                );


                sessionStorage.setItem(
                    "login_data",
                    JSON.stringify(result)
                );


                if (result.user) {

                    sessionStorage.setItem(
                        "user_data",
                        JSON.stringify(
                            result.user
                        )
                    );

                }


                /* =========================
                   REMEMBER ME
                ========================== */

                const rememberMe =
                    document.getElementById(
                        "rememberMe"
                    );


                if (
                    rememberMe &&
                    rememberMe.checked
                ) {

                    localStorage.setItem(
                        "remember_email",
                        email
                    );

                    localStorage.setItem(
                        "remember_role",
                        role
                    );

                }

                else {

                    localStorage.removeItem(
                        "remember_email"
                    );

                    localStorage.removeItem(
                        "remember_role"
                    );

                }



                /* =========================
                   SUCCESS
                ========================== */

                showLoginSuccess(
                    role
                );

            }

            catch (error) {

                showLoginError(
                    "passwordError",
                    error.message ||
                    "Invalid email or password."
                );

            }

        }
    );

}



/* =========================================================
   REMEMBER ME
========================================================= */

function initRememberMe() {

    const email =
        document.getElementById(
            "email"
        );


    const remember =
        document.getElementById(
            "rememberMe"
        );


    if (!email || !remember) {
        return;
    }


    const savedEmail =
        localStorage.getItem(
            "remember_email"
        );


    const savedRole =
        localStorage.getItem(
            "remember_role"
        );


    if (savedEmail) {

        email.value =
            savedEmail;

        remember.checked =
            true;

    }


    if (savedRole) {

        const roleButton =
            document.querySelector(
                `.role-option[data-role="${savedRole}"]`
            );


        const accountRole =
            document.getElementById(
                "accountRole"
            );


        if (roleButton) {

            document
                .querySelectorAll(
                    ".role-option"
                )
                .forEach(button => {

                    button.classList.remove(
                        "active"
                    );

                });


            roleButton.classList.add(
                "active"
            );

        }


        if (accountRole) {

            accountRole.value =
                savedRole;

        }

    }

}



/* =========================================================
   FORGOT PASSWORD MODAL
========================================================= */

function initForgotPassword() {

    const link =
        document.getElementById(
            "forgotPasswordLink"
        );


    const modal =
        document.getElementById(
            "forgotPasswordModal"
        );


    const closeButton =
        document.getElementById(
            "forgotModalClose"
        );


    const form =
        document.getElementById(
            "forgotPasswordForm"
        );


    if (
        !link ||
        !modal ||
        !closeButton ||
        !form
    ) {

        return;

    }



    /* =========================
       OPEN
    ========================== */

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

            clearForgotError();

            const loginEmail =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const forgotEmail =
                document.getElementById(
                    "forgotEmail"
                );


            if (
                loginEmail &&
                forgotEmail
            ) {

                forgotEmail.value =
                    loginEmail;

            }


            modal.classList.add(
                "show"
            );


            setTimeout(
                () => {

                    if (forgotEmail) {
                        forgotEmail.focus();
                    }

                },
                100
            );

        }
    );



    /* =========================
       CLOSE
    ========================== */

    closeButton.addEventListener(
        "click",
        () => {

            closeForgotModal();

        }
    );



    /* =========================
       CLICK OUTSIDE
    ========================== */

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeForgotModal();

            }

        }
    );



    /* =========================
       ESCAPE
    ========================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "show"
                )
            ) {

                closeForgotModal();

            }

        }
    );



    /* =========================
       FORM
    ========================== */

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            clearForgotError();


            const email =
                document
                    .getElementById(
                        "forgotEmail"
                    )
                    .value
                    .trim();


            if (!email) {

                showForgotError(
                    "Please enter your email."
                );

                return;

            }


            if (
                !isValidEmail(email)
            ) {

                showForgotError(
                    "Please enter a valid email address."
                );

                return;

            }


            /*
             * IMPORTANT:
             *
             * Your backend routes supplied so far
             * do NOT contain a password-reset endpoint.
             *
             * Therefore this frontend only validates
             * the email here.
             *
             * When you give me the actual backend
             * forgot-password endpoint, this submit
             * section will call it.
             */

            console.log(
                "Forgot password email:",
                email
            );

        }
    );

}



/* =========================================================
   CLOSE FORGOT MODAL
========================================================= */

function closeForgotModal() {

    const modal =
        document.getElementById(
            "forgotPasswordModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );

}



/* =========================================================
   SUCCESS
========================================================= */

function showLoginSuccess(role) {

    const overlay =
        document.getElementById(
            "successOverlay"
        );


    if (!overlay) {

        redirectToDashboard(
            role
        );

        return;

    }


    overlay.classList.add(
        "show"
    );


    const continueButton =
        document.getElementById(
            "continueBtn"
        );


    if (continueButton) {

        continueButton.onclick =
            () => {

                redirectToDashboard(
                    role
                );

            };

    }

}



/* =========================================================
   REDIRECT
========================================================= */

function redirectToDashboard(role) {

    if (role === "company") {

        window.location.href =
            "company-dashboard.html";

    }

    else {

        window.location.href =
            "student-dashboard.html";

    }

}



/* =========================================================
   ERRORS
========================================================= */

function showLoginError(
    id,
    message
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            message;

    }

}


function clearLoginErrors() {

    const errors =
        document.querySelectorAll(
            "#loginForm .error"
        );


    errors.forEach(error => {

        error.textContent =
            "";

    });

}


function showForgotError(message) {

    const error =
        document.getElementById(
            "forgotEmailError"
        );


    if (error) {

        error.textContent =
            message;

    }

}


function clearForgotError() {

    const error =
        document.getElementById(
            "forgotEmailError"
        );


    if (error) {

        error.textContent =
            "";

    }

}



/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}