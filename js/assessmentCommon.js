
/* ==========================================================================
   CTM PATH™ Guided Journey

   FROM SURVIVAL TO LIVING™

   File        : assessmentCommon.js
   Version     : 4.0

   Status      : 🔒 PREMIUM ASSESSMENT ENGINE

   Purpose:

       Universal Assessment Experience Engine

   Supports:

       assessment01.js
       assessment02.js
       ...
       assessment12.js


   Owns:

       • Premium Rendering
       • Question Display
       • Rating Interaction
       • Reflection Display
       • Wisdom Display


   Owns NO:

       • Data Storage
       • API
       • Navigation
       • Scoring

   ========================================================================== */


"use strict";





/* ==========================================================================
   ENGINE STATE
   ========================================================================== */


const CTMAssessmentState = {


    spoke:

        null,


    pillar:

        null,


    responses:{}


};






/* ==========================================================================
   INITIALIZE ASSESSMENT
   ========================================================================== */


function initializePremiumAssessment(spokeNumber){


    const pillar =

        getAssessmentPillar(

            spokeNumber

        );



    if(!pillar){


        console.error(

            "Missing assessment pillar:",

            spokeNumber

        );


        return false;


    }



    CTMAssessmentState.spoke =

        spokeNumber;



    CTMAssessmentState.pillar =

        pillar;



    renderPremiumAssessment(

        pillar

    );



    updateLifeMap(

        spokeNumber

    );



    return true;


}







/* ==========================================================================
   GET PILLAR DATA
   ========================================================================== */


function getAssessmentPillar(spokeNumber){


    return AssessmentRepository.pillars.find(

        function(pillar){


            return (

                pillar.spoke ===

                Number(spokeNumber)

            );


        }

    );


}







/* ==========================================================================
   MAIN PREMIUM RENDER
   ========================================================================== */


function renderPremiumAssessment(pillar){


    renderPillarIdentity(

        pillar

    );



    renderQuestions(

        pillar.questions

    );



    renderReflection(

        pillar

    );



    renderWisdom(

        pillar

    );


}







/* ==========================================================================
   PILLAR IDENTITY
   ========================================================================== */


function renderPillarIdentity(pillar){


    setText(

        "pillarTitleTa",

        pillar.titleTa

    );



    setText(

        "pillarTitleEn",

        pillar.titleEn

    );



    setText(

        "introductionTa",

        pillar.introductionTa

    );



    setText(

        "introductionEn",

        pillar.introductionEn

    );


}





/* Continue in Batch 1B */

/* ==========================================================================
   QUESTION RENDERING
   ========================================================================== */


/**
 * Render all assessment questions
 *
 */


function renderQuestions(questions){


    if(

        !questions

        ||

        !Array.isArray(questions)

    ){

        return;

    }



    questions.forEach(

        function(question,index){



            const questionNumber =

                index + 1;



            renderQuestion(

                question,

                questionNumber

            );


        }

    );


}






/**
 * Render individual question
 *
 */


function renderQuestion(

    question,

    number

){


    setText(

        "questionTextTa" + number,

        question.textTa

    );



    setText(

        "questionTextEn" + number,

        question.textEn

    );



    createPremiumRatingScale(

        "ratingGroup" + number,

        number

    );


}







/* ==========================================================================
   PREMIUM RATING SCALE
   ========================================================================== */


/**
 *
 * Creates 1 - 10 Life Alignment Scale
 *
 */


function createPremiumRatingScale(

    containerId,

    questionNumber

){


    const container =

        document.getElementById(

            containerId

        );



    if(!container){

        return;

    }



    container.innerHTML = "";





    for(

        let score = 1;

        score <= 10;

        score++

    ){



        const button =

            document.createElement(

                "button"

            );



        button.type =

            "button";



        button.className =

            "rating-button";



        button.dataset.score =

            score;



        button.setAttribute(

            "aria-label",

            "Rating " + score

        );



        button.innerHTML =

            score;



        button.addEventListener(

            "click",

            function(){


                selectPremiumRating(

                    questionNumber,

                    score,

                    container

                );


            }

        );



        container.appendChild(

            button

        );


    }


}







/* ==========================================================================
   RATING SELECTION
   ========================================================================== */


/**
 *
 * Stores selected response
 *
 */


function selectPremiumRating(

    questionNumber,

    score,

    container

){


    const buttons =

        container.querySelectorAll(

            ".rating-button"

        );



    buttons.forEach(

        function(button){


            button.classList.remove(

                "active"

            );


        }

    );





    const selectedButton =

        container.querySelector(

            "[data-score='" +

            score +

            "']"

        );



    if(selectedButton){


        selectedButton.classList.add(

            "active"

        );


    }





    CTMAssessmentState.responses[

        questionNumber

    ] = score;



}






/* ==========================================================================
   RESPONSE ACCESS
   ========================================================================== */


function getAssessmentResponses(){


    return (

        CTMAssessmentState.responses

    );


}





/* Continue in Batch 1C */

/* ==========================================================================
   LIFE MAP™ PROGRESS
   ========================================================================== */


/**
 * Update Life Map progress indicator
 *
 */


function updateLifeMap(spokeNumber){


    const progressElement =

        document.querySelector(

            ".life-map-progress span"

        );



    if(progressElement){


        progressElement.textContent =


            String(spokeNumber)

                .padStart(2,"0")

            +

            " / 12";


    }



    const activeSpoke =

        document.querySelector(

            ".wheel-spoke.active"

        );



    if(activeSpoke){


        activeSpoke.classList.remove(

            "active"

        );


    }



    const spokes =

        document.querySelectorAll(

            ".wheel-spoke"

        );



    if(

        spokes[spokeNumber - 1]

    ){


        spokes[

            spokeNumber - 1

        ].classList.add(

            "active"

        );


    }


}







/* ==========================================================================
   REFLECTION MOMENT™
   ========================================================================== */


function renderReflection(pillar){


    const reflectionTitle =

        document.querySelector(

            ".reflection-panel h3"

        );



    const reflectionText =

        document.querySelector(

            ".reflection-panel p"

        );



    if(reflectionTitle){


        reflectionTitle.textContent =

            pillar.reflectionTa;


    }



    if(reflectionText){


        reflectionText.textContent =

            pillar.reflectionEn;


    }


}







/* ==========================================================================
   WISDOM MOMENT™
   ========================================================================== */


function renderWisdom(pillar){


    const wisdomTitle =

        document.querySelector(

            ".wisdom-panel h3"

        );



    const wisdomText =

        document.querySelector(

            ".wisdom-panel p"

        );



    if(wisdomTitle){


        wisdomTitle.textContent =

            pillar.wisdomTa;


    }



    if(wisdomText){


        wisdomText.textContent =

            pillar.wisdomEn;


    }


}







/* ==========================================================================
   SAVE RESPONSES
   ========================================================================== */


function saveAssessmentResponses(){


    const payload = {


        spoke:

            CTMAssessmentState.spoke,


        responses:

            CTMAssessmentState.responses,


        updatedAt:

            new Date()

                .toISOString()


    };



    return payload;


}







/* ==========================================================================
   RESTORE RESPONSES
   ========================================================================== */


function restoreAssessmentResponses(savedResponses){


    if(!savedResponses){


        return;


    }



    Object.keys(

        savedResponses

    )

    .forEach(

        function(questionNumber){



            const score =

                savedResponses[

                    questionNumber

                ];



            const container =

                document.getElementById(

                    "ratingGroup"

                    +

                    questionNumber

                );



            if(!container){


                return;


            }



            const button =

                container.querySelector(

                    "[data-score='" +

                    score +

                    "']"

                );



            if(button){


                button.classList.add(

                    "active"

                );


            }



            CTMAssessmentState.responses[

                questionNumber

            ] = score;



        }

    );


}







/* ==========================================================================
   DOM HELPER
   ========================================================================== */


function setText(

    id,

    value

){


    const element =

        document.getElementById(

            id

        );



    if(element){


        element.textContent =

            value || "";


    }


}







/* ==========================================================================
   PUBLIC ENGINE API
   ========================================================================== */


const CTMAssessmentEngine = {


    init:

        initializePremiumAssessment,


    render:

        renderPremiumAssessment,


    responses:

        getAssessmentResponses,


    save:

        saveAssessmentResponses,


    restore:

        restoreAssessmentResponses


};





Object.freeze(

    CTMAssessmentEngine

);







/* ==========================================================================
   END OF FILE

   File        : assessmentCommon.js

   Version     : 4.0

   Status      : 🔒 PREMIUM ASSESSMENT ENGINE

   ========================================================================== */
