
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
    =========================================================================*/


    function defaultState(){

        return{

            visitor:{

                visitorId:'',

                initialEmotion:'',

                name:'',

                email:'',

                mobile:'',

                district:'',

                state:'',

                referralSource:'Website',

                language:'ta',

                device:''

            },



            journey:{

                currentPage:'landing.html',

                completionStatus:'Started',

                startTime:'',

                endTime:'',

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
        LOAD
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
        SAVE
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
        INIT
    =========================================================================*/


    function init(){

        if(

            !localStorage.getItem(

                STORAGE_KEY

            )

        ){

            save(

                defaultState()

            );

        }

        console.log(

            'CTM Storage Ready'

        );

    }





    /*=========================================================================
        VISITOR
    =========================================================================*/


    function getVisitor(){

        return load().visitor;

    }





    function updateVisitor(data){

        const state = load();

        state.visitor = {

            ...state.visitor,

            ...data

        };

        save(state);

    }

    /*=========================================================================
        CLEAR VISITOR
    =========================================================================*/


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
        INITIAL EMOTION
    =========================================================================*/


    function setInitialEmotion(emotion){

        const state = load();

        state.visitor.initialEmotion =

            emotion;

        save(

            state

        );

    }





    function getInitialEmotion(){

        return load()

            .visitor

            .initialEmotion;

    }





    /*=========================================================================
        VISITOR ID
    =========================================================================*/


    function setVisitorId(visitorId){

        const state = load();

        state.visitor.visitorId =

            visitorId;

        save(

            state

        );

    }





    function getVisitorId(){

        return load()

            .visitor

            .visitorId;

    }





    /*=========================================================================
        CURRENT PAGE
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





    /*=========================================================================
        COMPLETION STATUS
    =========================================================================*/


    function setCompletionStatus(status){

        const state = load();

        state.journey.completionStatus =

            status;

        save(

            state

        );

    }





    function getCompletionStatus(){

        return load()

            .journey

            .completionStatus;

    }





    /*=========================================================================
        START TIME
    =========================================================================*/


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
        END TIME
    =========================================================================*/


    function setEndTime(time){

        const state = load();

        state.journey.endTime =

            time;

        save(

            state

        );

    }





    function getEndTime(){

        return load()

            .journey

            .endTime;

    }

    /*=========================================================================
        ASSESSMENT ANSWERS
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





    function getAnswer(questionId){

        return load()

            .assessment

            .answers[questionId];

    }





    function getAnswers(){

        return load()

            .assessment

            .answers;

    }





    function clearAnswers(){

        const state = load();

        state.assessment.answers = {};

        save(

            state

        );

    }





    /*=========================================================================
        CURRENT QUESTION
    =========================================================================*/


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





    /*=========================================================================
        ASSESSMENT STATUS
    =========================================================================*/


    function markCompleted(){

        const state = load();

        state.assessment.completed =

            true;

        save(

            state

        );

    }





    function markIncomplete(){

        const state = load();

        state.assessment.completed =

            false;

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
        SESSION RESET
    =========================================================================*/


    function reset(){

        localStorage.removeItem(

            STORAGE_KEY

        );



        save(

            defaultState()

        );

    }





    /*=========================================================================
        SESSION EXISTS
    =========================================================================*/


    function exists(){

        return localStorage.getItem(

            STORAGE_KEY

        ) !== null;

    }





    /*=========================================================================
        EXPORT SESSION
    =========================================================================*/


    function exportData(){

        return JSON.stringify(

            load(),

            null,

            4

        );

    }





    /*=========================================================================
        IMPORT SESSION
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
        PUBLIC API
    =========================================================================*/


    return{

        /*--------------------------------------------------
            Initialization
        --------------------------------------------------*/

        init,


        /*--------------------------------------------------
            State
        --------------------------------------------------*/

        load,

        save,


        /*--------------------------------------------------
            Visitor
        --------------------------------------------------*/

        getVisitor,

        updateVisitor,

        clearVisitor,

        hasVisitor,

        setVisitorId,

        getVisitorId,

        setInitialEmotion,

        getInitialEmotion,


        /*--------------------------------------------------
            Journey
        --------------------------------------------------*/

        setCurrentPage,

        getCurrentPage,

        setCompletionStatus,

        getCompletionStatus,

        setStartTime,

        getStartTime,

        setEndTime,

        getEndTime,


        /*--------------------------------------------------
            Assessment
        --------------------------------------------------*/

        saveAnswer,

        getAnswer,

        getAnswers,

        clearAnswers,

        setCurrentQuestion,

        getCurrentQuestion,

        markCompleted,

        markIncomplete,

        isCompleted,


        /*--------------------------------------------------
            Utilities
        --------------------------------------------------*/

        exists,

        reset,

        exportData,

        importData

    };



})();





/*=============================================================================

    END OF FILE

=============================================================================*/
