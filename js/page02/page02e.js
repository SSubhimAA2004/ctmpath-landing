
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02e.js
 *
 * VERSION:
 * 4.0 — PROGRESSIVE DIMENSION SCOREBOARD
 *
 * PAGE:
 * PAGE 02E — DIMENSION 04 — LIFESTYLE & FREEDOM™
 *
 * INDICATORS:
 * 16–20
 *
 * STATUS:
 * PAGE CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls the lifecycle, progressive score presentation and navigation
 * of Dimension 04.
 *
 *
 *      page02d.html
 *           ↓
 *      PAGE 02E
 *      DIMENSION 04 — LIFESTYLE & FREEDOM™
 *      Indicators 16–20
 *           ↓
 *      page02f.html
 *      DIMENSION 05 — PROTECTION & CONTRIBUTION™
 *
 * =============================================================================
 *
 * SHARED RESPONSIBILITIES DELEGATED TO:
 *
 *      page02-data.js
 *          → frozen dimension / indicator definitions
 *          → frozen scoring ranges
 *
 *      page02-session.js
 *          → answer persistence
 *          → dimension scores
 *          → journey state
 *
 *      page02-scorecard.js
 *          → rendering
 *          → option selection
 *          → scoring
 *          → validation
 *          → live dimension score
 *
 * =============================================================================
 *
 * THIS FILE:
 *
 *      ✓ initializes Dimension 04
 *      ✓ restores saved answers
 *      ✓ moves the live score below the scorecard
 *      ✓ creates progressive six-column score summary
 *      ✓ displays all five dimension scores
 *      ✓ displays Grand Total /100
 *      ✓ refreshes scoreboard after every answer
 *      ✓ binds Previous
 *      ✓ binds Next
 *      ✓ validates all five Lifestyle & Freedom™ indicators
 *      ✓ marks Lifestyle & Freedom™ complete
 *      ✓ sets Protection & Contribution™ as current
 *      ✓ navigates to Page 02F
 *      ✓ supports keyboard navigation
 *      ✓ scrolls page to top on load
 *
 * =============================================================================
 *
 * THIS FILE DOES NOT:
 *
 *      ✗ contain indicator definitions
 *      ✗ contain range definitions
 *      ✗ recreate scoring logic
 *      ✗ call backend
 *      ✗ save final discovery payload
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
        'lifestyleFreedom',

    previousPage:
        'page02d.html',

    nextPage:
        'page02f.html',

    previousDimensionId:
        'assets',

    nextDimensionId:
        'protectionContribution',

    dimensionMaximum:
        20,

    totalMaximum:
        100,

    dimensionCount:
        5,

    indicatorCount:
        5

};


/* =============================================================================
 * DOM CONTRACT
 * =============================================================================
 */

const DOM_IDS = {

    globalHeader:
        'global-header',

    globalFooter:
        'global-footer',

    previousButton:
        'previousButton',

    nextButton:
        'nextButton',

    dimensionScorePanel:
        'dimensionScorePanel',

    dimensionScoreCurrent:
        'dimensionScoreCurrent',

    dimensionScoreTotal:
        'dimensionScoreTotal',

    dimensionNavigation:
        'dimensionNavigation',

    progressiveScoreboard:
        'page02ProgressiveScoreboard',

    progressiveColumns:
        'page02ProgressiveColumns',

    progressiveGrandTotal:
        'page02ProgressiveGrandTotal'

};


/* =============================================================================
 * STATE
 * =============================================================================
 */

let initialized =
    false;


let initializing =
    false;


let navigating =
    false;


/* =============================================================================
 * DOM HELPER
 * =============================================================================
 */

function getElement(
    id
){

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
        missing.length
    ){

        console.error(

            'CTM PATH™ Page 02E missing dependencies:',

            missing

        );

        return false;

    }


    return true;

}


/* =============================================================================
 * VERIFY DIMENSION CONTRACT
 * =============================================================================
 */

function verifyDimension(){

    if(
        !window.Page02Data ||
        typeof window.Page02Data.getDimensionById !==
            'function'
    ){

        console.error(
            'CTM PATH™ Page 02E Page02Data.getDimensionById() unavailable.'
        );

        return false;

    }


    const dimension =
        window.Page02Data.getDimensionById(
            CONFIG.dimensionId
        );


    if(
        !dimension
    ){

        console.error(

            'CTM PATH™ Page 02E could not find Dimension 04:',

            CONFIG.dimensionId

        );

        return false;

    }


    if(
        !Array.isArray(
            dimension.indicators
        )
    ){

        console.error(

            'CTM PATH™ Page 02E dimension has no indicator collection.',

            dimension

        );

        return false;

    }


    if(
        dimension.indicators.length !==
        CONFIG.indicatorCount
    ){

        console.error(

            'CTM PATH™ Page 02E expected exactly five indicators.',

            {

                dimensionId:
                    CONFIG.dimensionId,

                expected:
                    CONFIG.indicatorCount,

                actual:
                    dimension.indicators.length

            }

        );

        return false;

    }


    return true;

}


/* =============================================================================
 * NAVIGATION STATE
 * =============================================================================
 */

function setNavigationState(
    active
){

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


    if(
        previousButton
    ){

        previousButton.disabled =
            navigating;

        previousButton.setAttribute(

            'aria-busy',

            navigating
                ? 'true'
                : 'false'

        );

    }


    if(
        nextButton
    ){

        nextButton.disabled =
            navigating;

        nextButton.setAttribute(

            'aria-busy',

            navigating
                ? 'true'
                : 'false'

        );

    }

}


/* =============================================================================
 * GET ALL DIMENSIONS
 * =============================================================================
 */

function getAllDimensions(){

    if(
        !window.Page02Data
    ){

        return [];

    }


    if(
        typeof window.Page02Data.getDimensions ===
            'function'
    ){

        const dimensions =
            window.Page02Data.getDimensions();


        if(
            Array.isArray(
                dimensions
            )
        ){

            return dimensions;

        }

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


/* =============================================================================
 * GET DIMENSION SCORE
 * =============================================================================
 */

function getDimensionScore(
    dimensionId
){

    if(
        window.Page02Session &&
        typeof window.Page02Session.getDimensionScore ===
            'function'
    ){

        const score =
            Number(
                window.Page02Session.getDimensionScore(
                    dimensionId
                )
            );


        if(
            Number.isFinite(
                score
            )
        ){

            return Math.max(
                0,
                Math.min(
                    CONFIG.dimensionMaximum,
                    score
                )
            );

        }

    }


    if(
        dimensionId ===
        CONFIG.dimensionId &&
        window.Page02Scorecard &&
        typeof window.Page02Scorecard.getScore ===
            'function'
    ){

        const score =
            Number(
                window.Page02Scorecard.getScore()
            );


        if(
            Number.isFinite(
                score
            )
        ){

            return Math.max(
                0,
                Math.min(
                    CONFIG.dimensionMaximum,
                    score
                )
            );

        }

    }


    return 0;

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

            return Math.max(
                0,
                Math.min(
                    CONFIG.indicatorCount,
                    Number(
                        progress.answered
                    )
                )
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

            const answer =
                window.Page02Session.getAnswer(
                    indicator.id
                );


            return (

                count +

                (
                    answer !==
                    null &&
                    answer !==
                    undefined &&
                    answer !==
                    ''
                        ? 1
                        : 0
                )

            );

        },

        0

    );

}


/* =============================================================================
 * GET PROGRESSIVE TOTAL
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
                CONFIG.dimensionCount
            )
            .reduce(

                function(
                    runningTotal,
                    dimension
                ){

                    const answered =
                        getDimensionAnsweredCount(
                            dimension.id
                        );


                    if(
                        answered <= 0
                    ){

                        return runningTotal;

                    }


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

            CONFIG.totalMaximum,

            total

        )

    );

}


/* =============================================================================
 * NORMALIZE DIMENSION ENGLISH
 * =============================================================================
 */

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
 * NORMALIZE DIMENSION TAMIL
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
 * FIND EXISTING SCORE PANEL
 * =============================================================================
 */

function getDimensionScorePanel(){

    return document.querySelector(
        '.page02e .dimension-score-panel'
    );

}


/* =============================================================================
 * FIND NAVIGATION
 * =============================================================================
 */

function getDimensionNavigation(){

    return document.querySelector(
        '.page02e .dimension-navigation'
    );

}


/* =============================================================================
 * RELOCATE LIVE DIMENSION SCORE
 *
 * Existing HTML contains the score panel inside the dimension header.
 *
 * Required presentation:
 *
 *      QUESTIONS
 *          ↓
 *      PROGRESSIVE SCOREBOARD
 *          ↓
 *      LIVE DIMENSION SCORE
 *          ↓
 *      NAVIGATION
 *
 * The score panel is moved without changing its markup or scoring behaviour.
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
        'page02e-bottom-dimension-score'
    );


    return true;

}


/* =============================================================================
 * CREATE PROGRESSIVE SCOREBOARD
 *
 * Six columns:
 *
 *      01 Wealth™
 *      02 Income & Cash Flow™
 *      03 Assets™
 *      04 Lifestyle & Freedom™
 *      05 Protection & Contribution™
 *      GRAND TOTAL
 *
 * Future dimensions display:
 *
 *      — / 20
 *
 * Answered dimensions display:
 *
 *      score / 20
 *
 * Grand Total:
 *
 *      total / 100
 *
 * =============================================================================
 */

function createProgressiveScoreboard(){

    let board =
        getElement(
            DOM_IDS.progressiveScoreboard
        );


    if(
        board
    ){

        return board;

    }


    const navigation =
        getDimensionNavigation();


    if(
        !navigation
    ){

        console.warn(
            'CTM PATH™ Page 02E could not find dimension navigation.'
        );

        return null;

    }


    board =
        document.createElement(
            'section'
        );


    board.id =
        DOM_IDS.progressiveScoreboard;


    board.className =
        'page02e-progressive-scoreboard';


    board.setAttribute(
        'aria-label',
        'Progressive Millionaire Lifestyle Scorecard'
    );


    board.innerHTML = `

        <div class="page02e-progressive-scoreboard-header">

            <div class="page02e-progressive-scoreboard-heading">

                <span class="page02e-progressive-scoreboard-kicker">
                    YOUR JOURNEY SO FAR™
                </span>

                <span class="page02e-progressive-scoreboard-title">
                    Millionaire Lifestyle Score
                </span>

            </div>


            <div
                class="page02e-progressive-scoreboard-total"
                aria-live="polite"
            >

                <span class="page02e-progressive-total-label">
                    GRAND TOTAL
                </span>

                <span class="page02e-progressive-total-value">

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
            class="page02e-progressive-columns"
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
                CONFIG.dimensionCount
            );


    const columns =
        getElement(
            DOM_IDS.progressiveColumns
        );


    const grandTotal =
        getElement(
            DOM_IDS.progressiveGrandTotal
        );


    if(
        !columns
    ){

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
                answered >=
                CONFIG.indicatorCount;


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
                'page02e-progressive-column';


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
                    ? String(
                        score
                    )
                    : '—';


            const progressLabel =
                isComplete

                    ? 'COMPLETE'

                    : (

                        isAnswered

                            ? `${answered} / ${CONFIG.indicatorCount}`

                            : 'NOT STARTED'

                    );


            column.innerHTML = `

                <div class="page02e-progressive-column-number">
                    ${number}
                </div>


                <div class="page02e-progressive-column-name">

                    ${
                        tamil

                            ? `
                                <span class="page02e-progressive-column-tamil">
                                    ${escapeHtml(tamil)}
                                </span>
                              `

                            : ''
                    }

                    <span class="page02e-progressive-column-english">
                        ${escapeHtml(english)}
                    </span>

                </div>


                <div class="page02e-progressive-column-score">

                    <strong>
                        ${displayScore}
                    </strong>

                    <span>
                        / 20
                    </span>

                </div>


                <div class="page02e-progressive-column-progress">
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

                CONFIG.totalMaximum,

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


    return true;

}


/* =============================================================================
 * REFRESH PROGRESSIVE SCORE DISPLAY
 * =============================================================================
 */

function refreshProgressiveScoreDisplay(){

    try{

        renderProgressiveScoreboard();

        return true;

    }
    catch(error){

        console.error(

            'CTM PATH™ Page 02E progressive scoreboard refresh failed.',

            error

        );

        return false;

    }

}


/* =============================================================================
 * SET CURRENT DIMENSION
 * =============================================================================
 */

function setCurrentDimension(
    dimensionId
){

    if(
        !window.Page02Session ||
        typeof window.Page02Session.setCurrentDimension !==
            'function'
    ){

        console.error(
            'CTM PATH™ Page 02E Page02Session.setCurrentDimension() unavailable.'
        );

        return false;

    }


    return Boolean(

        window.Page02Session.setCurrentDimension(
            dimensionId
        )

    );

}


/* =============================================================================
 * GO PREVIOUS
 *
 * Answers are already persisted by Page02Session.
 * =============================================================================
 */

function goPrevious(
    event
){

    if(
        event
    ){

        event.preventDefault();

    }


    if(
        navigating
    ){

        return;

    }


    const previousDimensionSet =
        setCurrentDimension(
            CONFIG.previousDimensionId
        );


    if(
        !previousDimensionSet
    ){

        console.warn(

            'CTM PATH™ Page 02E could not set previous dimension:',

            CONFIG.previousDimensionId

        );

    }


    setNavigationState(
        true
    );


    console.info(

        'CTM PATH™ Page 02E navigating previous:',

        {

            currentDimension:
                CONFIG.dimensionId,

            previousDimension:
                CONFIG.previousDimensionId,

            previousPage:
                CONFIG.previousPage

        }

    );


    window.location.href =
        CONFIG.previousPage;

}


/* =============================================================================
 * GO NEXT
 *
 * Required sequence:
 *
 *      1. Validate all five Lifestyle & Freedom™ indicators
 *      2. Refresh final Dimension 04 score
 *      3. Complete Dimension 04
 *      4. Set Dimension 05 as current
 *      5. Refresh progressive state
 *      6. Navigate to Page 02F
 *
 * =============================================================================
 */

function goNext(
    event
){

    if(
        event
    ){

        event.preventDefault();

    }


    if(
        navigating
    ){

        return;

    }


    /* -------------------------------------------------------------------------
     * VALIDATE
     * -------------------------------------------------------------------------
     */

    const valid =
        window.Page02Scorecard.requireComplete();


    if(
        !valid
    ){

        refreshProgressiveScoreDisplay();

        return;

    }


    /* -------------------------------------------------------------------------
     * FINAL SCORE REFRESH
     * -------------------------------------------------------------------------
     */

    refreshProgressiveScoreDisplay();


    /* -------------------------------------------------------------------------
     * COMPLETE DIMENSION
     * -------------------------------------------------------------------------
 */

    const completed =
        window.Page02Scorecard.complete();


    if(
        !completed
    ){

        console.error(
            'CTM PATH™ Page 02E could not complete Lifestyle & Freedom™.'
        );

        return;

    }


    /* -------------------------------------------------------------------------
     * REFRESH AFTER COMPLETION
     * -------------------------------------------------------------------------
     */

    refreshProgressiveScoreDisplay();


    /* -------------------------------------------------------------------------
     * SET NEXT DIMENSION
     * -------------------------------------------------------------------------
     */

    const nextDimensionSet =
        setCurrentDimension(
            CONFIG.nextDimensionId
        );


    if(
        !nextDimensionSet
    ){

        console.error(

            'CTM PATH™ Page 02E could not set next dimension:',

            CONFIG.nextDimensionId

        );

        return;

    }


    /* -------------------------------------------------------------------------
     * LOCK NAVIGATION
     * -------------------------------------------------------------------------
     */

    setNavigationState(
        true
    );


    /* -------------------------------------------------------------------------
     * QA LOG
     * -------------------------------------------------------------------------
     */

    console.info(

        'CTM PATH™ Dimension 04 complete:',

        {

            dimensionId:
                CONFIG.dimensionId,

            score:
                window.Page02Scorecard.getScore(),

            progress:
                window.Page02Scorecard.getProgress(),

            progressiveTotal:
                getProgressiveTotal(),

            nextDimension:
                CONFIG.nextDimensionId,

            nextPage:
                CONFIG.nextPage

        }

    );


    /* -------------------------------------------------------------------------
     * NAVIGATE
     * -------------------------------------------------------------------------
     */

    window.location.href =
        CONFIG.nextPage;

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


    if(
        !button
    ){

        console.warn(
            'CTM PATH™ Page 02E: #previousButton not found.'
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
 * BIND NEXT BUTTON
 * =============================================================================
 */

function bindNextButton(){

    const button =
        getElement(
            DOM_IDS.nextButton
        );


    if(
        !button
    ){

        console.error(
            'CTM PATH™ Page 02E: #nextButton not found.'
        );

        return false;

    }


    button.addEventListener(
        'click',
        goNext
    );


    return true;

}


/* =============================================================================
 * KEYBOARD NAVIGATION
 *
 * Ctrl/Cmd + Enter attempts to continue.
 *
 * Validation cannot be bypassed.
 * =============================================================================
 */

function bindKeyboardNavigation(){

    document.addEventListener(

        'keydown',

        function(
            event
        ){

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


            goNext();

        }

    );

}


/* =============================================================================
 * ANSWER EVENTS
 *
 * Every answer is already persisted by Page02Scorecard / Page02Session.
 *
 * The controller only refreshes the progressive presentation.
 * =============================================================================
 */

function bindAnswerEvents(){

    document.addEventListener(

        'ctm:page02-answer',

        function(
            event
        ){

            if(
                !event.detail
            ){

                return;

            }


            if(
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

                    'CTM PATH™ Dimension 04: all five indicators answered.',

                    {

                        answered:
                            progress.answered,

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
 * RESTORE PAGE STATE
 *
 * If the user returns to Page 02E:
 *
 *      ✓ Indicators 16–20
 *      ✓ selected ranges
 *      ✓ scores
 *      ✓ answered count
 *      ✓ live /20 score
 *
 * are restored by the shared scorecard engine.
 *
 * =============================================================================
 */

function restorePage(){

    const restored =
        window.Page02Scorecard.restore();


    if(
        !restored
    ){

        console.warn(
            'CTM PATH™ Page 02E could not restore scorecard state.'
        );

    }


    const progress =
        window.Page02Scorecard.getProgress();


    console.info(

        'CTM PATH™ Page 02E restored:',

        {

            answered:
                progress
                    ? progress.answered
                    : 0,

            total:
                progress
                    ? progress.total
                    : CONFIG.indicatorCount,

            score:
                progress
                    ? progress.score
                    : 0,

            maximumScore:
                progress
                    ? progress.maximumScore
                    : CONFIG.dimensionMaximum,

            complete:
                progress
                    ? progress.complete
                    : false

        }

    );


    refreshProgressiveScoreDisplay();

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
 * INITIALIZE
 * =============================================================================
 */

function init(){

    if(
        initialized ||
        initializing
    ){

        return;

    }


    initializing =
        true;


    console.info(
        'CTM PATH™ Page 02E initializing — Dimension 04 — Lifestyle & Freedom™...'
    );


    try{


        /* ---------------------------------------------------------------------
         * DEPENDENCIES
         * ---------------------------------------------------------------------
         */

        if(
            !verifyDependencies()
        ){

            return;

        }


        /* ---------------------------------------------------------------------
         * DIMENSION CONTRACT
         * ---------------------------------------------------------------------
         */

        if(
            !verifyDimension()
        ){

            return;

        }


        /* ---------------------------------------------------------------------
         * INITIALIZE SHARED SCORECARD
         * ---------------------------------------------------------------------
         */

        const scorecardReady =
            initializeScorecard();


        if(
            !scorecardReady
        ){

            console.error(
                'CTM PATH™ Page 02E scorecard initialization failed.'
            );

            return;

        }


        /* ---------------------------------------------------------------------
         * BIND CONTROLS
         * ---------------------------------------------------------------------
         */

        bindPreviousButton();

        bindNextButton();

        bindKeyboardNavigation();

        bindAnswerEvents();


        /* ---------------------------------------------------------------------
         * MOVE LIVE SCORE BELOW QUESTIONS
         * ---------------------------------------------------------------------
         */

        relocateDimensionScore();


        /* ---------------------------------------------------------------------
         * RESTORE SAVED ANSWERS
         * ---------------------------------------------------------------------
         */

        restorePage();


        /* ---------------------------------------------------------------------
         * CREATE / REFRESH PROGRESSIVE SCOREBOARD
         * ---------------------------------------------------------------------
         */

        refreshProgressiveScoreDisplay();


        /* ---------------------------------------------------------------------
         * VIEWPORT
         * ---------------------------------------------------------------------
         */

        scrollToTop();


        /* ---------------------------------------------------------------------
         * READY
         * ---------------------------------------------------------------------
 */

        initialized =
            true;


        console.info(

            'CTM PATH™ Page 02E ready.',

            {

                version:
                    '4.0',

                dimension:
                    CONFIG.dimensionId,

                score:
                    window.Page02Scorecard.getScore(),

                progress:
                    window.Page02Scorecard.getProgress(),

                progressiveTotal:
                    getProgressiveTotal()

            }

        );

    }
    catch(error){

        console.error(

            'CTM PATH™ Page 02E initialization failed.',

            error

        );

    }
    finally{

        initializing =
            false;

    }

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

        function(){

            init();

        },

        {
            once:
                true
        }

    );

}
else{

    init();

}


/* =============================================================================
 * PUBLIC CONTROLLER
 *
 * Useful during QA:
 *
 *      Page02E.init()
 *      Page02E.getScore()
 *      Page02E.getProgress()
 *      Page02E.getProgressiveTotal()
 *      Page02E.getDimensionScores()
 *      Page02E.refreshScoreboard()
 *      Page02E.goNext()
 *      Page02E.goPrevious()
 *
 * =============================================================================
 */

window.Page02E = {

    version:
        '4.0',


    dimensionId:
        CONFIG.dimensionId,


    init:
        init,


    goPrevious:
        goPrevious,


    goNext:
        goNext,


    getScore:
        function(){

            if(
                !window.Page02Scorecard
            ){

                return 0;

            }


            return (

                window.Page02Scorecard
                    .getScore()

            );

        },


    getProgress:
        function(){

            if(
                !window.Page02Scorecard
            ){

                return null;

            }


            return (

                window.Page02Scorecard
                    .getProgress()

            );

        },


    getProgressiveTotal:
        function(){

            return (
                getProgressiveTotal()
            );

        },


    getDimensionScores:
        function(){

            return (

                getAllDimensions()

                    .slice(
                        0,
                        CONFIG.dimensionCount
                    )

                    .map(

                        function(
                            dimension
                        ){

                            const answered =
                                getDimensionAnsweredCount(
                                    dimension.id
                                );


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
                                    getDimensionScore(
                                        dimension.id
                                    ),

                                maximumScore:
                                    CONFIG.dimensionMaximum,

                                answered:
                                    answered,

                                complete:
                                    answered >=
                                    CONFIG.indicatorCount

                            };

                        }

                    )

            );

        },


    refreshScoreboard:
        function(){

            refreshProgressiveScoreDisplay();

            return true;

        },


    validate:
        function(){

            if(
                !window.Page02Scorecard
            ){

                return false;

            }


            return (

                window.Page02Scorecard
                    .validate()

            );

        },


    isInitialized:
        function(){

            return initialized;

        }

};


/* =============================================================================
 * END
 *
 * PAGE 02E LOAD ORDER:
 *
 *      component-loader.js
 *             ↓
 *      global.js
 *             ↓
 *      api.js
 *             ↓
 *      page02-data.js
 *             ↓
 *      page02-session.js
 *             ↓
 *      page02-scorecard.js
 *             ↓
 *      page02e.js
 *
 *
 * PROGRESSIVE SCOREBOARD:
 *
 *      01  WEALTH™                         /20
 *      02  INCOME & CASH FLOW™             /20
 *      03  ASSETS™                         /20
 *      04  LIFESTYLE & FREEDOM™            /20
 *      05  PROTECTION & CONTRIBUTION™      /20
 *
 *      GRAND TOTAL                         /100
 *
 *
 * JOURNEY:
 *
 *      PAGE 02D
 *      DIMENSION 03 — ASSETS™
 *      INDICATORS 11–15
 *
 *             ↓
 *
 *      PAGE 02E
 *      DIMENSION 04 — LIFESTYLE & FREEDOM™
 *      INDICATORS 16–20
 *
 *             ↓
 *
 *      Validate 5 / 5
 *
 *             ↓
 *
 *      completeDimension("lifestyleFreedom")
 *
 *             ↓
 *
 *      setCurrentDimension("protectionContribution")
 *
 *             ↓
 *
 *      PAGE 02F
 *      DIMENSION 05 — PROTECTION & CONTRIBUTION™
 *      INDICATORS 21–25
 *
 *
 * =============================================================================
 */

})(window, document);

