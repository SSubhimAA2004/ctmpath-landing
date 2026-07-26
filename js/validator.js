
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0

   File        : validator.js
   Version     : 2.0
   Status      : 🔒 FOUNDATION

   Purpose     : Shared Validation Engine™

   Owns

      • Input Validation
      • Assessment Validation
      • Form Validation

   Owns NO

      • API Calls
      • Storage Operations
      • Navigation
      • DOM Rendering

   ========================================================================== */


"use strict";



/* ==========================================================================
   REQUIRED VALUE VALIDATION
   ========================================================================== */


/**
 * Check required value
 *
 */


function isRequired(value){


    return (

        value !== undefined

        &&

        value !== null

        &&

        String(value).trim() !== ""

    );


}





/**
 * Validate email format
 *
 */


function isValidEmail(email){


    if(!isRequired(email)){


        return false;


    }



    const pattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    return pattern.test(

        email

    );


}





/**
 * Validate mobile number
 *
 */


function isValidMobile(mobile){


    if(!isRequired(mobile)){


        return false;


    }



    const cleaned =

        String(mobile)

            .replace(

                /\D/g,

                ""

            );



    return (

        cleaned.length >= 10

    );


}





/* ==========================================================================
   ASSESSMENT VALIDATION
   ========================================================================== */


/**
 * Validate rating value
 *
 */


function isValidRating(rating){


    const value =

        Number(rating);



    return (

        value >= CTM_CONSTANTS.ASSESSMENT.MIN_RATING

        &&

        value <= CTM_CONSTANTS.ASSESSMENT.MAX_RATING

    );


}





/**
 * Check if question has answer
 *
 */


function isQuestionAnswered(answer){


    return isValidRating(

        answer

    );


}





/* ==========================================================
   Continue in Batch 1B
   ========================================================== */

/* ==========================================================================
   ASSESSMENT RESPONSE VALIDATION
   ========================================================================== */


/**
 * Validate complete spoke response
 *
 * Each spoke contains 3 questions.
 *
 */


function validateSpokeResponses(responses){


    if(

        !Array.isArray(responses)

    ){


        return false;


    }



    if(

        responses.length !==

        CTM_CONSTANTS.ASSESSMENT.QUESTIONS_PER_SPOKE

    ){


        return false;


    }



    return responses.every(

        function(answer){


            return isQuestionAnswered(

                answer

            );


        }

    );


}





/**
 * Validate assessment object
 *
 */


function validateAssessmentData(data){


    if(

        !data

        ||

        typeof data !== "object"

    ){


        return false;


    }



    if(

        !isRequired(

            data.visitorId

        )

    ){


        return false;


    }



    if(

        !isRequired(

            data.spoke

        )

    ){


        return false;


    }



    return true;


}





/* ==========================================================================
   REGISTRATION VALIDATION
   ========================================================================== */


/**
 * Validate visitor registration
 *
 */


function validateRegistration(visitor){


    if(

        !visitor

        ||

        typeof visitor !== "object"

    ){


        return false;


    }



    const requiredFields = [


        "fullName",


        "email",


        "mobile"


    ];



    const requiredValid =

        requiredFields.every(

            function(field){


                return isRequired(

                    visitor[field]

                );


            }

        );



    if(!requiredValid){


        return false;


    }



    return (

        isValidEmail(

            visitor.email

        )

        &&

        isValidMobile(

            visitor.mobile

        )

    );


}





/* ==========================================================================
   COMPLETION VALIDATION
   ========================================================================== */


/**
 * Check if all assessment spokes completed
 *
 */


function validateAssessmentCompletion(progress){


    if(

        !progress

        ||

        typeof progress !== "object"

    ){


        return false;


    }



    return (

        Number(progress.completedSpokes)

        ===

        CTM_CONSTANTS.ASSESSMENT.TOTAL_SPOKES

    );


}





/**
 * Check if journey completed
 *
 */


function validateJourneyCompletion(status){


    return (

        status ===

        CTM_CONSTANTS.STATUS.COMPLETED

    );


}





/* ==========================================================
   Continue in Batch 1C
   ========================================================== */

/* ==========================================================================
   VALIDATION HELPERS
   ========================================================================== */


/**
 * Validate multiple fields
 *
 */


function validateRequiredFields(

    object,

    fields

){


    if(

        !object

        ||

        !Array.isArray(fields)

    ){


        return false;


    }



    return fields.every(

        function(field){


            return isRequired(

                object[field]

            );


        }

    );


}





/**
 * Validate object structure
 *
 */


function validateObject(object){


    return (

        object !== null

        &&

        typeof object === "object"

        &&

        !Array.isArray(object)

    );


}





/**
 * Validate numeric range
 *
 */


function isWithinRange(

    value,

    min,

    max

){


    const number =

        Number(value);



    return (

        !Number.isNaN(number)

        &&

        number >= min

        &&

        number <= max

    );


}





/* ==========================================================================
   ASSESSMENT PAGE VALIDATION
   ========================================================================== */


/**
 * Validate current assessment page
 *
 */


function validateCurrentSpoke(

    spokeData

){


    if(

        !validateObject(

            spokeData

        )

    ){


        return false;


    }



    if(

        !Array.isArray(

            spokeData.questions

        )

    ){


        return false;


    }



    return (

        spokeData.questions.length ===

        CTM_CONSTANTS.ASSESSMENT.QUESTIONS_PER_SPOKE

    );


}





/**
 * Validate rating groups
 *
 */


function validateRatingGroups(

    ratingGroups

){


    if(

        !Array.isArray(

            ratingGroups

        )

    ){


        return false;


    }



    return ratingGroups.every(

        function(group){


            return isValidRating(

                group

            );


        }

    );


}





/* ==========================================================================
   ERROR HANDLING
   ========================================================================== */


/**
 * Return validation error message
 *
 */


function getValidationMessage(

    type

){


    return (

        CTM_CONSTANTS.VALIDATION[type]

        ||

        "Validation failed."

    );


}





/**
 * Create validation result object
 *
 */


function validationResult(

    success,

    message

){


    return {


        success:


            Boolean(success),



        message:


            message || ""


    };


}





/* ==========================================================================
   PUBLIC API
   ========================================================================== */


const CTMValidator = {


    required:

        isRequired,


    email:

        isValidEmail,


    mobile:

        isValidMobile,


    rating:

        isValidRating,


    spoke:

        validateSpokeResponses,


    assessment:

        validateAssessmentData,


    registration:

        validateRegistration,


    completion:

        validateAssessmentCompletion,


    journey:

        validateJourneyCompletion,


    result:

        validationResult


};





Object.freeze(

    CTMValidator

);





/* ==========================================================================
   END OF FILE

   File    : validator.js

   Status  : 🔒 FOUNDATION

   ========================================================================== */
