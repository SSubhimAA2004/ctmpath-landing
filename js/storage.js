
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE
    storage.js

    PURPOSE

    Client Storage Manager

    RESPONSIBILITIES

    • Application State
    • Visitor Registration
    • Assessment Answers
    • Scores
    • Session Restore
    • Clear Session

    NOTE

    This module manages browser storage only.

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

    const STORAGE_KEY = 'CTM_PATH';

    /*=========================================================================
        DEFAULT DATA
    =========================================================================*/

    function defaultState(){

        return{

            visitor:{

                name:'',
                email:'',
                mobile:'',
                district:'',
                state:''

            },

            assessment:{

                currentPillar:0,

                currentQuestion:0,

                answers:{},

                pillarScores:{},

                overallScore:0

            },

            results:{

                diagnosis:null,

                prescription:null

            }

        };

    }

    /*=========================================================================
        LOAD
    =========================================================================*/

    function load(){

        try{

            const data = localStorage.getItem(

                STORAGE_KEY

            );

            if(!data){

                return defaultState();

            }

            return JSON.parse(data);

        }

        catch(error){

            console.error(

                'Storage Load Error',

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

            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify(state)

            );

            return true;

        }

        catch(error){

            console.error(

                'Storage Save Error',

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

        return save(state);

    }

    /*=========================================================================
        UPDATE VISITOR
    =========================================================================*/

    function updateVisitor(data){

        const state = load();

        state.visitor = {

            ...state.visitor,

            ...data

        };

        save(state);

    }

    /*=========================================================================
        SAVE ANSWER
    =========================================================================*/

    function saveAnswer(

        pillar,

        question,

        score

    ){

        const state = load();

        if(

            !state.assessment.answers[pillar]

        ){

            state.assessment.answers[pillar]={};

        }

        state.assessment.answers[pillar][question]=score;

        save(state);

    }

    /*=========================================================================
        SAVE PILLAR SCORE
    =========================================================================*/

    function savePillarScore(

        pillar,

        score

    ){

        const state = load();

        state.assessment.pillarScores[pillar]=score;

        save(state);

    }

    /*=========================================================================
        UPDATE OVERALL SCORE
    =========================================================================*/

    function updateOverallScore(

        score

    ){

        const state = load();

        state.assessment.overallScore = score;

        save(state);

    }

    /*=========================================================================
        CURRENT PILLAR
    =========================================================================*/

    function setCurrentPillar(index){

        const state = load();

        state.assessment.currentPillar=index;

        save(state);

    }

    function getCurrentPillar(){

        return load()

            .assessment

            .currentPillar;

    }

    /*=========================================================================
        CURRENT QUESTION
    =========================================================================*/

    function setCurrentQuestion(index){

        const state = load();

        state.assessment.currentQuestion=index;

        save(state);

    }

    function getCurrentQuestion(){

        return load()

            .assessment

            .currentQuestion;

    }

    /*=========================================================================
        RESET
    =========================================================================*/

    function reset(){

        localStorage.removeItem(

            STORAGE_KEY

        );

    }

    /*=========================================================================
        EXISTS
    =========================================================================*/

    function exists(){

        return(

            localStorage.getItem(

                STORAGE_KEY

            )!==null

        );

    }

    /*=========================================================================
        INIT
    =========================================================================*/

    function init(){

        if(

            !exists()

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
        PUBLIC API
    =========================================================================*/

    return{

        init,

        load,

        save,

        getState,

        setState,

        updateVisitor,

        saveAnswer,

        savePillarScore,

        updateOverallScore,

        setCurrentPillar,

        getCurrentPillar,

        setCurrentQuestion,

        getCurrentQuestion,

        reset,

        exists

    };

})();

/*=============================================================================
    END OF FILE
=============================================================================*/
