
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   js/page06.js

   PAGE:
   06 — PERSONAL TRANSFORMATION PRESCRIPTION™

   VERSION:
   3.0 — FIXED PAGE 06 → PAGE 07 NAVIGATION

   PURPOSE:
   --------------------------------------------------------------------------
   Page 06 is the final transformation / prescription page.

   FINAL FLOW:

       PAGE 06
          ↓
       SEE MY NEXT STEP
          ↓
       Attempt JOURNEY_COMPLETED email
          ↓
       Preserve journey state
          ↓
       PAGE 07

   IMPORTANT:

   ✓ Page 06 does NOT generate the report
   ✓ Page 06 does NOT generate PDF
   ✓ Page 06 does NOT call DocumentService
   ✓ Page 06 does NOT call ReportEngine
   ✓ Page 06 does NOT call finalizeJourney()
   ✓ Page 06 does NOT block navigation because email fails
   ✓ Page 07 is always reachable from the navigator

   NAVIGATION CONTRACT:

       Current live route:
           /pages/page06

       Next live route:
           /pages/page07

   ========================================================================== */

(function (window, document) {

    "use strict";


    /* ======================================================================
       CONFIGURATION
       ====================================================================== */

    const CONFIG = {

        pageName:
            "PERSONAL TRANSFORMATION PRESCRIPTION™",

        /*
         * IMPORTANT:
         *
         * The live application uses clean page routes.
         *
         * Do NOT use:
         *
         *     page07.html
         *
         * because the deployed application is currently operating as:
         *
         *     /pages/page06
         *
         * and Page 07 is:
         *
         *     /pages/page07
         */
        nextPage:
            "/pages/page07",

        navigatorId:
            "page06-next-button",

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

        ],

        /*
         * Maximum time allowed for the optional completion-email attempt.
         *
         * Navigation MUST NOT remain blocked indefinitely.
         */
        emailTimeoutMs:
            5000

    };


    /* ======================================================================
       STATE
       ====================================================================== */

    const state = {

        initialized:
            false,

        navigating:
            false,

        emailAttempted:
            false,

        emailSucceeded:
            false,

        navigator:
            null

    };


    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    function init() {

        if (
            state.initialized
        ) {

            /*
             * If the component loader injected the navigator after the
             * first initialization attempt, try binding again.
             */
            if (
                !state.navigator ||
                !document.documentElement.contains(
                    state.navigator
                )
            ) {

                bindNavigator();

            }

            return;

        }


        state.initialized =
            true;


        console.log(
            "CTM PATH™ Page06 v3.0 initialized."
        );


        bindNavigator();

        exposeRuntime();

    }


    /* ======================================================================
       FIND THE ACTUAL PAGE 06 NAVIGATOR
       ====================================================================== */

    function findNavigator() {

        /*
         * PRIMARY CONTRACT
         *
         * This is the actual button ID present in page06.html.
         */
        const exact =
            document.getElementById(
                CONFIG.navigatorId
            );


        if (
            exact
        ) {

            return exact;

        }


        /*
         * Compatibility selectors.
         *
         * These allow the controller to survive a future harmless
         * markup variation without affecting the current contract.
         */

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
            ".navigator-next",
            ".journey-next"

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


            if (
                element
            ) {

                return element;

            }

        }


        /*
         * Final fallback:
         *
         * The screenshot shows the visible navigator button.
         *
         * Search buttons for the actual Page 06 CTA text.
         */

        const buttons =
            document.querySelectorAll(
                "button"
            );


        for (
            let i = 0;
            i < buttons.length;
            i++
        ) {

            const button =
                buttons[i];


            const text =
                String(
                    button.textContent || ""
                )
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .trim()
                    .toLowerCase();


            if (
                text.indexOf(
                    "see my next step"
                ) !== -1
            ) {

                return button;

            }


            if (
                text.indexOf(
                    "show me the path"
                ) !== -1
            ) {

                return button;

            }


            if (
                text.indexOf(
                    "அடுத்த படியை"
                ) !== -1
            ) {

                return button;

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


        if (
            !navigator
        ) {

            console.warn(
                "Page06: Navigator #page06-next-button not found yet."
            );


            return false;

        }


        state.navigator =
            navigator;


        /*
         * Prevent duplicate event listeners.
         */

        if (
            navigator.dataset &&
            navigator.dataset.ctmPage06NavigationBound === "true"
        ) {

            return true;

        }


        /*
         * Mark as bound.
         */

        if (
            navigator.dataset
        ) {

            navigator.dataset.ctmPage06NavigationBound =
                "true";

        }


        /*
         * Capture phase is intentional.
         *
         * It allows this controller to take ownership of the CTA
         * even if another generic navigation listener is attached.
         */

        navigator.addEventListener(
            "click",
            handleNavigatorClick,
            true
        );


        console.log(
            "Page06: Navigator successfully bound:",
            navigator
        );


        return true;

    }


    /* ======================================================================
       NAVIGATOR CLICK
       ====================================================================== */

    async function handleNavigatorClick(
        event
    ) {

        /*
         * Take complete control of this click.
         */

        if (
            event
        ) {

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
         * Prevent double-clicks.
         */

        if (
            state.navigating
        ) {

            return;

        }


        state.navigating =
            true;


        const button =
            state.navigator ||
            document.getElementById(
                CONFIG.navigatorId
            );


        setButtonBusy(
            button,
            true
        );


        console.log(
            "Page06: Navigator clicked."
        );


        /*
         * --------------------------------------------------------------
         * STEP 1
         *
         * Resolve identity.
         * --------------------------------------------------------------
         */

        const identity =
            resolveIdentity();


        console.log(
            "Page06: Resolved identity:",
            identity
        );


        /*
         * --------------------------------------------------------------
         * STEP 2
         *
         * Attempt completion email.
         *
         * CRITICAL:
         *
         * Email is now NON-BLOCKING.
         *
         * Even if:
         *
         *   • email is missing
         *   • API is unavailable
         *   • API throws
         *   • API times out
         *   • backend returns an error
         *
         * the visitor STILL proceeds to Page 07.
         * --------------------------------------------------------------
         */

        try {

            await attemptCompletionEmail(
                identity
            );

        }

        catch (error) {

            console.warn(
                "Page06: Completion email attempt failed. Continuing to Page07.",
                error
            );

        }


        /*
         * --------------------------------------------------------------
         * STEP 3
         *
         * Mark Page 06 complete.
         * --------------------------------------------------------------
         */

        markPageComplete();


        /*
         * --------------------------------------------------------------
         * STEP 4
         *
         * Navigate.
         *
         * THIS IS THE CRITICAL FIX.
         * --------------------------------------------------------------
         */

        navigateToPage07();

    }


    /* ======================================================================
       ATTEMPT COMPLETION EMAIL
       ====================================================================== */

    async function attemptCompletionEmail(
        identity
    ) {

        state.emailAttempted =
            true;


        /*
         * No email available:
         *
         * Do not block Page 07.
         */

        if (
            !identity.email
        ) {

            console.warn(
                "Page06: No registered email recovered. Skipping email."
            );


            return false;

        }


        /*
         * API unavailable:
         *
         * Do not block Page 07.
         */

        if (
            !window.CTM_API ||
            typeof window.CTM_API.sendEmail !==
            "function"
        ) {

            console.warn(
                "Page06: CTM_API.sendEmail unavailable. Skipping email."
            );


            return false;

        }


        /*
         * Check whether this visitor has already received
         * the completion email.
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
                "Page06: JOURNEY_COMPLETED email already sent."
            );


            state.emailSucceeded =
                true;


            return true;

        }


        /*
         * Save processing state.
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
         * Execute the backend request with a timeout.
         */

        let response;


        try {

            response =
                await withTimeout(
                    window.CTM_API.sendEmail({

                        type:
                            "JOURNEY_COMPLETED",

                        to:
                            identity.email,

                        name:
                            identity.fullName || ""

                    }),
                    CONFIG.emailTimeoutMs
                );

        }

        catch (error) {

            clearDeliveryState();


            throw error;

        }


        console.log(
            "Page06: Completion email response:",
            response
        );


        /*
         * Normalize the response.
         */

        const result =
            unwrapResponse(
                response
            );


        /*
         * Verify if backend positively confirmed delivery.
         */

        if (
            !emailResponseSucceeded(
                result
            )
        ) {

            clearDeliveryState();


            console.warn(
                "Page06: Email was not confirmed by backend."
            );


            return false;

        }


        /*
         * Save confirmed delivery.
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


        state.emailSucceeded =
            true;


        console.log(
            "Page06: JOURNEY_COMPLETED email confirmed."
        );


        return true;

    }


    /* ======================================================================
       WITH TIMEOUT
       ====================================================================== */

    function withTimeout(
        promise,
        timeoutMs
    ) {

        return new Promise(
            function (
                resolve,
                reject
            ) {

                let settled =
                    false;


                const timer =
                    window.setTimeout(
                        function () {

                            if (
                                settled
                            ) {

                                return;

                            }


                            settled =
                                true;


                            reject(
                                new Error(
                                    "Completion email request timed out."
                                )
                            );

                        },
                        timeoutMs
                    );


                Promise.resolve(
                    promise
                )
                    .then(
                        function (
                            value
                        ) {

                            if (
                                settled
                            ) {

                                return;

                            }


                            settled =
                                true;


                            window.clearTimeout(
                                timer
                            );


                            resolve(
                                value
                            );

                        }
                    )
                    .catch(
                        function (
                            error
                        ) {

                            if (
                                settled
                            ) {

                                return;

                            }


                            settled =
                                true;


                            window.clearTimeout(
                                timer
                            );


                            reject(
                                error
                            );

                        }
                    );

            }
        );

    }


    /* ======================================================================
       NORMALIZE API RESPONSE
       ====================================================================== */

    function unwrapResponse(
        response
    ) {

        if (
            response ===
            null ||
            response ===
            undefined
        ) {

            return null;

        }


        if (
            typeof response ===
            "string"
        ) {

            try {

                return JSON.parse(
                    response
                );

            }

            catch (error) {

                return {

                    message:
                        response

                };

            }

        }


        if (
            response.data &&
            typeof response.data ===
            "object"
        ) {

            return response.data;

        }


        return response;

    }


    /* ======================================================================
       EMAIL SUCCESS CHECK
       ====================================================================== */

    function emailResponseSucceeded(
        result
    ) {

        if (
            !result ||
            typeof result !==
            "object"
        ) {

            return false;

        }


        if (
            result.success ===
            false
        ) {

            return false;

        }


        if (
            result.emailSent ===
            false
        ) {

            return false;

        }


        if (
            result.sent ===
            false
        ) {

            return false;

        }


        if (
            String(
                result.status ||
                ""
            ).toUpperCase() ===
            "FAILURE"
        ) {

            return false;

        }


        if (
            String(
                result.status ||
                ""
            ).toUpperCase() ===
            "ERROR"
        ) {

            return false;

        }


        /*
         * Explicit affirmative confirmation.
         */

        return (

            result.success === true ||

            result.emailSent === true ||

            result.sent === true ||

            String(
                result.status ||
                ""
            ).toUpperCase() ===
            "SUCCESS"

        );

    }


    /* ======================================================================
       RESOLVE VISITOR IDENTITY
       ====================================================================== */

    function resolveIdentity() {

        const candidates =
            [];


        /*
         * Global runtime objects.
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
         * Journey state.
         */

        const journey =
            readStorageObject(
                CONFIG.journeyStorageKey
            );


        pushCandidate(
            candidates,
            journey
        );


        if (
            journey
        ) {

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
         * Known registration storage keys.
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


        let peopleId =
            "";


        let email =
            "";


        let fullName =
            "";


        /*
         * Search candidates.
         */

        for (
            let i = 0;
            i < candidates.length;
            i++
        ) {

            const candidate =
                candidates[i];


            if (
                !candidate
            ) {

                continue;

            }


            if (
                !peopleId
            ) {

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


            if (
                !email
            ) {

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


            if (
                !fullName
            ) {

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
         * Browser storage recovery.
         */

        if (
            !peopleId ||
            !email ||
            !fullName
        ) {

            const scanned =
                scanBrowserStorage();


            if (
                !peopleId
            ) {

                peopleId =
                    scanned.peopleId;

            }


            if (
                !email
            ) {

                email =
                    scanned.email;

            }


            if (
                !fullName
            ) {

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

        if (
            !storage
        ) {

            return;

        }


        try {

            for (
                let i = 0;
                i < storage.length;
                i++
            ) {

                const key =
                    storage.key(
                        i
                    );


                if (
                    !key
                ) {

                    continue;

                }


                const raw =
                    storage.getItem(
                        key
                    );


                if (
                    !raw
                ) {

                    continue;

                }


                let value;


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
                    typeof value !==
                    "object"
                ) {

                    continue;

                }


                if (
                    !result.peopleId
                ) {

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


                if (
                    !result.email
                ) {

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


                if (
                    !result.fullName
                ) {

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
            typeof source !==
            "object"
        ) {

            return "";

        }


        /*
         * Direct keys first.
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
                    value !==
                    null &&
                    value !==
                    undefined &&
                    String(value).trim() !==
                    ""
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
                typeof value ===
                "object"
            ) {

                const found =
                    findValueDeep(
                        value,
                        keys
                    );


                if (
                    found
                ) {

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
            typeof value ===
            "object"
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
                "Page06: Unable to clear delivery state.",
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
       MARK PAGE 06 COMPLETE
       ====================================================================== */

    function markPageComplete() {

        try {

            const journey =
                readStorageObject(
                    CONFIG.journeyStorageKey
                ) || {};


            /*
             * Preserve all existing journey information.
             */

            journey.page06Completed =
                true;


            journey.page06CompletedAt =
                new Date().toISOString();


            journey.currentPage =
                7;


            journey.currentPageName =
                "CONTINUE YOUR GUIDED JOURNEY™";


            journey.lastCompletedPage =
                Math.max(
                    Number(
                        journey.lastCompletedPage ||
                        0
                    ),
                    6
                );


            /*
             * Persist locally.
             */

            window.localStorage.setItem(
                CONFIG.journeyStorageKey,
                JSON.stringify(
                    journey
                )
            );


            /*
             * Persist in session too.
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
             * Navigation must never be blocked by a storage problem.
             */

            console.warn(
                "Page06: Could not persist completion state.",
                error
            );

        }

    }


    /* ======================================================================
       THE CRITICAL PAGE 07 NAVIGATION
       ====================================================================== */

    function navigateToPage07() {

        console.log(
            "================================================"
        );


        console.log(
            "CTM PATH™"
        );


        console.log(
            "PAGE 06 → PAGE 07"
        );


        console.log(
            "Destination:",
            CONFIG.nextPage
        );


        console.log(
            "================================================"
        );


        /*
         * Use the clean deployed route.
         */

        window.location.assign(
            CONFIG.nextPage
        );

    }


    /* ======================================================================
       BUTTON BUSY STATE
       ====================================================================== */

    function setButtonBusy(
        button,
        busy
    ) {

        if (
            !button
        ) {

            return;

        }


        if (
            busy
        ) {

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


            button.classList.add(
                "is-loading"
            );


            /*
             * Keep the button visually alive while the email request
             * is attempted.
             */

            button.innerHTML =
                [
                    '<span class="page06-email-status">',
                    '<span>உங்கள் அடுத்த படி தயாராகிறது...</span>',
                    '<span>PREPARING YOUR NEXT STEP...</span>',
                    "</span>"
                ].join("");

        }

        else {

            button.removeAttribute(
                "aria-busy"
            );


            button.removeAttribute(
                "aria-disabled"
            );


            button.classList.remove(
                "is-loading"
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

    }


    /* ======================================================================
       READ STORAGE OBJECT
       ====================================================================== */

    function readStorageObject(
        key
    ) {

        if (
            !key
        ) {

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


            if (
                raw
            ) {

                const parsed =
                    parseJson(
                        raw
                    );


                if (
                    parsed
                ) {

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


            if (
                raw
            ) {

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

        if (
            !value
        ) {

            return null;

        }


        if (
            typeof value ===
            "object"
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
            value ===
            null ||
            value ===
            undefined
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


            if (
                value
            ) {

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
                "FIXED_PAGE07_NAVIGATION",

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

            clearDelivery:
                function () {

                    clearDeliveryState();


                    state.emailSucceeded =
                        false;


                    state.emailAttempted =
                        false;


                    console.log(
                        "Page06: Email delivery lock cleared."
                    );

                },

            send:
                function () {

                    return handleNavigatorClick();

                },

            goToPage07:
                function () {

                    navigateToPage07();

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
       COMPONENT LOADER COMPATIBILITY
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


    /*
     * The component loader may inject shared elements after DOMContentLoaded.
     */

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
       FINAL FALLBACK
       ======================================================================

       If another script replaces the Page 06 navigator after the normal
       lifecycle events, this observer reconnects the controller.

       It is intentionally lightweight and disconnects itself once the
       actual navigator has been found.

       ====================================================================== */

    try {

        const observer =
            new MutationObserver(
                function () {

                    if (
                        state.navigator &&
                        document.documentElement.contains(
                            state.navigator
                        )
                    ) {

                        observer.disconnect();

                        return;

                    }


                    if (
                        bindNavigator()
                    ) {

                        observer.disconnect();

                    }

                }
            );


        observer.observe(
            document.body,
            {
                childList:
                    true,

                subtree:
                    true
            }
        );


        window.setTimeout(
            function () {

                observer.disconnect();

            },
            10000
        );

    }

    catch (error) {

        console.warn(
            "Page06: MutationObserver unavailable.",
            error
        );

    }


})(window, document);


/* ==========================================================================
   END OF js/page06.js
   ========================================================================== */
