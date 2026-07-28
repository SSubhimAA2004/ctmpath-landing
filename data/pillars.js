
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : pillars.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend pillar definition data.

   Responsibilities:

   • Store pillar display information.
   • Maintain pillar ordering.
   • Provide UI metadata.
   • Support assessment page rendering.

   Does NOT:

   • Calculate pillar scores.
   • Evaluate user responses.
   • Generate diagnosis.
   • Generate recommendations.

   Backend Ownership:

   • Pillar calculations
   • KALA CHAKRA™ engine
   • Diagnosis engine
   • Prescription engine

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   PILLAR DATA

   Locked 12 Life Pillars

   ========================================================================== */


CTMPATH.Pillars = [


    {


        id:

            "purpose",



        number:

            1,



        title:

            "Purpose™",



        subtitle:

            "Direction & Meaning",



        description:

            "Understanding your deeper direction, values and life purpose.",



        assessmentPage:

            3



    },



    {


        id:

            "vitality",



        number:

            2,



        title:

            "Vitality™",



        subtitle:

            "Health & Energy",



        description:

            "Exploring physical wellbeing, energy and personal vitality.",



        assessmentPage:

            4



    },



    {


        id:

            "relationships",



        number:

            3,



        title:

            "Love & Relationships™",



        subtitle:

            "Connection & Belonging",



        description:

            "Understanding the quality of meaningful relationships.",



        assessmentPage:

            5



    },



    {


        id:

            "character",



        number:

            4,



        title:

            "Character & Integrity™",



        subtitle:

            "Values & Trust",



        description:

            "Exploring personal values, honesty and inner alignment.",



        assessmentPage:

            6



    }



];

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : pillars.js
   Continuation: Batch 1B

   ========================================================================== */



/* ==========================================================================
   CONTINUED PILLAR DATA

   ========================================================================== */


CTMPATH.Pillars.push(


    {


        id:

            "financialFreedom",



        number:

            5,



        title:

            "Financial Freedom™",



        subtitle:

            "Security & Abundance",



        description:

            "Exploring financial stability, responsibility and wealth mindset.",



        assessmentPage:

            7



    },



    {


        id:

            "innerPeace",



        number:

            6,



        title:

            "Inner Peace™",



        subtitle:

            "Mind & Emotional Well-Being",



        description:

            "Understanding emotional balance, awareness and inner calm.",



        assessmentPage:

            8



    },



    {


        id:

            "growthMastery",



        number:

            7,



        title:

            "Growth & Mastery™",



        subtitle:

            "Learning & Evolution",



        description:

            "Exploring continuous growth, learning and personal development.",



        assessmentPage:

            9



    },



    {


        id:

            "disciplineHabits",



        number:

            8,



        title:

            "Discipline & Habits™",



        subtitle:

            "Consistency & Execution",



        description:

            "Understanding routines, discipline and daily practices.",



        assessmentPage:

            10



    }



);




/* ==========================================================================
   END OF BATCH 1B

   Next:

   Batch 1C

   ========================================================================== */

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : pillars.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   CONTINUED PILLAR DATA

   ========================================================================== */


CTMPATH.Pillars.push(


    {


        id:

            "gratitudePresence",



        number:

            9,



        title:

            "Gratitude & Presence™",



        subtitle:

            "Awareness & Appreciation",



        description:

            "Exploring mindfulness, gratitude and the ability to live fully in the present moment.",



        assessmentPage:

            11



    },



    {


        id:

            "contributionService",



        number:

            10,



        title:

            "Contribution & Service™",



        subtitle:

            "Impact & Giving",



        description:

            "Understanding personal contribution, service and positive impact.",



        assessmentPage:

            12



    },



    {


        id:

            "spiritAlignment",



        number:

            11,



        title:

            "Spirit & Alignment™",



        subtitle:

            "Inner Connection",



        description:

            "Exploring alignment between inner values, beliefs and life actions.",



        assessmentPage:

            13



    },



    {


        id:

            "legacyVision",



        number:

            12,



        title:

            "Legacy & Vision™",



        subtitle:

            "Future & Purposeful Impact",



        description:

            "Understanding long-term vision, legacy and the life impact you desire to create.",



        assessmentPage:

            14



    }



);




/* ==========================================================================
   PILLAR HELPERS

   Frontend display utilities only.

   ========================================================================== */


/**
 * Get all pillars.
 *
 * @returns {Array}
 */

CTMPATH.getPillars = function() {


    return CTMPATH.Pillars;



};




/**
 * Get pillar by identifier.
 *
 * @param {String} id
 *
 * @returns {Object|null}
 */


CTMPATH.getPillarById = function(id) {


    return CTMPATH.Pillars.find(function(pillar) {


        return pillar.id === id;



    }) || null;



};




/**
 * Get pillar by assessment page.
 *
 * @param {Number} page
 *
 * @returns {Object|null}
 */


CTMPATH.getPillarByPage = function(page) {


    return CTMPATH.Pillars.find(function(pillar) {


        return pillar.assessmentPage === page;



    }) || null;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : pillars.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   PILLAR COLLECTION STATUS

   Internal frontend data diagnostic.

   ========================================================================== */


/**
 * Returns pillar collection information.
 *
 * Presentation data only.
 *
 * @returns {Object}
 */


CTMPATH.getPillarStatus = function() {


    return {


        total:

            CTMPATH.Pillars.length,



        pillars:

            CTMPATH.Pillars.map(function(pillar) {


                return {


                    id:

                        pillar.id,



                    title:

                        pillar.title



                };


            })



    };


};




/* ==========================================================================
   ASSESSMENT ORDER VALIDATION

   Frontend consistency check.

   Does NOT validate backend scoring.

   ========================================================================== */


/**
 * Checks that all assessment pages exist.
 *
 * @returns {Boolean}
 */


CTMPATH.validatePillarSequence = function() {


    return CTMPATH.Pillars.every(function(pillar) {


        return Boolean(

            pillar.assessmentPage

        );



    });



};




/* ==========================================================================
   EXPORT READY EVENT

   Allows dependent frontend modules to access pillar data.

   ========================================================================== */


document.dispatchEvent(

    new CustomEvent(

        "CTMPATH_PILLARS_READY",

        {


            detail:

                {


                    count:

                        CTMPATH.Pillars.length



                }



        }

    )

);




/* ==========================================================================
   END OF FILE

   File:

   data/pillars.js


   Status:

   FOUNDATION MODULE COMPLETE


   Next:

   data/questions.js

   ========================================================================== */

