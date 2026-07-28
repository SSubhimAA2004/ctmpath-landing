
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : diagnosisLibrary.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend diagnosis presentation content repository.

   Responsibilities:

   • Store diagnosis display content.
   • Provide UI descriptions.
   • Support diagnosis card rendering.
   • Maintain presentation consistency.

   Does NOT:

   • Calculate diagnosis.
   • Interpret scores.
   • Select user category.
   • Generate prescriptions.

   Backend Ownership:

   • Diagnosis engine
   • Score interpretation
   • Personalised recommendations
   • Prescription generation

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   DIAGNOSIS LIBRARY
   ========================================================================== */


CTMPATH.DiagnosisLibrary = [


    {


        id:

            "awakening",



        title:

            "The Awakening Journey™",



        level:

            "Foundation",



        summary:

            "You have begun the journey of understanding yourself and creating conscious change.",



        message:

            "Awareness is the first step toward transformation. Your journey now begins with clarity, commitment and intentional action.",



        focus:

            [

                "Build awareness",

                "Create foundational habits",

                "Strengthen personal clarity"

            ]



    },



    {


        id:

            "alignment",



        title:

            "The Alignment Journey™",



        level:

            "Developing",



        summary:

            "You have established important foundations and are ready to deepen your alignment.",



        message:

            "Your growth comes from bringing your values, actions and vision into greater harmony.",



        focus:

            [

                "Improve consistency",

                "Strengthen self-leadership",

                "Develop deeper awareness"

            ]



    },



    {


        id:

            "mastery",



        title:

            "The Mastery Journey™",



        level:

            "Strong",



        summary:

            "You demonstrate strong foundations and the ability to create meaningful progress.",



        message:

            "Your next evolution comes from refinement, expansion and purposeful contribution.",



        focus:

            [

                "Expand impact",

                "Refine strengths",

                "Create lasting growth"

            ]



    }



];

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : diagnosisLibrary.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   CONTINUED DIAGNOSIS LIBRARY

   ========================================================================== */


CTMPATH.DiagnosisLibrary.push(


    {


        id:

            "exceptional",



        title:

            "The Exceptional Journey™",



        level:

            "Exceptional",



        summary:

            "You demonstrate a high level of life alignment, personal leadership and conscious growth.",



        message:

            "Your foundation is strong. The next chapter is about expanding your influence, contribution and legacy.",



        focus:

            [

                "Create greater impact",

                "Develop legacy thinking",

                "Lead through example"

            ]



    }



);




/* ==========================================================================
   DIAGNOSIS HELPERS

   Frontend presentation utilities only.

   ========================================================================== */


/**
 * Get all diagnosis entries.
 *
 * @returns {Array}
 */

CTMPATH.getDiagnosisLibrary = function() {


    return CTMPATH.DiagnosisLibrary;



};




/**
 * Get diagnosis content by identifier.
 *
 * @param {String} id
 *
 * @returns {Object|null}
 */

CTMPATH.getDiagnosisById = function(id) {


    return CTMPATH.DiagnosisLibrary.find(function(item) {


        return item.id === id;



    }) || null;



};




/**
 * Get diagnosis content by level.
 *
 * @param {String} level
 *
 * @returns {Object|null}
 */

CTMPATH.getDiagnosisByLevel = function(level) {


    return CTMPATH.DiagnosisLibrary.find(function(item) {


        return item.level === level;



    }) || null;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : diagnosisLibrary.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   DIAGNOSIS DISPLAY FORMATTERS

   Frontend presentation helpers.

   ========================================================================== */


/**
 * Format diagnosis card data.
 *
 * @param {Object} diagnosis
 *
 * @returns {Object|null}
 */


CTMPATH.formatDiagnosisCard = function(diagnosis) {


    if (!diagnosis) {


        return null;


    }



    return {


        title:

            diagnosis.title || "",



        level:

            diagnosis.level || "",



        summary:

            diagnosis.summary || "",



        message:

            diagnosis.message || "",



        focus:

            diagnosis.focus || []



    };


};




/**
 * Get diagnosis focus items.
 *
 * @param {Object} diagnosis
 *
 * @returns {Array}
 */


CTMPATH.getDiagnosisFocus = function(diagnosis) {


    if (

        !diagnosis ||

        !Array.isArray(

            diagnosis.focus

        )

    ) {


        return [];



    }



    return diagnosis.focus;



};




/**
 * Validate diagnosis library structure.
 *
 * Frontend consistency check only.
 *
 * @returns {Boolean}
 */


CTMPATH.validateDiagnosisLibrary = function() {


    return CTMPATH.DiagnosisLibrary.every(function(item) {


        return (

            item.id &&

            item.title &&

            item.level

        );



    });



};




/* ==========================================================================
   DIAGNOSIS LIBRARY READY EVENT

   ========================================================================== */


document.dispatchEvent(

    new CustomEvent(

        "CTMPATH_DIAGNOSIS_LIBRARY_READY",

        {


            detail:

                {


                    count:

                        CTMPATH.DiagnosisLibrary.length



                }



        }

    )

);




/* ==========================================================================
   END OF FILE

   File:

   data/diagnosisLibrary.js


   Status:

   FOUNDATION MODULE COMPLETE


   Next:

   data/actionLibrary.js

   ========================================================================== */
