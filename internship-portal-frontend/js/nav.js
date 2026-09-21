/* =====================================================
   SMARTINTERN — NAVIGATION
===================================================== */
(function () {
    const menuButton = document.querySelector(".menu-btn");
    const nav = document.querySelector(".navbar nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            const open = nav.classList.toggle("mobile-open");

            if (open) {
                nav.style.display = "flex";
                nav.style.position = "absolute";
                nav.style.top = "75px";
                nav.style.left = "0";
                nav.style.right = "0";
                nav.style.padding = "20px";
                nav.style.flexDirection = "column";
                nav.style.background = "white";
                nav.style.borderRadius = "20px";
                nav.style.boxShadow = "0 20px 40px rgba(70,40,70,.1)";
            } else {
                nav.removeAttribute("style");
            }
        });
    }

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
})();
