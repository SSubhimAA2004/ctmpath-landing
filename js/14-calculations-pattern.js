
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Pattern Detection Engine

Responsibility
• Detect Behaviour Patterns
• Detect Financial Readiness Pattern
• Detect Decision Pattern
• Detect Confidence Pattern
• Store Pattern Analysis
• Refresh Pattern State

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
    Ensure Objects
    ==================================================*/

    CTM.state.patterns = CTM.state.patterns || {};

    CTM.state.insights = CTM.state.insights || {};

    /*==================================================
    Average Score
    ==================================================*/

    CTM.getAverageScore = function () {

        const values = Object.values(

            CTM.state.responses || {}

        ).filter(function (value) {

            return !isNaN(Number(value));

        });

        if (values.length === 0) {

            return 0;

        }

        const total = values.reduce(function (sum, value) {

            return sum + Number(value);

        }, 0);

        return total / values.length;

    };

    /*==================================================
    Detect Readiness Pattern
    ==================================================*/

    CTM.detectReadinessPattern = function () {

        const score = CTM.state.scores.readiness || 0;

        if (score >= 85) {

            return 'High Readiness';

        }

        if (score >= 70) {

            return 'Growth Ready';

        }

        if (score >= 55) {

            return 'Potential Builder';

        }

        if (score >= 40) {

            return 'Needs Direction';

        }

        return 'Needs Foundation';

    };

    /*==================================================
    Detect Decision Pattern
    ==================================================*/

    CTM.detectDecisionPattern = function () {

        const average = CTM.getAverageScore();

        if (average >= 8) {

            return 'Confident Decision Maker';

        }

        if (average >= 6) {

            return 'Balanced Decision Maker';

        }

        if (average >= 4) {

            return 'Cautious Decision Maker';

        }

        return 'Hesitant Decision Maker';

    };

    /*==================================================
    Detect Confidence Pattern
    ==================================================*/

    CTM.detectConfidencePattern = function () {

        const average = CTM.getAverageScore();

        if (average >= 8) {

            return 'High Confidence';

        }

        if (average >= 6) {

            return 'Moderate Confidence';

        }

        if (average >= 4) {

            return 'Developing Confidence';

        }

        return 'Low Confidence';

    };

    /*==================================================
    Generate Pattern Summary
    ==================================================*/

    CTM.generatePatternSummary = function () {

        return {

            readiness:

                CTM.detectReadinessPattern(),

            decision:

                CTM.detectDecisionPattern(),

            confidence:

                CTM.detectConfidencePattern()

        };

    };

    /*==================================================
    Update Pattern State
    ==================================================*/

    CTM.calculatePatterns = function () {

        const summary =

            CTM.generatePatternSummary();

        CTM.state.patterns = summary;

        CTM.state.scores.pattern =

            summary.readiness;

        return summary;

    };

    /*==================================================
    Pattern Description
    ==================================================*/

    CTM.getPatternDescription = function () {

        const pattern =

            CTM.state.patterns.readiness || '';

        switch (pattern) {

            case 'High Readiness':

                return 'You demonstrate strong readiness to take decisive action.';

            case 'Growth Ready':

                return 'You have a solid foundation with clear opportunities for growth.';

            case 'Potential Builder':

                return 'You possess potential that can be strengthened through focused guidance.';

            case 'Needs Direction':

                return 'A structured roadmap will help improve your decision making.';

            default:

                return 'Building strong financial foundations should be your first priority.';

        }

    };

    /*==================================================
    Refresh Patterns
    ==================================================*/

    CTM.refreshPatterns = function () {

        CTM.calculatePatterns();

        CTM.state.insights.pattern =

            CTM.getPatternDescription();

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
