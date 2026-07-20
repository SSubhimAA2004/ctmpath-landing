
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Readiness Score Engine

Responsibility
• Calculate Readiness Score
• Calculate Percentage
• Store Score
• Score Statistics
• Score Reset
• Auto Refresh

======================================================================
*/

'use strict';

(() => {

    const CTM = window.CTM;

    if (!CTM) {

        console.error('CTM core has not been initialized.');

        return;

    }

    /*==================================================
    Configuration
    ==================================================*/

    CTM.scoreConfig = {

        maxQuestionScore : 10,

        totalQuestions   : 36

    };

    /*==================================================
    Numeric Responses
    ==================================================*/

    CTM.getNumericResponses = function () {

        const responses = Object.values(

            CTM.state.responses || {}

        );

        return responses.filter(function (value) {

            return !isNaN(Number(value));

        });

    };

    /*==================================================
    Total Score
    ==================================================*/

    CTM.calculateTotalScore = function () {

        const responses = CTM.getNumericResponses();

        return responses.reduce(function (total, value) {

            return total + Number(value);

        }, 0);

    };

    /*==================================================
    Maximum Score
    ==================================================*/

    CTM.calculateMaximumScore = function () {

        return (

            CTM.scoreConfig.totalQuestions *

            CTM.scoreConfig.maxQuestionScore

        );

    };

    /*==================================================
    Readiness Percentage
    ==================================================*/

    CTM.calculateReadinessPercentage = function () {

        const maximum =

            CTM.calculateMaximumScore();

        if (maximum === 0) {

            return 0;

        }

        return Math.round(

            (

                CTM.calculateTotalScore()

                /

                maximum

            ) * 100

        );

    };

    /*==================================================
    Readiness Band
    ==================================================*/

    CTM.calculateReadinessBand = function () {

        const score =

            CTM.calculateReadinessPercentage();

        if (score >= 90) {

            return 'Exceptional';

        }

        if (score >= 75) {

            return 'Strong';

        }

        if (score >= 60) {

            return 'Developing';

        }

        if (score >= 40) {

            return 'Emerging';

        }

        return 'Foundation';

    };

    /*==================================================
    Update Score State
    ==================================================*/

    CTM.calculateReadinessScore = function () {

        const percentage =

            CTM.calculateReadinessPercentage();

        CTM.state.scores.readiness =

            percentage;

        CTM.state.scores.band =

            CTM.calculateReadinessBand();

        return percentage;

    };

    /*==================================================
    Score Summary
    ==================================================*/

    CTM.getScoreSummary = function () {

        return {

            score:

                CTM.state.scores.readiness,

            band:

                CTM.state.scores.band,

            total:

                CTM.calculateTotalScore(),

            maximum:

                CTM.calculateMaximumScore()

        };

    };

    /*==================================================
    Reset Score
    ==================================================*/

    CTM.resetScores = function () {

        CTM.state.scores = {

            readiness : 0,

            pattern   : null,

            band      : '',

            insight   : '',

            recommendation : ''

        };

    };

    /*==================================================
    Refresh
    ==================================================*/

    CTM.refreshScores = function () {

        CTM.calculateReadinessScore();

        if (

            typeof CTM.refreshText === 'function'

        ) {

            CTM.refreshText();

        }

        if (

            typeof CTM.saveState === 'function'

        ) {

            CTM.saveState();

        }

    };

})();
