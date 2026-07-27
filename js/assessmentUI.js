
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/assessmentUI.js
   Version     : 2.0

   Status      : 🔒 PREMIUM EXPERIENCE ENGINE


   PURPOSE

   Guided Assessment Experience Controller™


   Owns:

   ✓ Premium UI rendering
   ✓ Component communication
   ✓ Question presentation
   ✓ Rating interaction
   ✓ Visual feedback
   ✓ Journey transitions


   Does NOT:

   ✗ Calculate scores
   ✗ Own assessment state
   ✗ Store database records


   ========================================================================== */


"use strict";


window.CTM = window.CTM || {};



/* ==========================================================================
   CTM.UI PREMIUM EXPERIENCE ENGINE
   ========================================================================== */


CTM.UI = (function(){



    /* ======================================================================
       PRIVATE STATE
       ====================================================================== */


    let uiState = {



        initialized : false,



        currentQuestion : 1,



        selectedRating : null,



        animationActive : false



    };









    /* ======================================================================
       PRIVATE HELPERS
       ====================================================================== */


    function $(selector){


        return document.querySelector(selector);


    }







    function $all(selector){


        return document.querySelectorAll(selector);


    }







    function exists(selector){


        return $(selector) !== null;


    }







    function setText(

        selector,

        value

    ){



        if(exists(selector)){


            $(selector).textContent = value;


        }


    }







    function addClass(

        selector,

        className

    ){



        if(exists(selector)){


            $(selector).classList.add(

                className

            );


        }


    }







    function removeClass(

        selector,

        className

    ){



        if(exists(selector)){


            $(selector).classList.remove(

                className

            );


        }


    }









    /* ======================================================================
       INITIALIZE PREMIUM EXPERIENCE
       ====================================================================== */


    function init(){



        uiState.initialized = true;



        bindRatingEvents();



        render();



        console.log(

            "CTM Premium UI Initialized"

        );



    }


          
    /* ======================================================================
       MASTER RENDER PIPELINE

       Controls complete visual refresh

       ====================================================================== */


    function render(){



        renderQuestion();



        syncStatusCard();



        syncDashboard();



        updateProgress();



    }









    /* ======================================================================
       RENDER CURRENT QUESTION

       ====================================================================== */


    function renderQuestion(){



        const state =

            CTM.Engine.getState();







        if(!state){


            return;


        }







        const data =

            state.data;







        if(!data){


            return;


        }







        const question =

            data.questions[

                uiState.currentQuestion - 1

            ];







        if(!question){


            return;


        }









        setText(

            "#questionTamil",

            question.tamil

        );







        setText(

            "#questionEnglish",

            question.english

        );







        setText(

            "#questionNumber",

            uiState.currentQuestion +

            " / " +

            data.questions.length

        );



    }









    /* ======================================================================
       SYNCHRONIZE STATUS CARD

       ====================================================================== */


    function syncStatusCard(){



        const result =

            CTM.Engine.getResult();







        if(!result){


            return;


        }







        setText(

            "#currentStatus",

            result.title

        );







        setText(

            "#overallScore",

            result.percentage +

            "%"

        );



    }









    /* ======================================================================
       SYNCHRONIZE KALA CHAKRA DASHBOARD

       ====================================================================== */


    function syncDashboard(){



        const result =

            CTM.Engine.getResult();







        if(!result){


            return;


        }







        setText(

            "#dashboardRawScore",

            result.raw +

            "/30"

        );







        setText(

            "#dashboardPercentage",

            result.percentage +

            "%"

        );







        setText(

            "#dashboardLevel",

            result.title

        );



    }









    /* ======================================================================
       UPDATE PROGRESS

       ====================================================================== */


    function updateProgress(){



        const state =

            CTM.Engine.getState();







        if(!state){


            return;


        }







        const progress =

            CTM.Engine.getProgress(

                12

            );







        setText(

            "#progressCurrent",

            progress.answered

        );







        setText(

            "#progressTotal",

            progress.total

        );



    }









    /* ======================================================================
       RATING EVENT BRIDGE

       Connects premium rating component

       to CTM Engine

       ====================================================================== */


    function bindRatingEvents(){



        document.addEventListener(

            "ctmRatingSelected",

            function(event){



                if(!event.detail){


                    return;


                }







                const score =

                    event.detail.rating;







                uiState.selectedRating =

                    score;







                const state =

                    CTM.Engine.getState();







                const question =

                    uiState.currentQuestion;







                CTM.Engine.setAnswer(

                    question,

                    score

                );







                updateRatingFeedback(

                    score

                );







                render();



            }

        );



    }

          
    /* ======================================================================
       RATING FEEDBACK

       Provides immediate emotional feedback
       after user selection.

       ====================================================================== */


    function updateRatingFeedback(score){



        setText(

            "#currentRatingValue",

            score

        );







        addClass(

            "#ratingScale",

            "rating-confirmed"

        );







        setTimeout(

            function(){



                removeClass(

                    "#ratingScale",

                    "rating-confirmed"

                );



            },

            500

        );



    }









    /* ======================================================================
       QUESTION TRANSITION

       Creates smooth movement between
       reflection moments.

       ====================================================================== */


    function transitionQuestion(){



        if(uiState.animationActive){


            return;


        }







        uiState.animationActive = true;







        addClass(

            "#questionCard",

            "question-transition"

        );







        setTimeout(

            function(){



                removeClass(

                    "#questionCard",

                    "question-transition"

                );



                uiState.animationActive = false;



            },

            400

        );



    }









    /* ======================================================================
       NEXT QUESTION

       ====================================================================== */


    function nextQuestion(){



        const state =

            CTM.Engine.getState();







        if(!state){


            return;


        }







        if(

            uiState.currentQuestion <

            12

        ){



            uiState.currentQuestion += 1;







            CTM.Engine.nextQuestion();







            transitionQuestion();







            render();



            window.scrollTo({



                top:0,



                behavior:"smooth"



            });



        }



    }









    /* ======================================================================
       PREVIOUS QUESTION

       ====================================================================== */


    function previousQuestion(){



        if(

            uiState.currentQuestion > 1

        ){



            uiState.currentQuestion -= 1;







            CTM.Engine.previousQuestion();







            transitionQuestion();







            render();



        }



    }









    /* ======================================================================
       DASHBOARD EVENT BRIDGE

       Notifies premium components

       ====================================================================== */


    function notifyDashboard(){



        document.dispatchEvent(



            new CustomEvent(

                "ctmDashboardUpdated"

                )



        );



    }









    /* ======================================================================
       REFRESH EXPERIENCE

       ====================================================================== */


    function refresh(){



        render();



        notifyDashboard();



    }

          

    /* ======================================================================
       CHECK COMPONENT READINESS

       Ensures premium components are available.

       ====================================================================== */


    function checkComponents(){



        const required = [



            "#ratingScale",


            "#statusCard",


            "#kaalachakraDashboard"



        ];







        return required.every(

            function(selector){



                return exists(selector);



            }

        );



    }









    /* ======================================================================
       START EXPERIENCE

       Main entry point.

       ====================================================================== */


    function start(){



        if(!checkComponents()){



            console.warn(

                "CTM Premium Components Missing"

            );



        }







        init();



    }









    /* ======================================================================
       PUBLIC API

       ====================================================================== */


    return {



        init:init,



        start:start,







        render:render,



        refresh:refresh,







        renderQuestion:renderQuestion,







        nextQuestion:nextQuestion,



        previousQuestion:previousQuestion,







        updateRatingFeedback:

            updateRatingFeedback,







        transitionQuestion:

            transitionQuestion,







        checkComponents:

            checkComponents



    };





})();









/* ==========================================================================
   LOCK PREMIUM UI ENGINE

   ========================================================================== */


Object.freeze(

    CTM.UI

);









/* ==========================================================================
   END OF FILE

   assessmentUI.js

   Version : 2.0


   Status

   ✓ PREMIUM EXPERIENCE ENGINE READY
   ✓ COMPONENT BRIDGE READY
   ✓ RATING FLOW CONNECTED
   ✓ DASHBOARD EVENTS CONNECTED
   ✓ UI API LOCKED


   ========================================================================== */

