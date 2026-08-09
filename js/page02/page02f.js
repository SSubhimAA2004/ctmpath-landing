
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02f.js
 *
 * VERSION:
 * 4.0 — PROGRESSIVE DIMENSION SCOREBOARD
 *
 * PAGE:
 * PAGE 02F — DIMENSION 05
 *
 * STATUS:
 * FINAL DIMENSION CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls the final dimension of the 25-indicator scorecard.
 *
 *      page02e.html
 *           ↓
 *      page02f.html
 *           ↓
 *      DIMENSION 05
 *      Indicators 21–25
 *           ↓
 *      Validate Dimension 05
 *           ↓
 *      Validate Complete 25-Indicator Scorecard
 *           ↓
 *      Build Final Discovery Payload
 *           ↓
 *      CTM_API.saveDiscovery()
 *           ↓
 *      Result / Next Journey Stage
 *
 * =============================================================================
 *
 * SHARED RESPONSIBILITIES DELEGATED TO:
 *
 *      page02-data.js
 *          → frozen 25 indicators / 100 ranges
 *
 *      page02-session.js
 *          → answer persistence / scoring / journey state
 *
 *      page02-scorecard.js
 *          → Dimension 05 rendering / selection / validation / live score
 *
 * =============================================================================
 *
 * THIS FILE:
 *
 *      ✓ initializes Dimension 05
 *      ✓ moves the live score below the progressive scoreboard
 *      ✓ creates the shared five-dimension progressive scoreboard
 *      ✓ displays all five dimension scores
 *      ✓ displays Grand Total /100
 *      ✓ refreshes the scoreboard after every answer
 *      ✓ binds Previous
 *      ✓ binds final Continue button
 *      ✓ validates Indicators 21–25
 *      ✓ marks Dimension 05 complete
 *      ✓ validates all 25 answers
 *      ✓ validates total score
 *      ✓ builds final discovery payload
 *      ✓ preserves CTM_API.saveDiscovery() integration
 *      ✓ prevents duplicate submission
 *      ✓ handles backend success / failure
 *      ✓ stores completion state
 *      ✓ navigates to result stage
 *
 * =============================================================================
 */

'use strict';

(function(window, document){

/* =============================================================================
 * CONFIGURATION
 * =============================================================================
 */

const CONFIG = {

    dimensionId:
        'protectionContribution',

    previousDimensionId:
        'lifestyleFreedom',

    previousPage:
        'page02e.html',

    /*
     * Change ONLY this value if the result page has a different filename.
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

/* =============================================================================
 * DOM CONTRACT
 * =============================================================================
 */

const DOM_IDS = {

    previousButton:
        'previousButton',

    nextButton:
        'nextButton',

    message:
        'dimensionMessage'

};

/* =============================================================================
 * STATE
 * =============================================================================
 */

let initialized =
    false;

let navigating =
    false;

let submitting =
    false;

/* =============================================================================
 * DOM HELPER
 * =============================================================================
 */

function getElement(id){

    return (
        document.getElementById(id) ||
        null
    );

}

/* =============================================================================
 * SCROLL TO TOP
 * =============================================================================
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

/* =============================================================================
 * VERIFY DEPENDENCIES
 * =============================================================================
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
        !window.Page02Scorecard
    ){

        missing.push(
            'Page02Scorecard'
        );

    }

    if(
        !window.CTM_API
    ){

        missing.push(
            'CTM_API'
        );

    }

    if(
        missing.length
    ){

        console.error(
            'CTM PATH™ Page 02F missing dependencies:',
            missing
        );

        return false;

    }

    return true;

}

/* =============================================================================
 * VERIFY FINAL DIMENSION
 * =============================================================================
 */

function verifyDimension(){

    const dimension =
        window.Page02Data.getDimensionById(
            CONFIG.dimensionId
        );

    if(
        !dimension
    ){

        console.error(
            'CTM PATH™ Page 02F could not find Dimension 05:',
            CONFIG.dimensionId
        );

        return false;

    }

    if(
        !Array.isArray(
            dimension.indicators
        ) ||
        dimension.indicators.length !== 5
    ){

        console.error(
            'CTM PATH™ Page 02F expected exactly five indicators.',
            dimension
        );

        return false;

    }

    return true;

}

/* =============================================================================
 * NAVIGATION / SUBMISSION STATE
 * =============================================================================
 */

function setNavigationState(
    active
){

    navigating =
        Boolean(active);

    const previousButton =
        getElement(
            DOM_IDS.previousButton
        );

    const nextButton =
        getElement(
            DOM_IDS.nextButton
        );

    if(previousButton){

        previousButton.disabled =
            active;

        previousButton.setAttribute(
            'aria-busy',
            active
                ? 'true'
                : 'false'
        );

    }

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

}

/* =============================================================================
 * SET SUBMITTING STATE
 * =============================================================================
 */

function setSubmittingState(
    active
){

    submitting =
        Boolean(active);

    setNavigationState(
        active
    );

    const nextButton =
        getElement(
            DOM_IDS.nextButton
        );

    if(!nextButton){

        return;

    }

    const primaryText =
        nextButton.querySelector(
            '.dimension-button-primary-text'
        );

    const secondaryText =
        nextButton.querySelector(
            '.dimension-button-secondary-text'
        );

    if(active){

        if(primaryText){

            primaryText.textContent =
                'சேமிக்கப்படுகிறது...';

        }

        if(secondaryText){

            secondaryText.textContent =
                'CALCULATING YOUR SCORE';

        }

    }
    else{

        if(primaryText){

            primaryText.textContent =
                'என் முடிவைக் காண்க →';

        }

        if(secondaryText){

            secondaryText.textContent =
                'VIEW MY RESULT';

        }

    }

}

/* =============================================================================
 * SHOW ERROR
 * =============================================================================
 */

function showError(
    message
){

    if(
        window.Page02Scorecard &&
        typeof window.Page02Scorecard.showMessage ===
            'function'
    ){

        window.Page02Scorecard.showMessage(
            message
        );

        return;

    }

    const element =
        getElement(
            DOM_IDS.message
        );

    if(!element){

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

/* =============================================================================
 * HIDE ERROR
 * =============================================================================
 */

function hideError(){

    if(
        window.Page02Scorecard &&
        typeof window.Page02Scorecard.hideMessage ===
            'function'
    ){

        window.Page02Scorecard.hideMessage();

        return;

    }

    const element =
        getElement(
            DOM_IDS.message
        );

    if(!element){

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

/* =============================================================================
 * GO PREVIOUS
 * =============================================================================
 */

function goPrevious(
    event
){

    if(event){

        event.preventDefault();

    }

    if(
        navigating ||
        submitting
    ){

        return;

    }

    window.Page02Session.setCurrentDimension(
        CONFIG.previousDimensionId
    );

    setNavigationState(
        true
    );

    window.location.href =
        CONFIG.previousPage;

}

/* =============================================================================
 * GET ALL INDICATORS
 *
 * Flatten the five dimensions into one ordered 25-indicator collection.
 * =============================================================================
 */

function getAllIndicators(){

    const dimensions =
        window.Page02Data.DIMENSIONS;

    if(
        !Array.isArray(
            dimensions
        )
    ){

        return [];

    }

    const indicators =
        [];

    dimensions.forEach(
        function(dimension){

            if(
                !dimension ||
                !Array.isArray(
                    dimension.indicators
                )
            ){

                return;

            }

            dimension.indicators.forEach(
                function(indicator){

                    indicators.push({

                        dimensionId:
                            dimension.id,

                        dimensionTamil:
                            dimension.tamil || '',

                        dimensionEnglish:
                            dimension.english || '',

                        indicator:
                            indicator

                    });

                }
            );

        }
    );

    return indicators;

}

/* =============================================================================
 * NORMALIZE ANSWER
 * =============================================================================
 */

function normalizeAnswer(
    record
){

    const indicator =
        record.indicator;

    const answer =
        window.Page02Session.getAnswer(
            indicator.id
        );

    if(
        !answer
    ){

        return null;

    }

    const score =
        Number(
            answer.score
        );

    if(
        !Number.isFinite(score) ||
        score <
            CONFIG.minimumScorePerIndicator ||
        score >
            CONFIG.maximumScorePerIndicator
    ){

        return null;

    }

    const selectedOption =
        Array.isArray(
            indicator.options
        )
            ? (
                indicator.options.find(
                    function(option){

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

/* =============================================================================
 * GET ALL ANSWERS
 * =============================================================================
 */

function getAllAnswers(){

    return (
        getAllIndicators()
            .map(
                normalizeAnswer
            )
            .filter(
                function(answer){

                    return (
                        answer !== null
                    );

                }
            )
            .sort(
                function(a, b){

                    return (
                        a.indicatorNumber -
                        b.indicatorNumber
                    );

                }
            )
    );

}

/* =============================================================================
 * VALIDATE COMPLETE SCORECARD
 * =============================================================================
 */

function validateCompleteScorecard(){

    const indicators =
        getAllIndicators();

    if(
        indicators.length !==
        CONFIG.expectedIndicators
    ){

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
        function(record){

            const indicator =
                record.indicator;

            const answer =
                window.Page02Session.getAnswer(
                    indicator.id
                );

            if(
                !answer
            ){

                missing.push(
                    indicator.id
                );

                return;

            }

            const score =
                Number(
                    answer.score
                );

            if(
                !Number.isFinite(score) ||
                score <
                    CONFIG.minimumScorePerIndicator ||
                score >
                    CONFIG.maximumScorePerIndicator
            ){

                invalid.push(
                    indicator.id
                );

                return;

            }

            totalScore +=
                score;

        }
    );

    if(
        missing.length
    ){

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

    if(
        invalid.length
    ){

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

    if(
        totalScore <
            CONFIG.minimumTotalScore ||
        totalScore >
            CONFIG.maximumTotalScore
    ){

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

/* =============================================================================
 * GET DIMENSION RESULTS
 * =============================================================================
 */

function getDimensionResults(){

    return (
        window.Page02Data.DIMENSIONS.map(
            function(dimension){

                const score =
                    window.Page02Session
                        .getDimensionScore(
                            dimension.id
                        );

                const maximumScore =
                    dimension.indicators.length *
                    CONFIG.maximumScorePerIndicator;

                return {

                    dimensionId:
                        dimension.id,

                    tamil:
                        dimension.tamil ||
                        '',

                    english:
                        dimension.english ||
                        '',

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

/* =============================================================================
 * GET ALL DIMENSIONS
 *
 * Canonical source:
 *
 *      page02-data.js
 *
 * No dimension definitions are duplicated here.
 * =============================================================================
 */

function getAllDimensions(){

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
        typeof window.Page02Data.getDimensions ===
            'function'
    ){
        const dimensions =
            window.Page02Data.getDimensions();

        if(
            Array.isArray(dimensions)
        ){
            return dimensions;
        }
    }

    return [];
}

/* =============================================================================
 * GET DIMENSION SCORE
 *
 * Actual scoring remains owned by Page02Session.
 * =============================================================================
 */

function getDimensionScore(
    dimensionId
){

    if(
        !window.Page02Session ||
        typeof window.Page02Session.getDimensionScore !==
            'function'
    ){
        return 0;
    }

    const score =
        Number(
            window.Page02Session.getDimensionScore(
                dimensionId
            )
        );

    if(
        !Number.isFinite(score)
    ){
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

/* =============================================================================
 * GET PROGRESSIVE GRAND TOTAL
 *
 * The Grand Total is the sum of the five actual dimension scores.
 * No new scoring model is introduced.
 * =============================================================================
 */

function getProgressiveTotal(){

    const dimensions =
        getAllDimensions();

    if(
        !dimensions.length
    ){
        return 0;
    }

    const total =
        dimensions
            .slice(
                0,
                5
            )
            .reduce(
                function(
                    runningTotal,
                    dimension
                ){
                    return (
                        runningTotal +
                        getDimensionScore(
                            dimension.id
                        )
                    );
                },
                0
            );

    return Math.max(
        0,
        Math.min(
            100,
            total
        )
    );
}

/* =============================================================================
 * GET DIMENSION ANSWERED COUNT
 * =============================================================================
 */

function getDimensionAnsweredCount(
    dimensionId
){

    if(
        window.Page02Session &&
        typeof window.Page02Session.getDimensionProgress ===
            'function'
    ){
        const progress =
            window.Page02Session.getDimensionProgress(
                dimensionId
            );

        if(
            progress &&
            Number.isFinite(
                Number(
                    progress.answered
                )
            )
        ){
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

    if(
        !dimension ||
        !Array.isArray(
            dimension.indicators
        )
    ){
        return 0;
    }

    if(
        !window.Page02Session ||
        typeof window.Page02Session.getAnswer !==
            'function'
    ){
        return 0;
    }

    return dimension.indicators.reduce(
        function(
            count,
            indicator
        ){
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
    );
}

/* =============================================================================
 * NORMALIZE DIMENSION LABELS
 * =============================================================================
 */

function getDimensionTamil(
    dimension
){

    if(
        dimension &&
        dimension.tamil
    ){
        return String(
            dimension.tamil
        );
    }

    if(
        dimension &&
        dimension.titleTamil
    ){
        return String(
            dimension.titleTamil
        );
    }

    return '';
}

function getDimensionEnglish(
    dimension
){

    if(
        dimension &&
        dimension.english
    ){
        return String(
            dimension.english
        );
    }

    if(
        dimension &&
        dimension.titleEnglish
    ){
        return String(
            dimension.titleEnglish
        );
    }

    if(
        dimension &&
        dimension.name
    ){
        return String(
            dimension.name
        );
    }

    return 'Dimension';
}

/* =============================================================================
 * FIND DIMENSION SCORE PANEL
 * =============================================================================
 */

function getDimensionScorePanel(){

    return document.querySelector(
        '.page02f .dimension-score-panel'
    );
}

/* =============================================================================
 * FIND DIMENSION NAVIGATION
 * =============================================================================
 */

function getDimensionNavigation(){

    return document.querySelector(
        '.page02f .dimension-navigation'
    );
}

/* =============================================================================
 * RELOCATE LIVE DIMENSION SCORE
 *
 * Locked presentation:
 *
 *      SCORECARD
 *          ↓
 *      PROGRESSIVE SCOREBOARD
 *          ↓
 *      LIVE DIMENSION SCORE
 *          ↓
 *      NAVIGATION
 *
 * The existing score panel is moved without changing its markup or scoring.
 * =============================================================================
 */

function relocateDimensionScore(){

    const scorePanel =
        getDimensionScorePanel();

    const navigation =
        getDimensionNavigation();

    if(
        !scorePanel ||
        !navigation
    ){
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

/* =============================================================================
 * ESCAPE HTML
 * =============================================================================
 */

function escapeHtml(
    value
){

    return String(
        value
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

/* =============================================================================
 * CREATE PROGRESSIVE SCOREBOARD
 *
 * IMPORTANT:
 *
 * Page 02F MUST use the frozen shared Page 02B scoreboard namespace.
 *
 * Five dimension cards:
 *
 *      01 Wealth™
 *      02 Income & Cash Flow™
 *      03 Assets™
 *      04 Lifestyle & Freedom™
 *      05 Protection & Contribution™
 *
 * Grand Total is displayed in the scoreboard header.
 * =============================================================================
 */

function createProgressiveScoreboard(){

    let board =
        getElement(
            'page02ProgressiveScoreboard'
        );

    if(board){
        return board;
    }

    const navigation =
        getDimensionNavigation();

    if(
        !navigation
    ){
        console.warn(
            'CTM PATH™ Page 02F: navigation mount unavailable for scoreboard.'
        );

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

/* =============================================================================
 * RENDER PROGRESSIVE SCOREBOARD
 * =============================================================================
 */

function renderProgressiveScoreboard(){

    const board =
        createProgressiveScoreboard();

    if(
        !board
    ){
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

    if(
        !columns
    ){
        console.error(
            'CTM PATH™ Page 02F: progressive scoreboard columns mount not found.'
        );

        return false;
    }

    columns.innerHTML =
        '';

    let progressiveTotal =
        0;

    dimensions.forEach(
        function(
            dimension,
            index
        ){

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

            if(
                isAnswered
            ){
                progressiveTotal +=
                    score;
            }

            const column =
                document.createElement(
                    'article'
                );

            column.className =
                'page02b-progressive-column';

            if(
                isCurrent
            ){
                column.classList.add(
                    'is-current'
                );
            }

            if(
                isAnswered
            ){
                column.classList.add(
                    'is-started'
                );
            }

            if(
                isComplete
            ){
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
                    ? String(score)
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

    if(
        grandTotal
    ){
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
            function(dimension){
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

/* =============================================================================
 * UPDATE LIVE DIMENSION SCORE
 * =============================================================================
 */

function updateBottomDimensionScore(){

    if(
        !window.Page02Scorecard
    ){
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

    if(
        current
    ){
        current.textContent =
            Number.isFinite(score)
                ? String(score)
                : '0';
    }

    if(
        total
    ){
        total.textContent =
            '/ 20';
    }
}

/* =============================================================================
 * REFRESH PROGRESSIVE SCORE DISPLAY
 *
 * Called after initialization, answer selection, restore and before submission.
 * =============================================================================
 */

function refreshProgressiveScoreDisplay(){

    updateBottomDimensionScore();

    renderProgressiveScoreboard();
}

/* =============================================================================
 * GET KYC
 *
 * KYC remains owned by Page02Session.
 * This controller does not reconstruct or duplicate it.
 * =============================================================================
 */

function getKyc(){

    if(
        typeof window.Page02Session.getKyc ===
        'function'
    ){

        return (
            window.Page02Session.getKyc() ||
            {}
        );

    }

    if(
        typeof window.Page02Session.getKYC ===
        'function'
    ){

        return (
            window.Page02Session.getKYC() ||
            {}
        );

    }

    return {};

}

/* =============================================================================
 * GET CLIENT ID
 * =============================================================================
 */

function getClientId(){

    if(
        typeof window.Page02Session.getClientId ===
        'function'
    ){

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

/* =============================================================================
 * BUILD DISCOVERY PAYLOAD
 *
 * IMPORTANT:
 *
 * This is the final frontend handoff object.
 *
 * It contains:
 *
 *      clientId
 *      KYC
 *      25 answers
 *      five dimension results
 *      total score /100
 *
 * CTM_API.saveDiscovery() remains the backend integration boundary.
 * =============================================================================
 */

function buildDiscoveryPayload(){

    const validation =
        validateCompleteScorecard();

    if(
        !validation.valid
    ){

        return null;

    }

    const answers =
        getAllAnswers();

    const dimensions =
        getDimensionResults();

    const kyc =
        getKyc();

    return {

        clientId:
            getClientId(),

        kyc:
            kyc,

        assessmentType:
            'MILLIONAIRE_LIFESTYLE_SCORECARD',

        assessmentVersion:
            '3.0',

        indicatorCount:
            CONFIG.expectedIndicators,

        dimensionCount:
            CONFIG.expectedDimensions,

        answers:
            answers,

        dimensions:
            dimensions,

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

/* =============================================================================
 * SAVE RESULT LOCALLY
 *
 * Page 03 can use this as an immediate frontend result source while the
 * backend remains the permanent system of record.
 * =============================================================================
 */

function saveResultLocally(
    payload,
    response
){

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
            response || null

    };

    try{

        sessionStorage.setItem(
            'ctm_page02_result',
            JSON.stringify(
                result
            )
        );

    }
    catch(error){

        console.warn(
            'CTM PATH™ could not store Page 02 result in sessionStorage.',
            error
        );

    }

    if(
        typeof window.Page02Session.setResult ===
        'function'
    ){

        window.Page02Session.setResult(
            result
        );

    }

    return result;

}

/* =============================================================================
 * MARK JOURNEY COMPLETE
 * =============================================================================
 */

function markJourneyComplete(){

    if(
        typeof window.Page02Session.completeScorecard ===
        'function'
    ){

        window.Page02Session.completeScorecard();

    }

    if(
        typeof window.Page02Session.setCompleted ===
        'function'
    ){

        window.Page02Session.setCompleted(
            true
        );

    }

}

/* =============================================================================
 * NORMALIZE BACKEND RESPONSE
 * =============================================================================
 */

function normalizeBackendResponse(
    response
){

    if(
        response === undefined ||
        response === null
    ){

        return {

            success:
                true,

            data:
                response

        };

    }

    if(
        response === false
    ){

        return {

            success:
                false,

            data:
                response

        };

    }

    if(
        typeof response ===
        'object'
    ){

        if(
            response.success ===
            false
        ){

            return {

                success:
                    false,

                data:
                    response

            };

        }

        if(
            response.ok ===
            false
        ){

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

/* =============================================================================
 * SAVE DISCOVERY
 *
 * Supports the existing CTM_API.saveDiscovery() integration without
 * moving backend responsibilities into this page controller.
 * =============================================================================
 */

async function saveDiscovery(
    payload
){

    if(
        !window.CTM_API ||
        typeof window.CTM_API.saveDiscovery !==
            'function'
    ){

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

    if(
        !normalized.success
    ){

        const backendMessage =
            (
                normalized.data &&
                (
                    normalized.data.message ||
                    normalized.data.error
                )
            ) ||
            'Discovery save failed.';

        throw new Error(
            backendMessage
        );

    }

    return normalized.data;

}

/* =============================================================================
 * NAVIGATE TO RESULT
 * =============================================================================
 */

function navigateToResult(){

    setNavigationState(
        true
    );

    window.location.href =
        CONFIG.nextPage;

}

/* =============================================================================
 * FINAL SUBMIT
 * =============================================================================
 */

async function submitScorecard(
    event
){

    if(event){

        event.preventDefault();

    }

    if(
        submitting ||
        navigating
    ){

        return;

    }

    hideError();

    refreshProgressiveScoreDisplay();

    /* -------------------------------------------------------------------------
     * 1. VALIDATE DIMENSION 05
     * -------------------------------------------------------------------------
     */

    const dimensionValid =
        window.Page02Scorecard.requireComplete();

    if(
        !dimensionValid
    ){

        return;

    }

    /* -------------------------------------------------------------------------
     * 2. COMPLETE DIMENSION 05
     * -------------------------------------------------------------------------
     */

    const dimensionCompleted =
        window.Page02Scorecard.complete();

    refreshProgressiveScoreDisplay();

    if(
        !dimensionCompleted
    ){

        showError(
            'இறுதி பரிமாணத்தை நிறைவு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
        );

        return;

    }

    /* -------------------------------------------------------------------------
     * 3. VALIDATE ALL 25 INDICATORS
     * -------------------------------------------------------------------------
     */

    const validation =
        validateCompleteScorecard();

    if(
        !validation.valid
    ){

        console.error(
            'CTM PATH™ final scorecard validation failed:',
            validation
        );

        if(
            validation.reason ===
            'missing-answers'
        ){

            showError(
                '25 அளவுகோல்களிலும் பதில் அளித்த பிறகே உங்கள் இறுதி முடிவைக் கணக்கிட முடியும்.'
            );

        }
        else{

            showError(
                'உங்கள் மதிப்பெண்களை சரிபார்க்க முடியவில்லை. முந்தைய பரிமாணங்களை மீண்டும் சரிபார்க்கவும்.'
            );

        }

        return;

    }

    /* -------------------------------------------------------------------------
     * 4. BUILD FINAL PAYLOAD
     * -------------------------------------------------------------------------
     */

    const payload =
        buildDiscoveryPayload();

    if(
        !payload
    ){

        showError(
            'உங்கள் Scorecard தரவை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
        );

        return;

    }

    /* -------------------------------------------------------------------------
     * 5. REQUIRE CLIENT ID
     * -------------------------------------------------------------------------
     */

    if(
        !payload.clientId
    ){

        console.error(
            'CTM PATH™ final discovery payload has no clientId.',
            payload
        );

        showError(
            'உங்கள் பதிவு தகவலை கண்டுபிடிக்க முடியவில்லை. தயவுசெய்து KYC பகுதியிலிருந்து மீண்டும் தொடங்கவும்.'
        );

        return;

    }

    /* -------------------------------------------------------------------------
     * 6. SUBMIT
     * -------------------------------------------------------------------------
     */

    setSubmittingState(
        true
    );

    try{

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

        /* ---------------------------------------------------------------------
         * 7. STORE RESULT FOR PAGE 03
         * ---------------------------------------------------------------------
         */

        saveResultLocally(
            payload,
            response
        );

        /* ---------------------------------------------------------------------
         * 8. MARK SCORECARD COMPLETE
         * ---------------------------------------------------------------------
         */

        markJourneyComplete();

        console.info(
            'CTM PATH™ Millionaire Lifestyle Scorecard complete.',
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

        /* ---------------------------------------------------------------------
         * 9. RESULT PAGE
         * ---------------------------------------------------------------------
         */

        navigateToResult();

    }
    catch(error){

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

/* =============================================================================
 * BIND PREVIOUS BUTTON
 * =============================================================================
 */

function bindPreviousButton(){

    const button =
        getElement(
            DOM_IDS.previousButton
        );

    if(!button){

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

/* =============================================================================
 * BIND FINAL BUTTON
 * =============================================================================
 */

function bindNextButton(){

    const button =
        getElement(
            DOM_IDS.nextButton
        );

    if(!button){

        console.error(
            'CTM PATH™ Page 02F: #nextButton not found.'
        );

        return false;

    }

    button.addEventListener(
        'click',
        submitScorecard
    );

    return true;

}

/* =============================================================================
 * KEYBOARD SUPPORT
 * =============================================================================
 */

function bindKeyboardNavigation(){

    document.addEventListener(
        'keydown',
        function(event){

            if(
                event.key !==
                'Enter'
            ){

                return;

            }

            if(
                !event.ctrlKey &&
                !event.metaKey
            ){

                return;

            }

            event.preventDefault();

            submitScorecard();

        }
    );

}

/* =============================================================================
 * ANSWER EVENTS
 * =============================================================================
 */

function bindAnswerEvents(){

    document.addEventListener(
        'ctm:page02-answer',
        function(event){

            if(
                !event.detail ||
                event.detail.dimensionId !==
                    CONFIG.dimensionId
            ){

                return;

            }

            refreshProgressiveScoreDisplay();

            const progress =
                event.detail.progress;

            if(
                progress &&
                progress.complete
            ){

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

/* =============================================================================
 * INITIALIZE SCORECARD
 * =============================================================================
 */

function initializeScorecard(){

    return (
        window.Page02Scorecard.init({

            dimensionId:
                CONFIG.dimensionId

        })
    );

}

/* =============================================================================
 * RESTORE PAGE
 * =============================================================================
 */

function restorePage(){

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

/* =============================================================================
 * INITIALIZE
 * =============================================================================
 */

function init(){

    if(initialized){

        return;

    }

    console.info(
        'CTM PATH™ Page 02F initializing — Final Dimension...'
    );

    /* -------------------------------------------------------------------------
     * DEPENDENCIES
     * -------------------------------------------------------------------------
     */

    if(
        !verifyDependencies()
    ){

        return;

    }

    /* -------------------------------------------------------------------------
     * DIMENSION CONTRACT
     * -------------------------------------------------------------------------
     */

    if(
        !verifyDimension()
    ){

        return;

    }

    /* -------------------------------------------------------------------------
     * SCORECARD
     * -------------------------------------------------------------------------
     */

    const scorecardReady =
        initializeScorecard();

    if(
        !scorecardReady
    ){

        console.error(
            'CTM PATH™ Page 02F scorecard initialization failed.'
        );

        return;

    }

    /* -------------------------------------------------------------------------
     * CONTROLS
     * -------------------------------------------------------------------------
     */

    bindPreviousButton();

    bindNextButton();

    bindKeyboardNavigation();

    bindAnswerEvents();

    /* -------------------------------------------------------------------------
     * RESTORE
     * -------------------------------------------------------------------------
     */

    restorePage();

    /* -------------------------------------------------------------------------
     * PROGRESSIVE SCOREBOARD
     * -------------------------------------------------------------------------
     */

    relocateDimensionScore();

    refreshProgressiveScoreDisplay();

    /* -------------------------------------------------------------------------
     * VIEWPORT
     * -------------------------------------------------------------------------
     */

    scrollToTop();

    /* -------------------------------------------------------------------------
     * READY
     * -------------------------------------------------------------------------
     */

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
                CONFIG.expectedIndicators

        }
    );

}

/* =============================================================================
 * DOM READY
 * =============================================================================
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

/* =============================================================================
 * PUBLIC CONTROLLER
 * =============================================================================
 */

window.Page02F = {

    version:
        '4.0',

    dimensionId:
        CONFIG.dimensionId,

    init:
        init,

    goPrevious:
        goPrevious,

    submit:
        submitScorecard,

    validateDimension:
        function(){

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
        function(){

            const validation =
                validateCompleteScorecard();

            return (
                validation.totalScore ||
                0
            );

        }

};

/* =============================================================================
 * END
 *
 * FINAL PAGE 02 FLOW:
 *
 *      PAGE 02A
 *      KYC
 *          ↓
 *
 *      PAGE 02B
 *      DIMENSION 01
 *      INDICATORS 01–05
 *          ↓
 *
 *      PAGE 02C
 *      DIMENSION 02
 *      INDICATORS 06–10
 *          ↓
 *
 *      PAGE 02D
 *      DIMENSION 03
 *      INDICATORS 11–15
 *          ↓
 *
 *      PAGE 02E
 *      DIMENSION 04
 *      INDICATORS 16–20
 *          ↓
 *
 *      PAGE 02F
 *      DIMENSION 05
 *      INDICATORS 21–25
 *          ↓
 *
 *      VALIDATE 25 / 25
 *          ↓
 *
 *      TOTAL SCORE
 *      25–100
 *          ↓
 *
 *      BUILD DISCOVERY PAYLOAD
 *          ↓
 *
 *      CTM_API.saveDiscovery()
 *          ↓
 *
 *      STORE RESULT
 *          ↓
 *
 *      PAGE 03
 *
 *
 * NEXT FILE:
 *
 *      pages/page02f.html
 *
 * =============================================================================
 */

})(window, document);

