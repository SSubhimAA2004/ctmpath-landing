
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   js/page07.js

   PAGE:
   07 — CONTINUE YOUR GUIDED JOURNEY™

   VERSION:
   1.0

   PURPOSE:
   --------------------------------------------------------------------------
   Final relationship / conversion page.

   Responsibilities:

   ✓ Recover existing journey results
   ✓ Display the existing KALA CHAKRA™ life score
   ✓ Display the existing lifestyle stage
   ✓ Recover PeopleID when available
   ✓ Calculate/display the 180-day target date
   ✓ Preserve the user's existing journey data
   ✓ Open Discovery Session
   ✓ Handle Report action without duplicating backend finalization
   ✓ Provide safe continuation behaviour
   ✓ Prevent duplicate event handlers
   ✓ Keep Page 07 independent from Page 02–06 scoring logic

   IMPORTANT ARCHITECTURE RULE:

   Page 07 does NOT:

   ✗ Recalculate Page 02
   ✗ Recalculate Page 03
   ✗ Recalculate Page 04
   ✗ Recalculate Page 05
   ✗ Rebuild Page 06
   ✗ Invent a score
   ✗ Generate a second report
   ✗ Duplicate backend finalization
   ✗ Modify the frozen header
   ✗ Load the footer

   Existing journey data remains canonical.

   ========================================================================== */

(function (window, document) {

    "use strict";


    /* ======================================================================
       CONFIGURATION
       ====================================================================== */

    const CONFIG = {

        pageName:
            "CONTINUE YOUR GUIDED JOURNEY™",

        pageNumber:
            7,

        totalPages:
            7,


        /*
         * Canonical Page 02 result.
         */

        page02ResultKey:
            "ctm_page02_result",


        /*
         * Canonical Page 04 alignment result.
         */

        page04ResultKey:
            "CTM_PAGE04_ALIGNMENT_RESULT",


        /*
         * Canonical Page 05 diagnosis result.
         */

        page05DiagnosisKey:
            "CTM_PAGE05_DIAGNOSIS_RESULT",


        /*
         * Journey state.
         */

        journeyStateKey:
            "CTM_GUIDED_JOURNEY_STATE",


        /*
         * Page 06 prescription state.
         */

        page06PrescriptionKey:
            "CTM_PAGE06_PRESCRIPTION",


        /*
         * Existing PeopleID compatibility keys.
         */

        peopleIdKeys: [

            "peopleId",
            "PeopleID",
            "peopleID",
            "ctm_client_id",
            "CTM_CLIENT_ID"

        ],


        /*
         * Existing registration / identity keys.
         */

        identityKeys: [

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
         * Discovery Session.
         *
         * This is the same Calendly destination already established
         * for the CTM PATH™ journey.
         */

        calendlyUrl:
            "https://calendly.com/healerking-umbaravai/30min",


        /*
         * Final journey continuation.
         *
         * Page 07 is the final page in the seven-page journey.
         *
         * Therefore "Continue Your Journey" does not invent another
         * assessment page. It returns the visitor to the journey
         * beginning.
         */

        continuePage:
            "/index.html"

    };


    /* ======================================================================
       STATE
       ====================================================================== */

    const state = {

        initialized:
            false,

        journeyResult:
            null,

        page02Result:
            null,

        page04Result:
            null,

        page05Diagnosis:
            null,

        page06Prescription:
            null,

        peopleId:
            null,

        reportData:
            null,

        visionDate:
            null

    };


    /* ======================================================================
       SAFE STORAGE
       ====================================================================== */

    function readStorageObject(
        storage,
        key
    ) {

        if (
            !storage ||
            !key
        ) {

            return null;

        }


        try {

            const raw =
                storage.getItem(
                    key
                );


            if (!raw) {

                return null;

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

            /*
             * Page 07 should remain usable even if an old
             * or malformed storage value exists.
             */

            console.warn(
                "Page07: Unable to read storage key:",
                key,
                error
            );

        }


        return null;

    }


    /* ======================================================================
       READ FROM SESSION FIRST, THEN LOCAL
       ====================================================================== */

    function readObject(
        key
    ) {

        const sessionValue =
            readStorageObject(
                sessionStorage,
                key
            );


        if (sessionValue) {

            return sessionValue;

        }


        return readStorageObject(
            localStorage,
            key
        );

    }


    /* ======================================================================
       READ SIMPLE STRING
       ====================================================================== */

    function readString(
        storage,
        key
    ) {

        if (
            !storage ||
            !key
        ) {

            return "";

        }


        try {

            const value =
                storage.getItem(
                    key
                );


            return value
                ? String(value).trim()
                : "";

        }

        catch (error) {

            return "";

        }

    }


    /* ======================================================================
       RESOLVE PEOPLE ID
       ====================================================================== */

    function resolvePeopleId() {

        /*
         * --------------------------------------------------------------
         * 1. Page02Session
         * --------------------------------------------------------------
         */

        try {

            if (
                window.Page02Session &&
                typeof window.Page02Session.load === "function"
            ) {

                const session =
                    window.Page02Session.load();


                if (session) {

                    const candidates = [

                        session.peopleId,
                        session.PeopleID,
                        session.peopleID,
                        session.clientId,
                        session.ClientID

                    ];


                    for (
                        let i = 0;
                        i < candidates.length;
                        i++
                    ) {

                        const value =
                            String(
                                candidates[i] || ""
                            ).trim();


                        if (value) {

                            return value;

                        }

                    }

                }

            }

        }

        catch (error) {

            console.warn(
                "Page07: Unable to resolve PeopleID from Page02Session.",
                error
            );

        }


        /*
         * --------------------------------------------------------------
         * 2. Search sessionStorage + localStorage
         * --------------------------------------------------------------
         */

        const stores = [

            sessionStorage,
            localStorage

        ];


        for (
            let storeIndex = 0;
            storeIndex < stores.length;
            storeIndex++
        ) {

            const store =
                stores[storeIndex];


            for (
                let keyIndex = 0;
                keyIndex < CONFIG.peopleIdKeys.length;
                keyIndex++
            ) {

                const key =
                    CONFIG.peopleIdKeys[keyIndex];


                const value =
                    readString(
                        store,
                        key
                    );


                if (value) {

                    return value;

                }

            }

        }


        /*
         * --------------------------------------------------------------
         * 3. Search identity objects
         * --------------------------------------------------------------
         */

        for (
            let i = 0;
            i < CONFIG.identityKeys.length;
            i++
        ) {

            const identity =
                readObject(
                    CONFIG.identityKeys[i]
                );


            if (!identity) {

                continue;

            }


            const candidates = [

                identity.peopleId,
                identity.PeopleID,
                identity.peopleID,
                identity.clientId,
                identity.ClientID,
                identity.id

            ];


            for (
                let j = 0;
                j < candidates.length;
                j++
            ) {

                const value =
                    String(
                        candidates[j] || ""
                    ).trim();


                if (value) {

                    return value;

                }

            }

        }


        return "";

    }


    /* ======================================================================
       LOAD EXISTING JOURNEY DATA
       ====================================================================== */

    function loadJourneyData() {

        state.page02Result =
            readObject(
                CONFIG.page02ResultKey
            );


        state.page04Result =
            readObject(
                CONFIG.page04ResultKey
            );


        state.page05Diagnosis =
            readObject(
                CONFIG.page05DiagnosisKey
            );


        state.page06Prescription =
            readObject(
                CONFIG.page06PrescriptionKey
            );


        state.journeyResult =
            readObject(
                CONFIG.journeyStateKey
            );


        state.peopleId =
            resolvePeopleId();


        console.log(
            "CTM PATH™ Page07 journey data recovered:",
            {
                hasPage02:
                    Boolean(
                        state.page02Result
                    ),

                hasPage04:
                    Boolean(
                        state.page04Result
                    ),

                hasPage05:
                    Boolean(
                        state.page05Diagnosis
                    ),

                hasPage06:
                    Boolean(
                        state.page06Prescription
                    ),

                peopleId:
                    state.peopleId || null
            }
        );

    }


    /* ======================================================================
       FIND FIRST DEFINED VALUE
       ====================================================================== */

    function firstDefined() {

        for (
            let i = 0;
            i < arguments.length;
            i++
        ) {

            const value =
                arguments[i];


            if (
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {

                return value;

            }

        }


        return null;

    }


    /* ======================================================================
       NUMERIC VALUE
       ====================================================================== */

    function toNumber(
        value
    ) {

        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {

            return null;

        }


        const numeric =
            Number(
                String(value)
                    .replace(
                        /[^0-9.-]/g,
                        ""
                    )
            );


        return Number.isFinite(
            numeric
        )
            ? numeric
            : null;

    }


    /* ======================================================================
       EXTRACT LIFE SCORE
       ====================================================================== */

    function resolveLifeScore() {

        /*
         * Page 02 is the canonical Millionaire Lifestyle Score.
         */

        const p2 =
            state.page02Result;


        if (p2) {

            const score =
                firstDefined(

                    p2.totalScore,
                    p2.total,
                    p2.score,
                    p2.millionaireLifestyleScore,
                    p2.millionaireLifestylePercentage,
                    p2.percentage

                );


            const numeric =
                toNumber(
                    score
                );


            if (
                numeric !== null
            ) {

                return Math.round(
                    numeric
                );

            }

        }


        /*
         * Page 04 alignment score is a secondary
         * presentation fallback only.
         *
         * It is NOT recalculated.
         */

        const p4 =
            state.page04Result;


        if (p4) {

            const score =
                firstDefined(

                    p4.percentage,
                    p4.alignmentPercentage,
                    p4.alignmentScore,
                    p4.lifeScore,
                    p4.score

                );


            const numeric =
                toNumber(
                    score
                );


            if (
                numeric !== null
            ) {

                return Math.round(
                    numeric
                );

            }

        }


        /*
         * Journey state fallback.
         */

        const journey =
            state.journeyResult;


        if (journey) {

            const score =
                firstDefined(

                    journey.totalScore,
                    journey.lifeScore,
                    journey.score,
                    journey.percentage

                );


            const numeric =
                toNumber(
                    score
                );


            if (
                numeric !== null
            ) {

                return Math.round(
                    numeric
                );

            }

        }


        return null;

    }


    /* ======================================================================
       EXTRACT LIFE LEVEL
       ====================================================================== */

    function resolveLifeLevel(
        score
    ) {

        /*
         * Prefer the existing Page02 stage.
         */

        if (
            state.page02Result
        ) {

            const existingStage =
                firstDefined(

                    state.page02Result.stage,
                    state.page02Result.lifestyleStage,
                    state.page02Result.lifeLevel,
                    state.page02Result.level

                );


            if (existingStage) {

                return String(
                    existingStage
                );

            }

        }


        /*
         * Prefer Page04 level.
         */

        if (
            state.page04Result
        ) {

            const existingLevel =
                firstDefined(

                    state.page04Result.lifeLevel,
                    state.page04Result.level,
                    state.page04Result.stage

                );


            if (existingLevel) {

                return String(
                    existingLevel
                );

            }

        }


        /*
         * Only if no canonical label exists, use the
         * already established Page02 thresholds.
         *
         * This does NOT alter the score.
         */

        if (
            score === null
        ) {

            return "உங்கள் வாழ்க்கை நிலை";

        }


        if (
            score >= 100
        ) {

            return "Millionaire Lifestyle Benchmark Achieved";

        }


        if (
            score >= 81
        ) {

            return "Millionaire Lifestyle";

        }


        if (
            score >= 61
        ) {

            return "Wealth-Building Lifestyle";

        }


        if (
            score >= 41
        ) {

            return "Affluent Transition";

        }


        if (
            score >= 21
        ) {

            return "Middle-Class Stability";

        }


        return "Survival / Foundation";

    }


    /* ======================================================================
       UPDATE LIFE SCORE
       ====================================================================== */

    function renderLifeScore() {

        const scoreElement =
            document.getElementById(
                "page07LifeScore"
            );


        const levelElement =
            document.getElementById(
                "page07LifeLevel"
            );


        const score =
            resolveLifeScore();


        if (
            scoreElement
        ) {

            scoreElement.innerHTML = "";


            if (
                score === null
            ) {

                const unavailable =
                    document.createElement(
                        "span"
                    );


                unavailable.textContent =
                    "—";


                scoreElement.appendChild(
                    unavailable
                );

            }

            else {

                const value =
                    document.createElement(
                        "span"
                    );


                value.textContent =
                    String(score);


                const maximum =
                    document.createElement(
                        "small"
                    );


                maximum.textContent =
                    " / 100";


                scoreElement.appendChild(
                    value
                );


                scoreElement.appendChild(
                    maximum
                );

            }

        }


        if (
            levelElement
        ) {

            levelElement.textContent =
                resolveLifeLevel(
                    score
                );

        }

    }


    /* ======================================================================
       CALCULATE 180-DAY TARGET DATE
       ====================================================================== */

    function calculate180DayDate() {

        /*
         * Date arithmetic is based on the visitor's current
         * local calendar date.
         *
         * "180 days from today" means today + 180 calendar days.
         */

        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );


        const target =
            new Date(
                today
            );


        target.setDate(
            target.getDate() + 180
        );


        return target;

    }


    /* ======================================================================
       FORMAT TAMIL DATE
       ====================================================================== */

    function formatTamilDate(
        date
    ) {

        const months = [

            "ஜனவரி",
            "பிப்ரவரி",
            "மார்ச்",
            "ஏப்ரல்",
            "மே",
            "ஜூன்",
            "ஜூலை",
            "ஆகஸ்ட்",
            "செப்டம்பர்",
            "அக்டோபர்",
            "நவம்பர்",
            "டிசம்பர்"

        ];


        return (
            String(
                date.getDate()
            ) +
            " " +
            months[
                date.getMonth()
            ] +
            " " +
            String(
                date.getFullYear()
            )
        );

    }


    /* ======================================================================
       FORMAT ENGLISH DATE
       ====================================================================== */

    function formatEnglishDate(
        date
    ) {

        return new Intl.DateTimeFormat(
            "en-IN",
            {
                day:
                    "2-digit",

                month:
                    "long",

                year:
                    "numeric"
            }
        ).format(
            date
        ).toUpperCase();

    }


    /* ======================================================================
       RENDER VISION DATE
       ====================================================================== */

    function renderVisionDate() {

        const date =
            calculate180DayDate();


        state.visionDate =
            date;


        const tamilDate =
            document.getElementById(
                "page07VisionDate"
            );


        const englishDate =
            document.querySelector(
                ".page07-vision-date-en"
            );


        if (
            tamilDate
        ) {

            tamilDate.textContent =
                formatTamilDate(
                    date
                );

        }


        if (
            englishDate
        ) {

            englishDate.textContent =
                formatEnglishDate(
                    date
                );

        }


        console.log(
            "CTM PATH™ Page07 180-day target:",
            date.toISOString()
        );

    }


    /* ======================================================================
       BUILD SUMMARY MODEL
       ====================================================================== */

    function buildSummaryModel() {

        const score =
            resolveLifeScore();


        const stage =
            resolveLifeLevel(
                score
            );


        const strongest =
            state.page02Result &&
            state.page02Result.strongestDimension
                ? state.page02Result.strongestDimension
                : null;


        const growth =
            state.page02Result &&
            state.page02Result.growthDimension
                ? state.page02Result.growthDimension
                : null;


        return {

            peopleId:
                state.peopleId || null,

            score:
                score,

            percentage:
                score,

            stage:
                stage,

            strongestDimension:
                strongest,

            growthDimension:
                growth

        };

    }


    /* ======================================================================
       DISCOVERY SESSION
       ====================================================================== */

    function openDiscoverySession(
        event
    ) {

        if (
            event
        ) {

            event.preventDefault();

        }


        const url =
            CONFIG.calendlyUrl;


        if (!url) {

            console.error(
                "Page07: Calendly URL is not configured."
            );


            return;

        }


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    /* ======================================================================
       REPORT URL RECOVERY
       ====================================================================== */

    function extractReportUrl(
        source
    ) {

        if (
            !source ||
            typeof source !== "object"
        ) {

            return "";

        }


        const direct =
            firstDefined(

                source.reportUrl,
                source.pdfUrl,
                source.downloadUrl,
                source.fileUrl,
                source.pdfUrl,
                source.documentUrl

            );


        if (
            typeof direct === "string" &&
            direct.trim()
        ) {

            return direct.trim();

        }


        /*
         * Search nested delivery objects.
         */

        const nestedObjects = [

            source.report,
            source.document,
            source.pdf,
            source.delivery,
            source.result,
            source.data

        ];


        for (
            let i = 0;
            i < nestedObjects.length;
            i++
        ) {

            const nested =
                nestedObjects[i];


            if (
                !nested ||
                typeof nested !== "object"
            ) {

                continue;

            }


            const nestedUrl =
                extractReportUrl(
                    nested
                );


            if (
                nestedUrl
            ) {

                return nestedUrl;

            }

        }


        return "";

    }


    /* ======================================================================
       RECOVER REPORT DATA
       ====================================================================== */

    function recoverReportData() {

        const keys = [

            "CTM_PAGE06_REPORT_DELIVERY",
            "CTM_PAGE06_EMAIL_DELIVERY",
            "CTM_FINAL_REPORT",
            "CTM_REPORT_RESULT",
            "CTM_REPORT_DELIVERY",
            "CTM_JOURNEY_FINALIZATION",
            "CTM_JOURNEY_FINAL_RESULT"

        ];


        for (
            let i = 0;
            i < keys.length;
            i++
        ) {

            const result =
                readObject(
                    keys[i]
                );


            if (
                result
            ) {

                const url =
                    extractReportUrl(
                        result
                    );


                state.reportData = {

                    result:
                        result,

                    url:
                        url

                };


                return state.reportData;

            }

        }


        return null;

    }


    /* ======================================================================
       DOWNLOAD REPORT
       ====================================================================== */

    function downloadReport(
        event
    ) {

        if (
            event
        ) {

            event.preventDefault();

        }


        const report =
            state.reportData ||
            recoverReportData();


        if (
            report &&
            report.url
        ) {

            window.open(
                report.url,
                "_blank",
                "noopener,noreferrer"
            );


            return;

        }


        /*
         * The final report is backend-owned.
         *
         * Page 06's finalization workflow generates and delivers
         * the report. Page 07 must not call finalizeJourney again
         * merely because the visitor clicked Download Report.
         */

        showReportMessage();

    }


    /* ======================================================================
       REPORT MESSAGE
       ====================================================================== */

    function showReportMessage() {

        const existing =
            document.getElementById(
                "page07ReportMessage"
            );


        if (
            existing
        ) {

            existing.remove();

        }


        const message =
            document.createElement(
                "div"
            );


        message.id =
            "page07ReportMessage";


        message.setAttribute(
            "role",
            "status"
        );


        message.textContent =
            "உங்கள் பயண அறிக்கை ஏற்கனவே உருவாக்கப்பட்டு, பதிவு செய்யப்பட்ட மின்னஞ்சலுக்கு அனுப்பப்பட்டுள்ளது. / Your journey report has already been generated and sent to your registered email address.";


        /*
         * Inline styling is intentionally limited to this
         * temporary status message so no Page07 CSS contract
         * needs to be expanded.
         */

        message.style.margin =
            "18px auto 0";

        message.style.maxWidth =
            "760px";

        message.style.padding =
            "14px 18px";

        message.style.border =
            "1px solid rgba(24,199,181,.28)";

        message.style.borderRadius =
            "12px";

        message.style.background =
            "rgba(24,199,181,.06)";

        message.style.color =
            "#b9d8d5";

        message.style.fontSize =
            "0.78rem";

        message.style.lineHeight =
            "1.7";

        message.style.textAlign =
            "center";


        const anchor =
            document.querySelector(
                ".page07-secondary-actions"
            );


        if (
            anchor &&
            anchor.parentNode
        ) {

            anchor.parentNode.insertBefore(
                message,
                anchor.nextSibling
            );

        }

        else {

            document.body.appendChild(
                message
            );

        }

    }


    /* ======================================================================
       CONTINUE JOURNEY
       ====================================================================== */

    function continueJourney(
        event
    ) {

        if (
            event
        ) {

            event.preventDefault();

        }


        /*
         * Page 07 is the final page in the current seven-page
         * architecture.
         *
         * Returning to index.html starts a new guided journey.
         */

        window.location.href =
            CONFIG.continuePage;

    }


    /* ======================================================================
       SMOOTH SCROLL TO DISCOVERY CTA
       ====================================================================== */

    function scrollToDiscovery() {

        const target =
            document.querySelector(
                ".page07-discovery-card"
            );


        if (
            !target
        ) {

            return;

        }


        target.scrollIntoView({

            behavior:
                "smooth",

            block:
                "center"

        });

    }


    /* ======================================================================
       BIND PRIMARY DISCOVERY BUTTON
       ====================================================================== */

    function bindDiscoveryButton() {

        const button =
            document.getElementById(
                "page07BookSession"
            );


        if (
            !button
        ) {

            return;

        }


        if (
            button.dataset.page07Bound === "true"
        ) {

            return;

        }


        button.dataset.page07Bound =
            "true";


        button.addEventListener(
            "click",
            openDiscoverySession
        );

    }


    /* ======================================================================
       BIND REPORT BUTTON
       ====================================================================== */

    function bindReportButton() {

        const button =
            document.getElementById(
                "page07DownloadReport"
            );


        if (
            !button
        ) {

            return;

        }


        if (
            button.dataset.page07Bound === "true"
        ) {

            return;

        }


        button.dataset.page07Bound =
            "true";


        button.addEventListener(
            "click",
            downloadReport
        );

    }


    /* ======================================================================
       BIND CONTINUE BUTTON
       ====================================================================== */

    function bindContinueButton() {

        const button =
            document.getElementById(
                "page07ContinueJourney"
            );


        if (
            !button
        ) {

            return;

        }


        if (
            button.dataset.page07Bound === "true"
        ) {

            return;

        }


        button.dataset.page07Bound =
            "true";


        button.addEventListener(
            "click",
            continueJourney
        );

    }


    /* ======================================================================
       BIND ALL ACTIONS
       ====================================================================== */

    function bindActions() {

        bindDiscoveryButton();

        bindReportButton();

        bindContinueButton();

    }


    /* ======================================================================
       BUILD PAGE MODEL
       ====================================================================== */

    function buildPageModel() {

        const summary =
            buildSummaryModel();


        state.summary =
            summary;


        /*
         * Report data may have been persisted by Page 06.
         */

        state.reportData =
            recoverReportData();


        return summary;

    }


    /* ======================================================================
       LOG PAGE STATE
       ====================================================================== */

    function logPageState() {

        const summary =
            state.summary ||
            buildSummaryModel();


        console.log(
            "CTM PATH™ Page07 Ready:",
            {

                page:
                    CONFIG.pageNumber +
                    " / " +
                    CONFIG.totalPages,

                peopleId:
                    state.peopleId ||
                    null,

                lifeScore:
                    summary.score,

                stage:
                    summary.stage,

                visionDate:
                    state.visionDate
                        ? state.visionDate
                            .toISOString()
                        : null,

                reportAvailable:
                    Boolean(
                        state.reportData &&
                        state.reportData.url
                    )

            }
        );

    }


    /* ======================================================================
       INITIALIZE
       ====================================================================== */

    function init() {

        if (
            state.initialized
        ) {

            return;

        }


        state.initialized =
            true;


        /*
         * Recover everything that already exists.
         */

        loadJourneyData();


        /*
         * Build the presentation model.
         */

        buildPageModel();


        /*
         * Render dynamic score.
         */

        renderLifeScore();


        /*
         * Render the current 180-day date.
         */

        renderVisionDate();


        /*
         * Bind actions exactly once.
         */

        bindActions();


        /*
         * Log diagnostic information.
         */

        logPageState();


        console.log(
            "CTM PATH™ Page07 Initialized"
        );

    }


    /* ======================================================================
       PUBLIC API
       ====================================================================== */

    window.CTM_PAGE07 = {

        version:
            "1.0",

        init:
            init,

        getState:
            function () {

                return state;

            },

        getSummary:
            function () {

                return buildSummaryModel();

            },

        getPeopleId:
            function () {

                return state.peopleId || "";

            },

        getVisionDate:
            function () {

                return state.visionDate;

            },

        openDiscoverySession:
            openDiscoverySession,

        downloadReport:
            downloadReport,

        continueJourney:
            continueJourney

    };


    /* ======================================================================
       AUTO INITIALIZATION FALLBACK
       ======================================================================

       page07.html already calls CTM_PAGE07.init() after the global
       component layer has loaded.

       This fallback protects against a future HTML integration where
       the explicit initializer is omitted.

       ====================================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                init();

            },
            {
                once:
                    true
            }
        );

    }

    else {

        init();

    }


})(window, document);


/* ==========================================================================
   END OF PAGE 07 JAVASCRIPT
   ========================================================================== */

