
/**
 * CTM PATH™ MILLIONAIRES™ — Guided Journey™
 * FILE: js/page02/page02f.js
 * VERSION: 5.0 — IN-PAGE FINAL RESULTS
 * PAGE 02F — DIMENSION 05 — PROTECTION & CONTRIBUTION™
 *
 * Frozen responsibilities:
 *   page02-data.js       → 5 dimensions / 25 indicators / ranges
 *   page02-session.js    → KYC / answers / scores / journey state
 *   page02-scorecard.js  → rendering / selection / scoring / validation
 *   page02f.js           → final validation / saveDiscovery / result reveal
 *
 * FINAL FLOW:
 *   Dimension 05
 *        ↓
 *   Validate 25 / 25
 *        ↓
 *   CTM_API.saveDiscovery()
 *        ↓
 *   Reveal FINAL RESULTS on this SAME PAGE
 *        ↓
 *   Explicit CONTINUE TO KALA CHAKRA™
 *        ↓
 *   page03.html
 *
 * IMPORTANT:
 *   The VIEW MY RESULT button MUST NEVER navigate directly to page03.html.
 */

'use strict';

(function (window, document) {

    /* =========================================================================
       CONFIGURATION
       ========================================================================= */

    const CONFIG = {
        dimensionId:
            'protectionContribution',

        previousDimensionId:
            'lifestyleFreedom',

        previousPage:
            'page02e.html',

        /*
         * IMPORTANT:
         * This is now ONLY the destination of the explicit
         * "CONTINUE TO KALA CHAKRA™" button.
         *
         * It is NOT used by VIEW MY RESULT.
         */
        nextPage:
            'page03.html',

        expectedIndicators:
            25,

        expectedDimensions:
            5,

        minimumScorePerIndicator:
            1,

        maximumScorePerIndicator:
            4,

        minimumTotalScore:
            25,

        maximumTotalScore:
            100
    };


    /* =========================================================================
       DOM CONTRACT
       ========================================================================= */

    const DOM_IDS = {

        previousButton:
            'previousButton',

        nextButton:
            'nextButton',

        message:
            'dimensionMessage',

        finalResults:
            'page02FinalResults',

        finalResultsGrid:
            'page02FinalResultsGrid',

        finalResultsTotal:
            'page02FinalResultsTotal',

        finalResultsContinue:
            'page02FinalResultsContinue'

    };


    /* =========================================================================
       STATE
       ========================================================================= */

    let initialized =
        false;


    let navigating =
        false;


    let submitting =
        false;


    /*
     * TRUE only after the final result has been successfully built.
     *
     * This is the key state that prevents the result button from
     * accidentally becoming a Page 03 navigator.
     */
    let finalResultVisible =
        false;


    /* =========================================================================
       DOM HELPER
       ========================================================================= */

    function getElement(id) {

        return (
            document.getElementById(id) ||
            null
        );

    }


    /* =========================================================================
       SCROLL TO TOP
       ========================================================================= */

    function scrollToTop() {

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
       VERIFY DEPENDENCIES
       ========================================================================= */

    function verifyDependencies() {

        const missing =
            [];


        if (
            !window.Page02Data
        ) {

            missing.push(
                'Page02Data'
            );

        }


        if (
            !window.Page02Session
        ) {

            missing.push(
                'Page02Session'
            );

        }


        if (
            !window.Page02Scorecard
        ) {

            missing.push(
                'Page02Scorecard'
            );

        }


        if (
            !window.CTM_API
        ) {

            missing.push(
                'CTM_API'
            );

        }


        if (
            missing.length
        ) {

            console.error(
                'CTM PATH™ Page 02F missing dependencies:',
                missing
            );


            return false;

        }


        return true;

    }


    /* =========================================================================
       VERIFY FINAL DIMENSION
       ========================================================================= */

    function verifyDimension() {

        const dimension =
            window.Page02Data.getDimensionById(
                CONFIG.dimensionId
            );


        if (
            !dimension
        ) {

            console.error(
                'CTM PATH™ Page 02F could not find Dimension 05:',
                CONFIG.dimensionId
            );


            return false;

        }


        if (
            !Array.isArray(
                dimension.indicators
            ) ||
            dimension.indicators.length !== 5
        ) {

            console.error(
                'CTM PATH™ Page 02F expected exactly five indicators.',
                dimension
            );


            return false;

        }


        return true;

    }


    /* =========================================================================
       NAVIGATION / SUBMISSION STATE
       ========================================================================= */

    function setNavigationState(
        active
    ) {

        navigating =
            Boolean(
                active
            );


        const previousButton =
            getElement(
                DOM_IDS.previousButton
            );


        const nextButton =
            getElement(
                DOM_IDS.nextButton
            );


        [
            previousButton,
            nextButton
        ].forEach(
            function (
                button
            ) {

                if (
                    !button
                ) {

                    return;

                }


                button.disabled =
                    Boolean(
                        active
                    );


                button.setAttribute(
                    'aria-busy',
                    active
                        ? 'true'
                        : 'false'
                );

            }
        );

    }


    /* =========================================================================
       SUBMITTING STATE
       ========================================================================= */

    function setSubmittingState(
        active
    ) {

        submitting =
            Boolean(
                active
            );


        setNavigationState(
            active
        );


        const nextButton =
            getElement(
                DOM_IDS.nextButton
            );


        if (
            !nextButton
        ) {

            return;

        }


        const primary =
            nextButton.querySelector(
                '.dimension-button-primary-text'
            );


        const secondary =
            nextButton.querySelector(
                '.dimension-button-secondary-text'
            );


        if (
            active
        ) {

            if (
                primary
            ) {

                primary.textContent =
                    'சேமிக்கப்படுகிறது...';

            }


            if (
                secondary
            ) {

                secondary.textContent =
                    'CALCULATING YOUR SCORE';

            }

        }
        else if (
            !finalResultVisible
        ) {

            if (
                primary
            ) {

                primary.textContent =
                    'என் முடிவைக் காண்க →';

            }


            if (
                secondary
            ) {

                secondary.textContent =
                    'VIEW MY RESULT';

            }

        }

    }


    /* =========================================================================
       SHOW ERROR
       ========================================================================= */

    function showError(
        message
    ) {

        if (
            window.Page02Scorecard &&
            typeof window.Page02Scorecard.showMessage ===
                'function'
        ) {

            window.Page02Scorecard.showMessage(
                message
            );


            return;

        }


        const element =
            getElement(
                DOM_IDS.message
            );


        if (
            !element
        ) {

            return;

        }


        element.textContent =
            message;


        element.hidden =
            false;


        element.classList.add(
            'is-visible'
        );

    }


    /* =========================================================================
       HIDE ERROR
       ========================================================================= */

    function hideError() {

        if (
            window.Page02Scorecard &&
            typeof window.Page02Scorecard.hideMessage ===
                'function'
        ) {

            window.Page02Scorecard.hideMessage();


            return;

        }


        const element =
            getElement(
                DOM_IDS.message
            );


        if (
            !element
        ) {

            return;

        }


        element.textContent =
            '';


        element.hidden =
            true;


        element.classList.remove(
            'is-visible'
        );

    }


    /* =========================================================================
       GO PREVIOUS
       ========================================================================= */

    function goPrevious(
        event
    ) {

        if (
            event
        ) {

            event.preventDefault();

        }


        if (
            navigating ||
            submitting
        ) {

            return;

        }


        if (
            typeof window.Page02Session.setCurrentDimension ===
                'function'
        ) {

            window.Page02Session.setCurrentDimension(
                CONFIG.previousDimensionId
            );

        }


        setNavigationState(
            true
        );


        window.location.href =
            CONFIG.previousPage;

    }


    /* =========================================================================
       GET ALL INDICATORS
       ========================================================================= */

    function getAllIndicators() {

        const dimensions =
            window.Page02Data.DIMENSIONS;


        if (
            !Array.isArray(
                dimensions
            )
        ) {

            return [];

        }


        const indicators =
            [];


        dimensions.forEach(
            function (
                dimension
            ) {

                if (
                    !dimension ||
                    !Array.isArray(
                        dimension.indicators
                    )
                ) {

                    return;

                }


                dimension.indicators.forEach(
                    function (
                        indicator
                    ) {

                        indicators.push({

                            dimensionId:
                                dimension.id,

                            dimensionTamil:
                                dimension.tamil ||
                                '',

                            dimensionEnglish:
                                dimension.english ||
                                '',

                            indicator:
                                indicator

                        });

                    }
                );

            }
        );


        return indicators;

    }


    /* =========================================================================
       NORMALIZE ANSWER
       ========================================================================= */

    function normalizeAnswer(
        record
    ) {

        const indicator =
            record.indicator;


        const answer =
            window.Page02Session.getAnswer(
                indicator.id
            );


        if (
            !answer
        ) {

            return null;

        }


        const score =
            Number(
                answer.score
            );


        if (
            !Number.isFinite(
                score
            ) ||
            score <
                CONFIG.minimumScorePerIndicator ||
            score >
                CONFIG.maximumScorePerIndicator
        ) {

            return null;

        }


        const selectedOption =
            Array.isArray(
                indicator.options
            )
                ? (
                    indicator.options.find(
                        function (
                            option
                        ) {

                            return (
                                Number(
                                    option.score
                                ) ===
                                score
                            );

                        }
                    ) ||
                    null
                )
                : null;


        return {

            indicatorId:
                indicator.id,

            indicatorNumber:
                Number(
                    indicator.number
                ),

            dimensionId:
                record.dimensionId,

            dimensionTamil:
                record.dimensionTamil,

            dimensionEnglish:
                record.dimensionEnglish,

            indicatorTamil:
                indicator.tamil ||
                indicator.titleTamil ||
                indicator.labelTamil ||
                '',

            indicatorEnglish:
                indicator.english ||
                indicator.titleEnglish ||
                indicator.labelEnglish ||
                indicator.name ||
                '',

            ideal:
                indicator.ideal ||
                '',

            score:
                score,

            selectedRange:
                selectedOption
                    ? (
                        selectedOption.label ||
                        ''
                    )
                    : ''

        };

    }


    /* =========================================================================
       GET ALL ANSWERS
       ========================================================================= */

    function getAllAnswers() {

        return (
            getAllIndicators()
                .map(
                    normalizeAnswer
                )
                .filter(
                    function (
                        answer
                    ) {

                        return (
                            answer !==
                            null
                        );

                    }
                )
                .sort(
                    function (
                        a,
                        b
                    ) {

                        return (
                            a.indicatorNumber -
                            b.indicatorNumber
                        );

                    }
                )
        );

    }


    /* =========================================================================
       VALIDATE COMPLETE SCORECARD
       ========================================================================= */

    function validateCompleteScorecard() {

        const indicators =
            getAllIndicators();


        if (
            indicators.length !==
            CONFIG.expectedIndicators
        ) {

            return {

                valid:
                    false,

                reason:
                    'indicator-count',

                expected:
                    CONFIG.expectedIndicators,

                actual:
                    indicators.length

            };

        }


        const missing =
            [];


        const invalid =
            [];


        let totalScore =
            0;


        indicators.forEach(
            function (
                record
            ) {

                const indicator =
                    record.indicator;


                const answer =
                    window.Page02Session.getAnswer(
                        indicator.id
                    );


                if (
                    !answer
                ) {

                    missing.push(
                        indicator.id
                    );


                    return;

                }


                const score =
                    Number(
                        answer.score
                    );


                if (
                    !Number.isFinite(
                        score
                    ) ||
                    score <
                        CONFIG.minimumScorePerIndicator ||
                    score >
                        CONFIG.maximumScorePerIndicator
                ) {

                    invalid.push(
                        indicator.id
                    );


                    return;

                }


                totalScore +=
                    score;

            }
        );


        if (
            missing.length
        ) {

            return {

                valid:
                    false,

                reason:
                    'missing-answers',

                missing:
                    missing,

                invalid:
                    invalid,

                totalScore:
                    totalScore

            };

        }


        if (
            invalid.length
        ) {

            return {

                valid:
                    false,

                reason:
                    'invalid-answers',

                missing:
                    missing,

                invalid:
                    invalid,

                totalScore:
                    totalScore

            };

        }


        if (
            totalScore <
                CONFIG.minimumTotalScore ||
            totalScore >
                CONFIG.maximumTotalScore
        ) {

            return {

                valid:
                    false,

                reason:
                    'invalid-total',

                totalScore:
                    totalScore

            };

        }


        return {

            valid:
                true,

            answered:
                indicators.length,

            total:
                CONFIG.expectedIndicators,

            totalScore:
                totalScore,

            maximumScore:
                CONFIG.maximumTotalScore,

            percentage:
                Math.round(
                    (
                        totalScore /
                        CONFIG.maximumTotalScore
                    ) *
                    100
                )

        };

    }


    /* =========================================================================
       GET ALL DIMENSIONS
       ========================================================================= */

    function getAllDimensions() {

        if (
            !window.Page02Data
        ) {

            return [];

        }


        if (
            Array.isArray(
                window.Page02Data.DIMENSIONS
            )
        ) {

            return (
                window.Page02Data.DIMENSIONS
            );

        }


        if (
            typeof window.Page02Data.getDimensions ===
                'function'
        ) {

            const dimensions =
                window.Page02Data.getDimensions();


            return (
                Array.isArray(
                    dimensions
                )
                    ? dimensions
                    : []
            );

        }


        return [];

    }


    /* =========================================================================
       GET DIMENSION SCORE
       ========================================================================= */

    function getDimensionScore(
        dimensionId
    ) {

        if (
            !window.Page02Session ||
            typeof window.Page02Session.getDimensionScore !==
                'function'
        ) {

            return 0;

        }


        const score =
            Number(
                window.Page02Session.getDimensionScore(
                    dimensionId
                )
            );


        if (
            !Number.isFinite(
                score
            )
        ) {

            return 0;

        }


        return Math.max(
            0,
            Math.min(
                20,
                score
            )
        );

    }


    /* =========================================================================
       GET DIMENSION ANSWERED COUNT
       ========================================================================= */

    function getDimensionAnsweredCount(
        dimensionId
    ) {

        if (
            window.Page02Session &&
            typeof window.Page02Session.getDimensionProgress ===
                'function'
        ) {

            const progress =
                window.Page02Session.getDimensionProgress(
                    dimensionId
                );


            if (
                progress &&
                Number.isFinite(
                    Number(
                        progress.answered
                    )
                )
            ) {

                return Number(
                    progress.answered
                );

            }

        }


        const dimension =
            window.Page02Data &&
            typeof window.Page02Data.getDimensionById ===
                'function'
                ? window.Page02Data.getDimensionById(
                    dimensionId
                )
                : null;


        if (
            !dimension ||
            !Array.isArray(
                dimension.indicators
            )
        ) {

            return 0;

        }


        if (
            !window.Page02Session ||
            typeof window.Page02Session.getAnswer !==
                'function'
        ) {

            return 0;

        }


        return (
            dimension.indicators.reduce(
                function (
                    count,
                    indicator
                ) {

                    return (
                        count +
                        (
                            window.Page02Session.getAnswer(
                                indicator.id
                            )
                                ? 1
                                : 0
                        )
                    );

                },
                0
            )
        );

    }


    /* =========================================================================
       NORMALIZE DIMENSION LABELS
       ========================================================================= */

    function getDimensionTamil(
        dimension
    ) {

        return (
            dimension &&
            (
                dimension.tamil ||
                dimension.titleTamil
            )
                ? String(
                    dimension.tamil ||
                    dimension.titleTamil
                )
                : ''
        );

    }


    function getDimensionEnglish(
        dimension
    ) {

        return (
            dimension &&
            (
                dimension.english ||
                dimension.titleEnglish ||
                dimension.name
            )
                ? String(
                    dimension.english ||
                    dimension.titleEnglish ||
                    dimension.name
                )
                : 'Dimension'
        );

    }


    /* =========================================================================
       GET DIMENSION RESULTS
       ========================================================================= */

    function getDimensionResults() {

        return (
            getAllDimensions()
                .map(
                    function (
                        dimension
                    ) {

                        const score =
                            getDimensionScore(
                                dimension.id
                            );


                        const maximumScore =
                            dimension.indicators.length *
                            CONFIG.maximumScorePerIndicator;


                        return {

                            dimensionId:
                                dimension.id,

                            tamil:
                                getDimensionTamil(
                                    dimension
                                ),

                            english:
                                getDimensionEnglish(
                                    dimension
                                ),

                            score:
                                score,

                            maximumScore:
                                maximumScore,

                            percentage:
                                maximumScore
                                    ? Math.round(
                                        (
                                            score /
                                            maximumScore
                                        ) *
                                        100
                                    )
                                    : 0

                        };

                    }
                )
        );

    }


    /* =========================================================================
       GET KYC
       ========================================================================= */

    function getKyc() {

        if (
            typeof window.Page02Session.getKyc ===
                'function'
        ) {

            return (
                window.Page02Session.getKyc() ||
                {}
            );

        }


        if (
            typeof window.Page02Session.getKYC ===
                'function'
        ) {

            return (
                window.Page02Session.getKYC() ||
                {}
            );

        }


        return {};

    }


    /* =========================================================================
       GET CLIENT ID
       ========================================================================= */

    function getClientId() {

        if (
            typeof window.Page02Session.getClientId ===
                'function'
        ) {

            return (
                window.Page02Session.getClientId() ||
                ''
            );

        }


        const kyc =
            getKyc();


        return (
            kyc.clientId ||
            kyc.clientID ||
            ''
        );

    }


    /* =========================================================================
       BUILD DISCOVERY PAYLOAD
       ========================================================================= */

    function buildDiscoveryPayload() {

        const validation =
            validateCompleteScorecard();


        if (
            !validation.valid
        ) {

            return null;

        }


        return {

            clientId:
                getClientId(),

            kyc:
                getKyc(),

            assessmentType:
                'MILLIONAIRE_LIFESTYLE_SCORECARD',

            assessmentVersion:
                '3.0',

            indicatorCount:
                CONFIG.expectedIndicators,

            dimensionCount:
                CONFIG.expectedDimensions,

            answers:
                getAllAnswers(),

            dimensions:
                getDimensionResults(),

            totalScore:
                validation.totalScore,

            maximumScore:
                CONFIG.maximumTotalScore,

            percentage:
                validation.percentage,

            completedAt:
                new Date().toISOString()

        };

    }


    /* =========================================================================
       SAVE RESULT LOCALLY
       ========================================================================= */

    function saveResultLocally(
        payload,
        response
    ) {

        const result = {

            clientId:
                payload.clientId,

            totalScore:
                payload.totalScore,

            maximumScore:
                payload.maximumScore,

            percentage:
                payload.percentage,

            dimensions:
                payload.dimensions,

            answers:
                payload.answers,

            completedAt:
                payload.completedAt,

            backend:
                response ||
                null

        };


        try {

            sessionStorage.setItem(
                'ctm_page02_result',
                JSON.stringify(
                    result
                )
            );

        }
        catch (
            error
        ) {

            console.warn(
                'CTM PATH™ could not store Page 02 result in sessionStorage.',
                error
            );

        }


        if (
            typeof window.Page02Session.setResult ===
                'function'
        ) {

            window.Page02Session.setResult(
                result
            );

        }


        return result;

    }


    /* =========================================================================
       MARK JOURNEY COMPLETE
       ========================================================================= */

    function markJourneyComplete() {

        if (
            typeof window.Page02Session.completeScorecard ===
                'function'
        ) {

            window.Page02Session.completeScorecard();

        }


        if (
            typeof window.Page02Session.setCompleted ===
                'function'
        ) {

            window.Page02Session.setCompleted(
                true
            );

        }

    }


    /* =========================================================================
       NORMALIZE BACKEND RESPONSE
       ========================================================================= */

    function normalizeBackendResponse(
        response
    ) {

        if (
            response === undefined ||
            response === null
        ) {

            return {

                success:
                    true,

                data:
                    response

            };

        }


        if (
            response === false
        ) {

            return {

                success:
                    false,

                data:
                    response

            };

        }


        if (
            typeof response ===
            'object'
        ) {

            if (
                response.success ===
                false
            ) {

                return {

                    success:
                        false,

                    data:
                        response

                };

            }


            if (
                response.ok ===
                false
            ) {

                return {

                    success:
                        false,

                    data:
                        response

                };

            }

        }


        return {

            success:
                true,

            data:
                response

        };

    }


    /* =========================================================================
       SAVE DISCOVERY
       ========================================================================= */

    async function saveDiscovery(
        payload
    ) {

        if (
            !window.CTM_API ||
            typeof window.CTM_API.saveDiscovery !==
                'function'
        ) {

            throw new Error(
                'CTM_API.saveDiscovery() is unavailable.'
            );

        }


        const response =
            await window.CTM_API.saveDiscovery(
                payload
            );


        const normalized =
            normalizeBackendResponse(
                response
            );


        if (
            !normalized.success
        ) {

            const backendMessage =
                normalized.data &&
                (
                    normalized.data.message ||
                    normalized.data.error
                )
                    ? (
                        normalized.data.message ||
                        normalized.data.error
                    )
                    : 'Discovery save failed.';


            throw new Error(
                backendMessage
            );

        }


        return normalized.data;

    }


    /* =========================================================================
       PROGRESSIVE FIVE-DIMENSION SCOREBOARD
       ========================================================================= */

    function getDimensionNavigation() {

        return document.querySelector(
            '.page02f .dimension-navigation'
        );

    }


    function getDimensionScorePanel() {

        return document.querySelector(
            '.page02f .dimension-score-panel'
        );

    }


    function relocateDimensionScore() {

        const scorePanel =
            getDimensionScorePanel();


        const navigation =
            getDimensionNavigation();


        if (
            !scorePanel ||
            !navigation
        ) {

            return false;

        }


        navigation.parentNode.insertBefore(
            scorePanel,
            navigation
        );


        scorePanel.classList.add(
            'page02f-bottom-dimension-score'
        );


        return true;

    }


    /* =========================================================================
       CREATE PROGRESSIVE SCOREBOARD
       ========================================================================= */

    function createProgressiveScoreboard() {

        let board =
            getElement(
                'page02ProgressiveScoreboard'
            );


        if (
            board
        ) {

            return board;

        }


        const navigation =
            getDimensionNavigation();


        if (
            !navigation ||
            !navigation.parentNode
        ) {

            return null;

        }


        board =
            document.createElement(
                'section'
            );


        board.id =
            'page02ProgressiveScoreboard';


        board.className =
            'page02b-progressive-scoreboard';


        board.setAttribute(
            'aria-label',
            'Progressive Millionaire Lifestyle Scorecard'
        );


        board.innerHTML = `

            <div class="page02b-progressive-scoreboard-header">

                <div class="page02b-progressive-scoreboard-heading">

                    <span class="page02b-progressive-scoreboard-kicker">
                        YOUR JOURNEY SO FAR™
                    </span>

                    <span class="page02b-progressive-scoreboard-title">
                        Millionaire Lifestyle Score
                    </span>

                </div>


                <div
                    class="page02b-progressive-scoreboard-total"
                    aria-live="polite"
                >

                    <span class="page02b-progressive-total-label">
                        GRAND TOTAL
                    </span>


                    <span class="page02b-progressive-total-value">

                        <strong id="page02ProgressiveGrandTotal">
                            0
                        </strong>

                        <span>
                            / 100
                        </span>

                    </span>

                </div>

            </div>


            <div
                id="page02ProgressiveColumns"
                class="page02b-progressive-columns"
            ></div>

        `;


        navigation.parentNode.insertBefore(
            board,
            navigation
        );


        return board;

    }


    /* =========================================================================
       RENDER PROGRESSIVE SCOREBOARD
       ========================================================================= */

    function renderProgressiveScoreboard() {

        const board =
            createProgressiveScoreboard();


        if (
            !board
        ) {

            return false;

        }


        const dimensions =
            getAllDimensions()
                .slice(
                    0,
                    5
                );


        const columns =
            getElement(
                'page02ProgressiveColumns'
            );


        const grandTotal =
            getElement(
                'page02ProgressiveGrandTotal'
            );


        if (
            !columns
        ) {

            return false;

        }


        columns.innerHTML =
            '';


        let progressiveTotal =
            0;


        dimensions.forEach(
            function (
                dimension,
                index
            ) {

                const score =
                    getDimensionScore(
                        dimension.id
                    );


                const answered =
                    getDimensionAnsweredCount(
                        dimension.id
                    );


                const isCurrent =
                    dimension.id ===
                    CONFIG.dimensionId;


                const isAnswered =
                    answered > 0;


                const isComplete =
                    answered >= 5;


                if (
                    isAnswered
                ) {

                    progressiveTotal +=
                        score;

                }


                const column =
                    document.createElement(
                        'article'
                    );


                column.className =
                    'page02b-progressive-column';


                if (
                    isCurrent
                ) {

                    column.classList.add(
                        'is-current'
                    );

                }


                if (
                    isAnswered
                ) {

                    column.classList.add(
                        'is-started'
                    );

                }


                if (
                    isComplete
                ) {

                    column.classList.add(
                        'is-complete'
                    );

                }


                const number =
                    String(
                        index + 1
                    ).padStart(
                        2,
                        '0'
                    );


                const tamil =
                    getDimensionTamil(
                        dimension
                    );


                const english =
                    getDimensionEnglish(
                        dimension
                    );


                const displayScore =
                    isAnswered
                        ? String(
                            score
                        )
                        : '—';


                const progressLabel =
                    isComplete
                        ? 'COMPLETE'
                        : (
                            isAnswered
                                ? `${answered} / 5`
                                : 'NOT STARTED'
                        );


                column.innerHTML = `

                    <div class="page02b-progressive-column-number">
                        ${number}
                    </div>


                    <div class="page02b-progressive-column-name">

                        ${
                            tamil
                                ? `
                                    <span class="page02b-progressive-column-tamil">
                                        ${escapeHtml(tamil)}
                                    </span>
                                  `
                                : ''
                        }


                        <span class="page02b-progressive-column-english">
                            ${escapeHtml(english)}
                        </span>

                    </div>


                    <div class="page02b-progressive-column-score">

                        <strong>
                            ${displayScore}
                        </strong>

                        <span>
                            / 20
                        </span>

                    </div>


                    <div class="page02b-progressive-column-progress">
                        ${progressLabel}
                    </div>

                `;


                columns.appendChild(
                    column
                );

            }
        );


        progressiveTotal =
            Math.max(
                0,
                Math.min(
                    100,
                    progressiveTotal
                )
            );


        if (
            grandTotal
        ) {

            grandTotal.textContent =
                String(
                    progressiveTotal
                );

        }


        board.dataset.total =
            String(
                progressiveTotal
            );


        board.dataset.dimension =
            CONFIG.dimensionId;


        board.dataset.completed =
            dimensions.length === 5 &&
            dimensions.every(
                function (
                    dimension
                ) {

                    return (
                        getDimensionAnsweredCount(
                            dimension.id
                        ) >= 5
                    );

                }
            )
                ? 'true'
                : 'false';


        return true;

    }


    /* =========================================================================
       UPDATE LIVE DIMENSION SCORE
       ========================================================================= */

    function updateBottomDimensionScore() {

        if (
            !window.Page02Scorecard
        ) {

            return;

        }


        const score =
            Number(
                window.Page02Scorecard.getScore()
            );


        const current =
            getElement(
                'dimensionScoreCurrent'
            );


        const total =
            getElement(
                'dimensionScoreTotal'
            );


        if (
            current
        ) {

            current.textContent =
                Number.isFinite(
                    score
                )
                    ? String(
                        score
                    )
                    : '0';

        }


        if (
            total
        ) {

            total.textContent =
                '/ 20';

        }

    }


    /* =========================================================================
       REFRESH SCORE DISPLAY
       ========================================================================= */

    function refreshProgressiveScoreDisplay() {

        updateBottomDimensionScore();

        renderProgressiveScoreboard();

    }


    /* =========================================================================
       FINAL RESULT HTML ESCAPE
       ========================================================================= */

    function escapeHtml(
        value
    ) {

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


    /* =========================================================================
       FINAL RESULT STYLES
       ========================================================================= */

    function injectFinalResultStyles() {

        if (
            getElement(
                'page02FinalResultsStyles'
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                'style'
            );


        style.id =
            'page02FinalResultsStyles';


        style.textContent = `

            .page02f-final-results {

                width:
                    100%;

                margin:
                    54px 0 0;

                scroll-margin-top:
                    24px;

                opacity:
                    0;

                transform:
                    translateY(18px);

                transition:
                    opacity .45s ease,
                    transform .45s ease;

            }


            .page02f-final-results.is-visible {

                opacity:
                    1;

                transform:
                    translateY(0);

            }


            .page02f-final-results-shell {

                position:
                    relative;

                overflow:
                    hidden;

                border:
                    1px solid rgba(
                        168,
                        140,
                        255,
                        .16
                    );

                border-radius:
                    24px;

                background:
                    linear-gradient(
                        180deg,
                        rgba(
                            27,
                            20,
                            57,
                            .96
                        ),
                        rgba(
                            15,
                            10,
                            34,
                            .98
                        )
                    );

                box-shadow:
                    0 22px 70px rgba(
                        4,
                        2,
                        14,
                        .36
                    );

            }


            .page02f-final-results-shell::before {

                content:
                    "";

                display:
                    block;

                height:
                    2px;

                background:
                    linear-gradient(
                        90deg,
                        #8d5cff,
                        #22c7bd
                    );

            }


            .page02f-final-results-header {

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    space-between;

                gap:
                    30px;

                padding:
                    34px 38px 30px;

                border-bottom:
                    1px solid rgba(
                        168,
                        140,
                        255,
                        .10
                    );

            }


            .page02f-final-results-kicker {

                display:
                    block;

                margin:
                    0 0 10px;

                color:
                    #E8C472;

                font-size:
                    11px;

                font-weight:
                    700;

                letter-spacing:
                    .18em;

                text-transform:
                    uppercase;

            }


            .page02f-final-results-title {

                margin:
                    0;

                color:
                    #F4F0FF;

                font-size:
                    34px;

                line-height:
                    1.15;

                font-weight:
                    700;

            }


            .page02f-final-results-subtitle {

                margin:
                    10px 0 0;

                color:
                    rgba(
                        244,
                        240,
                        255,
                        .60
                    );

                font-size:
                    14px;

                line-height:
                    1.65;

            }


            .page02f-final-results-total {

                flex:
                    0 0 auto;

                min-width:
                    170px;

                padding:
                    18px 22px;

                border:
                    1px solid rgba(
                        232,
                        196,
                        114,
                        .18
                    );

                border-radius:
                    18px;

                background:
                    rgba(
                        232,
                        196,
                        114,
                        .055
                    );

                text-align:
                    center;

            }


            .page02f-final-results-total-label {

                display:
                    block;

                color:
                    #E8C472;

                font-size:
                    10px;

                font-weight:
                    700;

                letter-spacing:
                    .16em;

            }


            .page02f-final-results-total-value {

                display:
                    block;

                margin-top:
                    4px;

                color:
                    #E8C472;

                font-size:
                    42px;

                font-weight:
                    700;

                line-height:
                    1;

            }


            .page02f-final-results-total-value small {

                color:
                    rgba(
                        244,
                        240,
                        255,
                        .55
                    );

                font-size:
                    13px;

                font-weight:
                    500;

            }


            .page02f-final-results-grid {

                display:
                    grid;

                grid-template-columns:
                    repeat(
                        5,
                        minmax(
                            0,
                            1fr
                        )
                    );

            }


            .page02f-final-result-card {

                position:
                    relative;

                min-width:
                    0;

                min-height:
                    220px;

                padding:
                    26px 22px 24px;

                border-right:
                    1px solid rgba(
                        168,
                        140,
                        255,
                        .10
                    );

                background:
                    rgba(
                        28,
                        20,
                        57,
                        .58
                    );

            }


            .page02f-final-result-card:last-child {

                border-right:
                    0;

            }


            .page02f-final-result-number {

                color:
                    #E8C472;

                font-size:
                    11px;

                font-weight:
                    700;

                letter-spacing:
                    .16em;

            }


            .page02f-final-result-tamil {

                display:
                    block;

                margin-top:
                    18px;

                color:
                    #F4F0FF;

                font-size:
                    22px;

                font-weight:
                    700;

                line-height:
                    1.35;

            }


            .page02f-final-result-english {

                display:
                    block;

                margin-top:
                    6px;

                color:
                    #B9A7FF;

                font-size:
                    10px;

                font-weight:
                    700;

                letter-spacing:
                    .08em;

                line-height:
                    1.4;

                text-transform:
                    uppercase;

            }


            .page02f-final-result-score {

                display:
                    flex;

                align-items:
                    baseline;

                gap:
                    6px;

                margin-top:
                    34px;

            }


            .page02f-final-result-score strong {

                color:
                    #E8C472;

                font-size:
                    31px;

                line-height:
                    1;

            }


            .page02f-final-result-score span {

                color:
                    rgba(
                        244,
                        240,
                        255,
                        .48
                    );

                font-size:
                    12px;

            }


            .page02f-final-result-percent {

                margin-top:
                    9px;

                color:
                    #22C7BD;

                font-size:
                    10px;

                font-weight:
                    700;

                letter-spacing:
                    .10em;

            }


            .page02f-final-results-footer {

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    center;

                padding:
                    34px 38px 40px;

                border-top:
                    1px solid rgba(
                        168,
                        140,
                        255,
                        .10
                    );

            }


            .page02f-final-results-continue {

                min-width:
                    300px;

                padding:
                    18px 28px;

                border:
                    1px solid rgba(
                        34,
                        199,
                        189,
                        .24
                    );

                border-radius:
                    14px;

                background:
                    linear-gradient(
                        135deg,
                        #22C7BD,
                        #159F9B
                    );

                color:
                    #FFFFFF;

                cursor:
                    pointer;

                box-shadow:
                    0 14px 38px rgba(
                        34,
                        199,
                        189,
                        .16
                    );

                font:
                    inherit;

                text-align:
                    center;

                transition:
                    transform .2s ease,
                    filter .2s ease;

            }


            .page02f-final-results-continue:hover {

                transform:
                    translateY(-2px);

                filter:
                    brightness(
                        1.04
                    );

            }


            .page02f-final-results-continue-primary {

                display:
                    block;

                font-size:
                    17px;

                font-weight:
                    700;

            }


            .page02f-final-results-continue-secondary {

                display:
                    block;

                margin-top:
                    4px;

                font-size:
                    10px;

                font-weight:
                    700;

                letter-spacing:
                    .10em;

                opacity:
                    .88;

            }


            @media (
                max-width:
                1000px
            ) {

                .page02f-final-results-grid {

                    grid-template-columns:
                        repeat(
                            3,
                            minmax(
                                0,
                                1fr
                            )
                        );

                }


                .page02f-final-result-card:nth-child(3) {

                    border-right:
                        0;

                }


                .page02f-final-result-card:nth-child(n + 4) {

                    border-top:
                        1px solid rgba(
                            168,
                            140,
                            255,
                            .10
                        );

                }

            }


            @media (
                max-width:
                700px
            ) {

                .page02f-final-results-header {

                    flex-direction:
                        column;

                    align-items:
                        flex-start;

                    padding:
                        26px 20px;

                }


                .page02f-final-results-title {

                    font-size:
                        28px;

                }


                .page02f-final-results-total {

                    width:
                        100%;

                }


                .page02f-final-results-grid {

                    grid-template-columns:
                        1fr;

                }


                .page02f-final-result-card,
                .page02f-final-result-card:nth-child(3) {

                    border-right:
                        0;

                    border-top:
                        1px solid rgba(
                            168,
                            140,
                            255,
                            .10
                        );

                }


                .page02f-final-result-card:first-child {

                    border-top:
                        0;

                }


                .page02f-final-results-footer {

                    padding:
                        26px 20px 30px;

                }


                .page02f-final-results-continue {

                    width:
                        100%;

                    min-width:
                        0;

                }

            }


            @media (
                prefers-reduced-motion:
                reduce
            ) {

                .page02f-final-results,
                .page02f-final-results-continue {

                    transition:
                        none !important;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =========================================================================
       CREATE FINAL RESULTS SECTION
       ========================================================================= */

    function createFinalResultsSection() {

        let section =
            getElement(
                DOM_IDS.finalResults
            );


        if (
            section
        ) {

            return section;

        }


        const shell =
            document.querySelector(
                '#page02f .page02-dimension-shell'
            );


        if (
            !shell
        ) {

            console.warn(
                'CTM PATH™ Page 02F: page shell unavailable for final results.'
            );


            return null;

        }


        injectFinalResultStyles();


        section =
            document.createElement(
                'section'
            );


        section.id =
            DOM_IDS.finalResults;


        section.className =
            'page02f-final-results';


        section.hidden =
            true;


        section.setAttribute(
            'aria-labelledby',
            'page02FinalResultsTitle'
        );


        section.innerHTML = `

            <div class="page02f-final-results-shell">

                <header class="page02f-final-results-header">

                    <div>

                        <span class="page02f-final-results-kicker">
                            YOUR COMPLETE JOURNEY
                        </span>


                        <h2
                            id="page02FinalResultsTitle"
                            class="page02f-final-results-title"
                        >
                            உங்கள் Millionaire Lifestyle Score
                        </h2>


                        <p class="page02f-final-results-subtitle">
                            உங்கள் 25 பதில்களிலிருந்து உருவான உங்கள் முழுமையான மதிப்பீடு.
                        </p>

                    </div>


                    <div class="page02f-final-results-total">

                        <span class="page02f-final-results-total-label">
                            GRAND TOTAL
                        </span>


                        <span class="page02f-final-results-total-value">

                            <span id="page02FinalResultsTotal">
                                0
                            </span>

                            <small>
                                / 100
                            </small>

                        </span>

                    </div>

                </header>


                <div
                    id="page02FinalResultsGrid"
                    class="page02f-final-results-grid"
                ></div>


                <footer class="page02f-final-results-footer">

                    <button
                        id="page02FinalResultsContinue"
                        class="page02f-final-results-continue"
                        type="button"
                    >

                        <span class="page02f-final-results-continue-primary">
                            அடுத்த பயணம் →
                        </span>


                        <span class="page02f-final-results-continue-secondary">
                            CONTINUE TO KALA CHAKRA™
                        </span>

                    </button>

                </footer>

            </div>

        `;


        shell.appendChild(
            section
        );


        const continueButton =
            getElement(
                DOM_IDS.finalResultsContinue
            );


        if (
            continueButton
        ) {

            continueButton.addEventListener(
                'click',
                continueToNextStage
            );

        }


        return section;

    }


    /* =========================================================================
       RENDER FINAL RESULTS
       ========================================================================= */

    function renderFinalResults(
        payload
    ) {

        if (
            !payload
        ) {

            return null;

        }


        const section =
            createFinalResultsSection();


        if (
            !section
        ) {

            return null;

        }


        const totalElement =
            getElement(
                DOM_IDS.finalResultsTotal
            );


        const grid =
            getElement(
                DOM_IDS.finalResultsGrid
            );


        const dimensions =
            Array.isArray(
                payload.dimensions
            )
                ? payload.dimensions.slice(
                    0,
                    5
                )
                : [];


        if (
            totalElement
        ) {

            totalElement.textContent =
                String(
                    Number(
                        payload.totalScore
                    ) ||
                    0
                );

        }


        if (
            grid
        ) {

            grid.innerHTML =
                dimensions
                    .map(
                        function (
                            dimension,
                            index
                        ) {

                            const score =
                                Number(
                                    dimension.score
                                ) ||
                                0;


                            const maximum =
                                Number(
                                    dimension.maximumScore
                                ) ||
                                20;


                            const percentage =
                                Number.isFinite(
                                    Number(
                                        dimension.percentage
                                    )
                                )
                                    ? Number(
                                        dimension.percentage
                                    )
                                    : Math.round(
                                        (
                                            score /
                                            maximum
                                        ) *
                                        100
                                    );


                            return `

                                <article class="page02f-final-result-card">

                                    <div class="page02f-final-result-number">

                                        ${
                                            String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                '0'
                                            )
                                        }

                                    </div>


                                    <span class="page02f-final-result-tamil">

                                        ${escapeHtml(
                                            dimension.tamil ||
                                            ''
                                        )}

                                    </span>


                                    <span class="page02f-final-result-english">

                                        ${escapeHtml(
                                            dimension.english ||
                                            ''
                                        )}

                                    </span>


                                    <div class="page02f-final-result-score">

                                        <strong>
                                            ${score}
                                        </strong>

                                        <span>
                                            / ${maximum}
                                        </span>

                                    </div>


                                    <div class="page02f-final-result-percent">

                                        ${percentage}% · COMPLETE

                                    </div>

                                </article>

                            `;

                        }
                    )
                    .join(
                        ''
                    );

        }


        section.hidden =
            false;


        requestAnimationFrame(
            function () {

                section.classList.add(
                    'is-visible'
                );

            }
        );


        finalResultVisible =
            true;


        return section;

    }


    /* =========================================================================
       SHOW FINAL RESULTS
       ========================================================================= */

    function showFinalResults(
        payload
    ) {

        const section =
            renderFinalResults(
                payload
            );


        if (
            !section
        ) {

            showError(
                'உங்கள் முடிவை காட்ட முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.'
            );


            return false;

        }


        setSubmittingState(
            false
        );


        setNavigationState(
            false
        );


        const nextButton =
            getElement(
                DOM_IDS.nextButton
            );


        if (
            nextButton
        ) {

            nextButton.disabled =
                false;


            nextButton.setAttribute(
                'aria-busy',
                'false'
            );


            nextButton.dataset.resultReady =
                'true';


            const primary =
                nextButton.querySelector(
                    '.dimension-button-primary-text'
                );


            const secondary =
                nextButton.querySelector(
                    '.dimension-button-secondary-text'
                );


            if (
                primary
            ) {

                primary.textContent =
                    'முடிவை மீண்டும் காண்க ↑';

            }


            if (
                secondary
            ) {

                secondary.textContent =
                    'VIEW MY RESULT';

            }

        }


        /*
         * Move the user to the newly revealed result section.
         *
         * This is the exact behavior requested:
         *
         * VIEW MY RESULT
         *        ↓
         * FINAL RESULTS SECTION ON PAGE 02F
         */

        setTimeout(
            function () {

                navigateToResult();

            },
            80
        );


        return true;

    }


    /* =========================================================================
       NAVIGATE TO RESULT — SAME PAGE
       ========================================================================= */

    function navigateToResult() {

        if (
            !finalResultVisible
        ) {

            return false;

        }


        const section =
            getElement(
                DOM_IDS.finalResults
            );


        if (
            !section
        ) {

            return false;

        }


        section.scrollIntoView({

            behavior:
                'smooth',

            block:
                'start'

        });


        return true;

    }


    /* =========================================================================
       CONTINUE TO PAGE 03
       ========================================================================= */

    function continueToNextStage(
        event
    ) {

        if (
            event
        ) {

            event.preventDefault();

        }


        if (
            navigating ||
            submitting
        ) {

            return;

        }


        /*
         * IMPORTANT:
         *
         * This is the ONLY Page 03 navigation in Page 02F.
         */

        setNavigationState(
            true
        );


        window.location.href =
            CONFIG.nextPage;

    }


    /* =========================================================================
       RESTORE STORED FINAL RESULT
       ========================================================================= */

    function restoreStoredFinalResult() {

        let stored =
            null;


        try {

            const raw =
                sessionStorage.getItem(
                    'ctm_page02_result'
                );


            if (
                raw
            ) {

                stored =
                    JSON.parse(
                        raw
                    );

            }

        }
        catch (
            error
        ) {

            console.warn(
                'CTM PATH™ Page 02F could not restore stored final result.',
                error
            );

        }


        if (
            !stored ||
            !Array.isArray(
                stored.dimensions
            ) ||
            stored.dimensions.length < 5
        ) {

            return false;

        }


        console.info(
            'CTM PATH™ Page 02F restoring completed final result.'
        );


        return showFinalResults(
            stored
        );

    }


    /* =========================================================================
       FINAL SUBMISSION
       ========================================================================= */

    async function submitScorecard(
        event
    ) {

        if (
            event
        ) {

            event.preventDefault();

        }


        if (
            submitting ||
            navigating ||
            finalResultVisible
        ) {

            return;

        }


        hideError();


        refreshProgressiveScoreDisplay();


        /* ---------------------------------------------------------------------
           1. VALIDATE DIMENSION 05
           --------------------------------------------------------------------- */

        const dimensionValid =
            window.Page02Scorecard.requireComplete();


        if (
            !dimensionValid
        ) {

            return;

        }


        /* ---------------------------------------------------------------------
           2. COMPLETE DIMENSION 05
           --------------------------------------------------------------------- */

        const dimensionCompleted =
            window.Page02Scorecard.complete();


        refreshProgressiveScoreDisplay();


        if (
            !dimensionCompleted
        ) {

            showError(
                'இறுதி பரிமாணத்தை நிறைவு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
            );


            return;

        }


        /* ---------------------------------------------------------------------
           3. VALIDATE ALL 25 INDICATORS
           --------------------------------------------------------------------- */

        const validation =
            validateCompleteScorecard();


        if (
            !validation.valid
        ) {

            console.error(
                'CTM PATH™ final scorecard validation failed:',
                validation
            );


            if (
                validation.reason ===
                'missing-answers'
            ) {

                showError(
                    '25 அளவுகோல்களிலும் பதில் அளித்த பிறகே உங்கள் இறுதி முடிவைக் கணக்கிட முடியும்.'
                );

            }
            else {

                showError(
                    'உங்கள் மதிப்பெண்களை சரிபார்க்க முடியவில்லை. முந்தைய பரிமாணங்களை மீண்டும் சரிபார்க்கவும்.'
                );

            }


            return;

        }


        /* ---------------------------------------------------------------------
           4. BUILD FINAL PAYLOAD
           --------------------------------------------------------------------- */

        const payload =
            buildDiscoveryPayload();


        if (
            !payload
        ) {

            showError(
                'உங்கள் Scorecard தரவை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
            );


            return;

        }


        /* ---------------------------------------------------------------------
           5. REQUIRE CLIENT ID
           --------------------------------------------------------------------- */

        if (
            !payload.clientId
        ) {

            console.error(
                'CTM PATH™ final discovery payload has no clientId.',
                payload
            );


            showError(
                'உங்கள் பதிவு தகவலை கண்டுபிடிக்க முடியவில்லை. தயவுசெய்து KYC பகுதியிலிருந்து மீண்டும் தொடங்கவும்.'
            );


            return;

        }


        /* ---------------------------------------------------------------------
           6. SUBMIT TO BACKEND
           --------------------------------------------------------------------- */

        setSubmittingState(
            true
        );


        try {

            console.info(
                'CTM PATH™ submitting final Millionaire Lifestyle Scorecard:',
                {

                    clientId:
                        payload.clientId,

                    indicators:
                        payload.answers.length,

                    totalScore:
                        payload.totalScore,

                    maximumScore:
                        payload.maximumScore,

                    percentage:
                        payload.percentage

                }
            );


            const response =
                await saveDiscovery(
                    payload
                );


            /* -------------------------------------------------------------
               7. STORE RESULT LOCALLY
               ------------------------------------------------------------- */

            saveResultLocally(
                payload,
                response
            );


            /* -------------------------------------------------------------
               8. MARK JOURNEY COMPLETE
               ------------------------------------------------------------- */

            markJourneyComplete();


            console.info(
                'CTM PATH™ Millionaire Lifestyle Scorecard complete:',
                {

                    clientId:
                        payload.clientId,

                    score:
                        payload.totalScore,

                    maximumScore:
                        payload.maximumScore,

                    percentage:
                        payload.percentage,

                    dimensions:
                        payload.dimensions

                }
            );


            /* -------------------------------------------------------------
               9. CRITICAL FIX
               -------------------------------------------------------------

               OLD BEHAVIOR:

                   saveDiscovery()
                         ↓
                   page03.html

               NEW FROZEN BEHAVIOR:

                   saveDiscovery()
                         ↓
                   FINAL RESULTS ON PAGE 02F
                         ↓
                   user explicitly clicks
                   CONTINUE TO KALA CHAKRA™
                         ↓
                   page03.html

               ------------------------------------------------------------- */

            showFinalResults(
                payload
            );

        }
        catch (
            error
        ) {

            console.error(
                'CTM PATH™ final discovery submission failed:',
                error
            );


            setSubmittingState(
                false
            );


            showError(
                'உங்கள் முடிவை சேமிக்க முடியவில்லை. உங்கள் பதில்கள் பாதுகாப்பாக உள்ளன. மீண்டும் முயற்சிக்கவும்.'
            );

        }

    }


    /* =========================================================================
       FINAL BUTTON CONTROLLER
       =========================================================================

       Before result:
           VIEW MY RESULT
                    ↓
           submitScorecard()

       After result:
           VIEW MY RESULT
                    ↓
           scroll to final results

       Page 03:
           ONLY from final-results CTA
       ========================================================================= */

    function handleFinalButton(
        event
    ) {

        if (
            finalResultVisible
        ) {

            if (
                event
            ) {

                event.preventDefault();

            }


            navigateToResult();


            return;

        }


        submitScorecard(
            event
        );

    }


    /* =========================================================================
       BIND PREVIOUS BUTTON
       ========================================================================= */

    function bindPreviousButton() {

        const button =
            getElement(
                DOM_IDS.previousButton
            );


        if (
            !button
        ) {

            console.warn(
                'CTM PATH™ Page 02F: #previousButton not found.'
            );


            return false;

        }


        button.addEventListener(
            'click',
            goPrevious
        );


        return true;

    }


    /* =========================================================================
       BIND FINAL BUTTON
       ========================================================================= */

    function bindNextButton() {

        const button =
            getElement(
                DOM_IDS.nextButton
            );


        if (
            !button
        ) {

            console.error(
                'CTM PATH™ Page 02F: #nextButton not found.'
            );


            return false;

        }


        button.addEventListener(
            'click',
            handleFinalButton
        );


        return true;

    }


    /* =========================================================================
       KEYBOARD SUPPORT
       ========================================================================= */

    function bindKeyboardNavigation() {

        document.addEventListener(
            'keydown',
            function (
                event
            ) {

                if (
                    event.key !==
                    'Enter'
                ) {

                    return;

                }


                if (
                    !event.ctrlKey &&
                    !event.metaKey
                ) {

                    return;

                }


                event.preventDefault();


                handleFinalButton(
                    event
                );

            }
        );

    }


    /* =========================================================================
       ANSWER EVENTS
       ========================================================================= */

    function bindAnswerEvents() {

        document.addEventListener(
            'ctm:page02-answer',
            function (
                event
            ) {

                if (
                    !event.detail ||
                    event.detail.dimensionId !==
                        CONFIG.dimensionId
                ) {

                    return;

                }


                refreshProgressiveScoreDisplay();


                const progress =
                    event.detail.progress;


                if (
                    progress &&
                    progress.complete
                ) {

                    console.info(
                        'CTM PATH™ Dimension 05: all five indicators answered.',
                        {

                            score:
                                progress.score,

                            maximumScore:
                                progress.maximumScore

                        }
                    );

                }

            }
        );

    }


    /* =========================================================================
       INITIALIZE SCORECARD
       ========================================================================= */

    function initializeScorecard() {

        return (
            window.Page02Scorecard.init({

                dimensionId:
                    CONFIG.dimensionId

            })
        );

    }


    /* =========================================================================
       RESTORE PAGE
       ========================================================================= */

    function restorePage() {

        window.Page02Scorecard.restore();


        const progress =
            window.Page02Scorecard.getProgress();


        console.info(
            'CTM PATH™ Page 02F restored:',
            {

                answered:
                    progress.answered,

                total:
                    progress.total,

                score:
                    progress.score,

                maximumScore:
                    progress.maximumScore

            }
        );

    }


    /* =========================================================================
       INITIALIZE
       ========================================================================= */

    function init() {

        if (
            initialized
        ) {

            return;

        }


        console.info(
            'CTM PATH™ Page 02F initializing — Final Dimension...'
        );


        /* ---------------------------------------------------------------------
           DEPENDENCIES
           --------------------------------------------------------------------- */

        if (
            !verifyDependencies()
        ) {

            return;

        }


        /* ---------------------------------------------------------------------
           DIMENSION CONTRACT
           --------------------------------------------------------------------- */

        if (
            !verifyDimension()
        ) {

            return;

        }


        /* ---------------------------------------------------------------------
           SCORECARD
           --------------------------------------------------------------------- */

        const scorecardReady =
            initializeScorecard();


        if (
            !scorecardReady
        ) {

            console.error(
                'CTM PATH™ Page 02F scorecard initialization failed.'
            );


            return;

        }


        /* ---------------------------------------------------------------------
           CONTROLS
           --------------------------------------------------------------------- */

        bindPreviousButton();

        bindNextButton();

        bindKeyboardNavigation();

        bindAnswerEvents();


        /* ---------------------------------------------------------------------
           RESTORE ANSWERS
           --------------------------------------------------------------------- */

        restorePage();


        /* ---------------------------------------------------------------------
           SCOREBOARD
           --------------------------------------------------------------------- */

        relocateDimensionScore();

        refreshProgressiveScoreDisplay();


        /* ---------------------------------------------------------------------
           RESTORE COMPLETED RESULT
           --------------------------------------------------------------------- */

        const restoredFinalResult =
            restoreStoredFinalResult();


        /*
         * If a completed result was restored, keep the user on that
         * result section rather than immediately forcing the viewport
         * back to the top.
         */

        if (
            !restoredFinalResult
        ) {

            scrollToTop();

        }


        /* ---------------------------------------------------------------------
           READY
           --------------------------------------------------------------------- */

        initialized =
            true;


        console.info(
            'CTM PATH™ Page 02F ready.',
            {

                dimension:
                    CONFIG.dimensionId,

                dimensionScore:
                    window.Page02Scorecard.getScore(),

                dimensionProgress:
                    window.Page02Scorecard.getProgress(),

                totalProgress:
                    getAllAnswers().length +
                    ' / ' +
                    CONFIG.expectedIndicators,

                finalResultVisible:
                    finalResultVisible

            }
        );

    }


    /* =========================================================================
       DOM READY
       ========================================================================= */

    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            init
        );

    }
    else {

        init();

    }


    /* =========================================================================
       PUBLIC CONTROLLER
       ========================================================================= */

    window.Page02F = {

        version:
            '5.0 — IN-PAGE FINAL RESULTS',

        dimensionId:
            CONFIG.dimensionId,

        init:
            init,

        goPrevious:
            goPrevious,

        submit:
            submitScorecard,

        showResult:
            navigateToResult,

        continueToNextStage:
            continueToNextStage,

        validateDimension:
            function () {

                return (
                    window.Page02Scorecard.validate()
                );

            },

        validateScorecard:
            validateCompleteScorecard,

        getAnswers:
            getAllAnswers,

        getDimensions:
            getDimensionResults,

        buildPayload:
            buildDiscoveryPayload,

        getScore:
            function () {

                const validation =
                    validateCompleteScorecard();


                return (
                    validation.totalScore ||
                    0
                );

            }

    };


    /* =========================================================================
       FINAL PAGE 02 ARCHITECTURE
       =========================================================================

       PAGE 02A
       KYC
           ↓

       PAGE 02B
       DIMENSION 01
       INDICATORS 01–05
           ↓

       PAGE 02C
       DIMENSION 02
       INDICATORS 06–10
           ↓

       PAGE 02D
       DIMENSION 03
       INDICATORS 11–15
           ↓

       PAGE 02E
       DIMENSION 04
       INDICATORS 16–20
           ↓

       PAGE 02F
       DIMENSION 05
       INDICATORS 21–25
           ↓

       VALIDATE 25 / 25
           ↓

       TOTAL SCORE / 100
           ↓

       BUILD DISCOVERY PAYLOAD
           ↓

       CTM_API.saveDiscovery()
           ↓

       STORE RESULT
           ↓

       REVEAL FINAL RESULTS
       ON PAGE 02F
           ↓

       USER EXPLICITLY CLICKS
       CONTINUE TO KALA CHAKRA™
           ↓

       PAGE 03

       ========================================================================= */

})(window, document);

