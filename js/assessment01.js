
/* ==========================================================================
   CTM PATH™ Guided Journey

   FROM SURVIVAL TO LIVING™

   File        : assessment01.js
   Version     : 6.0

   Status      : 🔒 ASSESSMENT-01 CONTROLLER

   Purpose:
   Controls Purpose™ assessment screen

   ========================================================================== */


"use strict";







/* ==========================================================================
   PAGE INITIALIZATION

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){



        initializePurposeAssessment();



    }

);









/* ==========================================================================
   INITIALIZE PURPOSE™

   ========================================================================== */


function initializePurposeAssessment(){



    CTMAssessmentEngine.init(

        1

    );







    generateRatingScale(

        1

    );



    generateRatingScale(

        2

    );



    generateRatingScale(

        3

    );







    setupContinueButton();



    setupBackButton();



}









/* ==========================================================================
   GENERATE RATING SCALE™

   Creates:

   🔴 1 2 3
   🟠 4 5 6 7
   🟢 8 9 10

   ========================================================================== */


function generateRatingScale(questionNumber){



    const container =

        document.getElementById(

            "ratingGroup"

            +

            questionNumber

        );







    if(!container){



        return;


    }







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







        button.textContent =

            score;







        button.addEventListener(

            "click",

            function(){



                CTMAssessmentEngine.selectRating(

                    questionNumber,

                    score,

                    container

                );



                updateContinueState();



            }

        );







        container.appendChild(

            button

        );



    }



}









/* Continue in Batch 1B *//* ==========================================================================
   CONTINUE BUTTON SETUP™

   ========================================================================== */


function setupContinueButton(){



    const button =

        document.getElementById(

            "continueButton"

        );







    if(!button){



        return;


    }







    button.disabled = true;







    button.addEventListener(

        "click",

        function(){



            if(

                !CTMAssessmentEngine.completed()

            ){



                showCompletionMessage();



                return;


            }







            savePurposeAssessment();







            moveToNextJourneyStep();



        }

    );



}









/* ==========================================================================
   UPDATE CONTINUE STATE™

   ========================================================================== */


function updateContinueState(){



    const button =

        document.getElementById(

            "continueButton"

        );







    if(!button){



        return;


    }







    const completed =

        CTMAssessmentEngine.completed();







    button.disabled =

        !completed;







    if(completed){



        button.classList.add(

            "ready"

        );



    }







}









/* ==========================================================================
   COMPLETION MESSAGE™

   ========================================================================== */


function showCompletionMessage(){



    let message =

        document.querySelector(

            ".completion-message"

        );







    if(!message){



        message =

            document.createElement(

                "div"

            );



        message.className =

            "completion-message";







        document

        .querySelector(

            ".score-preview"

        )

        .prepend(

            message

        );



    }







    message.innerHTML = `



        <strong>

        Complete your three reflections

        </strong>


        <br>


        <small>

        உங்கள் மூன்று சிந்தனை கேள்விகளையும் முடிக்கவும்

        </small>



    `;



}









/* ==========================================================================
   SAVE PURPOSE ASSESSMENT™

   ========================================================================== */


function savePurposeAssessment(){



    const payload =

        CTMAssessmentEngine.payload();







    sessionStorage.setItem(

        "ctm_path_assessment_01",

        JSON.stringify(

            payload

        )

    );







    console.log(

        "Purpose Assessment Saved:",

        payload

    );



}









/* ==========================================================================
   NEXT JOURNEY STEP™

   ========================================================================== */


function moveToNextJourneyStep(){



    window.scrollTo({



        top:

            0,



        behavior:

            "smooth"



    });







    setTimeout(

        function(){



            console.log(

                "Assessment-01 Complete"

            );



            console.log(

                "Ready for Spoke-02"

            );



        },

        700

    );



}









/* ==========================================================================
   BACK BUTTON

   ========================================================================== */


function setupBackButton(){



    const button =

        document.querySelector(

            ".button-secondary"

        );







    if(!button){



        return;


    }







    button.addEventListener(

        "click",

        function(){



            window.scrollTo({



                top:

                    0,



                behavior:

                    "smooth"



            });



        }

    );



}









/* Continue in Batch 1C */

/* ==========================================================================
   RESTORE PREVIOUS SESSION™

   ========================================================================== */


function restorePurposeAssessment(){



    const saved =

        sessionStorage.getItem(

            "ctm_path_assessment_01"

        );







    if(!saved){



        return;


    }







    try{



        const data =

            JSON.parse(

                saved

            );







        CTMAssessmentEngine.restore(

            data

        );







        updateContinueState();







    }

    catch(error){



        console.error(

            "Unable to restore assessment:",

            error

        );



    }



}









/* ==========================================================================
   KEYBOARD ACCESSIBILITY™

   ========================================================================== */


function enableKeyboardNavigation(){



    const buttons =

        document.querySelectorAll(

            ".rating-button"

        );







    buttons.forEach(

        function(button){



            button.setAttribute(

                "aria-label",

                "Select rating "

                +

                button.dataset.score

            );







            button.addEventListener(

                "keydown",

                function(event){



                    if(

                        event.key === "Enter"

                    ){



                        button.click();



                    }



                }

            );



        }


    );



}









/* ==========================================================================
   ERROR HANDLING™

   ========================================================================== */


window.addEventListener(

    "error",

    function(event){



        console.error(

            "CTM PATH Assessment Error:",

            event.message

        );



    }

);









/* ==========================================================================
   PREMIUM EXPERIENCE READY™

   ========================================================================== */


function activatePremiumExperience(){



    restorePurposeAssessment();



    enableKeyboardNavigation();







    document

    .querySelectorAll(

        ".question-card"

    )

    .forEach(

        function(card,index){



            card.style.animationDelay =



                (

                    index * 0.15

                )

                +

                "s";



        }


    );



}









/* ==========================================================================
   FINAL BOOTSTRAP

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){



        activatePremiumExperience();



    }

);









/* ==========================================================================
   END OF FILE


   File        : assessment01.js

   Version     : 6.0


   Status      : 🔒 CTM PATH™ ASSESSMENT-01 CONTROLLER MASTER


   Experience:

   Life Map™

        ↓

   Purpose™

        ↓

   Reflection

        ↓

   Score Reveal

        ↓

   Learner → Leader → Legend™



   ========================================================================== */
