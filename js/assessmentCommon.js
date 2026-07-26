
/* ==========================================================================
   CTM PATH™ Guided Journey

   FROM SURVIVAL TO LIVING™

   File        : assessmentCommon.js
   Version     : 5.1

   Status      : 🔒 PREMIUM ASSESSMENT ENGINE REFINEMENT

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

                .padStart(2,"0")

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
   LIFE EVOLUTION RATING INTELLIGENCE™

   Score Meaning:

   1 - 3  : Awareness Needed
   4 - 6  : Growth Stage
   7 - 8  : Strong Alignment
   9 -10  : Mastery Level

   ========================================================================== */


function getRatingClass(score){



    score = Number(score);





    if(score <= 3){


        return "rating-low";


    }






    if(score <= 6){


        return "rating-growth";


    }






    if(score <= 8){


        return "rating-strong";


    }






    return "rating-master";



}








/* ==========================================================================
   RATING LABEL

   ========================================================================== */


function getRatingMeaning(score){



    score = Number(score);





    if(score <= 3){


        return {


            title:"Awareness Needed",


            tamil:"விழிப்புணர்வு தேவை"


        };


    }







    if(score <= 6){


        return {


            title:"Growth Stage",


            tamil:"வளர்ச்சி நிலை"


        };


    }







    if(score <= 8){


        return {


            title:"Strong Alignment",


            tamil:"வலுவான இணக்கம்"


        };


    }







    return {


        title:"Mastery Level",


        tamil:"மேன்மை நிலை"


    };



}









/* ==========================================================================
   PREMIUM RATING SELECTION

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

                "rating-strong",

                "rating-master"

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







    updateQuestionFeedback(

        container,

        score

    );







    calculateCurrentSpokeScore();



}









/* ==========================================================================
   QUESTION FEEDBACK

   ========================================================================== */


function updateQuestionFeedback(

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

        ${meaning.title}

        </span>


        <br>


        <small>

        ${meaning.tamil}

        </small>



    `;



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


        Math.round(

            (total / 30) * 100

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






/* Continue in Batch 1C */

/* ==========================================================================
   LIFE EVOLUTION JOURNEY™

   Learner → Leader → Legend™

   Revealed after completion only

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


                🌱

                <br>

                LEARNER™

            </div>



            <div class="level-item leader">


                🚀

                <br>

                LEADER™

            </div>



            <div class="level-item legend">


                👑

                <br>

                LEGEND™

            </div>



        </div>



        <div class="level-scale">


            <span>0</span>


            <span>60</span>


            <span>85</span>


            <span>100</span>



        </div>



        <div class="current-level-message">


            Complete all reflections to discover your current level.


        </div>



    `;


}









/* ==========================================================================
   UPDATE LIFE EVOLUTION

   ========================================================================== */


function updateLifeEvolution(score){



    const level =

        getLifeEvolutionLevel(

            score

        );





    CTMAssessmentState.lifeLevel =

        level;





    const levels =

        document.querySelectorAll(

            ".level-item"

        );





    levels.forEach(

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



            Your Current Life Level™

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
   SCORE CARD UPDATE

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
   COMPLETE ASSESSMENT PAYLOAD

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


            CTMAssessmentState.lifeLevel

            ?

            CTMAssessmentState.lifeLevel.key

            :

            null



    };



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
   RESET ASSESSMENT

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

                "rating-strong",

                "rating-master"

            );



        }

    );







    updateScoreDisplay();



    renderLifeEvolution();



}









/* ==========================================================================
   DOM HELPERS

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
   SCROLL HELPER

   ========================================================================== */


function scrollToTop(){



    window.scrollTo({


        top:0,


        behavior:"smooth"



    });



}









/* ==========================================================================
   PUBLIC ASSESSMENT ENGINE API

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



    score:

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

   Version     : 5.1


   Status      : 🔒 CTM PATH™ PREMIUM ASSESSMENT ENGINE


   ========================================================================== */

