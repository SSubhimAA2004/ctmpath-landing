
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™
   GUIDED JOURNEY™

   FILE:
   js/page06.js

   PAGE:
   PAGE 06 — PERSONAL TRANSFORMATION PRESCRIPTION™

   VERSION:
   3.0 — LAUNCH SAFE

   PURPOSE:

   Page 06 has ONE final responsibility:

   1. Display the Personal Transformation Prescription™
   2. Bind the Page 06 navigator button
   3. Recover the visitor's registered identity
   4. Send the fixed JOURNEY_COMPLETED email
   5. Navigate to Page 07

   PAGE 06 DOES NOT:

   - Generate PDF reports
   - Generate Google Docs
   - Call DocumentService
   - Generate Roadmaps
   - Call finalizeJourney()
   - Persist LifeAlignment
   - Attach reports
   - Run any complex finalisation chain

   EMAIL COPY:

   09_EmailService.gs owns the fixed bilingual
   JOURNEY_COMPLETED email.

   NAVIGATOR:

   HTML ID:
   #page06-next-button

   NEXT PAGE:
   page07.html

========================================================================== */

(function () {

    "use strict";


    /* ======================================================================
       CONFIGURATION
    ====================================================================== */

    const CONFIG = {

        pageName:
            "PERSONAL TRANSFORMATION PRESCRIPTION™",

        navigatorId:
            "page06-next-button",

        nextPage:
            "page07.html",

        journeyStorageKey:
            "CTM_GUIDED_JOURNEY_STATE",

        deliveryStorageKey:
            "CTM_PAGE06_EMAIL_DELIVERY"

    };


    /* ======================================================================
       STATE
    ====================================================================== */

    const state = {

        initialized:
            false,

        bound:
            false,

        sending:
            false,

        navigator:
            null

    };


    /* ======================================================================
       INITIALISE
    ====================================================================== */

    function init() {

        if (state.initialized) {
            return;
        }

        state.initialized =
            true;


        console.log(
            "CTM PATH™ Page06 Launch Flow Ready"
        );


        bindNavigator();


        exposeRuntime();

    }


    /* ======================================================================
       BIND NAVIGATOR

       SINGLE SOURCE OF TRUTH:

       #page06-next-button
    ====================================================================== */

    function bindNavigator() {

        if (state.bound) {
            return true;
        }


        const button =
            document.getElementById(
                CONFIG.navigatorId
            );


        if (!button) {

            console.warn(
                "Page06: #page06-next-button not available yet."
            );

            return false;

        }


        state.navigator =
            button;


        button.addEventListener(
            "click",
            handleNavigatorClick
        );


        state.bound =
            true;


        console.log(
            "Page06: Navigator connected successfully."
        );


        return true;

    }


    /* ======================================================================
       NAVIGATOR CLICK

       FLOW:

       CLICK
         ↓
       Recover identity
         ↓
       Send JOURNEY_COMPLETED email
         ↓
       Confirm backend success
         ↓
       Mark Page 06 complete
         ↓
       Page 07
    ====================================================================== */

    async function handleNavigatorClick(event) {

        if (event) {

            event.preventDefault();

        }


        if (state.sending) {

            console.log(
                "Page06: Email send already in progress."
            );

            return;

        }


        const identity =
            resolveIdentity();


        console.log(
            "Page06 Visitor Identity:",
            identity
        );


        /* ------------------------------------------------------------------
           EMAIL IS REQUIRED
        ------------------------------------------------------------------ */

        if (!identity.email) {

            showError(
                "Your registered email address could not be recovered."
            );

            return;

        }


        /* ------------------------------------------------------------------
           PREVENT DUPLICATE EMAIL
        ------------------------------------------------------------------ */

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

            console.log(
                "Page06: Completion email already sent."
            );


            markPageComplete();

            goToPage07();

            return;

        }


        /* ------------------------------------------------------------------
           API CHECK
        ------------------------------------------------------------------ */

        if (
            !window.CTM_API ||
            typeof window.CTM_API !== "object"
        ) {

            showError(
                "CTM PATH™ API service is unavailable."
            );

            return;

        }


        if (
            typeof window.CTM_API.sendEmail !==
            "function"
        ) {

            showError(
                "CTM PATH™ email service is unavailable."
            );

            return;

        }


        /* ------------------------------------------------------------------
           LOCK BUTTON
        ------------------------------------------------------------------ */

        state.sending =
            true;


        setButtonBusy(
            true
        );


        try {


            /* --------------------------------------------------------------
               SAVE PROCESSING STATE
            -------------------------------------------------------------- */

            saveDeliveryState({

                status:
                    "PROCESSING",

                type:
                    "JOURNEY_COMPLETED",

                peopleId:
                    identity.peopleId,

                email:
                    identity.email,

                fullName:
                    identity.fullName,

                startedAt:
                    new Date().toISOString()

            });


            /* --------------------------------------------------------------
               SEND EMAIL

               IMPORTANT:

               The marketing copy is NOT stored here.

               09_EmailService.gs owns the actual bilingual
               JOURNEY_COMPLETED email.
            -------------------------------------------------------------- */

            console.log(
                "Page06: Sending JOURNEY_COMPLETED email..."
            );


            const response =
                await window.CTM_API.sendEmail({

                    type:
                        "JOURNEY_COMPLETED",

                    to:
                        identity.email,

                    name:
                        identity.fullName || ""

                });


            console.log(
                "Page06 Email Response:",
                response
            );


            /* --------------------------------------------------------------
               NORMALISE RESPONSE
            -------------------------------------------------------------- */

            const result =
                unwrapResponse(
                    response
                );


            /* --------------------------------------------------------------
               VERIFY SUCCESS
            -------------------------------------------------------------- */

            verifyEmailSuccess(
                result
            );


            /* --------------------------------------------------------------
               SAVE SUCCESS
            -------------------------------------------------------------- */

            const delivery = {

                status:
                    "SENT",

                type:
                    "JOURNEY_COMPLETED",

                peopleId:
                    identity.peopleId,

                email:
                    identity.email,

                fullName:
                    identity.fullName,

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


            console.log(
                "Page06: JOURNEY_COMPLETED email confirmed."
            );


            /* --------------------------------------------------------------
               MARK PAGE COMPLETE
            -------------------------------------------------------------- */

            markPageComplete();


            /* --------------------------------------------------------------
               MOVE TO PAGE 07
            -------------------------------------------------------------- */

            goToPage07();

        }
        catch (error) {


            console.error(
                "Page06 Email Delivery Failed:",
                error
            );


            clearProcessingState(
                identity
            );


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
       RESPONSE NORMALISER
    ====================================================================== */

    function unwrapResponse(response) {

        if (
            response === null ||
            response === undefined
        ) {

            throw new Error(
                "The email service returned no response."
            );

        }


        /* ------------------------------------------------------------------
           STRING RESPONSE
        ------------------------------------------------------------------ */

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


        /* ------------------------------------------------------------------
           TOP LEVEL FAILURE
        ------------------------------------------------------------------ */

        if (
            response.success === false
        ) {

            throw new Error(
                extractErrorMessage(
                    response
                )
            );

        }


        const responseStatus =
            String(
                response.status || ""
            ).toUpperCase();


        if (
            responseStatus === "FAILURE" ||
            responseStatus === "ERROR"
        ) {

            throw new Error(
                extractErrorMessage(
                    response
                )
            );

        }


        /* ------------------------------------------------------------------
           COMMON API WRAPPER
        ------------------------------------------------------------------ */

        if (
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

    function verifyEmailSuccess(result) {

        if (
            !result ||
            typeof result !== "object"
        ) {

            throw new Error(
                "Email delivery confirmation was not returned."
            );

        }


        /* ------------------------------------------------------------------
           EXPLICIT FAILURES
        ------------------------------------------------------------------ */

        if (
            result.success === false ||
            result.emailSent === false ||
            result.sent === false
        ) {

            throw new Error(
                extractErrorMessage(
                    result
                )
            );

        }


        /* ------------------------------------------------------------------
           AFFIRMATIVE CONFIRMATION
        ------------------------------------------------------------------ */

        const status =
            String(
                result.status || ""
            ).toUpperCase();


        const confirmed =

            result.success === true ||

            result.emailSent === true ||

            result.sent === true ||

            status === "SUCCESS" ||

            status === "SENT";


        if (!confirmed) {

            throw new Error(
                "CTM PATH™ email delivery was not confirmed."
            );

        }

    }


    /* ======================================================================
       RESOLVE VISITOR IDENTITY

       We recover identity from the existing journey/browser state.

       Earlier pages remain untouched.
    ====================================================================== */

    function resolveIdentity() {

        const identity = {

            peopleId:
                "",

            email:
                "",

            fullName:
                ""

        };


        const candidates =
            [];


        /* ------------------------------------------------------------------
           GLOBAL OBJECTS
        ------------------------------------------------------------------ */

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


        /* ------------------------------------------------------------------
           JOURNEY STATE
        ------------------------------------------------------------------ */

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


        /* ------------------------------------------------------------------
           KNOWN STORAGE OBJECTS
        ------------------------------------------------------------------ */

        const storageKeys = [

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

        ];


        storageKeys.forEach(

            function (key) {

                pushCandidate(
                    candidates,
                    readStorageObject(
                        key
                    )
                );

            }

        );


        /* ------------------------------------------------------------------
           READ CANDIDATES
        ------------------------------------------------------------------ */

        for (
            let i = 0;
            i < candidates.length;
            i++
        ) {

            const candidate =
                candidates[i];


            if (!candidate) {
                continue;
            }


            if (!identity.peopleId) {

                identity.peopleId =
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


            if (!identity.email) {

                identity.email =
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


            if (!identity.fullName) {

                identity.fullName =
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
                identity.peopleId &&
                identity.email &&
                identity.fullName
            ) {

                break;

            }

        }


        /* ------------------------------------------------------------------
           FINAL STORAGE SCAN
        ------------------------------------------------------------------ */

        if (
            !identity.peopleId ||
            !identity.email ||
            !identity.fullName
        ) {

            scanStorageArea(
                window.localStorage,
                identity
            );


            scanStorageArea(
                window.sessionStorage,
                identity
            );

        }


        identity.peopleId =
            normalizeString(
                identity.peopleId
            );


        identity.email =
            normalizeString(
                identity.email
            );


        identity.fullName =
            normalizeString(
                identity.fullName
            );


        return identity;

    }


    /* ======================================================================
       STORAGE SCANNER
    ====================================================================== */

    function scanStorageArea(
        storage,
        identity
    ) {

        if (!storage) {
            return;
        }


        try {

            for (
                let i = 0;
                i < storage.length;
                i++
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


                if (!identity.peopleId) {

                    identity.peopleId =
                        findValueDeep(
                            value,
                            [
                                "PeopleID",
                                "peopleId",
                                "peopleID",
                                "personId",
                                "clientId"
                            ]
                        );

                }


                if (!identity.email) {

                    identity.email =
                        findValueDeep(
                            value,
                            [
                                "Email",
                                "email",
                                "emailAddress",
                                "registeredEmail"
                            ]
                        );

                }


                if (!identity.fullName) {

                    identity.fullName =
                        findValueDeep(
                            value,
                            [
                                "FullName",
                                "fullName",
                                "Name",
                                "name"
                            ]
                        );

                }


                if (
                    identity.peopleId &&
                    identity.email &&
                    identity.fullName
                ) {

                    return;

                }

            }

        }
        catch (error) {

            console.warn(
                "Page06: Storage scan unavailable.",
                error
            );

        }

    }


    /* ======================================================================
       DEEP VALUE FINDER
    ====================================================================== */

    function findValueDeep(
        source,
        keys,
        visited
    ) {

        if (
            !source ||
            typeof source !== "object"
        ) {

            return "";

        }


        visited =
            visited || [];


        if (
            visited.indexOf(
                source
            ) !== -1
        ) {

            return "";

        }


        visited.push(
            source
        );


        /* ------------------------------------------------------------------
           DIRECT MATCH
        ------------------------------------------------------------------ */

        for (
            let i = 0;
            i < keys.length;
            i++
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
                    typeof value !== "object" &&
                    String(value).trim() !== ""
                ) {

                    return String(
                        value
                    ).trim();

                }

            }

        }


        /* ------------------------------------------------------------------
           RECURSIVE MATCH
        ------------------------------------------------------------------ */

        const sourceKeys =
            Object.keys(
                source
            );


        for (
            let i = 0;
            i < sourceKeys.length;
            i++
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
                        keys,
                        visited
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
       DELIVERY STATE
    ====================================================================== */

    function loadDeliveryState() {

        return readStorageObject(
            CONFIG.deliveryStorageKey
        );

    }


    function saveDeliveryState(value) {

        try {

            window.sessionStorage.setItem(

                CONFIG.deliveryStorageKey,

                JSON.stringify(
                    value
                )

            );

        }
        catch (error) {

            console.warn(
                "Page06: Unable to save delivery state.",
                error
            );

        }

    }


    function clearDeliveryState() {

        try {

            window.sessionStorage.removeItem(
                CONFIG.deliveryStorageKey
            );

        }
        catch (error) {

            console.warn(
                "Page06: Unable to clear delivery state.",
                error
            );

        }

    }


    function clearProcessingState(identity) {

        const current =
            loadDeliveryState();


        if (
            current &&
            current.status === "PROCESSING" &&
            sameIdentity(
                current,
                identity
            )
        ) {

            clearDeliveryState();

        }

    }


    /* ======================================================================
       SAME VISITOR
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

        try {

            const journey =
                readStorageObject(
                    CONFIG.journeyStorageKey
                ) || {};


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


            const serialized =
                JSON.stringify(
                    journey
                );


            try {

                window.localStorage.setItem(
                    CONFIG.journeyStorageKey,
                    serialized
                );

            }
            catch (localError) {

                console.warn(
                    "Page06: localStorage journey update unavailable.",
                    localError
                );

            }


            try {

                window.sessionStorage.setItem(
                    CONFIG.journeyStorageKey,
                    serialized
                );

            }
            catch (sessionError) {

                console.warn(
                    "Page06: sessionStorage journey update unavailable.",
                    sessionError
                );

            }


            console.log(
                "Page06: Journey marked complete."
            );

        }
        catch (error) {

            /*
             * IMPORTANT:
             *
             * Journey-state persistence is NOT allowed
             * to block Page 07 after the email succeeds.
             */

            console.warn(
                "Page06: Journey completion state could not be updated.",
                error
            );

        }

    }


    /* ======================================================================
       NAVIGATE TO PAGE 07
    ====================================================================== */

    function goToPage07() {

        console.log(
            "Page06 → Page07"
        );


        window.location.href =
            CONFIG.nextPage;

    }


    /* ======================================================================
       BUTTON BUSY STATE
    ====================================================================== */

    function setButtonBusy(busy) {

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
                    '<span class="page06-email-status">',
                    '<span>உங்கள் அழைப்பு அனுப்பப்படுகிறது...</span>',
                    '<span>SENDING YOUR INVITATION...</span>',
                    '</span>'
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
       ERROR DISPLAY
    ====================================================================== */

    function showError(message) {

        const finalMessage =
            normalizeString(
                message
            ) ||
            "Unable to send your CTM PATH™ invitation email.";


        window.alert(

            "உங்கள் அடுத்த படிக்கான மின்னஞ்சலை இப்போது அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.\n\n" +

            "We could not send your CTM PATH™ invitation email yet. Please try again.\n\n" +

            finalMessage

        );

    }


    /* ======================================================================
       ERROR MESSAGE EXTRACTOR
    ====================================================================== */

    function extractErrorMessage(value) {

        if (!value) {

            return (
                "Unable to send your CTM PATH™ completion email."
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
            i++
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
            "Unable to send your CTM PATH™ completion email."
        );

    }


    /* ======================================================================
       READ STORAGE OBJECT
    ====================================================================== */

    function readStorageObject(key) {

        if (!key) {
            return null;
        }


        /* ------------------------------------------------------------------
           LOCAL STORAGE
        ------------------------------------------------------------------ */

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


        /* ------------------------------------------------------------------
           SESSION STORAGE
        ------------------------------------------------------------------ */

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

    function parseJson(value) {

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
       STRING HELPER
    ====================================================================== */

    function normalizeString(value) {

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


    /* ======================================================================
       TEST / DEBUG RUNTIME

       Browser console:

       CTM_PAGE06.getIdentity()
       CTM_PAGE06.getDelivery()
       CTM_PAGE06.send()
       CTM_PAGE06.clearDelivery()
       CTM_PAGE06.goToPage07()
    ====================================================================== */

    function exposeRuntime() {

        window.CTM_PAGE06 = {

            version:
                "3.0",

            mode:
                "LAUNCH_SAFE",

            getIdentity:
                function () {

                    return resolveIdentity();

                },

            getDelivery:
                function () {

                    return loadDeliveryState();

                },

            clearDelivery:
                function () {

                    clearDeliveryState();

                    console.log(
                        "Page06: Delivery state cleared."
                    );

                },

            send:
                function () {

                    return handleNavigatorClick();

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
        document.readyState === "loading"
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
       COMPONENT LOADER COMPATIBILITY

       Header/footer are asynchronously loaded.

       This second attempt is harmless because bindNavigator()
       refuses duplicate binding.
    ====================================================================== */

    window.addEventListener(

        "load",

        function () {

            if (!state.bound) {

                bindNavigator();

            }

        }

    );


    document.addEventListener(

        "ctm:components-ready",

        function () {

            if (!state.bound) {

                bindNavigator();

            }

        }

    );


    /* ======================================================================
       SHORT DELAY RECOVERY

       Covers pages where component loading completes shortly after
       DOMContentLoaded but does not emit ctm:components-ready.
    ====================================================================== */

    window.setTimeout(

        function () {

            if (!state.bound) {

                bindNavigator();

            }

        },

        500

    );


    window.setTimeout(

        function () {

            if (!state.bound) {

                bindNavigator();

            }

        },

        1500

    );


    /* ======================================================================
       END
    ====================================================================== */

})();

