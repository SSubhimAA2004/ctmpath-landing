
/*=============================================================================

    CTM PATH™

    FROM SURVIVAL TO LIVING™

    FILE

    assessment.js

    PURPOSE

    Assessment Engine

    RESPONSIBILITIES

    • Load Assessment Data
    • Render Dynamic Pillars
    • Capture Ratings
    • Colour Coding
    • Auto Save
    • Calculate Percentages
    • Progress
    • Navigation
    • Route To Kala Chakra™

=============================================================================*/

'use strict';



/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/


window.CTM = window.CTM || {};



/*=============================================================================
    ASSESSMENT MODULE
=============================================================================*/


CTM.assessment=(function(){



/*=============================================================================
    MODULE VARIABLES
=============================================================================*/


let currentSpoke=0;



let answers={};



let assessment=null;



let nextButton=null;

let previousButton=null;



let progressFill=null;

let progressSpoke=null;

let progressPercentage=null;



let pillarNumber=null;

let pillarTitleTa=null;

let pillarTitleEn=null;



let introTa=null;

let introEn=null;



let question1=null;

let question2=null;

let question3=null;



let reflectionTa=null;

let reflectionEn=null;



let wisdomTa=null;

let wisdomEn=null;



let pillarPercentage=null;



const TOTAL_SPOKES=12;



/*=============================================================================
    INITIALIZE
=============================================================================*/


function init(){



    cacheDom();



    loadSavedAnswers();



    renderSpoke();



    attachEvents();



    console.log(

        "CTM Assessment Ready"

    );

}



/*=============================================================================
    CACHE DOM
=============================================================================*/


function cacheDom(){



    assessment=document.getElementById(

        "assessmentContent"

    );



    nextButton=document.getElementById(

        "nextButton"

    );



    previousButton=document.getElementById(

        "previousButton"

    );



    progressFill=document.getElementById(

        "progressFill"

    );



    progressSpoke=document.getElementById(

        "progressSpoke"

    );



    progressPercentage=document.getElementById(

        "progressPercentage"

    );



    pillarNumber=document.getElementById(

        "pillarNumber"

    );



    pillarTitleTa=document.getElementById(

        "pillarTitleTa"

    );



    pillarTitleEn=document.getElementById(

        "pillarTitleEn"

    );



    introTa=document.getElementById(

        "introTa"

    );



    introEn=document.getElementById(

        "introEn"

    );



    question1=document.getElementById(

        "question1"

    );



    question2=document.getElementById(

        "question2"

    );



    question3=document.getElementById(

        "question3"

    );



    reflectionTa=document.getElementById(

        "reflectionTa"

    );



    reflectionEn=document.getElementById(

        "reflectionEn"

    );



    wisdomTa=document.getElementById(

        "wisdomTa"

    );



    wisdomEn=document.getElementById(

        "wisdomEn"

    );



    pillarPercentage=document.getElementById(

        "pillarPercentage"

    );



}



/*=============================================================================
    ATTACH EVENTS
=============================================================================*/


function attachEvents(){



    nextButton.addEventListener(

        "click",

        nextSpoke

    );



    previousButton.addEventListener(

        "click",

        previousSpoke

    );



    document

        .querySelectorAll(

            ".rating-button"

        )

        .forEach(function(button){



            button.addEventListener(

                "click",

                selectRating

            );



        });



}



/*=============================================================================
    LOAD SAVED ANSWERS
=============================================================================*/


function loadSavedAnswers(){



    const saved=CTM.storage.getAssessment();



    if(saved){

        answers=saved;

    }



}



/*=============================================================================
    RENDER CURRENT SPOKE
=============================================================================*/


function renderSpoke(){



    const spoke=

        CTM.assessmentData[currentSpoke];



    pillarNumber.textContent=

        "SPOKE "

        +(currentSpoke+1)

        +" OF "

        +TOTAL_SPOKES;



    pillarTitleTa.textContent=

        spoke.tamilTitle;



    pillarTitleEn.textContent=

        spoke.englishTitle;



    introTa.textContent=

        spoke.introductionTa;



    introEn.textContent=

        spoke.introductionEn;



    question1.textContent=

        spoke.questions[0];



    question2.textContent=

        spoke.questions[1];



    question3.textContent=

        spoke.questions[2];



    reflectionTa.textContent=

        spoke.reflectionTa;



    reflectionEn.textContent=

        spoke.reflectionEn;



    wisdomTa.textContent=

        spoke.wisdomTa;



    wisdomEn.textContent=

        spoke.wisdomEn;



    updateProgress();



    restoreSelections();



}

                /*=============================================================================
    SELECT RATING
=============================================================================*/


function selectRating(event){

    const button=event.currentTarget;

    const question=parseInt(

        button.dataset.question,

        10

    );

    const value=parseInt(

        button.dataset.value,

        10

    );



    /*---------------------------------------------------------
        Remove previous selection
    ---------------------------------------------------------*/


    document

        .querySelectorAll(

            '.rating-button[data-question="'+question+'"]'

        )

        .forEach(function(item){

            item.classList.remove(

                'selected',

                'low',

                'medium',

                'high'

            );

        });



    /*---------------------------------------------------------
        Apply colour
    ---------------------------------------------------------*/


    if(value<=3){

        button.classList.add(

            'selected',

            'low'

        );

    }

    else if(value<=7){

        button.classList.add(

            'selected',

            'medium'

        );

    }

    else{

        button.classList.add(

            'selected',

            'high'

        );

    }



    /*---------------------------------------------------------
        Store Answer
    ---------------------------------------------------------*/


    if(

        !answers[currentSpoke]

    ){

        answers[currentSpoke]={};

    }



    answers[currentSpoke][question]=value;



    saveAssessment();



    /*---------------------------------------------------------
        Restore Score
    ---------------------------------------------------------*/


    updatePillarScore();



}



/*=============================================================================
    RESTORE SELECTIONS
=============================================================================*/


function restoreSelections(){



    document

        .querySelectorAll(

            '.rating-button'

        )

        .forEach(function(button){

            button.classList.remove(

                'selected',

                'low',

                'medium',

                'high'

            );

        });



    if(

        !answers[currentSpoke]

    ){

        pillarPercentage.textContent="0%";

        nextButton.disabled=true;

        return;

    }



    Object.keys(

        answers[currentSpoke]

    ).forEach(function(question){



        const value=

            answers[currentSpoke][question];



        const button=

            document.querySelector(

                '.rating-button[data-question="'+question+'"][data-value="'+value+'"]'

            );



        if(!button){

            return;

        }



        button.classList.add(

            'selected'

        );



        if(value<=3){

            button.classList.add(

                'low'

            );

        }

        else if(value<=7){

            button.classList.add(

                'medium'

            );

        }

        else{

            button.classList.add(

                'high'

            );

        }



    });



    updatePillarScore();



}



/*=============================================================================
    UPDATE PILLAR SCORE
=============================================================================*/


function updatePillarScore(){



    if(

        !answers[currentSpoke]

    ){

        return;

    }



    const response=

        answers[currentSpoke];



    if(

        !response[1] ||

        !response[2] ||

        !response[3]

    ){

        pillarPercentage.textContent="0%";

        nextButton.disabled=true;

        return;

    }



    const total=

        response[1]+

        response[2]+

        response[3];



    const percentage=

        Math.round(

            (total/30)*100

        );



    pillarPercentage.textContent=

        percentage+"%";



    /*---------------------------------------------------------
        Store Percentage
    ---------------------------------------------------------*/


    answers[currentSpoke].percentage=

        percentage;



    saveAssessment();



    /*---------------------------------------------------------
        Enable Next
    ---------------------------------------------------------*/


    nextButton.disabled=false;



    /*---------------------------------------------------------
        Save Individual Pillar
    ---------------------------------------------------------*/


    saveCurrentPillar(

        percentage

    );

}



/*=============================================================================
    SAVE CURRENT PILLAR
=============================================================================*/


function saveCurrentPillar(

    percentage

){

    const key=

        CTM

            .assessmentData

            [currentSpoke]

            .key;



    if(

        CTM.storage.setPillarScore

    ){

        CTM.storage.setPillarScore(

            key,

            percentage

        );

    }

}

                /*=============================================================================
    SAVE ASSESSMENT
=============================================================================*/


function saveAssessment(){



    if(

        CTM.storage.setAssessment

    ){

        CTM.storage.setAssessment(

            answers

        );

    }



}



/*=============================================================================
    UPDATE PROGRESS
=============================================================================*/


function updateProgress(){



    const progress=

        Math.round(

            (

                (currentSpoke+1)

                /

                TOTAL_SPOKES

            )

            *

            100

        );



    progressFill.style.width=

        progress+"%";



    progressPercentage.textContent=

        progress+"%";



    progressSpoke.textContent=

        "SPOKE "

        +(currentSpoke+1)

        +" OF "

        +TOTAL_SPOKES;



}



/*=============================================================================
    PREVIOUS
=============================================================================*/


function previousSpoke(){



    if(

        currentSpoke===0

    ){

        return;

    }



    currentSpoke--;



    renderSpoke();



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



}



/*=============================================================================
    NEXT
=============================================================================*/


function nextSpoke(){



    if(

        nextButton.disabled

    ){

        return;

    }



    if(

        currentSpoke

        <

        TOTAL_SPOKES-1

    ){



        currentSpoke++;



        renderSpoke();



        window.scrollTo({

            top:0,

            behavior:"smooth"

        });



        return;

    }



    completeAssessment();



}



/*=============================================================================
    COMPLETE ASSESSMENT
=============================================================================*/


async function completeAssessment(){



    const overall=

        calculateOverallPercentage();



    if(

        CTM.storage.setOverallScore

    ){

        CTM.storage.setOverallScore(

            overall

        );

    }



    if(

        CTM.storage.setCompletionStatus

    ){

        CTM.storage.setCompletionStatus(

            "Assessment Completed"

        );

    }



    if(

        CTM.storage.setCurrentPage

    ){

        CTM.storage.setCurrentPage(

            "assessment.html"

        );

    }



    if(

        CTM.storage.setEndTime

    ){

        CTM.storage.setEndTime(

            new Date()

            .toISOString()

        );

    }



    await syncAssessment(

        overall

    );



    CTM.router.go(

        "kaalachakra"

    );

}



/*=============================================================================
    CALCULATE OVERALL PERCENTAGE
=============================================================================*/


function calculateOverallPercentage(){



    let total=0;



    let completed=0;



    Object.keys(

        answers

    ).forEach(function(key){



        if(

            answers[key]

            &&

            answers[key].percentage

            !==

            undefined

        ){



            total+=

                answers[key]

                .percentage;



            completed++;



        }



    });



    if(

        completed===0

    ){

        return 0;

    }



    return Math.round(

        total

        /

        completed

    );

}



/*=============================================================================
    GOOGLE SHEETS SYNC
=============================================================================*/


async function syncAssessment(

    overall

){

    if(

        !CTM.api ||

        !CTM.api.updateAssessment

    ){

        return;

    }



    try{



        const payload={



            visitorId:

                CTM.storage

                .getVisitorId(),



            overallScore:

                overall,



            purpose:

                CTM.storage

                .getPillarScore(

                    "purpose"

                ),



            health:

                CTM.storage

                .getPillarScore(

                    "health"

                ),



            relationships:

                CTM.storage

                .getPillarScore(

                    "relationships"

                ),



            character:

                CTM.storage

                .getPillarScore(

                    "character"

                ),



            financialStewardship:

                CTM.storage

                .getPillarScore(

                    "financialStewardship"

                ),



            mind:

                CTM.storage

                .getPillarScore(

                    "mind"

                ),



            growth:

                CTM.storage

                .getPillarScore(

                    "growth"

                ),



            discipline:

                CTM.storage

                .getPillarScore(

                    "discipline"

                ),



            gratitude:

                CTM.storage

                .getPillarScore(

                    "gratitude"

                ),



            contribution:

                CTM.storage

                .getPillarScore(

                    "contribution"

                ),



            innerMeaning:

                CTM.storage

                .getPillarScore(

                    "innerMeaning"

                ),



            legacy:

                CTM.storage

                .getPillarScore(

                    "legacy"

                )

        };



        await CTM.api.updateAssessment(

            payload

        );



    }

    catch(error){

        console.error(

            error

        );

    }

}

                /*=============================================================================
    RESTORE CURRENT SPOKE
=============================================================================*/


function restoreCurrentSpoke(){



    const saved=

        CTM.storage.getCurrentAssessmentSpoke

        ?

        CTM.storage.getCurrentAssessmentSpoke()

        :

        null;



    if(

        typeof saved==="number" &&

        saved>=0 &&

        saved<TOTAL_SPOKES

    ){

        currentSpoke=saved;

    }

}



/*=============================================================================
    SAVE CURRENT SPOKE
=============================================================================*/


function saveCurrentSpoke(){



    if(

        CTM.storage.setCurrentAssessmentSpoke

    ){

        CTM.storage.setCurrentAssessmentSpoke(

            currentSpoke

        );

    }



}



/*=============================================================================
    UPDATE CURRENT PAGE
=============================================================================*/


function updateCurrentPage(){



    if(

        CTM.storage.setCurrentPage

    ){

        CTM.storage.setCurrentPage(

            "assessment.html"

        );

    }



}



/*=============================================================================
    VALIDATE MODULE
=============================================================================*/


function validateModule(){



    if(

        !CTM.assessmentData ||

        CTM.assessmentData.length!==TOTAL_SPOKES

    ){

        console.error(

            "Assessment data unavailable."

        );



        return false;

    }



    return true;



}



/*=============================================================================
    OVERRIDE NAVIGATION
=============================================================================*/


const originalNext=

    nextSpoke;



nextSpoke=function(){



    saveCurrentSpoke();



    updateCurrentPage();



    originalNext();



};



const originalPrevious=

    previousSpoke;



previousSpoke=function(){



    saveCurrentSpoke();



    updateCurrentPage();



    originalPrevious();



};



/*=============================================================================
    INITIALIZE
=============================================================================*/


function start(){



    if(

        !validateModule()

    ){

        return;

    }



    restoreCurrentSpoke();



    init();



}



/*=============================================================================
    PUBLIC API
=============================================================================*/


return{

    init:start,



    getCurrentSpoke:function(){

        return currentSpoke;

    },



    getAnswers:function(){

        return answers;

    },



    calculateOverall:

        calculateOverallPercentage



};



})();



/*=============================================================================
    APPLICATION START
=============================================================================*/


document.addEventListener(

    "DOMContentLoaded",

    function(){



        CTM.assessment.init();



    }

);



/*=============================================================================

    END OF FILE

=============================================================================*/
