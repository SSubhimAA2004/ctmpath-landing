
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02c.js
 *
 * VERSION:
 * 4.1 — PROGRESSIVE DIMENSION SCOREBOARD
 *
 * PAGE:
 * PAGE 02C — DIMENSION 02 — INCOME & CASH FLOW™
 *
 * STATUS:
 * PAGE CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls the lifecycle and navigation of Dimension 02.
 *
 *      page02b.html
 *           ↓
 *
 *      PAGE 02C
 *      INCOME & CASH FLOW™
 *      Indicators 06–10
 *           ↓
 *
 *      page02d.html
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
 *      ✓ initializes Income & Cash Flow™
 *      ✓ binds Previous
 *      ✓ binds Next
 *      ✓ validates all five Income & Cash Flow™ indicators
 *      ✓ marks Income & Cash Flow™ complete
 *      ✓ sets Dimension 03 as current dimension
 *      ✓ navigates to Page 02D
 *      ✓ restores saved Income & Cash Flow™ state
 *      ✓ provides keyboard navigation
 *      ✓ moves the live dimension score below the scorecard
 *      ✓ creates the progressive Millionaire Lifestyle Scoreboard™
 *      ✓ displays Wealth™ + Income & Cash Flow™ progressively
 *      ✓ preserves previously completed dimensions
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
        'incomeCashFlow',

    previousPage:
        'page02b.html',

    nextPage:
        'page02d.html',

    nextDimensionId:
        'assets',

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
            'CTM PATH™ Page 02C: #global-header mount not found.'
        );
    }


    if(!footerMount){

        console.warn(
            'CTM PATH™ Page 02C: #global-footer mount not found.'
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
 *
 * The scorecard must remain usable even if the global component service
 * encounters a loading or path error.
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
            'CTM PATH™ Page 02C: global component loader unavailable.'
        );

        return false;
    }


    try{

        console.info(
            'CTM PATH™ Page 02C: loading global components...'
        );


        const result =
            await window.CTM_COMPONENTS.load();


        console.info(
            'CTM PATH™ Page 02C: global header and footer ready.',
            result || null
        );


        return true;
    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02C: global component loading failed.',
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
            'CTM PATH™ Page 02C missing dependencies:',
            missing
        );

        return false;
    }


    return true;
}


/* =============================================================================
 * VERIFY DIMENSION
 *
 * Dimension 02 must contain exactly five indicators:
 *
 *      Indicators 06–10
 *
 * The actual definitions remain owned by page02-data.js.
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
            'CTM PATH™ Page 02C could not find Income & Cash Flow™ dimension.'
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
            'CTM PATH™ Page 02C expected exactly five Income & Cash Flow™ indicators.',
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
 * The actual score calculation belongs to Page02Session.
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
 * GET DIMENSION ANSWERED COUNT
 *
 * Used only for progressive presentation.
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
 * GET PROGRESSIVE TOTAL
 *
 * Progressive Grand Total = sum of all dimensions that currently contain
 * answers.
 *
 * No new scoring model is introduced.
 *
 * The canonical score remains Page02Session.
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

            const answered =
                getDimensionAnsweredCount(
                    dimension.id
                );


            if(
                answered <= 0
            ){

                return total;
            }


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
 * NORMALIZE DIMENSION ENGLISH NAME
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
 * NORMALIZE DIMENSION TAMIL NAME
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
        '.page02c .dimension-score-panel'
    );
}


/* =============================================================================
 * FIND NAVIGATION
 * =============================================================================
 */

function getDimensionNavigation(){

    return document.querySelector(
        '.page02c .dimension-navigation'
    );
}


/* =============================================================================
 * RELOCATE LIVE DIMENSION SCORE
 *
 * Existing HTML places the live dimension score inside the header.
 *
 * Desired presentation:
 *
 *      QUESTIONS
 *          ↓
 *      PROGRESSIVE SCOREBOARD
 *          ↓
 *      LIVE DIMENSION SCORE
 *          ↓
 *      NAVIGATION
 *
 * Only the DOM position changes.
 * Scoring behaviour remains owned by Page02Scorecard.
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
        'page02c-bottom-dimension-score'
    );


    return true;
}


/* =============================================================================
 * CREATE PROGRESSIVE SCOREBOARD
 *
 * The visual architecture remains compatible with the frozen Page 02B
 * scoreboard markup.
 *
 * Five dimension columns:
 *
 *      01 Wealth™
 *      02 Income & Cash Flow™
 *      03 Assets™
 *      04 Lifestyle & Freedom™
 *      05 Protection & Contribution™
 *
 * GRAND TOTAL is displayed in the scoreboard header.
 *
 * Therefore the dimension area contains FIVE columns.
 *
 * This is important for the responsive CSS architecture.
 * =============================================================================
 */

function createProgressiveScoreboard(){

    let board =
        document.getElementById(
            DOM_IDS.progressiveScoreboard
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
            'CTM PATH™ Page 02C: dimension navigation not found; scoreboard cannot be mounted.'
        );

        return null;
    }


    board =
        document.createElement(
            'section'
        );


    board.id =
        DOM_IDS.progressiveScoreboard;


    /*
     * Keep the frozen scoreboard class names.
     *
     * page02c.css intentionally scopes these classes under .page02c.
     */
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
 *
 * PAGE 02C expected initial state:
 *
 *      Wealth™                  completed /20
 *      Income & Cash Flow™      current /20
 *      Assets™                  — /20
 *      Lifestyle & Freedom™     — /20
 *      Protection & Contribution™ — /20
 *
 *      GRAND TOTAL = Wealth + Income
 *
 * If previously completed dimensions exist in session state, they remain
 * visible and contribute to the progressive total.
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

        console.error(
            'CTM PATH™ Page 02C: progressive scoreboard columns mount not found.'
        );

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


                /*
                 * Only dimensions with actual answers contribute
                 * to the progressive Grand Total.
                 */
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


                /*
                 * Frozen scoreboard class architecture.
                 */
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


    /*
     * Grand Total represents the progressive journey score.
     *
     * Unanswered dimensions contribute zero.
     */
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


    board.dataset.currentDimension =
        CONFIG.dimensionId;


    return true;
}


/* =============================================================================
 * HTML ESCAPE
 *
 * Dimension names originate from the canonical data layer.
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
 * Actual scoring remains owned by Page02Scorecard / Page02Session.
 *
 * This controller only refreshes the presentation.
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
 * REFRESH SCORE DISPLAY
 *
 * Called:
 *
 *      • after initialization
 *      • after answer selection
 *      • after restore
 *      • before navigation
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


    if(
        previousButton
    ){

        previousButton.disabled =
            active;

        previousButton.setAttribute(
            'aria-busy',
            active
                ? 'true'
                : 'false'
        );
    }


    if(
        nextButton
    ){

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
 *
 * Returning to Page 02B therefore does not require another save action.
 * =============================================================================
 */

function goPrevious(
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


    console.info(
        'CTM PATH™ Page 02C → Page 02B'
    );


    window.location.href =
        CONFIG.previousPage;
}


/* =============================================================================
 * NEXT
 *
 * Critical sequence:
 *
 *      1. Validate all five Income & Cash Flow™ indicators
 *      2. Refresh the final dimension score
 *      3. Mark Income & Cash Flow™ complete
 *      4. Set Dimension 03 as current
 *      5. Navigate to Page 02D
 *
 * Validation is NEVER bypassed.
 * =============================================================================
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


    if(
        !window.Page02Scorecard
    ){

        console.error(
            'CTM PATH™ Page 02C: Page02Scorecard unavailable.'
        );

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
     * FINAL CURRENT DIMENSION REFRESH
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
            'CTM PATH™ Page 02C could not complete Income & Cash Flow™.'
        );

        return;
    }


    /* -------------------------------------------------------------------------
     * SET DIMENSION 03
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
            'CTM PATH™ Page 02C could not set next dimension:',
            CONFIG.nextDimensionId
        );

        return;
    }


    /* -------------------------------------------------------------------------
     * FINAL PROGRESSIVE SCOREBOARD STATE
     * -------------------------------------------------------------------------
     */

    refreshProgressiveScoreDisplay();


    /* -------------------------------------------------------------------------
     * NAVIGATION LOCK
     * -------------------------------------------------------------------------
     */

    setNavigationState(
        true
    );


    console.info(
        'CTM PATH™ Income & Cash Flow™ complete:',
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
            'CTM PATH™ Page 02C: #previousButton not found.'
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


    if(
        !button
    ){

        console.error(
            'CTM PATH™ Page 02C: #nextButton not found.'
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
 * Page 02C uses this event to refresh:
 *
 *      • live Income & Cash Flow™ score
 *      • progressive dimension scores
 *      • progressive Grand Total
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
                    'CTM PATH™ Income & Cash Flow™: all five indicators answered.',
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
 *
 * Page02Scorecard restores the five Income & Cash Flow™ indicators.
 *
 * Then the progressive scoreboard is refreshed from the shared session.
 * =============================================================================
 */

function restorePage(){

    const restored =
        window.Page02Scorecard.restore();


    if(
        !restored
    ){

        console.warn(
            'CTM PATH™ Page 02C: scorecard restore returned false.'
        );
    }


    refreshProgressiveScoreDisplay();


    const progress =
        window.Page02Scorecard.getProgress();


    console.info(
        'CTM PATH™ Page 02C restored:',
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
 *
 * Sequence:
 *
 *      scorecard
 *          ↓
 *      relocate live score
 *          ↓
 *      create scoreboard
 *          ↓
 *      render scoreboard
 * =============================================================================
 */

function initializeScoreboardLayout(){

    relocateDimensionScore();


    createProgressiveScoreboard();


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
 *      FINAL SCOREBOARD REFRESH
 *          ↓
 *      SCROLL TO TOP
 *          ↓
 *      READY
 *
 * Global component failure is NON-FATAL.
 *
 * Scorecard dependency / dimension failures ARE fatal.
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
        'CTM PATH™ Page 02C initializing — Income & Cash Flow™...'
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


        if(
            !componentsReady
        ){

            console.warn(
                'CTM PATH™ Page 02C continuing without confirmed global components.'
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
                'CTM PATH™ Page 02C scorecard initialization failed.'
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
            'CTM PATH™ Page 02C ready.',
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
            'CTM PATH™ Page 02C initialization failed.',
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
 *      Page02C.init()
 *      Page02C.getProgress()
 *      Page02C.getScore()
 *      Page02C.getProgressiveTotal()
 *      Page02C.getDimensionScores()
 *      Page02C.goNext()
 *      Page02C.goPrevious()
 *      Page02C.refreshScoreboard()
 *      Page02C.loadGlobalComponents()
 *
 * =============================================================================
 */

window.Page02C = {

    version:
        '4.1',

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
 * PAGE 02C LOAD ORDER:
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
 *      page02c.js
 *
 *
 * PAGE INITIALIZATION:
 *
 *      DOM READY
 *           ↓
 *      CTM_COMPONENTS.load()
 *           ↓
 *      Page02Scorecard.init("incomeCashFlow")
 *           ↓
 *      Render Indicators 06–10
 *           ↓
 *      Move live dimension score
 *           ↓
 *      Create progressive scoreboard
 *           ↓
 *      Restore Income & Cash Flow™ answers
 *           ↓
 *      Refresh progressive scores
 *           ↓
 *      Bind navigation
 *           ↓
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
 *      Wealth™
 *           ↓
 *      Progressive Grand Total
 *
 *
 * PAGE 02C:
 *
 *      Wealth™
 *           +
 *      Income & Cash Flow™
 *           ↓
 *      Progressive Grand Total
 *
 *
 * PAGE 02D:
 *
 *      Wealth™
 *           +
 *      Income & Cash Flow™
 *           +
 *      Assets™
 *           ↓
 *      Progressive Grand Total
 *
 *
 * PAGE 02E:
 *
 *      First four dimensions
 *           ↓
 *      Progressive Grand Total
 *
 *
 * PAGE 02F:
 *
 *      All five dimensions
 *           ↓
 *      FINAL SCORE /100
 *
 *
 * ARCHITECTURE RULE:
 *
 *      page02-data.js
 *             ↓
 *      page02-session.js
 *             ↓
 *      page02-scorecard.js
 *             ↓
 *      page02c.js
 *
 *      The controller never recreates the scoring engine.
 *
 * =============================================================================
 */

})(window, document);

