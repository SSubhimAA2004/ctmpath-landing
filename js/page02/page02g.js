
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 *     js/page02/page02g.js
 *
 * VERSION:
 *     1.0
 *
 * PAGE:
 *     PAGE 02G — LIFE GAP ANALYSIS™
 *
 * STATUS:
 *     FINAL RESULT / PRESENTATION CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Page 02G receives the completed Millionaire Lifestyle Scorecard™ from
 * Page 02F and presents the user's Life Gap Analysis™.
 *
 * FINAL FLOW:
 *
 *     PAGE 02A
 *          ↓
 *     PAGE 02B
 *          ↓
 *     PAGE 02C
 *          ↓
 *     PAGE 02D
 *          ↓
 *     PAGE 02E
 *          ↓
 *     PAGE 02F
 *          ↓
 *     VALIDATE 25 / 25
 *          ↓
 *     CALCULATE 100-POINT SCORE
 *          ↓
 *     SAVE DISCOVERY
 *          ↓
 *     PAGE 02G
 *     LIFE GAP ANALYSIS™
 *
 * =============================================================================
 *
 * RESPONSIBILITIES
 *
 *     ✓ verify Page 02 dependencies
 *     ✓ read completed Page 02 scorecard
 *     ✓ read stored completion state
 *     ✓ calculate current score
 *     ✓ calculate ideal score
 *     ✓ calculate gap
 *     ✓ calculate dimension percentages
 *     ✓ identify strongest dimension
 *     ✓ identify largest growth opportunity
 *     ✓ render the five dimensions
 *     ✓ render all 25 indicators
 *     ✓ render current / ideal / gap comparison
 *     ✓ render overall score
 *     ✓ render journey progress
 *     ✓ render interpretation
 *     ✓ render next-step CTA
 *     ✓ protect against incomplete scorecards
 *
 * =============================================================================
 *
 * NON-RESPONSIBILITIES
 *
 *     ✗ scoring input
 *     ✗ changing answers
 *     ✗ modifying Page02Session scoring
 *     ✗ modifying Page02Data
 *     ✗ backend calculation
 *     ✗ duplicate saveDiscovery()
 *     ✗ rebuilding KYC
 *     ✗ Page 03 assessment engine
 *
 * =============================================================================
 */

'use strict';

(function(window, document){

    /* =========================================================================
     * CONFIGURATION
     * =========================================================================
     */

    const CONFIG = {

        pageId:
            'page02g',

        version:
            '1.0',

        previousPage:
            'page02f.html',

        nextPage:
            'page03.html',

        expectedDimensions:
            5,

        expectedIndicators:
            25,

        indicatorMaximum:
            4,

        totalMaximum:
            100,

        completedProgress:
            25,

        /* ---------------------------------------------------------------
         * Dimension IDs
         * --------------------------------------------------------------- */

        dimensionIds: [

            'wealth',

            'incomeCashFlow',

            'assets',

            'lifestyleFreedom',

            'protectionContribution'

        ]

    };


    /* =========================================================================
     * DOM CONTRACT
     * =========================================================================
     *
     * The controller supports the page02g presentation structure while also
     * tolerating slightly different IDs where the markup has been refined.
     * =========================================================================
     */

    const DOM = {

        page:
            'page02g',

        loading:
            'page02gLoading',

        error:
            'page02gError',

        content:
            'page02gContent',

        overallScore:
            'page02gOverallScore',

        overallPercentage:
            'page02gOverallPercentage',

        overallGap:
            'page02gOverallGap',

        overallGapPercentage:
            'page02gOverallGapPercentage',

        answered:
            'page02gAnswered',

        indicatorCount:
            'page02gIndicatorCount',

        dimensionCount:
            'page02gDimensionCount',

        progressValue:
            'page02gProgressValue',

        progressFill:
            'page02gProgressFill',

        dimensions:
            'page02gDimensions',

        dimensionGrid:
            'page02gDimensionGrid',

        indicators:
            'page02gIndicators',

        indicatorGrid:
            'page02gIndicatorGrid',

        dimensionBars:
            'page02gDimensionBars',

        strongestDimension:
            'page02gStrongestDimension',

        strongestDimensionEnglish:
            'page02gStrongestDimensionEnglish',

        strongestDimensionScore:
            'page02gStrongestDimensionScore',

        growthDimension:
            'page02gGrowthDimension',

        growthDimensionEnglish:
            'page02gGrowthDimensionEnglish',

        growthDimensionScore:
            'page02gGrowthDimensionScore',

        interpretation:
            'page02gInterpretation',

        interpretationEnglish:
            'page02gInterpretationEnglish',

        ringProgress:
            'page02gRingProgress',

        ringValue:
            'page02gRingValue',

        ringPercentage:
            'page02gRingPercentage',

        nextButton:
            'page02gContinueButton',

        backButton:
            'page02gBackButton',

        totalScore:
            'page02gTotalScore',

        gapValue:
            'page02gGapValue',

        status:
            'page02gStatus',

        journeyProgress:
            'page02gJourneyProgress',

        completionState:
            'page02gCompletionState'

    };


    /* =========================================================================
     * STATE
     * =========================================================================
     */

    let initialized =
        false;

    let rendering =
        false;

    let navigating =
        false;

    let result =
        null;


    /* =========================================================================
     * DOM HELPERS
     * =========================================================================
     */

    function getElement(id){

        return (
            document.getElementById(id) ||
            null
        );

    }


    function query(selector){

        return (
            document.querySelector(selector) ||
            null
        );

    }


    function queryAll(selector){

        return Array.from(
            document.querySelectorAll(selector)
        );

    }


    function setText(
        id,
        value
    ){

        const element =
            getElement(id);

        if(!element){

            return;

        }

        element.textContent =
            value === undefined ||
            value === null
                ? ''
                : String(value);

    }


    function setHTML(
        id,
        value
    ){

        const element =
            getElement(id);

        if(!element){

            return;

        }

        element.innerHTML =
            value === undefined ||
            value === null
                ? ''
                : String(value);

    }


    function show(
        id
    ){

        const element =
            getElement(id);

        if(!element){

            return;

        }

        element.hidden =
            false;

        element.removeAttribute(
            'aria-hidden'
        );

    }


    function hide(
        id
    ){

        const element =
            getElement(id);

        if(!element){

            return;

        }

        element.hidden =
            true;

        element.setAttribute(
            'aria-hidden',
            'true'
        );

    }


    /* =========================================================================
     * NUMBER HELPERS
     * =========================================================================
     */

    function number(
        value,
        fallback
    ){

        const parsed =
            Number(value);

        if(
            Number.isFinite(parsed)
        ){

            return parsed;

        }

        return (
            fallback === undefined
                ? 0
                : fallback
        );

    }


    function clamp(
        value,
        minimum,
        maximum
    ){

        return Math.min(
            maximum,
            Math.max(
                minimum,
                number(value)
            )
        );

    }


    function round(
        value
    ){

        return Math.round(
            number(value)
        );

    }


    function percentage(
        score,
        maximum
    ){

        const safeMaximum =
            number(maximum);

        if(
            safeMaximum <= 0
        ){

            return 0;

        }

        return round(
            (
                number(score) /
                safeMaximum
            ) *
            100
        );

    }


    /* =========================================================================
     * TEXT HELPERS
     * =========================================================================
     */

    function escapeHTML(
        value
    ){

        return String(
            value === undefined ||
            value === null
                ? ''
                : value
        )
        .replace(
            /&/g,
            '&amp;'
        )
        .replace(
            /</g,
            '&lt;'
        )
        .replace(
            />/g,
            '&gt;'
        )
        .replace(
            /"/g,
            '&quot;'
        )
        .replace(
            /'/g,
            '&#039;'
        );

    }


    function safeTamil(
        object
    ){

        if(
            !object ||
            typeof object !== 'object'
        ){

            return '';

        }

        return (
            object.tamil ||
            object.ta ||
            object.labelTamil ||
            object.nameTamil ||
            ''
        );

    }


    function safeEnglish(
        object
    ){

        if(
            !object ||
            typeof object !== 'object'
        ){

            return '';

        }

        return (
            object.english ||
            object.en ||
            object.labelEnglish ||
            object.nameEnglish ||
            ''
        );

    }


    /* =========================================================================
     * DEPENDENCY VERIFICATION
     * =========================================================================
     */

    function verifyDependencies(){

        const missing =
            [];

        if(
            !window.Page02Data
        ){

            missing.push(
                'Page02Data'
            );

        }

        if(
            !window.Page02Session
        ){

            missing.push(
                'Page02Session'
            );

        }

        if(
            missing.length
        ){

            console.error(
                'CTM PATH™ Page 02G missing dependencies:',
                missing
            );

            return false;

        }

        return true;

    }


    /* =========================================================================
     * SCORECARD DATA
     * =========================================================================
     */

    function getDimensions(){

        if(
            !window.Page02Data
        ){

            return [];

        }

        if(
            Array.isArray(
                window.Page02Data.DIMENSIONS
            )
        ){

            return (
                window.Page02Data.DIMENSIONS
            );

        }

        if(
            Array.isArray(
                window.Page02Data.dimensions
            )
        ){

            return (
                window.Page02Data.dimensions
            );

        }

        return [];

    }


    function getAllIndicators(){

        const dimensions =
            getDimensions();

        const indicators =
            [];

        dimensions.forEach(
            function(
                dimension
            ){

                if(
                    !dimension ||
                    !Array.isArray(
                        dimension.indicators
                    )
                ){

                    return;

                }

                dimension.indicators.forEach(
                    function(
                        indicator
                    ){

                        if(indicator){

                            indicators.push(
                                indicator
                            );

                        }

                    }
                );

            }
        );

        return indicators;

    }


    function getAnswer(
        indicatorId
    ){

        if(
            !window.Page02Session
        ){

            return null;

        }


        /*
         * Primary contract.
         */

        if(
            typeof window.Page02Session.getAnswer ===
            'function'
        ){

            return (
                window.Page02Session.getAnswer(
                    indicatorId
                )
            );

        }


        /*
         * Alternative contract used by some frozen
         * Page 02 session versions.
         */

        if(
            typeof window.Page02Session.getAnswers ===
            'function'
        ){

            const answers =
                window.Page02Session.getAnswers() ||
                {};

            if(
                Array.isArray(
                    answers
                )
            ){

                const found =
                    answers.find(
                        function(
                            answer
                        ){

                            return (
                                answer &&
                                (
                                    answer.indicatorId ===
                                    indicatorId ||

                                    answer.id ===
                                    indicatorId
                                )
                            );

                        }
                    );

                return (
                    found ||
                    null
                );

            }

            return (
                answers[indicatorId] ||
                null
            );

        }


        /*
         * Direct answer object fallback.
         */

        if(
            window.Page02Session.answers
        ){

            const answers =
                window.Page02Session.answers;

            if(
                Array.isArray(
                    answers
                )
            ){

                return (
                    answers.find(
                        function(
                            answer
                        ){

                            return (
                                answer &&
                                (
                                    answer.indicatorId ===
                                    indicatorId ||

                                    answer.id ===
                                    indicatorId
                                )
                            );

                        }
                    ) ||
                    null
                );

            }

            return (
                answers[indicatorId] ||
                null
            );

        }

        return null;

    }


    /* =========================================================================
     * NORMALIZE ANSWER SCORE
     * =========================================================================
     */

    function normalizeAnswerScore(
        answer,
        indicator
    ){

        if(
            answer === undefined ||
            answer === null
        ){

            return 0;

        }


        /*
         * Numeric answer.
         */

        if(
            typeof answer ===
            'number'
        ){

            return clamp(
                answer,
                0,
                CONFIG.indicatorMaximum
            );

        }


        /*
         * Object answer.
         */

        if(
            typeof answer ===
            'object'
        ){

            const directScore =
                number(
                    answer.score,
                    NaN
                );

            if(
                Number.isFinite(
                    directScore
                )
            ){

                return clamp(
                    directScore,
                    0,
                    CONFIG.indicatorMaximum
                );

            }


            const valueScore =
                number(
                    answer.value,
                    NaN
                );

            if(
                Number.isFinite(
                    valueScore
                )
            ){

                return clamp(
                    valueScore,
                    0,
                    CONFIG.indicatorMaximum
                );

            }


            const selectedScore =
                number(
                    answer.selectedScore,
                    NaN
                );

            if(
                Number.isFinite(
                    selectedScore
                )
            ){

                return clamp(
                    selectedScore,
                    0,
                    CONFIG.indicatorMaximum
                );

            }


            if(
                answer.option &&
                typeof answer.option ===
                'object'
            ){

                const optionScore =
                    number(
                        answer.option.score,
                        NaN
                    );

                if(
                    Number.isFinite(
                        optionScore
                    )
                ){

                    return clamp(
                        optionScore,
                        0,
                        CONFIG.indicatorMaximum
                    );

                }

            }

        }


        /*
         * If the session exposes only an option identifier,
         * resolve it from the frozen Page02Data definition.
         */

        if(
            typeof answer ===
            'string' &&
            indicator &&
            Array.isArray(
                indicator.options
            )
        ){

            const option =
                indicator.options.find(
                    function(
                        item
                    ){

                        return (
                            item &&
                            (
                                item.id ===
                                answer ||

                                item.value ===
                                answer ||

                                item.key ===
                                answer
                            )
                        );

                    }
                );

            if(option){

                return clamp(
                    number(
                        option.score
                    ),
                    0,
                    CONFIG.indicatorMaximum
                );

            }

        }

        return 0;

    }


    /* =========================================================================
     * READ INDICATOR RESULT
     * =========================================================================
     */

    function getIndicatorResult(
        indicator
    ){

        if(
            !indicator
        ){

            return null;

        }

        const answer =
            getAnswer(
                indicator.id
            );

        const score =
            normalizeAnswerScore(
                answer,
                indicator
            );

        const maximum =
            CONFIG.indicatorMaximum;

        const indicatorPercentage =
            percentage(
                score,
                maximum
            );

        return {

            id:
                indicator.id,

            number:
                indicator.number ||
                indicator.index ||
                '',

            tamil:
                safeTamil(
                    indicator
                ),

            english:
                safeEnglish(
                    indicator
                ),

            score:
                score,

            maximumScore:
                maximum,

            percentage:
                indicatorPercentage,

            gap:
                maximum -
                score,

            answered:
                score > 0

        };

    }


    /* =========================================================================
     * DIMENSION SCORE
     * =========================================================================
     */

    function getDimensionScore(
        dimension
    ){

        if(
            !dimension
        ){

            return 0;

        }


        /*
         * Frozen Page02Session contract.
         */

        if(
            window.Page02Session &&
            typeof window.Page02Session.getDimensionScore ===
            'function'
        ){

            return clamp(
                number(
                    window.Page02Session.getDimensionScore(
                        dimension.id
                    )
                ),
                0,
                dimension.indicators.length *
                CONFIG.indicatorMaximum
            );

        }


        /*
         * Safe fallback:
         * derive from indicators.
         */

        return (
            Array.isArray(
                dimension.indicators
            )
                ? dimension.indicators.reduce(
                    function(
                        total,
                        indicator
                    ){

                        const result =
                            getIndicatorResult(
                                indicator
                            );

                        return (
                            total +
                            (
                                result
                                    ? result.score
                                    : 0
                            )
                        );

                    },
                    0
                )
                : 0
        );

    }


    /* =========================================================================
     * BUILD COMPLETE RESULT
     * =========================================================================
     */

    function buildResult(){

        const dimensions =
            getDimensions();

        const indicators =
            getAllIndicators();

        if(
            dimensions.length !==
            CONFIG.expectedDimensions
        ){

            return {

                valid:
                    false,

                reason:
                    'invalid-dimension-count',

                dimensions:
                    dimensions.length

            };

        }


        if(
            indicators.length !==
            CONFIG.expectedIndicators
        ){

            return {

                valid:
                    false,

                reason:
                    'invalid-indicator-count',

                indicators:
                    indicators.length

            };

        }


        const dimensionResults =
            dimensions.map(
                function(
                    dimension,
                    index
                ){

                    const indicatorResults =
                        Array.isArray(
                            dimension.indicators
                        )
                            ? dimension.indicators.map(
                                getIndicatorResult
                            ).filter(Boolean)
                            : [];

                    const maximumScore =
                        indicatorResults.length *
                        CONFIG.indicatorMaximum;

                    const score =
                        getDimensionScore(
                            dimension
                        );

                    return {

                        index:
                            index + 1,

                        dimensionId:
                            dimension.id,

                        tamil:
                            safeTamil(
                                dimension
                            ),

                        english:
                            safeEnglish(
                                dimension
                            ),

                        score:
                            clamp(
                                score,
                                0,
                                maximumScore
                            ),

                        maximumScore:
                            maximumScore,

                        percentage:
                            percentage(
                                score,
                                maximumScore
                            ),

                        gap:
                            maximumScore -
                            clamp(
                                score,
                                0,
                                maximumScore
                            ),

                        indicators:
                            indicatorResults

                    };

                }
            );


        const totalScore =
            dimensionResults.reduce(
                function(
                    total,
                    dimension
                ){

                    return (
                        total +
                        dimension.score
                    );

                },
                0
            );


        const totalMaximum =
            dimensionResults.reduce(
                function(
                    total,
                    dimension
                ){

                    return (
                        total +
                        dimension.maximumScore
                    );

                },
                0
            );


        const totalPercentage =
            percentage(
                totalScore,
                totalMaximum
            );


        const totalGap =
            totalMaximum -
            totalScore;


        const strongest =
            dimensionResults.reduce(
                function(
                    best,
                    current
                ){

                    if(
                        !best ||
                        current.percentage >
                        best.percentage
                    ){

                        return current;

                    }

                    return best;

                },
                null
            );


        const growth =
            dimensionResults.reduce(
                function(
                    weakest,
                    current
                ){

                    if(
                        !weakest ||
                        current.percentage <
                        weakest.percentage
                    ){

                        return current;

                    }

                    return weakest;

                },
                null
            );


        const answeredIndicators =
            dimensionResults.reduce(
                function(
                    total,
                    dimension
                ){

                    return (
                        total +
                        dimension.indicators.filter(
                            function(
                                indicator
                            ){

                                return (
                                    indicator &&
                                    indicator.answered
                                );

                            }
                        ).length
                    );

                },
                0
            );


        return {

            valid:
                true,

            dimensions:
                dimensionResults,

            indicators:
                dimensionResults.reduce(
                    function(
                        all,
                        dimension
                    ){

                        return all.concat(
                            dimension.indicators
                        );

                    },
                    []
                ),

            totalScore:
                totalScore,

            totalMaximum:
                totalMaximum,

            totalPercentage:
                totalPercentage,

            totalGap:
                totalGap,

            answeredIndicators:
                answeredIndicators,

            expectedIndicators:
                CONFIG.expectedIndicators,

            strongest:
                strongest,

            growth:
                growth

        };

    }


    /* =========================================================================
     * VALIDATE COMPLETED SCORECARD
     * =========================================================================
     */

    function validateResult(
        data
    ){

        if(
            !data ||
            !data.valid
        ){

            return false;

        }


        if(
            data.dimensions.length !==
            CONFIG.expectedDimensions
        ){

            return false;

        }


        if(
            data.indicators.length !==
            CONFIG.expectedIndicators
        ){

            return false;

        }


        /*
         * The frozen scoring model requires one answer
         * for every indicator. Scores are 1–4.
         */

        const unanswered =
            data.indicators.filter(
                function(
                    indicator
                ){

                    return (
                        !indicator ||
                        indicator.score <
                        1
                    );

                }
            );


        if(
            unanswered.length
        ){

            console.warn(
                'CTM PATH™ Page 02G found unanswered indicators:',
                unanswered
            );

            return false;

        }


        if(
            data.totalScore <
            CONFIG.expectedIndicators
        ){

            return false;

        }


        if(
            data.totalScore >
            CONFIG.totalMaximum
        ){

            return false;

        }


        return true;

    }


    /* =========================================================================
     * STATUS / LIFE LEVEL
     * =========================================================================
     */

    function getLifeLevel(
        score
    ){

        const value =
            number(score);

        if(
            value < 40
        ){

            return {

                tamil:
                    'தொடக்க நிலை',

                english:
                    'FOUNDATION',

                className:
                    'score-starting'

            };

        }


        if(
            value < 60
        ){

            return {

                tamil:
                    'உருவாகும் நிலை',

                english:
                    'EMERGING',

                className:
                    'score-progressing'

            };

        }


        if(
            value < 80
        ){

            return {

                tamil:
                    'முன்னேற்ற நிலை',

                english:
                    'PROGRESSING',

                className:
                    'score-advancing'

            };

        }


        return {

            tamil:
                'வளர்ந்த நிலை',

            english:
                'ADVANCING',

            className:
                'score-achieved'

        };

    }


    function getIndicatorStatus(
        percentageValue
    ){

        if(
            percentageValue <
            25
        ){

            return {

                tamil:
                    'தொடக்கம்',

                english:
                    'STARTING™',

                className:
                    'score-starting'

            };

        }


        if(
            percentageValue <
            50
        ){

            return {

                tamil:
                    'உருவாகும் நிலை',

                english:
                    'EMERGING™',

                className:
                    'score-progressing'

            };

        }


        if(
            percentageValue <
            75
        ){

            return {

                tamil:
                    'முன்னேற்றம்',

                english:
                    'PROGRESSING™',

                className:
                    'score-advancing'

            };

        }


        return {

            tamil:
                'வலுவான நிலை',

            english:
                'ADVANCING™',

            className:
                'score-achieved'

        };

    }


    /* =========================================================================
     * INTERPRETATION
     * =========================================================================
     */

    function buildInterpretation(
        data
    ){

        const score =
            data.totalPercentage;

        if(
            score < 40
        ){

            return {

                tamil:
                    'உங்கள் வாழ்க்கையின் பல முக்கிய பகுதிகளில் அடித்தளத்தை வலுப்படுத்த வேண்டிய இடம் தெளிவாகத் தெரிகிறது. இது தோல்வி அல்ல — அடுத்த கட்ட வளர்ச்சிக்கான தொடக்கப் புள்ளி.',

                english:
                    'Your score shows clear areas where the foundation needs strengthening. This is not a failure — it is the starting point for your next level of growth.'

            };

        }


        if(
            score < 60
        ){

            return {

                tamil:
                    'நீங்கள் முன்னேறிக் கொண்டிருக்கிறீர்கள். சில பகுதிகளில் நல்ல அடித்தளம் உருவாகியுள்ளது; ஆனால் உங்கள் கனவு வாழ்க்கைக்கும் தற்போதைய நிலைக்கும் இடையே இன்னும் முக்கியமான இடைவெளி உள்ளது.',

                english:
                    'You are moving forward. A foundation is forming in several areas, but a meaningful gap still exists between your desired life and your current reality.'

            };

        }


        if(
            score < 80
        ){

            return {

                tamil:
                    'உங்கள் வாழ்க்கையில் பல வலுவான பகுதிகள் உள்ளன. அடுத்த கட்டம் எல்லாவற்றையும் ஒரே நேரத்தில் மாற்றுவது அல்ல — மிகப் பெரிய இடைவெளியை மூடுவதில் கவனம் செலுத்துவது.',

                english:
                    'You already have several strong areas. The next step is not to change everything at once — it is to focus on closing the most important gap.'

            };

        }


        return {

            tamil:
                'உங்கள் வாழ்க்கை பல முக்கிய பரிமாணங்களில் வலுவான நிலையில் உள்ளது. இப்போது கவனம் பாதுகாப்பு, தொடர்ச்சியான வளர்ச்சி மற்றும் உங்கள் தாக்கத்தை விரிவுபடுத்துவதில் இருக்க வேண்டும்.',

            english:
                'Your life is strong across many important dimensions. The focus now should be protection, continued growth and expanding your impact.'

        };

    }


    /* =========================================================================
     * RENDER BASIC RESULT
     * =========================================================================
     */

    function renderOverall(
        data
    ){

        setText(
            DOM.overallScore,
            data.totalScore
        );

        setText(
            DOM.overallPercentage,
            data.totalPercentage + '%'
        );

        setText(
            DOM.overallGap,
            data.totalGap
        );

        setText(
            DOM.overallGapPercentage,
            (
                100 -
                data.totalPercentage
            ) + '%'
        );

        setText(
            DOM.totalScore,
            data.totalScore
        );

        setText(
            DOM.gapValue,
            data.totalGap
        );

        setText(
            DOM.answered,
            data.answeredIndicators
        );

        setText(
            DOM.indicatorCount,
            data.expectedIndicators
        );

        setText(
            DOM.dimensionCount,
            data.dimensions.length
        );

        setText(
            DOM.progressValue,
            '25 / 25'
        );

        setText(
            DOM.journeyProgress,
            '25 / 25'
        );

        setText(
            DOM.completionState,
            'COMPLETE'
        );


        const progressFill =
            getElement(
                DOM.progressFill
            );

        if(progressFill){

            progressFill.style.width =
                '100%';

            progressFill.setAttribute(
                'aria-valuenow',
                '100'
            );

        }


        const lifeLevel =
            getLifeLevel(
                data.totalPercentage
            );


        const page =
            getElement(
                DOM.page
            );

        if(page){

            page.classList.remove(
                'score-starting',
                'score-progressing',
                'score-advancing',
                'score-achieved'
            );

            page.classList.add(
                lifeLevel.className
            );

        }


        const status =
            getElement(
                DOM.status
            );

        if(status){

            status.textContent =
                lifeLevel.english;

            status.setAttribute(
                'data-status',
                lifeLevel.className
            );

        }

    }


    /* =========================================================================
     * RENDER STRONGEST / GROWTH
     * =========================================================================
     */

    function renderHighlights(
        data
    ){

        if(
            data.strongest
        ){

            setText(
                DOM.strongestDimension,
                data.strongest.tamil
            );

            setText(
                DOM.strongestDimensionEnglish,
                data.strongest.english
            );

            setText(
                DOM.strongestDimensionScore,
                data.strongest.score +
                ' / ' +
                data.strongest.maximumScore
            );

        }


        if(
            data.growth
        ){

            setText(
                DOM.growthDimension,
                data.growth.tamil
            );

            setText(
                DOM.growthDimensionEnglish,
                data.growth.english
            );

            setText(
                DOM.growthDimensionScore,
                data.growth.score +
                ' / ' +
                data.growth.maximumScore
            );

        }

    }


    /* =========================================================================
     * DIMENSION CARD
     * =========================================================================
     */

    function createDimensionCard(
        dimension
    ){

        const card =
            document.createElement(
                'article'
            );

        card.className =
            'page02g-dimension-card';


        if(
            result &&
            result.strongest &&
            dimension.dimensionId ===
            result.strongest.dimensionId
        ){

            card.classList.add(
                'is-strongest'
            );

        }


        if(
            result &&
            result.growth &&
            dimension.dimensionId ===
            result.growth.dimensionId
        ){

            card.classList.add(
                'is-growth'
            );

        }


        const number =
            String(
                dimension.index
            ).padStart(
                2,
                '0'
            );


        let badge =
            '';


        if(
            result &&
            result.strongest &&
            dimension.dimensionId ===
            result.strongest.dimensionId
        ){

            badge =
                `
                    <span
                        class="
                            page02g-dimension-badge
                            page02g-dimension-badge-strongest
                        "
                    >
                        STRONGEST
                    </span>
                `;

        }
        else
        if(
            result &&
            result.growth &&
            dimension.dimensionId ===
            result.growth.dimensionId
        ){

            badge =
                `
                    <span
                        class="
                            page02g-dimension-badge
                            page02g-dimension-badge-growth
                        "
                    >
                        GROWTH OPPORTUNITY
                    </span>
                `;

        }


        card.innerHTML =
            `
                <div
                    class="page02g-dimension-card-header"
                >

                    <span
                        class="page02g-dimension-number"
                    >
                        ${escapeHTML(number)}
                    </span>

                    <div
                        class="page02g-dimension-card-score"
                    >

                        <strong>
                            ${escapeHTML(dimension.score)}
                        </strong>

                        <span>
                            /
                            ${escapeHTML(dimension.maximumScore)}
                        </span>

                    </div>

                </div>


                <p
                    class="page02g-dimension-tamil"
                >
                    ${escapeHTML(dimension.tamil)}
                </p>


                <p
                    class="page02g-dimension-english"
                >
                    ${escapeHTML(dimension.english)}
                </p>


                <div
                    class="page02g-dimension-percentage"
                >

                    <span
                        class="page02g-dimension-percentage-label"
                    >
                        ALIGNMENT
                    </span>

                    <strong
                        class="page02g-dimension-percentage-value"
                    >
                        ${escapeHTML(dimension.percentage)}%
                    </strong>

                </div>


                <div
                    class="page02g-dimension-progress"
                    aria-hidden="true"
                >

                    <span
                        class="page02g-dimension-progress-fill"
                        style="
                            width:${dimension.percentage}%;
                        "
                    ></span>

                </div>


                <div
                    class="page02g-dimension-gap"
                >

                    <span>
                        GAP
                    </span>

                    <strong>
                        ${escapeHTML(dimension.gap)}
                    </strong>

                </div>


                ${badge}
            `;


        return card;

    }


    /* =========================================================================
     * RENDER DIMENSIONS
     * =========================================================================
     */

    function renderDimensions(
        data
    ){

        const grid =
            getElement(
                DOM.dimensionGrid
            ) ||
            getElement(
                DOM.dimensions
            );

        if(!grid){

            return;

        }


        grid.innerHTML =
            '';


        data.dimensions.forEach(
            function(
                dimension
            ){

                grid.appendChild(
                    createDimensionCard(
                        dimension
                    )
                );

            }
        );

    }


    /* =========================================================================
     * CREATE INDICATOR CARD
     * =========================================================================
     */

    function createIndicatorCard(
        indicator,
        dimension,
        index
    ){

        const card =
            document.createElement(
                'article'
            );


        const status =
            getIndicatorStatus(
                indicator.percentage
            );


        card.className =
            'page02g-indicator-card ' +
            status.className;


        const indicatorNumber =
            indicator.number ||
            (
                index + 1
            );


        card.innerHTML =
            `
                <div
                    class="page02g-indicator-header"
                >

                    <span
                        class="page02g-indicator-number"
                    >
                        ${escapeHTML(
                            String(
                                indicatorNumber
                            ).padStart(
                                2,
                                '0'
                            )
                        )}
                    </span>

                    <span
                        class="page02g-indicator-score"
                    >
                        ${escapeHTML(
                            indicator.score
                        )}
                        /
                        ${escapeHTML(
                            indicator.maximumScore
                        )}
                    </span>

                </div>


                <p
                    class="page02g-indicator-tamil"
                >
                    ${escapeHTML(
                        indicator.tamil
                    )}
                </p>


                <p
                    class="page02g-indicator-english"
                >
                    ${escapeHTML(
                        indicator.english
                    )}
                </p>


                <div
                    class="page02g-indicator-range"
                >

                    <span
                        class="page02g-indicator-range-label"
                    >
                        CURRENT ALIGNMENT
                    </span>

                    <span
                        class="page02g-indicator-range-value"
                    >
                        ${escapeHTML(
                            indicator.percentage
                        )}%
                    </span>

                </div>


                <div
                    class="page02g-indicator-status"
                >

                    <span
                        class="page02g-indicator-status-tamil"
                    >
                        ${escapeHTML(
                            status.tamil
                        )}
                    </span>

                    <span
                        class="page02g-indicator-status-english"
                    >
                        ${escapeHTML(
                            status.english
                        )}
                    </span>

                </div>
            `;


        return card;

    }


    /* =========================================================================
     * RENDER INDICATORS
     * =========================================================================
     */

    function renderIndicators(
        data
    ){

        const grid =
            getElement(
                DOM.indicatorGrid
            ) ||
            getElement(
                DOM.indicators
            );

        if(!grid){

            return;

        }


        grid.innerHTML =
            '';


        let globalIndex =
            0;


        data.dimensions.forEach(
            function(
                dimension
            ){

                dimension.indicators.forEach(
                    function(
                        indicator
                    ){

                        grid.appendChild(
                            createIndicatorCard(
                                indicator,
                                dimension,
                                globalIndex
                            )
                        );

                        globalIndex++;

                    }
                );

            }
        );

    }


    /* =========================================================================
     * DIMENSION COMPARISON BAR
     * =========================================================================
     */

    function createDimensionBar(
        dimension
    ){

        const row =
            document.createElement(
                'div'
            );

        row.className =
            'page02g-dimension-bar';


        row.innerHTML =
            `
                <div
                    class="page02g-dimension-bar-label"
                >

                    <span
                        class="
                            page02g-dimension-bar-label-tamil
                        "
                    >
                        ${escapeHTML(
                            dimension.tamil
                        )}
                    </span>

                    <span
                        class="
                            page02g-dimension-bar-label-english
                        "
                    >
                        ${escapeHTML(
                            dimension.english
                        )}
                    </span>

                </div>


                <div
                    class="page02g-dimension-bar-track"
                    aria-hidden="true"
                >

                    <span
                        class="page02g-dimension-bar-fill"
                        style="
                            width:${dimension.percentage}%;
                        "
                    ></span>

                </div>


                <div
                    class="page02g-dimension-bar-score"
                >
                    ${escapeHTML(
                        dimension.score
                    )}
                    /
                    ${escapeHTML(
                        dimension.maximumScore
                    )}
                </div>


                <div
                    class="page02g-dimension-bar-gap"
                >
                    GAP TO CLOSE:
                    ${escapeHTML(
                        dimension.gap
                    )}
                </div>
            `;


        return row;

    }


    /* =========================================================================
     * RENDER DIMENSION BARS
     * =========================================================================
     */

    function renderDimensionBars(
        data
    ){

        const container =
            getElement(
                DOM.dimensionBars
            );

        if(!container){

            return;

        }


        container.innerHTML =
            '';


        data.dimensions.forEach(
            function(
                dimension
            ){

                container.appendChild(
                    createDimensionBar(
                        dimension
                    )
                );

            }
        );

    }


    /* =========================================================================
     * RENDER RING
     * =========================================================================
     */

    function renderRing(
        data
    ){

        const progress =
            getElement(
                DOM.ringProgress
            );

        const value =
            getElement(
                DOM.ringValue
            );

        const percentageElement =
            getElement(
                DOM.ringPercentage
            );


        if(value){

            value.textContent =
                data.totalPercentage + '%';

        }


        if(percentageElement){

            percentageElement.textContent =
                data.totalPercentage + '%';

        }


        if(
            !progress
        ){

            return;

        }


        const circumference =
            100;


        const offset =
            circumference -
            (
                data.totalPercentage /
                100
            ) *
            circumference;


        progress.style.strokeDasharray =
            circumference;


        progress.style.strokeDashoffset =
            offset;

    }


    /* =========================================================================
     * RENDER INTERPRETATION
     * =========================================================================
     */

    function renderInterpretation(
        data
    ){

        const copy =
            buildInterpretation(
                data
            );


        setText(
            DOM.interpretation,
            copy.tamil
        );

        setText(
            DOM.interpretationEnglish,
            copy.english
        );

    }


    /* =========================================================================
     * RENDER PAGE
     * =========================================================================
     */

    function renderPage(){

        if(
            rendering
        ){

            return;

        }


        rendering =
            true;


        try{

            result =
                buildResult();


            if(
                !result.valid
            ){

                showErrorState(
                    result
                );

                return;

            }


            if(
                !validateResult(
                    result
                )
            ){

                showIncompleteState(
                    result
                );

                return;

            }


            renderOverall(
                result
            );


            renderHighlights(
                result
            );


            renderDimensions(
                result
            );


            renderIndicators(
                result
            );


            renderDimensionBars(
                result
            );


            renderRing(
                result
            );


            renderInterpretation(
                result
            );


            hide(
                DOM.loading
            );


            hide(
                DOM.error
            );


            show(
                DOM.content
            );


            document.body.classList.add(
                'page02g-ready'
            );


            console.info(
                'CTM PATH™ Page 02G rendered.',
                {
                    score:
                        result.totalScore,

                    percentage:
                        result.totalPercentage,

                    gap:
                        result.totalGap,

                    answered:
                        result.answeredIndicators,

                    strongest:
                        result.strongest
                            ? result.strongest.dimensionId
                            : null,

                    growth:
                        result.growth
                            ? result.growth.dimensionId
                            : null
                }
            );

        }
        finally{

            rendering =
                false;

        }

    }


    /* =========================================================================
     * ERROR STATE
     * =========================================================================
     */

    function showErrorState(
        details
    ){

        hide(
            DOM.loading
        );


        const error =
            getElement(
                DOM.error
            );


        if(error){

            error.hidden =
                false;

            error.removeAttribute(
                'aria-hidden'
            );


            const title =
                error.querySelector(
                    '[data-error-title]'
                );


            const message =
                error.querySelector(
                    '[data-error-message]'
                );


            if(title){

                title.textContent =
                    'முடிவை ஏற்ற முடியவில்லை';

            }


            if(message){

                message.textContent =
                    'உங்கள் scorecard தரவை மீண்டும் சரிபார்க்கவும்.';

            }

        }


        hide(
            DOM.content
        );


        console.error(
            'CTM PATH™ Page 02G invalid result:',
            details
        );

    }


    function showIncompleteState(
        data
    ){

        hide(
            DOM.loading
        );


        const error =
            getElement(
                DOM.error
            );


        if(error){

            error.hidden =
                false;

            error.removeAttribute(
                'aria-hidden'
            );


            const title =
                error.querySelector(
                    '[data-error-title]'
                );


            const message =
                error.querySelector(
                    '[data-error-message]'
                );


            if(title){

                title.textContent =
                    'மதிப்பீடு இன்னும் முழுமையடையவில்லை';

            }


            if(message){

                message.textContent =
                    (
                        data &&
                        data.answeredIndicators !== undefined
                    )
                        ? (
                            data.answeredIndicators +
                            ' / ' +
                            CONFIG.expectedIndicators +
                            ' indicators completed.'
                        )
                        : '25 indicators must be completed.';

            }

        }


        hide(
            DOM.content
        );


        console.warn(
            'CTM PATH™ Page 02G scorecard is incomplete.',
            data
        );

    }


    /* =========================================================================
     * SCROLL TO TOP
     * =========================================================================
     */

    function scrollToTop(){

        window.scrollTo({

            top:
                0,

            left:
                0,

            behavior:
                'auto'

        });

    }


    /* =========================================================================
     * NAVIGATION STATE
     * =========================================================================
     */

    function setNavigationState(
        active
    ){

        navigating =
            Boolean(
                active
            );


        const nextButton =
            getElement(
                DOM.nextButton
            );

        const backButton =
            getElement(
                DOM.backButton
            );


        if(nextButton){

            nextButton.disabled =
                active;

            nextButton.setAttribute(
                'aria-busy',
                active
                    ? 'true'
                    : 'false'
            );

        }


        if(backButton){

            backButton.disabled =
                active;

            backButton.setAttribute(
                'aria-busy',
                active
                    ? 'true'
                    : 'false'
            );

        }

    }


    /* =========================================================================
     * BACK
     * =========================================================================
     */

    function goBack(
        event
    ){

        if(event){

            event.preventDefault();

        }


        if(
            navigating
        ){

            return;

        }


        setNavigationState(
            true
        );


        try{

            if(
                window.Page02Session &&
                typeof window.Page02Session.setCurrentDimension ===
                'function'
            ){

                window.Page02Session.setCurrentDimension(
                    'protectionContribution'
                );

            }

        }
        catch(error){

            console.warn(
                'CTM PATH™ Page 02G could not update session dimension:',
                error
            );

        }


        window.location.href =
            CONFIG.previousPage;

    }


    /* =========================================================================
     * NEXT — PAGE 03
     * =========================================================================
     */

    function goNext(
        event
    ){

        if(event){

            event.preventDefault();

        }


        if(
            navigating
        ){

            return;

        }


        /*
         * Re-read the score before navigation.
         * Page 02G never changes the score.
         */

        const freshResult =
            buildResult();


        if(
            !freshResult.valid ||
            !validateResult(
                freshResult
            )
        ){

            showIncompleteState(
                freshResult
            );

            return;

        }


        result =
            freshResult;


        setNavigationState(
            true
        );


        /*
         * Store only completion/navigation state.
         * The discovery payload itself has already been saved by Page 02F.
         */

        try{

            if(
                window.Page02Session
            ){

                if(
                    typeof window.Page02Session.setCurrentPage ===
                    'function'
                ){

                    window.Page02Session.setCurrentPage(
                        'page03'
                    );

                }


                if(
                    typeof window.Page02Session.setCurrentDimension ===
                    'function'
                ){

                    window.Page02Session.setCurrentDimension(
                        'lifeGapAnalysis'
                    );

                }


                if(
                    typeof window.Page02Session.setAssessmentComplete ===
                    'function'
                ){

                    window.Page02Session.setAssessmentComplete(
                        true
                    );

                }

            }

        }
        catch(error){

            console.warn(
                'CTM PATH™ Page 02G completion-state update warning:',
                error
            );

        }


        window.location.href =
            CONFIG.nextPage;

    }


    /* =========================================================================
     * BUTTON BINDINGS
     * =========================================================================
     */

    function bindNavigation(){

        const nextButton =
            getElement(
                DOM.nextButton
            );


        if(nextButton){

            nextButton.addEventListener(
                'click',
                goNext
            );

        }


        const backButton =
            getElement(
                DOM.backButton
            );


        if(backButton){

            backButton.addEventListener(
                'click',
                goBack
            );

        }

    }


    /* =========================================================================
     * KEYBOARD NAVIGATION
     * =========================================================================
     */

    function bindKeyboardNavigation(){

        document.addEventListener(
            'keydown',
            function(
                event
            ){

                if(
                    event.key ===
                    'Escape'
                ){

                    return;

                }


                if(
                    event.key ===
                    'Enter' &&
                    event.ctrlKey
                ){

                    const nextButton =
                        getElement(
                            DOM.nextButton
                        );

                    if(
                        nextButton &&
                        !nextButton.disabled
                    ){

                        event.preventDefault();

                        goNext(
                            event
                        );

                    }

                }

            }
        );

    }


    /* =========================================================================
     * PUBLIC RESULT API
     * =========================================================================
     */

    function getResult(){

        return (
            result
        );

    }


    function refresh(){

        renderPage();

    }


    /* =========================================================================
     * INITIALIZATION
     * =========================================================================
     */

    function init(){

        if(
            initialized
        ){

            return;

        }


        console.info(
            'CTM PATH™ Page 02G initializing — Life Gap Analysis™...'
        );


        if(
            !verifyDependencies()
        ){

            showErrorState(
                {
                    reason:
                        'missing-dependencies'
                }
            );

            return;

        }


        scrollToTop();


        bindNavigation();


        bindKeyboardNavigation();


        hide(
            DOM.content
        );


        show(
            DOM.loading
        );


        /*
         * Give the existing Page 02 session a moment to restore
         * persisted state when page02g.html is reached directly.
         */

        window.setTimeout(
            function(){

                renderPage();

                initialized =
                    true;

            },
            0
        );

    }


    /* =========================================================================
     * DOM READY
     * =========================================================================
     */

    if(
        document.readyState ===
        'loading'
    ){

        document.addEventListener(
            'DOMContentLoaded',
            init
        );

    }
    else{

        init();

    }


    /* =========================================================================
     * PUBLIC CONTROLLER
     * =========================================================================
     */

    window.Page02G = {

        version:
            CONFIG.version,

        pageId:
            CONFIG.pageId,

        init:
            init,

        refresh:
            refresh,

        getResult:
            getResult,

        getScore:
            function(){

                return (
                    result &&
                    result.valid
                        ? result.totalScore
                        : 0
                );

            },

        getPercentage:
            function(){

                return (
                    result &&
                    result.valid
                        ? result.totalPercentage
                        : 0
                );

            },

        getGap:
            function(){

                return (
                    result &&
                    result.valid
                        ? result.totalGap
                        : 0
                );

            },

        getDimensions:
            function(){

                return (
                    result &&
                    result.valid
                        ? result.dimensions
                        : []
                );

            },

        getIndicators:
            function(){

                return (
                    result &&
                    result.valid
                        ? result.indicators
                        : []
                );

            },

        goBack:
            goBack,

        goNext:
            goNext

    };


    /* =========================================================================
     * END
     *
     * PAGE 02G RESPONSIBILITY:
     *
     *     RECEIVE
     *        ↓
     *     VALIDATE
     *        ↓
     *     READ
     *        ↓
     *     ANALYSE
     *        ↓
     *     PRESENT
     *        ↓
     *     CONTINUE TO PAGE 03
     *
     * PAGE 02F remains the owner of:
     *
     *     ✓ final answer validation
     *     ✓ discovery payload creation
     *     ✓ CTM_API.saveDiscovery()
     *     ✓ completed scorecard persistence
     *
     * PAGE 02G remains the owner of:
     *
     *     ✓ Life Gap Analysis™
     *     ✓ current / ideal / gap presentation
     *     ✓ five-dimension comparison
     *     ✓ 25-indicator presentation
     *     ✓ strongest dimension
     *     ✓ growth opportunity
     *     ✓ final interpretation
     *     ✓ Page 03 gateway
     *
     * =============================================================================
     */

})(window, document);

