
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02b.js
 *
 * VERSION:
 * 4.0 — PROGRESSIVE DIMENSION SCOREBOARD
 *
 * PAGE:
 * PAGE 02B — DIMENSION 01 — WEALTH™
 *
 * STATUS:
 * PAGE CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls the lifecycle and navigation of Dimension 01.
 *
 *      page02a.html
 *           ↓
 *      page02b.html
 *           ↓
 *      WEALTH™
 *      Indicators 01–05
 *           ↓
 *      page02c.html
 *
 * =============================================================================
 *
 * SHARED RESPONSIBILITIES DELEGATED TO:
 *
 *      component-loader.js
 *          → global header / footer lifecycle
 *
 *      page02-data.js
 *          → indicator definitions / ranges / dimensions
 *
 *      page02-session.js
 *          → answer persistence / scoring / journey state
 *
 *      page02-scorecard.js
 *          → rendering / selection / validation / live dimension score
 *
 * =============================================================================
 *
 * THIS FILE:
 *
 *      ✓ loads global header + footer
 *      ✓ initializes Wealth™
 *      ✓ binds Previous
 *      ✓ binds Next
 *      ✓ validates all five Wealth™ indicators
 *      ✓ marks Wealth™ complete
 *      ✓ sets Dimension 02 as current dimension
 *      ✓ navigates to Page 02C
 *      ✓ restores saved Wealth™ state
 *      ✓ provides keyboard navigation
 *      ✓ moves the dimension score to the bottom
 *      ✓ creates the progressive six-column scorecard
 *      ✓ updates progressive dimension scores after every answer
 *      ✓ updates the progressive Grand Total /100
 *
 * THIS FILE DOES NOT:
 *
 *      ✗ contain questions
 *      ✗ contain range definitions
 *      ✗ recreate scoring logic
 *      ✗ render answer options
 *      ✗ call backend
 *      ✗ contain header/footer markup
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
        'wealth',

    previousPage:
        'page02a.html',

    nextPage:
        'page02c.html',

    nextDimensionId:
        'incomeCashFlow',

    dimensionMaximum:
        20,

    totalMaximum:
        100,

    dimensionCount:
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
        'dimensionNavigation'
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
 * GLOBAL COMPONENT MOUNT CONTRACT
 * =============================================================================
 */

function verifyComponentMounts(){

    const headerMount =
        getElement(
            DOM_IDS.globalHeader
        );

    const footerMount =
        getElement(
            DOM_IDS.globalFooter
        );


    if(!headerMount){

        console.warn(
            'CTM PATH™ Page 02B: #global-header mount not found.'
        );
    }


    if(!footerMount){

        console.warn(
            'CTM PATH™ Page 02B: #global-footer mount not found.'
        );
    }


    return (
        !!headerMount &&
        !!footerMount
    );
}


/* =============================================================================
 * GLOBAL COMPONENT LOADER
 *
 * Header/footer loading is intentionally NON-FATAL.
 * =============================================================================
 */

async function loadGlobalComponents(){

    verifyComponentMounts();


    if(
        !window.CTM_COMPONENTS ||
        typeof window.CTM_COMPONENTS.load !==
            'function'
    ){

        console.warn(
            'CTM PATH™ Page 02B: global component loader unavailable.'
        );

        return false;
    }


    try{

        console.info(
            'CTM PATH™ Page 02B: loading global components...'
        );


        const result =
            await window.CTM_COMPONENTS.load();


        console.info(
            'CTM PATH™ Page 02B: global header and footer ready.',
            result || null
        );


        return true;

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02B: global component loading failed.',
            error
        );


        return false;
    }
}


/* =============================================================================
 * VERIFY SCORECARD DEPENDENCIES
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
            'CTM PATH™ Page 02B missing dependencies:',
            missing
        );

        return false;
    }


    return true;
}


/* =============================================================================
 * VERIFY DIMENSION
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
            'CTM PATH™ Page 02B could not find Wealth™ dimension.'
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
            'CTM PATH™ Page 02B expected exactly five Wealth™ indicators.',
            dimension
        );

        return false;
    }


    return true;
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
 * Delegates actual score calculation to Page02Session.
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
            CONFIG.dimensionMaximum,
            score
        )
    );
}


/* =============================================================================
 * GET PROGRESSIVE TOTAL
 *
 * Grand Total is simply the sum of the five dimension scores.
 *
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


    return dimensions.reduce(

        function(
            total,
            dimension
        ){

            return (
                total +
                getDimensionScore(
                    dimension.id
                )
            );

        },

        0
    );
}


/* =============================================================================
 * GET DIMENSION ANSWERED COUNT
 *
 * Used only for progressive display.
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
                Number(progress.answered)
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
 * NORMALIZE DIMENSION NAME
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
 * FIND EXISTING SCORE PANEL
 * =============================================================================
 */

function getDimensionScorePanel(){

    return document.querySelector(
        '.page02b .dimension-score-panel'
    );
}


/* =============================================================================
 * FIND NAVIGATION
 * =============================================================================
 */

function getDimensionNavigation(){

    return document.querySelector(
        '.page02b .dimension-navigation'
    );
}


/* =============================================================================
 * RELOCATE LIVE DIMENSION SCORE
 *
 * Existing HTML contains the score panel inside the header.
 *
 * The requested presentation is:
 *
 *      QUESTIONS
 *          ↓
 *      PROGRESSIVE SCOREBOARD
 *          ↓
 *      NAVIGATION
 *
 * Therefore the existing score panel is moved without changing its
 * markup or its scoring behaviour.
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
        'page02b-bottom-dimension-score'
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
        document.getElementById(
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
                    <strong id="page02ProgressiveGrandTotal">0</strong>
                    <span>/ 100</span>
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
        getAllDimensions();


    const columns =
        document.getElementById(
            'page02ProgressiveColumns'
        );


    const grandTotal =
        document.getElementById(
            'page02ProgressiveGrandTotal'
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


    dimensions
        .slice(
            0,
            CONFIG.dimensionCount
        )
        .forEach(

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


                if(isAnswered){

                    progressiveTotal +=
                        score;
                }


                const column =
                    document.createElement(
                        'article'
                    );


                column.className =
                    'page02b-progressive-column';


                if(isCurrent){

                    column.classList.add(
                        'is-current'
                    );
                }


                if(isAnswered){

                    column.classList.add(
                        'is-started'
                    );
                }


                if(isComplete){

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
                                ? `<span class="page02b-progressive-column-tamil">${escapeHtml(tamil)}</span>`
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


    /*
     * Grand total must represent the progressive score only.
     *
     * Since future dimensions are unanswered they contribute zero.
     */

    if(grandTotal){

        grandTotal.textContent =
            String(
                progressiveTotal
            );
    }


    board.dataset.total =
        String(
            progressiveTotal
        );


    return true;
}


/* =============================================================================
 * HTML ESCAPE
 *
 * Dimension names originate from the canonical data layer.
 * This keeps dynamic insertion safe.
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
 * UPDATE LIVE DIMENSION SCORE
 *
 * The actual score is still owned by Page02Scorecard.
 *
 * This controller only refreshes the display.
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
            DOM_IDS.dimensionScoreCurrent
        );


    const total =
        getElement(
            DOM_IDS.dimensionScoreTotal
        );


    if(current){

        current.textContent =
            Number.isFinite(score)
                ? String(score)
                : '0';
    }


    if(total){

        total.textContent =
            '/ 20';
    }
}


/* =============================================================================
 * REFRESH SCORE DISPLAY
 *
 * Called:
 *
 *      • after initialization
 *      • after answer selection
 *      • after restore
 * =============================================================================
 */

function refreshProgressiveScoreDisplay(){

    updateBottomDimensionScore();

    renderProgressiveScoreboard();
}


/* =============================================================================
 * NAVIGATION LOCK
 * =============================================================================
 */

function setNavigationState(
    active
){

    navigating =
        active;


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
 * PREVIOUS
 *
 * Answers are already persisted by Page02Session.
 * =============================================================================
 */

function goPrevious(
    event
){

    if(event){

        event.preventDefault();
    }


    if(navigating){

        return;
    }


    setNavigationState(
        true
    );


    window.location.href =
        CONFIG.previousPage;
}


/* =============================================================================
 * NEXT
 *
 * Critical sequence:
 *
 *      1. Validate all five Wealth™ indicators
 *      2. Mark Wealth™ complete
 *      3. Set Dimension 02 as current
 *      4. Navigate to Page 02C
 *
 * =============================================================================
 */

function goNext(
    event
){

    if(event){

        event.preventDefault();
    }


    if(navigating){

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
     * FINAL WEALTH SCORE REFRESH
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
            'CTM PATH™ Page 02B could not complete Wealth™.'
        );

        return;
    }


    /* -------------------------------------------------------------------------
     * SET NEXT DIMENSION
     * -------------------------------------------------------------------------
     */

    const nextDimensionSet =
        window.Page02Session.setCurrentDimension(
            CONFIG.nextDimensionId
        );


    if(
        !nextDimensionSet
    ){

        console.error(
            'CTM PATH™ Page 02B could not set next dimension:',
            CONFIG.nextDimensionId
        );

        return;
    }


    /* -------------------------------------------------------------------------
     * NAVIGATE
     * -------------------------------------------------------------------------
     */

    setNavigationState(
        true
    );


    console.info(
        'CTM PATH™ Wealth™ complete:',
        {

            score:
                window.Page02Scorecard.getScore(),

            progressiveTotal:
                getProgressiveTotal(),

            progress:
                window.Page02Scorecard.getProgress(),

            next:
                CONFIG.nextDimensionId
        }
    );


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


    if(!button){

        console.warn(
            'CTM PATH™ Page 02B: #previousButton not found.'
        );

        return;
    }


    button.addEventListener(
        'click',
        goPrevious
    );
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


    if(!button){

        console.error(
            'CTM PATH™ Page 02B: #nextButton not found.'
        );

        return;
    }


    button.addEventListener(
        'click',
        goNext
    );
}


/* =============================================================================
 * KEYBOARD SUPPORT
 *
 * Ctrl/Cmd + Enter:
 * attempt to continue.
 *
 * Validation is never bypassed.
 * =============================================================================
 */

function bindKeyboardNavigation(){

    document.addEventListener(
        'keydown',
        function(event){

            if(
                event.key !== 'Enter'
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
 * ANSWER EVENT
 *
 * Shared engine emits:
 *
 *      ctm:page02-answer
 *
 * Page02B uses this event only to refresh its page-level progressive display.
 *
 * The shared scorecard remains the scoring source of truth.
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
                    'CTM PATH™ Wealth™: all five indicators answered.',
                    {

                        score:
                            progress.score,

                        maximumScore:
                            progress.maximumScore,

                        progressiveTotal:
                            getProgressiveTotal()
                    }
                );
            }
        }
    );
}


/* =============================================================================
 * RESTORE PAGE STATE
 * =============================================================================
 */

function restorePage(){

    const restored =
        window.Page02Scorecard.restore();


    if(!restored){

        console.warn(
            'CTM PATH™ Page 02B: scorecard restore returned false.'
        );
    }


    refreshProgressiveScoreDisplay();


    const progress =
        window.Page02Scorecard.getProgress();


    console.info(
        'CTM PATH™ Page 02B restored:',
        {

            answered:
                progress
                    ? progress.answered
                    : 0,

            total:
                progress
                    ? progress.total
                    : 0,

            score:
                progress
                    ? progress.score
                    : 0,

            maximumScore:
                progress
                    ? progress.maximumScore
                    : CONFIG.dimensionMaximum,

            progressiveTotal:
                getProgressiveTotal()
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
 * INITIALIZE SCOREBOARD LAYOUT
 * =============================================================================
 */

function initializeScoreboardLayout(){

    /*
     * Move the existing dimension score below the scorecard.
     */

    relocateDimensionScore();


    /*
     * Create the six-column progressive scoreboard immediately above
     * the navigation controls.
     */

    createProgressiveScoreboard();


    /*
     * Render initial state.
     */

    refreshProgressiveScoreDisplay();
}


/* =============================================================================
 * INITIALIZE
 *
 * LIFECYCLE:
 *
 *      DOM READY
 *          ↓
 *      GLOBAL COMPONENTS
 *          ↓
 *      VERIFY SCORECARD DEPENDENCIES
 *          ↓
 *      VERIFY DIMENSION CONTRACT
 *          ↓
 *      INITIALIZE SCORECARD
 *          ↓
 *      MOVE SCORE PANEL
 *          ↓
 *      CREATE PROGRESSIVE SCOREBOARD
 *          ↓
 *      BIND NAVIGATION / EVENTS
 *          ↓
 *      RESTORE SESSION STATE
 *          ↓
 *      SCROLL TO TOP
 *          ↓
 *      READY
 *
 * =============================================================================
 */

async function init(){

    if(
        initialized ||
        initializing
    ){

        return;
    }


    initializing =
        true;


    console.info(
        'CTM PATH™ Page 02B initializing — Wealth™...'
    );


    try{

        /* ---------------------------------------------------------------------
         * GLOBAL HEADER + FOOTER
         *
         * NON-FATAL
         * ---------------------------------------------------------------------
         */

        const componentsReady =
            await loadGlobalComponents();


        if(!componentsReady){

            console.warn(
                'CTM PATH™ Page 02B continuing without confirmed global components.'
            );
        }


        /* ---------------------------------------------------------------------
         * SCORECARD DEPENDENCIES
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
         * SCORECARD
         * ---------------------------------------------------------------------
         */

        const scorecardReady =
            initializeScorecard();


        if(
            !scorecardReady
        ){

            console.error(
                'CTM PATH™ Page 02B scorecard initialization failed.'
            );

            return;
        }


        /* ---------------------------------------------------------------------
         * SCOREBOARD LAYOUT
         * ---------------------------------------------------------------------
         */

        initializeScoreboardLayout();


        /* ---------------------------------------------------------------------
         * NAVIGATION
         * ---------------------------------------------------------------------
         */

        bindPreviousButton();

        bindNextButton();

        bindKeyboardNavigation();

        bindAnswerEvents();


        /* ---------------------------------------------------------------------
         * RESTORE
         * ---------------------------------------------------------------------
         */

        restorePage();


        /* ---------------------------------------------------------------------
         * FINAL SCOREBOARD REFRESH
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
            'CTM PATH™ Page 02B ready.',
            {

                dimension:
                    CONFIG.dimensionId,

                globalComponents:
                    componentsReady,

                score:
                    window.Page02Scorecard.getScore(),

                progressiveTotal:
                    getProgressiveTotal(),

                progress:
                    window.Page02Scorecard.getProgress()
            }
        );

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02B initialization failed.',
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
 *      Page02B.init()
 *      Page02B.getProgress()
 *      Page02B.getProgressiveTotal()
 *      Page02B.getDimensionScores()
 *      Page02B.goNext()
 *      Page02B.goPrevious()
 *      Page02B.loadGlobalComponents()
 *
 * =============================================================================
 */

window.Page02B = {

    version:
        '4.0',

    dimensionId:
        CONFIG.dimensionId,

    init:
        init,

    loadGlobalComponents:
        loadGlobalComponents,

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
                        function(dimension){

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
                                    getDimensionAnsweredCount(
                                        dimension.id
                                    ),

                                complete:
                                    getDimensionAnsweredCount(
                                        dimension.id
                                    ) >= 5
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
 * PAGE 02B LOAD ORDER:
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
 *      page02b.js
 *
 *
 * PAGE INITIALIZATION:
 *
 *      DOM READY
 *             ↓
 *      CTM_COMPONENTS.load()
 *             ↓
 *      Page02Scorecard.init("wealth")
 *             ↓
 *      Move live score panel
 *             ↓
 *      Create progressive six-column scoreboard
 *             ↓
 *      Restore Wealth™ answers
 *             ↓
 *      Refresh progressive scores
 *             ↓
 *      Bind navigation
 *             ↓
 *      Page ready
 *
 *
 * PROGRESSIVE SCOREBOARD:
 *
 *      DIMENSION 01        /20
 *      DIMENSION 02        /20
 *      DIMENSION 03        /20
 *      DIMENSION 04        /20
 *      DIMENSION 05        /20
 *      GRAND TOTAL         /100
 *
 *
 * PAGE 02B:
 *
 *      Wealth™ score
 *             ↓
 *      Progressive Grand Total
 *
 * PAGE 02C:
 *
 *      Wealth™
 *             +
 *      Income & Cash Flow™
 *             ↓
 *      Progressive Grand Total
 *
 * PAGE 02D:
 *
 *      Wealth™
 *             +
 *      Income & Cash Flow™
 *             +
 *      Assets™
 *             ↓
 *      Progressive Grand Total
 *
 * PAGE 02E:
 *
 *      First four dimensions
 *             ↓
 *      Progressive Grand Total
 *
 * PAGE 02F:
 *
 *      All five dimensions
 *             ↓
 *      FINAL SCORE /100
 *
 * =============================================================================
 */

})(window, document);

