
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02d.js
 *
 * VERSION:
 * 5.0 — CANONICAL PROGRESSIVE DIMENSION SCOREBOARD
 *
 * PAGE:
 * PAGE 02D — DIMENSION 03 — ASSETS™
 *
 * STATUS:
 * PAGE CONTROLLER — FROZEN ARCHITECTURE
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls the lifecycle, progressive score presentation and navigation
 * of Dimension 03.
 *
 *
 *      page02c.html
 *           ↓
 *      PAGE 02D
 *      DIMENSION 03 — ASSETS™
 *      Indicators 11–15
 *           ↓
 *      page02e.html
 *      DIMENSION 04 — LIFESTYLE & FREEDOM™
 *
 * =============================================================================
 *
 * SHARED RESPONSIBILITIES DELEGATED TO:
 *
 *      page02-data.js
 *          → frozen dimension / indicator definitions
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
 *      ✓ initializes Dimension 03
 *      ✓ restores saved answers
 *      ✓ moves the live score below the scorecard
 *      ✓ creates the canonical progressive score summary
 *      ✓ displays all five dimension scores
 *      ✓ displays Grand Total /100
 *      ✓ refreshes scoreboard after every answer
 *      ✓ binds Previous
 *      ✓ binds Next
 *      ✓ validates all five Assets™ indicators
 *      ✓ marks Assets™ complete
 *      ✓ sets Lifestyle & Freedom™ as current
 *      ✓ navigates to Page 02E
 *      ✓ supports keyboard navigation
 *      ✓ scrolls page to top on load
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
 *
 * SCOREBOARD CONTRACT
 *
 *      page02b-progressive-scoreboard
 *              ↓
 *      page02b-progressive-scoreboard-header
 *              ↓
 *      page02b-progressive-columns
 *              ↓
 *      page02b-progressive-column
 *
 * This namespace is intentionally shared across Page 02.
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
        'assets',

    previousPage:
        'page02c.html',

    nextPage:
        'page02e.html',

    previousDimensionId:
        'incomeCashFlow',

    nextDimensionId:
        'lifestyleFreedom',

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
            'CTM PATH™ Page 02D: #global-header mount not found.'
        );
    }


    if(!footerMount){

        console.warn(
            'CTM PATH™ Page 02D: #global-footer mount not found.'
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
 * Header/footer loading remains NON-FATAL.
 *
 * The page controller does not own global component markup.
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
            'CTM PATH™ Page 02D: global component loader unavailable.'
        );

        return false;
    }


    try{

        console.info(
            'CTM PATH™ Page 02D: loading global components...'
        );


        const result =
            await window.CTM_COMPONENTS.load();


        console.info(
            'CTM PATH™ Page 02D: global components ready.',
            result || null
        );


        return true;

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02D: global component loading failed.',
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
            'CTM PATH™ Page 02D missing dependencies:',
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

    const dimension =
        window.Page02Data.getDimensionById(
            CONFIG.dimensionId
        );


    if(
        !dimension
    ){

        console.error(
            'CTM PATH™ Page 02D could not find Dimension 03:',
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
            'CTM PATH™ Page 02D dimension has no indicator collection.',
            dimension
        );


        return false;
    }


    if(
        dimension.indicators.length !==
        CONFIG.indicatorCount
    ){

        console.error(
            'CTM PATH™ Page 02D expected exactly five indicators.',
            {

                dimensionId:
                    CONFIG.dimensionId,

                indicators:
                    dimension.indicators.length
            }
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
            Array.isArray(
                dimensions
            )
        ){

            return dimensions;
        }
    }


    return [];
}


/* =============================================================================
 * GET DIMENSION SCORE
 *
 * Actual score calculation remains owned by Page02Session.
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
 * GET PROGRESSIVE GRAND TOTAL
 *
 * The Grand Total is the sum of the five dimension scores.
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
 * FIND EXISTING SCORE PANEL
 * =============================================================================
 */

function getDimensionScorePanel(){

    return document.querySelector(
        '.page02d .dimension-score-panel'
    );
}


/* =============================================================================
 * FIND NAVIGATION
 * =============================================================================
 */

function getDimensionNavigation(){

    return document.querySelector(
        '.page02d .dimension-navigation'
    );
}


/* =============================================================================
 * RELOCATE LIVE DIMENSION SCORE
 *
 * Existing HTML contains the live score panel inside the header.
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
 * Existing markup is moved.
 * Scoring behaviour is untouched.
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
        'page02d-bottom-dimension-score'
    );


    return true;
}


/* =============================================================================
 * CREATE PROGRESSIVE SCOREBOARD
 *
 * CANONICAL COMPONENT CONTRACT:
 *
 *      page02b-progressive-scoreboard
 *      page02b-progressive-scoreboard-header
 *      page02b-progressive-scoreboard-heading
 *      page02b-progressive-scoreboard-kicker
 *      page02b-progressive-scoreboard-title
 *      page02b-progressive-scoreboard-total
 *      page02b-progressive-total-label
 *      page02b-progressive-total-value
 *      page02b-progressive-columns
 *      page02b-progressive-column
 *      page02b-progressive-column-number
 *      page02b-progressive-column-name
 *      page02b-progressive-column-tamil
 *      page02b-progressive-column-english
 *      page02b-progressive-column-score
 *      page02b-progressive-column-progress
 *
 * Five dimensions:
 *
 *      01 Wealth™
 *      02 Income & Cash Flow™
 *      03 Assets™
 *      04 Lifestyle & Freedom™
 *      05 Protection & Contribution™
 *
 * Grand Total:
 *
 *      /100
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
            'CTM PATH™ Page 02D: navigation mount unavailable for scoreboard.'
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
     * IMPORTANT:
     *
     * Canonical Page 02 scoreboard namespace.
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


            /*
             * Only answered dimensions contribute to the displayed
             * progressive total.
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
             * CANONICAL CLASS.
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
                )
                    .padStart(
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
        dimensions
            .filter(
                function(dimension){

                    return (
                        getDimensionAnsweredCount(
                            dimension.id
                        ) >=
                        CONFIG.indicatorCount
                    );
                }
            )
            .length;


    return true;
}


/* =============================================================================
 * UPDATE LIVE DIMENSION SCORE
 *
 * Actual score remains owned by Page02Scorecard.
 *
 * This function only updates presentation.
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

            Number.isFinite(
                score
            )

                ? String(
                    score
                )

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
 * Called:
 *
 *      • after initialization
 *      • after answer selection
 *      • after restore
 *      • before navigation
 *      • after completion
 *
 * =============================================================================
 */

function refreshProgressiveScoreDisplay(){

    updateBottomDimensionScore();

    renderProgressiveScoreboard();
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


    if(
        !window.Page02Session ||
        typeof window.Page02Session.setCurrentDimension !==
            'function'
    ){

        console.error(
            'CTM PATH™ Page 02D: Page02Session.setCurrentDimension unavailable.'
        );


        return;
    }


    const previousDimensionSet =
        window.Page02Session.setCurrentDimension(
            CONFIG.previousDimensionId
        );


    if(
        !previousDimensionSet
    ){

        console.warn(
            'CTM PATH™ Page 02D could not set previous dimension:',
            CONFIG.previousDimensionId
        );
    }


    setNavigationState(
        true
    );


    console.info(
        'CTM PATH™ Page 02D navigating previous:',
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
 *      1. Validate all five Assets™ indicators
 *      2. Refresh final Dimension 03 score
 *      3. Complete Dimension 03
 *      4. Set Dimension 04 as current
 *      5. Refresh progressive state
 *      6. Navigate to Page 02E
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


    if(
        !window.Page02Scorecard
    ){

        console.error(
            'CTM PATH™ Page 02D: Page02Scorecard unavailable.'
        );


        return;
    }


    /* -------------------------------------------------------------------------
     * VALIDATE
     * -------------------------------------------------------------------------
     */

    const valid =
        typeof window.Page02Scorecard.requireComplete ===
            'function'

            ? window.Page02Scorecard.requireComplete()

            : false;


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

        typeof window.Page02Scorecard.complete ===
            'function'

            ? window.Page02Scorecard.complete()

            : false;


    if(
        !completed
    ){

        console.error(
            'CTM PATH™ Page 02D could not complete Assets™.'
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

    if(
        !window.Page02Session ||
        typeof window.Page02Session.setCurrentDimension !==
            'function'
    ){

        console.error(
            'CTM PATH™ Page 02D: Page02Session.setCurrentDimension unavailable.'
        );


        return;
    }


    const nextDimensionSet =
        window.Page02Session.setCurrentDimension(
            CONFIG.nextDimensionId
        );


    if(
        !nextDimensionSet
    ){

        console.error(
            'CTM PATH™ Page 02D could not set next dimension:',
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
        'CTM PATH™ Dimension 03 complete:',
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
            'CTM PATH™ Page 02D: #previousButton not found.'
        );


        return false;
    }


    /*
     * Prevent duplicate listeners if init() is called manually during QA.
     */
    if(
        button.dataset.page02dBound ===
        'true'
    ){

        return true;
    }


    button.addEventListener(
        'click',
        goPrevious
    );


    button.dataset.page02dBound =
        'true';


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
            'CTM PATH™ Page 02D: #nextButton not found.'
        );


        return false;
    }


    /*
     * Prevent duplicate listeners if init() is called manually during QA.
     */
    if(
        button.dataset.page02dBound ===
        'true'
    ){

        return true;
    }


    button.addEventListener(
        'click',
        goNext
    );


    button.dataset.page02dBound =
        'true';


    return true;
}


/* =============================================================================
 * KEYBOARD NAVIGATION
 *
 * Ctrl + Enter
 * or
 * Cmd + Enter
 *
 * attempts to continue.
 *
 * Validation remains mandatory.
 * =============================================================================
 */

function bindKeyboardNavigation(){

    if(
        document.documentElement.dataset.page02dKeyboardBound ===
        'true'
    ){

        return;
    }


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


            goNext();
        }
    );


    document.documentElement.dataset.page02dKeyboardBound =
        'true';
}


/* =============================================================================
 * ANSWER EVENT
 *
 * page02-scorecard.js dispatches:
 *
 *      ctm:page02-answer
 *
 * The shared scorecard remains the scoring source of truth.
 *
 * This controller refreshes:
 *
 *      ✓ live Dimension 03 score
 *      ✓ progressive five-dimension scoreboard
 *      ✓ Grand Total /100
 *
 * =============================================================================
 */

function bindAnswerEvents(){

    if(
        document.documentElement.dataset.page02dAnswerBound ===
        'true'
    ){

        return;
    }


    document.addEventListener(

        'ctm:page02-answer',

        function(event){

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
                    'CTM PATH™ Assets™: all five indicators answered.',
                    {

                        answered:
                            progress.answered,

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


    document.documentElement.dataset.page02dAnswerBound =
        'true';
}


/* =============================================================================
 * RESTORE PAGE STATE
 *
 * Restores:
 *
 *      ✓ previous selections
 *      ✓ selected option states
 *      ✓ live Dimension 03 score
 *      ✓ progressive dimension scores
 *      ✓ Grand Total /100
 *
 * =============================================================================
 */

function restorePage(){

    if(
        !window.Page02Scorecard ||
        typeof window.Page02Scorecard.restore !==
            'function'
    ){

        console.warn(
            'CTM PATH™ Page 02D scorecard restore unavailable.'
        );


        return false;
    }


    const restored =
        window.Page02Scorecard.restore();


    if(
        !restored
    ){

        console.warn(
            'CTM PATH™ Page 02D scorecard restore returned false.'
        );
    }


    refreshProgressiveScoreDisplay();


    const progress =
        typeof window.Page02Scorecard.getProgress ===
            'function'

            ? window.Page02Scorecard.getProgress()

            : null;


    console.info(
        'CTM PATH™ Page 02D restored:',
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

            complete:
                progress
                    ? progress.complete
                    : false,

            progressiveTotal:
                getProgressiveTotal()
        }
    );


    return Boolean(
        restored
    );
}


/* =============================================================================
 * INITIALIZE SCORECARD
 * =============================================================================
 */

function initializeScorecard(){

    if(
        !window.Page02Scorecard ||
        typeof window.Page02Scorecard.init !==
            'function'
    ){

        return false;
    }


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
     * Move the existing live Dimension 03 score below
     * the scorecard.
     */

    relocateDimensionScore();


    /*
     * Create the canonical progressive scoreboard.
     */

    createProgressiveScoreboard();


    /*
     * Render initial scoreboard state.
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
 *      VERIFY DEPENDENCIES
 *          ↓
 *      VERIFY DIMENSION
 *          ↓
 *      INITIALIZE SCORECARD
 *          ↓
 *      MOVE LIVE SCORE
 *          ↓
 *      CREATE PROGRESSIVE SCOREBOARD
 *          ↓
 *      BIND NAVIGATION / EVENTS
 *          ↓
 *      RESTORE SESSION
 *          ↓
 *      REFRESH SCOREBOARD
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
        'CTM PATH™ Page 02D initializing — Assets™...'
    );


    try{


        /* ---------------------------------------------------------------------
         * GLOBAL COMPONENTS
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
                'CTM PATH™ Page 02D continuing without confirmed global components.'
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
                'CTM PATH™ Page 02D scorecard initialization failed.'
            );


            return;
        }


        /* ---------------------------------------------------------------------
         * SCOREBOARD
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
            'CTM PATH™ Page 02D ready.',
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
            'CTM PATH™ Page 02D initialization failed.',
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
 *      Page02D.init()
 *      Page02D.getScore()
 *      Page02D.getProgress()
 *      Page02D.getProgressiveTotal()
 *      Page02D.getDimensionScores()
 *      Page02D.refreshScoreboard()
 *      Page02D.goNext()
 *      Page02D.goPrevious()
 *
 * =============================================================================
 */

window.Page02D = {

    version:
        '5.0',

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


            if(
                typeof window.Page02Scorecard.validate !==
                    'function'
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
 * PAGE 02D LOAD ORDER:
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
 *      page02d.js
 *
 *
 * PROGRESSIVE SCOREBOARD:
 *
 *      01  WEALTH™                         /20
 *      02  INCOME & CASH FLOW™             /20
 *      03  ASSETS™                         /20
 *      04  LIFESTYLE & FREEDOM™            /20
 *      05  PROTECTION & CONTRIBUTION™     /20
 *
 *      GRAND TOTAL                         /100
 *
 *
 * JOURNEY:
 *
 *      PAGE 02C
 *      DIMENSION 02
 *      INDICATORS 06–10
 *
 *             ↓
 *
 *      PAGE 02D
 *      DIMENSION 03 — ASSETS™
 *      INDICATORS 11–15
 *
 *             ↓
 *
 *      Validate 5 / 5
 *
 *             ↓
 *
 *      completeDimension("assets")
 *
 *             ↓
 *
 *      setCurrentDimension("lifestyleFreedom")
 *
 *             ↓
 *
 *      PAGE 02E
 *      DIMENSION 04
 *      INDICATORS 16–20
 *
 * =============================================================================
 */

})(window, document);

