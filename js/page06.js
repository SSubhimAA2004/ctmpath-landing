
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   js/page06.js

   PAGE:
   PERSONAL TRANSFORMATION PRESCRIPTION™

   VERSION:
   1.2

   RESPONSIBILITIES:

   ✓ Read Frozen Page 05 Diagnosis Result
   ✓ Extract Primary Focus
   ✓ Personalise Page 06 Primary Focus Section
   ✓ Preserve 180-Day Prescription State
   ✓ Generate Backend 180-Day Prescription
   ✓ Generate Complete Diagnosis + Prescription Report
   ✓ Generate PDF
   ✓ Email PDF to Registered Email Address
   ✓ Prevent Duplicate / Double-Click Delivery
   ✓ Preserve Specific Backend Errors for QA
   ✓ Navigate to Page 07 only after successful delivery

   IMPORTANT:

   ✗ Does NOT recalculate Page 02 assessment
   ✗ Does NOT recalculate Page 03 Kala Chakra™ scores
   ✗ Does NOT rebuild Page 04 Life Wheel
   ✗ Does NOT rebuild Page 05 diagnosis
   ✗ Does NOT modify Global Header
   ✗ Does NOT modify Global Footer

========================================================================== */

(function () {

    "use strict";


    /* ======================================================================
       PAGE CONFIGURATION
    ====================================================================== */

    const PAGE06_CONFIG = {

        pageName:
            "PERSONAL TRANSFORMATION PRESCRIPTION™",

        nextPage:
            "page07.html",

        diagnosisStorageKey:
            "CTM_PAGE05_DIAGNOSIS_RESULT",

        prescriptionStorageKey:
            "CTM_PAGE06_PRESCRIPTION",

        journeyStorageKey:
            "CTM_GUIDED_JOURNEY_STATE",

        /*
         * Final report delivery state.
         *
         * Prevents accidental duplicate:
         *
         * PDF generation
         * +
         * email delivery
         *
         * during the same journey session.
         */
        deliveryStorageKey:
            "CTM_PAGE06_REPORT_DELIVERY"

    };


    /* ======================================================================
       PAGE STATE
    ====================================================================== */

    let page06State = {

        diagnosis:
            null,

        primaryFocus:
            null,

        prescription:
            null,

        delivering:
            false,

        delivered:
            false,

        initialized:
            false

    };


    /* ======================================================================
       DEFAULT PRIMARY FOCUS

       Used ONLY when Page 05 diagnosis cannot be recovered.

       Page 06 must NEVER invent a diagnosis.
    ====================================================================== */

    const DEFAULT_PRIMARY_FOCUS = {

        titleTa:
            "உங்கள் முக்கிய வளர்ச்சி முன்னுரிமை",

        titleEn:
            "YOUR PRIMARY GROWTH PRIORITY",

        descriptionTa:
            "உங்கள் Diagnosis அடிப்படையில், அடுத்த 180 நாட்களில் அதிக கவனம் செலுத்த வேண்டிய பகுதி இங்கே காட்டப்படும்.",

        descriptionEn:
            "Based on your diagnosis, your highest-priority area for the next 180 days will appear here.",

        source:
            "fallback"

    };


    /* ======================================================================
       INITIALIZE PAGE 06
    ====================================================================== */

    function initPage06() {

        if (page06State.initialized) {
            return;
        }

        console.log(
            "CTM PATH™ MILLIONAIRES™ Page06 Loaded"
        );


        /*
         * --------------------------------------------------------------
         * 1. Recover frozen Page 05 diagnosis
         * --------------------------------------------------------------
         */

        const diagnosis =
            loadDiagnosisResult();

        page06State.diagnosis =
            diagnosis;


        /*
         * --------------------------------------------------------------
         * 2. Determine Primary Focus
         * --------------------------------------------------------------
         */

        const primaryFocus =
            extractPrimaryFocus(
                diagnosis
            );

        page06State.primaryFocus =
            primaryFocus;


        /*
         * --------------------------------------------------------------
         * 3. Render Primary Focus
         * --------------------------------------------------------------
         */

        renderPrimaryFocus(
            primaryFocus
        );


        /*
         * --------------------------------------------------------------
         * 4. Build Page 06 prescription state
         * --------------------------------------------------------------
         */

        const prescription =
            buildPrescriptionState(
                diagnosis,
                primaryFocus
            );

        page06State.prescription =
            prescription;


        /*
         * --------------------------------------------------------------
         * 5. Persist Page 06 state
         * --------------------------------------------------------------
         */

        savePrescription(
            prescription
        );


        /*
         * --------------------------------------------------------------
         * 6. Update journey progress
         * --------------------------------------------------------------
         */

        updateJourneyState();


        /*
         * --------------------------------------------------------------
         * 7. Recover existing delivery status
         * --------------------------------------------------------------
         */

        const existingDelivery =
            loadDeliveryState();

        if (
            existingDelivery &&
            existingDelivery.status === "SENT"
        ) {

            page06State.delivered =
                true;

        }


        /*
         * --------------------------------------------------------------
         * 8. Bind final navigator
         * --------------------------------------------------------------
         */

        bindNavigation();


        page06State.initialized =
            true;


        console.log(
            "Page06 Primary Focus:",
            primaryFocus
        );

    }


    /* ======================================================================
       LOAD PAGE 05 DIAGNOSIS RESULT
    ====================================================================== */

    function loadDiagnosisResult() {

        /*
         * Page 05 runtime result.
         */

        if (
            window.CTM_PAGE05_DIAGNOSIS_RESULT &&
            typeof window.CTM_PAGE05_DIAGNOSIS_RESULT === "object"
        ) {

            return (
                window.CTM_PAGE05_DIAGNOSIS_RESULT
            );

        }


        /*
         * Primary source:
         * sessionStorage
         */

        const sessionResult =
            readStorageObject(
                sessionStorage,
                PAGE06_CONFIG.diagnosisStorageKey
            );

        if (sessionResult) {
            return sessionResult;
        }


        /*
         * Secondary recovery:
         * localStorage
         */

        const localResult =
            readStorageObject(
                localStorage,
                PAGE06_CONFIG.diagnosisStorageKey
            );

        if (localResult) {
            return localResult;
        }


        /*
         * Compatibility recovery.
         *
         * READ ONLY.
         *
         * Does not change frozen Page 05 contract.
         */

        const compatibleKeys = [

            "CTM_PAGE05_DIAGNOSIS",

            "CTM_DIAGNOSIS_RESULT",

            "CTM_DIAGNOSIS"

        ];


        for (
            let i = 0;
            i < compatibleKeys.length;
            i++
        ) {

            const key =
                compatibleKeys[i];


            const fromSession =
                readStorageObject(
                    sessionStorage,
                    key
                );

            if (fromSession) {
                return fromSession;
            }


            const fromLocal =
                readStorageObject(
                    localStorage,
                    key
                );

            if (fromLocal) {
                return fromLocal;
            }

        }


        console.warn(
            "Page06: Frozen Page05 diagnosis result was not found."
        );

        return null;

    }


    /* ======================================================================
       SAFE STORAGE READER
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

            console.warn(
                "Page06: Unable to read storage key:",
                key,
                error
            );

        }


        return null;

    }


    /* ======================================================================
       EXTRACT PRIMARY FOCUS
    ====================================================================== */

    function extractPrimaryFocus(
        diagnosis
    ) {

        if (
            !diagnosis ||
            typeof diagnosis !== "object"
        ) {

            return cloneObject(
                DEFAULT_PRIMARY_FOCUS
            );

        }


        /*
         * --------------------------------------------------------------
         * Preferred:
         * Page 05 Priority Focus
         * --------------------------------------------------------------
         */

        const priorityFocus =
            firstDefined(

                diagnosis.priorityFocus,
                diagnosis.priority_focus,

                diagnosis.primaryFocus,
                diagnosis.primary_focus,

                diagnosis.focus,
                diagnosis.priority

            );


        const normalizedPriority =
            normalizeFocusObject(
                priorityFocus
            );


        if (normalizedPriority) {

            normalizedPriority.source =
                "page05-priority-focus";

            return normalizedPriority;

        }


        /*
         * --------------------------------------------------------------
         * Secondary:
         * Growth Opportunities
         * --------------------------------------------------------------
         */

        const growthOpportunities =
            firstDefined(

                diagnosis.growthOpportunities,
                diagnosis.growth_opportunities,

                diagnosis.opportunities,

                diagnosis.growthAreas,
                diagnosis.growth_areas

            );


        const firstOpportunity =
            getFirstMeaningfulItem(
                growthOpportunities
            );


        const normalizedOpportunity =
            normalizeFocusObject(
                firstOpportunity
            );


        if (normalizedOpportunity) {

            normalizedOpportunity.source =
                "page05-growth-opportunity";

            return normalizedOpportunity;

        }


        /*
         * --------------------------------------------------------------
         * Tertiary:
         * Root Patterns
         * --------------------------------------------------------------
         */

        const rootPatterns =
            firstDefined(

                diagnosis.rootPatterns,
                diagnosis.root_patterns,

                diagnosis.patterns

            );


        const firstPattern =
            getFirstMeaningfulItem(
                rootPatterns
            );


        const normalizedPattern =
            normalizeFocusObject(
                firstPattern
            );


        if (normalizedPattern) {

            normalizedPattern.source =
                "page05-root-pattern";

            return normalizedPattern;

        }


        /*
         * Never invent diagnosis.
         */

        return cloneObject(
            DEFAULT_PRIMARY_FOCUS
        );

    }


    /* ======================================================================
       NORMALIZE FOCUS OBJECT
    ====================================================================== */

    function normalizeFocusObject(
        value
    ) {

        if (
            value === undefined ||
            value === null
        ) {

            return null;

        }


        /*
         * STRING
         */

        if (
            typeof value === "string"
        ) {

            const clean =
                value.trim();


            if (!clean) {
                return null;
            }


            return {

                titleTa:
                    clean,

                titleEn:
                    clean,

                descriptionTa:
                    "",

                descriptionEn:
                    "",

                source:
                    "string"

            };

        }


        /*
         * OBJECT
         */

        if (
            typeof value !== "object" ||
            Array.isArray(value)
        ) {

            return null;

        }


        const titleTa =
            firstNonEmptyString(

                value.titleTa,
                value.title_ta,

                value.tamilTitle,
                value.tamil,
                value.ta,

                value.nameTa,
                value.name_ta,

                value.labelTa,
                value.label_ta

            );


        const titleEn =
            firstNonEmptyString(

                value.titleEn,
                value.title_en,

                value.englishTitle,
                value.english,
                value.en,

                value.nameEn,
                value.name_en,

                value.labelEn,
                value.label_en,

                value.title,
                value.name,
                value.label

            );


        const descriptionTa =
            firstNonEmptyString(

                value.descriptionTa,
                value.description_ta,

                value.copyTa,
                value.copy_ta,

                value.insightTa,
                value.insight_ta,

                value.messageTa,
                value.message_ta,

                value.detailTa,
                value.detail_ta

            );


        const descriptionEn =
            firstNonEmptyString(

                value.descriptionEn,
                value.description_en,

                value.copyEn,
                value.copy_en,

                value.insightEn,
                value.insight_en,

                value.messageEn,
                value.message_en,

                value.detailEn,
                value.detail_en,

                value.description,
                value.insight,
                value.message,
                value.detail

            );


        /*
         * Some Page 05 objects may use:
         *
         * {
         *   pillar: "...",
         *   reason: "..."
         * }
         */

        const genericTitle =
            firstNonEmptyString(

                value.pillar,
                value.dimension,
                value.area,
                value.focus,
                value.priority

            );


        const genericDescription =
            firstNonEmptyString(

                value.reason,
                value.explanation,
                value.summary,
                value.recommendation

            );


        const finalTitleTa =
            titleTa ||
            genericTitle ||
            titleEn;


        const finalTitleEn =
            titleEn ||
            genericTitle ||
            titleTa;


        const finalDescriptionTa =
            descriptionTa ||
            genericDescription ||
            descriptionEn;


        const finalDescriptionEn =
            descriptionEn ||
            genericDescription ||
            descriptionTa;


        if (
            !finalTitleTa &&
            !finalTitleEn &&
            !finalDescriptionTa &&
            !finalDescriptionEn
        ) {

            return null;

        }


        return {

            titleTa:
                finalTitleTa ||
                DEFAULT_PRIMARY_FOCUS.titleTa,

            titleEn:
                finalTitleEn ||
                DEFAULT_PRIMARY_FOCUS.titleEn,

            descriptionTa:
                finalDescriptionTa || "",

            descriptionEn:
                finalDescriptionEn || "",

            source:
                "object"

        };

    }


    /* ======================================================================
       RENDER PRIMARY FOCUS
    ====================================================================== */

    function renderPrimaryFocus(
        focus
    ) {

        const safeFocus =
            focus ||
            DEFAULT_PRIMARY_FOCUS;


        const titleTaElement =
            document.getElementById(
                "page06-primary-focus-ta"
            );


        const titleEnElement =
            document.getElementById(
                "page06-primary-focus-en"
            );


        const copyTaElement =
            document.getElementById(
                "page06-primary-focus-copy-ta"
            );


        const copyEnElement =
            document.getElementById(
                "page06-primary-focus-copy-en"
            );


        if (titleTaElement) {

            titleTaElement.textContent =
                safeFocus.titleTa ||
                DEFAULT_PRIMARY_FOCUS.titleTa;

        }


        if (titleEnElement) {

            titleEnElement.textContent =
                safeFocus.titleEn ||
                DEFAULT_PRIMARY_FOCUS.titleEn;

        }


        if (copyTaElement) {

            copyTaElement.textContent =
                safeFocus.descriptionTa ||
                DEFAULT_PRIMARY_FOCUS.descriptionTa;

        }


        if (copyEnElement) {

            copyEnElement.textContent =
                safeFocus.descriptionEn ||
                DEFAULT_PRIMARY_FOCUS.descriptionEn;

        }

    }


    /* ======================================================================
       BUILD PAGE 06 PRESCRIPTION STATE

       Page 06 does NOT generate a new diagnosis.

       Packages:

       ✓ Frozen Page 05 diagnosis
       ✓ Primary Focus
       ✓ Fixed 180-Day Roadmap
       ✓ 3-6-9 Goal Practice
       ✓ Daily Rhythm
       ✓ Weekly Rhythm
       ✓ Monthly Rhythm
    ====================================================================== */

    function buildPrescriptionState(
        diagnosis,
        primaryFocus
    ) {

        return {

            version:
                "1.0",

            page:
                6,

            pageName:
                PAGE06_CONFIG.pageName,

            createdAt:
                new Date().toISOString(),

            primaryFocus:
                primaryFocus,


            roadmap: {

                durationDays:
                    180,

                phases: [

                    {
                        phase:
                            1,

                        days:
                            "01-30",

                        titleTa:
                            "அடித்தளம்™",

                        titleEn:
                            "FOUNDATION™"
                    },

                    {
                        phase:
                            2,

                        days:
                            "31-60",

                        titleTa:
                            "நிலைத்தன்மை™",

                        titleEn:
                            "STABILITY™"
                    },

                    {
                        phase:
                            3,

                        days:
                            "61-90",

                        titleTa:
                            "வளர்ச்சி™",

                        titleEn:
                            "GROWTH™"
                    },

                    {
                        phase:
                            4,

                        days:
                            "91-120",

                        titleTa:
                            "அமைப்புகள்™",

                        titleEn:
                            "SYSTEMS™"
                    },

                    {
                        phase:
                            5,

                        days:
                            "121-150",

                        titleTa:
                            "சுதந்திரம்™",

                        titleEn:
                            "FREEDOM™"
                    },

                    {
                        phase:
                            6,

                        days:
                            "151-180",

                        titleTa:
                            "பங்களிப்பும் மரபும்™",

                        titleEn:
                            "IMPACT & LEGACY™"
                    }

                ]

            },


            goalPractice: {

                method:
                    "3-6-9",

                sessions: [

                    {
                        before:
                            "06:00",

                        repetitions:
                            3
                    },

                    {
                        before:
                            "13:00",

                        repetitions:
                            6
                    },

                    {
                        before:
                            "20:00",

                        repetitions:
                            9
                    }

                ]

            },


            dailyNonNegotiables: [

                {
                    time:
                        "20:00-04:00",

                    title:
                        "SLEEP"
                },

                {
                    time:
                        "04:00-05:00",

                    title:
                        "PERSONAL LEARNING"
                },

                {
                    time:
                        "05:00-06:00",

                    title:
                        "ENERGY ZOOM SESSION™"
                },

                {
                    duration:
                        "1 HOUR",

                    title:
                        "PHYSICAL EXERCISE"
                }

            ],


            weeklyRhythm: {

                day:
                    "SATURDAY",

                time:
                    "14:00-17:00",

                activity:
                    "LOCAL GROUP LEARNING™"

            },


            monthlyRhythm: {

                schedule:
                    "LAST SATURDAY",

                activity:
                    "MEGA LEARNING PROGRAM™"

            },


            diagnosisSource:
                diagnosis || null

        };

    }


    /* ======================================================================
       SAVE PAGE 06 PRESCRIPTION
    ====================================================================== */

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

            sessionStorage.setItem(

                PAGE06_CONFIG.prescriptionStorageKey,

                serialized

            );

        }
        catch (error) {

            console.warn(
                "Page06: Unable to save prescription to sessionStorage.",
                error
            );

        }


        /*
         * Persistent recovery copy.
         */

        try {

            localStorage.setItem(

                PAGE06_CONFIG.prescriptionStorageKey,

                serialized

            );

        }
        catch (error) {

            console.warn(
                "Page06: Unable to save prescription to localStorage.",
                error
            );

        }


        /*
         * Public runtime copy.
         */

        window.CTM_PAGE06_PRESCRIPTION =
            prescription;

    }


    /* ======================================================================
       UPDATE GUIDED JOURNEY STATE
    ====================================================================== */

    function updateJourneyState() {

        let journeyState =
            readStorageObject(

                sessionStorage,

                PAGE06_CONFIG.journeyStorageKey

            );


        if (!journeyState) {
            journeyState = {};
        }


        journeyState.currentPage =
            6;


        journeyState.currentPageName =
            PAGE06_CONFIG.pageName;


        journeyState.page06Completed =
            false;


        journeyState.lastUpdatedAt =
            new Date().toISOString();


        try {

            sessionStorage.setItem(

                PAGE06_CONFIG.journeyStorageKey,

                JSON.stringify(
                    journeyState
                )

            );

        }
        catch (error) {

            console.warn(
                "Page06: Unable to update journey state.",
                error
            );

        }

    }


    /* ======================================================================
       MARK PAGE 06 COMPLETE
    ====================================================================== */

    function markPageComplete() {

        let journeyState =
            readStorageObject(

                sessionStorage,

                PAGE06_CONFIG.journeyStorageKey

            );


        if (!journeyState) {
            journeyState = {};
        }


        journeyState.currentPage =
            6;


        journeyState.currentPageName =
            PAGE06_CONFIG.pageName;


        journeyState.page06Completed =
            true;


        journeyState.page06CompletedAt =
            new Date().toISOString();


        journeyState.lastUpdatedAt =
            new Date().toISOString();


        try {

            sessionStorage.setItem(

                PAGE06_CONFIG.journeyStorageKey,

                JSON.stringify(
                    journeyState
                )

            );

        }
        catch (error) {

            console.warn(
                "Page06: Unable to mark Page06 complete.",
                error
            );

        }

    }


    /* ======================================================================
       NAVIGATION BINDING
    ====================================================================== */

    function bindNavigation() {

        const button =
            document.getElementById(
                "page06-next-button"
            );


        if (!button) {

            console.warn(
                "Page06: Next button not found."
            );

            return;

        }


        /*
         * Avoid duplicate listeners.
         */

        if (
            button.dataset.page06Bound === "true"
        ) {

            return;

        }


        button.dataset.page06Bound =
            "true";


        button.addEventListener(
            "click",
            handleNextPage
        );

    }


    /* ======================================================================
       HANDLE FINAL PAGE 06 DELIVERY + PAGE 07 TRANSITION

       CONTRACT

       CLICK
          ↓
       LOCK
          ↓
       SAVE PAGE 06 STATE
          ↓
       VALIDATE PEOPLE ID + EMAIL
          ↓
       GENERATE 180-DAY ROADMAP
          ↓
       GENERATE REPORT MODEL
          ↓
       GENERATE GOOGLE DOC + PDF
          ↓
       EMAIL PDF
          ↓
       SAVE SENT CONFIRMATION
          ↓
       MARK PAGE 06 COMPLETE
          ↓
       PAGE 07
    ====================================================================== */

    async function handleNextPage(
        event
    ) {

        if (event) {
            event.preventDefault();
        }


        /*
         * --------------------------------------------------------------
         * 1. IN-MEMORY DOUBLE CLICK PROTECTION
         * --------------------------------------------------------------
         */

        if (page06State.delivering) {
            return;
        }


        const identity =
            resolveJourneyIdentity();


        /*
         * --------------------------------------------------------------
         * 2. CHECK PREVIOUS CONFIRMED DELIVERY
         * --------------------------------------------------------------
         */

        const existingDelivery =
            loadDeliveryState();


        if (
            existingDelivery &&
            existingDelivery.status === "SENT" &&
            sameDeliveryIdentity(
                existingDelivery,
                identity
            )
        ) {

            page06State.delivered =
                true;


            markPageComplete();


            window.location.href =
                PAGE06_CONFIG.nextPage;


            return;

        }


        /*
         * --------------------------------------------------------------
         * 3. ACQUIRE IN-MEMORY LOCK
         * --------------------------------------------------------------
         */

        page06State.delivering =
            true;


        setDeliveryButtonState(
            true
        );


        try {


            /*
             * ----------------------------------------------------------
             * 4. PRESERVE LATEST PAGE 06 PRESCRIPTION
             * ----------------------------------------------------------
             */

            savePrescription(
                page06State.prescription
            );


            /*
             * ----------------------------------------------------------
             * 5. VALIDATE JOURNEY IDENTITY
             * ----------------------------------------------------------
             */

            validateDeliveryIdentity(
                identity
            );


            console.log(
                "Page06 Delivery Identity:",
                identity
            );


            /*
             * ----------------------------------------------------------
             * 6. VALIDATE FRONTEND API CONTRACT
             * ----------------------------------------------------------
             */

            validateDeliveryApi();


            /*
             * ----------------------------------------------------------
             * 7. ACQUIRE SESSION DELIVERY LOCK
             * ----------------------------------------------------------
             */

            saveDeliveryState({

                status:
                    "PROCESSING",

                peopleId:
                    identity.peopleId,

                email:
                    identity.email,

                startedAt:
                    new Date().toISOString()

            });


            /*
             * ----------------------------------------------------------
             * 8. GENERATE / PERSIST FROZEN 180-DAY ROADMAP
             * ----------------------------------------------------------
             */

            console.log(
                "Page06: Generating Transformation Prescription..."
            );


            const roadmapResponse =
                await window.CTM_API.generateRoadmap({

                    peopleId:
                        identity.peopleId

                });


            const roadmapResult =
                unwrapApiSuccess(
                    roadmapResponse,
                    "Transformation Prescription"
                );


            console.log(
                "Page06: Transformation Prescription generated.",
                roadmapResult
            );


            /*
             * ----------------------------------------------------------
             * 9. GENERATE COMPLETE REPORT MODEL
             * ----------------------------------------------------------
             */

            console.log(
                "Page06: Generating Report..."
            );


            const reportResponse =
                await window.CTM_API.generateReport({

                    peopleId:
                        identity.peopleId

                });


            const reportModel =
                unwrapApiSuccess(
                    reportResponse,
                    "Report"
                );


            if (
                !reportModel ||
                typeof reportModel !== "object"
            ) {

                throw new Error(
                    "CTM PATH™ report model was not returned by the backend."
                );

            }


            console.log(
                "Page06: Report model generated.",
                reportModel
            );


            /*
             * ----------------------------------------------------------
             * 10. GENERATE GOOGLE DOCUMENT + PDF
             * ----------------------------------------------------------
             */

            console.log(
                "Page06: Generating PDF Document..."
            );


            const documentResponse =
                await window.CTM_API.generateDocument(
                    reportModel
                );


            const documentMetadata =
                unwrapApiSuccess(
                    documentResponse,
                    "PDF Document"
                );


            if (
                !documentMetadata ||
                !documentMetadata.pdfId
            ) {

                throw new Error(
                    "CTM PATH™ PDF was not generated."
                );

            }


            console.log(
                "Page06: PDF Document generated.",
                documentMetadata
            );


            /*
             * ----------------------------------------------------------
             * 11. EMAIL PDF TO REGISTERED EMAIL ADDRESS
             * ----------------------------------------------------------
             */

            console.log(
                "Page06: Sending Report Email..."
            );


            const emailResponse =
                await window.CTM_API.sendEmail({

                    type:
                        "REPORT",

                    to:
                        identity.email,

                    name:
                        identity.fullName || "",

                    message:
                        "Your personalized CTM PATH™ Personal Diagnosis and 180-Day Transformation Prescription™ are attached.",

                    pdfId:
                        documentMetadata.pdfId

                });


            const emailResult =
                unwrapApiSuccess(
                    emailResponse,
                    "Report Email"
                );


            console.log(
                "Page06: Report Email sent.",
                emailResult
            );


            /*
             * ----------------------------------------------------------
             * 12. RECORD SUCCESS BEFORE NAVIGATION
             * ----------------------------------------------------------
             */

            const deliveryResult = {

                status:
                    "SENT",

                peopleId:
                    identity.peopleId,

                email:
                    identity.email,

                fullName:
                    identity.fullName || "",

                pdfId:
                    documentMetadata.pdfId,

                pdfUrl:
                    documentMetadata.pdfUrl || null,

                documentId:
                    documentMetadata.documentId || null,

                documentUrl:
                    documentMetadata.documentUrl || null,

                fileName:
                    documentMetadata.fileName || null,

                emailResult:
                    emailResult || null,

                deliveredAt:
                    new Date().toISOString()

            };


            saveDeliveryState(
                deliveryResult
            );


            window.CTM_PAGE06_REPORT_DELIVERY =
                deliveryResult;


            page06State.delivered =
                true;


            /*
             * ----------------------------------------------------------
             * 13. MARK PAGE 06 COMPLETE
             * ----------------------------------------------------------
             */

            markPageComplete();


            /*
             * ----------------------------------------------------------
             * 14. NAVIGATE TO PAGE 07
             * ----------------------------------------------------------
             */

            console.log(
                "Page06: Final delivery complete. Navigating to Page07."
            );


            window.location.href =
                PAGE06_CONFIG.nextPage;

        }
        catch (error) {

            console.error(
                "Page06: Final report delivery failed.",
                error
            );


            const failedDelivery =
                loadDeliveryState();


            if (
                failedDelivery &&
                failedDelivery.status === "PROCESSING" &&
                sameDeliveryIdentity(
                    failedDelivery,
                    identity
                )
            ) {

                clearDeliveryState();

            }


            page06State.delivering =
                false;


            setDeliveryButtonState(
                false
            );


            showDeliveryError(
                error
            );


            return;

        }

    }


    /* ======================================================================
       FINAL DELIVERY API VALIDATION
    ====================================================================== */

    function validateDeliveryApi() {

        if (
            !window.CTM_API ||
            typeof window.CTM_API !== "object"
        ) {

            throw new Error(
                "CTM PATH™ API service is unavailable."
            );

        }


        const requiredMethods = [

            "generateRoadmap",

            "generateReport",

            "generateDocument",

            "sendEmail"

        ];


        requiredMethods.forEach(
            function (methodName) {

                if (
                    typeof window.CTM_API[methodName] !== "function"
                ) {

                    throw new Error(
                        "CTM PATH™ API method unavailable: " +
                        methodName
                    );

                }

            }
        );

    }


    /* ======================================================================
       API RESPONSE NORMALIZER

       Supports contracts such as:

       { success:true, data:{...} }

       { success:true, data:{ data:{...} } }

       direct object

       QA / DIAGNOSTIC BEHAVIOUR:

       On backend failure this function deliberately preserves and exposes
       the most specific backend error available instead of replacing it
       with the generic WebApp message.
    ====================================================================== */

    function unwrapApiSuccess(
        response,
        label
    ) {

        /*
         * --------------------------------------------------------------
         * 1. NO RESPONSE
         * --------------------------------------------------------------
         */

        if (
            response === undefined ||
            response === null
        ) {

            throw new Error(
                (label || "Backend request") +
                " returned no response."
            );

        }


        /*
         * --------------------------------------------------------------
         * 2. DETECT BACKEND FAILURE
         * --------------------------------------------------------------
         */

        const isFailure =

            response === false ||

            (
                typeof response === "object" &&
                response.success === false
            ) ||

            (
                typeof response === "object" &&
                response.ok === false
            );


        if (isFailure) {

            /*
             * Preserve complete backend response in DevTools.
             */

            console.error(
                "CTM PATH™ BACKEND FAILURE:",
                label || "Backend request",
                response
            );


            /*
             * Specific backend error takes precedence over
             * generic WebApp message.
             */

            const backendError =

                response &&
                typeof response === "object"

                    ? firstNonEmptyString(

                        typeof response.error === "string"
                            ? response.error
                            : "",


                        response.data &&
                        typeof response.data === "object" &&
                        typeof response.data.error === "string"

                            ? response.data.error
                            : "",


                        response.data &&
                        typeof response.data === "object" &&
                        typeof response.data.message === "string"

                            ? response.data.message
                            : "",


                        typeof response.message === "string"
                            ? response.message
                            : ""

                    )

                    : "";


            /*
             * Optional backend stack.
             */

            const backendStack =

                response &&
                typeof response === "object" &&
                typeof response.stack === "string"

                    ? response.stack.trim()

                    : "";


            let diagnosticMessage =

                backendError ||

                (
                    (label || "Backend request") +
                    " failed."
                );


            if (backendStack) {

                diagnosticMessage +=

                    "\n\nBACKEND STACK:\n" +
                    backendStack;

            }


            throw new Error(
                diagnosticMessage
            );

        }


        /*
         * --------------------------------------------------------------
         * 3. SUCCESS RESPONSE NORMALIZATION
         * --------------------------------------------------------------
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
       RESOLVE JOURNEY IDENTITY
    ====================================================================== */

    function resolveJourneyIdentity() {

        const identity = {

            peopleId:
                "",

            fullName:
                "",

            email:
                ""

        };


        /*
         * --------------------------------------------------------------
         * Preferred:
         * Frozen Page 02 Session Contract
         * --------------------------------------------------------------
         */

        try {

            if (
                window.Page02Session &&
                typeof window.Page02Session.load === "function"
            ) {

                mergeIdentityFromObject(
                    identity,
                    window.Page02Session.load()
                );

            }

        }
        catch (error) {

            console.warn(
                "Page06: Unable to read Page02Session identity.",
                error
            );

        }


        /*
         * --------------------------------------------------------------
         * Known scalar journey keys
         * --------------------------------------------------------------
         */

        identity.peopleId =
            identity.peopleId ||
            readFirstStorageString([

                "ctm_people_id",

                "peopleId",

                "PeopleID",

                "ctm_client_id"

            ]);


        identity.fullName =
            identity.fullName ||
            readFirstStorageString([

                "ctm_full_name",

                "fullName",

                "FullName"

            ]);


        identity.email =
            identity.email ||
            readFirstStorageString([

                "ctm_email",

                "ctm_email_address",

                "email",

                "emailAddress",

                "EmailAddress"

            ]);


        /*
         * --------------------------------------------------------------
         * Recover from known journey objects
         * --------------------------------------------------------------
         */

        const objectKeys = [

            "CTM_PATH_PAGE02",

            "CTM_GUIDED_JOURNEY_STATE",

            "CTM_REGISTRATION_RESULT",

            "CTM_PAGE02_REGISTRATION",

            "ctm_registration"

        ];


        objectKeys.forEach(
            function (key) {

                if (
                    identity.peopleId &&
                    identity.fullName &&
                    identity.email
                ) {

                    return;

                }


                const fromSession =
                    readStorageObject(
                        sessionStorage,
                        key
                    );


                if (fromSession) {

                    mergeIdentityFromObject(
                        identity,
                        fromSession
                    );

                }


                const fromLocal =
                    readStorageObject(
                        localStorage,
                        key
                    );


                if (fromLocal) {

                    mergeIdentityFromObject(
                        identity,
                        fromLocal
                    );

                }

            }
        );


        /*
         * --------------------------------------------------------------
         * Frozen Page 05 diagnosis may also contain identity.
         * --------------------------------------------------------------
         */

        if (
            page06State.diagnosis &&
            typeof page06State.diagnosis === "object"
        ) {

            mergeIdentityFromObject(
                identity,
                page06State.diagnosis
            );

        }


        return identity;

    }


    /* ======================================================================
       MERGE IDENTITY FROM OBJECT

       Recursive but bounded.
    ====================================================================== */

    function mergeIdentityFromObject(
        identity,
        source
    ) {

        if (
            !identity ||
            !source ||
            typeof source !== "object"
        ) {

            return identity;

        }


        const visited =
            [];


        function walk(
            value,
            depth
        ) {

            if (
                !value ||
                typeof value !== "object" ||
                depth > 5 ||
                visited.indexOf(value) !== -1
            ) {

                return;

            }


            visited.push(
                value
            );


            if (!identity.peopleId) {

                identity.peopleId =
                    firstNonEmptyString(

                        value.peopleId,

                        value.PeopleID,

                        value.peopleID,

                        value.clientId,

                        value.ClientID

                    );

            }


            if (!identity.fullName) {

                identity.fullName =
                    firstNonEmptyString(

                        value.fullName,

                        value.FullName,

                        value.name,

                        value.Name

                    );

            }


            if (!identity.email) {

                identity.email =
                    firstNonEmptyString(

                        value.email,

                        value.Email,

                        value.emailAddress,

                        value.EmailAddress

                    );

            }


            if (
                identity.peopleId &&
                identity.fullName &&
                identity.email
            ) {

                return;

            }


            Object.keys(value).forEach(
                function (key) {

                    if (
                        value[key] &&
                        typeof value[key] === "object"
                    ) {

                        walk(
                            value[key],
                            depth + 1
                        );

                    }

                }
            );

        }


        walk(
            source,
            0
        );


        return identity;

    }


    /* ======================================================================
       READ FIRST STORAGE STRING
    ====================================================================== */

    function readFirstStorageString(
        keys
    ) {

        if (!Array.isArray(keys)) {
            return "";
        }


        const stores = [

            sessionStorage,

            localStorage

        ];


        for (
            let s = 0;
            s < stores.length;
            s++
        ) {

            const storage =
                stores[s];


            for (
                let i = 0;
                i < keys.length;
                i++
            ) {

                try {

                    const raw =
                        storage.getItem(
                            keys[i]
                        );


                    if (
                        typeof raw === "string" &&
                        raw.trim() !== ""
                    ) {

                        return raw.trim();

                    }

                }
                catch (error) {

                    /*
                     * Ignore unavailable storage.
                     */

                }

            }

        }


        return "";

    }


    /* ======================================================================
       VALIDATE DELIVERY IDENTITY
    ====================================================================== */

    function validateDeliveryIdentity(
        identity
    ) {

        if (
            !identity ||
            !identity.peopleId
        ) {

            throw new Error(
                "Your CTM PATH™ People ID could not be recovered. Please restart from your registered journey session."
            );

        }


        if (
            !identity.email ||
            !isValidEmail(
                identity.email
            )
        ) {

            throw new Error(
                "Your registered email address could not be recovered. Please return to registration and confirm your email address."
            );

        }

    }


    /* ======================================================================
       EMAIL VALIDATION
    ====================================================================== */

    function isValidEmail(
        value
    ) {

        return (

            typeof value === "string" &&

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                value.trim()
            )

        );

    }


    /* ======================================================================
       DELIVERY STATE
    ====================================================================== */

    function loadDeliveryState() {

        return readStorageObject(

            sessionStorage,

            PAGE06_CONFIG.deliveryStorageKey

        );

    }


    function saveDeliveryState(
        delivery
    ) {

        if (!delivery) {
            return;
        }


        try {

            sessionStorage.setItem(

                PAGE06_CONFIG.deliveryStorageKey,

                JSON.stringify(
                    delivery
                )

            );

        }
        catch (error) {

            console.warn(
                "Page06: Unable to persist report delivery state.",
                error
            );

        }

    }


    function clearDeliveryState() {

        try {

            sessionStorage.removeItem(
                PAGE06_CONFIG.deliveryStorageKey
            );

        }
        catch (error) {

            console.warn(
                "Page06: Unable to clear report delivery state.",
                error
            );

        }

    }


    /* ======================================================================
       DELIVERY IDENTITY MATCH
    ====================================================================== */

    function sameDeliveryIdentity(
        delivery,
        identity
    ) {

        if (
            !delivery ||
            !identity
        ) {

            return false;

        }


        if (
            delivery.peopleId &&
            identity.peopleId
        ) {

            return (

                String(delivery.peopleId) ===
                String(identity.peopleId)

            );

        }


        return (

            delivery.email &&
            identity.email &&

            String(delivery.email).toLowerCase() ===
            String(identity.email).toLowerCase()

        );

    }


    /* ======================================================================
       DELIVERY BUTTON STATE
    ====================================================================== */

    function setDeliveryButtonState(
        busy
    ) {

        const button =
            document.getElementById(
                "page06-next-button"
            );


        if (!button) {
            return;
        }


        /*
         * Preserve original bilingual navigator markup.
         */

        if (
            !button.dataset.page06OriginalHtml
        ) {

            button.dataset.page06OriginalHtml =
                button.innerHTML;

        }


        button.disabled =
            Boolean(busy);


        button.setAttribute(
            "aria-busy",
            busy
                ? "true"
                : "false"
        );


        if (busy) {

            button.innerHTML =

                '<span lang="ta">' +
                'உங்கள் அறிக்கை தயாராகிறது...' +
                '</span>' +

                '<span>' +
                'PREPARING YOUR REPORT...' +
                '</span>';

        }
        else {

            button.innerHTML =
                button.dataset.page06OriginalHtml;

        }

    }


    /* ======================================================================
       DELIVERY ERROR
    ====================================================================== */

    function showDeliveryError(
        error
    ) {

        const message =

            error &&
            error.message

                ? error.message

                : "Unable to prepare and email your CTM PATH™ report. Please try again.";


        console.error(
            "Page06 Delivery Error Detail:",
            error
        );


        window.alert(

            "உங்கள் அறிக்கையை இப்போது அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.\n\n" +

            "We could not prepare and email your report yet. Please try again.\n\n" +

            message

        );

    }


    /* ======================================================================
       GET FIRST MEANINGFUL ITEM
    ====================================================================== */

    function getFirstMeaningfulItem(
        value
    ) {

        if (
            value === undefined ||
            value === null
        ) {

            return null;

        }


        if (Array.isArray(value)) {

            for (
                let i = 0;
                i < value.length;
                i++
            ) {

                const item =
                    value[i];


                if (
                    item !== undefined &&
                    item !== null &&
                    (
                        typeof item !== "string" ||
                        item.trim() !== ""
                    )
                ) {

                    return item;

                }

            }


            return null;

        }


        /*
         * Object containing ranked items.
         */

        if (
            typeof value === "object"
        ) {

            const preferred =
                firstDefined(

                    value.primary,

                    value.first,

                    value.top,

                    value.highest,

                    value.priority

                );


            if (
                preferred !== undefined &&
                preferred !== null
            ) {

                return preferred;

            }


            const keys =
                Object.keys(value);


            if (keys.length > 0) {

                return value[
                    keys[0]
                ];

            }

        }


        return value;

    }


    /* ======================================================================
       FIRST DEFINED VALUE
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
                value !== null
            ) {

                return value;

            }

        }


        return null;

    }


    /* ======================================================================
       FIRST NON-EMPTY STRING
    ====================================================================== */

    function firstNonEmptyString() {

        for (
            let i = 0;
            i < arguments.length;
            i++
        ) {

            const value =
                arguments[i];


            if (
                typeof value === "string" &&
                value.trim() !== ""
            ) {

                return value.trim();

            }

        }


        return "";

    }


    /* ======================================================================
       CLONE SIMPLE OBJECT
    ====================================================================== */

    function cloneObject(
        object
    ) {

        return JSON.parse(

            JSON.stringify(
                object
            )

        );

    }


    /* ======================================================================
       PUBLIC PAGE MODULE
    ====================================================================== */

    window.CTM_PAGE06 = {

        init:
            initPage06,


        getState:
            function () {

                return page06State;

            },


        getDiagnosis:
            function () {

                return page06State.diagnosis;

            },


        getPrimaryFocus:
            function () {

                return page06State.primaryFocus;

            },


        getPrescription:
            function () {

                return page06State.prescription;

            },


        getDeliveryState:
            function () {

                return loadDeliveryState();

            }

    };


})();

