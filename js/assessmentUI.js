
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    assessmentUI.js

    PURPOSE

    Assessment User Interface

    RESPONSIBILITIES

    • Cache DOM Elements
    • Render Pillar
    • Render Reflection
    • Render Question
    • Render Rating Buttons
    • Update Screen

    VERSION

    1.0

=============================================================================*/

'use strict';

/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/

window.CTM = window.CTM || {};

/*=============================================================================
    ASSESSMENT UI
=============================================================================*/

CTM.assessmentUI = (function(){

    /*=========================================================================
        DOM CACHE
    =========================================================================*/

    const ui = {

        visitorName      : null,

        assessmentCount  : null,

        pillarTitle      : null,

        pillarTamil      : null,

        reflection       : null,

        questionCounter  : null,

        questionTamil    : null,

        questionEnglish  : null,

        ratingContainer  : null,

        answeredCount    : null,

        averageScore     : null,

        previousButton   : null,

        nextButton       : null,

        saveButton       : null

    };



    /*=========================================================================
        CACHE DOM
    =========================================================================*/

    function cacheDOM(){

        ui.visitorName =

            document.getElementById(

                'visitorName'

            );



        ui.assessmentCount =

            document.getElementById(

                'assessmentCounter'

            );



        ui.pillarTitle =

            document.getElementById(

                'pillarTitle'

            );



        ui.pillarTamil =

            document.getElementById(

                'pillarTitleTamil'

            );



        ui.reflection =

            document.getElementById(

                'pillarReflection'

            );



        ui.questionCounter =

            document.getElementById(

                'questionCounter'

            );



        ui.questionTamil =

            document.getElementById(

                'questionTamil'

            );



        ui.questionEnglish =

            document.getElementById(

                'questionEnglish'

            );



        ui.ratingContainer =

            document.getElementById(

                'ratingContainer'

            );



        ui.answeredCount =

            document.getElementById(

                'answeredCount'

            );



        ui.averageScore =

            document.getElementById(

                'averageScore'

            );



        ui.previousButton =

            document.getElementById(

                'btnPrevious'

            );



        ui.nextButton =

            document.getElementById(

                'btnNext'

            );



        ui.saveButton =

            document.getElementById(

                'btnSaveContinue'

            );

    }



    /*=========================================================================
        INITIALIZE
    =========================================================================*/

    function init(){

        cacheDOM();

        console.log(

            'Assessment UI Ready'

        );

    }



    /*=========================================================================
        RENDER VISITOR
    =========================================================================*/

    function renderVisitor(name){

        if(!ui.visitorName){

            return;

        }

        ui.visitorName.textContent =

            String(name || '')

            .toUpperCase();

    }



    /*=========================================================================
        RENDER PAGE COUNTER
    =========================================================================*/

    function renderCounter(

        current,

        total

    ){

        ui.assessmentCount.textContent =

            'Assessment '

            + current

            + ' of '

            + total;

    }



    /*=========================================================================
        RENDER PILLAR
    =========================================================================*/

    function renderPillar(

        pillar

    ){

        ui.pillarTitle.textContent =

            pillar.title;



        ui.pillarTamil.textContent =

            pillar.tamilTitle;



        ui.reflection.textContent =

            pillar.reflection;

    }



    /*=========================================================================
        RENDER QUESTION
    =========================================================================*/

    function renderQuestion(

        question,

        current,

        total

    ){

        ui.questionCounter.textContent =

            'QUESTION '

            + current

            + ' OF '

            + total;



        ui.questionTamil.textContent =

            question.tamil;



        ui.questionEnglish.textContent =

            question.english;

    }

    /*=========================================================================
        RENDER RATING BUTTONS
    =========================================================================*/

    function renderRatings(

        selectedScore,

        onSelect

    ){

        ui.ratingContainer.innerHTML = '';

        for(

            let score = 1;

            score <= 10;

            score++

        ){

            const button =

                document.createElement(

                    'button'

                );

            button.type =

                'button';

            button.className =

                'rating-button';

            button.dataset.score =

                score;

            button.textContent =

                score;

            /*--------------------------------------------------------------
                APPLY SELECTED STATE
            --------------------------------------------------------------*/

            if(

                score === selectedScore

            ){

                button.classList.add(

                    'active'

                );

                if(

                    score <= 3

                ){

                    button.classList.add(

                        'rating-danger',

                        'glow-red'

                    );

                }

                else if(

                    score <= 7

                ){

                    button.classList.add(

                        'rating-warning',

                        'glow-orange'

                    );

                }

                else{

                    button.classList.add(

                        'rating-success',

                        'glow-green'

                    );

                }

            }

            /*--------------------------------------------------------------
                CLICK
            --------------------------------------------------------------*/

            button.addEventListener(

                'click',

                function(){

                    if(

                        typeof onSelect ===

                        'function'

                    ){

                        onSelect(

                            score

                        );

                    }

                }

            );

            ui.ratingContainer.appendChild(

                button

            );

        }

    }



    /*=========================================================================
        UPDATE ANSWER COUNT
    =========================================================================*/

    function updateAnswered(

        answered,

        total

    ){

        if(

            !ui.answeredCount

        ){

            return;

        }

        ui.answeredCount.textContent =

            answered +

            ' / ' +

            total;

    }



    /*=========================================================================
        UPDATE AVERAGE
    =========================================================================*/

    function updateAverage(

        average

    ){

        if(

            !ui.averageScore

        ){

            return;

        }

        ui.averageScore.textContent =

            Number(

                average || 0

            ).toFixed(1);

    }



    /*=========================================================================
        UPDATE NAVIGATION
    =========================================================================*/

    function updateNavigation(

        currentQuestion,

        totalQuestions

    ){

        if(

            ui.previousButton

        ){

            ui.previousButton.disabled =

                currentQuestion === 1;

        }

        if(

            ui.nextButton

        ){

            ui.nextButton.disabled =

                currentQuestion >=

                totalQuestions;

        }

        if(

            ui.saveButton

        ){

            ui.saveButton.style.display =

                currentQuestion ===

                totalQuestions

                ? 'inline-flex'

                : 'none';

        }

    }



    /*=========================================================================
        ENABLE NEXT
    =========================================================================*/

    function enableNext(){

        if(

            ui.nextButton

        ){

            ui.nextButton.disabled =

                false;

        }

    }



    /*=========================================================================
        DISABLE NEXT
    =========================================================================*/

    function disableNext(){

        if(

            ui.nextButton

        ){

            ui.nextButton.disabled =

                true;

        }

    }



    /*=========================================================================
        SET LOADING
    =========================================================================*/

    function showLoading(){

        document.body.classList.add(

            'loading'

        );

    }



    /*=========================================================================
        REMOVE LOADING
    =========================================================================*/

    function hideLoading(){

        document.body.classList.remove(

            'loading'

        );

    }

    /*=========================================================================
        RESET SCREEN
    =========================================================================*/

    function reset(){

        if(

            ui.questionTamil

        ){

            ui.questionTamil.textContent = '';

        }

        if(

            ui.questionEnglish

        ){

            ui.questionEnglish.textContent = '';

        }

        if(

            ui.ratingContainer

        ){

            ui.ratingContainer.innerHTML = '';

        }

        updateAnswered(

            0,

            5

        );

        updateAverage(

            0

        );

        disableNext();

    }



    /*=========================================================================
        CLEAR SELECTION
    =========================================================================*/

    function clearSelection(){

        if(

            !ui.ratingContainer

        ){

            return;

        }

        const buttons =

            ui.ratingContainer.querySelectorAll(

                '.rating-button'

            );

        buttons.forEach(

            function(button){

                button.classList.remove(

                    'active',

                    'rating-danger',

                    'rating-warning',

                    'rating-success',

                    'glow-red',

                    'glow-orange',

                    'glow-green'

                );

            }

        );

    }



    /*=========================================================================
        SCROLL TO TOP
    =========================================================================*/

    function scrollTop(){

        window.scrollTo({

            top:0,

            behavior:'smooth'

        });

    }



    /*=========================================================================
        SET BUTTON STATES
    =========================================================================*/

    function setButtonStates(

        previousDisabled,

        nextDisabled,

        saveVisible

    ){

        if(

            ui.previousButton

        ){

            ui.previousButton.disabled =

                previousDisabled;

        }

        if(

            ui.nextButton

        ){

            ui.nextButton.disabled =

                nextDisabled;

        }

        if(

            ui.saveButton

        ){

            ui.saveButton.style.display =

                saveVisible

                ? 'inline-flex'

                : 'none';

        }

    }



    /*=========================================================================
        GET DOM CACHE
    =========================================================================*/

    function getElements(){

        return ui;

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

        renderVisitor,

        renderCounter,

        renderPillar,

        renderQuestion,

        renderRatings,

        updateAnswered,

        updateAverage,

        updateNavigation,

        enableNext,

        disableNext,

        showLoading,

        hideLoading,

        clearSelection,

        scrollTop,

        setButtonStates,

        getElements,

        reset,

        destroy

    };



})();

/*=============================================================================

    END OF FILE

=============================================================================*/
