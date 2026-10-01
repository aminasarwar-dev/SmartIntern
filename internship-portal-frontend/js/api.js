/* =========================================================
   SMARTINTERN API
   ========================================================= */

const API_BASE_URL = "http://192.168.1.122:8000";


/* =========================================================
   JSON API REQUEST
   Used for LOGIN
   ========================================================= */

async function apiJsonRequest(endpoint, data) {

    try {

        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        let result = {};

        try {
            result = await response.json();
        }
        catch {
            result = {};
        }


        if (!response.ok) {

            throw new Error(
                result.detail ||
                result.message ||
                "Something went wrong. Please try again."
            );

        }


        return result;

    }
    catch (error) {

        if (error instanceof TypeError) {

            throw new Error(
                "Unable to connect to the backend server."
            );

        }

        throw error;

    }

}


/* =========================================================
   FORM DATA API REQUEST
   Used for SIGNUP
   ========================================================= */

async function apiFormRequest(endpoint, formData) {

    try {

        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                method: "POST",
                body: formData
            }
        );


        let result = {};

        try {
            result = await response.json();
        }
        catch {
            result = {};
        }


        if (!response.ok) {

            throw new Error(
                result.detail ||
                result.message ||
                "Something went wrong. Please try again."
            );

        }


        return result;

    }
    catch (error) {

        if (error instanceof TypeError) {

            throw new Error(
                "Unable to connect to the backend server."
            );

        }

        throw error;

    }

}