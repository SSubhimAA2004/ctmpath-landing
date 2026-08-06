
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   js/page03.js

   PAGE:
   KALA CHAKRA™ LIFE ASSESSMENT™

   VERSION:
   11.0

   RESPONSIBILITIES:

   ✓ Create Score Selectors
   ✓ Capture 12 Life Pillar Scores
   ✓ Apply Score Colour States
   ✓ Save / Restore Page03 Session Progress
   ✓ Resolve Current PeopleID
   ✓ Validate Complete Assessment
   ✓ Persist Canonical Life Assessment through CTM.API.saveAssessment()
   ✓ Wait for Backend SUCCESS before Navigation
   ✓ Preserve Page04 CTM_PAGE03_ALIGNMENT Contract
   ✓ Prevent Duplicate Submission

   BACKEND CONTRACT:

       {
            peopleId: "CTM-XXXXXX",
            pillarScores: {
                "Purpose": 0-10,
                "Health": 0-10,
                "Relationships": 0-10,
                "Character & Integrity": 0-10,
                "Learning & Mastery": 0-10,
                "Career & Contribution": 0-10,
                "Financial Freedom": 0-10,
                "Time Freedom": 0-10,
                "Community & Tribe": 0-10,
                "Systems & Productivity": 0-10,
                "Service & Impact": 0-10,
                "Vision & Legacy": 0-10
            }
       }

   IMPORTANT:

   Page03 local/session storage is NOT persistence.
   Completion must create the canonical 04_LifeAssessment backend record
   before Page04 navigation is allowed.

   ========================================================================== */


(function () {

    "use strict";


    /* ======================================================================
       PAGE CONFIGURATION
       ====================================================================== */


    const PAGE03_CONFIG = {

        storageKey:
            "CTM_PAGE03_ALIGNMENT",

        backendResultStorageKey:
            "CTM_PAGE03_ASSESSMENT_RESULT",

        peopleIdStorageKey:
            "ctm_people_id",

        page02SessionKey:
            "CTM_PATH_PAGE02",

        nextPage:
            "page04.html",

        totalPillars:
            12,

        minimumScore:
            0,

        maximumScore:
            10

    };


    /* ======================================================================
       KALA CHAKRA™ PILLARS

       These keys MUST match:
       • frozen Page03 UI
       • Page04 PILLARS
       • 04_AssessmentEngine.gs
       ====================================================================== */


    const PILLARS = [

        "Purpose",

        "Health",

        "Relationships",

        "Character & Integrity",

        "Learning & Mastery",

        "Career & Contribution",

        "Financial Freedom",

        "Time Freedom",

        "Community & Tribe",

        "Systems & Productivity",

        "Service & Impact",

        "Vision & Legacy"

    ];


    /* ======================================================================
       PAGE STATE
       ====================================================================== */


    let assessmentData = {};

    let isSubmitting = false;


    /* ======================================================================
       INITIALIZE PAGE
       ====================================================================== */


    function initPage03() {

        console.log(
            "CTM PATH™ MILLIONAIRES™ Page03 v11.0 Loaded"
        );


        createScoreSelectors();

        restoreAssessment();

        bindNavigation();

    }


    /* ======================================================================
       CREATE SCORE SELECTORS
       ====================================================================== */


    function createScoreSelectors() {

        const cards =
            document.querySelectorAll(
                ".pillar-card"
            );


        cards.forEach(
            function (card, index) {

                const pillar =
                    PILLARS[index];


                if (!pillar) {

                    console.warn(
                        "Page03: Pillar card has no canonical pillar mapping.",
                        index
                    );

                    return;

                }


                const selector =
                    card.querySelector(
                        ".score-selector"
                    );


                if (!selector) {

                    return;

                }


                /*
                 * Defensive protection against duplicate controls
                 * if init() is accidentally called more than once.
                 */
                const existing =
                    selector.querySelector(
                        ".score-options"
                    );


                if (existing) {

                    return;

                }


                const buttonsContainer =
                    document.createElement(
                        "div"
                    );


                buttonsContainer.className =
                    "score-options";


                for (
                    let score = PAGE03_CONFIG.minimumScore;
                    score <= PAGE03_CONFIG.maximumScore;
                    score++
                ) {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";


                    button.textContent =
                        String(score);


                    button.dataset.pillar =
                        pillar;


                    button.dataset.score =
                        String(score);


                    button.setAttribute(
                        "aria-label",
                        pillar +
                        " score " +
                        score +
                        " out of " +
                        PAGE03_CONFIG.maximumScore
                    );


                    button.addEventListener(
                        "click",
                        function () {

                            selectScore(
                                card,
                                pillar,
                                score,
                                button
                            );

                        }
                    );


                    buttonsContainer.appendChild(
                        button
                    );

                }


                selector.appendChild(
                    buttonsContainer
                );

            }
        );

    }


    /* ======================================================================
       SCORE COLOUR CLASSIFICATION
       ====================================================================== */


    function getScoreClass(score) {

        const numericScore =
            Number(score);


        if (numericScore <= 3) {

            return "score-low";

        }


        if (numericScore <= 7) {

            return "score-mid";

        }


        return "score-high";

    }


    /* ======================================================================
       CLEAR SCORE STATE
       ====================================================================== */


    function clearScoreState(button) {

        if (!button) {

            return;

        }


        button.classList.remove(
            "selected",
            "score-low",
            "score-mid",
            "score-high"
        );


        button.setAttribute(
            "aria-pressed",
            "false"
        );

    }


    /* ======================================================================
       APPLY SCORE STATE
       ====================================================================== */


    function applyScoreState(
        button,
        score
    ) {

        if (!button) {

            return;

        }


        clearScoreState(
            button
        );


        button.classList.add(
            "selected",
            getScoreClass(score)
        );


        button.setAttribute(
            "aria-pressed",
            "true"
        );

    }


    /* ======================================================================
       SCORE SELECTION
       ====================================================================== */


    function selectScore(
        card,
        pillar,
        score,
        selectedButton
    ) {

        if (
            PILLARS.indexOf(
                pillar
            ) === -1
        ) {

            console.error(
                "Page03: Unknown pillar.",
                pillar
            );

            return;

        }


        const numericScore =
            Number(score);


        if (
            !Number.isFinite(
                numericScore
            ) ||
            Math.floor(
                numericScore
            ) !== numericScore ||
            numericScore <
                PAGE03_CONFIG.minimumScore ||
            numericScore >
                PAGE03_CONFIG.maximumScore
        ) {

            console.error(
                "Page03: Invalid pillar score.",
                pillar,
                score
            );

            return;

        }


        /*
         * Remove previous selection and previous score colour.
         */
        const buttons =
            card.querySelectorAll(
                ".score-options button"
            );


        buttons.forEach(
            function (button) {

                clearScoreState(
                    button
                );

            }
        );


        /*
         * Highlight selected score.
         *
         * 0–3  = Red
         * 4–7  = Orange
         * 8–10 = Green
         */
        applyScoreState(
            selectedButton,
            numericScore
        );


        card.classList.add(
            "scored"
        );


        /*
         * Page03 source-of-truth score.
         */
        assessmentData[pillar] =
            numericScore;


        saveLocalProgress();


        console.log(
            pillar,
            "Score:",
            numericScore,
            "State:",
            getScoreClass(
                numericScore
            )
        );

    }


    /* ======================================================================
       LOCAL PROGRESS STORAGE

       IMPORTANT:
       This supports Page03 restoration and Page04 rendering only.
       It is NOT the canonical backend Life Assessment record.
       ====================================================================== */


    function saveLocalProgress() {

        try {

            sessionStorage.setItem(
                PAGE03_CONFIG.storageKey,
                JSON.stringify(
                    assessmentData
                )
            );

        }
        catch (error) {

            console.error(
                "CTM PATH™ Page03 local progress save failed:",
                error
            );

        }

    }


    /* ======================================================================
       RESTORE ASSESSMENT
       ====================================================================== */


    function restoreAssessment() {

        let saved =
            null;


        try {

            saved =
                sessionStorage.getItem(
                    PAGE03_CONFIG.storageKey
                );

        }
        catch (error) {

            console.error(
                "CTM PATH™ Page03 sessionStorage unavailable:",
                error
            );

            return;

        }


        if (!saved) {

            return;

        }


        try {

            const parsed =
                JSON.parse(
                    saved
                );


            assessmentData =
                normalizeStoredAssessment(
                    parsed
                );

        }
        catch (error) {

            console.error(
                "CTM PATH™ Page03 restore failed:",
                error
            );


            assessmentData = {};


            return;

        }


        const cards =
            document.querySelectorAll(
                ".pillar-card"
            );


        cards.forEach(
            function (card, index) {

                const pillar =
                    PILLARS[index];


                if (!pillar) {

                    return;

                }


                const score =
                    assessmentData[
                        pillar
                    ];


                if (
                    score === undefined
                ) {

                    return;

                }


                card.classList.add(
                    "scored"
                );


                const button =
                    card.querySelector(
                        '.score-options button[data-score="' +
                        score +
                        '"]'
                    );


                if (button) {

                    applyScoreState(
                        button,
                        score
                    );

                }

            }
        );

    }


    /* ======================================================================
       NORMALIZE STORED ASSESSMENT
       ====================================================================== */


    function normalizeStoredAssessment(
        source
    ) {

        const normalized = {};


        if (
            !source ||
            typeof source !== "object" ||
            Array.isArray(source)
        ) {

            return normalized;

        }


        PILLARS.forEach(
            function (pillar) {

                if (
                    !Object.prototype.hasOwnProperty.call(
                        source,
                        pillar
                    )
                ) {

                    return;

                }


                const score =
                    Number(
                        source[
                            pillar
                        ]
                    );


                if (
                    Number.isFinite(
                        score
                    ) &&
                    Math.floor(
                        score
                    ) === score &&
                    score >=
                        PAGE03_CONFIG.minimumScore &&
                    score <=
                        PAGE03_CONFIG.maximumScore
                ) {

                    normalized[
                        pillar
                    ] =
                        score;

                }

            }
        );


        return normalized;

    }


    /* ======================================================================
       ASSESSMENT COMPLETION
       ====================================================================== */


    function isAssessmentComplete() {

        if (
            Object.keys(
                assessmentData
            ).length !==
            PAGE03_CONFIG.totalPillars
        ) {

            return false;

        }


        return PILLARS.every(
            function (pillar) {

                if (
                    !Object.prototype.hasOwnProperty.call(
                        assessmentData,
                        pillar
                    )
                ) {

                    return false;

                }


                const score =
                    Number(
                        assessmentData[
                            pillar
                        ]
                    );


                return (
                    Number.isFinite(
                        score
                    ) &&
                    Math.floor(
                        score
                    ) === score &&
                    score >=
                        PAGE03_CONFIG.minimumScore &&
                    score <=
                        PAGE03_CONFIG.maximumScore
                );

            }
        );

    }


    /* ======================================================================
       IDENTITY RESOLUTION

       Page02 establishes the canonical journey identity under:
           ctm_people_id

       Page02Session is used first when available because it is the frozen
       Page02 journey-state contract. Scalar storage is the compatibility
       fallback.
       ====================================================================== */


    function resolvePeopleId() {

        /*
         * Preferred source:
         * frozen Page02Session module.
         */
        try {

            if (
                window.Page02Session &&
                typeof window.Page02Session.load === "function"
            ) {

                const page02Session =
                    window.Page02Session.load();


                const fromModule =
                    extractPeopleId(
                        page02Session
                    );


                if (fromModule) {

                    return fromModule;

                }

            }

        }
        catch (error) {

            console.warn(
                "Page03: Unable to read Page02Session identity.",
                error
            );

        }


        /*
         * Canonical scalar journey identity.
         */
        const scalar =
            readStorageString(
                PAGE03_CONFIG.peopleIdStorageKey
            );


        if (scalar) {

            return scalar;

        }


        /*
         * Compatibility recovery from the persisted Page02 session object.
         */
        const page02Object =
            readStorageObject(
                PAGE03_CONFIG.page02SessionKey
            );


        const fromObject =
            extractPeopleId(
                page02Object
            );


        if (fromObject) {

            return fromObject;

        }


        /*
         * Narrow compatibility aliases used elsewhere in the current journey.
         */
        const aliases = [
            "peopleId",
            "PeopleID",
            "ctm_client_id"
        ];


        for (
            let i = 0;
            i < aliases.length;
            i++
        ) {

            const value =
                readStorageString(
                    aliases[i]
                );


            if (value) {

                return value;

            }

        }


        return "";

    }


    /* ======================================================================
       EXTRACT PEOPLE ID FROM OBJECT
       ====================================================================== */


    function extractPeopleId(
        source
    ) {

        if (
            !source ||
            typeof source !== "object"
        ) {

            return "";

        }


        const direct =
            firstNonEmptyString(
                source.peopleId,
                source.PeopleID,
                source.peopleID,
                source.clientId,
                source.ClientID
            );


        if (direct) {

            return direct;

        }


        if (
            source.client &&
            typeof source.client === "object"
        ) {

            const fromClient =
                firstNonEmptyString(
                    source.client.peopleId,
                    source.client.PeopleID,
                    source.client.peopleID,
                    source.client.clientId,
                    source.client.ClientID
                );


            if (fromClient) {

                return fromClient;

            }

        }


        if (
            source.data &&
            typeof source.data === "object"
        ) {

            const fromData =
                extractPeopleId(
                    source.data
                );


            if (fromData) {

                return fromData;

            }

        }


        return "";

    }


    /* ======================================================================
       STORAGE HELPERS
       ====================================================================== */


    function readStorageString(
        key
    ) {

        let value =
            "";


        try {

            value =
                sessionStorage.getItem(
                    key
                ) || "";

        }
        catch (error) {

            console.warn(
                "Page03: Unable to read sessionStorage key:",
                key,
                error
            );

        }


        value =
            String(
                value || ""
            ).trim();


        if (value) {

            return value;

        }


        try {

            value =
                localStorage.getItem(
                    key
                ) || "";

        }
        catch (error) {

            console.warn(
                "Page03: Unable to read localStorage key:",
                key,
                error
            );

        }


        return String(
            value || ""
        ).trim();

    }


    function readStorageObject(
        key
    ) {

        const stores = [
            sessionStorage,
            localStorage
        ];


        for (
            let i = 0;
            i < stores.length;
            i++
        ) {

            try {

                const raw =
                    stores[i].getItem(
                        key
                    );


                if (!raw) {

                    continue;

                }


                const parsed =
                    JSON.parse(
                        raw
                    );


                if (
                    parsed &&
                    typeof parsed === "object"
                ) {

                    return parsed;

                }

            }
            catch (error) {

                console.warn(
                    "Page03: Unable to read stored object:",
                    key,
                    error
                );

            }

        }


        return null;

    }


    function firstNonEmptyString() {

        for (
            let i = 0;
            i < arguments.length;
            i++
        ) {

            const value =
                String(
                    arguments[i] || ""
                ).trim();


            if (value) {

                return value;

            }

        }


        return "";

    }


    /* ======================================================================
       BUILD CANONICAL BACKEND PAYLOAD
       ====================================================================== */


    function buildAssessmentPayload() {

        const peopleId =
            resolvePeopleId();


        if (!peopleId) {

            throw new Error(
                "People ID is missing. Please return to Page 02 and complete registration."
            );

        }


        if (
            !isAssessmentComplete()
        ) {

            throw new Error(
                "Please score all 12 life pillars before continuing."
            );

        }


        const pillarScores = {};


        PILLARS.forEach(
            function (pillar) {

                pillarScores[
                    pillar
                ] =
                    Number(
                        assessmentData[
                            pillar
                        ]
                    );

            }
        );


        return {

            peopleId:
                peopleId,

            pillarScores:
                pillarScores

        };

    }


    /* ======================================================================
       API RESOLUTION
       ====================================================================== */


    function getApi() {

        if (
            window.CTM &&
            window.CTM.API &&
            typeof window.CTM.API.saveAssessment === "function"
        ) {

            return window.CTM.API;

        }


        /*
         * Compatibility alias exposed by the current api.js.
         */
        if (
            window.ApiService &&
            typeof window.ApiService.saveAssessment === "function"
        ) {

            return window.ApiService;

        }


        /*
         * Compatibility with the older CTM_API global if that runtime is
         * temporarily present during deployment.
         */
        if (
            window.CTM_API &&
            typeof window.CTM_API.saveAssessment === "function"
        ) {

            return window.CTM_API;

        }


        throw new Error(
            "CTM PATH™ API service is unavailable."
        );

    }


    /* ======================================================================
       BACKEND ERROR DIAGNOSTICS

       Converts structured backend error values into readable messages.

       IMPORTANT:
       The backend may legitimately return:

           error: "message"

       or:

           error: {
               message: "message",
               error: "...",
               stack: "..."
           }

       Passing an object directly to new Error() produces "[object Object]".
       This helper prevents that diagnostic information from being lost.
       ====================================================================== */


    function stringifyDiagnosticValue(
        value
    ) {

        if (
            value === undefined ||
            value === null
        ) {

            return "";

        }


        if (
            typeof value === "string"
        ) {

            return value.trim();

        }


        if (
            typeof value === "number" ||
            typeof value === "boolean"
        ) {

            return String(
                value
            );

        }


        if (
            value instanceof Error
        ) {

            return (
                value.message ||
                String(
                    value
                )
            );

        }


        if (
            typeof value === "object"
        ) {

            /*
             * Prefer human-readable fields before serializing the
             * complete object.
             */
            const nestedMessage =
                stringifyDiagnosticValue(
                    value.message
                );


            if (nestedMessage) {

                return nestedMessage;

            }


            const nestedError =
                stringifyDiagnosticValue(
                    value.error
                );


            if (nestedError) {

                return nestedError;

            }


            const nestedDetails =
                stringifyDiagnosticValue(
                    value.details
                );


            if (nestedDetails) {

                return nestedDetails;

            }


            try {

                return JSON.stringify(
                    value,
                    null,
                    2
                );

            }
            catch (error) {

                return String(
                    value
                );

            }

        }


        return String(
            value
        );

    }


    function extractBackendErrorMessage(
        response
    ) {

        if (
            response === undefined ||
            response === null
        ) {

            return "Life Assessment save returned no response.";

        }


        if (
            response === false
        ) {

            return "Life Assessment could not be saved.";

        }


        if (
            typeof response !== "object"
        ) {

            const scalarMessage =
                stringifyDiagnosticValue(
                    response
                );


            return (
                scalarMessage ||
                "Life Assessment could not be saved."
            );

        }


        /*
         * Search the common backend response locations in order.
         */
        const candidates = [

            response.message,

            response.error,

            response.details,

            response.data &&
                response.data.message,

            response.data &&
                response.data.error,

            response.data &&
                response.data.details,

            response.data &&
                response.data.data &&
                response.data.data.message,

            response.data &&
                response.data.data &&
                response.data.data.error

        ];


        for (
            let i = 0;
            i < candidates.length;
            i++
        ) {

            const message =
                stringifyDiagnosticValue(
                    candidates[i]
                );


            if (message) {

                return message;

            }

        }


        /*
         * If the backend supplied no recognised message field,
         * expose the complete response rather than reducing it to
         * "[object Object]".
         */
        const serializedResponse =
            stringifyDiagnosticValue(
                response
            );


        return (
            serializedResponse ||
            "Life Assessment could not be saved."
        );

    }


    /* ======================================================================
       BACKEND RESPONSE VALIDATION
       ====================================================================== */


    function validateBackendResponse(
        response
    ) {

        if (
            response === undefined ||
            response === null
        ) {

            throw new Error(
                "Life Assessment save returned no response."
            );

        }


        if (
            response === false ||
            (
                typeof response === "object" &&
                response.success === false
            ) ||
            (
                typeof response === "object" &&
                response.ok === false
            )
        ) {

            /*
             * Preserve the complete backend response in DevTools.
             * This is deliberately logged before extracting the
             * user-visible Error message.
             */
            console.error(
                "CTM PATH™ Page03 backend rejection — RAW RESPONSE:",
                response
            );


            let serializedResponse =
                "";


            try {

                serializedResponse =
                    JSON.stringify(
                        response,
                        null,
                        2
                    );

            }
            catch (serializationError) {

                serializedResponse =
                    String(
                        response
                    );

            }


            console.error(
                "CTM PATH™ Page03 backend rejection — SERIALIZED RESPONSE:",
                serializedResponse
            );


            const message =
                extractBackendErrorMessage(
                    response
                );


            console.error(
                "CTM PATH™ Page03 backend rejection — EXTRACTED MESSAGE:",
                message
            );


            throw new Error(
                message
            );

        }


        /*
         * Backend Utils.success() may wrap the business payload in data.
         * Preserve the raw response for diagnostics while returning the
         * innermost useful payload.
         */
        let value =
            response;


        let depth =
            0;


        while (
            value &&
            typeof value === "object" &&
            Object.prototype.hasOwnProperty.call(
                value,
                "data"
            ) &&
            value.data !== undefined &&
            value.data !== null &&
            depth < 4
        ) {

            value =
                value.data;

            depth++;

        }


        return value;

    }


    /* ======================================================================
       SAVE BACKEND RESULT
       ====================================================================== */


    function saveBackendResult(
        response,
        payload
    ) {

        const record = {

            peopleId:
                payload.peopleId,

            pillarScores:
                payload.pillarScores,

            savedAt:
                new Date().toISOString(),

            response:
                response

        };


        try {

            sessionStorage.setItem(
                PAGE03_CONFIG.backendResultStorageKey,
                JSON.stringify(
                    record
                )
            );

        }
        catch (error) {

            console.warn(
                "Page03: Unable to store assessment backend result.",
                error
            );

        }

    }


    /* ======================================================================
       SUBMIT ASSESSMENT
       ====================================================================== */


    async function submitAssessment() {

        if (isSubmitting) {

            return;

        }


        const button =
            document.getElementById(
                "show-alignment-button"
            );


        try {

            isSubmitting =
                true;


            setSubmitState(
                button,
                true
            );


            /*
             * Keep Page04's frozen session contract current.
             */
            saveLocalProgress();


            const payload =
                buildAssessmentPayload();


            const api =
                getApi();


            console.log(
                "Page03: Saving canonical Life Assessment.",
                {
                    peopleId:
                        payload.peopleId,

                    pillarCount:
                        Object.keys(
                            payload.pillarScores
                        ).length
                }
            );


            const rawResponse =
                await api.saveAssessment(
                    payload
                );


            /*
             * QA DIAGNOSTIC:
             *
             * Preserve the exact value returned by api.js before
             * validation or unwrapping occurs.
             */
            console.log(
                "CTM PATH™ Page03 RAW saveAssessment response:",
                rawResponse
            );


            const result =
                validateBackendResponse(
                    rawResponse
                );


            saveBackendResult(
                result,
                payload
            );


            console.log(
                "Page03: Life Assessment persisted successfully.",
                result
            );


            /*
             * CRITICAL:
             * Navigation occurs ONLY after backend persistence succeeds.
             */
            window.location.href =
                PAGE03_CONFIG.nextPage;

        }
        catch (error) {

            console.error(
                "CTM PATH™ Page03 assessment persistence failed:",
                error
            );


            /*
             * QA DIAGNOSTIC:
             *
             * Log the resolved error message separately so DevTools
             * exposes it even if the browser collapses the Error object.
             */
            console.error(
                "CTM PATH™ Page03 resolved persistence error:",
                error &&
                error.message
                    ? error.message
                    : stringifyDiagnosticValue(
                        error
                    )
            );


            showSubmissionError(
                error
            );


            isSubmitting =
                false;


            setSubmitState(
                button,
                false
            );

        }

    }


    /* ======================================================================
       SUBMIT BUTTON STATE
       ====================================================================== */


    function setSubmitState(
        button,
        saving
    ) {

        if (!button) {

            return;

        }


        button.disabled =
            Boolean(
                saving
            );


        button.setAttribute(
            "aria-busy",
            saving
                ? "true"
                : "false"
        );


        if (saving) {

            button.classList.add(
                "is-saving"
            );

        }
        else {

            button.classList.remove(
                "is-saving"
            );

        }

    }


    /* ======================================================================
       USER-VISIBLE ERROR

       Uses existing page markup only.
       No HTML redesign is required.
       ====================================================================== */


    function showSubmissionError(
        error
    ) {

        const message =
            error &&
            error.message
                ? stringifyDiagnosticValue(
                    error.message
                )
                : stringifyDiagnosticValue(
                    error
                );


        /*
         * Keep the error explicit.
         * Do not navigate and do not silently swallow persistence failure.
         */
        window.alert(
            message ||
            "Unable to save your Life Assessment. Please try again."
        );

    }


    /* ======================================================================
       NAVIGATION TO PAGE 04
       ====================================================================== */


    function bindNavigation() {

        const button =
            document.getElementById(
                "show-alignment-button"
            );


        if (!button) {

            console.warn(
                "Page03: show-alignment-button not found."
            );

            return;

        }


        button.addEventListener(
            "click",
            function () {

                const completed =
                    Object.keys(
                        assessmentData
                    ).length;


                console.log(
                    "KALA CHAKRA™ Completion:",
                    completed,
                    "/",
                    PAGE03_CONFIG.totalPillars
                );


                submitAssessment();

            }
        );

    }


    /* ======================================================================
       PUBLIC PAGE MODULE
       ====================================================================== */


    window.CTM_PAGE03 = {

        init:
            initPage03,

        getData:
            function () {

                return Object.assign(
                    {},
                    assessmentData
                );

            },

        isComplete:
            isAssessmentComplete,

        getPeopleId:
            resolvePeopleId,

        buildPayload:
            buildAssessmentPayload,

        submit:
            submitAssessment

    };


})();

