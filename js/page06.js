
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   page06.js

   PAGE:
   PERSONAL TRANSFORMATION PRESCRIPTION™

   VERSION:
   1.0


   RESPONSIBILITIES:

   ✓ Read Frozen Page 05 Diagnosis Result
   ✓ Extract Primary Focus
   ✓ Personalise Page 06 Primary Focus Section
   ✓ Preserve 180-Day Prescription State
   ✓ Prepare Page 07 Transition
   ✓ Navigate to Page 07

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



        /*
         * Page 05 frozen diagnosis result.
         */

        diagnosisStorageKey:

            "CTM_PAGE05_DIAGNOSIS_RESULT",



        /*
         * Page 06 prescription state.
         */

        prescriptionStorageKey:

            "CTM_PAGE06_PRESCRIPTION",



        /*
         * Optional journey state.
         */

        journeyStorageKey:

            "CTM_GUIDED_JOURNEY_STATE"



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


        initialized:

            false


    };





    /* ======================================================================
       DEFAULT PRIMARY FOCUS

       Used only when Page 05 diagnosis data cannot be recovered.

       This is deliberately neutral.

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
         * 1. Recover frozen diagnosis
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
         * 7. Bind Page 07 navigation
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
         * Page 05 may expose the frozen result
         * directly on window.
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
         * --------------------------------------------------------------
         * Primary source:
         * sessionStorage
         * --------------------------------------------------------------
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
         * --------------------------------------------------------------
         * Secondary recovery:
         * localStorage
         *
         * This allows recovery after a browser refresh
         * if Page 05 saved the diagnosis persistently.
         * --------------------------------------------------------------
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
         * --------------------------------------------------------------
         * Compatibility recovery
         *
         * These are READ-ONLY fallbacks.
         *
         * They do not change the frozen Page 05 contract.
         * --------------------------------------------------------------
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
         * Page 05 Diagnosis Intelligence Model
         *
         * Priority Focus is the preferred source.
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
         * Secondary source:
         * Growth Opportunities
         *
         * If Page 05 has no explicit Priority Focus,
         * the first growth opportunity may represent
         * the highest-ranked intervention area.
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
         * Tertiary source:
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
         * --------------------------------------------------------------
         * No supported Page 05 focus found.
         *
         * Never invent a diagnosis.
         * --------------------------------------------------------------
         */

        return cloneObject(

            DEFAULT_PRIMARY_FOCUS

        );


    }





    /* ======================================================================
       NORMALIZE FOCUS OBJECT

       Accepts:

       1. String
       2. Object
       3. Bilingual object
       4. Page05 priority object
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
         * --------------------------------------------------------------
         * STRING
         * --------------------------------------------------------------
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
         * --------------------------------------------------------------
         * OBJECT
         * --------------------------------------------------------------
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
         * Some diagnosis objects may use:
         *
         * {
         *     pillar: "...",
         *     reason: "..."
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


            const tamilCopy =

                safeFocus.descriptionTa ||

                DEFAULT_PRIMARY_FOCUS.descriptionTa;



            copyTaElement.textContent =

                tamilCopy;


        }



        if (copyEnElement) {


            const englishCopy =

                safeFocus.descriptionEn ||

                DEFAULT_PRIMARY_FOCUS.descriptionEn;



            copyEnElement.textContent =

                englishCopy;


        }


    }





    /* ======================================================================
       BUILD PAGE 06 PRESCRIPTION STATE

       Page 06 does NOT generate a new diagnosis.

       It packages:

       ✓ Frozen Page 05 diagnosis
       ✓ Primary Focus
       ✓ Fixed 180-Day Roadmap
       ✓ Daily rhythm
       ✓ Weekly rhythm
       ✓ Monthly rhythm

       This can later be used by:

       → Page 07
       → Diagnosis / Prescription PDF
       → Backend persistence
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
         *
         * Useful later for Page 07 / PDF generation
         * without reading storage again.
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
       NAVIGATION
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
         * Avoid duplicate listeners if init
         * is accidentally called more than once.
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
       HANDLE PAGE 07 TRANSITION
    ====================================================================== */


    function handleNextPage() {


        /*
         * --------------------------------------------------------------
         * 1. Preserve latest prescription
         * --------------------------------------------------------------
         */

        savePrescription(

            page06State.prescription

        );



        /*
         * --------------------------------------------------------------
         * 2. Mark Page 06 completed
         * --------------------------------------------------------------
         */

        markPageComplete();



        /*
         * --------------------------------------------------------------
         * 3. Future backend persistence hook
         * --------------------------------------------------------------
         *
         * DO NOT activate until backend contract is frozen.
         *
         *
         * Example future implementation:
         *
         * if (
         *     window.CTM_API &&
         *     typeof window.CTM_API.savePrescription === "function"
         * ) {
         *
         *     await window.CTM_API.savePrescription(
         *         page06State.prescription
         *     );
         *
         * }
         *
         * --------------------------------------------------------------
         */



        /*
         * --------------------------------------------------------------
         * 4. Navigate to final Page 07
         * --------------------------------------------------------------
         */

        window.location.href =

            PAGE06_CONFIG.nextPage;


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


                return value[keys[0]];


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


            }


    };





})();

