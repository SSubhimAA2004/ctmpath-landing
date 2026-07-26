
/* ==========================================================================
   CTM PATH™ Guided Journey

   FROM SURVIVAL TO LIVING™

   File        : assessmentCommon.js
   Version     : 5.2

   Status      : 🔒 PREMIUM ASSESSMENT ENGINE

   Update:

   CTM PATH™ Assessment Scale v1.0

   🔴 Awareness
   🟠 Growth
   🟢 Alignment

   ========================================================================== */


"use strict";







/* ==========================================================================
   ASSESSMENT ENGINE STATE

   ========================================================================== */


const CTMAssessmentState = {


    currentSpoke:1,


    currentPillar:null,


    responses:{},


    spokeScore:0,


    spokePercentage:0,


    lifeLevel:null,


    completed:false



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
   PAGE RENDER CONTROLLER

   ========================================================================== */


function renderAssessmentPage(pillar){



    renderLifeMap(

        pillar.spoke

    );





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





    renderLifeEvolution();



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







    document

    .querySelectorAll(

        ".wheel-spoke"

    )

    .forEach(

        function(spoke,index){



            spoke.classList.remove(

                "active"

            );





            if(index === spokeNumber - 1){



                spoke.classList.add(

                    "active"

                );


            }



        }


    );



}








/* Continue in Batch 1B */

/* ==========================================================================
   CTM PATH™ 3-ZONE RATING INTELLIGENCE™

   Score:

   1 - 3
   🔴 Awareness Needed


   4 - 7
   🟠 Growth Zone


   8 - 10
   🟢 Alignment Zone


   ========================================================================== */





function getRatingClass(score){



    score = Number(score);





    if(score <= 3){



        return "rating-low";



    }







    if(score <= 7){



        return "rating-growth";



    }







    return "rating-aligned";



}









/* ==========================================================================
   RATING MEANING

   ========================================================================== */


function getRatingMeaning(score){



    score = Number(score);





    if(score <= 3){



        return {



            english:

                "Awareness Needed",



            tamil:

                "விழிப்புணர்வு தேவை"



        };



    }







    if(score <= 7){



        return {



            english:

                "Growth Zone",



            tamil:

                "வளர்ச்சி நிலை"



        };



    }







    return {



        english:

            "Alignment Zone",



        tamil:

            "இணக்க நிலை"



    };



}









/* ==========================================================================
   SELECT RATING

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

                "active",

                "rating-low",

                "rating-growth",

                "rating-aligned"

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

            "active",

            getRatingClass(score)

        );


    }







    CTMAssessmentState.responses[

        questionNumber

    ] = Number(score);







    updateRatingFeedback(

        container,

        score

    );







    calculateCurrentSpokeScore();



}









/* ==========================================================================
   RATING FEEDBACK DISPLAY

   ========================================================================== */


function updateRatingFeedback(

    container,

    score

){



    let feedback =

        container.parentElement.querySelector(

            ".rating-feedback"

        );







    if(!feedback){



        feedback =

            document.createElement(

                "div"

            );



        feedback.className =

            "rating-feedback";



        container.parentElement.appendChild(

            feedback

        );



    }







    const meaning =

        getRatingMeaning(score);







    feedback.innerHTML = `



        <span>

        ${meaning.english}

        </span>


        <br>


        <small>

        ${meaning.tamil}

        </small>



    `;



}









/* Continue in Batch 1C */

/* ==========================================================================
   SCORE CALCULATION ENGINE™

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



        Math.round(

            (

                total / 30

            )

            *

            100

        );







    updateScoreDisplay();







    if(

        responses.length === 3

    ){



        CTMAssessmentState.completed = true;



        updateLifeEvolution(

            CTMAssessmentState.spokePercentage

        );



    }



}









/* ==========================================================================
   LIFE LEVEL MAPPING™

   Learner → Leader → Legend™

   ========================================================================== */


function getLifeEvolutionLevel(score){



    score = Number(score);







    if(score < 60){



        return {



            key:

                "LEARNER",



            english:

                "LEARNER™",



            tamil:

                "கற்றல் நிலை"



        };



    }








    if(score < 85){



        return {



            key:

                "LEADER",



            english:

                "LEADER™",



            tamil:

                "வழிநடத்தும் நிலை"



        };



    }








    return {



        key:

            "LEGEND",



        english:

            "LEGEND™",



        tamil:

            "முன்னுதாரண நிலை"



    };



}









/* ==========================================================================
   UPDATE LIFE EVOLUTION™

   ========================================================================== */


function updateLifeEvolution(score){



    const level =

        getLifeEvolutionLevel(

            score

        );







    CTMAssessmentState.lifeLevel =

        level;







    const levelCards =

        document.querySelectorAll(

            ".level-item"

        );







    levelCards.forEach(

        function(card){



            card.classList.remove(

                "active"

            );



        }

    );







    const activeCard =



        document.querySelector(

            "." +

            level.key.toLowerCase()

        );







    if(activeCard){



        activeCard.classList.add(

            "active"

        );



    }







    const message =

        document.querySelector(

            ".current-level-message"

        );







    if(message){



        message.innerHTML = `



            Your Current Status™

            <br>


            <strong>

            ${level.english}

            </strong>


            <br>


            ${level.tamil}



        `;



    }



}









/* ==========================================================================
   SCORE DISPLAY UPDATE

   ========================================================================== */


function updateScoreDisplay(){



    const rawScore =

        document.getElementById(

            "spokeRawScore"

        );







    const percentage =

        document.getElementById(

            "spokePercentage"

        );







    if(rawScore){



        rawScore.textContent =



            CTMAssessmentState.spokeScore

            +

            " / 30";



    }







    if(percentage){



        percentage.textContent =



            CTMAssessmentState.spokePercentage

            +

            " /100";



    }



}









/* ==========================================================================
   ASSESSMENT PAYLOAD

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



        currentStatus:

            CTMAssessmentState.lifeLevel

            ?

            CTMAssessmentState.lifeLevel.key

            :

            null



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

                    "active",

                    getRatingClass(score)

                );



            }



        }


    );








    calculateCurrentSpokeScore();



}









/* ==========================================================================
   RESET ASSESSMENT ENGINE

   ========================================================================== */


function resetAssessment(){



    CTMAssessmentState.responses = {};



    CTMAssessmentState.spokeScore = 0;



    CTMAssessmentState.spokePercentage = 0;



    CTMAssessmentState.lifeLevel = null;



    CTMAssessmentState.completed = false;







    document

    .querySelectorAll(

        ".rating-button"

    )

    .forEach(

        function(button){



            button.classList.remove(

                "active",

                "rating-low",

                "rating-growth",

                "rating-aligned"

            );



        }

    );







    updateScoreDisplay();



    renderLifeEvolution();



}









/* ==========================================================================
   VALIDATION

   ========================================================================== */


function isAssessmentComplete(){



    return (


        Object.keys(

            CTMAssessmentState.responses

        ).length === 3



    );



}









/* ==========================================================================
   DOM HELPERS

   ========================================================================== */


function getElement(id){



    return document.getElementById(

        id

    );



}







function setElementText(

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









/* ==========================================================================
   SCROLL SUPPORT

   ========================================================================== */


function scrollToTop(){



    window.scrollTo({



        top:0,



        behavior:"smooth"



    });



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



    calculate:

        calculateCurrentSpokeScore,



    payload:

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

   Version     : 5.2


   Status      : 🔒 CTM PATH™ PREMIUM ASSESSMENT ENGINE


   CTM PATH™ Assessment Scale:

   🔴 1-3  Awareness Needed

   🟠 4-7  Growth Zone

   🟢 8-10 Alignment Zone


   ========================================================================== */
