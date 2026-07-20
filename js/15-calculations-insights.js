
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Insight & Recommendation Engine

Responsibility
• Generate Visitor Insights
• Generate Personalized Recommendations
• Create Summary Messages
• Store Insights
• Store Recommendations
• Refresh Personalized Content

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

    CTM.state.insights = CTM.state.insights || {};

    CTM.state.recommendations = CTM.state.recommendations || {};

    /*==================================================
    Readiness Insight
    ==================================================*/

    CTM.generateReadinessInsight = function () {

        const score = CTM.state.scores.readiness || 0;

        if (score >= 90) {

            return "You demonstrate exceptional financial readiness and are well positioned to accelerate your growth.";

        }

        if (score >= 75) {

            return "You have a strong financial foundation with several opportunities for meaningful improvement.";

        }

        if (score >= 60) {

            return "You are progressing well, but a few key improvements can significantly increase your financial success.";

        }

        if (score >= 40) {

            return "Your financial journey has begun. A structured plan can dramatically improve your future outcomes.";

        }

        return "Your highest priority should be building a stronger financial foundation before pursuing larger goals.";

    };

    /*==================================================
    Confidence Insight
    ==================================================*/

    CTM.generateConfidenceInsight = function () {

        const pattern =

            CTM.state.patterns.confidence || '';

        switch (pattern) {

            case 'High Confidence':

                return "You make decisions confidently and are comfortable taking action.";

            case 'Moderate Confidence':

                return "You usually make balanced decisions after careful consideration.";

            case 'Developing Confidence':

                return "Increasing your confidence will improve both your speed and quality of decisions.";

            default:

                return "Developing greater confidence should become one of your immediate priorities.";

        }

    };

    /*==================================================
    Recommendation
    ==================================================*/

    CTM.generatePrimaryRecommendation = function () {

        const score = CTM.state.scores.readiness || 0;

        if (score >= 85) {

            return "Focus on scaling your financial growth with strategic coaching.";

        }

        if (score >= 70) {

            return "Strengthen consistency and execution to unlock your next level of success.";

        }

        if (score >= 55) {

            return "Develop a structured financial action plan and review it weekly.";

        }

        if (score >= 40) {

            return "Improve your financial habits before making major financial decisions.";

        }

        return "Start by creating financial clarity, discipline and a simple step-by-step improvement plan.";

    };

    /*==================================================
    Next Best Action
    ==================================================*/

    CTM.generateNextAction = function () {

        return "Book a personalized CTM PATH™ Discovery Session to receive a detailed roadmap.";

    };

    /*==================================================
    Generate Summary
    ==================================================*/

    CTM.generateSummary = function () {

        const score = CTM.state.scores.readiness || 0;

        const band = CTM.state.scores.band || '';

        return `Your current Financial Readiness Score is ${score}% (${band}).`;

    };

    /*==================================================
    Update Insight State
    ==================================================*/

    CTM.calculateInsights = function () {

        CTM.state.insights = {

            summary:

                CTM.generateSummary(),

            readiness:

                CTM.generateReadinessInsight(),

            confidence:

                CTM.generateConfidenceInsight(),

            pattern:

                CTM.state.insights.pattern || ''

        };

        CTM.state.recommendations = {

            primary:

                CTM.generatePrimaryRecommendation(),

            nextAction:

                CTM.generateNextAction()

        };

    };

    /*==================================================
    Get Insight
    ==================================================*/

    CTM.getInsight = function () {

        return CTM.state.insights;

    };

    /*==================================================
    Get Recommendation
    ==================================================*/

    CTM.getRecommendation = function () {

        return CTM.state.recommendations;

    };

    /*==================================================
    Refresh Engine
    ==================================================*/

    CTM.refreshInsights = function () {

        CTM.calculateInsights();

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
