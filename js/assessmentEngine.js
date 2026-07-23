
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    assessmentEngine.js

    PURPOSE

    Master Assessment Engine

    RESPONSIBILITIES

    • Initialize Assessment
    • Load Pillars
    • Manage Questions
    • Coordinate UI
    • Coordinate Scoring
    • Save Progress
    • Navigate Assessment

    VERSION

    1.0

=============================================================================*/

'use strict';

/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/

window.CTM = window.CTM || {};

/*=============================================================================
    ASSESSMENT ENGINE
=============================================================================*/

CTM.assessmentEngine = (function(){

    /*=========================================================================
        STATE
    =========================================================================*/

    const state = {

        pillarIndex : 0,

        questionIndex : 0,

        answers : [],

        pillarScores : [],

        visitor : null

    };



    /*=========================================================================
        INITIALIZE
    =========================================================================*/

    function init(){

        loadVisitor();

        initializeAnswers();

        bindEvents();

        renderCurrentQuestion();

    }



    /*=========================================================================
        LOAD VISITOR
    =========================================================================*/

    function loadVisitor(){

        const appState =

            CTM.storage.getState();

        state.visitor =

            appState.visitor || {};

        CTM.assessmentUI.renderVisitor(

            state.visitor.name || ''

        );

    }



    /*=========================================================================
        INITIALIZE ANSWERS
    =========================================================================*/

    function initializeAnswers(){

        state.answers =

            CTM.assessment.pillars.map(

                function(){

                    return new Array(5).fill(0);

                }

            );



        state.pillarScores =

            new Array(

                CTM.assessment.totalPillars

            ).fill(0);

    }



    /*=========================================================================
        CURRENT PILLAR
    =========================================================================*/

    function getCurrentPillar(){

        return CTM.assessment.pillars[

            state.pillarIndex

        ];

    }



    /*=========================================================================
        CURRENT QUESTION
    =========================================================================*/

    function getCurrentQuestion(){

        return getCurrentPillar()

            .questions[

                state.questionIndex

            ];

    }



    /*=========================================================================
        RENDER
    =========================================================================*/

    function renderCurrentQuestion(){

        const pillar =

            getCurrentPillar();

        const question =

            getCurrentQuestion();



        CTM.assessmentUI.renderCounter(

            state.pillarIndex + 1,

            CTM.assessment.totalPillars

        );



        CTM.assessmentUI.renderPillar(

            pillar

        );



        CTM.assessmentUI.renderQuestion(

            question,

            state.questionIndex + 1,

            CTM.assessment.questionsPerPillar

        );



        CTM.assessmentUI.renderRatings(

            state.answers[

                state.pillarIndex

            ][

                state.questionIndex

            ],

            onScoreSelected

        );



        updateProgress();

    }

    /*=========================================================================
        SCORE SELECTED
    =========================================================================*/

    function onScoreSelected(

        score

    ){

        score =

            CTM.assessmentScoring.validateScore(

                score

            );



        state.answers[

            state.pillarIndex

        ][

            state.questionIndex

        ] =

            score;



        CTM.assessmentUI.renderRatings(

            score,

            onScoreSelected

        );



        CTM.assessmentUI.enableNext();



        updateProgress();



        saveProgress();

    }



    /*=========================================================================
        UPDATE PROGRESS
    =========================================================================*/

    function updateProgress(){

        const answers =

            state.answers[

                state.pillarIndex

            ];



        const completion =

            CTM.assessmentScoring

            .calculateCompletion(

                answers

            );



        CTM.assessmentUI.updateAnswered(

            completion.answered,

            CTM.assessment.questionsPerPillar

        );



        CTM.assessmentUI.updateAverage(

            CTM.assessmentScoring

            .calculatePillarAverage(

                answers

            )

        );



        CTM.assessmentUI.updateNavigation(

            state.questionIndex + 1,

            CTM.assessment.questionsPerPillar

        );

    }



    /*=========================================================================
        NEXT QUESTION
    =========================================================================*/

    function nextQuestion(){

        if(

            state.questionIndex

            <

            CTM.assessment.questionsPerPillar - 1

        ){

            state.questionIndex++;

            renderCurrentQuestion();

            CTM.assessmentUI.scrollTop();

            return;

        }



        finishCurrentPillar();

    }



    /*=========================================================================
        PREVIOUS QUESTION
    =========================================================================*/

    function previousQuestion(){

        if(

            state.questionIndex === 0

        ){

            return;

        }



        state.questionIndex--;

        renderCurrentQuestion();

        CTM.assessmentUI.scrollTop();

    }



    /*=========================================================================
        FINISH CURRENT PILLAR
    =========================================================================*/

    function finishCurrentPillar(){

        const answers =

            state.answers[

                state.pillarIndex

            ];



        state.pillarScores[

            state.pillarIndex

        ] =

            CTM.assessmentScoring

            .calculatePillarScore(

                answers

            );



        if(

            state.pillarIndex

            <

            CTM.assessment.totalPillars - 1

        ){

            state.pillarIndex++;

            state.questionIndex = 0;

            renderCurrentQuestion();

            CTM.assessmentUI.scrollTop();

            saveProgress();

            return;

        }



        finishAssessment();

    }



    /*=========================================================================
        SAVE PROGRESS
    =========================================================================*/

    function saveProgress(){

        CTM.storage.saveAssessment({

            pillarIndex :

                state.pillarIndex,



            questionIndex :

                state.questionIndex,



            answers :

                state.answers,



            pillarScores :

                state.pillarScores

        });

    }



    /*=========================================================================
        BIND EVENTS
    =========================================================================*/

    function bindEvents(){

        const ui =

            CTM.assessmentUI

            .getElements();



        ui.previousButton

            .addEventListener(

                'click',

                previousQuestion

            );



        ui.nextButton

            .addEventListener(

                'click',

                nextQuestion

            );



        ui.saveButton

            .addEventListener(

                'click',

                finishCurrentPillar

            );

    }

    /*=========================================================================
        FINISH ASSESSMENT
    =========================================================================*/

    function finishAssessment(){

        const summary =

            CTM.assessmentScoring.calculateSummary(

                state.pillarScores

            );



        const result = {

            completed : true,



            completedOn :

                new Date().toISOString(),



            visitor :

                state.visitor,



            answers :

                state.answers,



            pillarScores :

                state.pillarScores,



            summary :

                summary

        };



        CTM.storage.saveAssessmentResult(

            result

        );



        CTM.router.go(

            'lifewheel'

        );

    }



    /*=========================================================================
        GET CURRENT STATE
    =========================================================================*/

    function getState(){

        return{

            pillarIndex :

                state.pillarIndex,



            questionIndex :

                state.questionIndex,



            answers :

                state.answers,



            pillarScores :

                state.pillarScores,



            visitor :

                state.visitor

        };

    }



    /*=========================================================================
        RESET ENGINE
    =========================================================================*/

    function reset(){

        state.pillarIndex = 0;

        state.questionIndex = 0;



        initializeAnswers();



        CTM.assessmentUI.reset();

    }



    /*=========================================================================
        DESTROY
    =========================================================================*/

    function destroy(){

        reset();

    }



    /*=========================================================================
        PUBLIC API
    =========================================================================*/

    return{

        init,



        destroy,



        reset,



        getState,



        getCurrentPillar,



        getCurrentQuestion,



        nextQuestion,



        previousQuestion

    };



})();

/*=============================================================================

    AUTO INITIALIZE

=============================================================================*/

document.addEventListener(

    'DOMContentLoaded',

    function(){

        CTM.assessmentEngine.init();

    }

);

/*=============================================================================

    END OF FILE

=============================================================================*/
