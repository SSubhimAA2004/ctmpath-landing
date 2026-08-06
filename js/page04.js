
/* ==========================================================================
   BACKEND LIFE ALIGNMENT PERSISTENCE
========================================================================== */


function resolvePeopleId(){

    try{

        if(
            window.CTM_PAGE03 &&
            typeof window.CTM_PAGE03.getPeopleId === "function"
        ){

            const fromPage03 =
                String(
                    window.CTM_PAGE03.getPeopleId() || ""
                ).trim();

            if(fromPage03){

                return fromPage03;

            }

        }

    }
    catch(error){

        console.warn(
            "Page04: Unable to resolve PeopleID from CTM_PAGE03.",
            error
        );

    }


    try{

        if(
            window.Page02Session &&
            typeof window.Page02Session.load === "function"
        ){

            const page02Session =
                window.Page02Session.load();

            if(page02Session){

                const fromPage02 =
                    String(
                        page02Session.peopleId ||
                        page02Session.PeopleID ||
                        page02Session.peopleID ||
                        page02Session.clientId ||
                        page02Session.ClientID ||
                        ""
                    ).trim();

                if(fromPage02){

                    return fromPage02;

                }

            }

        }

    }
    catch(error){

        console.warn(
            "Page04: Unable to resolve PeopleID from Page02Session.",
            error
        );

    }


    const keys = [

        PAGE04_CONFIG.peopleIdStorageKey,

        "peopleId",

        "PeopleID",

        "ctm_client_id"

    ];


    const stores = [

        sessionStorage,

        localStorage

    ];


    for(
        let storeIndex = 0;
        storeIndex < stores.length;
        storeIndex++
    ){

        for(
            let keyIndex = 0;
            keyIndex < keys.length;
            keyIndex++
        ){

            try{

                const value =
                    String(
                        stores[storeIndex].getItem(
                            keys[keyIndex]
                        ) || ""
                    ).trim();

                if(value){

                    return value;

                }

            }
            catch(error){

                console.warn(
                    "Page04: Unable to read PeopleID storage key:",
                    keys[keyIndex],
                    error
                );

            }

        }

    }


    return "";

}



function buildAlignmentPayload(){

    const peopleId =
        resolvePeopleId();


    if(!peopleId){

        throw new Error(
            "People ID is missing. Please return to Page 02 and complete registration."
        );

    }


    const pillarScores = {};


    PILLARS.forEach(
        function(pillar){

            const score =
                Number(
                    assessmentData[
                        pillar.key
                    ]
                );


            if(
                !Number.isFinite(score) ||
                score < 0 ||
                score > PAGE04_CONFIG.maximumPillarScore
            ){

                throw new Error(
                    "Page04: Invalid score for " +
                    pillar.key +
                    "."
                );

            }


            pillarScores[
                pillar.key
            ] =
                score;

        }
    );


    return {

        peopleId:
            peopleId,

        pillarScores:
            pillarScores

    };

}



/* ==========================================================================
   RESOLVE CANONICAL PAGE04 API

   FROZEN FRONTEND CONTRACT:

   CTM.API.getAlignment(payload)

   api.js maps this to backend action:

   "getAlignment"

   Do NOT introduce saveAlignment().
========================================================================== */


function getAlignmentApi(){

    if(
        window.CTM &&
        window.CTM.API &&
        typeof window.CTM.API.getAlignment === "function"
    ){

        return window.CTM.API;

    }


    if(
        window.ApiService &&
        typeof window.ApiService.getAlignment === "function"
    ){

        return window.ApiService;

    }


    if(
        window.CTM_API &&
        typeof window.CTM_API.getAlignment === "function"
    ){

        return window.CTM_API;

    }


    throw new Error(
        "CTM PATH™ API service is unavailable."
    );

}



/* ==========================================================================
   EXTRACT BACKEND ERROR
========================================================================== */


function extractAlignmentError(response){

    if(!response){

        return "Life Alignment save returned no response.";

    }


    const candidates = [

        response.message,

        response.error,

        response.details,

        response.data &&
            response.data.message,

        response.data &&
            response.data.error,

        response.data &&
            response.data.details

    ];


    for(
        let i = 0;
        i < candidates.length;
        i++
    ){

        const candidate =
            candidates[i];


        if(
            typeof candidate === "string" &&
            candidate.trim()
        ){

            return candidate.trim();

        }


        if(
            candidate &&
            typeof candidate === "object"
        ){

            if(
                typeof candidate.message === "string" &&
                candidate.message.trim()
            ){

                return candidate.message.trim();

            }


            if(
                typeof candidate.error === "string" &&
                candidate.error.trim()
            ){

                return candidate.error.trim();

            }

        }

    }


    try{

        return JSON.stringify(response);

    }
    catch(error){

        return String(response);

    }

}



/* ==========================================================================
   VALIDATE BACKEND ALIGNMENT RESPONSE
========================================================================== */


function validateAlignmentResponse(response){

    if(
        response === undefined ||
        response === null
    ){

        throw new Error(
            "Life Alignment save returned no response."
        );

    }


    if(
        response === false ||
        (
            typeof response === "object" &&
            response.success === false
        ) ||
        (
            typeof response === "object" &&
            response.ok === false
        )
    ){

        console.error(
            "CTM PATH™ Page04 backend rejection — RAW RESPONSE:",
            response
        );


        throw new Error(
            extractAlignmentError(
                response
            )
        );

    }


    let value =
        response;


    let depth =
        0;


    while(
        value &&
        typeof value === "object" &&
        Object.prototype.hasOwnProperty.call(
            value,
            "data"
        ) &&
        value.data !== undefined &&
        value.data !== null &&
        depth < 4
    ){

        value =
            value.data;

        depth++;

    }


    return value;

}



/* ==========================================================================
   PAGE04 SUBMIT STATE
========================================================================== */


function setAlignmentSubmitState(
    button,
    saving
){

    if(!button){

        return;

    }


    button.disabled =
        Boolean(saving);


    button.setAttribute(
        "aria-busy",
        saving
            ? "true"
            : "false"
    );

}



/* ==========================================================================
   PERSIST LIFE ALIGNMENT + GUARDED PAGE05 NAVIGATION

   CRITICAL:

   Page05 MUST NOT load until the backend has successfully
   completed the canonical Page04 getAlignment transaction.

   That transaction is responsible for producing/persisting the
   canonical 05_LifeAlignment record required by later pages.
========================================================================== */


async function persistAlignmentAndContinue(
    button
){

    if(isSubmittingAlignment){

        return;

    }


    try{

        isSubmittingAlignment =
            true;


        setAlignmentSubmitState(
            button,
            true
        );


        /*
         * Keep the existing browser-side Page04 result.
         * This is NOT backend persistence.
         */

        saveAlignmentResult();


        /*
         * Build canonical Page04 backend payload.
         */

        const payload =
            buildAlignmentPayload();


        /*
         * Resolve the already-existing API namespace.
         */

        const api =
            getAlignmentApi();


        console.log(
            "Page04: Persisting canonical Life Alignment.",
            {
                peopleId:
                    payload.peopleId,

                pillarCount:
                    Object.keys(
                        payload.pillarScores
                    ).length
            }
        );


        /*
         * CANONICAL PAGE04 API CALL
         *
         * api.js:
         *
         * getAlignment(data)
         *      ↓
         * request("getAlignment", data)
         *      ↓
         * backend Router
         *      ↓
         * JourneyOrchestrator
         *      ↓
         * Life Alignment persistence
         */

        const rawResponse =
            await api.getAlignment(
                payload
            );


        console.log(
            "CTM PATH™ Page04 RAW getAlignment response:",
            rawResponse
        );


        /*
         * Navigation remains locked until backend SUCCESS.
         */

        const backendAlignment =
            validateAlignmentResponse(
                rawResponse
            );


        console.log(
            "Page04: Life Alignment persisted successfully.",
            backendAlignment
        );


        /*
         * ONLY NOW may Page05 open.
         */

        window.location.href =
            PAGE04_CONFIG.nextPage;

    }
    catch(error){

        console.error(
            "CTM PATH™ Page04 Life Alignment persistence failed:",
            error
        );


        window.alert(
            error && error.message
                ? error.message
                : "Unable to save your Life Alignment. Please try again."
        );


        /*
         * Failure means:
         *
         * 1. Remain on Page04
         * 2. Unlock button
         * 3. Allow retry
         */

        isSubmittingAlignment =
            false;


        setAlignmentSubmitState(
            button,
            false
        );

    }

}



/* ==========================================================================
   NAVIGATION
========================================================================== */


function bindNavigation(){

    const diagnosisButton =
        document.getElementById(
            "personal-diagnosis-button"
        );


    if(diagnosisButton){

        diagnosisButton.addEventListener(
            "click",
            function(){

                persistAlignmentAndContinue(
                    diagnosisButton
                );

            }
        );

    }

}



/* ==========================================================================
   SET TEXT
========================================================================== */


function setText(
    elementId,
    value
){

    const element =
        document.getElementById(
            elementId
        );


    if(!element){

        return;

    }


    element.textContent =
        value;

}



/* ==========================================================================
   ESCAPE HTML
========================================================================== */


function escapeHTML(value){

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}



/* ==========================================================================
   PUBLIC PAGE MODULE
========================================================================== */


window.CTM_PAGE04 = {

    init:
        initPage04,


    getAssessmentData:
        function(){

            return assessmentData;

        },


    getAlignmentResult:
        function(){

            return alignmentResult;

        },


    redrawWheel:
        function(){

            renderLifeWheel();

        }

};


})();

