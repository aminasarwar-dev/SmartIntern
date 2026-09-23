/* =========================================================
   SMARTINTERN PROFILE SETUP
   Student + Company
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    initRoleSwitch();

    initGraduationFields();

    initProfessionalLinks();

    initFileInputs();

    initProfileForm();

    initPageAnimation();

    loadSavedRole();

});


/* =========================================================
   ROLE SWITCH
   ========================================================= */

function initRoleSwitch() {

    const roleButtons =
        document.querySelectorAll(
            ".profile-role-btn"
        );

    const studentFields =
        document.getElementById(
            "studentFields"
        );

    const companyFields =
        document.getElementById(
            "companyFields"
        );

    const subtitle =
        document.getElementById(
            "profileSubtitle"
        );


    roleButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const role =
                    button.dataset.role;


                roleButtons.forEach((item) => {

                    item.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                if (role === "student") {

                    studentFields.classList.remove(
                        "hidden"
                    );

                    companyFields.classList.add(
                        "hidden"
                    );

                    subtitle.textContent =
                        "Tell us a little about yourself.";

                }


                if (role === "company") {

                    companyFields.classList.remove(
                        "hidden"
                    );

                    studentFields.classList.add(
                        "hidden"
                    );

                    subtitle.textContent =
                        "Tell us a little about your company.";

                }

            }
        );

    });

}


/* =========================================================
   LOAD SAVED ROLE
   ========================================================= */

function loadSavedRole() {

    const savedRole =
        sessionStorage.getItem(
            "smartInternRole"
        );


    if (!savedRole) {
        return;
    }


    const button =
        document.querySelector(
            `.profile-role-btn[data-role="${savedRole}"]`
        );


    if (button) {

        button.click();

    }

}


/* =========================================================
   GRADUATION FIELDS
   ========================================================= */

function initGraduationFields() {

    const graduationStatus =
        document.getElementById(
            "graduationStatus"
        );


    if (!graduationStatus) {
        return;
    }


    graduationStatus.addEventListener(
        "change",
        updateGraduationFields
    );


    updateGraduationFields();

}


/* =========================================================
   UPDATE GRADUATION FIELDS
   ========================================================= */

function updateGraduationFields() {

    const status =
        document.getElementById(
            "graduationStatus"
        ).value;


    const semesterField =
        document.getElementById(
            "semesterField"
        );

    const graduationYearField =
        document.getElementById(
            "graduationYearField"
        );

    const graduationDateField =
        document.getElementById(
            "graduationDateField"
        );


    /* Hide all conditional fields */

    semesterField.classList.add(
        "hidden"
    );

    graduationYearField.classList.add(
        "hidden"
    );

    graduationDateField.classList.add(
        "hidden"
    );


    /* =====================================================
       YES = GRADUATED
       ===================================================== */

    if (status === "yes") {

        graduationYearField.classList.remove(
            "hidden"
        );

        graduationDateField.classList.remove(
            "hidden"
        );

    }


    /* =====================================================
       NO = NOT GRADUATED
       ===================================================== */

    if (status === "no") {

        semesterField.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   PROFESSIONAL LINKS
   ========================================================= */

function initProfessionalLinks() {

    const professionalLinks =
        document.getElementById(
            "professionalLinks"
        );

    const linksFields =
        document.getElementById(
            "professionalLinksFields"
        );


    if (
        !professionalLinks ||
        !linksFields
    ) {
        return;
    }


    professionalLinks.addEventListener(
        "change",
        () => {

            if (
                professionalLinks.value ===
                "show"
            ) {

                linksFields.classList.remove(
                    "hidden"
                );

            }
            else {

                linksFields.classList.add(
                    "hidden"
                );

            }

        }
    );

}


/* =========================================================
   FILE INPUTS
   ========================================================= */

function initFileInputs() {


    /* =========================
       CV / RESUME
    ========================= */

    const resume =
        document.getElementById(
            "resume"
        );

    const resumeName =
        document.getElementById(
            "resumeName"
        );


    if (resume) {

        resume.addEventListener(
            "change",
            () => {

                const file =
                    resume.files[0];


                if (file) {

                    resumeName.textContent =
                        file.name;

                }
                else {

                    resumeName.textContent =
                        "No file selected";

                }

            }
        );

    }


    /* =========================
       TRADE LICENSE
    ========================= */

    const tradeLicense =
        document.getElementById(
            "tradeLicenseDocument"
        );

    const tradeLicenseName =
        document.getElementById(
            "tradeLicenseDocumentName"
        );


    if (tradeLicense) {

        tradeLicense.addEventListener(
            "change",
            () => {

                const file =
                    tradeLicense.files[0];


                if (file) {

                    tradeLicenseName.textContent =
                        file.name;

                }
                else {

                    tradeLicenseName.textContent =
                        "No file selected";

                }

            }
        );

    }

}


/* =========================================================
   PROFILE FORM
   ========================================================= */

function initProfileForm() {

    const form =
        document.getElementById(
            "profileForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            clearErrors();


            const role =
                sessionStorage.getItem(
                    "smartInternRole"
                ) ||
                getActiveRole();


            if (role === "student") {

                handleStudentSubmit();

            }

            else if (role === "company") {

                handleCompanySubmit();

            }

            else {

                alert(
                    "Please select Student or Company."
                );

            }

        }
    );

}


/* =========================================================
   GET ACTIVE ROLE
   ========================================================= */

function getActiveRole() {

    const activeButton =
        document.querySelector(
            ".profile-role-btn.active"
        );


    if (!activeButton) {
        return "";
    }


    return activeButton.dataset.role;

}


/* =========================================================
   STUDENT SUBMIT
   ========================================================= */

function handleStudentSubmit() {

    let valid = true;


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


    const resume =
        document.getElementById(
            "resume"
        );


    /* =====================================================
       BASIC VALIDATION
       ===================================================== */

    if (!name) {

        showError(
            "studentNameError",
            "Please enter your full name."
        );

        valid = false;

    }


    if (!phone) {

        showError(
            "studentPhoneError",
            "Please enter your phone number."
        );

        valid = false;

    }


    if (!university) {

        showError(
            "universityError",
            "Please enter your university."
        );

        valid = false;

    }


    if (!degree) {

        showError(
            "degreeError",
            "Please select your degree."
        );

        valid = false;

    }


    if (!graduationStatus) {

        showError(
            "graduationStatusError",
            "Please select your graduation status."
        );

        valid = false;

    }


    /* =====================================================
       NOT GRADUATED
       ===================================================== */

    if (
        graduationStatus === "no"
    ) {

        if (!semester) {

            showError(
                "semesterError",
                "Please select your current semester."
            );

            valid = false;

        }

    }


    /* =====================================================
       GRADUATED
       ===================================================== */

    if (
        graduationStatus === "yes"
    ) {


        /* Graduation Year */

        if (!graduationYear) {

            showError(
                "graduationYearError",
                "Please select your graduation year."
            );

            valid = false;

        }


        /* Graduation Date */

        if (!graduationDate) {

            showError(
                "graduationDateError",
                "Please select your graduation date."
            );

            valid = false;

        }

    }


    /* =====================================================
       CV / RESUME
       ===================================================== */

    const resumeFile =
        resume.files[0];


    if (!resumeFile) {

        showError(
            "resumeError",
            "Please upload your CV / Resume."
        );

        valid = false;

    }
    else {

        const allowedResumeTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];


        const maxSize =
            5 * 1024 * 1024;


        if (
            !allowedResumeTypes.includes(
                resumeFile.type
            )
        ) {

            showError(
                "resumeError",
                "Please upload PDF, DOC or DOCX."
            );

            valid = false;

        }


        if (
            resumeFile.size >
            maxSize
        ) {

            showError(
                "resumeError",
                "CV / Resume must be less than 5MB."
            );

            valid = false;

        }

    }


    if (!valid) {
        return;
    }


    /* =====================================================
       PROFESSIONAL LINKS
       ===================================================== */

    const linkedin =
        document.getElementById(
            "linkedin"
        )?.value.trim() || "";


    const github =
        document.getElementById(
            "github"
        )?.value.trim() || "";


    const portfolio =
        document.getElementById(
            "portfolio"
        )?.value.trim() || "";


    /* =====================================================
       STUDENT PROFILE
       ===================================================== */

    const studentProfile = {

        role: "student",

        name: name,

        phone: phone,

        university: university,

        degree: degree,

        graduationStatus:
            graduationStatus,

        semester:
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


        /* =========================
           CV / RESUME
        ========================= */

        resume: {

            name:
                resume.files[0]?.name || "",

            type:
                resume.files[0]?.type || ""

        }

    };


    /* =====================================================
       SAVE STUDENT PROFILE
       ===================================================== */

    sessionStorage.setItem(
        "smartInternStudentProfile",
        JSON.stringify(
            studentProfile
        )
    );


    sessionStorage.setItem(
        "smartInternRole",
        "student"
    );


    /* =====================================================
       STUDENT DASHBOARD
       ===================================================== */

    window.location.href =
        "student-dashboard.html";

}


/* =========================================================
   COMPANY SUBMIT
   ========================================================= */

function handleCompanySubmit() {

    let valid = true;


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


    const tradeLicense =
        document.getElementById(
            "tradeLicenseDocument"
        );


    const licenseIssueDate =
        document.getElementById(
            "licenseIssueDate"
        ).value;


    const licenseExpiryDate =
        document.getElementById(
            "licenseExpiryDate"
        ).value;


    /* =====================================================
       COMPANY VALIDATION
       ===================================================== */

    if (!companyName) {

        showError(
            "companyNameError",
            "Please enter your company name."
        );

        valid = false;

    }


    if (!industry) {

        alert(
            "Please select your industry."
        );

        valid = false;

    }


    if (!contactPerson) {

        alert(
            "Please enter the contact person's name."
        );

        valid = false;

    }


    if (!companyPhone) {

        alert(
            "Please enter the company contact number."
        );

        valid = false;

    }


    if (!companyLocation) {

        alert(
            "Please enter the company location."
        );

        valid = false;

    }


    /* =====================================================
       TRADE LICENSE
       ===================================================== */

    const tradeFile =
        tradeLicense.files[0];


    if (!tradeFile) {

        showError(
            "tradeLicenseDocumentError",
            "Please upload the trade license document."
        );

        valid = false;

    }
    else {

        const allowedTradeTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];


        const maxSize =
            5 * 1024 * 1024;


        if (
            !allowedTradeTypes.includes(
                tradeFile.type
            )
        ) {

            showError(
                "tradeLicenseDocumentError",
                "Please upload PDF, JPG, JPEG or PNG."
            );

            valid = false;

        }


        if (
            tradeFile.size >
            maxSize
        ) {

            showError(
                "tradeLicenseDocumentError",
                "Trade license must be less than 5MB."
            );

            valid = false;

        }

    }


    /* =====================================================
       LICENSE DATES
       ===================================================== */

    if (!licenseIssueDate) {

        alert(
            "Please select the license issue date."
        );

        valid = false;

    }


    if (!licenseExpiryDate) {

        showError(
            "licenseExpiryDateError",
            "Please select the license expiry date."
        );

        valid = false;

    }


    if (
        licenseIssueDate &&
        licenseExpiryDate
    ) {

        const issue =
            new Date(
                licenseIssueDate
            );

        const expiry =
            new Date(
                licenseExpiryDate
            );


        if (expiry <= issue) {

            showError(
                "licenseExpiryDateError",
                "Expiry date must be after issue date."
            );

            valid = false;

        }

    }


    if (!valid) {
        return;
    }


    /* =====================================================
       COMPANY PROFILE
       ===================================================== */

    const companyProfile = {

        role: "company",

        companyName:
            companyName,

        industry:
            industry,

        contactPerson:
            contactPerson,

        phone:
            companyPhone,

        location:
            companyLocation,

        website:
            companyWebsite,

        description:
            companyDescription,


        tradeLicenseDocument: {

            name:
                tradeLicense.files[0]?.name || "",

            type:
                tradeLicense.files[0]?.type || ""

        },


        licenseIssueDate:
            licenseIssueDate,

        licenseExpiryDate:
            licenseExpiryDate

    };


    /* =====================================================
       SAVE COMPANY PROFILE
       ===================================================== */

    sessionStorage.setItem(
        "smartInternCompanyProfile",
        JSON.stringify(
            companyProfile
        )
    );


    sessionStorage.setItem(
        "smartInternRole",
        "company"
    );


    /* =====================================================
       COMPANY DASHBOARD
       ===================================================== */

    window.location.href =
        "company-dashboard.html";

}


/* =========================================================
   SHOW ERROR
   ========================================================= */

function showError(
    elementId,
    message
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            message;

    }

}


/* =========================================================
   CLEAR ERRORS
   ========================================================= */

function clearErrors() {

    document
        .querySelectorAll(
            ".profile-error"
        )
        .forEach(
            (error) => {

                error.textContent =
                    "";

            }
        );

}


/* =========================================================
   PAGE ANIMATION
   ========================================================= */

function initPageAnimation() {

    if (
        typeof gsap ===
        "undefined"
    ) {
        return;
    }


    gsap.from(
        ".profile-card",
        {
            opacity: 0,
            y: 35,
            scale: 0.98,
            duration: 0.8,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".profile-heading",
        {
            opacity: 0,
            y: 18,
            duration: 0.6,
            delay: 0.15,
            ease: "power3.out"
        }
    );


    gsap.from(
        ".profile-role",
        {
            opacity: 0,
            y: 12,
            duration: 0.5,
            delay: 0.25,
            ease: "power3.out"
        }
    );

}