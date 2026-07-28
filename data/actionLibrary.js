
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : actionLibrary.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend action-plan presentation content repository.

   Responsibilities:

   • Store action display content.
   • Provide action descriptions.
   • Support prescription UI rendering.
   • Maintain consistent action language.

   Does NOT:

   • Generate prescriptions.
   • Select user actions.
   • Prioritize recommendations.
   • Apply business rules.

   Backend Ownership:

   • Prescription engine
   • Personalisation logic
   • Action prioritization
   • Journey planning

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   ACTION LIBRARY
   ========================================================================== */


CTMPATH.ActionLibrary = [


    {


        id:

            "clarity_foundation",



        category:

            "Purpose™",



        title:

            "Create Personal Clarity",



        description:

            "Define your priorities, values and direction through intentional reflection.",



        steps:

            [

                "Reflect on your most important life priorities",

                "Identify actions aligned with your values",

                "Review your direction regularly"

            ]



    },



    {


        id:

            "health_routine",



        category:

            "Vitality™",



        title:

            "Build a Strong Vitality Routine",



        description:

            "Create daily practices that support your physical energy and wellbeing.",



        steps:

            [

                "Establish consistent movement habits",

                "Improve recovery and rest patterns",

                "Make conscious health choices"

            ]



    },



    {


        id:

            "relationship_growth",



        category:

            "Love & Relationships™",



        title:

            "Strengthen Meaningful Connections",



        description:

            "Develop deeper relationships through communication, presence and care.",



        steps:

            [

                "Invest quality time with important people",

                "Practice open communication",

                "Express appreciation regularly"

            ]



    }



];

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : actionLibrary.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   CONTINUED ACTION LIBRARY

   ========================================================================== */


CTMPATH.ActionLibrary.push(


    {


        id:

            "character_alignment",



        category:

            "Character & Integrity™",



        title:

            "Strengthen Personal Integrity",



        description:

            "Build stronger alignment between your values, decisions and daily actions.",



        steps:

            [

                "Clarify your core values",

                "Review decisions against your principles",

                "Practice consistent accountability"

            ]



    },



    {


        id:

            "financial_awareness",



        category:

            "Financial Freedom™",



        title:

            "Develop Financial Awareness",



        description:

            "Create stronger awareness and responsibility around financial choices.",



        steps:

            [

                "Review your current financial position",

                "Create intentional financial habits",

                "Build long-term stability"

            ]



    },



    {


        id:

            "emotional_balance",



        category:

            "Inner Peace™",



        title:

            "Develop Inner Balance",



        description:

            "Create practices that support emotional awareness and mental clarity.",



        steps:

            [

                "Practice self-awareness",

                "Create moments of reflection",

                "Respond instead of reacting"

            ]



    }



);




/* ==========================================================================
   ACTION RETRIEVAL HELPERS

   Frontend presentation utilities only.

   ========================================================================== */


/**
 * Get complete action library.
 *
 * @returns {Array}
 */


CTMPATH.getActionLibrary = function() {


    return CTMPATH.ActionLibrary;



};




/**
 * Get actions by category.
 *
 * @param {String} category
 *
 * @returns {Array}
 */


CTMPATH.getActionsByCategory = function(category) {


    return CTMPATH.ActionLibrary.filter(function(action) {


        return action.category === category;



    });



};




/**
 * Get action by identifier.
 *
 * @param {String} id
 *
 * @returns {Object|null}
 */


CTMPATH.getActionById = function(id) {


    return CTMPATH.ActionLibrary.find(function(action) {


        return action.id === id;



    }) || null;



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : actionLibrary.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   CONTINUED ACTION LIBRARY

   ========================================================================== */


CTMPATH.ActionLibrary.push(


    {


        id:

            "growth_mastery",



        category:

            "Growth & Mastery™",



        title:

            "Commit to Continuous Growth",



        description:

            "Develop a mindset of learning, improvement and personal evolution.",



        steps:

            [

                "Identify areas for improvement",

                "Learn consistently",

                "Apply new knowledge through action"

            ]



    },



    {


        id:

            "discipline_system",



        category:

            "Discipline & Habits™",



        title:

            "Create Consistent Daily Systems",



        description:

            "Build routines that transform intentions into measurable progress.",



        steps:

            [

                "Define your essential daily habits",

                "Track your commitments",

                "Improve consistency over time"

            ]



    },



    {


        id:

            "presence_gratitude",



        category:

            "Gratitude & Presence™",



        title:

            "Practice Conscious Presence",



        description:

            "Strengthen awareness, appreciation and connection with everyday experiences.",



        steps:

            [

                "Create moments of reflection",

                "Practice gratitude daily",

                "Notice meaningful experiences"

            ]



    }



);




/* ==========================================================================
   CONTINUED ACTION LIBRARY

   ========================================================================== */


CTMPATH.ActionLibrary.push(


    {


        id:

            "service_impact",



        category:

            "Contribution & Service™",



        title:

            "Expand Your Contribution",



        description:

            "Use your abilities, resources and experience to create positive impact.",



        steps:

            [

                "Identify ways to serve others",

                "Share your strengths",

                "Create meaningful contribution"

            ]



    },



    {


        id:

            "spirit_alignment",



        category:

            "Spirit & Alignment™",



        title:

            "Strengthen Inner Alignment",



        description:

            "Create harmony between your inner values and your external actions.",



        steps:

            [

                "Reflect on your values",

                "Align choices with purpose",

                "Create intentional practices"

            ]



    }



);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : actionLibrary.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   CONTINUED ACTION LIBRARY

   ========================================================================== */


CTMPATH.ActionLibrary.push(


    {


        id:

            "legacy_creation",



        category:

            "Legacy & Vision™",



        title:

            "Create Your Meaningful Legacy",



        description:

            "Transform your vision into actions that create lasting positive impact.",



        steps:

            [

                "Define your long-term vision",

                "Identify the contribution you want to create",

                "Take consistent action toward your legacy"

            ]



    }



);




/* ==========================================================================
   ACTION DISPLAY FORMATTERS

   Frontend presentation helpers only.

   ========================================================================== */


/**
 * Format action card for UI rendering.
 *
 * @param {Object} action
 *
 * @returns {Object|null}
 */


CTMPATH.formatActionCard = function(action) {


    if (!action) {


        return null;


    }



    return {


        id:

            action.id || "",



        category:

            action.category || "",



        title:

            action.title || "",



        description:

            action.description || "",



        steps:

            action.steps || []



    };


};




/**
 * Get action steps.
 *
 * @param {Object} action
 *
 * @returns {Array}
 */


CTMPATH.getActionSteps = function(action) {


    if (

        !action ||

        !Array.isArray(

            action.steps

        )

    ) {


        return [];



    }



    return action.steps;



};




/**
 * Validate action library structure.
 *
 * Frontend consistency check only.
 *
 * @returns {Boolean}
 */


CTMPATH.validateActionLibrary = function() {


    return CTMPATH.ActionLibrary.every(function(action) {


        return (

            action.id &&

            action.title &&

            action.category

        );



    });



};




/* ==========================================================================
   ACTION LIBRARY READY EVENT

   ========================================================================== */


document.dispatchEvent(

    new CustomEvent(

        "CTMPATH_ACTION_LIBRARY_READY",

        {


            detail:

                {


                    count:

                        CTMPATH.ActionLibrary.length



                }



        }

    )

);




/* ==========================================================================
   END OF FILE

   File:

   data/actionLibrary.js


   Status:

   FOUNDATION MODULE COMPLETE


   Next:

   data/reportTemplates.js

   ========================================================================== */
