
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   js/page06.js

   PAGE:
   PERSONAL TRANSFORMATION PRESCRIPTION™

   VERSION:
   2.0 — SIMPLIFIED LAUNCH FLOW

   PURPOSE:

   Page 06 is the final transformation/prescription page.

   On the navigator button:

   1. Recover visitor identity
   2. Send JOURNEY_COMPLETED email
   3. Wait for confirmed backend success
   4. Mark Page 06 complete
   5. Navigate to page07.html

   REMOVED FROM PAGE 06 NAVIGATION:

   ✗ Roadmap generation
   ✗ Report generation
   ✗ Google Doc generation
   ✗ PDF generation
   ✗ DocumentService
   ✗ finalizeJourney()
   ✗ ReportEngine
   ✗ PDF attachment
   ✗ Complex finalization chain

   EMAIL CONTENT:

   Page06 does NOT contain the email copy.

   09_EmailService.gs owns the fixed bilingual
   JOURNEY_COMPLETED email and Calendly CTA.

========================================================================== */

(function () {

    "use strict";


    /* ======================================================================
       CONFIGURATION
    ====================================================================== */

    const CONFIG = {

        pageName:
            "PERSONAL TRANSFORMATION PRESCRIPTION™",

        nextPage:
            "page07.html",

        journeyStorageKey:
            "CTM_GUIDED_JOURNEY_STATE",

        deliveryStorageKey:
            "CTM_PAGE06_EMAIL_DELIVERY",

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
            null

    };


    /* ======================================================================
       INITIALIZE
    ====================================================================== */

    function init() {

        if (state.initialized) {
            return;
        }


        state.initialized =
            true;


        console.log(
            "CTM PATH™ Page06 Simplified Launch Flow Ready"
        );


        bindNavigator();


        exposeRuntime();

    }


    /* ======================================================================
       FIND NAVIGATOR

       Supports the existing Page06 markup without requiring
       page06.html changes.

       We deliberately search several likely selectors because
       the HTML is frozen and the JS should adapt to it.
    ====================================================================== */

    function findNavigator() {

        const selectors = [

            "[data-page06-next]",

            "[data-next-page]",

            "#page06Next",

            "#page06-next",

            "#nextPage",

            "#next-page",

            "#nextButton",

            "#next-button",

            "#continueButton",

            "#continue-button",

            ".page06-next",

            ".next-page",

            ".journey-next",

            ".navigator-next",

            ".page-navigator__next",

            ".page-navigator-next"

        ];


        for (
            let i = 0;
            i < selectors.length;
            i++
        ) {

            const element =
                document.querySelector(
                    selectors[i]
                );


            if (element) {

                return element;

            }

        }


        /*
         * --------------------------------------------------------------
         * FALLBACK
         *
         * Find a link/button whose destination is page07.
         * --------------------------------------------------------------
         */

        const links =
            document.querySelectorAll(
                'a[href*="page07"], button'
            );


        for (
            let i = 0;
            i < links.length;
            i++
        ) {

            const element =
                links[i];


            const href =
                element.getAttribute("href") || "";


            const text =
                (
                    element.textContent || ""
                )
                    .trim()
                    .toLowerCase();


            if (
                href.indexOf("page07") !== -1
            ) {

                return element;

            }


            if (
                text.indexOf("next") !== -1 ||
                text.indexOf("continue") !== -1 ||
                text.indexOf("complete") !== -1 ||
                text.indexOf("journey") !== -1
            ) {

                /*
                 * Keep looking for a more certain match.
                 */

                continue;

            }

        }


        return null;

    }


    /* ======================================================================
       BIND NAVIGATOR
    ====================================================================== */

    function bindNavigator() {

        const navigator =
            findNavigator();


        if (!navigator) {

            console.warn(
                "Page06: Navigator button not found."
            );


            return;

        }


        state.navigator =
            navigator;


        /*
         * Prevent an existing anchor href from navigating
         * before the email completes.
         */

        if (
            navigator.tagName &&
            navigator.tagName.toLowerCase() === "a"
        ) {

            navigator.dataset.originalHref =
                navigator.getAttribute("href") || "";

        }


        navigator.addEventListener(
            "click",
            handleNext,
            true
        );


        console.log(
            "Page06: Navigator connected to simplified email flow."
        );

    }


    /* ======================================================================
       HANDLE NEXT

       FINAL LAUNCH FLOW:

       CLICK
          ↓
       Resolve identity
          ↓
       Prevent duplicate
          ↓
       CTM_API.sendEmail()
          ↓
       Confirm success
          ↓
       Mark Page06 complete
          ↓
       page07.html
    ====================================================================== */

    async function handleNext(
        event
    ) {

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
         * DOUBLE CLICK PROTECTION
         * --------------------------------------------------------------
         */

        if (state.sending) {

            console.warn(
                "Page06: Email delivery already in progress."
            );


            return;

        }


        /*
         * --------------------------------------------------------------
         * RESOLVE VISITOR
         * --------------------------------------------------------------
         */

        const identity =
            resolveIdentity();


        console.log(
            "Page06 Visitor Identity:",
            identity
        );


        /*
         * --------------------------------------------------------------
         * EMAIL IS REQUIRED
         * --------------------------------------------------------------
         */

        if (!identity.email) {

            showError(
                "Your registered email address could not be recovered. Please restart the journey from your registration session."
            );


            return;

        }


        /*
         * --------------------------------------------------------------
         * CHECK PREVIOUS SUCCESS
         *
         * If the email was already confirmed for this visitor,
         * do not send it twice.
         * --------------------------------------------------------------
         */

        const previous =
            loadDeliveryState();


        if (
            previous &&
            previous.status === "SENT" &&
            sameIdentity(
                previous,
                identity
            )
        ) {

            console.log(
                "Page06: Completion email already sent. Moving to Page07."
            );


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


        /*
         * --------------------------------------------------------------
         * LOCK
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
             * SEND EMAIL
             *
             * IMPORTANT:
             *
             * No email marketing copy lives here.
             *
             * 09_EmailService.gs receives:
             *
             * type = JOURNEY_COMPLETED
             *
             * and selects the fixed bilingual completion /
             * mentorship / Calendly email.
             * ----------------------------------------------------------
             */

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


            /*
             * ----------------------------------------------------------
             * NORMALIZE RESPONSE
             * ----------------------------------------------------------
             */

            const result =
                unwrapResponse(
                    response
                );


            /*
             * ----------------------------------------------------------
             * VERIFY SUCCESS
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
             * MARK JOURNEY COMPLETE
             * ----------------------------------------------------------
             */

            markPageComplete();


            console.log(
                "Page06: Completion email confirmed."
            );


            /*
             * ----------------------------------------------------------
             * GO TO CTA PAGE
             * ----------------------------------------------------------
             */

            goToPage07();

        }
        catch (error) {


            console.error(
                "Page06 Email Delivery Failed:",
                error
            );


            /*
             * Remove PROCESSING lock so visitor can retry.
             */

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
       RESPONSE NORMALIZER

       Supports common API wrapper patterns:

       {
          success: true,
          data: {...}
       }

       OR

       {
          status: "SUCCESS",
          data: {...}
       }

       OR direct EmailService response.
    ====================================================================== */

    function unwrapResponse(
        response
    ) {

        if (
            response === null ||
            response === undefined
        ) {

            throw new Error(
                "The email service returned no response."
            );

        }


        /*
         * --------------------------------------------------------------
         * STRING RESPONSE
         * --------------------------------------------------------------
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
         * --------------------------------------------------------------
         * TOP-LEVEL FAILURE
         * --------------------------------------------------------------
         */

        if (
            response.success === false
        ) {

            throw new Error(
                extractErrorMessage(
                    response
                )
            );

        }


        if (
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
         * --------------------------------------------------------------
         * NESTED DATA
         * --------------------------------------------------------------
         */

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

    function verifyEmailSuccess(
        result
    ) {

        if (
            !result ||
            typeof result !== "object"
        ) {

            throw new Error(
                "Email delivery confirmation was not returned."
            );

        }


        /*
         * Explicit failures.
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
         * Require affirmative confirmation.
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
                "CTM PATH™ email delivery was not confirmed."
            );

        }

    }


    /* ======================================================================
       RESOLVE VISITOR IDENTITY
    ====================================================================== */

    function resolveIdentity() {

        const candidates =
            [];


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
         * KNOWN STORAGE KEYS
         * --------------------------------------------------------------
         */

        CONFIG.peopleStorageKeys.forEach(

            function (
                key
            ) {

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
            i++
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
         * FINAL FALLBACK:
         * scan localStorage/sessionStorage values.
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
       STORAGE SCANNER

       Used only as a recovery mechanism.

       It allows the launch flow to survive differences in registration
       storage naming without modifying frozen earlier pages.
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


    /* ======================================================================
       SCAN STORAGE AREA
    ====================================================================== */

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


                if (!result.peopleId) {

                    result.peopleId =
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


                if (!result.email) {

                    result.email =
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


                if (!result.fullName) {

                    result.fullName =
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
                    result.peopleId &&
                    result.email &&
                    result.fullName
                ) {

                    return;

                }

            }

        }
        catch (error) {

            console.warn(
                "Page06: Browser storage scan unavailable.",
                error
            );

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
         * Direct match first.
         */

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
                    String(value).trim() !== ""
                ) {

                    return String(
                        value
                    ).trim();

                }

            }

        }


        /*
         * Recursive search.
         */

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

            console.warn(
                "Page06: Unable to save email delivery state.",
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
                "Page06: Unable to clear email delivery state.",
                error
            );

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
       MARK PAGE COMPLETE
    ====================================================================== */

    function markPageComplete() {

        try {

            const journey =
                readStorageObject(
                    CONFIG.journeyStorageKey
                ) || {};


            /*
             * Preserve all existing journey state.
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


            window.localStorage.setItem(

                CONFIG.journeyStorageKey,

                JSON.stringify(
                    journey
                )

            );


            /*
             * Keep session copy aligned when available.
             */

            try {

                window.sessionStorage.setItem(

                    CONFIG.journeyStorageKey,

                    JSON.stringify(
                        journey
                    )

                );

            }
            catch (sessionError) {

                /*
                 * Non-blocking.
                 */

            }


            console.log(
                "Page06: Journey state marked complete."
            );

        }
        catch (error) {

            /*
             * Journey-state persistence must not block the CTA
             * after email delivery has already succeeded.
             */

            console.warn(
                "Page06: Could not update journey completion state.",
                error
            );

        }

    }


    /* ======================================================================
       NAVIGATE
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
                !button.dataset.originalText
            ) {

                button.dataset.originalText =
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
                    '<span>உங்கள் அடுத்த படி தயாராகிறது...</span>',
                    '<span>SENDING YOUR INVITATION...</span>',
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
            button.dataset.originalText
        ) {

            button.innerHTML =
                button.dataset.originalText;

        }

    }


    /* ======================================================================
       ERROR MESSAGE
    ====================================================================== */

    function showError(
        message
    ) {

        const finalMessage =
            normalizeString(
                message
            ) ||
            "Unable to send your CTM PATH™ completion email. Please try again.";


        window.alert(

            "உங்கள் அடுத்த படிக்கான மின்னஞ்சலை இப்போது அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.\n\n" +

            "We could not send your CTM PATH™ invitation email yet. Please try again.\n\n" +

            finalMessage

        );

    }


    /* ======================================================================
       ERROR EXTRACTOR
    ====================================================================== */

    function extractErrorMessage(
        value
    ) {

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

    function readStorageObject(
        key
    ) {

        if (!key) {
            return null;
        }


        /*
         * localStorage first
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
         * sessionStorage
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
            i++
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

       Useful during launch testing from browser console.

       CTM_PAGE06.getIdentity()
       CTM_PAGE06.getDelivery()
       CTM_PAGE06.send()
       CTM_PAGE06.clearDelivery()
    ====================================================================== */

    function exposeRuntime() {

        window.CTM_PAGE06 = {

            version:
                "2.0",

            mode:
                "SIMPLIFIED_LAUNCH_FLOW",

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

                    state.sent =
                        false;


                    console.log(
                        "Page06: Email delivery lock cleared."
                    );

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

       The CTM frontend loads shared components asynchronously.
       Recheck the navigator after components are ready in case
       the button was injected after DOMContentLoaded.
    ====================================================================== */

    window.addEventListener(

        "load",

        function () {

            if (
                !state.navigator ||
                !document.documentElement.contains(
                    state.navigator
                )
            ) {

                bindNavigator();

            }

        }

    );


    document.addEventListener(

        "ctm:components-ready",

        function () {

            if (
                !state.navigator ||
                !document.documentElement.contains(
                    state.navigator
                )
            ) {

                bindNavigator();

            }

        }

    );


    /* ======================================================================
       END
    ====================================================================== */

})();

