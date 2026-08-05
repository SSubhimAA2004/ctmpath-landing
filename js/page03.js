
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   page03.js

   PAGE:
   KALA CHAKRA™ LIFE ASSESSMENT™

   VERSION:
   10.1


   RESPONSIBILITIES:

   ✓ Create Score Selectors
   ✓ Capture Life Pillar Scores
   ✓ Apply Score Colour States
   ✓ Save Assessment Progress
   ✓ Restore Assessment Progress
   ✓ Prepare Page04 Transition


========================================================================== */


(function(){


"use strict";





/* ==========================================================================
   PAGE CONFIGURATION
========================================================================== */


const PAGE03_CONFIG = {


    storageKey:

        "CTM_PAGE03_ALIGNMENT",



    nextPage:

        "page04.html",



    totalPillars:

        12



};








/* ==========================================================================
   KALA CHAKRA™ PILLARS
========================================================================== */


const PILLARS = [


    "Purpose",


    "Health",


    "Relationships",


    "Character & Integrity",


    "Learning & Mastery",


    "Career & Contribution",


    "Financial Freedom",


    "Time Freedom",


    "Community & Tribe",


    "Systems & Productivity",


    "Service & Impact",


    "Vision & Legacy"



];









/* ==========================================================================
   ASSESSMENT STATE
========================================================================== */


let assessmentData = {};









/* ==========================================================================
   INITIALIZE PAGE
========================================================================== */


function initPage03(){


    console.log(

        "CTM PATH™ MILLIONAIRES™ Page03 Loaded"

    );



    createScoreSelectors();



    restoreAssessment();



    bindNavigation();



}









/* ==========================================================================
   CREATE SCORE SELECTORS
========================================================================== */


function createScoreSelectors(){



    const cards =


        document.querySelectorAll(

            ".pillar-card"

        );






    cards.forEach(

        function(card,index){



            const selector =


                card.querySelector(

                    ".score-selector"

                );






            if(!selector){

                return;

            }






            const buttonsContainer =


                document.createElement(

                    "div"

                );






            buttonsContainer.className =

                "score-options";








            for(

                let score = 0;

                score <= 10;

                score++

            ){



                const button =


                    document.createElement(

                        "button"

                    );






                button.type =

                    "button";






                button.textContent =

                    score;






                button.dataset.pillar =

                    PILLARS[index];






                button.dataset.score =

                    score;








                button.addEventListener(

                    "click",

                    function(){



                        selectScore(

                            card,

                            PILLARS[index],

                            score,

                            button

                        );



                    }


                );






                buttonsContainer.appendChild(

                    button

                );



            }





            selector.appendChild(

                buttonsContainer

            );



        }


    );


}









/* ==========================================================================
   SCORE COLOUR CLASSIFICATION
========================================================================== */


function getScoreClass(score){



    const numericScore =

        Number(score);





    if(numericScore <= 3){


        return "score-low";


    }





    if(numericScore <= 7){


        return "score-mid";


    }





    return "score-high";


}









/* ==========================================================================
   CLEAR SCORE STATE
========================================================================== */


function clearScoreState(button){



    button.classList.remove(

        "selected",

        "score-low",

        "score-mid",

        "score-high"

    );


}









/* ==========================================================================
   APPLY SCORE STATE
========================================================================== */


function applyScoreState(

    button,

    score

){



    if(!button){

        return;

    }





    clearScoreState(

        button

    );





    button.classList.add(

        "selected",

        getScoreClass(score)

    );


}









/* ==========================================================================
   SCORE SELECTION
========================================================================== */


function selectScore(

    card,

    pillar,

    score,

    selectedButton

){



    /*
       Remove previous selection
       and previous score colour.
    */


    const buttons =

        card.querySelectorAll(

            ".score-options button"

        );




    buttons.forEach(

        function(button){


            clearScoreState(

                button

            );


        }

    );







    /*
       Highlight selected score
       with correct colour state.

       0–3  = Red
       4–7  = Orange
       8–10 = Green
    */


    applyScoreState(

        selectedButton,

        score

    );







    /*
       Highlight completed pillar
    */


    card.classList.add(

        "scored"

    );








    /*
       Save score
    */


    assessmentData[pillar] = score;



    saveAssessment();





    console.log(

        pillar,

        "Score:",

        score,

        "State:",

        getScoreClass(score)

    );


}









/* ==========================================================================
   SAVE ASSESSMENT
========================================================================== */


function saveAssessment(){



    sessionStorage.setItem(

        PAGE03_CONFIG.storageKey,

        JSON.stringify(

            assessmentData

        )

    );



}










/* ==========================================================================
   RESTORE ASSESSMENT
========================================================================== */


function restoreAssessment(){



    const saved =


        sessionStorage.getItem(

            PAGE03_CONFIG.storageKey

        );






    if(!saved){


        return;


    }






    try{



        assessmentData =


            JSON.parse(saved) || {};



    }


    catch(error){



        console.error(

            "CTM PATH™ Page03 restore failed:",

            error

        );



        assessmentData = {};



        return;


    }








    const cards =


        document.querySelectorAll(

            ".pillar-card"

        );








    cards.forEach(

        function(card,index){



            const pillar =

                PILLARS[index];






            const score =

                assessmentData[pillar];






            if(score === undefined){

                return;

            }






            card.classList.add(

                "scored"

            );






            const button =


                card.querySelector(

                    `.score-options button[data-score="${score}"]`

                );






            if(button){



                applyScoreState(

                    button,

                    score

                );



            }



        }


    );



}









/* ==========================================================================
   NAVIGATION TO PAGE 04
========================================================================== */


function bindNavigation(){



    const button =


        document.getElementById(

            "show-alignment-button"

        );






    if(!button){


        return;


    }





    button.addEventListener(

        "click",

        function(){





            saveAssessment();







            const completed =

                Object.keys(

                    assessmentData

                ).length;








            console.log(

                "KALA CHAKRA™ Completion:",

                completed,

                "/",

                PAGE03_CONFIG.totalPillars

            );









            /*
               Future backend connection:

               api.saveAssessment(
                   assessmentData
               )

            */







            window.location.href =

                PAGE03_CONFIG.nextPage;



        }


    );



}










/* ==========================================================================
   PUBLIC PAGE MODULE
========================================================================== */


window.CTM_PAGE03 = {


    init:

        initPage03,


    getData:

        function(){


            return assessmentData;


        }



};







})();

