
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™
   GUIDED JOURNEY™

   FILE:
   page06.js

   PAGE:
   06 — THE FOUR FORCES™

   VERSION:
   3.0 — FOUR FORCES VISUAL PAGE

   PURPOSE:
   --------------------------------------------------------------------------
   1. Initialise Page 06.
   2. Preserve the existing visitor / journey identity architecture.
   3. Preserve the Page 06 completion-email architecture.
   4. Prevent duplicate completion-email delivery.
   5. Mark Page 06 complete only after confirmed email success.
   6. Navigate ONLY to page07.html after successful completion.

   IMPORTANT:
   --------------------------------------------------------------------------
   Page 06 is now primarily a visual / educational page.

   It does NOT:
   ✗ Recalculate Page 02
   ✗ Recalculate Page 03
   ✗ Rebuild Page 04
   ✗ Rebuild Page 05
   ✗ Generate a roadmap
   ✗ Generate a report
   ✗ Generate a Google Doc
   ✗ Generate a PDF
   ✗ Call DocumentService
   ✗ Call finalizeJourney()
   ✗ Own email marketing copy
   ✗ Modify the global header
   ✗ Load or modify the global footer

   EMAIL:
   --------------------------------------------------------------------------
   The backend EmailService owns the fixed JOURNEY_COMPLETED email.

   Frontend sends only:

       {
           type: "JOURNEY_COMPLETED",
           to: registeredEmail,
           name: registeredName
       }

   NAVIGATION:
   --------------------------------------------------------------------------
   Page 06
       ↓
   confirmed completion email
       ↓
   mark Page 06 complete
       ↓
   page07.html

   ========================================================================== */

(function () {

    "use strict";


    /* ======================================================================
       CONFIGURATION
       ====================================================================== */

    const CONFIG = {

        pageName:
            "THE FOUR FORCES™",

        nextPage:
            "page07.html",

        journeyStorageKey:
            "CTM_GUIDED_JOURNEY_STATE",

        deliveryStorageKey:
            "CTM_PAGE06_EMAIL_DELIVERY",

        prescriptionStorageKey:
            "CTM_PAGE06_PRESCRIPTION",

        navigatorId:
            "page06-next-button",

        peopleStorageKeys: [

            "CTM_PERSON",
            "CTM_PEOPLE",

            "CTM_REGISTRATION",
            "CTM_REGISTRATION_DATA",

            "CTM_USER",
            "CTM_USER_DATA",

            "CTM_VISITOR",
            "CTM_VISITOR_DATA",

            "CTM_PROFILE",
            "CTM_PROFILE_DATA",

            "CTM_JOURNEY_IDENTITY",

            "CTM_PAGE01_REGISTRATION",
            "CTM_PAGE01_DATA"

        ]

    };


    /* ======================================================================
       STATE
       ====================================================================== */

    const state = {

        initialized:
            false,

        sending:
            false,

        sent:
            false,

        navigator:
            null,

        prescription:
            null

    };


    /* ======================================================================
       INITIALISE
       ====================================================================== */

    function init() {

        if (state.initialized) {

            bindNavigator();

            return;

        }


        state.initialized =
            true;


        /*
         * The visual Page 06 does not require
         * any dynamic rendering.
         *
         * We only preserve the existing journey
         * state architecture.
         */

        state.prescription =
            buildPage06Prescription();


        savePrescription(
            state.prescription
        );


        bindNavigator();


        exposeRuntime();

    }


    /* ======================================================================
       NAVIGATOR
       ====================================================================== */

    function bindNavigator() {

        const button =
            document.getElementById(
                CONFIG.navigatorId
            );


        if (!button) {

            /*
             * Page06 HTML is expected to contain
             * #page06-next-button.
             *
             * Do not generate noisy warnings here.
             * The page is allowed to initialise
             * before the DOM is completely available.
             */

            return false;

        }


        state.navigator =
            button;


        /*
         * Prevent duplicate listeners.
         */

        if (
            button.dataset &&
            button.dataset.ctmPage06Bound === "true"
        ) {

            return true;

        }


        if (button.dataset) {

            button.dataset.ctmPage06Bound =
                "true";

        }


        button.addEventListener(
            "click",
            handleNext,
            true
        );


        return true;

    }


    /* ======================================================================
       MAIN NAVIGATION FLOW
       ====================================================================== */

    async function handleNext(event) {

        if (event) {

            event.preventDefault();
            event.stopPropagation();


            if (
                typeof event.stopImmediatePropagation ===
                "function"
            ) {

                event.stopImmediatePropagation();

            }

        }


        /*
         * --------------------------------------------------------------
         * DOUBLE-CLICK PROTECTION
         * --------------------------------------------------------------
         */

        if (state.sending) {

            return;

        }


        /*
         * --------------------------------------------------------------
         * RESOLVE REGISTERED VISITOR
         * --------------------------------------------------------------
         */

        const identity =
            resolveIdentity();


        /*
         * --------------------------------------------------------------
         * EMAIL IS REQUIRED
         * --------------------------------------------------------------
         */

        if (!identity.email) {

            showError(
                "Your registered email address could not be recovered."
            );

            return;

        }


        /*
         * --------------------------------------------------------------
         * CHECK PREVIOUS CONFIRMED DELIVERY
         *
         * If this visitor already received the
         * JOURNEY_COMPLETED email, do not send it again.
         * --------------------------------------------------------------
         */

        const previousDelivery =
            loadDeliveryState();


        if (
            previousDelivery &&
            previousDelivery.status === "SENT" &&
            sameIdentity(
                previousDelivery,
                identity
            )
        ) {

            state.sent =
                true;


            markPageComplete();


            goToPage07();


            return;

        }


        /*
         * --------------------------------------------------------------
         * API VALIDATION
         * --------------------------------------------------------------
         */

        if (
            !window.CTM_API ||
            typeof window.CTM_API !== "object"
        ) {

            showError(
                "CTM PATH™ service is temporarily unavailable."
            );

            return;

        }


        if (
            typeof window.CTM_API.sendEmail !==
            "function"
        ) {

            showError(
                "CTM PATH™ email service is temporarily unavailable."
            );

            return;

        }


        /*
         * --------------------------------------------------------------
         * ACQUIRE IN-MEMORY LOCK
         * --------------------------------------------------------------
         */

        state.sending =
            true;


        setButtonBusy(
            true
        );


        try {

            /*
             * ----------------------------------------------------------
             * SAVE PROCESSING STATE
             * ----------------------------------------------------------
             */

            saveDeliveryState({

                status:
                    "PROCESSING",

                type:
                    "JOURNEY_COMPLETED",

                peopleId:
                    identity.peopleId || "",

                email:
                    identity.email,

                fullName:
                    identity.fullName || "",

                startedAt:
                    new Date().toISOString()

            });


            /*
             * ----------------------------------------------------------
             * SEND FIXED COMPLETION EMAIL
             *
             * No email copy lives in this file.
             *
             * The backend EmailService receives the type
             * JOURNEY_COMPLETED and owns the actual message.
             * ----------------------------------------------------------
             */

            const response =
                await window.CTM_API.sendEmail({

                    type:
                        "JOURNEY_COMPLETED",

                    to:
                        identity.email,

                    name:
                        identity.fullName || ""

                });


            /*
             * ----------------------------------------------------------
             * NORMALISE RESPONSE
             * ----------------------------------------------------------
             */

            const result =
                unwrapResponse(
                    response
                );


            /*
             * ----------------------------------------------------------
             * CONFIRM SUCCESS
             * ----------------------------------------------------------
             */

            verifyEmailSuccess(
                result
            );


            /*
             * ----------------------------------------------------------
             * SAVE CONFIRMED DELIVERY
             * ----------------------------------------------------------
             */

            const delivery = {

                status:
                    "SENT",

                type:
                    "JOURNEY_COMPLETED",

                peopleId:
                    identity.peopleId || "",

                email:
                    firstString(

                        result &&
                        result.recipient,

                        result &&
                        result.email,

                        result &&
                        result.to,

                        identity.email

                    ),

                fullName:
                    identity.fullName || "",

                emailSent:
                    true,

                deliveredAt:
                    new Date().toISOString()

            };


            saveDeliveryState(
                delivery
            );


            window.CTM_PAGE06_EMAIL_DELIVERY =
                delivery;


            state.sent =
                true;


            /*
             * ----------------------------------------------------------
             * MARK PAGE 06 COMPLETE
             * ----------------------------------------------------------
             */

            markPageComplete();


            /*
             * ----------------------------------------------------------
             * PAGE 07
             * ----------------------------------------------------------
             */

            goToPage07();

        }

        catch (error) {

            /*
             * Remove the temporary PROCESSING state
             * so the visitor can retry.
             */

            const currentDelivery =
                loadDeliveryState();


            if (
                currentDelivery &&
                currentDelivery.status === "PROCESSING" &&
                sameIdentity(
                    currentDelivery,
                    identity
                )
            ) {

                clearDeliveryState();

            }


            state.sending =
                false;


            setButtonBusy(
                false
            );


            showError(
                extractErrorMessage(
                    error
                )
            );

        }

    }


    /* ======================================================================
       IDENTITY RESOLUTION
       ====================================================================== */

    function resolveIdentity() {

        const candidates = [];


        /*
         * --------------------------------------------------------------
         * GLOBAL RUNTIME OBJECTS
         * --------------------------------------------------------------
         */

        pushCandidate(
            candidates,
            window.CTM_PERSON
        );

        pushCandidate(
            candidates,
            window.CTM_PEOPLE
        );

        pushCandidate(
            candidates,
            window.CTM_REGISTRATION
        );

        pushCandidate(
            candidates,
            window.CTM_USER
        );

        pushCandidate(
            candidates,
            window.CTM_VISITOR
        );

        pushCandidate(
            candidates,
            window.CTM_PROFILE
        );

        pushCandidate(
            candidates,
            window.CTM_JOURNEY_IDENTITY
        );


        /*
         * --------------------------------------------------------------
         * JOURNEY STATE
         * --------------------------------------------------------------
         */

        const journey =
            readStorageObject(
                CONFIG.journeyStorageKey
            );


        pushCandidate(
            candidates,
            journey
        );


        if (journey) {

            pushCandidate(
                candidates,
                journey.person
            );

            pushCandidate(
                candidates,
                journey.people
            );

            pushCandidate(
                candidates,
                journey.registration
            );

            pushCandidate(
                candidates,
                journey.identity
            );

            pushCandidate(
                candidates,
                journey.user
            );

            pushCandidate(
                candidates,
                journey.visitor
            );

            pushCandidate(
                candidates,
                journey.profile
            );

            pushCandidate(
                candidates,
                journey.data
            );

        }


        /*
         * --------------------------------------------------------------
         * KNOWN REGISTRATION STORAGE
         * --------------------------------------------------------------
         */

        CONFIG.peopleStorageKeys.forEach(
            function (key) {

                pushCandidate(
                    candidates,
                    readStorageObject(
                        key
                    )
                );

            }
        );


        /*
         * --------------------------------------------------------------
         * SEARCH CANDIDATES
         * --------------------------------------------------------------
         */

        let peopleId =
            "";

        let email =
            "";

        let fullName =
            "";


        for (
            let i = 0;
            i < candidates.length;
            i += 1
        ) {

            const candidate =
                candidates[i];


            if (!candidate) {

                continue;

            }


            if (!peopleId) {

                peopleId =
                    findValueDeep(
                        candidate,
                        [
                            "PeopleID",
                            "peopleId",
                            "peopleID",
                            "personId",
                            "personID",
                            "clientId",
                            "clientID"
                        ]
                    );

            }


            if (!email) {

                email =
                    findValueDeep(
                        candidate,
                        [
                            "Email",
                            "email",
                            "emailAddress",
                            "EmailAddress",
                            "registeredEmail"
                        ]
                    );

            }


            if (!fullName) {

                fullName =
                    findValueDeep(
                        candidate,
                        [
                            "FullName",
                            "fullName",
                            "Name",
                            "name",
                            "visitorName",
                            "registeredName"
                        ]
                    );

            }


            if (
                peopleId &&
                email &&
                fullName
            ) {

                break;

            }

        }


        /*
         * --------------------------------------------------------------
         * FINAL STORAGE RECOVERY
         * --------------------------------------------------------------
         */

        if (
            !peopleId ||
            !email ||
            !fullName
        ) {

            const scanned =
                scanBrowserStorage();


            if (!peopleId) {

                peopleId =
                    scanned.peopleId;

            }


            if (!email) {

                email =
                    scanned.email;

            }


            if (!fullName) {

                fullName =
                    scanned.fullName;

            }

        }


        return {

            peopleId:
                normalizeString(
                    peopleId
                ),

            email:
                normalizeString(
                    email
                ),

            fullName:
                normalizeString(
                    fullName
                )

        };

    }


    /* ======================================================================
       BROWSER STORAGE RECOVERY
       ====================================================================== */

    function scanBrowserStorage() {

        const result = {

            peopleId:
                "",

            email:
                "",

            fullName:
                ""

        };


        scanStorageArea(
            window.localStorage,
            result
        );


        if (
            !result.peopleId ||
            !result.email ||
            !result.fullName
        ) {

            scanStorageArea(
                window.sessionStorage,
                result
            );

        }


        return result;

    }


    function scanStorageArea(
        storage,
        result
    ) {

        if (!storage) {

            return;

        }


        try {

            for (
                let i = 0;
                i < storage.length;
                i += 1
            ) {

                const key =
                    storage.key(i);


                if (!key) {

                    continue;

                }


                const raw =
                    storage.getItem(
                        key
                    );


                if (!raw) {

                    continue;

                }


                let value =
                    null;


                try {

                    value =
                        JSON.parse(
                            raw
                        );

                }

                catch (error) {

                    continue;

                }


                if (
                    !value ||
                    typeof value !== "object"
                ) {

                    continue;

                }


                if (!result.peopleId) {

                    result.peopleId =
                        findValueDeep(
                            value,
                            [
                                "PeopleID",
                                "peopleId",
                                "peopleID",
                                "personId",
                                "clientId",
                                "clientID"
                            ]
                        );

                }


                if (!result.email) {

                    result.email =
                        findValueDeep(
                            value,
                            [
                                "Email",
                                "email",
                                "emailAddress",
                                "EmailAddress",
                                "registeredEmail"
                            ]
                        );

                }


                if (!result.fullName) {

                    result.fullName =
                        findValueDeep(
                            value,
                            [
                                "FullName",
                                "fullName",
                                "Name",
                                "name",
                                "visitorName",
                                "registeredName"
                            ]
                        );

                }


                if (
                    result.peopleId &&
                    result.email &&
                    result.fullName
                ) {

                    return;

                }

            }

        }

        catch (error) {

            /*
             * Storage access failure is non-fatal.
             */

        }

    }


    /* ======================================================================
       DEEP VALUE FINDER
       ====================================================================== */

    function findValueDeep(
        source,
        keys
    ) {

        if (
            !source ||
            typeof source !== "object"
        ) {

            return "";

        }


        /*
         * Direct property lookup.
         */

        for (
            let i = 0;
            i < keys.length;
            i += 1
        ) {

            const key =
                keys[i];


            if (
                Object.prototype.hasOwnProperty.call(
                    source,
                    key
                )
            ) {

                const value =
                    source[key];


                if (
                    value !== null &&
                    value !== undefined &&
                    String(value).trim() !== ""
                ) {

                    return String(
                        value
                    ).trim();

                }

            }

        }


        /*
         * Recursive lookup.
         */

        const sourceKeys =
            Object.keys(
                source
            );


        for (
            let i = 0;
            i < sourceKeys.length;
            i += 1
        ) {

            const value =
                source[
                    sourceKeys[i]
                ];


            if (
                value &&
                typeof value === "object"
            ) {

                const found =
                    findValueDeep(
                        value,
                        keys
                    );


                if (found) {

                    return found;

                }

            }

        }


        return "";

    }


    /* ======================================================================
       CANDIDATE HELPER
       ====================================================================== */

    function pushCandidate(
        candidates,
        value
    ) {

        if (
            value &&
            typeof value === "object"
        ) {

            candidates.push(
                value
            );

        }

    }


    /* ======================================================================
       PAGE 06 PRESCRIPTION STATE
       ====================================================================== */

    function buildPage06Prescription() {

        const diagnosis =
            readStorageObject(
                "CTM_PAGE05_DIAGNOSIS_RESULT"
            );


        return {

            version:
                "3.0",

            page:
                6,

            pageName:
                CONFIG.pageName,

            concept:
                "FOUR_FORCES",

            forces: [

                {
                    id:
                        "money",

                    title:
                        "MONEY",

                    purpose:
                        "Create financial capacity."

                },

                {
                    id:
                        "people",

                    title:
                        "PEOPLE",

                    purpose:
                        "Create leverage through people."

                },

                {
                    id:
                        "time",

                    title:
                        "TIME",

                    purpose:
                        "Protect freedom and focus."

                },

                {
                    id:
                        "tasks",

                    title:
                        "TASKS",

                    purpose:
                        "Turn effort into systems."

                }

            ],

            diagnosisSource:
                diagnosis || null,

            createdAt:
                new Date().toISOString()

        };

    }


    function savePrescription(
        prescription
    ) {

        if (!prescription) {

            return;

        }


        const serialized =
            JSON.stringify(
                prescription
            );


        try {

            window.sessionStorage.setItem(
                CONFIG.prescriptionStorageKey,
                serialized
            );

        }

        catch (error) {

            /*
             * Non-blocking.
             */

        }


        try {

            window.localStorage.setItem(
                CONFIG.prescriptionStorageKey,
                serialized
            );

        }

        catch (error) {

            /*
             * Non-blocking.
             */

        }


        window.CTM_PAGE06_PRESCRIPTION =
            prescription;

    }


    /* ======================================================================
       DELIVERY STATE
       ====================================================================== */

    function loadDeliveryState() {

        return readStorageObject(
            CONFIG.deliveryStorageKey
        );

    }


    function saveDeliveryState(
        value
    ) {

        try {

            window.sessionStorage.setItem(
                CONFIG.deliveryStorageKey,
                JSON.stringify(
                    value
                )
            );

        }

        catch (error) {

            /*
             * Non-blocking.
             */

        }

    }


    function clearDeliveryState() {

        try {

            window.sessionStorage.removeItem(
                CONFIG.deliveryStorageKey
            );

        }

        catch (error) {

            /*
             * Non-blocking.
             */

        }

    }


    /* ======================================================================
       SAME VISITOR CHECK
       ====================================================================== */

    function sameIdentity(
        delivery,
        identity
    ) {

        if (
            !delivery ||
            !identity
        ) {

            return false;

        }


        const deliveryPeopleId =
            normalizeString(
                delivery.peopleId
            );


        const identityPeopleId =
            normalizeString(
                identity.peopleId
            );


        if (
            deliveryPeopleId &&
            identityPeopleId
        ) {

            return (
                deliveryPeopleId ===
                identityPeopleId
            );

        }


        const deliveryEmail =
            normalizeString(
                delivery.email
            ).toLowerCase();


        const identityEmail =
            normalizeString(
                identity.email
            ).toLowerCase();


        return Boolean(

            deliveryEmail &&
            identityEmail &&
            deliveryEmail ===
                identityEmail

        );

    }


    /* ======================================================================
       MARK PAGE 06 COMPLETE
       ====================================================================== */

    function markPageComplete() {

        let journey =
            readStorageObject(
                CONFIG.journeyStorageKey
            );


        if (!journey) {

            journey = {};

        }


        /*
         * Preserve all existing journey data.
         */

        journey.page06Completed =
            true;


        journey.page06CompletedAt =
            new Date().toISOString();


        journey.currentPage =
            7;


        journey.lastCompletedPage =
            Math.max(

                Number(
                    journey.lastCompletedPage || 0
                ),

                6

            );


        journey.lastUpdatedAt =
            new Date().toISOString();


        /*
         * Persist to localStorage.
         */

        try {

            window.localStorage.setItem(
                CONFIG.journeyStorageKey,
                JSON.stringify(
                    journey
                )
            );

        }

        catch (error) {

            /*
             * Non-blocking.
             */

        }


        /*
         * Keep sessionStorage aligned.
         */

        try {

            window.sessionStorage.setItem(
                CONFIG.journeyStorageKey,
                JSON.stringify(
                    journey
                )
            );

        }

        catch (error) {

            /*
             * Non-blocking.
             */

        }

    }


    /* ======================================================================
       PAGE 07 NAVIGATION
       ====================================================================== */

    function goToPage07() {

        /*
         * Explicit destination.
         *
         * Page 06 has exactly one possible
         * forward destination.
         */

        window.location.href =
            CONFIG.nextPage;

    }


    /* ======================================================================
       BUTTON BUSY STATE
       ====================================================================== */

    function setButtonBusy(
        busy
    ) {

        const button =
            state.navigator;


        if (!button) {

            return;

        }


        if (busy) {

            if (
                !button.dataset.originalHtml
            ) {

                button.dataset.originalHtml =
                    button.innerHTML;

            }


            button.setAttribute(
                "aria-busy",
                "true"
            );


            button.setAttribute(
                "aria-disabled",
                "true"
            );


            if (
                "disabled" in button
            ) {

                button.disabled =
                    true;

            }


            button.innerHTML =
                [
                    '<span class="cta-ta">',
                    "உங்கள் அடுத்த படி தயாராகிறது…",
                    "</span>",
                    '<span class="cta-en">',
                    "PREPARING YOUR NEXT STEP…",
                    "</span>"
                ].join("");

            return;

        }


        button.removeAttribute(
            "aria-busy"
        );


        button.removeAttribute(
            "aria-disabled"
        );


        if (
            "disabled" in button
        ) {

            button.disabled =
                false;

        }


        if (
            button.dataset.originalHtml
        ) {

            button.innerHTML =
                button.dataset.originalHtml;

        }

    }


    /* ======================================================================
       API RESPONSE NORMALISER
       ====================================================================== */

    function unwrapResponse(
        response
    ) {

        if (
            response === null ||
            response === undefined
        ) {

            throw new Error(
                "The CTM PATH™ email service returned no response."
            );

        }


        /*
         * String response.
         */

        if (
            typeof response === "string"
        ) {

            try {

                response =
                    JSON.parse(
                        response
                    );

            }

            catch (error) {

                throw new Error(
                    response
                );

            }

        }


        /*
         * Explicit failure.
         */

        if (
            response &&
            response.success === false
        ) {

            throw new Error(
                extractErrorMessage(
                    response
                )
            );

        }


        if (
            response &&
            response.status &&
            String(
                response.status
            ).toUpperCase() === "FAILURE"
        ) {

            throw new Error(
                extractErrorMessage(
                    response
                )
            );

        }


        if (
            response &&
            response.status &&
            String(
                response.status
            ).toUpperCase() === "ERROR"
        ) {

            throw new Error(
                extractErrorMessage(
                    response
                )
            );

        }


        /*
         * Standard API wrapper.
         */

        if (
            response &&
            response.data &&
            typeof response.data === "object"
        ) {

            return response.data;

        }


        return response;

    }


    /* ======================================================================
       VERIFY EMAIL SUCCESS
       ====================================================================== */

    function verifyEmailSuccess(
        result
    ) {

        if (
            !result ||
            typeof result !== "object"
        ) {

            throw new Error(
                "CTM PATH™ completion email delivery was not confirmed."
            );

        }


        /*
         * Explicit negative responses.
         */

        if (
            result.success === false
        ) {

            throw new Error(
                extractErrorMessage(
                    result
                )
            );

        }


        if (
            result.emailSent === false
        ) {

            throw new Error(
                extractErrorMessage(
                    result
                )
            );

        }


        if (
            result.sent === false
        ) {

            throw new Error(
                extractErrorMessage(
                    result
                )
            );

        }


        /*
         * Require an affirmative signal.
         */

        const confirmed =

            result.success === true ||

            result.emailSent === true ||

            result.sent === true ||

            String(
                result.status || ""
            ).toUpperCase() === "SUCCESS";


        if (!confirmed) {

            throw new Error(
                "CTM PATH™ completion email delivery was not confirmed."
            );

        }

    }


    /* ======================================================================
       ERROR HANDLING
       ====================================================================== */

    function showError(
        message
    ) {

        const finalMessage =
            normalizeString(
                message
            ) ||
            "Unable to continue. Please try again.";


        window.alert(

            "உங்கள் அடுத்த படியைத் திறக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.\n\n" +
            "We could not continue to your next step yet. Please try again.\n\n" +
            finalMessage

        );

    }


    function extractErrorMessage(
        value
    ) {

        if (!value) {

            return (
                "Unable to send the CTM PATH™ completion email."
            );

        }


        if (
            typeof value === "string"
        ) {

            return value;

        }


        if (
            value instanceof Error &&
            value.message
        ) {

            return value.message;

        }


        const candidates = [

            value.message,
            value.error,
            value.errorMessage,
            value.reason,
            value.details

        ];


        for (
            let i = 0;
            i < candidates.length;
            i += 1
        ) {

            const candidate =
                candidates[i];


            if (
                typeof candidate === "string" &&
                candidate.trim()
            ) {

                return candidate.trim();

            }


            if (
                candidate &&
                typeof candidate === "object"
            ) {

                const nested =
                    extractErrorMessage(
                        candidate
                    );


                if (nested) {

                    return nested;

                }

            }

        }


        return (
            "Unable to send the CTM PATH™ completion email."
        );

    }


    /* ======================================================================
       STORAGE READER
       ====================================================================== */

    function readStorageObject(
        key
    ) {

        if (!key) {

            return null;

        }


        /*
         * localStorage first.
         */

        try {

            const raw =
                window.localStorage.getItem(
                    key
                );


            if (raw) {

                const parsed =
                    parseJson(
                        raw
                    );


                if (parsed) {

                    return parsed;

                }

            }

        }

        catch (error) {

            /*
             * Continue to sessionStorage.
             */

        }


        /*
         * sessionStorage.
         */

        try {

            const raw =
                window.sessionStorage.getItem(
                    key
                );


            if (raw) {

                return parseJson(
                    raw
                );

            }

        }

        catch (error) {

            /*
             * Non-blocking.
             */

        }


        return null;

    }


    /* ======================================================================
       JSON PARSER
       ====================================================================== */

    function parseJson(
        value
    ) {

        if (!value) {

            return null;

        }


        if (
            typeof value === "object"
        ) {

            return value;

        }


        try {

            return JSON.parse(
                value
            );

        }

        catch (error) {

            return null;

        }

    }


    /* ======================================================================
       STRING HELPERS
       ====================================================================== */

    function normalizeString(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        return String(
            value
        ).trim();

    }


    function firstString() {

        for (
            let i = 0;
            i < arguments.length;
            i += 1
        ) {

            const value =
                normalizeString(
                    arguments[i]
                );


            if (value) {

                return value;

            }

        }


        return "";

    }


    /* ======================================================================
       PUBLIC RUNTIME
       ====================================================================== */

    function exposeRuntime() {

        window.CTM_PAGE06 = {

            version:
                "3.0",

            mode:
                "FOUR_FORCES_VISUAL_PAGE",

            init:
                init,

            getIdentity:
                function () {

                    return resolveIdentity();

                },

            getDelivery:
                function () {

                    return loadDeliveryState();

                },

            getPrescription:
                function () {

                    return state.prescription;

                },

            clearDelivery:
                function () {

                    clearDeliveryState();

                    state.sent =
                        false;

                },

            send:
                function () {

                    return handleNext();

                },

            goToPage07:
                function () {

                    goToPage07();

                }

        };

    }


    /* ======================================================================
       DOM READY
       ====================================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once:
                    true
            }
        );

    }

    else {

        init();

    }


    /* ======================================================================
       POST-LOAD RECOVERY
       ====================================================================== */

    window.addEventListener(
        "load",
        function () {

            bindNavigator();

        }
    );


    document.addEventListener(
        "ctm:components-ready",
        function () {

            bindNavigator();

        }
    );


})();

