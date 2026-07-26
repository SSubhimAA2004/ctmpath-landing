
/* ==========================================================================
   CTM PATH™ Guided Journey

   FROM SURVIVAL TO LIVING™

   File        : assessmentCommon.js
   Version     : 6.0

   Status      : 🔒 PREMIUM ASSESSMENT ENGINE MASTER

   Purpose:
   Core assessment intelligence

   ========================================================================== */


"use strict";







/* ==========================================================================
   GLOBAL ASSESSMENT STATE

   ========================================================================== */


const CTMAssessmentState = {


    currentSpoke:

        1,


    currentPillar:

        null,


    responses:

        {},


    spokeScore:

        0,


    spokePercentage:

        0,


    lifeLevel:

        null,


    completed:

        false



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

            "Missing pillar data:",

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

            .padStart(

                2,

                "0"

            )

            +

            " / 12";



    }







    const spokes =

        document.querySelectorAll(

            ".wheel-spoke"

        );







    spokes.forEach(


        function(spoke,index){



            spoke.classList.remove(

                "active"

            );







            if(

                index === spokeNumber - 1

            ){



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

   🔴 1 - 3
   Awareness Needed


   🟠 4 - 7
   Growth Zone


   🟢 8 - 10
   Alignment Zone

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
   RATING MEANING ENGINE™

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







    showRatingFeedback(

        container,

        score

    );







    calculateCurrentSpokeScore();



}









/* ==========================================================================
   PREMIUM RATING FEEDBACK™

   ========================================================================== */


function showRatingFeedback(

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

        getRatingMeaning(

            score

        );







    feedback.innerHTML = `



        <strong>

        ${meaning.english}

        </strong>


        <br>


        <small>

        ${meaning.tamil}

        </small>



    `;



}









/* ==========================================================================
   CONTINUE IN BATCH 1C

   ========================================================================== */


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







    const totalScore =

        responses.reduce(

            function(total,value){



                return total + Number(value);



            },

            0

        );







    CTMAssessmentState.spokeScore =

        totalScore;







    CTMAssessmentState.spokePercentage =



        Math.round(

            (

                totalScore / 30

            )

            *

            100

        );







    updateScoreDisplay();







    if(

        responses.length === 3

    ){



        CTMAssessmentState.completed = true;



        revealLifeStatus(

            CTMAssessmentState.spokePercentage

        );


    }



}









/* ==========================================================================
   SCORE DISPLAY WITH PREMIUM REVEAL™

   ========================================================================== */


function updateScoreDisplay(){



    const scoreElement =

        document.getElementById(

            "spokeRawScore"

        );







    const percentageElement =

        document.getElementById(

            "spokePercentage"

        );







    if(scoreElement){



        animateNumber(

            scoreElement,

            CTMAssessmentState.spokeScore,

            "/30"

        );



    }







    if(percentageElement){



        animateNumber(

            percentageElement,

            CTMAssessmentState.spokePercentage,

            "/100"

        );



    }



}









/* ==========================================================================
   SCORE ANIMATION™

   ========================================================================== */


function animateNumber(

    element,

    target,

    suffix

){



    let current = 0;





    const interval =

        setInterval(

            function(){



                current += Math.ceil(

                    target / 20

                );







                if(current >= target){



                    current = target;



                    clearInterval(

                        interval

                    );


                }







                element.textContent =



                    current

                    +

                    " "

                    +

                    suffix;



            },

            40


        );



}









/* ==========================================================================
   LEARNER → LEADER → LEGEND™

   STATUS ENGINE

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
   CURRENT STATUS UPDATE™

   ========================================================================== */


function revealLifeStatus(score){



    const level =

        getLifeEvolutionLevel(

            score

        );







    CTMAssessmentState.lifeLevel =

        level;







    const cards =

        document.querySelectorAll(

            ".level-item"

        );







    cards.forEach(

        function(card){



            card.classList.remove(

                "active"

            );



        }

    );







    const activeCard =



        document.querySelector(

            "."

            +

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



            <span>

            Your Current Status™

            </span>


            <br>


            <strong>

            ${level.english}

            </strong>


            <br>


            <small>

            ${level.tamil}

            </small>



        `;



    }



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
   RESET ASSESSMENT ENGINE™

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
   ASSESSMENT PAYLOAD™

   ========================================================================== */


function getAssessmentPayload(){



    return {



        spoke:

            CTMAssessmentState.currentSpoke,



        pillar:

            CTMAssessmentState.currentPillar

            ?

            CTMAssessmentState.currentPillar.key

            :

            null,



        responses:

            CTMAssessmentState.responses,



        rawScore:

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
   PUBLIC ASSESSMENT ENGINE API™

   ========================================================================== */


const CTMAssessmentEngine = {



    init:

        initializeAssessment,



    render:

        renderAssessmentPage,



    getPillar:

        getPillarData,



    selectRating:

        selectRating,



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

   Version     : 6.0


   Status      : 🔒 CTM PATH™ PREMIUM ASSESSMENT ENGINE MASTER


   Assessment Scale:

   🔴 1-3  Awareness Needed

   🟠 4-7  Growth Zone

   🟢 8-10 Alignment Zone


   Life Evolution:

   🌱 Learner™

   🚀 Leader™

   👑 Legend™


   ========================================================================== */

