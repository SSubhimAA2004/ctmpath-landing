
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Dynamic Text Personalization

Responsibility
• Replace Dynamic Tokens
• Journey Progress
• Completion Percentage
• Readiness Score
• Pattern
• Insight
• Recommendation
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
    Safe Value
    ==================================================*/

    CTM.safeValue = function (value, fallback = '') {

        return value === undefined || value === null

            ? fallback

            : value;

    };

    /*==================================================
    Dynamic Tokens
    ==================================================*/

    CTM.dynamicTokens = {

        '{JourneyProgress}' : function () {

            return CTM.safeValue(

                CTM.state?.journey?.progress,

                0

            );

        },

        '{Completion}' : function () {

            return CTM.safeValue(

                CTM.state?.journey?.completion,

                0

            ) + '%';

        },

        '{ReadinessScore}' : function () {

            return CTM.safeValue(

                CTM.state?.scores?.readiness,

                0

            );

        },

        '{Pattern}' : function () {

            return CTM.safeValue(

                CTM.state?.scores?.pattern,

                ''

            );

        },

        '{Insight}' : function () {

            return CTM.safeValue(

                CTM.state?.insights?.summary,

                ''

            );

        },

        '{Recommendation}' : function () {

            return CTM.safeValue(

                CTM.state?.recommendations?.primary,

                ''

            );

        }

    };

    /*==================================================
    Replace Dynamic Tokens
    ==================================================*/

    CTM.replaceDynamicTokens = function (text) {

        if (!text) {

            return '';

        }

        let output = text;

        Object.keys(

            CTM.dynamicTokens

        ).forEach(function (token) {

            output = output.replaceAll(

                token,

                String(

                    CTM.dynamicTokens[token]()

                )

            );

        });

        return output;

    };

    /*==================================================
    Replace All Tokens
    ==================================================*/

    CTM.personalizeText = function (text) {

        if (!text) {

            return '';

        }

        if (

            typeof CTM.replaceTokens ===

            'function'

        ) {

            text = CTM.replaceTokens(text);

        }

        text = CTM.replaceDynamicTokens(text);

        return text;

    };

    /*==================================================
    Personalize Element
    ==================================================*/

    CTM.personalizeTextElement = function (element) {

        if (!element) {

            return;

        }

        if (!element.dataset.template) {

            element.dataset.template =

                element.innerHTML;

        }

        element.innerHTML =

            CTM.personalizeText(

                element.dataset.template

            );

    };

    /*==================================================
    Refresh Screen
    ==================================================*/

    CTM.refreshDynamicContent = function () {

        document

            .querySelectorAll(

                '[data-personalize]'

            )

            .forEach(function (element) {

                CTM.personalizeTextElement(

                    element

                );

            });

    };

    /*==================================================
    Progress Bar
    ==================================================*/

    CTM.refreshProgressDisplay = function () {

        const completion =

            CTM.safeValue(

                CTM.state?.journey?.completion,

                0

            );

        const progressBar =

            document.querySelector(

                '.progress-fill'

            );

        if (progressBar) {

            progressBar.style.width =

                completion + '%';

        }

        const percent =

            document.querySelector(

                '.progress-percent'

            );

        if (percent) {

            percent.textContent =

                completion + '%';

        }

    };

    /*==================================================
    Global Refresh
    ==================================================*/

    CTM.refreshText = function () {

        if (

            typeof CTM.refreshPersonalization ===

            'function'

        ) {

            CTM.refreshPersonalization();

        }

        CTM.refreshDynamicContent();

        CTM.refreshProgressDisplay();

    };

})();
