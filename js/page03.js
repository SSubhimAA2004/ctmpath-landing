
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   page03.js

   PAGE:
   KALA CHAKRA™ LIFE ASSESSMENT™

   VERSION:
   10.0


   RESPONSIBILITIES:

   ✓ Create Score Selectors
   ✓ Capture Life Pillar Scores
   ✓ Save Assessment Progress
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
    */


    const buttons =

        card.querySelectorAll(

            ".score-options button"

        );




    buttons.forEach(

        function(button){


            button.classList.remove(

                "selected"

            );


        }

    );






    /*
       Highlight selected score
    */


    selectedButton.classList.add(

        "selected"

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

        score

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






    assessmentData =


        JSON.parse(saved);







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



                button.classList.add(

                    "selected"

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

