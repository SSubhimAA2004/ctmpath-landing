
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0

   File        : assessmentCommon.js
   Version     : 2.0
   Status      : 🔒 FOUNDATION

   Purpose     : Shared Assessment Engine™

   Used By

      • assessment01.js
      • assessment02.js
      • assessment03.js
      • assessment04.js
      • assessment05.js
      • assessment06.js
      • assessment07.js
      • assessment08.js
      • assessment09.js
      • assessment10.js
      • assessment11.js
      • assessment12.js


   Owns

      • Assessment Rendering
      • Question Rendering
      • Rating UI
      • Progress Display
      • Reflection Display
      • Wisdom Display


   Owns NO

      • Navigation
      • API
      • Storage Implementation
      • Assessment Content


   ========================================================================== */


"use strict";



/* ==========================================================================
   ASSESSMENT STATE
   ========================================================================== */


const AssessmentCommonState = {


    currentSpoke:

        null,


    currentPillar:

        null,


    responses:

        {},


    initialized:

        false


};





/* ==========================================================================
   DATA ACCESS
   ========================================================================== */


/**
 * Load pillar from repository
 *
 */


function loadAssessmentPillar(

    spokeNumber

){


    if(

        !AssessmentRepository

        ||

        !AssessmentRepository.pillars

    ){


        return null;


    }



    return AssessmentRepository.pillars.find(

        function(pillar){


            return (

                pillar.spoke ===

                Number(spokeNumber)

            );


        }

    );


}





/**
 * Initialize assessment page data
 *
 */


function initializeAssessmentCommon(

    spokeNumber

){


    const pillar =

        loadAssessmentPillar(

            spokeNumber

        );



    if(!pillar){


        return false;


    }



    AssessmentCommonState.currentSpoke =

        Number(spokeNumber);



    AssessmentCommonState.currentPillar =

        pillar;



    AssessmentCommonState.initialized =

        true;



    return pillar;


}





/* ==========================================================================
   DOM HELPERS
   ========================================================================== */


/**
 * Safe element lookup
 *
 */


function getElement(id){


    return document.getElementById(

        id

    );


}





/**
 * Set text content safely
 *
 */


function setText(

    id,

    value

){


    const element =

        getElement(id);



    if(element){


        element.textContent =

            value || "";


    }


}





/* ==========================================================
   Continue in Batch 1B
   ========================================================== */

/* ==========================================================================
   PILLAR RENDERING
   ========================================================================== */


/**
 * Render pillar header
 *
 */


function renderPillarHeader(

    pillar

){


    if(!pillar){

        return;

    }



    setText(

        "pillarNumber",

        "SPOKE " +

        String(

            pillar.spoke

        ).padStart(

            2,

            "0"

        )

    );



    setText(

        "pillarTitleTa",

        pillar.titleTa

    );



    setText(

        "pillarTitleEn",

        pillar.titleEn

    );


}





/**
 * Render introduction
 *
 */


function renderIntroduction(

    pillar

){


    if(!pillar){

        return;

    }



    setText(

        "introductionTa",

        pillar.introductionTa

    );



    setText(

        "introductionEn",

        pillar.introductionEn

    );


}





/* ==========================================================================
   QUESTION RENDERING
   ========================================================================== */


/**
 * Render questions
 *
 */


function renderQuestions(

    pillar

){


    if(

        !pillar

        ||

        !Array.isArray(

            pillar.questions

        )

    ){


        return;


    }



    pillar.questions.forEach(

        function(

            question,

            index

        ){



            const number =

                index + 1;



            setText(

                "questionText" + number,

                question.text

            );



            setText(

                "questionNumber" + number,

                "Question " +

                String(

                    number

                )

            );



            renderRatingButtons(

                "ratingGroup" + String(number).padStart(2,"0"),

                number

            );



        }

    );


}





/* ==========================================================================
   RATING BUTTON RENDERING
   ========================================================================== */


/**
 * Create rating buttons
 *
 */


function renderRatingButtons(

    containerId,

    questionNumber

){


    const container =

        getElement(

            containerId

        );



    if(!container){

        return;

    }



    container.innerHTML = "";



    for(

        let rating =

            CTM_CONSTANTS.ASSESSMENT.MIN_RATING;


        rating <=

            CTM_CONSTANTS.ASSESSMENT.MAX_RATING;


        rating++

    ){


        const button =

            document.createElement(

                "button"

            );



        button.type =

            "button";



        button.className =

            "rating-button";



        button.dataset.rating =

            rating;



        button.dataset.question =

            questionNumber;



        button.textContent =

            rating;



        button.addEventListener(

            "click",

            function(){


                selectRating(

                    questionNumber,

                    rating,

                    button

                );


            }

        );



        container.appendChild(

            button

        );


    }


}





/* ==========================================================
   Continue in Batch 1C
   ========================================================== */

/* ==========================================================================
   RATING SELECTION
   ========================================================================== */


/**
 * Select rating
 *
 */


function selectRating(

    questionNumber,

    rating,

    button

){


    const groupSelector =

        "#ratingGroup" +

        String(

            questionNumber

        ).padStart(

            2,

            "0"

        );



    const buttons =

        document.querySelectorAll(

            groupSelector +

            " .rating-button"

        );



    buttons.forEach(

        function(item){


            item.classList.remove(

                "active"

            );


        }

    );



    button.classList.add(

        "active"

    );



    AssessmentCommonState.responses[

        questionNumber

    ] = rating;



}





/**
 * Get current responses
 *
 */


function getAssessmentResponses(){


    return AssessmentCommonState.responses;


}





/**
 * Restore previous responses
 *
 */


function restoreAssessmentResponses(

    savedResponses

){


    if(

        !savedResponses

    ){

        return;

    }



    AssessmentCommonState.responses =

        savedResponses;



    Object.keys(

        savedResponses

    ).forEach(

        function(questionNumber){


            const rating =

                savedResponses[questionNumber];



            const selector =

                "#ratingGroup" +

                String(

                    questionNumber

                ).padStart(

                    2,

                    "0"

                )

                +

                " .rating-button[data-rating='" +

                rating +

                "']";



            const button =

                document.querySelector(

                    selector

                );



            if(button){


                button.classList.add(

                    "active"

                );


            }


        }

    );


}





/* ==========================================================================
   REFLECTION AND WISDOM
   ========================================================================== */


/**
 * Render reflection
 *
 */


function renderReflection(

    pillar

){


    if(!pillar){

        return;

    }



    setText(

        "reflectionTa",

        pillar.reflectionTa

    );



    setText(

        "reflectionEn",

        pillar.reflectionEn

    );


}





/**
 * Render wisdom
 *
 */


function renderWisdom(

    pillar

){


    if(!pillar){

        return;

    }



    setText(

        "wisdomTa",

        pillar.wisdomTa

    );



    setText(

        "wisdomEn",

        pillar.wisdomEn

    );


}





/* ==========================================================================
   PROGRESS DISPLAY
   ========================================================================== */


/**
 * Update progress bar
 *
 */


function updateAssessmentProgress(

    spoke

){


    const total =

        CTM_CONSTANTS.ASSESSMENT.TOTAL_SPOKES;



    const percentage =

        Math.round(

            (

                Number(spoke)

                /

                total

            )

            *

            100

        );



    setText(

        "progressStep",

        "Spoke " +

        spoke +

        " of " +

        total

    );



    setText(

        "progressPercent",

        percentage +

        "%"

    );



    const progressBar =

        getElement(

            "progressBar"

        );



    if(progressBar){


        progressBar.style.width =

            percentage +

            "%";


    }


}





/* ==========================================================
   Continue in Batch 1D
   ========================================================== */

/* ==========================================================================
   ASSESSMENT SAVE PREPARATION
   ========================================================================== */


/**
 * Prepare assessment payload
 *
 */


function prepareAssessmentPayload(){


    return {


        spoke:

            AssessmentCommonState.currentSpoke,


        responses:

            AssessmentCommonState.responses,


        timestamp:

            new Date().toISOString()


    };


}





/**
 * Check if all questions answered
 *
 */


function isSpokeComplete(){


    const requiredQuestions =

        CTM_CONSTANTS.ASSESSMENT.QUESTIONS_PER_SPOKE;



    const responses =

        AssessmentCommonState.responses;



    return (

        Object.keys(

            responses

        ).length === requiredQuestions

    );


}





/**
 * Reset current responses
 *
 */


function resetAssessmentResponses(){


    AssessmentCommonState.responses = {};

}





/* ==========================================================================
   COMPLETE PAGE RENDER
   ========================================================================== */


/**
 * Render complete assessment page
 *
 */


function renderAssessmentPage(

    spokeNumber

){


    const pillar =

        initializeAssessmentCommon(

            spokeNumber

        );



    if(!pillar){


        console.error(

            "Assessment pillar not found"

        );


        return false;


    }



    renderPillarHeader(

        pillar

    );



    renderIntroduction(

        pillar

    );



    renderQuestions(

        pillar

    );



    renderReflection(

        pillar

    );



    renderWisdom(

        pillar

    );



    updateAssessmentProgress(

        spokeNumber

    );



    return true;


}





/* ==========================================================================
   INITIALIZATION HELPER
   ========================================================================== */


/**
 * Initialize common assessment behaviour
 *
 */


function setupAssessmentPage(

    spokeNumber

){


    const loaded =

        renderAssessmentPage(

            spokeNumber

        );



    if(!loaded){


        return false;


    }



    AssessmentCommonState.initialized =

        true;



    return true;


}





/* ==========================================================================
   PUBLIC API
   ========================================================================== */


const CTMAssessmentCommon = {


    init:

        setupAssessmentPage,


    render:

        renderAssessmentPage,


    pillar:

        loadAssessmentPillar,


    responses:

        getAssessmentResponses,


    restore:

        restoreAssessmentResponses,


    savePayload:

        prepareAssessmentPayload,


    complete:

        isSpokeComplete,


    reset:

        resetAssessmentResponses


};





Object.freeze(

    CTMAssessmentCommon

);





/* ==========================================================================
   END OF FILE

   File    : assessmentCommon.js

   Status  : 🔒 FOUNDATION

   ========================================================================== */
