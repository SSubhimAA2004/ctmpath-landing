
/* ==========================================================================
   CTM PATH™ Guided Journey

   FROM SURVIVAL TO LIVING™

   File        : assessmentCommon.js
   Version     : 5.0

   Status      : 🔒 PREMIUM ASSESSMENT ENGINE

   Purpose:

       Universal Engine for KALA CHAKRA™ Assessments

   ========================================================================== */


"use strict";





/* ==========================================================================
   ENGINE STATE
   ========================================================================== */


const CTMAssessmentState = {


    currentSpoke:1,


    currentPillar:null,


    responses:{},


    spokeScore:0,


    spokePercentage:0,


    lifeLevel:null


};








/* ==========================================================================
   INITIALIZE ASSESSMENT
   ========================================================================== */


function initializeAssessment(spokeNumber){



    const pillar =

        getPillarData(

            spokeNumber

        );



    if(!pillar){


        console.error(

            "Assessment pillar not found:",

            spokeNumber

        );


        return;


    }



    CTMAssessmentState.currentSpoke =

        spokeNumber;



    CTMAssessmentState.currentPillar =

        pillar;



    renderAssessmentPage(

        pillar

    );



}







/* ==========================================================================
   GET PILLAR DATA
   ========================================================================== */


function getPillarData(spokeNumber){



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
   MASTER PAGE RENDER
   ========================================================================== */


function renderAssessmentPage(pillar){



    renderLifeMap(

        pillar.spoke

    );



    renderPillarIdentity(

        pillar

    );



    renderLifeEvolution();



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
   LIFE MAP™
   ========================================================================== */


function renderLifeMap(spokeNumber){



    const progress =

        document.getElementById(

            "lifeMapProgress"

        );



    if(progress){


        progress.textContent =


            String(spokeNumber)

                .padStart(2,"0")

            +

            " / 12";


    }



    const spokeIndicator =

        document.querySelector(

            ".active-spoke"

        );



    if(spokeIndicator){


        spokeIndicator.textContent =


            AssessmentSpokeMap[

                spokeNumber - 1

            ]

            .title;



    }


}







/* ==========================================================================
   PILLAR IDENTITY
   ========================================================================== */


function renderPillarIdentity(pillar){



    setElementText(

        "pillarTitleTa",

        pillar.titleTa

    );



    setElementText(

        "pillarTitleEn",

        pillar.titleEn

    );



    setElementText(

        "coreQuestionTa",

        pillar.coreQuestionTa

    );



    setElementText(

        "coreQuestionEn",

        pillar.coreQuestionEn

    );



    setElementText(

        "pillarIntroTa",

        pillar.introductionTa

    );



    setElementText(

        "pillarIntroEn",

        pillar.introductionEn

    );


}





/* Continue in Batch 1B */

/* ==========================================================================
   LIFE EVOLUTION JOURNEY™

   Learner → Leader → Legend™

   ========================================================================== */


function renderLifeEvolution(){



    const container =

        document.getElementById(

            "lifeEvolutionLevel"

        );



    if(!container){

        return;

    }



    container.innerHTML = `


        <div class="life-level-header">

            <div class="level-item learner">

                🌱 LEARNER™

            </div>


            <div class="level-item leader">

                🚀 LEADER™

            </div>


            <div class="level-item legend">

                👑 LEGEND™

            </div>


        </div>


        <div class="level-scale">


            <span>0</span>

            <span>60</span>

            <span>85</span>

            <span>100</span>


        </div>


        <div class="current-level-message">

            Complete your reflection to discover your current level.

        </div>


    `;


}







/* ==========================================================================
   UPDATE LIFE EVOLUTION LEVEL

   ========================================================================== */


function updateLifeEvolution(score){



    const level =

        getLifeEvolutionLevel(

            score

        );



    CTMAssessmentState.lifeLevel =

        level;



    const items =

        document.querySelectorAll(

            ".level-item"

        );



    items.forEach(

        function(item){



            item.classList.remove(

                "active"

            );


        }

    );





    if(

        level.key === "LEARNER"

    ){


        document

            .querySelector(

                ".learner"

            )

            ?.classList.add(

                "active"

            );


    }



    else if(

        level.key === "LEADER"

    ){


        document

            .querySelector(

                ".leader"

            )

            ?.classList.add(

                "active"

            );


    }



    else{


        document

            .querySelector(

                ".legend"

            )

            ?.classList.add(

                "active"

            );


    }





    const message =

        document.querySelector(

            ".current-level-message"

        );



    if(message){



        message.innerHTML = `


            Current Level:

            <strong>

            ${level.english}

            </strong>


            <br>


            ${level.tamil}


        `;


    }


}







/* ==========================================================================
   QUESTION RENDERING
   ========================================================================== */


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







function renderQuestion(

    question,

    number

){



    setElementText(

        "questionTypeTa" + number,

        question.typeTa

    );



    setElementText(

        "questionTypeEn" + number,

        question.type

    );



    setElementText(

        "questionTextTa" + number,

        question.textTa

    );



    setElementText(

        "questionTextEn" + number,

        question.textEn

    );



    createRatingScale(

        "ratingGroup" + number,

        number

    );


}







/* ==========================================================================
   PREMIUM RATING SCALE

   1 - 10

   ========================================================================== */


function createRatingScale(

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



        button.className =

            "rating-button";



        button.type =

            "button";



        button.dataset.score =

            score;



        button.textContent =

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






/* Continue in Batch 1C */

/* ==========================================================================
   RATING SELECTION

   ========================================================================== */


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



    calculateCurrentSpokeScore();


}








/* ==========================================================================
   SCORE CALCULATION

   ========================================================================== */


function calculateCurrentSpokeScore(){



    const responses =

        Object.values(

            CTMAssessmentState.responses

        );



    if(

        responses.length === 0

    ){

        return;

    }





    const total =

        responses.reduce(

            function(sum,value){


                return sum + Number(value);


            },

            0

        );





    CTMAssessmentState.spokeScore =

        total;





    CTMAssessmentState.spokePercentage =


        calculateSpokePercentage(

            total

        );





    updateScoreDisplay();



    updateLifeEvolution(

        CTMAssessmentState.spokePercentage

    );


}







/* ==========================================================================
   SCORE DISPLAY

   ========================================================================== */


function updateScoreDisplay(){



    setElementText(

        "spokeRawScore",

        CTMAssessmentState.spokeScore

        +

        " / 30"

    );



    setElementText(

        "spokePercentage",

        CTMAssessmentState.spokePercentage

        +

        " /100"

    );


}







/* ==========================================================================
   REFLECTION MOMENT™

   ========================================================================== */


function renderReflection(pillar){



    setElementText(

        "reflectionTextTa",

        pillar.reflectionTa

    );



    setElementText(

        "reflectionTextEn",

        pillar.reflectionEn

    );


}







/* ==========================================================================
   WISDOM MOMENT™

   ========================================================================== */


function renderWisdom(pillar){



    setElementText(

        "wisdomTextTa",

        pillar.wisdomTa

    );



    setElementText(

        "wisdomTextEn",

        pillar.wisdomEn

    );


}







/* ==========================================================================
   SAVE CURRENT ASSESSMENT STATE

   ========================================================================== */


function getAssessmentPayload(){



    return {


        spoke:

            CTMAssessmentState.currentSpoke,


        pillar:


            CTMAssessmentState.currentPillar.key,



        responses:


            CTMAssessmentState.responses,



        score:


            CTMAssessmentState.spokeScore,



        percentage:


            CTMAssessmentState.spokePercentage,



        level:


            CTMAssessmentState.lifeLevel.key



    };


}







/* Continue in Batch 1D */

/* ==========================================================================
   RESTORE SAVED RESPONSES

   ========================================================================== */


function restoreResponses(savedData){



    if(!savedData){

        return;

    }



    CTMAssessmentState.responses =

        savedData.responses || {};





    Object.keys(

        CTMAssessmentState.responses

    )

    .forEach(

        function(questionNumber){



            const score =

                CTMAssessmentState.responses[

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



        }


    );



    calculateCurrentSpokeScore();



}







/* ==========================================================================
   DOM HELPER FUNCTIONS

   ========================================================================== */


function setElementText(

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







function getElement(id){


    return document.getElementById(

        id

    );


}







/* ==========================================================================
   ASSESSMENT COMPLETION CHECK

   ========================================================================== */


function isAssessmentComplete(){



    return Object.keys(

        CTMAssessmentState.responses

    ).length === 3;



}







/* ==========================================================================
   RESET CURRENT ASSESSMENT

   ========================================================================== */


function resetAssessment(){



    CTMAssessmentState.responses = {};



    CTMAssessmentState.spokeScore = 0;



    CTMAssessmentState.spokePercentage = 0;



    CTMAssessmentState.lifeLevel = null;



    document

        .querySelectorAll(

            ".rating-button"

        )

        .forEach(

            function(button){


                button.classList.remove(

                    "active"

                );


            }

        );



}







/* ==========================================================================
   PUBLIC ENGINE API

   ========================================================================== */


const CTMAssessmentEngine = {



    init:

        initializeAssessment,



    render:

        renderAssessmentPage,



    getPillar:

        getPillarData,



    calculateScore:

        calculateCurrentSpokeScore,



    getPayload:

        getAssessmentPayload,



    restore:

        restoreResponses,



    reset:

        resetAssessment,



    completed:

        isAssessmentComplete



};







Object.freeze(

    CTMAssessmentEngine

);







/* ==========================================================================
   END OF FILE


   File        : assessmentCommon.js

   Version     : 5.0


   Status      : 🔒 CTM PATH™ PREMIUM ASSESSMENT ENGINE


   ========================================================================== */
