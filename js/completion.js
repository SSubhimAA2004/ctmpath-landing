
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0

   File        : completion.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   PURPOSE
   --------------------------------------------------------------------------
   Completion™ Behaviour Engine

   Owns

   ✓ Final Summary Rendering
   ✓ Completion Status
   ✓ Report Action
   ✓ Consultation CTA
   ✓ Journey Closure

   Owns NO

   ✗ Assessment Logic
   ✗ Diagnosis Logic
   ✗ Prescription Logic
   ✗ Storage Implementation
   ✗ API Implementation

   ========================================================================== */


"use strict";



/* ==========================================================================
   COMPLETION CONTROLLER
   ========================================================================== */


const CompletionPage = (() => {



    /* ======================================================================
       STATE
       ====================================================================== */


    let visitor = null;

    let assessment = null;

    let diagnosis = null;

    let prescription = null;



    /* ======================================================================
       DOM REFERENCES
       ====================================================================== */


    let finalScore;

    let finalBalance;

    let assessmentStatus;

    let nextChapter;

    let gratitudeMessage;

    let downloadButton;

    let restartButton;

    let consultationButton;



    /* ======================================================================
       INITIALISE
       ====================================================================== */


    function init(){


        cacheDom();


        loadState();


        renderCompletion();


        bindEvents();



        console.info(

            "Completion Engine Ready."

        );


    }




    /* ======================================================================
       CACHE DOM
       ====================================================================== */


    function cacheDom(){


        finalScore =

            document.getElementById(

                "finalScore"

            );



        finalBalance =

            document.getElementById(

                "finalBalance"

            );



        assessmentStatus =

            document.getElementById(

                "assessmentStatus"

            );



        nextChapter =

            document.getElementById(

                "nextChapter"

            );



        gratitudeMessage =

            document.getElementById(

                "gratitudeMessage"

            );



        downloadButton =

            document.getElementById(

                "downloadButton"

            );



        restartButton =

            document.getElementById(

                "restartButton"

            );



        consultationButton =

            document.getElementById(

                "consultationButton"

            );


    }




    /* ======================================================================
       LOAD STATE
       ====================================================================== */


    function loadState(){


        visitor =

            App.getVisitor();



        assessment =

            App.getAssessment();



        diagnosis =

            assessment.diagnosis || {};



        prescription =

            assessment.prescription || {};



    }



    /* ======================================================================
       Continue in Batch 2/n
       ====================================================================== */

})();


/* ==========================================================================
   COMPLETION RENDER ENGINE
   ========================================================================== */


function renderCompletion(){

    renderSummary();

    renderMessages();

    updateJourneyStatus();

}


/* ==========================================================================
   SUMMARY RENDERER
   ========================================================================== */


function renderSummary(){


    finalScore.textContent =

        (

            assessment.overallPercentage ||

            0

        ) + "%";



    finalBalance.textContent =

        determineBalance();



    assessmentStatus.textContent =

        assessment.completed

            ? "Complete"

            : "In Progress";



    nextChapter.textContent =

        "Begin";



}



/* ==========================================================================
   BALANCE
   ========================================================================== */


function determineBalance(){


    const score =

        assessment.overallPercentage || 0;



    if(score >= 80){

        return "Highly Balanced";

    }



    if(score >= 60){

        return "Growing";

    }



    if(score >= 40){

        return "Developing";

    }



    return "Beginning";


}




/* ==========================================================================
   COMPLETION MESSAGES
   ========================================================================== */


function renderMessages(){


    if(

        visitor &&

        visitor.name

    ){

        gratitudeMessage.textContent =


            `Thank you ${visitor.name} for completing your CTM PATH™ Guided Journey. Your awareness is now your foundation for transformation.`;

    }

    else{


        gratitudeMessage.textContent =


            "Thank you for completing your CTM PATH™ Guided Journey. Your awareness is now your foundation for transformation.";


    }


}



/* ==========================================================================
   JOURNEY STATUS
   ========================================================================== */


function updateJourneyStatus(){


    assessment.journeyStatus =

        "COMPLETED";



    assessment.completedAt =

        assessment.completedAt ||

        new Date().toISOString();



    App.setAssessment(

        assessment

    );


}



/* ==========================================================================
   Continue in Batch 3/n
   ========================================================================== */


/* ==========================================================================
   EVENT HANDLERS
   ========================================================================== */


function bindEvents(){


    downloadButton.addEventListener(

        "click",

        downloadReport

    );



    restartButton.addEventListener(

        "click",

        restartJourney

    );



    consultationButton.addEventListener(

        "click",

        bookConsultation

    );


}



/* ==========================================================================
   DOWNLOAD REPORT
   ========================================================================== */


async function downloadReport(){


    try{


        await generateFinalReport();



    }

    catch(error){


        handleCompletionError(

            error,

            "Unable to generate your report."

        );


    }


}



/* ==========================================================================
   REPORT GENERATION
   ========================================================================== */


async function generateFinalReport(){


    assessment.reportRequested =

        true;



    assessment.reportRequestedAt =

        new Date().toISOString();



    App.setAssessment(

        assessment

    );



    Storage.saveAssessment(

        assessment

    );



    await ApiService.safeRequest(

        () =>


            ApiService.generateReport(

                visitor.visitorId,

                assessment

            )

    );



}




/* ==========================================================================
   CONSULTATION CTA
   ========================================================================== */


function bookConsultation(){


    const url =


        "https://calendly.com/healerking-umbaravai/30min";



    window.open(

        url,

        "_blank"

    );


}




/* ==========================================================================
   RESTART JOURNEY
   ========================================================================== */


function restartJourney(){


    const confirmed =

        confirm(

            "Are you sure you want to begin a new journey?"

        );



    if(

        !confirmed

    ){

        return;

    }



    Storage.clearAssessment();



    App.resetJourney();



    Router.navigate(

        "landing"

    );


}



/* ==========================================================================
   ERROR HANDLING
   ========================================================================== */


function handleCompletionError(

    error,

    message

){


    console.error(

        message,

        error

    );



    alert(

        message +

        "\n\nPlease try again."

    );


}



/* ==========================================================================
   Continue in Batch 4/n
   ========================================================================== */


/* ==========================================================================
   VALIDATION ENGINE
   ========================================================================== */


function validateState(){


    if(

        !visitor

    ){

        Router.navigate(

            "registration"

        );


        return false;

    }



    if(

        !assessment

    ){

        Router.navigate(

            "assessment"

        );


        return false;

    }



    if(

        !assessment.completed

    ){

        console.warn(

            "Journey not completed."

        );


    }



    return true;


}




/* ==========================================================================
   RECOVERY ENGINE
   ========================================================================== */


function recoverCompletion(){


    try{


        loadState();


        renderCompletion();



    }

    catch(error){


        handleCompletionError(

            error,

            "Unable to recover completion page."

        );


    }


}



/* ==========================================================================
   PERSIST COMPLETION
   ========================================================================== */


function saveCompletionState(){


    assessment.completionViewed =

        true;



    assessment.completionViewedAt =

        new Date().toISOString();



    App.setAssessment(

        assessment

    );



    Storage.saveAssessment(

        assessment

    );


}



/* ==========================================================================
   WINDOW EVENTS
   ========================================================================== */


window.addEventListener(

    "beforeunload",

    () => {


        saveCompletionState();


    }

);



document.addEventListener(

    "visibilitychange",

    () => {


        if(

            document.hidden

        ){


            saveCompletionState();


        }


    }

);




/* ==========================================================================
   PUBLIC CONTROLLER API
   ========================================================================== */


return {


    init,


    renderCompletion,


    recoverCompletion,


    generateFinalReport


};


})();




/* ==========================================================================
   APPLICATION BOOTSTRAP
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    bootstrapCompletion

);



function bootstrapCompletion(){


    try{


        if(

            !validateRepository()

        ){


            throw new Error(

                "Assessment Repository unavailable."

            );


        }



        CompletionPage.init();



    }

    catch(error){


        console.error(

            error

        );



        alert(

            "Unable to initialise Completion™."

        );


    }


}




/* ==========================================================================
   DEVELOPMENT EXPORTS
   ========================================================================== */


window.CompletionPage =

    CompletionPage;




const CompletionDebug = Object.freeze({


    visitor : () =>

        visitor,



    assessment : () =>

        assessment,



    diagnosis : () =>

        diagnosis,



    prescription : () =>

        prescription



});



window.CompletionDebug =

    CompletionDebug;




/* ==========================================================================
   ENGINE GUARANTEES

   ✓ Final journey closure

   ✓ Completion summary display

   ✓ Report generation trigger

   ✓ Consultation pathway

   ✓ Journey restart option

   ✓ State preservation

   ✓ Recovery support

   ✓ No assessment ownership

   ✓ No diagnosis ownership

   ✓ No prescription ownership

   ✓ No duplicate business logic


   ========================================================================== */


/* ==========================================================================
   FINAL LOCK


   File

       completion.js


   Version

       1.0


   Status

       🔒 LOCKED


   Module

       Completion™ Behaviour Engine


   Dependencies

       app.js

       storage.js

       api.js

       router.js


   ========================================================================== */


