
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0

   File        : assessment01.js
   Version     : 2.0
   Status      : 🔒 PAGE CONTROLLER

   Purpose     : Assessment Spoke 01 Controller™

                Purpose™

   Owns

      • Page Initialization
      • Spoke 01 Behaviour
      • Save & Continue
      • Page Events


   Uses

      • assessmentCommon.js
      • assessmentData.js
      • storage.js
      • api.js
      • validator.js
      • navigation.js


   Owns NO

      • Assessment Content
      • UI Rendering Engine
      • Storage Logic
      • API Logic


   ========================================================================== */


"use strict";





/* ==========================================================================
   PAGE CONFIGURATION
   ========================================================================== */


const Assessment01Config = {


    spoke:

        1,


    nextPage:

        CTM_CONSTANTS.PAGES.ASSESSMENT_02


};





/* ==========================================================================
   PAGE STATE
   ========================================================================== */


const Assessment01State = {


    initialized:

        false,


    saved:

        false


};





/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


/**
 * Initialize Assessment 01
 *
 */


function initializeAssessment01(){


    const loaded =

        CTMAssessmentCommon.init(

            Assessment01Config.spoke

        );



    if(!loaded){


        console.error(

            "Unable to initialize Assessment 01"

        );


        return false;


    }



    restoreAssessment01();



    bindAssessment01Events();



    Assessment01State.initialized =

        true;



    return true;


}





/* ==========================================================================
   RESTORE DATA
   ========================================================================== */


/**
 * Restore saved answers
 *
 */


function restoreAssessment01(){


    const saved =

        CTMStorage.get(

            CTM_CONSTANTS.STORAGE.ASSESSMENT_RESPONSES

        );



    if(

        saved

        &&

        saved[Assessment01Config.spoke]

    ){


        CTMAssessmentCommon.restore(

            saved[Assessment01Config.spoke]

        );


    }


}





/* ==========================================================
   Continue in Batch 1B
   ========================================================== */

/* ==========================================================================
   EVENT BINDING
   ========================================================================== */


/**
 * Bind Assessment 01 events
 *
 */


function bindAssessment01Events(){


    const nextButton =

        document.getElementById(

            "nextButton"

        );



    const previousButton =

        document.getElementById(

            "previousButton"

        );



    if(nextButton){


        nextButton.addEventListener(

            "click",

            handleAssessment01Next

        );


    }



    if(previousButton){


        previousButton.addEventListener(

            "click",

            handleAssessment01Previous

        );


    }


}





/* ==========================================================================
   NEXT ACTION
   ========================================================================== */


/**
 * Handle Save & Continue
 *
 */


function handleAssessment01Next(){


    if(

        !validateAssessment01()

    ){


        showAssessment01Error();


        return;


    }



    saveAssessment01();



    navigateNextSpoke(

        Assessment01Config.spoke

    );


}





/* ==========================================================================
   PREVIOUS ACTION
   ========================================================================== */


/**
 * Handle previous button
 *
 */


function handleAssessment01Previous(){


    navigatePreviousSpoke(

        Assessment01Config.spoke

    );


}





/* ==========================================================================
   VALIDATION
   ========================================================================== */


/**
 * Validate Spoke 01 completion
 *
 */


function validateAssessment01(){


    const responses =

        CTMAssessmentCommon.responses();



    return CTMValidator.spoke(

        Object.values(

            responses

        )

    );


}





/**
 * Display validation message
 *
 */


function showAssessment01Error(){


    alert(

        CTM_CONSTANTS.VALIDATION.SELECT_RATING

    );


}





/* ==========================================================================
   SAVE
   ========================================================================== */


/**
 * Save Assessment 01 response
 *
 */


function saveAssessment01(){


    const payload =

        CTMAssessmentCommon.savePayload();



    let existing =

        CTMStorage.get(

            CTM_CONSTANTS.STORAGE.ASSESSMENT_RESPONSES

        );



    if(!existing){


        existing = {};

    }



    existing[Assessment01Config.spoke] =

        payload.responses;



    CTMStorage.set(

        CTM_CONSTANTS.STORAGE.ASSESSMENT_RESPONSES,

        existing

    );



    Assessment01State.saved =

        true;


}





/* ==========================================================
   Continue in Batch 1C
   ========================================================== */

/* ==========================================================================
   API SAVE
   ========================================================================== */


/**
 * Send Assessment 01 data to backend
 *
 */


function syncAssessment01WithAPI(){


    const visitor =

        CTMStorage.get(

            CTM_CONSTANTS.STORAGE.VISITOR

        );



    if(!visitor){


        return false;


    }



    const payload = {


        visitorId:

            visitor.visitorId,


        spoke:

            Assessment01Config.spoke,


        responses:

            CTMAssessmentCommon.responses(),


        timestamp:

            new Date().toISOString()


    };



    return CTMApi.post(

        CTM_CONSTANTS.API.SAVE_ASSESSMENT,

        payload

    );


}





/* ==========================================================================
   PROGRESS UPDATE
   ========================================================================== */


/**
 * Save journey progress
 *
 */


function updateAssessment01Progress(){


    const progress = {


        currentSpoke:

            Assessment01Config.spoke,


        completed:

            true,


        updatedAt:

            new Date().toISOString()


    };



    CTMStorage.set(

        CTM_CONSTANTS.STORAGE.JOURNEY_PROGRESS,

        progress

    );


}





/* ==========================================================================
   COMPLETION HANDLER
   ========================================================================== */


/**
 * Complete current page actions
 *
 */


function completeAssessment01(){


    saveAssessment01();



    updateAssessment01Progress();



    syncAssessment01WithAPI();


}





/* ==========================================================================
   PAGE STARTUP
   ========================================================================== */


/**
 * DOM Ready
 *
 */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        initializeAssessment01();


    }

);





/* ==========================================================================
   PUBLIC API
   ========================================================================== */


const CTMAssessment01 = {


    init:

        initializeAssessment01,


    save:

        saveAssessment01,


    validate:

        validateAssessment01,


    complete:

        completeAssessment01


};





Object.freeze(

    CTMAssessment01

);





/* ==========================================================================
   END OF FILE

   File    : assessment01.js

   Status  : 🔒 PAGE CONTROLLER

   ========================================================================== */
