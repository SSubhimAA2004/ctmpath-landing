
/* ==========================================================================
   CTM PATH™ Guided Journey

   File        : assessmentCommon.js
   Version     : 3.0
   Status      : 🔒 ASSESSMENT ENGINE

   Purpose:

       Shared Assessment Rendering Engine

   Supports:

       assessment01.js
       assessment02.js
       ...
       assessment12.js


   Owns:

       • Pillar Rendering
       • Question Rendering
       • Rating Generation
       • Reflection Rendering
       • Wisdom Rendering


   Owns NO:

       • API
       • Storage
       • Navigation
       • Scoring

   ========================================================================== */


"use strict";



/* ==========================================================================
   STATE
   ========================================================================== */


const AssessmentState = {


    currentSpoke:

        null,


    currentPillar:

        null,


    answers:{}


};





/* ==========================================================================
   LOAD PILLAR DATA
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
   INITIALIZE ASSESSMENT
   ========================================================================== */


function initializeAssessment(spokeNumber){


    const pillar =

        getAssessmentPillar(

            spokeNumber

        );



    if(!pillar){


        console.error(

            "Assessment pillar missing:",

            spokeNumber

        );


        return false;


    }



    AssessmentState.currentSpoke =

        spokeNumber;



    AssessmentState.currentPillar =

        pillar;



    renderAssessment(

        pillar

    );



    return true;


}





/* ==========================================================================
   MAIN RENDER FUNCTION
   ========================================================================== */


function renderAssessment(pillar){


    renderPillarHeader(

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
   PILLAR HEADER
   ========================================================================== */


function renderPillarHeader(pillar){


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
 * Render all questions
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



            const number =

                index + 1;



            renderQuestion(

                question,

                number

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



    createRatingButtons(

        "ratingGroup" + number,

        number

    );


}





/* ==========================================================================
   RATING BUTTON GENERATOR
   ========================================================================== */


/**
 * Create 1-10 rating buttons
 *
 */


function createRatingButtons(

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



        button.innerText =

            score;



        button.addEventListener(

            "click",

            function(){


                selectRating(

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
 * Handle rating selection
 *
 */


function selectRating(

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



    const selected =

        container.querySelector(

            "[data-score='" +

            score +

            "']"

        );



    if(selected){


        selected.classList.add(

            "active"

        );


    }



    AssessmentState.answers[

        questionNumber

    ] = score;



}





/* Continue in Batch 1C */

/* ==========================================================================
   REFLECTION RENDERING
   ========================================================================== */


/**
 * Render Reflection™ section
 *
 */


function renderReflection(pillar){


    setText(

        "reflectionTa",

        pillar.reflectionTa

    );



    setText(

        "reflectionEn",

        pillar.reflectionEn

    );


}





/* ==========================================================================
   WISDOM RENDERING
   ========================================================================== */


/**
 * Render Wisdom™ section
 *
 */


function renderWisdom(pillar){


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
   PROGRESS
   ========================================================================== */


/**
 * Update progress indicator
 *
 */


function updateProgress(spoke){


    const total =

        12;



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

        String(spoke).padStart(2,"0")

        +

        " of "

        +

        total

    );



    setText(

        "progressPercent",

        percentage +

        "%"

    );



    const bar =

        document.getElementById(

            "progressBar"

        );



    if(bar){


        bar.style.width =

            percentage +

            "%";


    }


}





/* ==========================================================================
   RESTORE ANSWERS
   ========================================================================== */


/**
 * Restore previously selected ratings
 *
 */


function restoreAnswers(savedAnswers){


    if(

        !savedAnswers

    ){

        return;

    }



    Object.keys(

        savedAnswers

    ).forEach(


        function(questionNumber){



            const score =

                savedAnswers[questionNumber];



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



            AssessmentState.answers[

                questionNumber

            ] = score;



        }


    );


}





/* ==========================================================================
   PAYLOAD
   ========================================================================== */


/**
 * Prepare assessment save object
 *
 */


function getAssessmentPayload(){


    return {


        spoke:

            AssessmentState.currentSpoke,


        responses:

            AssessmentState.answers,


        timestamp:

            new Date()

                .toISOString()


    };


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
   PUBLIC API
   ========================================================================== */


const CTMAssessmentEngine = {


    init:

        initializeAssessment,


    render:

        renderAssessment,


    responses:

        function(){

            return AssessmentState.answers;

        },


    payload:

        getAssessmentPayload,


    restore:

        restoreAnswers,


    progress:

        updateProgress


};





Object.freeze(

    CTMAssessmentEngine

);





/* ==========================================================================
   END OF FILE

   File    : assessmentCommon.js

   Version : 3.0

   Status  : 🔒 ASSESSMENT ENGINE

   ========================================================================== */
