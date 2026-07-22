
/*======================================================================

CTM PATH™ Guided Journey v8.0

SCREEN 11 — YOUR FINANCIAL REALITY™

File:
screen11.js

Purpose:
Financial Reality Index™

Responsibility:

• Initialise Screen 11
• Personalise visitor
• Capture Financial Reality responses
• Calculate Financial Reality Index™
• Display personalised insight
• Save Screen 11 state
• Navigate to Screen 12
• Fully compatible with CTM Dynamic Loader

======================================================================*/

'use strict';

(() => {

    const CTM = window.CTM;

    if (!CTM) {

        console.error(

            'CTM core has not been initialized.'

        );

        return;

    }



    /*
    ==================================================
    Screen Configuration
    ==================================================
    */

    CTM.screen11 = {

        id: 'screen11',

        nextScreen: 'screen12',

        totalQuestions: 10

    };



    /*
    ==================================================
    Financial Reality State
    ==================================================
    */

    CTM.state.financialReality =

        CTM.state.financialReality || {

            answers: {},

            totalScore: 0,

            completed: false,

            completedAt: null

        };



    /*
    ==================================================
    Initialise Screen 11

    Called automatically by loader.js

    ==================================================
    */

    CTM.initScreen11 = function () {

        CTM.log(

            'Screen 11 initialized.'

        );

        personaliseVisitor();

        prepareQuestions();

        prepareNavigator();

        restorePreviousAnswers();

        CTM.bindScreen11();

    };



    /*
    ==================================================
    Visitor Personalisation

    Uses Screen 05 storage.

    Priority

    1. CTM_STATE

    2. localStorage

    ==================================================
    */

    function personaliseVisitor() {

        const visitorName =

            window.CTM_STATE?.visitorName ||

            localStorage.getItem(

                'ctmVisitorName'

            ) ||

            'Friend';

        document

            .querySelectorAll(

                '.visitor-name'

            )

            .forEach(function (element) {

                element.textContent =

                    visitorName;

            });

        document

            .querySelectorAll(

                '.visitor-name-inline'

            )

            .forEach(function (element) {

                element.textContent =

                    visitorName;

            });

        document

            .querySelectorAll(

                '.visitor-name-inline-en'

            )

            .forEach(function (element) {

                element.textContent =

                    visitorName;

            });

    }



    /*
    ==================================================
    Prepare Question Cards

    Hide Questions

    2–10

    ==================================================
    */

    function prepareQuestions() {

        const cards =

            document.querySelectorAll(

                '.fri-card'

            );

        cards.forEach(function (

            card,

            index

        ) {

            if (index > 0) {

                card.classList.add(

                    'hidden'

                );

            }

        });

    }



    /*
    ==================================================
    Prepare Navigator

    Disabled until

    assessment completes.

    ==================================================
    */

    function prepareNavigator() {

        const nextButton =

            document.getElementById(

                'screen11-next'

            );

        if (!nextButton) {

            return;

        }

        nextButton.disabled = true;

    }



    /*
    ==================================================
    Restore Previous Session

    If visitor refreshes,

    restore previous choices.

    ==================================================
    */

    function restorePreviousAnswers() {

        const state =

            CTM.state

            .financialReality;

        if (

            !state ||

            !state.answers

        ) {

            return;

        }

        CTM.log(

            'Financial Reality restored.'

        );

    }


     /*
    ==================================================
    Bind Screen 11

    Dynamic loader safe.

    Removes previous listeners
    before binding again.

    ==================================================
    */

    CTM.bindScreen11 = function () {

        document.removeEventListener(

            'click',

            CTM.handleScreen11Click

        );

        document.addEventListener(

            'click',

            CTM.handleScreen11Click

        );

    };



    /*
    ==================================================
    Global Click Handler

    Event Delegation

    Handles

    • Rating buttons
    • Navigator

    ==================================================
    */

    CTM.handleScreen11Click = async function (event) {

        const ratingButton =

            event.target.closest(

                '.rating-btn'

            );

        if (ratingButton) {

            event.preventDefault();

            handleRatingSelection(

                ratingButton

            );

            return;

        }

        const nextButton =

            event.target.closest(

                '#screen11-next'

            );

        if (

            nextButton &&

            !nextButton.disabled

        ) {

            event.preventDefault();

            await navigateNext();

        }

    };



    /*
    ==================================================
    Rating Selection

    ==================================================
    */

    function handleRatingSelection(

        button

    ) {

        const scale =

            button.closest(

                '.rating-scale'

            );

        if (!scale) {

            return;

        }

        const questionId =

            Number(

                scale.dataset.question

            );

        const value =

            Number(

                button.dataset.value

            );

        saveAnswer(

            questionId,

            value

        );

        colourRatingScale(

            scale,

            value

        );

        revealNextQuestion(

            questionId

        );

        evaluateCompletion();

    }



    /*
    ==================================================
    Save Answer

    ==================================================
    */

    function saveAnswer(

        questionId,

        value

    ) {

        CTM.state

            .financialReality

            .answers[

                questionId

            ] = value;

        CTM.saveState();

    }



    /*
    ==================================================
    Colour Rating Scale

    ==================================================
    */

    function colourRatingScale(

        scale,

        value

    ) {

        const buttons =

            scale.querySelectorAll(

                '.rating-btn'

            );

        buttons.forEach(function (

            btn

        ) {

            btn.classList.remove(

                'selected',

                'rating-red',

                'rating-orange',

                'rating-green'

            );

        });

        buttons.forEach(function (

            btn

        ) {

            const number =

                Number(

                    btn.dataset.value

                );

            if (

                number >

                value

            ) {

                return;

            }

            if (value <= 3) {

                btn.classList.add(

                    'rating-red'

                );

            }

            else if (

                value <= 7

            ) {

                btn.classList.add(

                    'rating-orange'

                );

            }

            else {

                btn.classList.add(

                    'rating-green'

                );

            }

        });

        button.classList.add(

            'selected'

        );

    }



    /*
    ==================================================
    Reveal Next Question

    ==================================================
    */

    function revealNextQuestion(

        currentQuestion

    ) {

        const nextCard =

            document.querySelector(

                '[data-question="' +

                (

                    currentQuestion + 1

                ) +

                '"]'

            );

        if (!nextCard) {

            return;

        }

        if (

            nextCard.classList.contains(

                'hidden'

            )

        ) {

            nextCard.classList.remove(

                'hidden'

            );

            nextCard.scrollIntoView({

                behavior: 'smooth',

                block: 'center'

            });

        }

    }


     /*
    ==================================================
    Evaluate Completion

    ==================================================
    */

    function evaluateCompletion() {

        const answers =

            CTM.state

                .financialReality

                .answers;

        const answered =

            Object.keys(

                answers

            ).length;

        if (

            answered <

            CTM.screen11.totalQuestions

        ) {

            return;

        }

        if (

            CTM.state

                .financialReality

                .completed

        ) {

            return;

        }

        CTM.state

            .financialReality

            .completed = true;

        calculateFinancialRealityScore();

        beginAnalysis();

    }



    /*
    ==================================================
    Calculate Financial Reality Score

    Score Range

    10 → 100

    ==================================================
    */

    function calculateFinancialRealityScore() {

        const answers =

            CTM.state

                .financialReality

                .answers;

        let total = 0;

        Object.values(

            answers

        ).forEach(function (

            score

        ) {

            total += Number(score);

        });

        CTM.state

            .financialReality

            .totalScore = total;

        CTM.state

            .financialReality

            .completedAt =

            new Date()

            .toISOString();

        CTM.saveState();

    }



    /*
    ==================================================
    Begin Analysis

    ==================================================
    */

    function beginAnalysis() {

        const analysis =

            document.getElementById(

                'fri-analysis'

            );

        if (!analysis) {

            revealFinancialReality();

            return;

        }

        analysis.classList.remove(

            'hidden'

        );

        analysis.scrollIntoView({

            behavior: 'smooth',

            block: 'center'

        });

        playAnalysisAnimation();

    }



    /*
    ==================================================
    Premium Analysis Animation

    ==================================================
    */

    function playAnalysisAnimation() {

        const items =

            document.querySelectorAll(

                '.analysis-item'

            );

        let index = 0;

        const timer =

            setInterval(function () {

                if (

                    index >=

                    items.length

                ) {

                    clearInterval(

                        timer

                    );

                    setTimeout(

                        revealFinancialReality,

                        700

                    );

                    return;

                }

                items[index]

                    .classList

                    .add(

                        'completed'

                    );

                index++;

            }, 350);

    }



    /*
    ==================================================
    Reveal Financial Reality

    ==================================================
    */

    function revealFinancialReality() {

        const analysis =

            document.getElementById(

                'fri-analysis'

            );

        const result =

            document.getElementById(

                'fri-result'

            );

        if (analysis) {

            analysis.classList.add(

                'hidden'

            );

        }

        if (result) {

            result.classList.remove(

                'hidden'

            );

            result.scrollIntoView({

                behavior: 'smooth',

                block: 'center'

            });

        }

        animateScore();

    }



    /*
    ==================================================
    Animated Score Counter

    ==================================================
    */

    function animateScore() {

        const value =

            document.getElementById(

                'fri-score-value'

            );

        if (!value) {

            updateFinancialInsight();

            return;

        }

        let current = 0;

        const target =

            CTM.state

                .financialReality

                .totalScore;

        const animation =

            setInterval(function () {

                current++;

                value.textContent =

                    current;

                if (

                    current >=

                    target

                ) {

                    clearInterval(

                        animation

                    );

                    updateFinancialInsight();

                }

            }, 20);

    }


     /*
    ==================================================
    Update Financial Insight

    Personalised interpretation
    based on Financial Reality Index™

    ==================================================
    */

    function updateFinancialInsight() {

        const score =

            CTM.state
                .financialReality
                .totalScore;

        const visitorName =

            window.CTM_STATE?.visitorName ||

            localStorage.getItem(

                'ctmVisitorName'

            ) ||

            'Friend';

        const circle =

            document.getElementById(

                'fri-score-circle'

            );

        const status =

            document.getElementById(

                'fri-score-status'

            );

        const message =

            document.getElementById(

                'fri-score-message'

            );

        if (

            circle

        ) {

            circle.classList.remove(

                'score-red',

                'score-orange',

                'score-green'

            );

        }

        /*
        ==========================================
        RED
        ==========================================
        */

        if (

            score <= 30

        ) {

            circle &&

            circle.classList.add(

                'score-red'

            );

            status.textContent =

                'Financial Reality Needs Immediate Attention';

            message.innerHTML =

                '<strong>' +

                visitorName +

                '</strong>,<br><br>' +

                'Your current financial reality deserves immediate attention.' +

                '<br><br>' +

                'The good news is that awareness is always the first step towards transformation.';

        }

        /*
        ==========================================
        ORANGE
        ==========================================
        */

        else if (

            score <= 70

        ) {

            circle &&

            circle.classList.add(

                'score-orange'

            );

            status.textContent =

                'A Good Foundation Is Emerging';

            message.innerHTML =

                '<strong>' +

                visitorName +

                '</strong>,<br><br>' +

                'You have already developed several healthy financial habits.' +

                '<br><br>' +

                'Your Financial MRI™ will reveal the few changes that can create the biggest improvement.';

        }

        /*
        ==========================================
        GREEN
        ==========================================
        */

        else {

            circle &&

            circle.classList.add(

                'score-green'

            );

            status.textContent =

                'Strong Financial Foundation';

            message.innerHTML =

                '<strong>' +

                visitorName +

                '</strong>,<br><br>' +

                'You have built a strong financial foundation.' +

                '<br><br>' +

                'Let's now identify the next opportunities that can help you build lasting financial freedom.';

        }

        enableNavigator();

    }



    /*
    ==================================================
    Enable Premium Navigator

    ==================================================
    */

    function enableNavigator() {

        const button =

            document.getElementById(

                'screen11-next'

            );

        if (

            !button

        ) {

            return;

        }

        button.disabled = false;

        button.classList.add(

            'pulse'

        );

        button.scrollIntoView({

            behavior: 'smooth',

            block: 'center'

        });

    }



    /*
    ==================================================
    Navigate To Screen 12

    Uses CTM Router

    ==================================================
    */

    async function navigateNext() {

        await CTM.navigate(

            CTM.screen11.nextScreen

        );

    }



    /*
    ==================================================
    Screen Loaded Hook

    Called automatically
    after loader injects HTML

    ==================================================
    */

    CTM.afterScreen11Loaded = function () {

        if (

            document.getElementById(

                'screen11'

            )

        ) {

            CTM.initScreen11();

        }

    };


    /*
    ==================================================
    Restore Previous Answers

    Restore UI from CTM.state

    ==================================================
    */

    function restorePreviousAnswers() {

        const state =

            CTM.state

                .financialReality;

        if (

            !state ||

            !state.answers

        ) {

            return;

        }

        Object.keys(

            state.answers

        ).forEach(function (

            key

        ) {

            const questionId =

                Number(key);

            const value =

                Number(

                    state.answers[key]

                );

            const scale =

                document.querySelector(

                    '.rating-scale[data-question="' +

                    questionId +

                    '"]'

                );

            if (!scale) {

                return;

            }

            colourRatingScale(

                scale,

                value

            );

            if (

                questionId <

                CTM.screen11.totalQuestions

            ) {

                const nextCard =

                    document.querySelector(

                        '[data-question="' +

                        (

                            questionId + 1

                        ) +

                        '"]'

                    );

                if (nextCard) {

                    nextCard.classList.remove(

                        'hidden'

                    );

                }

            }

        });

        /*
        Restore completed result
        */

        if (

            state.completed

        ) {

            const analysis =

                document.getElementById(

                    'fri-analysis'

                );

            if (analysis) {

                analysis.classList.add(

                    'hidden'

                );

            }

            const result =

                document.getElementById(

                    'fri-result'

                );

            if (result) {

                result.classList.remove(

                    'hidden'

                );

            }

            const value =

                document.getElementById(

                    'fri-score-value'

                );

            if (value) {

                value.textContent =

                    state.totalScore;

            }

            updateFinancialInsight();

        }

    }



    /*
    ==================================================
    Reset Assessment

    If visitor changes
    an earlier answer.

    ==================================================
    */

    function resetAssessment() {

        CTM.state

            .financialReality

            .completed = false;

        const analysis =

            document.getElementById(

                'fri-analysis'

            );

        const result =

            document.getElementById(

                'fri-result'

            );

        if (analysis) {

            analysis.classList.add(

                'hidden'

            );

        }

        if (result) {

            result.classList.add(

                'hidden'

            );

        }

        const nextButton =

            document.getElementById(

                'screen11-next'

            );

        if (nextButton) {

            nextButton.disabled = true;

            nextButton.classList.remove(

                'pulse'

            );

        }

    }



    /*
    ==================================================
    Screen Exit Helper

    Save latest state.

    ==================================================
    */

    CTM.beforeScreen11Exit = function () {

        CTM.saveState();

    };



    /*
    ==================================================
    Screen Ready

    ==================================================
    */

    CTM.log(

        'Screen 11 controller ready.'

    );

})();
