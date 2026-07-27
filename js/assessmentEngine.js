
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/assessmentEngine.js
   Version     : 1.3

   Status      : 🔒 SYNTAX STABILIZATION


   PURPOSE

   Assessment State Engine™


   Owns:

   ✓ Assessment lifecycle
   ✓ Current pillar state
   ✓ Answer storage
   ✓ Progress tracking
   ✓ Result availability state
   ✓ State retrieval


   Does NOT:

   ✗ Render UI
   ✗ Calculate final scores
   ✗ Load components
   ✗ Own question content


   ========================================================================== */


"use strict";


window.CTM = window.CTM || {};



/* ==========================================================================
   ENGINE NAMESPACE
   ========================================================================== */


CTM.Engine = (function(){



    /* ======================================================================
       PRIVATE STATE
       ====================================================================== */


    let state = {



        assessmentId : null,


        pillarId : null,


        answers : {},


        result : null,


        currentQuestion : 1,


        completed : false,


        startedAt : null,


        updatedAt : null



    };









    /* ======================================================================
       INIT

       Starts assessment session

       ====================================================================== */


    function init(pillarId){



        state = {



            assessmentId :

                "CTM-ASSESSMENT-" +

                Date.now(),



            pillarId : pillarId,



            answers : {},



            result : null,



            currentQuestion : 1,



            completed : false,



            startedAt :

                new Date().toISOString(),



            updatedAt :

                new Date().toISOString()



        };







        console.log(


            "CTM Engine Initialized",


            state


        );







        return state;


    }









    /* ======================================================================
       LOAD

       Restore existing state

       ====================================================================== */


    function load(savedState){



        if(!savedState){



            return state;



        }







        state = Object.assign(



            {},



            state,



            savedState



        );







        state.updatedAt =


            new Date().toISOString();







        return state;


    }









    /* ======================================================================
       RESET

       Clear assessment

       ====================================================================== */


    function reset(){



        state = {



            assessmentId : null,


            pillarId : null,


            answers : {},


            result : null,


            currentQuestion : 1,


            completed : false,


            startedAt : null,


            updatedAt : null



        };







        return state;


    }

                  /* ======================================================================
       GET STATE

       Returns current engine state

       ====================================================================== */


    function getState(){


        return state;


    }









    /* ======================================================================
       SET ANSWER

       Stores user response

       ====================================================================== */


    function setAnswer(

        questionId,

        value

    ){



        state.answers[questionId] = {



            value : value,



            timestamp :

                new Date().toISOString()



        };







        state.updatedAt =


            new Date().toISOString();







        return state.answers[questionId];


    }









    /* ======================================================================
       GET ANSWER

       Retrieve response

       ====================================================================== */


    function getAnswer(questionId){



        return (



            state.answers[questionId]



            ||



            null



        );


    }









    /* ======================================================================
       REMOVE ANSWER

       ====================================================================== */


    function removeAnswer(questionId){



        delete state.answers[questionId];







        state.updatedAt =


            new Date().toISOString();



    }









    /* ======================================================================
       RESULT AVAILABILITY

       Compatibility Layer

       Does NOT calculate scores.

       Stores and retrieves result generated
       by calculation layer.

       ====================================================================== */


    function hasResult(){



        return state.result !== null;



    }









    function getResult(){



        return state.result;



    }









    function setResult(result){



        state.result = result;







        state.updatedAt =


            new Date().toISOString();







        return state.result;



    }

              
    /* ======================================================================
       NAVIGATION

       ====================================================================== */


    function nextQuestion(){



        state.currentQuestion += 1;







        state.updatedAt =


            new Date().toISOString();







        return state.currentQuestion;



    }









    function previousQuestion(){



        if(

            state.currentQuestion > 1

        ){



            state.currentQuestion -= 1;



        }







        state.updatedAt =


            new Date().toISOString();







        return state.currentQuestion;



    }









    function goToQuestion(questionNumber){



        state.currentQuestion = questionNumber;







        state.updatedAt =


            new Date().toISOString();







        return state.currentQuestion;



    }









    /* ======================================================================
       VALIDATION

       Ensures required answers exist

       ====================================================================== */


    function validate(){



        const answered =


            Object.keys(


                state.answers


            ).length;







        return answered > 0;



    }









    /* ======================================================================
       COMPLETE ASSESSMENT

       ====================================================================== */


    function complete(){



        state.completed = true;







        state.updatedAt =


            new Date().toISOString();







        return {



            completed : true,



            state : state



        };



    }









    /* ======================================================================
       GET PROGRESS

       ====================================================================== */


    function getProgress(totalQuestions){



        const answered =


            Object.keys(


                state.answers


            ).length;







        return {



            answered : answered,







            total : totalQuestions,







            percentage :



                totalQuestions



                ?



                Math.round(



                    (



                        answered /



                        totalQuestions



                    )



                    *



                    100



                )



                :



                0



        };



    }

              
    /* ======================================================================
       SERIALIZE STATE

       Returns safe copy

       ====================================================================== */


    function serialize(){



        return JSON.parse(



            JSON.stringify(


                state


            )



        );



    }









    /* ======================================================================
       SET STATE

       Restore external state

       ====================================================================== */


    function setState(newState){



        if(!newState){



            return state;



        }







        state = Object.assign(



            {},



            state,



            newState



        );







        state.updatedAt =


            new Date().toISOString();







        return state;



    }









    /* ======================================================================
       PUBLIC API

       ====================================================================== */


    return {



        init : init,



        load : load,



        reset : reset,







        getState : getState,



        setState : setState,



        serialize : serialize,







        setAnswer : setAnswer,



        getAnswer : getAnswer,



        removeAnswer : removeAnswer,







        hasResult : hasResult,



        getResult : getResult,



        setResult : setResult,







        nextQuestion : nextQuestion,



        previousQuestion : previousQuestion,



        goToQuestion : goToQuestion,







        validate : validate,



        complete : complete,







        getProgress : getProgress



    };





})();









/* ==========================================================================
   LOCK ENGINE

   ========================================================================== */


Object.freeze(

    CTM.Engine

);









/* ==========================================================================
   END OF FILE

   assessmentEngine.js

   Version : 1.3

   Status

   ✓ SYNTAX VALIDATED
   ✓ CTM.Engine RESTORED
   ✓ RESULT API RESTORED
   ✓ STATE MANAGEMENT ACTIVE

   ==========================================================================
*/

