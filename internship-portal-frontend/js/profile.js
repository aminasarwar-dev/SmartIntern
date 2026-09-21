document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const roleButtons =
        document.querySelectorAll(".profile-role-btn");

    const studentFields =
        document.getElementById("studentFields");

    const companyFields =
        document.getElementById("companyFields");

    const profileSubtitle =
        document.getElementById("profileSubtitle");

    const profileForm =
        document.getElementById("profileForm");


    let currentRole = "student";


    /* =====================================================
       STUDENT / COMPANY SWITCH
    ===================================================== */

    roleButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            currentRole = this.dataset.role;


            roleButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            this.classList.add("active");


            if (currentRole === "student") {

                studentFields.classList.remove("hidden");

                companyFields.classList.add("hidden");

                profileSubtitle.textContent =
                    "Tell us a little about yourself.";

            }


            if (currentRole === "company") {

                studentFields.classList.add("hidden");

                companyFields.classList.remove("hidden");

                profileSubtitle.textContent =
                    "Tell us about your company.";

            }

        });

    });


    /* =====================================================
       GRADUATION LOGIC
    ===================================================== */

    const graduationStatus =
        document.getElementById("graduationStatus");

    const semesterField =
        document.getElementById("semesterField");

    const graduationYearField =
        document.getElementById("graduationYearField");

    const graduationDateField =
        document.getElementById("graduationDateField");


    function updateGraduationFields() {

        const status =
            graduationStatus.value;


        /* First hide everything */

        semesterField.classList.add("hidden");

        graduationYearField.classList.add("hidden");

        graduationDateField.classList.add("hidden");


        /* If YES */

        if (status === "yes") {

            graduationYearField.classList.remove("hidden");

            graduationDateField.classList.remove("hidden");

        }


        /* If NO */

        if (status === "no") {

            semesterField.classList.remove("hidden");

        }

    }


    graduationStatus.addEventListener(
        "change",
        updateGraduationFields
    );


    /* =====================================================
       PROFESSIONAL LINKS
    ===================================================== */

    const professionalLinks =
        document.getElementById("professionalLinks");

    const professionalLinksFields =
        document.getElementById(
            "professionalLinksFields"
        );


    professionalLinks.addEventListener(
        "change",
        function () {

            if (this.value === "show") {

                professionalLinksFields.classList.remove(
                    "hidden"
                );

            } else {

                professionalLinksFields.classList.add(
                    "hidden"
                );

            }

        }
    );


    /* =====================================================
       CV FILE
    ===================================================== */

    const resumeInput =
        document.getElementById("resume");

    const resumeName =
        document.getElementById("resumeName");


    resumeInput.addEventListener(
        "change",
        function () {

            if (!this.files.length) {

                resumeName.textContent =
                    "No file selected";

                return;

            }


            const file =
                this.files[0];

            const extension =
                file.name
                    .split(".")
                    .pop()
                    .toLowerCase();


            const allowed =
                ["pdf", "doc", "docx"];


            if (!allowed.includes(extension)) {

                alert(
                    "Please upload a PDF, DOC or DOCX file."
                );

                this.value = "";

                resumeName.textContent =
                    "No file selected";

                return;

            }


            if (file.size > 5 * 1024 * 1024) {

                alert(
                    "CV / Resume must be less than 5MB."
                );

                this.value = "";

                resumeName.textContent =
                    "No file selected";

                return;

            }


            resumeName.textContent =
                file.name;

        }
    );


    /* =====================================================
       TRADE LICENSE DOCUMENT
    ===================================================== */

    const tradeLicenseDocument =
        document.getElementById(
            "tradeLicenseDocument"
        );

    const tradeLicenseDocumentName =
        document.getElementById(
            "tradeLicenseDocumentName"
        );


    tradeLicenseDocument.addEventListener(
        "change",
        function () {

            if (!this.files.length) {

                tradeLicenseDocumentName.textContent =
                    "No file selected";

                return;

            }


            const file =
                this.files[0];

            const extension =
                file.name
                    .split(".")
                    .pop()
                    .toLowerCase();


            const allowed =
                [
                    "pdf",
                    "jpg",
                    "jpeg",
                    "png"
                ];


            if (!allowed.includes(extension)) {

                alert(
                    "Please upload PDF, JPG, JPEG or PNG."
                );

                this.value = "";

                tradeLicenseDocumentName.textContent =
                    "No file selected";

                return;

            }


            if (file.size > 5 * 1024 * 1024) {

                alert(
                    "Trade License document must be less than 5MB."
                );

                this.value = "";

                tradeLicenseDocumentName.textContent =
                    "No file selected";

                return;

            }


            tradeLicenseDocumentName.textContent =
                file.name;

        }
    );


    /* =====================================================
       LICENSE DATES
    ===================================================== */

    const licenseIssueDate =
        document.getElementById("licenseIssueDate");

    const licenseExpiryDate =
        document.getElementById("licenseExpiryDate");


    function validateLicenseDates() {

        if (
            !licenseIssueDate.value ||
            !licenseExpiryDate.value
        ) {

            return true;

        }


        const issue =
            new Date(
                licenseIssueDate.value
            );

        const expiry =
            new Date(
                licenseExpiryDate.value
            );


        if (expiry <= issue) {

            alert(
                "Expiry date must be after the issue date."
            );

            licenseExpiryDate.value = "";

            return false;

        }


        return true;

    }


    licenseExpiryDate.addEventListener(
        "change",
        validateLicenseDates
    );


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (currentRole === "student") {

                saveStudentProfile();

            } else {

                saveCompanyProfile();

            }

        }
    );


    /* =====================================================
       SAVE STUDENT
    ===================================================== */

    function saveStudentProfile() {

        const name =
            document.getElementById(
                "studentName"
            ).value.trim();

        const phone =
            document.getElementById(
                "studentPhone"
            ).value.trim();

        const university =
            document.getElementById(
                "university"
            ).value.trim();

        const degree =
            document.getElementById(
                "degree"
            ).value;

        const graduationStatus =
            document.getElementById(
                "graduationStatus"
            ).value;

        const semester =
            document.getElementById(
                "semester"
            ).value;

        const graduationYear =
            document.getElementById(
                "graduationYear"
            ).value;

        const graduationDate =
            document.getElementById(
                "graduationDate"
            ).value;

        const skills =
            document.getElementById(
                "skills"
            ).value.trim();

        const location =
            document.getElementById(
                "studentLocation"
            ).value.trim();

        const linkedin =
            document.getElementById(
                "linkedin"
            ).value.trim();

        const github =
            document.getElementById(
                "github"
            ).value.trim();

        const portfolio =
            document.getElementById(
                "portfolio"
            ).value.trim();


        /* Required */

        if (
            !name ||
            !phone ||
            !university ||
            !degree ||
            !graduationStatus ||
            !skills ||
            !location
        ) {

            alert(
                "Please complete all required student fields."
            );

            return;

        }


        /* =================================================
           IF NOT GRADUATED
        ================================================= */

        if (graduationStatus === "no") {

            if (!semester) {

                alert(
                    "Please select your current semester."
                );

                return;

            }

        }


        /* =================================================
           IF GRADUATED
        ================================================= */

        if (graduationStatus === "yes") {

            if (
                !graduationYear ||
                !graduationDate
            ) {

                alert(
                    "Please select your graduation year and graduation date."
                );

                return;

            }

        }


        /* Resume */

        let resumeData = null;


        if (resumeInput.files.length) {

            const file =
                resumeInput.files[0];


            resumeData = {

                fileName:
                    file.name,

                fileType:
                    file.type,

                fileSize:
                    file.size

            };

        }


        /* Student Data */

        const studentProfile = {

            role: "student",

            fullName: name,

            phone: phone,

            university: university,

            degree: degree,

            graduationStatus:
                graduationStatus,

            currentSemester:
                graduationStatus === "no"
                    ? semester
                    : "",

            graduationYear:
                graduationStatus === "yes"
                    ? graduationYear
                    : "",

            graduationDate:
                graduationStatus === "yes"
                    ? graduationDate
                    : "",

            skills: skills,

            location: location,

            linkedin: linkedin,

            github: github,

            portfolio: portfolio,

            resume: resumeData

        };


        sessionStorage.setItem(
            "smartInternStudentProfile",
            JSON.stringify(studentProfile)
        );


        sessionStorage.setItem(
            "smartInternRole",
            "student"
        );


        alert(
            "Student profile saved successfully!"
        );


        window.location.href =
            "student-dashboard.html";

    }


    /* =====================================================
       SAVE COMPANY
    ===================================================== */

    function saveCompanyProfile() {

        const companyName =
            document.getElementById(
                "companyName"
            ).value.trim();

        const industry =
            document.getElementById(
                "industry"
            ).value;

        const contactPerson =
            document.getElementById(
                "contactPerson"
            ).value.trim();

        const companyPhone =
            document.getElementById(
                "companyPhone"
            ).value.trim();

        const companyLocation =
            document.getElementById(
                "companyLocation"
            ).value.trim();

        const companyWebsite =
            document.getElementById(
                "companyWebsite"
            ).value.trim();

        const companyDescription =
            document.getElementById(
                "companyDescription"
            ).value.trim();

        const issueDate =
            licenseIssueDate.value;

        const expiryDate =
            licenseExpiryDate.value;


        /* Required */

        if (
            !companyName ||
            !industry ||
            !contactPerson ||
            !companyPhone ||
            !companyLocation ||
            !companyDescription ||
            !issueDate ||
            !expiryDate
        ) {

            alert(
                "Please complete all required company fields."
            );

            return;

        }


        /* Validate Dates */

        if (!validateLicenseDates()) {

            return;

        }


        /* Trade License Document */

        if (
            !tradeLicenseDocument.files.length
        ) {

            alert(
                "Please attach the Trade License document."
            );

            return;

        }


        const licenseFile =
            tradeLicenseDocument.files[0];


        const licenseDocumentData = {

            fileName:
                licenseFile.name,

            fileType:
                licenseFile.type,

            fileSize:
                licenseFile.size

        };


        /* Company Data */

        const companyProfile = {

            role: "company",

            companyName: companyName,

            industry: industry,

            contactPerson: contactPerson,

            phone: companyPhone,

            location: companyLocation,

            website: companyWebsite,

            description: companyDescription,

            tradeLicenseDocument:
                licenseDocumentData,

            licenseIssueDate:
                issueDate,

            licenseExpiryDate:
                expiryDate

        };


        sessionStorage.setItem(
            "smartInternCompanyProfile",
            JSON.stringify(companyProfile)
        );


        sessionStorage.setItem(
            "smartInternRole",
            "company"
        );


        alert(
            "Company profile saved successfully!"
        );


        window.location.href =
            "company-dashboard.html";

    }


    /* =====================================================
       GSAP SMALL ENTRANCE ANIMATION
    ===================================================== */

    if (typeof gsap !== "undefined") {

        gsap.fromTo(
            ".profile-input",
            {
                opacity: 0,
                y: 12
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.035,
                delay: 0.25,
                ease: "power2.out"
            }
        );

    }

});