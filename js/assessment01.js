
/* ==========================================================================
   CTM PATH™ Guided Journey

   FROM SURVIVAL TO LIVING™

   File        : assessment01.js
   Version     : 5.0

   Status      : 🔒 PURPOSE™ SCREEN CONTROLLER

   Assessment  : Spoke 01

   ========================================================================== */


"use strict";







/* ==========================================================================
   PAGE CONFIGURATION
   ========================================================================== */


const Assessment01Config = {


    spoke:1,


    nextPage:

        "assessment-02.html",


    storageKey:

        "ctm_path_assessment_01"



};








/* ==========================================================================
   INITIALIZE PAGE
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){



        initializeAssessment(

            Assessment01Config.spoke

        );



        setupContinueButton();



        restoreSavedAssessment();



    }

);








/* ==========================================================================
   RESTORE SAVED DATA
   ========================================================================== */


function restoreSavedAssessment(){



    const saved =

        localStorage.getItem(

            Assessment01Config.storageKey

        );



    if(!saved){

        return;

    }



    try{


        const data =

            JSON.parse(

                saved

            );



        restoreResponses(

            data

        );


    }


    catch(error){



        console.error(

            "Unable to restore assessment data",

            error

        );


    }



}








/* ==========================================================================
   CONTINUE BUTTON
   ========================================================================== */


function setupContinueButton(){



    const button =

        document.getElementById(

            "continueButton"

        );



    if(!button){

        return;

    }





    button.addEventListener(

        "click",

        function(){



            handleContinue();



        }

    );


}







/* ==========================================================================
   HANDLE CONTINUE

   ========================================================================== */


function handleContinue(){



    if(

        !isAssessmentComplete()

    ){


        showIncompleteMessage();


        return;


    }





    const payload =

        getAssessmentPayload();





    saveAssessmentProgress(

        payload

    );





    window.location.href =

        Assessment01Config.nextPage;



}








/* ==========================================================================
   SAVE PROGRESS
   ========================================================================== */


function saveAssessmentProgress(payload){



    localStorage.setItem(

        Assessment01Config.storageKey,

        JSON.stringify(

            payload

        )

    );



}








/* ==========================================================================
   VALIDATION MESSAGE
   ========================================================================== */


function showIncompleteMessage(){



    const message =

        document.querySelector(

            ".current-level-message"

        );



    if(message){



        message.innerHTML =


            "Please complete all 3 reflections before continuing."

            +

            "<br>"

            +

            "தொடர்வதற்கு முன் மூன்று கேள்விகளுக்கும் பதிலளிக்கவும்.";



        message.classList.add(

            "warning"

        );


    }



}


/* ==========================================================================
   SMOOTH SCROLL SUPPORT

   ========================================================================== */


function scrollToTop(){



    window.scrollTo({


        top:0,


        behavior:"smooth"



    });



}








/* ==========================================================================
   RATING INTERACTION FEEDBACK

   ========================================================================== */


document.addEventListener(

    "click",

    function(event){



        if(

            event.target.classList.contains(

                "rating-button"

            )

        ){



            const questionCard =

                event.target.closest(

                    ".question-card"

                );



            if(questionCard){



                questionCard.classList.add(

                    "answered"

                );


            }



        }



    }


);








/* ==========================================================================
   CONTINUE BUTTON STATE

   ========================================================================== */


function updateContinueButtonState(){



    const button =

        document.getElementById(

            "continueButton"

        );



    if(!button){

        return;

    }





    if(

        isAssessmentComplete()

    ){



        button.disabled = false;



        button.innerHTML = `


            SAVE & CONTINUE →

            <br>

            தொடருங்கள்


        `;



    }

    else{


        button.disabled = true;



    }


}








/* ==========================================================================
   WATCH RESPONSE CHANGES

   ========================================================================== */


const originalCalculateScore =

    calculateCurrentSpokeScore;





calculateCurrentSpokeScore = function(){



    originalCalculateScore();



    updateContinueButtonState();



};








/* ==========================================================================
   COMPLETION MESSAGE

   ========================================================================== */


function showCompletionMessage(){



    const message =

        document.querySelector(

            ".current-level-message"

        );



    if(!message){

        return;

    }





    const payload =

        getAssessmentPayload();





    message.innerHTML = `



        Your Purpose™ Alignment:

        <strong>

        ${payload.percentage}/100

        </strong>


        <br>


        ${payload.level}



    `;



}








/* ==========================================================================
   PAGE TRANSITION HANDLER

   ========================================================================== */


function goToNextAssessment(){



    window.location.href =

        Assessment01Config.nextPage;



}








/* ==========================================================================
   INITIAL BUTTON STATE

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        updateContinueButtonState();


        scrollToTop();


    }

);








/* ==========================================================================
   END OF FILE


   File        : assessment01.js

   Version     : 5.0


   Status      : 🔒 CTM PATH™ PURPOSE™ SCREEN CONTROLLER


   ========================================================================== */


