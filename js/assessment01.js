
/* ==========================================================================
   CTM PATH™ Guided Journey

   File        : assessment01.js
   Version     : 3.0
   Status      : 🔒 SPOKE 01 CONTROLLER

   Assessment  : Spoke 01
   Pillar      : Purpose™

   Owns:

      • Page Initialization
      • Button Events
      • Save Action
      • Navigation Trigger


   Uses:

      • CTMAssessmentEngine
      • CTMValidator
      • CTMStorage
      • CTMNavigation


   Owns NO:

      • Question Data
      • Rendering
      • Styling
      • API Logic

   ========================================================================== */


"use strict";





/* ==========================================================================
   CONFIGURATION
   ========================================================================== */


const ASSESSMENT_01_CONFIG = {


    spoke:

        1,


    nextPage:

        "assessment-02.html"


};





/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


function initAssessment01(){


    CTMAssessmentEngine.init(

        ASSESSMENT_01_CONFIG.spoke

    );



    bindAssessment01Events();



    restoreAssessment01();


}





/* ==========================================================================
   RESTORE
   ========================================================================== */


function restoreAssessment01(){


    const saved =

        CTMStorage.get(

            CTM_CONSTANTS.STORAGE.ASSESSMENT_RESPONSES

        );



    if(

        saved

        &&

        saved[ASSESSMENT_01_CONFIG.spoke]

    ){


        CTMAssessmentEngine.restore(

            saved[ASSESSMENT_01_CONFIG.spoke]

        );


    }


}





/* ==========================================================================
   EVENT BINDING
   ========================================================================== */


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

            saveAndContinueAssessment01

        );


    }



    if(previousButton){


        previousButton.addEventListener(

            "click",

            function(){


                CTMNavigation.previous(

                    ASSESSMENT_01_CONFIG.spoke

                );


            }

        );


    }


}





/* ==========================================================================
   SAVE & CONTINUE
   ========================================================================== */


function saveAndContinueAssessment01(){


    const responses =

        CTMAssessmentEngine.responses();



    if(

        !CTMValidator.spoke(

            Object.values(

                responses

            )

        )

    ){


        alert(

            CTM_CONSTANTS.VALIDATION.SELECT_RATING

        );


        return;


    }



    saveAssessment01();



    CTMNavigation.next(

        ASSESSMENT_01_CONFIG.spoke

    );


}





/* Continue in Batch 1B */

/* ==========================================================================
   SAVE ASSESSMENT 01
   ========================================================================== */


/**
 * Save Spoke 01 responses locally
 *
 */


function saveAssessment01(){


    const responses =

        CTMAssessmentEngine.responses();



    let assessmentData =

        CTMStorage.get(

            CTM_CONSTANTS.STORAGE.ASSESSMENT_RESPONSES

        );



    if(!assessmentData){


        assessmentData = {};


    }



    assessmentData[

        ASSESSMENT_01_CONFIG.spoke

    ] = responses;



    CTMStorage.set(

        CTM_CONSTANTS.STORAGE.ASSESSMENT_RESPONSES,

        assessmentData

    );



    updateAssessmentProgress01();



}





/* ==========================================================================
   UPDATE PROGRESS
   ========================================================================== */


/**
 * Store journey progress
 *
 */


function updateAssessmentProgress01(){


    const progress = {


        currentSpoke:

            ASSESSMENT_01_CONFIG.spoke,


        completed:

            true,


        updatedAt:

            new Date()

                .toISOString()


    };



    CTMStorage.set(

        CTM_CONSTANTS.STORAGE.JOURNEY_PROGRESS,

        progress

    );


}





/* ==========================================================================
   BACKEND SYNC
   ========================================================================== */


/**
 * Send assessment response to backend
 *
 */


function syncAssessment01(){


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

            ASSESSMENT_01_CONFIG.spoke,


        responses:

            CTMAssessmentEngine.responses(),


        timestamp:

            new Date()

                .toISOString()


    };



    return CTMApi.post(

        CTM_CONSTANTS.API.SAVE_ASSESSMENT,

        payload

    );


}





/* ==========================================================================
   PAGE INITIALIZATION
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        initAssessment01();


    }

);





/* ==========================================================================
   PUBLIC CONTROLLER
   ========================================================================== */


const CTMAssessment01 = {


    init:

        initAssessment01,


    save:

        saveAssessment01,


    sync:

        syncAssessment01


};





Object.freeze(

    CTMAssessment01

);





/* ==========================================================================
   END OF FILE

   File        : assessment01.js

   Version     : 3.0

   Status      : 🔒 SPOKE 01 CONTROLLER

   ========================================================================== */
