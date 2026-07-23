
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    storage.js

    PURPOSE

    Client Session Storage Manager

    RESPONSIBILITIES

    • Maintain Browser Session
    • Save Visitor Session
    • Restore Journey State
    • Store Temporary Assessment Draft

    NOTE

    Google Sheet is the master database.

    This module manages only
    browser-side persistence.

=============================================================================*/


'use strict';



/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/


window.CTM = window.CTM || {};





/*=============================================================================
    STORAGE MODULE
=============================================================================*/


CTM.storage = (function(){





    /*=========================================================================
        CONSTANTS
    =========================================================================*/


    const STORAGE_KEY =

        'CTM_PATH_SESSION_V1';





    /*=========================================================================
        DEFAULT SESSION

        Created for a new visitor

    =========================================================================*/


    function defaultState(){


        return{


            visitor:{


                visitorId:'',


                name:'',


                email:'',


                mobile:'',


                district:'',


                state:'',


                language:'ta',


                device:''


            },



            journey:{


                currentPage:'index.html',


                startTime:'',


                lastUpdated:''


            },



            assessment:{


                answers:{},


                currentQuestion:0,


                completed:false



            }



        };


    }






    /*=========================================================================
        LOAD SESSION

    =========================================================================*/


    function load(){


        try{


            const data =

                localStorage.getItem(

                    STORAGE_KEY

                );



            if(!data){


                return defaultState();


            }



            return JSON.parse(data);



        }


        catch(error){


            console.error(

                'CTM Storage Load Error',

                error

            );



            return defaultState();



        }


    }


    /*=========================================================================
        SAVE SESSION

        Writes current browser state

    =========================================================================*/


    function save(state){


        try{


            state.journey.lastUpdated =

                new Date().toISOString();



            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify(state)

            );



            return true;



        }


        catch(error){


            console.error(

                'CTM Storage Save Error',

                error

            );



            return false;



        }


    }





    /*=========================================================================
        GET STATE

    =========================================================================*/


    function getState(){


        return load();


    }





    /*=========================================================================
        SET STATE

    =========================================================================*/


    function setState(state){


        return save(

            state

        );


    }





    /*=========================================================================
        VISITOR SESSION

    =========================================================================*/


    function getVisitor(){


        return load()

            .visitor;


    }





    function updateVisitor(data){


        const state = load();



        state.visitor = {


            ...state.visitor,


            ...data


        };



        save(

            state

        );


    }





    function clearVisitor(){


        const state = load();



        state.visitor =


            defaultState()

                .visitor;



        save(

            state

        );


    }





    function hasVisitor(){


        const visitor =

            getVisitor();



        return Boolean(

            visitor.visitorId ||

            visitor.name

        );


    }





    /*=========================================================================
        JOURNEY STATE

    =========================================================================*/


    function setCurrentPage(page){


        const state = load();



        state.journey.currentPage =

            page;



        save(

            state

        );


    }





    function getCurrentPage(){


        return load()

            .journey

            .currentPage;


    }





    function setStartTime(time){


        const state = load();



        state.journey.startTime =

            time;



        save(

            state

        );


    }





    function getStartTime(){


        return load()

            .journey

            .startTime;


    }




    /*=========================================================================
        ASSESSMENT DRAFT

        Temporary browser storage only.

        Final values sync through api.js
        to Google Sheet.

    =========================================================================*/


    function saveAnswer(

        questionId,

        answer

    ){


        const state = load();



        state.assessment.answers[questionId] =

            answer;



        save(

            state

        );


    }





    function getAnswers(){


        return load()

            .assessment

            .answers;


    }





    function setCurrentQuestion(index){


        const state = load();



        state.assessment.currentQuestion =

            index;



        save(

            state

        );


    }





    function getCurrentQuestion(){


        return load()

            .assessment

            .currentQuestion;


    }





    function markCompleted(){


        const state = load();



        state.assessment.completed =

            true;



        save(

            state

        );


    }





    function isCompleted(){


        return load()

            .assessment

            .completed;


    }





    /*=========================================================================
        SESSION CHECK

    =========================================================================*/


    function exists(){


        return localStorage.getItem(

            STORAGE_KEY

        ) !== null;


    }





    /*=========================================================================
        RESET

        Development / New Visitor

    =========================================================================*/


    function reset(){


        localStorage.removeItem(

            STORAGE_KEY

        );


    }





    /*=========================================================================
        EXPORT

        Useful for debugging

    =========================================================================*/


    function exportData(){


        return JSON.stringify(

            load(),

            null,

            4

        );


    }





    /*=========================================================================
        IMPORT

    =========================================================================*/


    function importData(data){


        try{


            const state =

                typeof data === 'string'

                    ?

                JSON.parse(data)

                    :

                data;



            return save(

                state

            );


        }


        catch(error){


            console.error(

                'CTM Storage Import Error',

                error

            );



            return false;


        }


    }





    /*=========================================================================
        INIT

    =========================================================================*/


    function init(){


        if(!exists()){


            save(

                defaultState()

            );


        }



        console.log(

            'CTM Storage Ready'

        );


    }





    /*=========================================================================
        PUBLIC API

    =========================================================================*/


    return{


        init,


        load,


        save,


        getState,


        setState,


        getVisitor,


        updateVisitor,


        clearVisitor,


        hasVisitor,


        setCurrentPage,


        getCurrentPage,


        setStartTime,


        getStartTime,


        saveAnswer,


        getAnswers,


        setCurrentQuestion,


        getCurrentQuestion,


        markCompleted,


        isCompleted,


        exists,


        reset,


        exportData,


        importData


    };



})();



/*=============================================================================

    END OF FILE

=============================================================================*/            
