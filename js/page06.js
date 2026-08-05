
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
   ✓ Generate Backend 180-Day Transformation Prescription™
   ✓ Finalize Complete Guided Journey Through Backend Orchestrator
   ✓ Generate Complete Diagnosis + Prescription Report
   ✓ Generate PDF
   ✓ Email PDF to Registered Email Address
   ✓ Prevent Duplicate / Double-Click Delivery
   ✓ Navigate to Page 07 only after confirmed delivery

   FINAL DELIVERY CONTRACT:

   Page 06
      ↓
   generateRoadmap({ peopleId })
      ↓
   Backend retrieves persisted Page 05 diagnosis
      ↓
   Backend generates + persists 180-Day Prescription™
      ↓
   finalizeJourney({ peopleId })
      ↓
   ReportEngine
      ↓
   DocumentService
      ↓
   EmailService
      ↓
   Confirmed Email Delivery
      ↓
   Page 07

   IMPORTANT:

   ✗ Does NOT recalculate Page 02 assessment
   ✗ Does NOT recalculate Page 03 Kala Chakra™ scores
   ✗ Does NOT rebuild Page 04 Life Wheel
   ✗ Does NOT rebuild Page 05 diagnosis
   ✗ Does NOT generate report directly from frontend
   ✗ Does NOT generate document directly from frontend
   ✗ Does NOT send email directly from frontend
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
         * roadmap generation
         * +
         * report generation
         * +
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

       FROZEN APPLICATION CONTRACT

       CLICK
          ↓
       IN-MEMORY LOCK
          ↓
       VALIDATE PEOPLE ID
          ↓
       SESSION DELIVERY LOCK
          ↓
       GENERATE + PERSIST 180-DAY ROADMAP
          ↓
       FINALIZE JOURNEY
          ↓
       BACKEND:
           REPORT
           DOCUMENT
           PDF
           EMAIL
          ↓
       VERIFY EMAIL DELIVERY
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
         * 1. IN-MEMORY DOUBLE-CLICK PROTECTION
         * --------------------------------------------------------------
         */

        if (page06State.delivering) {

            console.warn(
                "Page06: Delivery already in progress."
            );


            return;

        }


        /*
         * --------------------------------------------------------------
         * 2. RESOLVE JOURNEY IDENTITY
         * --------------------------------------------------------------
         */

        const identity =
            resolveJourneyIdentity();


        console.log(
            "Page06 Delivery Identity:",
            identity
        );


        /*
         * --------------------------------------------------------------
         * 3. CHECK PREVIOUS CONFIRMED DELIVERY
         *
         * If this exact visitor already completed delivery:
         *
         * DO NOT regenerate roadmap.
         * DO NOT regenerate PDF.
         * DO NOT resend email.
         *
         * Simply continue to Page 07.
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

            console.log(
                "Page06: Existing confirmed delivery found. Skipping duplicate delivery."
            );


            page06State.delivered =
                true;


            markPageComplete();


            window.location.href =
                PAGE06_CONFIG.nextPage;


            return;

        }


        /*
         * --------------------------------------------------------------
         * 4. ACQUIRE IN-MEMORY LOCK
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
             * 5. PRESERVE LATEST PAGE 06 PRESCRIPTION
             * ----------------------------------------------------------
             */

            savePrescription(
                page06State.prescription
            );


            /*
             * ----------------------------------------------------------
             * 6. VALIDATE JOURNEY IDENTITY
             *
             * Backend is authoritative for registered email delivery.
             *
             * Frontend requires only PeopleID for final orchestration.
             * ----------------------------------------------------------
             */

            validateDeliveryIdentity(
                identity
            );


            /*
             * ----------------------------------------------------------
             * 7. VALIDATE FINAL DELIVERY API CONTRACT
             * ----------------------------------------------------------
             */

            validateDeliveryApi();


            /*
             * ----------------------------------------------------------
             * 8. ACQUIRE SESSION DELIVERY LOCK
             * ----------------------------------------------------------
             */

            saveDeliveryState({

                status:
                    "PROCESSING",

                peopleId:
                    identity.peopleId,

                email:
                    identity.email || "",

                fullName:
                    identity.fullName || "",

                startedAt:
                    new Date().toISOString()

            });


            /*
             * ----------------------------------------------------------
             * 9. GENERATE / PERSIST 180-DAY TRANSFORMATION PRESCRIPTION
             *
             * Frontend sends ONLY PeopleID.
             *
             * JourneyOrchestrator now:
             *
             *      peopleId
             *          ↓
             *      dbGetDiagnosis()
             *          ↓
             *      rehydrate diagnosis
             *          ↓
             *      RoadmapEngine.generate()
             *
             * RoadmapEngine remains the system of record.
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


            console.log(
                "Page06 Roadmap Response:",
                roadmapResponse
            );


            const roadmapResult =
                unwrapApiSuccess(
                    roadmapResponse,
                    "Transformation Prescription"
                );


            if (
                roadmapResult === undefined ||
                roadmapResult === null
            ) {

                throw new Error(
                    "CTM PATH™ Transformation Prescription was not returned by the backend."
                );

            }


            console.log(
                "Page06: Transformation Prescription generated successfully."
            );


            /*
             * ----------------------------------------------------------
             * 10. FINALIZE GUIDED JOURNEY
             *
             * SINGLE BACKEND FINALIZATION ENDPOINT.
             *
             * Backend now owns:
             *
             *      ReportEngine.generate()
             *      DocumentService.generate()
             *      dbGetPeople()
             *      EmailService
             *
             * Frontend MUST NOT duplicate these operations.
             * ----------------------------------------------------------
             */

            console.log(
                "Page06: Finalizing Guided Journey..."
            );


            const finalizationResponse =
                await window.CTM_API.finalizeJourney({

                    peopleId:
                        identity.peopleId

                });


            console.log(
                "Page06 Finalization Response:",
                finalizationResponse
            );


            const finalizationResult =
                unwrapApiSuccess(
                    finalizationResponse,
                    "Guided Journey Finalization"
                );


            if (
                !finalizationResult ||
                typeof finalizationResult !== "object"
            ) {

                throw new Error(
                    "CTM PATH™ final delivery confirmation was not returned."
                );

            }


            /*
             * ----------------------------------------------------------
             * 11. VERIFY FINALIZATION CONTRACT
             *
             * Navigation is permitted ONLY after backend confirms
             * successful email delivery.
             * ----------------------------------------------------------
             */

            const confirmation =
                resolveFinalizationConfirmation(
                    finalizationResult
                );


            if (!confirmation.journeyFinalized) {

                throw new Error(
                    "CTM PATH™ Guided Journey was not finalized."
                );

            }


            if (!confirmation.reportGenerated) {

                throw new Error(
                    "CTM PATH™ report generation was not confirmed."
                );

            }


            if (!confirmation.documentGenerated) {

                throw new Error(
                    "CTM PATH™ document generation was not confirmed."
                );

            }


            if (!confirmation.pdfGenerated) {

                throw new Error(
                    "CTM PATH™ PDF generation was not confirmed."
                );

            }


            if (!confirmation.emailSent) {

                throw new Error(
                    "CTM PATH™ report email delivery was not confirmed."
                );

            }


            /*
             * ----------------------------------------------------------
             * 12. BUILD LOCAL DELIVERY CONFIRMATION
             * ----------------------------------------------------------
             */

            const documentMetadata =
                resolveDocumentMetadata(
                    finalizationResult
                );


            const recipient =
                firstNonEmptyString(

                    confirmation.recipient,

                    identity.email

                );


            const fullName =
                firstNonEmptyString(

                    confirmation.fullName,

                    identity.fullName

                );


            const deliveryResult = {

                status:
                    "SENT",

                peopleId:
                    identity.peopleId,

                email:
                    recipient,

                fullName:
                    fullName,

                journeyFinalized:
                    true,

                reportGenerated:
                    true,

                documentGenerated:
                    true,

                pdfGenerated:
                    true,

                emailSent:
                    true,

                pdfId:
                    documentMetadata.pdfId || null,

                pdfUrl:
                    documentMetadata.pdfUrl || null,

                documentId:
                    documentMetadata.documentId || null,

                documentUrl:
                    documentMetadata.documentUrl || null,

                fileName:
                    documentMetadata.fileName || null,

                backend:
                    finalizationResult,

                deliveredAt:
                    new Date().toISOString()

            };


            /*
             * ----------------------------------------------------------
             * 13. RECORD SUCCESS BEFORE NAVIGATION
             * ----------------------------------------------------------
             */

            saveDeliveryState(
                deliveryResult
            );


            window.CTM_PAGE06_REPORT_DELIVERY =
                deliveryResult;


            page06State.delivered =
                true;


            /*
             * ----------------------------------------------------------
             * 14. MARK PAGE 06 COMPLETE
             *
             * ONLY AFTER EMAIL DELIVERY SUCCEEDS.
             * ----------------------------------------------------------
             */

            markPageComplete();


            console.log(
                "Page06: Report delivered successfully.",
                deliveryResult
            );


            /*
             * ----------------------------------------------------------
             * 15. NAVIGATE TO PAGE 07
             * ----------------------------------------------------------
             */

            window.location.href =
                PAGE06_CONFIG.nextPage;

        }
        catch (error) {

            console.error(
                "Page06: Final report delivery failed.",
                error
            );


            /*
             * ----------------------------------------------------------
             * RELEASE PROCESSING LOCK AFTER FAILURE
             *
             * This permits deliberate retry.
             *
             * A confirmed SENT lock is NEVER removed here.
             * ----------------------------------------------------------
             */

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

       Page 06 now requires ONLY:

       ✓ generateRoadmap
       ✓ finalizeJourney

       Report / Document / Email calls are backend-owned.
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

            "finalizeJourney"

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

       Supports:

       { success:true, data:{...} }

       { success:true, data:{ data:{...} } }

       direct object

       Also extracts nested backend failure messages.
    ====================================================================== */

    function unwrapApiSuccess(
        response,
        label
    ) {

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
         * EXPLICIT FAILURE
         * --------------------------------------------------------------
         */

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

            console.error(
                "CTM PATH™ BACKEND FAILURE:",
                label,
                response
            );


            const message =
                extractBackendErrorMessage(
                    response
                );


            throw new Error(

                message ||

                (
                    (label || "Backend request") +
                    " failed."
                )

            );

        }


        /*
         * --------------------------------------------------------------
         * UNWRAP DATA ENVELOPES
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
            depth < 5
        ) {

            value =
                value.data;

            depth++;

        }


        return value;

    }


    /* ======================================================================
       BACKEND ERROR MESSAGE EXTRACTION

       Handles:

       message: "..."
       message: { message:"..." }
       error: "..."
       data: { message:"..." }
       nested failure envelopes
    ====================================================================== */

    function extractBackendErrorMessage(
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
            value instanceof Error
        ) {

            return value.message || "";

        }


        if (
            typeof value !== "object"
        ) {

            return String(
                value
            );

        }


        const candidates = [

            value.error,

            value.message,

            value.reason,

            value.detail,

            value.description

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
                candidate.trim() !== ""
            ) {

                return candidate.trim();

            }


            if (
                candidate &&
                typeof candidate === "object"
            ) {

                const nested =
                    extractBackendErrorMessage(
                        candidate
                    );


                if (nested) {
                    return nested;
                }

            }

        }


        if (
            value.data &&
            typeof value.data === "object"
        ) {

            const nestedData =
                extractBackendErrorMessage(
                    value.data
                );


            if (nestedData) {
                return nestedData;
            }

        }


        return "";

    }


    /* ======================================================================
       FINALIZATION CONFIRMATION RESOLVER

       Backend finalization may be returned as:

       {
           journeyFinalized:true,
           ...
       }

       or wrapped under:

       {
           data:{
               journeyFinalized:true,
               ...
           }
       }

       unwrapApiSuccess() handles standard data envelopes, while this helper
       protects against an additional application-level wrapper.
    ====================================================================== */

    function resolveFinalizationConfirmation(
        result
    ) {

        if (
            !result ||
            typeof result !== "object"
        ) {

            return {

                journeyFinalized:
                    false,

                reportGenerated:
                    false,

                documentGenerated:
                    false,

                pdfGenerated:
                    false,

                emailSent:
                    false,

                recipient:
                    "",

                fullName:
                    ""

            };

        }


        let source =
            result;


        /*
         * Compatibility:
         *
         * {
         *   result:{...}
         * }
         */

        if (
            source.result &&
            typeof source.result === "object"
        ) {

            source =
                source.result;

        }


        /*
         * Compatibility:
         *
         * {
         *   finalization:{...}
         * }
         */

        if (
            source.finalization &&
            typeof source.finalization === "object"
        ) {

            source =
                source.finalization;

        }


        return {

            journeyFinalized:
                source.journeyFinalized === true,

            reportGenerated:
                source.reportGenerated === true,

            documentGenerated:
                source.documentGenerated === true,

            pdfGenerated:
                source.pdfGenerated === true,

            emailSent:
                source.emailSent === true,

            recipient:
                firstNonEmptyString(

                    source.recipient,

                    source.email,

                    source.emailAddress

                ),

            fullName:
                firstNonEmptyString(

                    source.fullName,

                    source.name

                )

        };

    }


    /* ======================================================================
       DOCUMENT METADATA RESOLVER
    ====================================================================== */

    function resolveDocumentMetadata(
        result
    ) {

        if (
            !result ||
            typeof result !== "object"
        ) {

            return {};

        }


        let document =
            null;


        if (
            result.document &&
            typeof result.document === "object"
        ) {

            document =
                result.document;

        }


        if (
            !document &&
            result.result &&
            typeof result.result === "object" &&
            result.result.document &&
            typeof result.result.document === "object"
        ) {

            document =
                result.result.document;

        }


        if (
            !document &&
            result.finalization &&
            typeof result.finalization === "object" &&
            result.finalization.document &&
            typeof result.finalization.document === "object"
        ) {

            document =
                result.finalization.document;

        }


        if (!document) {

            document =
                {};

        }


        return {

            pdfId:
                firstNonEmptyString(

                    document.pdfId,

                    document.PdfID,

                    result.pdfId

                ),

            pdfUrl:
                firstNonEmptyString(

                    document.pdfUrl,

                    document.PdfURL,

                    result.pdfUrl

                ),

            documentId:
                firstNonEmptyString(

                    document.documentId,

                    document.DocumentID,

                    result.documentId

                ),

            documentUrl:
                firstNonEmptyString(

                    document.documentUrl,

                    document.DocumentURL,

                    result.documentUrl

                ),

            fileName:
                firstNonEmptyString(

                    document.fileName,

                    document.FileName,

                    result.fileName

                )

        };

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


        /*
         * --------------------------------------------------------------
         * Normalize
         * --------------------------------------------------------------
         */

        identity.peopleId =
            typeof identity.peopleId === "string"
                ? identity.peopleId.trim()
                : String(identity.peopleId || "").trim();


        identity.fullName =
            typeof identity.fullName === "string"
                ? identity.fullName.trim()
                : String(identity.fullName || "").trim();


        identity.email =
            typeof identity.email === "string"
                ? identity.email.trim()
                : String(identity.email || "").trim();


        return identity;

    }


    /* ======================================================================
       MERGE IDENTITY FROM OBJECT

       Recursive but bounded.

       Allows identity to be recovered from:

       registration
       person
       client
       data
       journey
       diagnosis
       etc.
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

       IMPORTANT:

       Only PeopleID is mandatory at frontend level.

       Registered name + email are resolved authoritatively by the backend
       through dbGetPeople(peopleId) during finalizeJourney().
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


        /*
         * PeopleID is authoritative.
         */

        if (
            delivery.peopleId &&
            identity.peopleId
        ) {

            return (

                String(delivery.peopleId).trim() ===
                String(identity.peopleId).trim()

            );

        }


        /*
         * Compatibility fallback only.
         */

        if (
            delivery.email &&
            identity.email
        ) {

            return (

                String(delivery.email)
                    .trim()
                    .toLowerCase() ===

                String(identity.email)
                    .trim()
                    .toLowerCase()

            );

        }


        return false;

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


            /*
             * IDs can occasionally be numeric.
             */

            if (
                typeof value === "number" &&
                Number.isFinite(value)
            ) {

                return String(
                    value
                );

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

